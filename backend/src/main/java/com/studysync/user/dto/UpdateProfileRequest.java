package com.studysync.user.dto;

import jakarta.validation.constraints.Size;

/**
 * Partial profile update — any null field is left unchanged. (PATCH semantics.)
 */
public record UpdateProfileRequest(
        @Size(max = 80) String displayName,
        @Size(max = 512) String avatarUrl,
        @Size(max = 1000) String bio
) {
}
