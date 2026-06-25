package com.studysync.group;

import com.studysync.common.PageResponse;
import com.studysync.group.dto.CreateGroupRequest;
import com.studysync.group.dto.CreatePostRequest;
import com.studysync.group.dto.GroupMemberResponse;
import com.studysync.group.dto.GroupPostResponse;
import com.studysync.group.dto.GroupResponse;
import com.studysync.note.dto.NoteResponse;
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

/** Study groups: discovery, membership, shared notes, and discussion. */
@RestController
@RequestMapping("/api/v1/groups")
public class GroupController {

    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping
    public PageResponse<GroupResponse> list(@AuthenticationPrincipal AppPrincipal principal,
                                            @RequestParam(required = false) UUID subjectId,
                                            @RequestParam(required = false) String q,
                                            @PageableDefault(size = 20, sort = "createdAt",
                                                    direction = Sort.Direction.DESC) Pageable pageable) {
        return groupService.search(subjectId, q, principal.id(), pageable);
    }

    @PostMapping
    public ResponseEntity<GroupResponse> create(@AuthenticationPrincipal AppPrincipal principal,
                                                @Valid @RequestBody CreateGroupRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(groupService.create(principal, req));
    }

    @GetMapping("/{id}")
    public GroupResponse get(@AuthenticationPrincipal AppPrincipal principal, @PathVariable UUID id) {
        return groupService.get(id, principal.id());
    }

    @PostMapping("/{id}/join")
    public GroupResponse join(@AuthenticationPrincipal AppPrincipal principal, @PathVariable UUID id) {
        return groupService.join(id, principal);
    }

    @DeleteMapping("/{id}/leave")
    public ResponseEntity<Void> leave(@AuthenticationPrincipal AppPrincipal principal, @PathVariable UUID id) {
        groupService.leave(id, principal);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/members")
    public List<GroupMemberResponse> members(@AuthenticationPrincipal AppPrincipal principal,
                                             @PathVariable UUID id) {
        return groupService.listMembers(id, principal.id());
    }

    @DeleteMapping("/{id}/members/{userId}")
    public ResponseEntity<Void> removeMember(@AuthenticationPrincipal AppPrincipal principal,
                                             @PathVariable UUID id, @PathVariable UUID userId) {
        groupService.removeMember(id, userId, principal);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/notes")
    public List<NoteResponse> notes(@AuthenticationPrincipal AppPrincipal principal, @PathVariable UUID id) {
        return groupService.listGroupNotes(id, principal.id());
    }

    @PostMapping("/{id}/notes/{noteId}")
    public ResponseEntity<NoteResponse> shareNote(@AuthenticationPrincipal AppPrincipal principal,
                                                  @PathVariable UUID id, @PathVariable UUID noteId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(groupService.shareNote(id, noteId, principal));
    }

    @GetMapping("/{id}/posts")
    public PageResponse<GroupPostResponse> posts(@AuthenticationPrincipal AppPrincipal principal,
                                                 @PathVariable UUID id,
                                                 @PageableDefault(size = 30, sort = "createdAt",
                                                         direction = Sort.Direction.DESC) Pageable pageable) {
        return groupService.listPosts(id, principal.id(), pageable);
    }

    @PostMapping("/{id}/posts")
    public ResponseEntity<GroupPostResponse> createPost(@AuthenticationPrincipal AppPrincipal principal,
                                                        @PathVariable UUID id,
                                                        @Valid @RequestBody CreatePostRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(groupService.createPost(id, principal, req));
    }
}
