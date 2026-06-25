package com.studysync.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;

/**
 * The one interface that hides where bytes live. Dev uses local disk; prod swaps to S3-compatible
 * or Cloudinary via the {@code storage.provider} property — no other code changes. Selecting an
 * implementation is done with {@code @ConditionalOnProperty} on each impl.
 */
public interface StorageService {

    /** Validate + persist a file, returning its stored descriptor. */
    StoredObject store(MultipartFile file, StorageContext ctx);

    /** Open a stream for download (never buffers the whole file). */
    Resource loadAsResource(String storageKey);

    /** Generate a (possibly signed, time-limited) access URL for a stored object. */
    String url(String storageKey, Duration ttl);

    /** Remove the object; idempotent. */
    void delete(String storageKey);
}
