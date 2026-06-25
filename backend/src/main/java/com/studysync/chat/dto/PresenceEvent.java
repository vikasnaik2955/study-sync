package com.studysync.chat.dto;

import java.util.UUID;

/** Server → client presence broadcast on {@code /topic/presence/{scopeId}}. */
public record PresenceEvent(
        String type,        // PRESENCE_UPDATE
        UUID scopeId,
        UUID userId,
        String displayName,
        boolean online
) {
}
