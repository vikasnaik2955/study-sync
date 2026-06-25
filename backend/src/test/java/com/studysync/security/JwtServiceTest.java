package com.studysync.security;

import com.studysync.user.Role;
import com.studysync.user.User;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/**
 * Pure unit test for token minting/parsing — no Spring context, no database. Verifies the access
 * token round-trips its claims and that a token signed with a different secret is rejected.
 */
class JwtServiceTest {

    private final JwtProperties props = new JwtProperties(
            "test-secret-that-is-definitely-long-enough-256-bits!!", // >= 32 bytes for HS256
            Duration.ofMinutes(15), Duration.ofDays(7), "studysync");

    private final JwtService jwtService = new JwtService(props);

    private User user() {
        User u = new User();
        u.setId(UUID.randomUUID());
        u.setEmail("ada@studysync.dev");
        u.setRole(Role.STUDENT);
        return u;
    }

    @Test
    void accessTokenRoundTripsClaims() {
        User u = user();
        String token = jwtService.generateAccessToken(u);

        AppPrincipal principal = jwtService.parse(token);

        assertThat(principal.id()).isEqualTo(u.getId());
        assertThat(principal.email()).isEqualTo("ada@studysync.dev");
        assertThat(principal.role()).isEqualTo(Role.STUDENT);
        assertThat(jwtService.isValid(token)).isTrue();
    }

    @Test
    void tokenSignedWithAnotherSecretIsRejected() {
        JwtProperties other = new JwtProperties(
                "a-completely-different-secret-also-long-enough-xx!", props.accessTtl(),
                props.refreshTtl(), props.issuer());
        String foreignToken = new JwtService(other).generateAccessToken(user());

        assertThat(jwtService.isValid(foreignToken)).isFalse();
        assertThatThrownBy(() -> jwtService.parse(foreignToken)).isInstanceOf(RuntimeException.class);
    }
}
