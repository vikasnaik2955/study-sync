package com.studysync.group.dto;

import com.studysync.group.GroupMembership;
import com.studysync.group.GroupRole;

import java.time.Instant;
import java.util.UUID;

public record GroupMemberResponse(
        UUID userId,
        String displayName,
        String avatarUrl,
        GroupRole role,
        Instant joinedAt
) {
    public static GroupMemberResponse from(GroupMembership m) {
        return new GroupMemberResponse(
                m.getUser().getId(),
                m.getUser().getDisplayName(),
                m.getUser().getAvatarUrl(),
                m.getRole(),
                m.getCreatedAt());
    }
}
