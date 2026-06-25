package com.studysync.group;

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
 * A message in a group's (non-real-time) discussion thread. This is the persisted, REST-served
 * discussion; live group chat is handled separately by the chat module's GROUP conversation.
 */
@Entity
@Table(name = "group_posts")
@Getter
@Setter
public class GroupPost extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "group_id", nullable = false)
    private StudyGroup group;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @Column(nullable = false, columnDefinition = "text")
    private String body;
}
