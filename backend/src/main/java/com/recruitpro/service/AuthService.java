package com.recruitpro.service;

import com.recruitpro.dto.AuthRequest;
import com.recruitpro.dto.AuthResponse;
import com.recruitpro.entity.User;
import com.recruitpro.entity.User.UserType;
import com.recruitpro.repository.UserRepository;
import com.recruitpro.security.JwtUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final JwtUtil jwtUtil;
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthService.class);

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.encoder = new BCryptPasswordEncoder();
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(AuthRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(hashPassword(request.getPassword()));
        user.setUserType(UserType.valueOf(request.getUserType().toUpperCase()));
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse("User registered successfully", user.getEmail(), user.getUserType().name(), token);
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        LOGGER.info("Login attempt for email: {}", request.getEmail());

        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            LOGGER.warn("Password mismatch for user {}", request.getEmail());
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse("Login successful", user.getEmail(), user.getUserType().name(), token);
    }

    public Map<String, String> forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));

        String token = UUID.randomUUID().toString();

        if (user.getResetTokenExpire() != null && user.getResetTokenExpire().after(new Date())) {
            throw new RuntimeException("Reset link already sent. Please wait before requesting again.");
        }

        user.setResetToken(token);
        user.setResetTokenExpire(new Date(System.currentTimeMillis() + 15 * 60 * 1000)); // 15 mins
        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("message", "Reset link generated successfully");
        return response;
    }

    public String resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .filter(u -> u.getResetTokenExpire() != null && u.getResetTokenExpire().after(new Date()))
                .orElseThrow(() -> new RuntimeException("Invalid or expired token"));

        user.setPassword(hashPassword(newPassword));
        user.setResetToken(null);
        user.setResetTokenExpire(null);
        userRepository.save(user);

        return "Password reset successful";
    }

    private String hashPassword(String rawPassword) {
        return encoder.encode(rawPassword);
    }
}
