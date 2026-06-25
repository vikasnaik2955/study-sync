package com.studysync.chat.dto;

import com.studysync.chat.Message;

import java.time.Instant;
import java.util.UUID;

public record MessageResponse(
        UUID id,
        UUID conversationId,
        UUID senderId,
        String senderName,
        String senderAvatarUrl,
        String body,
        String attachmentUrl,
        Instant sentAt
) {
    public static MessageResponse from(Message m) {
        return new MessageResponse(
                m.getId(),
                m.getConversation().getId(),
                m.getSender().getId(),
                m.getSender().getDisplayName(),
                m.getSender().getAvatarUrl(),
                m.getBody(),
                m.getAttachmentUrl(),
                m.getCreatedAt());
    }
}
