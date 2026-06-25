package com.studysync.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

/** {@code app.upload.*} — allowed note MIME types and the hard size cap. */
@ConfigurationProperties(prefix = "app.upload")
public record UploadProperties(
        List<String> allowedContentTypes,
        long maxSizeBytes
) {
}
