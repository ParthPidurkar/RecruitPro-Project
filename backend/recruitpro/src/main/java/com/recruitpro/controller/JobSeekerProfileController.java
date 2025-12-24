package com.recruitpro.controller;

import com.recruitpro.entity.JobSeekerProfile;
import com.recruitpro.repository.JobSeekerProfileRepository;
import com.recruitpro.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.Cookie;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobseeker")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class JobSeekerProfileController {

    @Autowired
    private JobSeekerProfileRepository profileRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/save")
    public JobSeekerProfile saveProfile(@RequestBody JobSeekerProfile profile) {
        return profileRepository.save(profile);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getProfileByToken(@CookieValue("token") String token) {
        if (!jwtUtil.isTokenValid(token)) {
            return ResponseEntity.status(401).body("Invalid or expired token");
        }

        String email = jwtUtil.extractEmail(token);
        Optional<JobSeekerProfile> profile = profileRepository.findByEmail(email);
        return profile.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public List<JobSeekerProfile> getAllProfiles() {
        return profileRepository.findAll();
    }
}
