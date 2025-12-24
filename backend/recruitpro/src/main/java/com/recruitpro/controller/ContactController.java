package com.recruitpro.controller;

import com.recruitpro.dto.ContactFormRequest;
import com.recruitpro.service.ContactFormService;

import jakarta.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ContactController {

    private final ContactFormService contactFormService;

    @Autowired
    public ContactController(ContactFormService contactFormService) {
        this.contactFormService = contactFormService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendContactForm(@RequestBody ContactFormRequest request) throws MessagingException {
        contactFormService.sendContactEmail(request);
        return ResponseEntity.ok("Message sent successfully");
    }
}
