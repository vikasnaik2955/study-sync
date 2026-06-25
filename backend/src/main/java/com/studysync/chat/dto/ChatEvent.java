package com.studysync.chat.dto;

import java.util.UUID;

/**
 * Server → client broadcast on {@code /topic/conversation/{id}} and {@code /user/queue/messages}.
 * {@code type} is MESSAGE_CREATED or TYPING; for TYPING, {@code message} is null and only the
 * sender fields are meaningful.
 */
public record ChatEvent(
        String type,
        UUID conversationId,
        MessageResponse message,
        UUID senderId,
        String senderName
) {
    public static ChatEvent messageCreated(MessageResponse message) {
        return new ChatEvent("MESSAGE_CREATED", message.conversationId(), message,
                message.senderId(), message.senderName());
    }

    public static ChatEvent typing(UUID conversationId, UUID senderId, String senderName) {
        return new ChatEvent("TYPING", conversationId, null, senderId, senderName);
    }
}
