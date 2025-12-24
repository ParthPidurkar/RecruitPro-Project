package com.recruitpro.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.recruitpro.entity.RecruiterProfileAboutPage;

public interface RecruiterProfileAboutPageRepo extends JpaRepository<RecruiterProfileAboutPage, Long> {
    Optional<RecruiterProfileAboutPage> findByCompanyName(String companyName);
}