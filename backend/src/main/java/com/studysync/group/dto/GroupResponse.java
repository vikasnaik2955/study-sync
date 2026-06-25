package com.studysync.group.dto;

import com.studysync.group.StudyGroup;

import java.time.Instant;
import java.util.UUID;

public record GroupResponse(
        UUID id,
        String name,
        String description,
        UUID subjectId,
        String subjectName,
        UUID ownerId,
        String ownerName,
        long memberCount,
        boolean joined,
        Instant createdAt
) {
    public static GroupResponse from(StudyGroup g, long memberCount, boolean joined) {
        return new GroupResponse(
                g.getId(), g.getName(), g.getDescription(),
                g.getSubject().getId(), g.getSubject().getName(),
                g.getOwner().getId(), g.getOwner().getDisplayName(),
                memberCount, joined, g.getCreatedAt());
    }
}
