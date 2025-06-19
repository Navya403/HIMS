package com.HIMS.controller;

import com.HIMS.dto.ClaimRequest;
import com.HIMS.dto.ClaimResponse;
import com.HIMS.dto.StatusUpdateRequest;
import com.HIMS.service.ClaimService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/claims")
public class ClaimController {

    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @PostMapping("/create")
    public ClaimResponse submitClaim(@RequestBody ClaimRequest request) {
        return claimService.submitClaim(request);
    }

    @GetMapping("/user")
    public List<ClaimResponse> getClaimsByUser() {
        return claimService.getClaimsByUser();
    }

    @GetMapping("/{claimId}")
    public ClaimResponse getClaimById(@PathVariable Long claimId) {
        return claimService.getClaimById(claimId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<ClaimResponse>> getAllClaims() {
        List<ClaimResponse> claims = claimService.getAllClaims();
        return ResponseEntity.ok(claims);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteClaim(@PathVariable Long id) {
        claimService.deleteClaim(id);
        return ResponseEntity.ok("Claim deleted successfully.");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/status")
    public ResponseEntity<ClaimResponse> updateClaimStatus(@PathVariable Long id, @RequestBody StatusUpdateRequest request) {
        ClaimResponse updatedClaim = claimService.updateClaimStatus(id, request.getStatus());
        return ResponseEntity.ok(updatedClaim);
    }
}
