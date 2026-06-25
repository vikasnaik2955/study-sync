package com.studysync.room;

import com.studysync.common.PageResponse;
import com.studysync.note.dto.NoteResponse;
import com.studysync.room.dto.CreateRoomRequest;
import com.studysync.room.dto.RoomDetailResponse;
import com.studysync.room.dto.RoomResponse;
import com.studysync.security.AppPrincipal;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/** Virtual study rooms: discover active rooms, join/leave, shared notes, host ends the room. */
@RestController
@RequestMapping("/api/v1/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public PageResponse<RoomResponse> listActive(@AuthenticationPrincipal AppPrincipal principal,
                                                 @RequestParam(required = false) UUID subjectId,
                                                 @PageableDefault(size = 20, sort = "createdAt",
                                                         direction = Sort.Direction.DESC) Pageable pageable) {
        return roomService.listActive(subjectId, principal.id(), pageable);
    }

    @PostMapping
    public ResponseEntity<RoomResponse> create(@AuthenticationPrincipal AppPrincipal principal,
                                               @Valid @RequestBody CreateRoomRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(roomService.create(principal, req));
    }

    @GetMapping("/{id}")
    public RoomDetailResponse get(@AuthenticationPrincipal AppPrincipal principal, @PathVariable UUID id) {
        return roomService.getDetail(id, principal.id());
    }

    @PostMapping("/{id}/join")
    public RoomResponse join(@AuthenticationPrincipal AppPrincipal principal, @PathVariable UUID id) {
        return roomService.join(id, principal);
    }

    @DeleteMapping("/{id}/leave")
    public ResponseEntity<Void> leave(@AuthenticationPrincipal AppPrincipal principal, @PathVariable UUID id) {
        roomService.leave(id, principal);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/notes")
    public List<NoteResponse> notes(@AuthenticationPrincipal AppPrincipal principal, @PathVariable UUID id) {
        return roomService.listNotes(id, principal.id());
    }

    @PostMapping("/{id}/notes/{noteId}")
    public ResponseEntity<NoteResponse> shareNote(@AuthenticationPrincipal AppPrincipal principal,
                                                  @PathVariable UUID id, @PathVariable UUID noteId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(roomService.shareNote(id, noteId, principal));
    }

    @PostMapping("/{id}/end")
    public ResponseEntity<Void> end(@AuthenticationPrincipal AppPrincipal principal, @PathVariable UUID id) {
        roomService.end(id, principal);
        return ResponseEntity.noContent().build();
    }
}
