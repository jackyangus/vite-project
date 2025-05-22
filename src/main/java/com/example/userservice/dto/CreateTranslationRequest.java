package com.example.userservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateTranslationRequest {

    @NotBlank(message = "Source language is required")
    private String sourceLanguage;

    @NotBlank(message = "Target language is required")
    private String targetLanguage;

    @NotBlank(message = "Original text is required")
    private String originalText;
}
