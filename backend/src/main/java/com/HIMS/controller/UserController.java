//package com.HIMS.controller;
//
//import com.HIMS.dto.LoginRequest;
//import com.HIMS.dto.LoginResponse;
//import com.HIMS.dto.RegisterRequest;
//import com.HIMS.service.UserService;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/auth")
//public class UserController {
//
//    private final UserService userService;
//
//    public UserController(UserService userService) {
//        this.userService = userService;
//    }
//
//    //  Register Endpoint
//    @PostMapping("/register")
//    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
//        String response = userService.registerUser(request);
//        if (response.startsWith("Registration successful")) {
//            return ResponseEntity.ok(response);
//        } else {
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//
//    // Login Endpoint
//    @PostMapping("/login")
//    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
//        LoginResponse response = userService.login(request);
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }
//
//    //  Request Password Reset Link (reads JSON from body)
//
//
//    @PostMapping("/reset-password-request")
//    public ResponseEntity<String> requestResetLink(@RequestBody Map<String, String> request) {
//        String email = request.get("email");
//        userService.sendPasswordResetLink(email);
//        return ResponseEntity.ok("If the email exists, a reset link has been sent.");
//    }
//
//    // Password Reset using Token
//    @PostMapping("/reset-password")
//    public ResponseEntity<String> resetPassword(@RequestParam String token,
//                                                @RequestParam String newPassword) {
//        String result = userService.resetPassword(token, newPassword);
//        if ("Password reset successful".equals(result)) {
//            return ResponseEntity.ok(	result);
//        } else {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
//        }
//    }
//}


package com.HIMS.controller;

import com.HIMS.dto.LoginRequest;
import com.HIMS.dto.LoginResponse;
import com.HIMS.dto.RegisterRequest;
import com.HIMS.dto.UpdateUserRequest;
import com.HIMS.dto.UserProfileDto;
import com.HIMS.service.UserService;
import com.HIMS.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    // Register Endpoint
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        String response = userService.registerUser(request);
        if (response.startsWith("Registration successful")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = userService.login(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Request Password Reset Link
    @PostMapping("/reset-password-request")
    public ResponseEntity<String> requestResetLink(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        userService.sendPasswordResetLink(email);
        return ResponseEntity.ok("If the email exists, a reset link has been sent.");
    }

    // Password Reset using Token
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token,
                                                @RequestParam String newPassword) {
        String result = userService.resetPassword(token, newPassword);
        if ("Password reset successful".equals(result)) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
        }
    }

    // Get User Profile Details
    @GetMapping("/profile")
    public ResponseEntity<UserProfileDto> getProfile(HttpServletRequest httpRequest) {
        String authHeader = httpRequest.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        UserProfileDto profile = userService.getUserProfile(email);
        if (profile == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok(profile);
    }
    
    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody UpdateUserRequest request, HttpServletRequest httpRequest) {
        String authHeader = httpRequest.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7); // Remove "Bearer "
        String email = jwtUtil.extractUsername(token); // Extract email from token

        String result = userService.updateUserDetails(email, request);
        return ResponseEntity.ok(result);
    }
}
