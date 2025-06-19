package com.HIMS.controller;


import com.HIMS.model.Payment;
import com.HIMS.service.PaymentService;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

    @Autowired
    private PaymentService paymentService;

    @Value("${razorpay.key_id}")
    private String razorpayKey;

    // API to create Payment (also create Razorpay Order)
    @PostMapping("/create")
    public ResponseEntity<?> createPayment(
            @RequestBody Map<String, Object> requestBody
    ) throws RazorpayException {
        try {
            Long policyId = Long.valueOf(requestBody.get("policyId").toString());
            Long userId = Long.valueOf(requestBody.get("userId").toString());
            Double amount = Double.valueOf(requestBody.get("amount").toString());

            logger.info("Creating payment - PolicyId: {}, UserId: {}, Amount: {}", policyId, userId, amount);

            Payment payment = paymentService.createPayment(policyId, userId, amount);

            Map<String, Object> response = new HashMap<>();
            response.put("razorpayOrderId", payment.getRazorpayOrderId());
            response.put("razorpayKey", razorpayKey);  // ✅ Include Razorpay Key
            response.put("amountPaid", payment.getAmountPaid());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error creating payment: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error creating payment: " + e.getMessage());
        }
    }

    // API to update Payment Status
    @PostMapping("/update-status")
    public ResponseEntity<?> updatePaymentStatus(
            @RequestBody Map<String, String> requestBody
    ) {
        String razorpayOrderId = requestBody.get("razorpayOrderId");
        String status = requestBody.get("status");

        logger.info("Received status update request - OrderId: {}, Status: {}", razorpayOrderId, status);
        try {
            Payment updatedPayment = paymentService.updatePaymentStatus(razorpayOrderId, status);
            if (updatedPayment != null) {
                logger.info("Status update successful - OrderId: {}, New Status: {}", razorpayOrderId, status);
                return ResponseEntity.ok(updatedPayment);
            } else {
                logger.error("Status update failed - Payment not found for OrderId: {}", razorpayOrderId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Payment not found for order ID: " + razorpayOrderId);
            }
        } catch (Exception e) {
            logger.error("Error updating payment status - OrderId: {}, Error: {}", razorpayOrderId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating payment status: " + e.getMessage());
        }
    }

    // API to verify Razorpay signature
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(
            @RequestBody Map<String, String> requestBody
    ) {
        String razorpayOrderId = requestBody.get("razorpayOrderId");
        String razorpayPaymentId = requestBody.get("razorpayPaymentId");
        String razorpaySignature = requestBody.get("razorpaySignature");

        logger.info("Received payment verification request - OrderId: {}", razorpayOrderId);
        try {
            boolean isVerified = paymentService.verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature);
            if (isVerified) {
                logger.info("Payment verified successfully for OrderId: {}", razorpayOrderId);
                return ResponseEntity.ok(Map.of("verified", true));
            } else {
                logger.error("Payment verification failed for OrderId: {}", razorpayOrderId);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("verified", false, "message", "Payment verification failed"));
            }
        } catch (Exception e) {
            logger.error("Error verifying payment - OrderId: {}, Error: {}", razorpayOrderId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("verified", false, "message", "Error verifying payment: " + e.getMessage()));
        }
    }
}

