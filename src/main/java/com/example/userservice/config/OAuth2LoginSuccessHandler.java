package com.example.userservice.config;

import com.example.userservice.model.User;
import com.example.userservice.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
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
        if (authentication.getPrincipal() instanceof DefaultOAuth2User) {
            DefaultOAuth2User oauth2User = (DefaultOAuth2User) authentication.getPrincipal();
            String email = oauth2User.getAttribute("email");
            String name = oauth2User.getAttribute("name");
            String picture = oauth2User.getAttribute("picture");
            
            // Create a User object with the OAuth2 attributes
            User user = new User();
            user.setEmail(email);
            user.setFullName(name);
            user.setAvatarUrl(picture);
            
            String token = jwtService.generateToken(user);

            String targetUrl = UriComponentsBuilder.fromUriString(frontendOAuthRedirectUrl)
                    .queryParam("token", token)
                    .build().toUriString();
            
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        } else {
            super.onAuthenticationSuccess(request, response, authentication);
        }
    }
}
