package com.example.userservice.config;

import com.example.userservice.model.User;
import com.example.userservice.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final String frontendOAuthRedirectUrl;

    public OAuth2LoginSuccessHandler(JwtService jwtService,
                                     @Value("${frontend.oauth.redirect.url:http://localhost:3000/oauth-callback}") String frontendOAuthRedirectUrl) {
        this.jwtService = jwtService;
        this.frontendOAuthRedirectUrl = frontendOAuthRedirectUrl;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        if (authentication.getPrincipal() instanceof User) {
            User user = (User) authentication.getPrincipal();
            String token = jwtService.generateToken(user);

            String targetUrl = UriComponentsBuilder.fromUriString(frontendOAuthRedirectUrl)
                    .queryParam("token", token)
                    .build().toUriString();
            
            // Store user details or token in session if preferred, or directly use in response
            // For SPA, redirecting with token is common
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        } else {
            // Handle cases where principal is not your User type, though it should be with CustomOAuth2UserService
            super.onAuthenticationSuccess(request, response, authentication);
        }
    }
}
