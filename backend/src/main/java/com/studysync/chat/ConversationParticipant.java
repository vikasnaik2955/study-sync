package com.studysync.chat;

import com.studysync.common.BaseEntity;
import com.studysync.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

/** Membership of a {@link Conversation}. */
@Entity
@Table(name = "conversation_participants",
        uniqueConstraints = @UniqueConstraint(name = "ux_conv_participant",
                columnNames = {"conversation_id", "user_id"}))
@Getter
@Setter
public class ConversationParticipant extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "conversation_id", nullable = false)
    private Conversation conversation;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
