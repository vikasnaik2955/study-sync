package com.studysync.room;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RoomNoteRepository extends JpaRepository<RoomNote, UUID> {

    List<RoomNote> findByRoomIdOrderByCreatedAtDesc(UUID roomId);

    boolean existsByRoomIdAndNoteId(UUID roomId, UUID noteId);
}
