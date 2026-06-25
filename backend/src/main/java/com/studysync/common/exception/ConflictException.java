package com.studysync.common.exception;

import org.springframework.http.HttpStatus;

/** 409 — the request conflicts with current state (duplicate email, already a member, ...). */
public class ConflictException extends ApiException {

    public ConflictException(String message) {
        super(HttpStatus.CONFLICT, "CONFLICT", message);
    }
}
