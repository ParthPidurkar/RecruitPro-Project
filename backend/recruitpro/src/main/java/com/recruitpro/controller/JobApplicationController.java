package com.recruitpro.controller;

import com.recruitpro.entity.*;
import com.recruitpro.repository.*;
import com.recruitpro.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class JobApplicationController {

    @Autowired
    private JobApplicationRepository applicationRepo;

    @Autowired
    private JobRepository jobRepo;

    @Autowired
    private JobSeekerProfileRepository profileRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Transactional
    @PostMapping("/apply")
    public ResponseEntity<?> applyToJob(@RequestParam Long jobId, @CookieValue(name = "token", required = false) String token) {
        if (token == null || !jwtUtil.isTokenValid(token)) {
            return ResponseEntity.status(403).body("Forbidden: Token is missing or invalid.");
        }

        String email = jwtUtil.extractEmail(token);
        Job job = jobRepo.findById(jobId).orElseThrow();
        JobSeekerProfile profile = profileRepo.findByEmail(email).orElseThrow();

        JobApplication app = new JobApplication();
        app.setJob(job);
        app.setJobSeeker(profile);
        app.setApplicationDate(LocalDate.now().toString());

        return ResponseEntity.ok(applicationRepo.save(app));
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getApplicationsByToken(@CookieValue(name = "token", required = false) String token) {
        if (token == null || !jwtUtil.isTokenValid(token)) {
            return ResponseEntity.status(403).body("Forbidden: Token is missing or invalid.");
        }

        String email = jwtUtil.extractEmail(token);
        JobSeekerProfile profile = profileRepo.findByEmail(email).orElseThrow();
        List<JobApplication> apps = applicationRepo.findByJobSeekerId(profile.getId());
        return ResponseEntity.ok(apps);
    }
}
