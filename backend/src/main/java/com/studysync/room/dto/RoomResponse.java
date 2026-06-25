package com.studysync.room.dto;

import com.studysync.room.RoomStatus;
import com.studysync.room.StudyRoom;

import java.time.Instant;
import java.util.UUID;

public record RoomResponse(
        UUID id,
        String name,
        UUID subjectId,
        String subjectName,
        UUID hostId,
        String hostName,
        RoomStatus status,
        long participantCount,
        boolean joined,
        Instant createdAt
) {
    public static RoomResponse from(StudyRoom r, long participantCount, boolean joined) {
        return new RoomResponse(
                r.getId(), r.getName(),
                r.getSubject().getId(), r.getSubject().getName(),
                r.getHost().getId(), r.getHost().getDisplayName(),
                r.getStatus(), participantCount, joined, r.getCreatedAt());
    }
}
