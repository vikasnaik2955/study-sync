package com.studysync.room.dto;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

/** Inbound STOMP payload for {@code /app/room.post} — a line in the room discussion. */
public record RoomPostCommand(
        @NotNull UUID roomId,
        String body
) {
}
