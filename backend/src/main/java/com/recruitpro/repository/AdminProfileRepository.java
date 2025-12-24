package com.recruitpro.repository;

import com.recruitpro.entity.AdminProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminProfileRepository extends JpaRepository<AdminProfile, Long> {
    
    Optional<AdminProfile> findByEmail(String email);
    
    
    void deleteByEmail(String email);
}
