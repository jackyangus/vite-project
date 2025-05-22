package com.example.userservice.controller;

import com.example.userservice.dto.CreateTranslationRequest;
import com.example.userservice.dto.TranslationRequestResponse;
import com.example.userservice.service.TranslationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/translations")
public class TranslationController {

    private final TranslationService translationService;

    public TranslationController(TranslationService translationService) {
        this.translationService = translationService;
    }

    @PostMapping
    public ResponseEntity<TranslationRequestResponse> createTranslationRequest(
            @Valid @RequestBody CreateTranslationRequest request,
            @AuthenticationPrincipal UserDetails currentUser) {
        TranslationRequestResponse response = translationService.createTranslationRequest(request, currentUser);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response); // ACCEPTED because it's async
    }

    @GetMapping
    public ResponseEntity<List<TranslationRequestResponse>> getTranslationRequestsForUser(
            @AuthenticationPrincipal UserDetails currentUser) {
        List<TranslationRequestResponse> responses = translationService.getTranslationRequestsForUser(currentUser);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TranslationRequestResponse> getTranslationRequestByIdForUser(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails currentUser) {
        TranslationRequestResponse response = translationService.getTranslationRequestByIdForUser(id, currentUser);
        return ResponseEntity.ok(response);
    }
}
