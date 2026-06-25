package com.studysync.group;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface GroupNoteRepository extends JpaRepository<GroupNote, UUID> {

    List<GroupNote> findByGroupIdOrderByCreatedAtDesc(UUID groupId);

    boolean existsByGroupIdAndNoteId(UUID groupId, UUID noteId);
}
