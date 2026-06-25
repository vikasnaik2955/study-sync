package com.studysync.qa.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/** A vote: +1 (upvote) or -1 (downvote). Casting the same value again is idempotent. */
public record VoteRequest(
        @NotNull @Min(-1) @Max(1) Integer value
) {
}
