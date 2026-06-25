package com.studysync.user.dto;

/**
 * Returned by register/login/refresh. The client stores {@code accessToken} for Authorization
 * headers and {@code refreshToken} to obtain a new access token when it expires.
 */
public record TokenResponse(
        String accessToken,
        String refreshToken,
        String tokenType,
        long expiresInSeconds,
        UserResponse user
) {
    public static TokenResponse bearer(String access, String refresh, long expiresIn, UserResponse user) {
        return new TokenResponse(access, refresh, "Bearer", expiresIn, user);
    }
}
