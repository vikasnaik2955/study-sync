package com.studysync.room;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoomParticipantRepository extends JpaRepository<RoomParticipant, UUID> {

    Optional<RoomParticipant> findByRoomIdAndUserId(UUID roomId, UUID userId);

    List<RoomParticipant> findByRoomIdAndLeftAtIsNullOrderByJoinedAtAsc(UUID roomId);

    boolean existsByRoomIdAndUserIdAndLeftAtIsNull(UUID roomId, UUID userId);

    long countByRoomIdAndLeftAtIsNull(UUID roomId);
}
