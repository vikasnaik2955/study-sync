package com.studysync.qa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface VoteRepository extends JpaRepository<Vote, UUID> {

    Optional<Vote> findByAnswerIdAndUserId(UUID answerId, UUID userId);

    /** Sum of all vote values on an answer (null when no votes yet). */
    @Query("select coalesce(sum(v.value), 0) from Vote v where v.answer.id = :answerId")
    int sumValueForAnswer(@Param("answerId") UUID answerId);

    /** All votes the current user has cast on a set of answers — used to annotate myVote. */
    List<Vote> findByUserIdAndAnswerIdIn(UUID userId, List<UUID> answerIds);
}
