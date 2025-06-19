package com.HIMS.repository;

import com.HIMS.model.Policy;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface PolicyRepository extends JpaRepository<Policy, Long> {
	
    List<Policy> findByPropertyPropertyId(Long propertyId);
    List<Policy> findByUserId(Long userId);

}

