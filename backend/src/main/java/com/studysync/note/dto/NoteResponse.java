package com.studysync.note.dto;

import com.studysync.note.Note;

import java.time.Instant;
import java.util.UUID;

public record NoteResponse(
        UUID id,
        String title,
        UUID subjectId,
        String subjectName,
        UUID uploaderId,
        String uploaderName,
        String originalFilename,
        String contentType,
        long sizeBytes,
        int downloadCount,
        String downloadUrl,
        Instant createdAt
) {
    /** Map an entity to its DTO. Must be called inside a transaction (touches lazy associations). */
    public static NoteResponse from(Note n) {
        return new NoteResponse(
                n.getId(),
                n.getTitle(),
                n.getSubject().getId(),
                n.getSubject().getName(),
                n.getUploader().getId(),
                n.getUploader().getDisplayName(),
                n.getOriginalFilename(),
                n.getContentType(),
                n.getSizeBytes(),
                n.getDownloadCount(),
                "/api/v1/notes/" + n.getId() + "/download",
                n.getCreatedAt());
    }
}
