package com.studysync.chat.dto;

/** Returned by the attachment upload endpoint; the client then sends a message carrying the url. */
public record AttachmentResponse(
        String url,
        String filename,
        String contentType,
        long sizeBytes
) {
}
