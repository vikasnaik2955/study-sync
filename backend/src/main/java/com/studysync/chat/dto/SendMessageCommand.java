package com.studysync.chat.dto;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

/** Inbound STOMP payload for {@code /app/chat.send}. Body or attachment (or both) required. */
public record SendMessageCommand(
        @NotNull UUID conversationId,
        String body,
        String attachmentUrl
) {
}
