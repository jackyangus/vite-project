package com.example.userservice.service;

import com.example.userservice.exception.MachineTranslationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class GoogleTranslateServiceClient implements MachineTranslationServiceClient {

    private static final Logger logger = LoggerFactory.getLogger(GoogleTranslateServiceClient.class);

    private final RestTemplate restTemplate;
    private final String apiKey;
    // Using a placeholder URL as the actual Google Translate API v2 endpoint is paid.
    // For a real application, use the official Google Cloud Translation API v3 and its client library.
    private final String googleTranslateApiUrl = "https://translation.googleapis.com/language/translate/v2";


    public GoogleTranslateServiceClient(RestTemplate restTemplate,
                                        @Value("${google.translate.api.key:dummy-key}") String apiKey) {
        this.restTemplate = restTemplate;
        this.apiKey = apiKey;
    }

    @Override
    public String translate(String text, String sourceLang, String targetLang) throws MachineTranslationException {
        // This is a mock implementation because the actual API is not free.
        // In a real scenario, you would use the Google Cloud Translation client library
        // or make a proper HTTP request to the API.
        logger.info("Attempting to translate text: '{}' from {} to {}", text, sourceLang, targetLang);
        if ("dummy-key".equals(apiKey) || apiKey == null || apiKey.trim().isEmpty()) {
            logger.warn("Using mock translation due to missing or dummy API key.");
            // Simulate a delay and return a mock translation
            try {
                Thread.sleep(1000); // Simulate network latency
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new MachineTranslationException("Mock translation interrupted", e);
            }
            if("error".equalsIgnoreCase(text)){
                 throw new MachineTranslationException("Mock translation failed for text: " + text);
            }
            return "Mock translated text: " + text + " (from " + sourceLang + " to " + targetLang + ")";
        }

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey); // Or "key=" + apiKey depending on API version
        headers.set("Content-Type", "application/json; charset=utf-8");


        Map<String, Object> body = new HashMap<>();
        body.put("q", text);
        body.put("source", sourceLang);
        body.put("target", targetLang);
        body.put("format", "text");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            // The actual Google Translate API v2 expects parameters in the query string for GET,
            // or form-urlencoded for POST, not JSON for simple text translation.
            // This structure is more aligned with typical modern APIs or the advanced features of Google Translate API v3.
            // For v2 with RestTemplate, you'd typically build a URI with query parameters.
            // Example for v2 GET:
            // UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(googleTranslateApiUrl)
            // .queryParam("key", apiKey)
            // .queryParam("q", text)
            // .queryParam("source", sourceLang)
            // .queryParam("target", targetLang);
            // ResponseEntity<Map> response = restTemplate.getForEntity(builder.toUriString(), Map.class);

            // Let's assume a POST endpoint that accepts JSON for simplicity of this example,
            // although this is not standard for Google Translate API v2 basic usage.
            ResponseEntity<Map> response = restTemplate.exchange(googleTranslateApiUrl, HttpMethod.POST, entity, Map.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Map responseBody = response.getBody();
                // Simplified parsing, actual response structure needs to be handled correctly
                // For Google Translate API v2:
                // response.data.translations[0].translatedText
                if (responseBody.containsKey("data")) {
                    Map data = (Map) responseBody.get("data");
                    if (data.containsKey("translations")) {
                        java.util.List<Map> translations = (java.util.List<Map>) data.get("translations");
                        if (!translations.isEmpty() && translations.get(0).containsKey("translatedText")) {
                            return (String) translations.get(0).get("translatedText");
                        }
                    }
                }
                throw new MachineTranslationException("Failed to parse translation response: " + responseBody.toString());
            } else {
                throw new MachineTranslationException("Failed to translate text. Status: " + response.getStatusCode() + ", Body: " + response.getBody());
            }
        } catch (RestClientException e) {
            logger.error("Error calling Google Translate API: {}", e.getMessage(), e);
            throw new MachineTranslationException("Error calling translation service: " + e.getMessage(), e);
        }
    }
}
