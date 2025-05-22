package com.example.userservice.controller;

import com.example.userservice.dto.UserResponse;
import com.example.userservice.model.User;
import com.example.userservice.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService; // Assuming UserService has a method to map User to UserResponse

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUserDetails(@AuthenticationPrincipal UserDetails userDetails) {
        // userDetails.getUsername() will return the email as configured in UserService's loadUserByUsername
        // And User entity which implements UserDetails
        if (userDetails instanceof User) {
            User user = (User) userDetails;
            UserResponse userResponse = UserResponse.builder()
                    .id(user.getId())
                    .email(user.getEmail())
                    .username(user.getUsername()) // This is the actual username field from User entity
                    .fullName(user.getFullName())
                    .avatarUrl(user.getAvatarUrl())
                    .build();
            return ResponseEntity.ok(userResponse);
        }
        // Fallback or error if UserDetails is not an instance of your User class
        // This might indicate a configuration issue or an unexpected UserDetails type
        // For now, we assume it's always our User instance due to CustomOAuth2UserService and UserService
        return ResponseEntity.status(500).build(); // Or throw an exception
    }
}
