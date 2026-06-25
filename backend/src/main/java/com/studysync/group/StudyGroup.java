package com.studysync.group;

import com.studysync.common.BaseEntity;
import com.studysync.subject.Subject;
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
 * A subject-wise study group. The creator becomes the owner (also recorded as a membership row
 * with {@link GroupRole#OWNER}). The group's real-time chat is a GROUP {@code Conversation} that
 * references this group (wired in the chat module), so no conversation FK is held here.
 */
@Entity
@Table(name = "study_groups")
@Getter
@Setter
public class StudyGroup extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "text")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;
}
