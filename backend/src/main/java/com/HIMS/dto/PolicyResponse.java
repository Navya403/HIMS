//package com.HIMS.dto;
//
//import java.time.LocalDate;
//
//public class PolicyResponse {
//
//    private Long policyId;
//    private String type;
//    private LocalDate startDate;
//    private LocalDate endDate;
//    private Double premium;
//    private String status;
//    private String coverageDetails;
//    private String exclusions;
//
//    private Long propertyId;
//    private String propertyAddress;
//
//    private Long userId;
//    private String userName;
//
//    // Getters and Setters
//
//    public Long getPolicyId() {
//        return policyId;
//    }
//
//    public void setPolicyId(Long policyId) {
//        this.policyId = policyId;
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
//    public LocalDate getStartDate() {
//        return startDate;
//    }
//
//    public void setStartDate(LocalDate startDate) {
//        this.startDate = startDate;
//    }
//
//    public LocalDate getEndDate() {
//        return endDate;
//    }
//
//    public void setEndDate(LocalDate endDate) {
//        this.endDate = endDate;
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
//    public String getStatus() {
//        return status;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
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
//    public Long getPropertyId() {
//        return propertyId;
//    }
//
//    public void setPropertyId(Long propertyId) {
//        this.propertyId = propertyId;
//    }
//
//    public String getPropertyAddress() {
//        return propertyAddress;
//    }
//
//    public void setPropertyAddress(String propertyAddress) {
//        this.propertyAddress = propertyAddress;
//    }
//
//    public Long getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Long userId) {
//        this.userId = userId;
//    }
//
//    public String getUserName() {
//        return userName;
//    }
//
//    public void setUserName(String userName) {
//        this.userName = userName;
//    }
//}

package com.HIMS.dto;

import java.time.LocalDate;

public class PolicyResponse {

    private Long policyId;
    private String policyNumber;
    private String type;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double premium;
    private String status;
    private String coverageDetails;
    private String exclusions;

    private Long propertyId;
    private String propertyAddress;

    private Long userId;
    private String userName;

    // Getters and setters

    public Long getPolicyId() {
        return policyId;
    }

    public void setPolicyId(Long policyId) {
        this.policyId = policyId;
    }

    public String getPolicyNumber() {
        return policyNumber;
    }

    public void setPolicyNumber(String policyNumber) {
        this.policyNumber = policyNumber;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Double getPremium() {
        return premium;
    }

    public void setPremium(Double premium) {
        this.premium = premium;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }

    public String getPropertyAddress() {
        return propertyAddress;
    }

    public void setPropertyAddress(String propertyAddress) {
        this.propertyAddress = propertyAddress;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
