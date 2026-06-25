package com.studysync.chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ConversationRepository extends JpaRepository<Conversation, UUID> {

    Optional<Conversation> findByDirectKey(String directKey);

    Optional<Conversation> findByGroupId(UUID groupId);

    /** All conversations the user participates in, most-recently-active first. */
    @Query("""
            select c from Conversation c
            join ConversationParticipant p on p.conversation = c
            where p.user.id = :userId
            order by c.updatedAt desc
            """)
    List<Conversation> findAllForUser(@Param("userId") UUID userId);
}
