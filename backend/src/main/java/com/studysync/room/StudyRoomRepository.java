package com.studysync.room;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface StudyRoomRepository extends JpaRepository<StudyRoom, UUID> {

    @Query("""
            select r from StudyRoom r
            where r.status = com.studysync.room.RoomStatus.ACTIVE
              and (:subjectId is null or r.subject.id = :subjectId)
            """)
    Page<StudyRoom> findActive(@Param("subjectId") UUID subjectId, Pageable pageable);
}
