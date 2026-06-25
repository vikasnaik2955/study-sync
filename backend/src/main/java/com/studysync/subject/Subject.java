package com.studysync.subject;

import com.studysync.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/** A subject/topic that categorizes notes, groups, questions, and rooms. */
@Entity
@Table(name = "subjects")
@Getter
@Setter
public class Subject extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name;

    @Column(length = 32)
    private String code;
}
