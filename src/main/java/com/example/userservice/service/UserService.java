package com.example.userservice.service;

import com.example.userservice.dto.AuthResponse;
import com.example.userservice.dto.LoginRequest;
import com.example.userservice.dto.RegistrationRequest;
import com.example.userservice.dto.UserResponse;
import com.example.userservice.exception.EmailAlreadyExistsException;
import com.example.userservice.exception.InvalidCredentialsException;
import com.example.userservice.model.User;
import com.example.userservice.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import com.example.userservice.model.UserOauthIdentity;
import com.example.userservice.repository.UserOauthIdentityRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserOauthIdentityRepository userOauthIdentityRepository;
    private final PasswordHashingService passwordHashingService;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository,
                       UserOauthIdentityRepository userOauthIdentityRepository,
                       PasswordHashingService passwordHashingService,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.userOauthIdentityRepository = userOauthIdentityRepository;
        this.passwordHashingService = passwordHashingService;
        this.jwtService = jwtService;
    }

    @Transactional
    public UserResponse registerUser(RegistrationRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already in use: " + request.getEmail());
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordHashingService.hashPassword(request.getPassword()));
        user.setUsername(request.getUsername());
        user.setFullName(request.getFullName());
        // avatarUrl can be set later, or via a different process

        User savedUser = userRepository.save(user);
        return mapUserToUserResponse(savedUser);
    }

    @Transactional
    public AuthResponse loginUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordHashingService.checkPassword(request.getPassword(), user.getPasswordHash())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user); // Update last login time

        String accessToken = jwtService.generateToken(user);
        return new AuthResponse(accessToken, mapUserToUserResponse(user));
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    private UserResponse mapUserToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .avatarUrl(user.getAvatarUrl())
                .build();
    }

    @Transactional
    public User processOAuthPostLogin(String providerUserId, String providerName, String email, String fullName, String avatarUrl) {
        Optional<UserOauthIdentity> oauthIdentityOpt = userOauthIdentityRepository.findByProviderNameAndProviderUserId(providerName, providerUserId);

        User user;
        if (oauthIdentityOpt.isPresent()) {
            // User already linked with this OAuth provider
            user = oauthIdentityOpt.get().getUser();
            user.setFullName(fullName); // Update name if changed
            user.setAvatarUrl(avatarUrl); // Update avatar if changed
            user.setLastLoginAt(LocalDateTime.now());
            userRepository.save(user);
        } else {
            // New OAuth login, check if user exists by email
            Optional<User> existingUserOpt = userRepository.findByEmail(email);
            if (existingUserOpt.isPresent()) {
                // Email exists, link OAuth to this existing user
                user = existingUserOpt.get();
                user.setFullName(fullName); // Might update name if it was null or different
                user.setAvatarUrl(avatarUrl); // Might update avatar
                user.setLastLoginAt(LocalDateTime.now());
                // Username might remain as is, or you could decide to update it
            } else {
                // New user, create both User and UserOauthIdentity
                user = new User();
                user.setEmail(email);
                user.setFullName(fullName);
                user.setAvatarUrl(avatarUrl);
                // For username, you can derive it from email or name, or set a default
                // For example, extract part of email before @
                user.setUsername(email.split("@")[0]); // Basic username generation
                // Password hash is null for OAuth users initially
            }
            user.setLastLoginAt(LocalDateTime.now());
            User savedUser = userRepository.save(user);

            // Create and link UserOauthIdentity
            UserOauthIdentity newIdentity = new UserOauthIdentity();
            newIdentity.setUser(savedUser);
            newIdentity.setProviderName(providerName);
            newIdentity.setProviderUserId(providerUserId);
            // You could store oAuth2User.getAttributes() in profileData if needed
            userOauthIdentityRepository.save(newIdentity);
            user = savedUser; // ensure 'user' variable refers to the saved entity
        }
        return user;
    }
}
