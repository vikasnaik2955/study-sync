package com.studysync.common.exception;

import org.springframework.http.HttpStatus;

/** 404 — the requested resource does not exist (or is soft-deleted). */
public class NotFoundException extends ApiException {

    public NotFoundException(String message) {
        super(HttpStatus.NOT_FOUND, "NOT_FOUND", message);
    }

    /** Convenience: {@code new NotFoundException("Note", id)} -> "Note not found: {id}". */
    public NotFoundException(String resource, Object id) {
        super(HttpStatus.NOT_FOUND, "NOT_FOUND", resource + " not found: " + id);
    }
}
