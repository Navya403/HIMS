	package com.HIMS.model;
	
	import jakarta.persistence.*;
	import java.util.List;
	
	@Entity
	@Table(name = "users")
	public class User {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(nullable = false)
	    private Long id;
	
	    @Column(nullable = false)
	    private String firstName;
	
	    @Column(nullable = false)
	    private String lastName;
	
	    @Column(nullable = false, unique = true)
	    private String email;
	
	    @Column(nullable = false)
	    private String password;
	
	    @Column(nullable = false)
	    private String role;  // "USER" or "ADMIN"
	
	    @Column(name = "reset_token")
	    private String resetToken;
	
	    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	    private List<Property> properties;
	
	    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	    private List<Policy> policies;
	
	    
	    
	
	    private String address;
	
	    // Getters and Setters
	
	    public String getAddress() {
			return address;
		}

		public void setAddress(String address) {
			this.address = address;
		}
	    // Getters and Setters
	
	    public Long getId() {
	        return id;
	    }
	
	    public void setId(Long id) {
	        this.id = id;
	    }
	
	    public String getFirstName() {
	        return firstName;
	    }
	
	    public void setFirstName(String firstName) {
	        this.firstName = firstName;
	    }
	
	    public String getLastName() {
	        return lastName;
	    }
	
	    public void setLastName(String lastName) {
	        this.lastName = lastName;
	    }
	
	    public String getEmail() {
	        return email;
	    }
	
	    public void setEmail(String email) {
	        this.email = email;
	    }
	
	    public String getPassword() {
	        return password;
	    }
	
	    public void setPassword(String password) {
	        this.password = password;
	    }
	
	    public String getRole() {
	        return role;
	    }
	
	    public void setRole(String role) {
	        this.role = role;
	    }
	
	    public String getResetToken() {
	        return resetToken;
	    }
	
	    public void setResetToken(String resetToken) {
	        this.resetToken = resetToken;
	    }
	
	    public List<Property> getProperties() {
	        return properties;
	    }
	
	    public void setProperties(List<Property> properties) {
	        this.properties = properties;
	    }
	
	    public List<Policy> getPolicies() {
	        return policies;
	    }
	
	    public void setPolicies(List<Policy> policies) {
	        this.policies = policies;
	    }
	}
