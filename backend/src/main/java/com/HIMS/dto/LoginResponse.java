package com.HIMS.dto;

public class LoginResponse {
    private String message;
    private String token;
    private String role;  // 👈 Add this

    // Constructor with all fields
    public LoginResponse(String message, String token, String role) {
        this.message = message;
        this.token = token;
        this.role = role;
    }

    // Optional default constructor
    public LoginResponse() {}

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
