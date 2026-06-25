package com.studysync.qa;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AnswerRepository extends JpaRepository<Answer, UUID> {

    /** Answers sorted best-first: highest net votes, then most recent as a tiebreaker. */
    List<Answer> findByQuestionIdOrderByNetVotesDescCreatedAtAsc(UUID questionId);

    long countByQuestionId(UUID questionId);
}
