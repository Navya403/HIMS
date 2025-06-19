package com.HIMS.service;

import com.HIMS.model.Payment;
import com.HIMS.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PaymentService {

    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

    @Value("${razorpay.key_id}")
    private String razorpayKey;

    @Value("${razorpay.key_secret}")
    private String razorpaySecret;

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment createPayment(Long policyId, Long userId, Double amount) throws RazorpayException {
        RazorpayClient client = new RazorpayClient(razorpayKey, razorpaySecret);

        JSONObject options = new JSONObject();
        options.put("amount", amount * 100); // Razorpay needs paise
        options.put("currency", "INR");
        options.put("receipt", "order_rcptid_" + System.currentTimeMillis());
        options.put("notes", new JSONObject().put("policyId", policyId).put("userId", userId));

        Order order = client.orders.create(options);

        Payment payment = new Payment();
        payment.setPolicyID(policyId);
        payment.setUserID(userId);
        payment.setAmountPaid(amount);
        payment.setPaymentDate(LocalDateTime.now());
        payment.setStatus("Pending");
        payment.setRazorpayOrderId(order.get("id"));

        logger.info("Created new payment with status Pending: {}", payment);
        return paymentRepository.save(payment);
    }

    @Transactional
    public Payment updatePaymentStatus(String razorpayOrderId, String status) {
        logger.info("Updating payment status for order {} to {}", razorpayOrderId, status);
        try {
            Payment payment = paymentRepository.findByRazorpayOrderId(razorpayOrderId);
            if (payment != null) {
                // Validate the status
                if (!isValidStatus(status)) {
                    logger.error("Invalid status provided: {}", status);
                    throw new IllegalArgumentException("Invalid payment status: " + status);
                }
                
                // Only update if status is different
                if (!payment.getStatus().equals(status)) {
                    payment.setStatus(status);
                    payment = paymentRepository.save(payment);
                    logger.info("Payment status updated successfully: {}", payment);
                } else {
                    logger.info("Payment status already set to: {}", status);
                }
                return payment;
            }
            logger.warn("Payment not found for order ID: {}", razorpayOrderId);
            return null;
        } catch (Exception e) {
            logger.error("Error updating payment status for order {}: {}", razorpayOrderId, e.getMessage());
            throw e;
        }
    }

    private boolean isValidStatus(String status) {
        return status != null && (status.equals("Success") || status.equals("Failed") || status.equals("Pending"));
    }

    public boolean verifyPayment(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) {
        logger.info("Verifying payment for order: {}", razorpayOrderId);
        try {
            String data = razorpayOrderId + "|" + razorpayPaymentId;
            String secret = razorpaySecret;
            
            // Create HMAC SHA256 hash
            javax.crypto.Mac mac = javax.crypto.Mac.getInstance("HmacSHA256");
            mac.init(new javax.crypto.spec.SecretKeySpec(secret.getBytes(), "HmacSHA256"));
            byte[] hash = mac.doFinal(data.getBytes());
            
            // Convert to hex
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            
            String generatedSignature = hexString.toString();
            boolean isVerified = generatedSignature.equals(razorpaySignature);
            
            logger.info("Payment verification result for order {}: {}", razorpayOrderId, isVerified);
            return isVerified;
        } catch (Exception e) {
            logger.error("Error verifying payment for order {}: {}", razorpayOrderId, e.getMessage());
            return false;
        }
    }
}