package com.HIMS.dto;

import com.HIMS.model.ClaimStatus;
import java.math.BigDecimal;
import java.time.LocalDate;

public class ClaimRequest {
    private LocalDate incidentDate;
    private BigDecimal estimatedCost;
    private String damageLocation;
    private ClaimStatus status;
    private String description;
    private Long policyId;
//    private Long userId;

    private String imageUrl; 

    // Getters and Setters
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

    public Long getPolicyId() { return policyId; }
    public void setPolicyId(Long policyId) { this.policyId = policyId; }

//    public Long getUserId() { return userId; }
//    public void setUserId(Long userId) { this.userId = userId; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
