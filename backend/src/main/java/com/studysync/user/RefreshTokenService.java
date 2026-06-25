package com.studysync.user;

import com.studysync.common.exception.UnauthorizedException;
import com.studysync.security.JwtProperties;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.HexFormat;
import java.util.UUID;

/**
 * Owns the refresh-token lifecycle: issue, rotate, and revoke. Raw tokens are high-entropy
 * random strings handed to the client once; only their SHA-256 hash is stored, so a DB leak
 * cannot be replayed. Rotation revokes the presented token and links it to its replacement.
 */
@Service
public class RefreshTokenService {

    private final RefreshTokenRepository repository;
    private final JwtProperties jwtProperties;
    private final SecureRandom secureRandom = new SecureRandom();

    public RefreshTokenService(RefreshTokenRepository repository, JwtProperties jwtProperties) {
        this.repository = repository;
        this.jwtProperties = jwtProperties;
    }

    /** Issue a brand-new refresh token for a user; returns the RAW value (shown once). */
    @Transactional
    public String issue(User user) {
        String raw = randomToken();
        RefreshToken token = new RefreshToken();
        token.setUser(user);
        token.setTokenHash(hash(raw));
        token.setExpiresAt(Instant.now().plus(jwtProperties.refreshTtl()));
        repository.save(token);
        return raw;
    }

    /**
     * Rotate: validate the presented raw token, revoke it, and issue a replacement.
     * Returns the owning user plus the new raw token.
     */
    @Transactional
    public RotationResult rotate(String rawToken) {
        RefreshToken current = repository.findByTokenHash(hash(rawToken))
                .orElseThrow(() -> new UnauthorizedException("Invalid refresh token."));

        if (!current.isActive()) {
            // Reuse of a revoked/expired token is suspicious — revoke the whole family.
            repository.revokeAllForUser(current.getUser().getId());
            throw new UnauthorizedException("Refresh token is no longer valid.");
        }

        String newRaw = randomToken();
        current.setRevoked(true);
        current.setReplacedBy(hash(newRaw));

        RefreshToken replacement = new RefreshToken();
        replacement.setUser(current.getUser());
        replacement.setTokenHash(hash(newRaw));
        replacement.setExpiresAt(Instant.now().plus(jwtProperties.refreshTtl()));
        repository.save(replacement);

        return new RotationResult(current.getUser(), newRaw);
    }

    /** Revoke every active token for a user (logout, password change). */
    @Transactional
    public void revokeAllForUser(UUID userId) {
        repository.revokeAllForUser(userId);
    }

    public record RotationResult(User user, String rawToken) {}

    private String randomToken() {
        byte[] bytes = new byte[48];
        secureRandom.nextBytes(bytes);
        return UUID.randomUUID() + "." + Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private String hash(String raw) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] out = digest.digest(raw.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(out);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 unavailable", e);
        }
    }
}
