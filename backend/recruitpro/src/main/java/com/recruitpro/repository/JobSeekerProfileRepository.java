package com.recruitpro.repository;

import com.recruitpro.entity.JobSeekerProfile;
import com.recruitpro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobSeekerProfileRepository extends JpaRepository<JobSeekerProfile, Long> {

    
    Optional<JobSeekerProfile> findByEmail(String email);

  
    Optional<JobSeekerProfile> findByUser(User user);

  
    Optional<JobSeekerProfile> findByUser_Id(Long userId);
}
