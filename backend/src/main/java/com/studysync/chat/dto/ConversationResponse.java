package com.studysync.chat.dto;

import com.studysync.chat.ConversationType;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * A conversation summary for the inbox. {@code title} is the other person's name for DIRECT chats
 * and the group's name for GROUP chats; the frontend can also derive it from {@code participants}.
 */
public record ConversationResponse(
        UUID id,
        ConversationType type,
        UUID groupId,
        String title,
        List<ParticipantBrief> participants,
        MessageResponse lastMessage,
        Instant createdAt
) {
}
