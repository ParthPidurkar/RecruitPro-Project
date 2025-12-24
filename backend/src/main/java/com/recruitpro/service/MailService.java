package com.recruitpro.service;

import org.springframework.web.multipart.MultipartFile;

public interface MailService {
	void send(
			String from, 
			String to, 
			String sub, 
			String content
			) throws Exception;
}
