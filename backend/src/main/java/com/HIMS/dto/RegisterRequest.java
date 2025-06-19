package com.HIMS.dto;



import jakarta.persistence.Column;

public class RegisterRequest {
    @Column(nullable=false)
	private String firstName;
	private String lastName;
    @Column(nullable=false)
    private String email;
    @Column(nullable=false)
    private String password;
    
    private String role; // "USER" or "ADMIN"
    
    private String address; // Add this line


    public RegisterRequest() {}
    
    public RegisterRequest(String firstName, String lastName, String email, String password, String role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
    }


    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
    public String getRole() {
        return role;
    }

   
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

   
     public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
     public void setEmail(String email) {
    	 this.email = email;
    	 }
     public void setPassword(String password) { 
    	 this.password = password; 
    	 }
     public void setRole(String role) {
         this.role = role;
     }
}
