package com.studysync.storage;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

/** {@code storage.*} — which backend bytes live in, and how access URLs are issued. */
@ConfigurationProperties(prefix = "storage")
public record StorageProperties(
        String provider,          // local | s3 | cloudinary
        Local local,
        Duration signedUrlTtl,
        S3 s3
) {
    public record Local(String dir) {}

    public record S3(String bucket, String region) {}
}
