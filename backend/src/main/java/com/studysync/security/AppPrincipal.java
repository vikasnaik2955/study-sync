package com.studysync.security;

import com.studysync.user.Role;
import org.springframework.security.core.AuthenticatedPrincipal;

import java.util.UUID;

/**
 * The authenticated principal carried in the SecurityContext and injected into controllers
 * via {@code @AuthenticationPrincipal}. Built straight from the access-token claims — no DB
 * hit per request.
 *
 * <p>Implements {@link AuthenticatedPrincipal} so {@code getName()} returns the user id — that
 * is what STOMP uses to route {@code /user/queue/**} destinations to the right connection.
 */
public record AppPrincipal(UUID id, String email, Role role) implements AuthenticatedPrincipal {

    @Override
    public String getName() {
        return id.toString();
    }
}
