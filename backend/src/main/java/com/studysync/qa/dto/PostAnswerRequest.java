package com.studysync.qa.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PostAnswerRequest(
        @NotBlank @Size(max = 8000) String body
) {
}
