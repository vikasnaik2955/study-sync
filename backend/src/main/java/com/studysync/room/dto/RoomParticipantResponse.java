package com.studysync.room.dto;

import com.studysync.room.RoomParticipant;

import java.time.Instant;
import java.util.UUID;

public record RoomParticipantResponse(
        UUID userId,
        String displayName,
        String avatarUrl,
        Instant joinedAt
) {
    public static RoomParticipantResponse from(RoomParticipant p) {
        return new RoomParticipantResponse(
                p.getUser().getId(),
                p.getUser().getDisplayName(),
                p.getUser().getAvatarUrl(),
                p.getJoinedAt());
    }
}
