package com.studysync.qa;

import com.studysync.common.PageResponse;
import com.studysync.qa.dto.AnswerResponse;
import com.studysync.qa.dto.AskQuestionRequest;
import com.studysync.qa.dto.PostAnswerRequest;
import com.studysync.qa.dto.QuestionDetailResponse;
import com.studysync.qa.dto.QuestionResponse;
import com.studysync.qa.dto.VoteRequest;
import com.studysync.security.AppPrincipal;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * Q&A forum. Questions and answers live under {@code /questions}; voting acts on an answer by id
 * under {@code /answers/{id}/vote}.
 */
@RestController
@RequestMapping("/api/v1")
public class QaController {

    private final QaService qaService;

    public QaController(QaService qaService) {
        this.qaService = qaService;
    }

    @GetMapping("/questions")
    public PageResponse<QuestionResponse> listQuestions(@RequestParam(required = false) UUID subjectId,
                                                        @RequestParam(required = false) String q,
                                                        @PageableDefault(size = 20, sort = "createdAt",
                                                                direction = Sort.Direction.DESC) Pageable pageable) {
        return qaService.listQuestions(subjectId, q, pageable);
    }

    @PostMapping("/questions")
    public ResponseEntity<QuestionResponse> ask(@AuthenticationPrincipal AppPrincipal principal,
                                                @Valid @RequestBody AskQuestionRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(qaService.ask(principal, req));
    }

    @GetMapping("/questions/{id}")
    public QuestionDetailResponse getQuestion(@AuthenticationPrincipal AppPrincipal principal,
                                              @PathVariable UUID id) {
        return qaService.getQuestionDetail(id, principal.id());
    }

    @GetMapping("/questions/{id}/answers")
    public List<AnswerResponse> answers(@AuthenticationPrincipal AppPrincipal principal,
                                        @PathVariable UUID id) {
        return qaService.listAnswers(id, principal.id());
    }

    @PostMapping("/questions/{id}/answers")
    public ResponseEntity<AnswerResponse> postAnswer(@AuthenticationPrincipal AppPrincipal principal,
                                                     @PathVariable UUID id,
                                                     @Valid @RequestBody PostAnswerRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(qaService.postAnswer(id, principal, req));
    }

    @PostMapping("/answers/{id}/vote")
    public AnswerResponse vote(@AuthenticationPrincipal AppPrincipal principal,
                               @PathVariable UUID id, @Valid @RequestBody VoteRequest req) {
        return qaService.vote(id, principal, req.value());
    }

    @DeleteMapping("/answers/{id}/vote")
    public AnswerResponse retractVote(@AuthenticationPrincipal AppPrincipal principal, @PathVariable UUID id) {
        return qaService.retractVote(id, principal);
    }
}
