package com.recruitpro.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.recruitpro.entity.RecruiterProfileAboutPage;
import com.recruitpro.entity.RecruiterProfileCompanyPage;
import com.recruitpro.entity.RecruiterProfileJobPost;

public interface RecruiterProfileCompanyPageRepo extends JpaRepository<RecruiterProfileCompanyPage, Long> {
    Optional<RecruiterProfileCompanyPage> findByCompanyName(String companyName);

}