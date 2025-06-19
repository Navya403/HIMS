package com.HIMS.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long claimId;

    private LocalDate incidentDate;
    private BigDecimal estimatedCost;
    private String damageLocation;

    @Enumerated(EnumType.STRING)
    private ClaimStatus status;

    private String description;
    private LocalDate submittedAt;
    private LocalDate lastUpdated;
    private LocalDate estimatedResolutionDate;
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "policy_id")
    private Policy policy;

  

    @OneToMany(mappedBy = "claim", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ClaimStatusHistory> statusHistory;

    // Getters and Setters
    public Long getClaimId() { return claimId; }
    public void setClaimId(Long claimId) { this.claimId = claimId; }

    public LocalDate getIncidentDate() { return incidentDate; }
    public void setIncidentDate(LocalDate incidentDate) { this.incidentDate = incidentDate; }

    public BigDecimal getEstimatedCost() { return estimatedCost; }
    public void setEstimatedCost(BigDecimal estimatedCost) { this.estimatedCost = estimatedCost; }

    public String getDamageLocation() { return damageLocation; }
    public void setDamageLocation(String damageLocation) { this.damageLocation = damageLocation; }

    public ClaimStatus getStatus() { return status; }
    public void setStatus(ClaimStatus status) { this.status = status; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDate submittedAt) { this.submittedAt = submittedAt; }

    public LocalDate getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDate lastUpdated) { this.lastUpdated = lastUpdated; }

    public LocalDate getEstimatedResolutionDate() { return estimatedResolutionDate; }
    public void setEstimatedResolutionDate(LocalDate estimatedResolutionDate) { this.estimatedResolutionDate = estimatedResolutionDate; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Policy getPolicy() { return policy; }
    public void setPolicy(Policy policy) { this.policy = policy; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }


    public List<ClaimStatusHistory> getStatusHistory() { return statusHistory; }
    public void setStatusHistory(List<ClaimStatusHistory> statusHistory) { this.statusHistory = statusHistory; }
}
