package com.studysync.room;

import com.studysync.common.BaseEntity;
import com.studysync.note.Note;
import com.studysync.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

/** A note shared into a room's shared-notes panel. */
@Entity
@Table(name = "room_notes",
        uniqueConstraints = @UniqueConstraint(name = "ux_room_note",
                columnNames = {"room_id", "note_id"}))
@Getter
@Setter
public class RoomNote extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "room_id", nullable = false)
    private StudyRoom room;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "note_id", nullable = false)
    private Note note;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "shared_by", nullable = false)
    private User sharedBy;
}
