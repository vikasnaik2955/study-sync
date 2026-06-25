package com.studysync.storage;

/**
 * Context for a store operation — currently just the logical category, which namespaces the
 * stored key (e.g. {@code notes/}, {@code chat/}, {@code avatars/}). Kept as a small record so
 * adding owner/visibility hints later does not ripple through call sites.
 */
public record StorageContext(String category) {

    public static StorageContext of(String category) {
        return new StorageContext(category);
    }
}
