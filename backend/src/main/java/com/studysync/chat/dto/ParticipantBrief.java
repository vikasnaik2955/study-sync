package com.studysync.chat.dto;

import com.studysync.user.User;

import java.util.UUID;

public record ParticipantBrief(UUID userId, String displayName, String avatarUrl) {

    public static ParticipantBrief from(User u) {
        return new ParticipantBrief(u.getId(), u.getDisplayName(), u.getAvatarUrl());
    }
}
