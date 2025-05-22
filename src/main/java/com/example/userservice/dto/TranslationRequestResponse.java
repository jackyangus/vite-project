package com.example.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TranslationRequestResponse {
    private Long id;
    private Long userId;
    private String sourceLanguage;
    private String targetLanguage;
    private String originalText;
    private String translatedText;
    private String status;
    private String errorMessage;
    private LocalDateTime createdAt;
    private LocalDateTime translationCompletedAt;
    private Integer charactersProcessed;
}
