package com.studysync.storage;

/**
 * Descriptor returned after a successful {@link StorageService#store}. The {@code storageKey}
 * is the opaque handle persisted on the owning entity; everything else is metadata.
 */
public record StoredObject(
        String storageKey,
        String url,
        long size,
        String contentType,
        String checksum
) {
}
