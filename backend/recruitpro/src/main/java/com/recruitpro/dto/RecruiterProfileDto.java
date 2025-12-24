package com.recruitpro.dto;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import lombok.Data;

@Data
public class RecruiterProfileDto {
	
	private String title;
    private String jobType;
    private Integer jobExp;
    private String location;
    
    @ElementCollection
    private List<String> skills;
    
    private long minSal;
    private long maxSal;
    private Date deadline;

    @Column(length = 2000)
    private String description;
    
    //==============================================
    
    @Column(length = 2000)
    private String compAbout;
     
    private String compName;
    private String compEmail;
    private String phone;
    private Integer fyear;
    private String industryType;
    private String size;
    private String city;
    private String country;
    private String aboutComp;
    private String compWebsite;
    private String compLinkedin;
    private String compTwitter;
    //============================================
	
    private String aboutName;
    private String aboutEmail;
    private String contact;
    private Integer aboutExperience;
    
	private String role;
    private String portfolio;
    private String aboutLinkedin;
    private String aboutGithub;
    private String aboutTwitter;
    
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getJobType() {
		return jobType;
	}
	public void setJobType(String jobType) {
		this.jobType = jobType;
	}
	
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public List<String> getSkills() {
		return skills;
	}
	public void setSkills(List<String> skills) {
		this.skills = skills;
	}
	public long getMinSal() {
		return minSal;
	}
	public void setMinSal(long minSal) {
		this.minSal = minSal;
	}
	public long getMaxSal() {
		return maxSal;
	}
	public void setMaxSal(long maxSal) {
		this.maxSal = maxSal;
	}
	public Date getDeadline() {
		return deadline;
	}
	public void setDeadline(Date deadline) {
		this.deadline = deadline;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCompAbout() {
		return compAbout;
	}
	public void setCompAbout(String compAbout) {
		this.compAbout = compAbout;
	}
	public String getCompName() {
		return compName;
	}
	public void setCompName(String compName) {
		this.compName = compName;
	}
	public String getCompEmail() {
		return compEmail;
	}
	public void setCompEmail(String compEmail) {
		this.compEmail = compEmail;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Integer getFyear() {
		return fyear;
	}
	public void setFyear(Integer fyear) {
		this.fyear = fyear;
	}
	public String getIndustryType() {
		return industryType;
	}
	public void setIndustryType(String industryType) {
		this.industryType = industryType;
	}
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
		this.size = size;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getAboutComp() {
		return aboutComp;
	}
	public void setAboutComp(String aboutComp) {
		this.aboutComp = aboutComp;
	}
	public String getCompWebsite() {
		return compWebsite;
	}
	public void setCompWebsite(String compWebsite) {
		this.compWebsite = compWebsite;
	}
	public String getCompLinkedin() {
		return compLinkedin;
	}
	public void setCompLinkedin(String compLinkedin) {
		this.compLinkedin = compLinkedin;
	}
	public String getCompTwitter() {
		return compTwitter;
	}
	public void setCompTwitter(String compTwitter) {
		this.compTwitter = compTwitter;
	}
	public String getAboutName() {
		return aboutName;
	}
	public void setAboutName(String aboutName) {
		this.aboutName = aboutName;
	}
	public String getAboutEmail() {
		return aboutEmail;
	}
	public void setAboutEmail(String aboutEmail) {
		this.aboutEmail = aboutEmail;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getPortfolio() {
		return portfolio;
	}
	public void setPortfolio(String portfolio) {
		this.portfolio = portfolio;
	}
	public String getAboutLinkedin() {
		return aboutLinkedin;
	}
	public void setAboutLinkedin(String aboutLinkedin) {
		this.aboutLinkedin = aboutLinkedin;
	}
	public String getAboutGithub() {
		return aboutGithub;
	}
	public void setAboutGithub(String aboutGithub) {
		this.aboutGithub = aboutGithub;
	}
	public String getAboutTwitter() {
		return aboutTwitter;
	}
	public void setAboutTwitter(String aboutTwitter) {
		this.aboutTwitter = aboutTwitter;
	}
    
	
	
	public Integer getJobExp() {
		return jobExp;
	}
	public void setJobExp(Integer jobExp) {
		this.jobExp = jobExp;
	}
	public Integer getAboutExperience() {
		return aboutExperience;
	}
	public void setAboutExperience(Integer aboutExperience) {
		this.aboutExperience = aboutExperience;
	}
    
    
}
