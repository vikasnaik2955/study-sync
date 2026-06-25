package com.studysync.qa.dto;

import com.studysync.qa.Question;

import java.time.Instant;
import java.util.UUID;

public record QuestionResponse(
        UUID id,
        String title,
        String body,
        UUID subjectId,
        String subjectName,
        UUID authorId,
        String authorName,
        int viewCount,
        long answerCount,
        Instant createdAt
) {
    public static QuestionResponse from(Question q, long answerCount) {
        return new QuestionResponse(
                q.getId(), q.getTitle(), q.getBody(),
                q.getSubject().getId(), q.getSubject().getName(),
                q.getAuthor().getId(), q.getAuthor().getDisplayName(),
                q.getViewCount(), answerCount, q.getCreatedAt());
    }
}
