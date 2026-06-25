package com.studysync.chat;

import com.studysync.common.BaseEntity;
import com.studysync.group.StudyGroup;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 * A chat conversation. DIRECT conversations have exactly two participants; GROUP conversations
 * are bound to a {@link StudyGroup} and mirror its membership.
 */
@Entity
@Table(name = "conversations")
@Getter
@Setter
public class Conversation extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ConversationType type;

    /** Set only for GROUP conversations. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private StudyGroup group;

    /**
     * For DIRECT conversations: a canonical "smaller-uuid:larger-uuid" key of the two participant
     * ids, uniquely indexed so a pair can never end up with two conversations (race-safe).
     */
    @Column(name = "direct_key", unique = true)
    private String directKey;
}
