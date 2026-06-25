package com.studysync.user;

import com.studysync.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

/**
 * A persisted refresh token, stored as a SHA-256 hash (never the raw value). Supports rotation
 * (each use revokes the old and links to its replacement) and family revoke-on-logout / on
 * password change. Opaque random strings, deliberately not JWTs, so revocation is real.
 */
@Entity
@Table(name = "refresh_tokens")
@Getter
@Setter
public class RefreshToken extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "token_hash", nullable = false, unique = true)
    private String tokenHash;

    @Column(name = "expires_at", nullable = false)
    private Instant expiresAt;

    @Column(nullable = false)
    private boolean revoked = false;

    @Column(name = "replaced_by")
    private String replacedBy;

    public boolean isActive() {
        return !revoked && expiresAt.isAfter(Instant.now());
    }
}
