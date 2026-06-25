package com.studysync.qa.dto;

import java.util.List;

/** Full question view: the question plus its answers (already sorted best-first). */
public record QuestionDetailResponse(
        QuestionResponse question,
        List<AnswerResponse> answers
) {
}
