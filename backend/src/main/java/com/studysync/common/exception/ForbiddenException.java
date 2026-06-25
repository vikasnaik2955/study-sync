package com.studysync.common.exception;

import org.springframework.http.HttpStatus;

/** 403 — authenticated but not allowed (wrong role, or not the resource owner/member). */
public class ForbiddenException extends ApiException {

    public ForbiddenException(String message) {
        super(HttpStatus.FORBIDDEN, "FORBIDDEN", message);
    }
}
