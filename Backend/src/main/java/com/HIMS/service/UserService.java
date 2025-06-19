package com.HIMS.service;

import com.HIMS.dto.LoginRequest;
import com.HIMS.dto.UpdateUserRequest;
import com.HIMS.dto.UserProfileDto;
import com.HIMS.dto.LoginResponse;
import com.HIMS.dto.RegisterRequest;
import com.HIMS.exception.InvalidCredentialsException;
import com.HIMS.model.User;
import com.HIMS.repository.UserRepository;
import com.HIMS.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    @Autowired
    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil,
                       EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
    }

    // Registration
    public String registerUser(RegisterRequest request) {
        if (request.getPassword().length() < 8) {
            return "Password must be at least 8 characters long!";
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email is already in use!";
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole() != null ? request.getRole().toUpperCase() : "USER");
        user.setAddress(request.getAddress()); // ✅ Set address

        userRepository.save(user);
        return "Registration successful with role: " + user.getRole();
    }

    // Login with JWT including roles
    public LoginResponse login(LoginRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isEmpty()) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        List<String> roles = List.of(user.getRole());

        String token = jwtUtil.generateToken(user.getEmail(), roles);

        return new LoginResponse("Login successful", token, user.getRole());
    }

    // Send password reset link
    public void sendPasswordResetLink(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            String token = UUID.randomUUID().toString();
            user.setResetToken(token);
            userRepository.save(user);
            emailService.sendResetLink(email, token);
        }
    }

    // Reset password
    public String resetPassword(String token, String newPassword) {
        Optional<User> optionalUser = userRepository.findByResetToken(token);
        if (optionalUser.isEmpty()) {
            return "Invalid or expired token";
        }

        User user = optionalUser.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        userRepository.save(user);
        return "Password reset successful";
    }

    // Get user profile
    public UserProfileDto getUserProfile(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return null;
        }

        User user = optionalUser.get();
        return new UserProfileDto(
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getRole(),
            user.getAddress()
        );
    }

    // Update user details
    public String updateUserDetails(String email, UpdateUserRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return "User not found";
        }

        User user = optionalUser.get();

        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }
        if (request.getAddress() != null) {
            user.setAddress(request.getAddress());
        }

        userRepository.save(user);
        return "User details updated successfully";
    }
}
