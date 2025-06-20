package com.HIMS.repository;

import com.HIMS.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByClaim_ClaimId(Long claimId);
}
