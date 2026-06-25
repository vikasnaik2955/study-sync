package com.studysync.room.dto;

import java.time.Instant;
import java.util.UUID;

/**
 * Server → client broadcast on {@code /topic/room/{roomId}}. {@code type} is one of
 * ROOM_POST, PARTICIPANT_JOINED, PARTICIPANT_LEFT, ROOM_ENDED. Room discussion is live-only
 * (not persisted) in v1 — the shared-notes panel is the durable artifact.
 */
public record RoomEvent(
        String type,
        UUID roomId,
        UUID userId,
        String displayName,
        String body,
        Instant at
) {
    public static RoomEvent post(UUID roomId, UUID userId, String name, String body) {
        return new RoomEvent("ROOM_POST", roomId, userId, name, body, Instant.now());
    }

    public static RoomEvent participant(String type, UUID roomId, UUID userId, String name) {
        return new RoomEvent(type, roomId, userId, name, null, Instant.now());
    }

    public static RoomEvent ended(UUID roomId) {
        return new RoomEvent("ROOM_ENDED", roomId, null, null, null, Instant.now());
    }
}
