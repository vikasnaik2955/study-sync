package com.studysync.chat;

import com.studysync.common.BaseEntity;
import com.studysync.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 * A chat message. Either {@code body}, {@code attachmentUrl}, or both are present. The message
 * timestamp is the inherited {@code createdAt} (exposed as {@code sentAt} on the wire).
 */
@Entity
@Table(name = "messages")
@Getter
@Setter
public class Message extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "conversation_id", nullable = false)
    private Conversation conversation;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @Column(columnDefinition = "text")
    private String body;

    @Column(name = "attachment_url")
    private String attachmentUrl;
}
