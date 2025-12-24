package com.recruitpro.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


import com.recruitpro.dto.RecruiterProfileDto;
import com.recruitpro.entity.Contact;
import com.recruitpro.entity.RecruiterProfileAboutPage;
import com.recruitpro.entity.RecruiterProfileCompanyPage;
import com.recruitpro.entity.RecruiterProfileJobPost;
import com.recruitpro.service.MailService;
import com.recruitpro.service.RecruiterProfileService;

@RestController
@RequestMapping("/api/recruiter")
@CrossOrigin(origins = "http://localhost:3000") 
public class RecruiterProfileController {
	
	@Autowired
	private MailService ms;
	
	@Autowired
	private Environment ev;
	private final RecruiterProfileService rService;

    public RecruiterProfileController(RecruiterProfileService service) {
        this.rService = service;
    }

    @PostMapping("/create_job")
    public RecruiterProfileJobPost createJob(@RequestBody RecruiterProfileDto dto) {
        return rService.createJobPost(dto);
    }
    @DeleteMapping("/delete_job/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable("id") long id) {
        rService.deleteJobPost(id);
        return ResponseEntity.ok("Deleted successfully");
    }
//    @PostMapping("/create-company")
//    public RecruiterProfileJobPost createCompany(@RequestBody RecruiterProfileDto dto) {
//        return rService.createJobPost(dto);
//    }
    @PostMapping("/create_about")
    public RecruiterProfileAboutPage createAbout(@RequestBody RecruiterProfileDto dto) {
        return rService.createAbout(dto);
    }
    @PutMapping("/update_about")
    public RecruiterProfileAboutPage updateAbout(@RequestParam("id") int id, @RequestBody RecruiterProfileDto dto ) {
        return rService.updateAbout(id, dto);
    } 

    @GetMapping("/alljobs")
    public List<RecruiterProfileJobPost> getJobs() {
        return rService.getAllJobPosts();
    }
    
    @GetMapping("/{companyName}")
    public ResponseEntity<?> getCompanyPage(@PathVariable String companyName) {
        try {
            RecruiterProfileCompanyPage page = rService.getCompanyPage(companyName);
            return ResponseEntity.ok(page);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Company not found: " + companyName);
        }
    }
    


    @GetMapping("/{companyName}/about")
    public RecruiterProfileAboutPage getAboutPage(@PathVariable String companyName) {
        return rService.getAboutPage(companyName);
    }
    
    
    
    @GetMapping("/index")
	public String index(ModelMap mmap) {
		mmap.put("contact", new Contact());
		return "index";
	}
    
    
    @PostMapping("/send_invite")
    public ResponseEntity<String> sendInviteEmail(@RequestBody Contact contact) {
        try {
            //String from = ev.getProperty("spring.mail.username");
        	String from = contact.getRecMail();
        	String to = contact.getEmail();
            String content = "Dear " + contact.getFullName() +","+
                             "! You have been selected for the final interview round." +
                             "<br>Please join the meeting for further details.<br>" +
                             "<br>Join the Meet link: " + contact.getMeetLink() +
                             "<br>Time: " + contact.getTime() + " hrs.";
            
            ms.send(from,to , contact.getSubject(), content);
            return ResponseEntity.ok("Invitation email sent successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to send email: " + e.getMessage());
        }
    }
    
//    @PostMapping("/sendinvite")
//    public ResponseEntity<String> sendCustomEmail(
//    		@RequestParam String from,
//    		@RequestParam String fname,
//    		@RequestParam String to,
//    		@RequestParam String subject,
//            @RequestParam String content,
//            @RequestParam String time
//    		) {
//        try {
//            //String from = ev.getProperty("spring.mail.username");
//        	
//        	String thecontent = "Congrats " + fname + 
//                    "! You have been selected for the final interview round." +
//                    "<br>Please join the meeting for further details.<br>" +
//                    "<br>Join the Meet link: " + content +
//                    "<br>Time: " + time + " hrs.";
//        	
//            ms.send(from, to, subject, thecontent);
//            return ResponseEntity.ok("Email sent successfully to "+ fname);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                                 .body("Failed to send custom email: " + e.getMessage());
//        }
//    }
//    
    

}
