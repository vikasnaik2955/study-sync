package com.studysync.chat.dto;

import java.util.UUID;

/** Inbound STOMP payload for {@code /app/chat.typing} — transient, never persisted. */
public record TypingCommand(UUID conversationId) {
}
