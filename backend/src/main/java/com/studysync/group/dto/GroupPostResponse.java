package com.studysync.group.dto;

import com.studysync.group.GroupPost;

import java.time.Instant;
import java.util.UUID;

public record GroupPostResponse(
        UUID id,
        UUID authorId,
        String authorName,
        String authorAvatarUrl,
        String body,
        Instant createdAt
) {
    public static GroupPostResponse from(GroupPost p) {
        return new GroupPostResponse(
                p.getId(),
                p.getAuthor().getId(),
                p.getAuthor().getDisplayName(),
                p.getAuthor().getAvatarUrl(),
                p.getBody(),
                p.getCreatedAt());
    }
}
