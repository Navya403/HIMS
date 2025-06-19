package com.HIMS.repository;

import com.HIMS.model.Property;
import com.HIMS.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByUser(User user); 
}
