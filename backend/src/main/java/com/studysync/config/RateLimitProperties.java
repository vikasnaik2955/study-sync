package com.studysync.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/** {@code app.rate-limit.*} — token-bucket settings for sensitive endpoints (auth). */
@ConfigurationProperties(prefix = "app.rate-limit")
public record RateLimitProperties(
        boolean enabled,
        int authCapacity,
        int authRefillMinutes
) {
}
