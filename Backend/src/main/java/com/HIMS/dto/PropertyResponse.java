package com.HIMS.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PropertyResponse {
    private Long propertyId;
    private String address;
    private String city;
    private String zipcode;
    private BigDecimal propertySize;
    private BigDecimal propertyValue;
    private String type;
    private int numberOfRooms;
    private String imageUrl;
    private String ownerEmail;
    private LocalDate dateBuilt; // <-- added field

    public Long getPropertyId() { return propertyId; }
    public void setPropertyId(Long propertyId) { this.propertyId = propertyId; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getZipcode() { return zipcode; }
    public void setZipcode(String zipcode) { this.zipcode = zipcode; }

    public BigDecimal getPropertySize() { return propertySize; }
    public void setPropertySize(BigDecimal propertySize) { this.propertySize = propertySize; }

    public BigDecimal getPropertyValue() { return propertyValue; }
    public void setPropertyValue(BigDecimal propertyValue) { this.propertyValue = propertyValue; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public int getNumberOfRooms() { return numberOfRooms; }
    public void setNumberOfRooms(int numberOfRooms) { this.numberOfRooms = numberOfRooms; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getOwnerEmail() { return ownerEmail; }
    public void setOwnerEmail(String ownerEmail) { this.ownerEmail = ownerEmail; }

    public LocalDate getDateBuilt() { return dateBuilt; } // getter
    public void setDateBuilt(LocalDate dateBuilt) { this.dateBuilt = dateBuilt; } // setter
}
