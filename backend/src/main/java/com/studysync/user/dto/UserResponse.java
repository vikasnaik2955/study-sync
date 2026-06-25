package com.studysync.user.dto;

import com.studysync.user.Role;
import com.studysync.user.User;

import java.time.Instant;
import java.util.UUID;

/** Public-safe view of a user. The password hash is never part of any DTO. */
public record UserResponse(
        UUID id,
        String email,
        String displayName,
        String avatarUrl,
        String bio,
        Role role,
        Instant createdAt
) {
    public static UserResponse from(User u) {
        return new UserResponse(
                u.getId(), u.getEmail(), u.getDisplayName(),
                u.getAvatarUrl(), u.getBio(), u.getRole(), u.getCreatedAt());
    }
}
