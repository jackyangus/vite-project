package com.example.userservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class MachineTranslationException extends RuntimeException {
    public MachineTranslationException(String message) {
        super(message);
    }

    public MachineTranslationException(String message, Throwable cause) {
        super(message, cause);
    }
}
