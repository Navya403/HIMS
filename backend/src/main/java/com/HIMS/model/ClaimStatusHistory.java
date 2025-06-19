package com.HIMS.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class ClaimStatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "claim_id")
    private Claim claim;

    @Enumerated(EnumType.STRING)
    private ClaimStatus status;

    private LocalDate timestamp;

    private String notes;

    // Default constructor to set timestamp automatically
    public ClaimStatusHistory() {
        this.timestamp = LocalDate.now(); // Automatically sets the timestamp to current time
    }

    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Claim getClaim() {
        return claim;
    }
    
    public void setClaim(Claim claim) {
        this.claim = claim;
    }
    
    public ClaimStatus getStatus() {
        return status;
    }
    
    public void setStatus(ClaimStatus status) {
        this.status = status;
    }
    
    public LocalDate getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDate timestamp) {
        this.timestamp = timestamp;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
}
