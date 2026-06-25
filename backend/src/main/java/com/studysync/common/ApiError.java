package com.studysync.common;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.util.List;

/**
 * The single error envelope every client (web + Android) parses. Mirrors the Phase 0 spec:
 * {@code { timestamp, status, error, message, path, fieldErrors[], traceId }}.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiError(
        Instant timestamp,
        int status,
        String error,
        String message,
        String path,
        List<FieldError> fieldErrors,
        String traceId
) {
    public record FieldError(String field, String message) {}

    public static ApiError of(int status, String error, String message, String path, String traceId) {
        return new ApiError(Instant.now(), status, error, message, path, null, traceId);
    }

    public static ApiError of(int status, String error, String message, String path,
                              List<FieldError> fieldErrors, String traceId) {
        return new ApiError(Instant.now(), status, error, message, path, fieldErrors, traceId);
    }
}
