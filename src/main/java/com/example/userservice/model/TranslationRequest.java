package com.example.userservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "translation_requests")
public class TranslationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank
    @Column(nullable = false)
    private String sourceLanguage;

    @NotBlank
    @Column(nullable = false)
    private String targetLanguage;

    @NotBlank
    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String originalText;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String translatedText;

    @NotBlank
    @Column(nullable = false)
    private String status; // e.g., "processing", "completed", "failed"

    @Column
    private String errorMessage;

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime translationCompletedAt;
    
    @Column
    private Integer charactersProcessed;


    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) {
            status = "pending"; // Default status
        }
    }
}
