package com.recruitpro.service;

import com.recruitpro.dto.AdminProfileDto;
import com.recruitpro.entity.AdminProfile;
import com.recruitpro.repository.AdminProfileRepository;
import com.recruitpro.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminProfileService {

    private final AdminProfileRepository adminRepo;
    private final UserRepository userRepo;

    public AdminProfileService(AdminProfileRepository adminRepo, UserRepository userRepo) {
        this.adminRepo = adminRepo;
        this.userRepo = userRepo;
    }

    public AdminProfile saveOrUpdate(AdminProfileDto dto) {
        AdminProfile profile = adminRepo.findByEmail(dto.getEmail()).orElse(new AdminProfile());

        profile.setFullName(dto.getFullName());
        profile.setEmail(dto.getEmail());
        profile.setContact(dto.getContact());
        profile.setDob(dto.getDob());
        profile.setGender(dto.getGender());
        profile.setRole(dto.getRole());
        profile.setExperience(dto.getExperience());
        profile.setPhone(dto.getPhone());
        profile.setAddress(dto.getAddress());
        profile.setPortfolio(dto.getPortfolio());
        profile.setLinkedin(dto.getLinkedin());
        profile.setGithub(dto.getGithub());
        profile.setTwitter(dto.getTwitter());
        profile.setSkills(dto.getSkills());
        profile.setCoverLetterText(dto.getCoverLetterText());

        return adminRepo.save(profile);
    }

    public AdminProfile getByEmail(String email) {
        return adminRepo.findByEmail(email).orElse(null);
    }

    public List<AdminProfile> getAllProfiles() {
        return adminRepo.findAll();
    }

    public void deleteAdminById(Long id) {
        Optional<AdminProfile> optionalAdmin = adminRepo.findById(id);

        if (optionalAdmin.isPresent()) {
            AdminProfile admin = optionalAdmin.get();
            String email = admin.getEmail();
            userRepo.findByEmail(email).ifPresent(userRepo::delete);
            adminRepo.deleteById(id);
        }
    }
}
