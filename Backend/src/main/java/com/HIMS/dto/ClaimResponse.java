package com.HIMS.dto;

import com.HIMS.model.ClaimStatus;
import java.math.BigDecimal;
import java.time.LocalDate;

public class ClaimResponse {
    private Long claimId;
    private LocalDate incidentDate;
    private BigDecimal estimatedCost;
    private String damageLocation;
    private ClaimStatus status;
    private String description;
    private LocalDate submittedAt;
    private LocalDate lastUpdated;
    private LocalDate estimatedResolutionDate;
    private Long policyId;
    private Long userId;
    private String imageUrl; // ✅ Add imageUrl in the response too

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

    public Long getPolicyId() { return policyId; }
    public void setPolicyId(Long policyId) { this.policyId = policyId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
