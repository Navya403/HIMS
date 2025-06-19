package com.HIMS.controller;

import com.HIMS.dto.PropertyRequest;
import com.HIMS.dto.PropertyResponse;
import com.HIMS.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @PostMapping
    public ResponseEntity<PropertyResponse> createProperty(@RequestBody PropertyRequest request, Principal principal) {
        PropertyResponse response = propertyService.createPropertyForUser(request, principal.getName());
        return ResponseEntity.ok(response);
    }

    // New endpoint: Only return properties of the authenticated user
    @GetMapping("/my")
    public ResponseEntity<List<PropertyResponse>> getPropertiesOfLoggedInUser(Principal principal) {
        List<PropertyResponse> properties = propertyService.getPropertiesByUserEmail(principal.getName());
        return ResponseEntity.ok(properties); 
    }

    // New endpoint: User can get properties by their own email
    @GetMapping("/user/{email}")
    public ResponseEntity<List<PropertyResponse>> getPropertiesByUserEmail(@PathVariable String email, Principal principal) {
        // Only the user can access their own properties
        if (principal.getName().equals(email)) {
            List<PropertyResponse> properties = propertyService.getPropertiesByUserEmail(email);
            return ResponseEntity.ok(properties);
        } else {
            return ResponseEntity.status(403).body(null); // Forbidden if not the same email
        }
    }

    @GetMapping
    public ResponseEntity<List<PropertyResponse>> getAllProperties() {
        List<PropertyResponse> properties = propertyService.getAllProperties();
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyResponse> getPropertyById(@PathVariable Long id) {
        PropertyResponse response = propertyService.getPropertyById(id);
        return ResponseEntity.ok(response); 
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Admin-only delete
    public ResponseEntity<String> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.ok("Property deleted successfully.");
    }
}
