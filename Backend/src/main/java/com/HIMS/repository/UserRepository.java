package com.HIMS.repository;

import com.HIMS.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);


    // Added for password reset support
    Optional<User> findByResetToken(String resetToken);
}
