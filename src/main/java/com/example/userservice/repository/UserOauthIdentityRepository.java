package com.example.userservice.repository;

import com.example.userservice.model.UserOauthIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserOauthIdentityRepository extends JpaRepository<UserOauthIdentity, Long> {
    Optional<UserOauthIdentity> findByProviderNameAndProviderUserId(String providerName, String providerUserId);
}
