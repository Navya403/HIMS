package com.HIMS.service;

import com.HIMS.dto.PropertyRequest;
import com.HIMS.dto.PropertyResponse;
import com.HIMS.model.Property;
import com.HIMS.model.User;
import com.HIMS.repository.PropertyRepository;
import com.HIMS.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    public PropertyResponse createPropertyForUser(PropertyRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Property property = new Property();
        property.setAddress(request.getAddress());
        property.setCity(request.getCity());
        property.setZipcode(request.getZipcode());
        property.setSize(request.getPropertySize());
        property.setEstimatedAmount(request.getPropertyValue());
        property.setPropertyType(request.getType());
        property.setNumberOfRooms(request.getNumberOfRooms());
        property.setImageUrl(request.getImageUrl());
        property.setDateBuilt(request.getDateBuilt());
        property.setUser(user); // Associate with authenticated user

        Property saved = propertyRepository.save(property);
        return mapToResponse(saved);
    }

    public List<PropertyResponse> getAllProperties() {
        return propertyRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<PropertyResponse> getPropertiesByUserEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return propertyRepository.findByUser(user).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public PropertyResponse getPropertyById(Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        return mapToResponse(property);
    }

    public void deleteProperty(Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        propertyRepository.delete(property);
    }

    private PropertyResponse mapToResponse(Property property) {
        PropertyResponse response = new PropertyResponse();
        response.setPropertyId(property.getPropertyId());
        response.setAddress(property.getAddress());
        response.setCity(property.getCity());
        response.setZipcode(property.getZipcode());
        response.setPropertySize(property.getSize());
        response.setPropertyValue(property.getEstimatedAmount());
        response.setType(property.getPropertyType());
        response.setNumberOfRooms(property.getNumberOfRooms());
        response.setImageUrl(property.getImageUrl());
        response.setOwnerEmail(property.getUser().getEmail());
        response.setDateBuilt(property.getDateBuilt());
        return response;
    }
}
