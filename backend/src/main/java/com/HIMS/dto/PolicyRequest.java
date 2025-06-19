//
//package com.HIMS.dto;
//
//public class PolicyRequest {
//    private Long propertyId;
//    private String type;
//    private Double premium;
//    private String coverageDetails;
//    private String exclusions;
//    private String startDate;
//    private String endDate;
//    private Long userId;
//
//    public PolicyRequest() {}
//
//    // Getters and setters
//
//    public Long getPropertyId() {
//        return propertyId;
//    }
//
//    public void setPropertyId(Long propertyId) {
//        this.propertyId = propertyId;
//    }
//
//    public String getType() {
//        return type;
//    }
//
//    public void setType(String type) {
//        this.type = type;
//    }
//
//    public Double getPremium() {
//        return premium;
//    }
//
//    public void setPremium(Double premium) {
//        this.premium = premium;
//    }
//
//    public String getCoverageDetails() {
//        return coverageDetails;
//    }
//
//    public void setCoverageDetails(String coverageDetails) {
//        this.coverageDetails = coverageDetails;
//    }
//
//    public String getExclusions() {
//        return exclusions;
//    }
//
//    public void setExclusions(String exclusions) {
//        this.exclusions = exclusions;
//    }
//
//    public String getStartDate() {
//        return startDate;
//    }
//
//    public void setStartDate(String startDate) {
//        this.startDate = startDate;
//    }
//
//    public String getEndDate() {
//        return endDate;
//    }
//
//    public void setEndDate(String endDate) {
//        this.endDate = endDate;
//    }
//
//    public Long getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Long userId) {
//        this.userId = userId;
//    }
//}


package com.HIMS.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class PolicyRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    private Long propertyId;

    @NotBlank(message = "Policy type is required")
    private String type;

    @PositiveOrZero(message = "Premium must be positive or zero")
    private Double premium;

    private String coverageDetails;
    private String exclusions;
    private String startDate;
    private String endDate;

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getPremium() {
        return premium;
    }

    public void setPremium(Double premium) {
        this.premium = premium;
    }

    public String getCoverageDetails() {
        return coverageDetails;
    }

    public void setCoverageDetails(String coverageDetails) {
        this.coverageDetails = coverageDetails;
    }

    public String getExclusions() {
        return exclusions;
    }

    public void setExclusions(String exclusions) {
        this.exclusions = exclusions;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
}