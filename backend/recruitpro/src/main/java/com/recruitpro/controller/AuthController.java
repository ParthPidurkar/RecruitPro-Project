package com.recruitpro.controller;

import com.recruitpro.dto.AuthRequest;
import com.recruitpro.dto.AuthResponse;
import com.recruitpro.security.JwtUtil;
import com.recruitpro.service.AuthService;
import com.recruitpro.repository.JobSeekerProfileRepository;
import com.recruitpro.entity.JobSeekerProfile;

import java.util.Map;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;
    private final JobSeekerProfileRepository jobSeekerProfileRepository;

    public AuthController(AuthService authService, JwtUtil jwtUtil, JobSeekerProfileRepository jobSeekerProfileRepository) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
        this.jobSeekerProfileRepository = jobSeekerProfileRepository;
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("🔐 Auth route working!");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request, HttpServletResponse response) {
        try {
            AuthResponse authResponse = authService.login(request);

            Cookie cookie = new Cookie("token", authResponse.getToken());
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(5 * 60 * 60); // 5 hours
            response.addCookie(cookie);

            return ResponseEntity.ok(authResponse);
        } catch (Exception e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @PostMapping("/forgot-password")
    public Map<String, String> forgotPassword(@RequestBody AuthRequest request) {
        return authService.forgotPassword(request.getEmail());
    }

    @PostMapping("/reset-password/{token}")
    public String resetPassword(@PathVariable String token, @RequestBody AuthRequest request) {
        return authService.resetPassword(token, request.getPassword());
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@CookieValue(name = "token", required = false) String token) {
        if (token == null || !jwtUtil.isTokenValid(token)) {
            return ResponseEntity.status(401).body("Invalid or expired token");
        }

        String email = jwtUtil.extractEmail(token);

        // Look up name from job seeker profile table
        String name = jobSeekerProfileRepository.findByEmail(email)
                .map(JobSeekerProfile::getFullName)
                .orElse("User");

        return ResponseEntity.ok(Map.of(
                "email", email,
                "name", name
        ));
    }
}
