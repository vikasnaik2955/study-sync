package com.studysync.room;

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

import java.time.Instant;

/**
 * Room membership. A null {@code leftAt} means the participant is currently in the room; the row
 * is reused on rejoin so a (room, user) pair is unique.
 */
@Entity
@Table(name = "study_room_participants",
        uniqueConstraints = @UniqueConstraint(name = "ux_room_participant",
                columnNames = {"room_id", "user_id"}))
@Getter
@Setter
public class RoomParticipant extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "room_id", nullable = false)
    private StudyRoom room;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "joined_at", nullable = false)
    private Instant joinedAt = Instant.now();

    @Column(name = "left_at")
    private Instant leftAt;
}
