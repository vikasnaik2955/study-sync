package com.studysync.room.dto;

import com.studysync.note.dto.NoteResponse;

import java.util.List;

/** Room detail = the room plus its current participants and shared-notes panel. */
public record RoomDetailResponse(
        RoomResponse room,
        List<RoomParticipantResponse> participants,
        List<NoteResponse> notes
) {
}
