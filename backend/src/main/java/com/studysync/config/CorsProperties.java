package com.studysync.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

/** {@code app.cors.*} — web origins allowed to call the API with credentials. */
@ConfigurationProperties(prefix = "app.cors")
public record CorsProperties(List<String> allowedOrigins) {
}
