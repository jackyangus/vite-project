package com.example.userservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {
    
    private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> home(HttpServletRequest request) {
        // debug - Place breakpoint here in your IDE
        logger.info("Request received at / endpoint from IP: {}", request.getRemoteAddr());
        logger.debug("Request headers: {}", request.getHeaderNames());
        
        // Good variables to inspect in debugger:
        // - request.getHeaderNames()
        // - request.getParameterMap()
        // - request.getMethod()
        
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Welcome to Mercury API");
        response.put("version", "1.0.0");
        response.put("timestamp", System.currentTimeMillis());
        
        logger.info("Sending response: {}", response);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("service", "Mercury User Service");
        health.put("time", System.currentTimeMillis());
        
        return ResponseEntity.ok(health);
    }
} 