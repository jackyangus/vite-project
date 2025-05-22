package com.example.userservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<Object> handleEmailAlreadyExistsException(
            EmailAlreadyExistsException ex, WebRequest request) {
        logger.warn("EmailAlreadyExistsException: {} for request: {}", ex.getMessage(), request.getDescription(false));
        return buildErrorResponse(ex, HttpStatus.CONFLICT, request);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<Object> handleInvalidCredentialsException(
            InvalidCredentialsException ex, WebRequest request) {
        logger.warn("InvalidCredentialsException: {} for request: {}", ex.getMessage(), request.getDescription(false));
        return buildErrorResponse(ex, HttpStatus.UNAUTHORIZED, request);
    }

    @ExceptionHandler(UsernameNotFoundException.class) // Spring Security's exception
    public ResponseEntity<Object> handleUsernameNotFoundException(
            UsernameNotFoundException ex, WebRequest request) {
        logger.warn("UsernameNotFoundException: {} for request: {}", ex.getMessage(), request.getDescription(false));
        return buildErrorResponse(ex, HttpStatus.NOT_FOUND, request);
    }
    
    @ExceptionHandler(UserNotFoundException.class) // Custom UserNotFoundException
    public ResponseEntity<Object> handleUserNotFoundException(
            UserNotFoundException ex, WebRequest request) {
        logger.warn("UserNotFoundException: {} for request: {}", ex.getMessage(), request.getDescription(false));
        return buildErrorResponse(ex, HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(TranslationRequestNotFoundException.class)
    public ResponseEntity<Object> handleTranslationRequestNotFoundException(
            TranslationRequestNotFoundException ex, WebRequest request) {
        logger.warn("TranslationRequestNotFoundException: {} for request: {}", ex.getMessage(), request.getDescription(false));
        return buildErrorResponse(ex, HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(MachineTranslationException.class)
    public ResponseEntity<Object> handleMachineTranslationException(
            MachineTranslationException ex, WebRequest request) {
        logger.error("MachineTranslationException: {} for request: {}", ex.getMessage(), request.getDescription(false), ex);
        return buildErrorResponse(ex, HttpStatus.INTERNAL_SERVER_ERROR, request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, WebRequest request) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.BAD_REQUEST.value());

        // Get all validation errors
        Map<String, String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                        fieldError -> fieldError.getField(),
                        fieldError -> fieldError.getDefaultMessage() == null ? "Validation error" : fieldError.getDefaultMessage()
                ));
        body.put("errors", errors);
        String path = request.getDescription(false).replace("uri=", "");
        body.put("path", path);
        logger.warn("MethodArgumentNotValidException: {} for request: {} with errors: {}", ex.getMessage(), path, errors);

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(Exception.class) // Fallback for any other exceptions
    public ResponseEntity<Object> handleGenericException(
            Exception ex, WebRequest request) {
        logger.error("An unexpected error occurred: {} for request: {}", ex.getMessage(), request.getDescription(false), ex);
        return buildErrorResponse(ex, HttpStatus.INTERNAL_SERVER_ERROR, request, "An unexpected error occurred. Please try again later.");
    }

    private ResponseEntity<Object> buildErrorResponse(
            Exception ex, HttpStatus status, WebRequest request) {
        return buildErrorResponse(ex, status, request, ex.getMessage());
    }
    
    private ResponseEntity<Object> buildErrorResponse(
                Exception ex, HttpStatus status, WebRequest request, String message) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message);
        body.put("path", request.getDescription(false).replace("uri=", ""));

        return new ResponseEntity<>(body, status);
    }
}
