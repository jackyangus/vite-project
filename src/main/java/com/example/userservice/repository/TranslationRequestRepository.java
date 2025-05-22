package com.example.userservice.repository;

import com.example.userservice.model.TranslationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TranslationRequestRepository extends JpaRepository<TranslationRequest, Long> {
    List<TranslationRequest> findByUserId(Long userId);
    Optional<TranslationRequest> findByIdAndUserId(Long id, Long userId);
}
