package com.HIMS.repository;
import com.HIMS.model.ClaimStatus;
import com.HIMS.model.Claim;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByUserId(Long userId);
    List<Claim> findByStatus(ClaimStatus status);

}
