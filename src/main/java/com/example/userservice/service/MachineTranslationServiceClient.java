package com.example.userservice.service;

import com.example.userservice.exception.MachineTranslationException;

public interface MachineTranslationServiceClient {
    String translate(String text, String sourceLang, String targetLang) throws MachineTranslationException;
}
