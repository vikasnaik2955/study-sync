package com.studysync.subject.dto;

import com.studysync.subject.Subject;

import java.util.UUID;

public record SubjectResponse(UUID id, String name, String code) {

    public static SubjectResponse from(Subject s) {
        return new SubjectResponse(s.getId(), s.getName(), s.getCode());
    }
}
