package com.HIMS.controller;

import com.HIMS.dto.PolicyRequest;
import com.HIMS.dto.PolicyResponse;
import com.HIMS.service.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
public class PolicyController {

    @Autowired
    private PolicyService policyService;

    @PostMapping("/submit")
    public PolicyResponse savePolicy(@RequestBody PolicyRequest request) {
        return policyService.savePolicy(request);
    }

    @GetMapping("/property/{propertyId}")
    public List<PolicyResponse> getPoliciesByProperty(@PathVariable Long propertyId) {
        return policyService.getPoliciesByProperty(propertyId);
    }

    @GetMapping("/user")
    public List<PolicyResponse> getUserPolicies() {
        return policyService.getPoliciesForCurrentUser();
    }

    @GetMapping("/all")
    public List<PolicyResponse> getAllPolicies() {
        return policyService.getAllPolicies();
    }
}
