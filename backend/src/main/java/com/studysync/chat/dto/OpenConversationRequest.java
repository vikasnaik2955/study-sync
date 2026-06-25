package com.studysync.chat.dto;

import java.util.UUID;

/**
 * Open (or fetch) a conversation. Provide exactly one of:
 * {@code participantId} for a DIRECT chat with that user, or {@code groupId} for a group's chat.
 */
public record OpenConversationRequest(
        UUID participantId,
        UUID groupId
) {
}
