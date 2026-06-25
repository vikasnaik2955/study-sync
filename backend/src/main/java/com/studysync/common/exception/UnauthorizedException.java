package com.studysync.common.exception;

import org.springframework.http.HttpStatus;

/** 401 — missing, invalid, or expired credentials/token. */
public class UnauthorizedException extends ApiException {

    public UnauthorizedException(String message) {
        super(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED", message);
    }
}
