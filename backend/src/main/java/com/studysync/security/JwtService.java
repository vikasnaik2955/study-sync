package com.studysync.security;

import com.studysync.user.Role;
import com.studysync.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

/**
 * Issues and verifies the short-lived <strong>access</strong> JWT (HS256). Refresh tokens are
 * opaque random strings persisted hashed (see {@code RefreshTokenService}) — they are deliberately
 * NOT JWTs so logout/rotation can truly revoke them server-side.
 */
@Service
public class JwtService {

    private final SecretKey key;
    private final JwtProperties props;

    public JwtService(JwtProperties props) {
        this.props = props;
        this.key = Keys.hmacShaKeyFor(props.secret().getBytes(StandardCharsets.UTF_8));
    }

    /** Mint an access token whose claims fully describe the principal (id, email, role). */
    public String generateAccessToken(User user) {
        Instant now = Instant.now();
        return Jwts.builder()
                .issuer(props.issuer())
                .subject(user.getId().toString())
                .claim("email", user.getEmail())
                .claim("role", user.getRole().name())
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(props.accessTtl())))
                .signWith(key)
                .compact();
    }

    /** Parse + verify an access token into a principal, or throw if invalid/expired. */
    public AppPrincipal parse(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(key)
                .requireIssuer(props.issuer())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return new AppPrincipal(
                UUID.fromString(claims.getSubject()),
                claims.get("email", String.class),
                Role.valueOf(claims.get("role", String.class))
        );
    }

    /** Access-token lifetime in seconds — surfaced to clients in the token response. */
    public long accessTtlSeconds() {
        return props.accessTtl().toSeconds();
    }

    /** Non-throwing validity probe used by the WebSocket handshake interceptor. */
    public boolean isValid(String token) {
        try {
            parse(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }
}
