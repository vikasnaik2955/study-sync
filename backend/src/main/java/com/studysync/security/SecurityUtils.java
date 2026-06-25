package com.studysync.security;

import com.studysync.common.exception.UnauthorizedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.UUID;

/**
 * Convenience access to the current {@link AppPrincipal} for the service layer, where injecting
 * {@code @AuthenticationPrincipal} is not available. Controllers should prefer the annotation.
 */
public final class SecurityUtils {

    private SecurityUtils() {
    }

    public static AppPrincipal currentPrincipal() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof AppPrincipal principal)) {
            throw new UnauthorizedException("No authenticated user in context.");
        }
        return principal;
    }

    public static UUID currentUserId() {
        return currentPrincipal().id();
    }
}
