package com.studysync.qa;

import com.studysync.common.BaseEntity;
import com.studysync.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

/** One user's vote on one answer; {@code value} is +1 or -1. Unique per (answer, user). */
@Entity
@Table(name = "votes",
        uniqueConstraints = @UniqueConstraint(name = "ux_vote_answer_user",
                columnNames = {"answer_id", "user_id"}))
@Getter
@Setter
public class Vote extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "answer_id", nullable = false)
    private Answer answer;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private int value;
}
