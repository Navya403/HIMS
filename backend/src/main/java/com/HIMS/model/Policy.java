//package com.HIMS.model;
//
//import jakarta.persistence.*;
//import java.time.LocalDate;
//
//@Entity
//@Table(name = "policies")
//public class Policy {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "policy_id")
//    private Long policyId;
//
//    @Column(name = "policy_number", unique = true, nullable = false)
//    private String policyNumber;
//
//    @Column(nullable = false)
//    private String type;
//
//    @Column(name = "start_date")
//    private LocalDate startDate;
//
//    @Column(name = "end_date")
//    private LocalDate endDate;
//
//    private double premium;
//
//    private String status; // TEMPLATE, PENDING, APPROVED, etc.
//
//    @Column(name = "coverage_details")
//    private String coverageDetails;
//
//    private String exclusions;
//
//    @ManyToOne
//    @JoinColumn(name = "property_id")
//    private Property property;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    // Getters and Setters
//    public Long getPolicyId() {
//        return policyId;
//    }
//
//    public void setPolicyId(Long policyId) {
//        this.policyId = policyId;
//    }
//
//    public String getPolicyNumber() {
//        return policyNumber;
//    }
//
//    public void setPolicyNumber(String policyNumber) {
//        this.policyNumber = policyNumber;
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
//    public double getPremium() {
//        return premium;
//    }
//
//    public void setPremium(double premium) {
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
//    public Property getProperty() {
//        return property;
//    }
//
//    public void setProperty(Property property) {
//        this.property = property;
//    }
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//}


package com.HIMS.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "policies")
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "policy_id")
    private Long policyId;

    @Column(name = "policy_number", unique = true, nullable = false)
    private String policyNumber;

    @Column(nullable = false)
    private String type;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(nullable = false)
    private double premium;

    @Column(nullable = false)
    private String status;

    @Column(name = "coverage_details", columnDefinition = "TEXT")
    private String coverageDetails;

    @Column(columnDefinition = "TEXT")
    private String exclusions;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id")
    private Property property;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Constructors
    public Policy() {
    }

    // Getters and Setters
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

    public double getPremium() {
        return premium;
    }

    public void setPremium(double premium) {
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

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
