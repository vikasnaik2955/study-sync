package com.studysync.common.exception;

import org.springframework.http.HttpStatus;

/** 422 — semantically invalid request not caught by bean validation (e.g. bad file type). */
public class ValidationException extends ApiException {

    public ValidationException(String message) {
        super(HttpStatus.UNPROCESSABLE_ENTITY, "VALIDATION_ERROR", message);
    }
}
