package com.studysync.group;

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

/** Links an existing {@link Note} as a shared resource inside a group. */
@Entity
@Table(name = "group_notes",
        uniqueConstraints = @UniqueConstraint(name = "ux_group_note",
                columnNames = {"group_id", "note_id"}))
@Getter
@Setter
public class GroupNote extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "group_id", nullable = false)
    private StudyGroup group;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "note_id", nullable = false)
    private Note note;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "shared_by", nullable = false)
    private User sharedBy;
}
