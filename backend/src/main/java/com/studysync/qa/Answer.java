package com.studysync.qa;

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
 * An answer to a {@link Question}. {@code netVotes} is a denormalized cache of the sum of its
 * votes, recomputed on every vote change so answers can be sorted/served without an aggregate.
 */
@Entity
@Table(name = "answers")
@Getter
@Setter
public class Answer extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @Column(nullable = false, columnDefinition = "text")
    private String body;

    @Column(name = "net_votes", nullable = false)
    private int netVotes = 0;
}
