package com.recruitpro.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recruitpro.entity.RecruiterProfileJobPost;

public interface RecruiterProfileRepo extends JpaRepository<RecruiterProfileJobPost, Long> {
}

//@Repository
//public interface RecruiterProfileCompanyPageRepo extends JpaRepository<RecruiterProfileCompanyPage, Long> {
//    Optional<RecruiterProfileCompanyPage> findByCompanyName(String companyName);
//}

//@Repository
//public interface RecruiterProfileAboutPageRepo extends JpaRepository<RecruiterProfileAboutPage, Long> {
//    Optional<RecruiterProfileAboutPage> findByCompanyName(String companyName);
//}