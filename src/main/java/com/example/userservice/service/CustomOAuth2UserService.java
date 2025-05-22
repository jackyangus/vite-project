package com.example.userservice.service;

import com.example.userservice.model.User;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserService userService;

    public CustomOAuth2UserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String providerName = userRequest.getClientRegistration().getRegistrationId(); // "google"
        String providerUserId = oAuth2User.getAttribute("sub"); // Standard OpenID Connect subject identifier
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String avatarUrl = oAuth2User.getAttribute("picture");

        User user = userService.processOAuthPostLogin(providerUserId, providerName, email, name, avatarUrl);
        
        // Create a map of attributes for the OAuth2User
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("sub", providerUserId);
        attributes.put("email", email);
        attributes.put("name", name);
        attributes.put("picture", avatarUrl);
        
        // Return a DefaultOAuth2User with the user's authorities and attributes
        return new DefaultOAuth2User(user.getAuthorities(), attributes, "sub");
    }
}
