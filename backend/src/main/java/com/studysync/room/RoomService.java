package com.studysync.room;

import com.studysync.common.PageResponse;
import com.studysync.common.exception.ConflictException;
import com.studysync.common.exception.ForbiddenException;
import com.studysync.common.exception.NotFoundException;
import com.studysync.note.Note;
import com.studysync.note.NoteService;
import com.studysync.note.dto.NoteResponse;
import com.studysync.room.dto.CreateRoomRequest;
import com.studysync.room.dto.RoomDetailResponse;
import com.studysync.room.dto.RoomEvent;
import com.studysync.room.dto.RoomParticipantResponse;
import com.studysync.room.dto.RoomResponse;
import com.studysync.security.AppPrincipal;
import com.studysync.subject.Subject;
import com.studysync.subject.SubjectService;
import com.studysync.user.User;
import com.studysync.user.UserService;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * Study-room use-cases. Joins/leaves/end broadcast a {@link RoomEvent} to {@code /topic/room/{id}}
 * so every participant's UI updates live. Only the host may end a room; only active participants
 * may view notes or post discussion.
 */
@Service
public class RoomService {

    private final StudyRoomRepository roomRepository;
    private final RoomParticipantRepository participantRepository;
    private final RoomNoteRepository roomNoteRepository;
    private final SubjectService subjectService;
    private final UserService userService;
    private final NoteService noteService;
    private final SimpMessagingTemplate messagingTemplate;

    public RoomService(StudyRoomRepository roomRepository, RoomParticipantRepository participantRepository,
                       RoomNoteRepository roomNoteRepository, SubjectService subjectService,
                       UserService userService, NoteService noteService,
                       SimpMessagingTemplate messagingTemplate) {
        this.roomRepository = roomRepository;
        this.participantRepository = participantRepository;
        this.roomNoteRepository = roomNoteRepository;
        this.subjectService = subjectService;
        this.userService = userService;
        this.noteService = noteService;
        this.messagingTemplate = messagingTemplate;
    }

    @Transactional(readOnly = true)
    public PageResponse<RoomResponse> listActive(UUID subjectId, UUID currentUserId, Pageable pageable) {
        return PageResponse.from(roomRepository.findActive(subjectId, pageable),
                r -> toResponse(r, currentUserId));
    }

    @Transactional
    public RoomResponse create(AppPrincipal principal, CreateRoomRequest req) {
        Subject subject = subjectService.getEntity(req.subjectId());
        User host = userService.getEntity(principal.id());

        StudyRoom room = new StudyRoom();
        room.setName(req.name());
        room.setSubject(subject);
        room.setHost(host);
        room.setStatus(RoomStatus.ACTIVE);
        roomRepository.save(room);

        upsertParticipant(room, host);
        return toResponse(room, principal.id());
    }

    @Transactional(readOnly = true)
    public RoomDetailResponse getDetail(UUID roomId, UUID currentUserId) {
        StudyRoom room = load(roomId);
        List<RoomParticipantResponse> participants =
                participantRepository.findByRoomIdAndLeftAtIsNullOrderByJoinedAtAsc(roomId).stream()
                        .map(RoomParticipantResponse::from)
                        .toList();
        List<NoteResponse> notes = roomNoteRepository.findByRoomIdOrderByCreatedAtDesc(roomId).stream()
                .map(rn -> NoteResponse.from(rn.getNote()))
                .toList();
        return new RoomDetailResponse(toResponse(room, currentUserId), participants, notes);
    }

    @Transactional
    public RoomResponse join(UUID roomId, AppPrincipal principal) {
        StudyRoom room = load(roomId);
        requireActive(room);
        User user = userService.getEntity(principal.id());
        boolean wasIn = participantRepository.existsByRoomIdAndUserIdAndLeftAtIsNull(roomId, principal.id());
        upsertParticipant(room, user);
        if (!wasIn) {
            broadcast(RoomEvent.participant("PARTICIPANT_JOINED", roomId, user.getId(), user.getDisplayName()));
        }
        return toResponse(room, principal.id());
    }

    @Transactional
    public void leave(UUID roomId, AppPrincipal principal) {
        participantRepository.findByRoomIdAndUserId(roomId, principal.id()).ifPresent(p -> {
            if (p.getLeftAt() == null) {
                p.setLeftAt(Instant.now());
                broadcast(RoomEvent.participant("PARTICIPANT_LEFT", roomId,
                        p.getUser().getId(), p.getUser().getDisplayName()));
            }
        });
    }

    @Transactional(readOnly = true)
    public List<NoteResponse> listNotes(UUID roomId, UUID currentUserId) {
        requireActiveParticipant(roomId, currentUserId);
        return roomNoteRepository.findByRoomIdOrderByCreatedAtDesc(roomId).stream()
                .map(rn -> NoteResponse.from(rn.getNote()))
                .toList();
    }

    @Transactional
    public NoteResponse shareNote(UUID roomId, UUID noteId, AppPrincipal principal) {
        StudyRoom room = load(roomId);
        requireActive(room);
        requireActiveParticipant(roomId, principal.id());
        if (roomNoteRepository.existsByRoomIdAndNoteId(roomId, noteId)) {
            throw new ConflictException("That note is already shared in this room.");
        }
        Note note = noteService.getEntity(noteId);
        RoomNote roomNote = new RoomNote();
        roomNote.setRoom(room);
        roomNote.setNote(note);
        roomNote.setSharedBy(userService.getEntity(principal.id()));
        roomNoteRepository.save(roomNote);
        return NoteResponse.from(note);
    }

    @Transactional
    public void end(UUID roomId, AppPrincipal principal) {
        StudyRoom room = load(roomId);
        if (!room.getHost().getId().equals(principal.id())) {
            throw new ForbiddenException("Only the host can end this room.");
        }
        room.setStatus(RoomStatus.ENDED);
        broadcast(RoomEvent.ended(roomId));
    }

    /** Used by the WS controller before broadcasting a discussion post. */
    public void requireActiveParticipant(UUID roomId, UUID userId) {
        if (!participantRepository.existsByRoomIdAndUserIdAndLeftAtIsNull(roomId, userId)) {
            throw new ForbiddenException("You must be in the room to do that.");
        }
    }

    // ---- helpers -------------------------------------------------------------------------

    private void upsertParticipant(StudyRoom room, User user) {
        RoomParticipant participant = participantRepository
                .findByRoomIdAndUserId(room.getId(), user.getId())
                .orElseGet(() -> {
                    RoomParticipant p = new RoomParticipant();
                    p.setRoom(room);
                    p.setUser(user);
                    return p;
                });
        participant.setJoinedAt(Instant.now());
        participant.setLeftAt(null);
        participantRepository.save(participant);
    }

    private void requireActive(StudyRoom room) {
        if (room.getStatus() != RoomStatus.ACTIVE) {
            throw new ConflictException("This room has ended.");
        }
    }

    private void broadcast(RoomEvent event) {
        messagingTemplate.convertAndSend("/topic/room/" + event.roomId(), event);
    }

    private RoomResponse toResponse(StudyRoom room, UUID currentUserId) {
        long count = participantRepository.countByRoomIdAndLeftAtIsNull(room.getId());
        boolean joined = participantRepository.existsByRoomIdAndUserIdAndLeftAtIsNull(room.getId(), currentUserId);
        return RoomResponse.from(room, count, joined);
    }

    private StudyRoom load(UUID roomId) {
        return roomRepository.findById(roomId).orElseThrow(() -> new NotFoundException("Room", roomId));
    }
}
