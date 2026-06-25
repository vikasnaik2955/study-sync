package com.studysync.chat.dto;

import java.util.UUID;

/** Inbound STOMP heartbeat for {@code /app/presence.ping}; scopeId is a group or room id. */
public record PresencePing(UUID scopeId) {
}
