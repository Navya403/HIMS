package com.HIMS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendResetLink(String toEmail, String token) {
        String subject = "Reset Your Password Securely";

        String body = "Dear Valued User,\n\n"
                + "We received a request to reset the password associated with this email address.\n\n"
                + "To proceed with resetting your password, please click the secure link below:\n\n"
                + "🔐 Reset Password: http://localhost:5173/reset-password?token=" + token + "\n\n"
                + "If you did not initiate this request, please ignore this email. "
                + "Your account remains safe and no changes will be made.\n\n"
                + "For your protection, this link will expire in 30 minutes.\n\n"
                + "Best regards,\n"
                + "HIMS Security Team\n"
                + "-----------------------------------------------------\n"
                + "This is an automated message, please do not reply.";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
}
