package com.recruitpro.controller;

import com.recruitpro.dto.AdminProfileDto;
import com.recruitpro.entity.AdminProfile;
import com.recruitpro.security.JwtUtil;
import com.recruitpro.service.AdminProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/profile")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AdminProfileController {

    private final AdminProfileService service;
    private final JwtUtil jwtUtil;

    public AdminProfileController(AdminProfileService service, JwtUtil jwtUtil) {
        this.service = service;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveProfile(@RequestBody AdminProfileDto dto,
                                         @CookieValue("token") String token) {
        if (!jwtUtil.isTokenValid(token)) {
            return ResponseEntity.status(403).body("Unauthorized access");
        }
        return ResponseEntity.ok(service.saveOrUpdate(dto));
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getProfile(@PathVariable String email,
                                        @CookieValue("token") String token) {
        if (!jwtUtil.isTokenValid(token)) {
            return ResponseEntity.status(403).body("Unauthorized access");
        }
        return ResponseEntity.ok(service.getByEmail(email));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllAdmins(@CookieValue("token") String token) {
        if (!jwtUtil.isTokenValid(token)) {
            return ResponseEntity.status(403).body("Unauthorized access");
        }
        return ResponseEntity.ok(service.getAllProfiles());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable Long id,
                                              @CookieValue("token") String token) {
        if (!jwtUtil.isTokenValid(token)) {
            return ResponseEntity.status(403).body("Unauthorized access");
        }

        try {
            service.deleteAdminById(id);
            return ResponseEntity.ok("Admin profile deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete admin profile");
        }
    }
}
