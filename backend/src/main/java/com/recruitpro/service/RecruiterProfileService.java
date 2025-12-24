package com.recruitpro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recruitpro.dto.RecruiterProfileDto;
import com.recruitpro.entity.RecruiterProfileAboutPage;
import com.recruitpro.entity.RecruiterProfileCompanyPage;
import com.recruitpro.entity.RecruiterProfileJobPost;
import com.recruitpro.repository.RecruiterProfileAboutPageRepo;
import com.recruitpro.repository.RecruiterProfileCompanyPageRepo;
import com.recruitpro.repository.RecruiterProfileRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class RecruiterProfileService {

    private final RecruiterProfileRepo rrepo;
    private final RecruiterProfileCompanyPageRepo companyRepo;
    private final RecruiterProfileAboutPageRepo aboutRepo;

    @Autowired
    public RecruiterProfileService(
            RecruiterProfileRepo jobPostRepository,
            RecruiterProfileCompanyPageRepo companyRepo,
            RecruiterProfileAboutPageRepo aboutRepo) {
        this.rrepo = jobPostRepository;
        this.companyRepo = companyRepo;
        this.aboutRepo = aboutRepo;
    }

    public RecruiterProfileJobPost createJobPost(RecruiterProfileDto dto) {
        RecruiterProfileJobPost job = new RecruiterProfileJobPost();
        job.setTitle(dto.getTitle());
        job.setJobType(dto.getJobType());
        job.setLocation(dto.getLocation());
        job.setJobExp(dto.getJobExp());
        job.setSkills(dto.getSkills());
        job.setMinSal(Optional.ofNullable(dto.getMinSal()).orElse(0L));
        job.setMaxSal(Optional.ofNullable(dto.getMaxSal()).orElse(0L));
        job.setDeadline(dto.getDeadline());
        job.setDescription(dto.getDescription());

        return rrepo.save(job);
    }

    public void deleteJobPost(long id) {
        rrepo.deleteById(id);
    }

    public RecruiterProfileAboutPage createAbout(RecruiterProfileDto dto) {
        RecruiterProfileAboutPage rabout = new RecruiterProfileAboutPage();
        rabout.setCompanyName(dto.getCompName());
        rabout.setAboutName(dto.getAboutName());
        rabout.setEmail(dto.getAboutEmail());
        rabout.setContact(dto.getContact());
        rabout.setExperience(dto.getAboutExperience());
        rabout.setRole(dto.getRole());
        rabout.setPortfolio(dto.getPortfolio());
        rabout.setLinkedin(dto.getAboutLinkedin());
        rabout.setGithub(dto.getAboutGithub());
        rabout.setTwitter(dto.getAboutTwitter());

        return aboutRepo.save(rabout);
    }

    public RecruiterProfileAboutPage updateAbout(int id, RecruiterProfileDto dto) {
        Optional<RecruiterProfileAboutPage> optionalAbout = aboutRepo.findById((long) id);

        if (optionalAbout.isEmpty()) {
            throw new EntityNotFoundException("About page with ID " + id + " not found.");
        }

        RecruiterProfileAboutPage existingAbout = optionalAbout.get();

        existingAbout.setCompanyName(dto.getCompName());
        existingAbout.setAboutName(dto.getAboutName());
        existingAbout.setEmail(dto.getAboutEmail());
        existingAbout.setContact(dto.getContact());
        existingAbout.setExperience(dto.getAboutExperience());
        existingAbout.setRole(dto.getRole());
        existingAbout.setPortfolio(dto.getPortfolio());
        existingAbout.setLinkedin(dto.getAboutLinkedin());
        existingAbout.setGithub(dto.getAboutGithub());
        existingAbout.setTwitter(dto.getAboutTwitter());

        return aboutRepo.save(existingAbout);
    }

    public RecruiterProfileCompanyPage createCompanyPage(RecruiterProfileDto dto) {
        RecruiterProfileCompanyPage company = new RecruiterProfileCompanyPage();
        company.setCompanyName(dto.getCompName());
        company.setAbout(dto.getCompAbout());
        company.setEmail(dto.getCompEmail());
        company.setPhone(dto.getPhone());
        company.setFyear(dto.getFyear());
        company.setIndustry(dto.getIndustryType());
        company.setSize(dto.getSize());
        company.setCity(dto.getCity());
        company.setCountry(dto.getCountry());
        company.setAboutComp(dto.getAboutComp());
        company.setWebsite(dto.getCompWebsite());
        company.setLinkedin(dto.getCompLinkedin());
        company.setTwitter(dto.getCompTwitter());

        return companyRepo.save(company);
    }

    public List<RecruiterProfileJobPost> getAllJobPosts() {
        return rrepo.findAll();
    }

    public RecruiterProfileCompanyPage getCompanyPage(String companyName) {
        return companyRepo.findByCompanyName(companyName)
                .orElseThrow(() -> new IllegalArgumentException("Company not found: " + companyName));
    }

    public RecruiterProfileAboutPage getAboutPage(String companyName) {
        return aboutRepo.findByCompanyName(companyName)
                .orElseThrow(() -> new RuntimeException("About page not found for company: " + companyName));
    }
}
