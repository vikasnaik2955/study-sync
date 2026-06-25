package com.studysync.qa;

import com.studysync.common.PageResponse;
import com.studysync.common.exception.NotFoundException;
import com.studysync.common.exception.ValidationException;
import com.studysync.qa.dto.AnswerResponse;
import com.studysync.qa.dto.AskQuestionRequest;
import com.studysync.qa.dto.PostAnswerRequest;
import com.studysync.qa.dto.QuestionDetailResponse;
import com.studysync.qa.dto.QuestionResponse;
import com.studysync.security.AppPrincipal;
import com.studysync.subject.Subject;
import com.studysync.subject.SubjectService;
import com.studysync.user.UserService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Q&A use-cases. Answers are always returned best-first (net votes desc). A user has at most one
 * vote per answer (unique constraint); voting again with the same value is idempotent, voting the
 * opposite flips it, and the answer's cached {@code netVotes} is recomputed from the source rows.
 */
@Service
public class QaService {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final VoteRepository voteRepository;
    private final SubjectService subjectService;
    private final UserService userService;

    public QaService(QuestionRepository questionRepository, AnswerRepository answerRepository,
                     VoteRepository voteRepository, SubjectService subjectService, UserService userService) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.voteRepository = voteRepository;
        this.subjectService = subjectService;
        this.userService = userService;
    }

    @Transactional(readOnly = true)
    public PageResponse<QuestionResponse> listQuestions(UUID subjectId, String q, Pageable pageable) {
        String term = StringUtils.hasText(q) ? q.trim() : null;
        return PageResponse.from(questionRepository.search(subjectId, term, pageable),
                question -> QuestionResponse.from(question, answerRepository.countByQuestionId(question.getId())));
    }

    @Transactional
    public QuestionResponse ask(AppPrincipal principal, AskQuestionRequest req) {
        Subject subject = subjectService.getEntity(req.subjectId());
        Question question = new Question();
        question.setTitle(req.title());
        question.setBody(req.body());
        question.setSubject(subject);
        question.setAuthor(userService.getEntity(principal.id()));
        questionRepository.save(question);
        return QuestionResponse.from(question, 0);
    }

    @Transactional
    public QuestionDetailResponse getQuestionDetail(UUID questionId, UUID currentUserId) {
        Question question = loadQuestion(questionId);
        questionRepository.incrementViewCount(questionId);

        List<AnswerResponse> answers = listAnswers(questionId, currentUserId);
        // The in-memory question still holds the pre-increment count; reflect the bump for the client.
        QuestionResponse questionResponse = QuestionResponse.from(question, answers.size());
        QuestionResponse withView = new QuestionResponse(
                questionResponse.id(), questionResponse.title(), questionResponse.body(),
                questionResponse.subjectId(), questionResponse.subjectName(),
                questionResponse.authorId(), questionResponse.authorName(),
                question.getViewCount() + 1, answers.size(), questionResponse.createdAt());
        return new QuestionDetailResponse(withView, answers);
    }

    @Transactional(readOnly = true)
    public List<AnswerResponse> listAnswers(UUID questionId, UUID currentUserId) {
        if (!questionRepository.existsById(questionId)) {
            throw new NotFoundException("Question", questionId);
        }
        List<Answer> answers = answerRepository.findByQuestionIdOrderByNetVotesDescCreatedAtAsc(questionId);
        Map<UUID, Integer> myVotes = myVotesFor(currentUserId, answers);
        return answers.stream()
                .map(a -> AnswerResponse.from(a, myVotes.getOrDefault(a.getId(), 0)))
                .toList();
    }

    @Transactional
    public AnswerResponse postAnswer(UUID questionId, AppPrincipal principal, PostAnswerRequest req) {
        Question question = loadQuestion(questionId);
        Answer answer = new Answer();
        answer.setQuestion(question);
        answer.setAuthor(userService.getEntity(principal.id()));
        answer.setBody(req.body());
        answerRepository.save(answer);
        return AnswerResponse.from(answer, 0);
    }

    @Transactional
    public AnswerResponse vote(UUID answerId, AppPrincipal principal, int value) {
        if (value != 1 && value != -1) {
            throw new ValidationException("Vote value must be +1 or -1.");
        }
        Answer answer = loadAnswer(answerId);
        Vote vote = voteRepository.findByAnswerIdAndUserId(answerId, principal.id())
                .orElseGet(() -> {
                    Vote v = new Vote();
                    v.setAnswer(answer);
                    v.setUser(userService.getEntity(principal.id()));
                    return v;
                });
        vote.setValue(value);
        voteRepository.save(vote);
        return recomputeAndReturn(answer, value);
    }

    @Transactional
    public AnswerResponse retractVote(UUID answerId, AppPrincipal principal) {
        Answer answer = loadAnswer(answerId);
        voteRepository.findByAnswerIdAndUserId(answerId, principal.id())
                .ifPresent(voteRepository::delete);
        return recomputeAndReturn(answer, 0);
    }

    // ---- helpers -------------------------------------------------------------------------

    private AnswerResponse recomputeAndReturn(Answer answer, int myVote) {
        // Flush pending vote change so the SUM sees it, then cache the net on the answer.
        voteRepository.flush();
        answer.setNetVotes(voteRepository.sumValueForAnswer(answer.getId()));
        return AnswerResponse.from(answer, myVote);
    }

    private Map<UUID, Integer> myVotesFor(UUID userId, List<Answer> answers) {
        if (answers.isEmpty()) {
            return Map.of();
        }
        List<UUID> ids = answers.stream().map(Answer::getId).toList();
        Map<UUID, Integer> map = new HashMap<>();
        for (Vote v : voteRepository.findByUserIdAndAnswerIdIn(userId, ids)) {
            map.put(v.getAnswer().getId(), v.getValue());
        }
        return map;
    }

    private Question loadQuestion(UUID id) {
        return questionRepository.findById(id).orElseThrow(() -> new NotFoundException("Question", id));
    }

    private Answer loadAnswer(UUID id) {
        return answerRepository.findById(id).orElseThrow(() -> new NotFoundException("Answer", id));
    }
}
