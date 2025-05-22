package com.example.userservice.service;

import com.example.userservice.model.User;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

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
        
        // Spring Security expects an OAuth2User, so we return our User entity which implements UserDetails
        // and can be adapted or wrapped if more OAuth2-specific attributes are needed by other parts of the framework.
        // For now, returning our User directly works because it implements UserDetails.
        return user;
    }
}
