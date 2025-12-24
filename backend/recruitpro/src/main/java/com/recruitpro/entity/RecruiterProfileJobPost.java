package com.recruitpro.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "recruiter_jobpost")
public class RecruiterProfileJobPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public Integer getJobExp() {
		return jobExp;
	}

	public void setJobExp(Integer jobExp) {
		this.jobExp = jobExp;
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

	

    

   
}
