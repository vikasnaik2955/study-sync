package com.studysync.common.exception;

import org.springframework.http.HttpStatus;

/**
 * Base for all domain exceptions. Carries the HTTP status and a stable machine-readable
 * {@code error} code so the {@link com.studysync.common.GlobalExceptionHandler} can render
 * a consistent {@link com.studysync.common.ApiError} without per-exception wiring.
 */
public abstract class ApiException extends RuntimeException {

    private final HttpStatus status;
    private final String errorCode;

    protected ApiException(HttpStatus status, String errorCode, String message) {
        super(message);
        this.status = status;
        this.errorCode = errorCode;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
