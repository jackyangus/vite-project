package com.example.userservice.service;

import com.example.userservice.dto.CreateTranslationRequest;
import com.example.userservice.dto.TranslationRequestResponse;
import com.example.userservice.exception.MachineTranslationException;
import com.example.userservice.exception.TranslationRequestNotFoundException;
import com.example.userservice.exception.UserNotFoundException;
import com.example.userservice.model.TranslationRequest;
import com.example.userservice.model.User;
import com.example.userservice.repository.TranslationRequestRepository;
import com.example.userservice.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TranslationService {

    private static final Logger logger = LoggerFactory.getLogger(TranslationService.class);

    private final TranslationRequestRepository translationRequestRepository;
    private final UserRepository userRepository;
    private final MachineTranslationServiceClient machineTranslationServiceClient;

    public TranslationService(TranslationRequestRepository translationRequestRepository,
                              UserRepository userRepository,
                              MachineTranslationServiceClient machineTranslationServiceClient) {
        this.translationRequestRepository = translationRequestRepository;
        this.userRepository = userRepository;
        this.machineTranslationServiceClient = machineTranslationServiceClient;
    }

    @Transactional
    public TranslationRequestResponse createTranslationRequest(CreateTranslationRequest request, UserDetails currentUserDetails) {
        User user = userRepository.findByEmail(currentUserDetails.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + currentUserDetails.getUsername()));

        TranslationRequest translationRequest = new TranslationRequest();
        translationRequest.setUser(user);
        translationRequest.setSourceLanguage(request.getSourceLanguage());
        translationRequest.setTargetLanguage(request.getTargetLanguage());
        translationRequest.setOriginalText(request.getOriginalText());
        translationRequest.setStatus("processing"); // Initial status
        // charactersProcessed will be set after translation

        TranslationRequest savedRequest = translationRequestRepository.save(translationRequest);

        // Trigger asynchronous translation
        performTranslation(savedRequest);

        return mapToResponse(savedRequest);
    }

    @Async
    @Transactional
    public void performTranslation(TranslationRequest requestEntity) {
        logger.info("Starting translation for request ID: {}", requestEntity.getId());
        try {
            String translatedText = machineTranslationServiceClient.translate(
                    requestEntity.getOriginalText(),
                    requestEntity.getSourceLanguage(),
                    requestEntity.getTargetLanguage()
            );
            requestEntity.setTranslatedText(translatedText);
            requestEntity.setStatus("completed");
            requestEntity.setTranslationCompletedAt(LocalDateTime.now());
            requestEntity.setCharactersProcessed(requestEntity.getOriginalText().length());
            logger.info("Translation completed for request ID: {}", requestEntity.getId());
        } catch (MachineTranslationException e) {
            logger.error("Translation failed for request ID: {}. Error: {}", requestEntity.getId(), e.getMessage());
            requestEntity.setStatus("failed");
            requestEntity.setErrorMessage(e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error during translation for request ID: {}. Error: {}", requestEntity.getId(), e.getMessage(), e);
            requestEntity.setStatus("failed");
            requestEntity.setErrorMessage("An unexpected error occurred during translation.");
        }
        translationRequestRepository.save(requestEntity);
    }

    @Transactional(readOnly = true)
    public List<TranslationRequestResponse> getTranslationRequestsForUser(UserDetails currentUserDetails) {
        User user = userRepository.findByEmail(currentUserDetails.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + currentUserDetails.getUsername()));
        return translationRequestRepository.findByUserId(user.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TranslationRequestResponse getTranslationRequestByIdForUser(Long id, UserDetails currentUserDetails) {
        User user = userRepository.findByEmail(currentUserDetails.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + currentUserDetails.getUsername()));
        return translationRequestRepository.findByIdAndUserId(id, user.getId())
                .map(this::mapToResponse)
                .orElseThrow(() -> new TranslationRequestNotFoundException("Translation request not found with ID: " + id + " for user " + user.getId()));
    }

    private TranslationRequestResponse mapToResponse(TranslationRequest entity) {
        return TranslationRequestResponse.builder()
                .id(entity.getId())
                .userId(entity.getUser().getId())
                .sourceLanguage(entity.getSourceLanguage())
                .targetLanguage(entity.getTargetLanguage())
                .originalText(entity.getOriginalText())
                .translatedText(entity.getTranslatedText())
                .status(entity.getStatus())
                .errorMessage(entity.getErrorMessage())
                .createdAt(entity.getCreatedAt())
                .translationCompletedAt(entity.getTranslationCompletedAt())
                .charactersProcessed(entity.getCharactersProcessed())
                .build();
    }
}
