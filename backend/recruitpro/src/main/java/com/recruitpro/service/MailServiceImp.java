package com.recruitpro.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.activation.DataHandler;
import jakarta.activation.FileDataSource;
import jakarta.mail.BodyPart;
import jakarta.mail.Multipart;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMessage.RecipientType;
import jakarta.mail.internet.MimeMultipart;

@Service
public class MailServiceImp implements MailService{
	
	@Autowired
	JavaMailSender sender; 
	
//	//if multimedia
//	private File convert() {}
	
	@Override
	public void send(String from, String to, String sub, String content) throws Exception {
		// TODO Auto-generated method stub
		
		MimeMessage mime = sender.createMimeMessage();
		mime.setFrom(from);
		mime.setRecipients(RecipientType.TO, to);
		mime.setSubject(sub);
		mime.setSentDate(new Date());
		
		Multipart mp = new MimeMultipart();
		//Email body
		BodyPart bp = new MimeBodyPart();
		bp.setContent(content, "text/html");
		mp.addBodyPart(bp);
		
		
		//attachment
		MimeBodyPart mbp = new MimeBodyPart();
//		FileDataSource fdsrc = new FileDataSource(convert(mpartfile));
//		mbp.setDataHandler(new DataHandler(fdsrc));
//		mbp.setFileName(mpartfile.getOriginalFilename());
//		mp.addBodyPart(mbp);
		
		mime.setContent(mp);
		sender.send(mime);
		
	}
	
	
	
}
