package com.studysync.qa.dto;

import com.studysync.qa.Answer;

import java.time.Instant;
import java.util.UUID;

public record AnswerResponse(
        UUID id,
        UUID questionId,
        UUID authorId,
        String authorName,
        String authorAvatarUrl,
        String body,
        int netVotes,
        int myVote,          // -1, 0, or +1 for the requesting user
        Instant createdAt
) {
    public static AnswerResponse from(Answer a, int myVote) {
        return new AnswerResponse(
                a.getId(),
                a.getQuestion().getId(),
                a.getAuthor().getId(),
                a.getAuthor().getDisplayName(),
                a.getAuthor().getAvatarUrl(),
                a.getBody(),
                a.getNetVotes(),
                myVote,
                a.getCreatedAt());
    }
}
