package com.HIMS.service;

import com.HIMS.dto.PolicyRequest;
import com.HIMS.dto.PolicyResponse;
import com.HIMS.model.Policy;
import com.HIMS.model.Property;
import com.HIMS.model.User;
import com.HIMS.repository.PolicyRepository;
import com.HIMS.repository.PropertyRepository;
import com.HIMS.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PolicyService {

    private static final Logger logger = LoggerFactory.getLogger(PolicyService.class);

    @Autowired
    private PolicyRepository policyRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public PolicyResponse savePolicy(PolicyRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User not found"));
        Long userId = user.getId();

        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        if (request.getType() == null || request.getType().isEmpty()) {
            throw new IllegalArgumentException("Policy type cannot be empty");
        }

        Policy policy = new Policy();
        policy.setUser(user);
        policy.setType(request.getType());
        policy.setPremium(request.getPremium() != null ? request.getPremium() : 0.0);
        policy.setCoverageDetails(request.getCoverageDetails());
        policy.setExclusions(request.getExclusions());
        policy.setStatus("PENDING");

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if (request.getStartDate() != null) {
            policy.setStartDate(LocalDate.parse(request.getStartDate(), formatter));
        }
        if (request.getEndDate() != null) {
            policy.setEndDate(LocalDate.parse(request.getEndDate(), formatter));
        }

        if (request.getPropertyId() != null) {
            Property property = propertyRepository.findById(request.getPropertyId())
                    .orElseThrow(() -> new RuntimeException("Property not found with ID: " + request.getPropertyId()));
            policy.setProperty(property);
        }

        policy.setPolicyNumber("POL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        Policy savedPolicy = policyRepository.save(policy);
        return mapToResponse(savedPolicy);
    }

    public List<PolicyResponse> getPoliciesByProperty(Long propertyId) {
        return policyRepository.findByPropertyPropertyId(propertyId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<PolicyResponse> getAllPolicies() {
        return policyRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<PolicyResponse> getPoliciesForCurrentUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            logger.info("Fetching policies for user: {}", username);

            User user = userRepository.findByEmail(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            return policyRepository.findByUserId(user.getId())
                    .stream()
                    .map(this::mapToResponse)
                    .collect(Collectors.toList());
        } catch (Exception ex) {
            logger.error("Error in getPoliciesForCurrentUser: {}", ex.getMessage(), ex);
            throw new RuntimeException("Failed to fetch user policies", ex);
        }
    }

    private PolicyResponse mapToResponse(Policy policy) {
        PolicyResponse response = new PolicyResponse();
        response.setPolicyId(policy.getPolicyId());
        response.setPolicyNumber(policy.getPolicyNumber());
        response.setType(policy.getType());
        response.setPremium(policy.getPremium());
        response.setCoverageDetails(policy.getCoverageDetails());
        response.setExclusions(policy.getExclusions());
        response.setStatus(policy.getStatus());
        response.setStartDate(policy.getStartDate());
        response.setEndDate(policy.getEndDate());

        if (policy.getProperty() != null) {
            response.setPropertyId(policy.getProperty().getPropertyId());
            response.setPropertyAddress(policy.getProperty().getAddress());
        }

        if (policy.getUser() != null) {
            response.setUserId(policy.getUser().getId());
            response.setUserName(policy.getUser().getFirstName() + " " + policy.getUser().getLastName());
        }

        return response;
    }
}
