package com.studysync.group;

import com.studysync.common.PageResponse;
import com.studysync.common.exception.ConflictException;
import com.studysync.common.exception.ForbiddenException;
import com.studysync.common.exception.NotFoundException;
import com.studysync.group.dto.CreateGroupRequest;
import com.studysync.group.dto.CreatePostRequest;
import com.studysync.group.dto.GroupMemberResponse;
import com.studysync.group.dto.GroupPostResponse;
import com.studysync.group.dto.GroupResponse;
import com.studysync.note.Note;
import com.studysync.note.NoteService;
import com.studysync.note.dto.NoteResponse;
import com.studysync.security.AppPrincipal;
import com.studysync.subject.Subject;
import com.studysync.subject.SubjectService;
import com.studysync.user.User;
import com.studysync.user.UserService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.UUID;

/**
 * Study-group use-cases. Membership gates every resource (members, notes, discussion); the owner
 * gets the extra powers (remove members). Ownership/membership are checked here in the service
 * layer — never trusted from the client.
 */
@Service
public class GroupService {

    private final StudyGroupRepository groupRepository;
    private final GroupMembershipRepository membershipRepository;
    private final GroupNoteRepository groupNoteRepository;
    private final GroupPostRepository groupPostRepository;
    private final SubjectService subjectService;
    private final UserService userService;
    private final NoteService noteService;

    public GroupService(StudyGroupRepository groupRepository, GroupMembershipRepository membershipRepository,
                        GroupNoteRepository groupNoteRepository, GroupPostRepository groupPostRepository,
                        SubjectService subjectService, UserService userService, NoteService noteService) {
        this.groupRepository = groupRepository;
        this.membershipRepository = membershipRepository;
        this.groupNoteRepository = groupNoteRepository;
        this.groupPostRepository = groupPostRepository;
        this.subjectService = subjectService;
        this.userService = userService;
        this.noteService = noteService;
    }

    @Transactional(readOnly = true)
    public PageResponse<GroupResponse> search(UUID subjectId, String q, UUID currentUserId, Pageable pageable) {
        String query = StringUtils.hasText(q) ? q.trim() : null;
        return PageResponse.from(groupRepository.search(subjectId, query, pageable),
                g -> toResponse(g, currentUserId));
    }

    @Transactional
    public GroupResponse create(AppPrincipal principal, CreateGroupRequest req) {
        Subject subject = subjectService.getEntity(req.subjectId());
        User owner = userService.getEntity(principal.id());

        StudyGroup group = new StudyGroup();
        group.setName(req.name());
        group.setDescription(req.description());
        group.setSubject(subject);
        group.setOwner(owner);
        groupRepository.save(group);

        addMembership(group, owner, GroupRole.OWNER);
        return toResponse(group, principal.id());
    }

    @Transactional(readOnly = true)
    public GroupResponse get(UUID groupId, UUID currentUserId) {
        return toResponse(load(groupId), currentUserId);
    }

    @Transactional
    public GroupResponse join(UUID groupId, AppPrincipal principal) {
        StudyGroup group = load(groupId);
        if (membershipRepository.existsByGroupIdAndUserId(groupId, principal.id())) {
            throw new ConflictException("You are already a member of this group.");
        }
        addMembership(group, userService.getEntity(principal.id()), GroupRole.MEMBER);
        return toResponse(group, principal.id());
    }

    @Transactional
    public void leave(UUID groupId, AppPrincipal principal) {
        StudyGroup group = load(groupId);
        if (group.getOwner().getId().equals(principal.id())) {
            throw new ConflictException("The owner cannot leave the group; delete it or transfer ownership.");
        }
        GroupMembership membership = membershipRepository.findByGroupIdAndUserId(groupId, principal.id())
                .orElseThrow(() -> new ConflictException("You are not a member of this group."));
        membershipRepository.delete(membership);
    }

    @Transactional(readOnly = true)
    public List<GroupMemberResponse> listMembers(UUID groupId, UUID currentUserId) {
        requireMember(groupId, currentUserId);
        return membershipRepository.findByGroupIdOrderByCreatedAtAsc(groupId).stream()
                .map(GroupMemberResponse::from)
                .toList();
    }

    @Transactional
    public void removeMember(UUID groupId, UUID targetUserId, AppPrincipal principal) {
        StudyGroup group = load(groupId);
        if (!group.getOwner().getId().equals(principal.id())) {
            throw new ForbiddenException("Only the group owner can remove members.");
        }
        if (targetUserId.equals(group.getOwner().getId())) {
            throw new ConflictException("The owner cannot be removed.");
        }
        GroupMembership membership = membershipRepository.findByGroupIdAndUserId(groupId, targetUserId)
                .orElseThrow(() -> new NotFoundException("Membership for user", targetUserId));
        membershipRepository.delete(membership);
    }

    @Transactional(readOnly = true)
    public List<NoteResponse> listGroupNotes(UUID groupId, UUID currentUserId) {
        requireMember(groupId, currentUserId);
        return groupNoteRepository.findByGroupIdOrderByCreatedAtDesc(groupId).stream()
                .map(gn -> NoteResponse.from(gn.getNote()))
                .toList();
    }

    @Transactional
    public NoteResponse shareNote(UUID groupId, UUID noteId, AppPrincipal principal) {
        StudyGroup group = requireMember(groupId, principal.id());
        if (groupNoteRepository.existsByGroupIdAndNoteId(groupId, noteId)) {
            throw new ConflictException("That note is already shared in this group.");
        }
        Note note = noteService.getEntity(noteId);
        GroupNote groupNote = new GroupNote();
        groupNote.setGroup(group);
        groupNote.setNote(note);
        groupNote.setSharedBy(userService.getEntity(principal.id()));
        groupNoteRepository.save(groupNote);
        return NoteResponse.from(note);
    }

    @Transactional(readOnly = true)
    public PageResponse<GroupPostResponse> listPosts(UUID groupId, UUID currentUserId, Pageable pageable) {
        requireMember(groupId, currentUserId);
        return PageResponse.from(groupPostRepository.findByGroupId(groupId, pageable), GroupPostResponse::from);
    }

    @Transactional
    public GroupPostResponse createPost(UUID groupId, AppPrincipal principal, CreatePostRequest req) {
        StudyGroup group = requireMember(groupId, principal.id());
        GroupPost post = new GroupPost();
        post.setGroup(group);
        post.setAuthor(userService.getEntity(principal.id()));
        post.setBody(req.body());
        return GroupPostResponse.from(groupPostRepository.save(post));
    }

    // ---- helpers -------------------------------------------------------------------------

    private StudyGroup requireMember(UUID groupId, UUID userId) {
        StudyGroup group = load(groupId);
        if (!membershipRepository.existsByGroupIdAndUserId(groupId, userId)) {
            throw new ForbiddenException("You must be a member of this group.");
        }
        return group;
    }

    private void addMembership(StudyGroup group, User user, GroupRole role) {
        GroupMembership membership = new GroupMembership();
        membership.setGroup(group);
        membership.setUser(user);
        membership.setRole(role);
        membershipRepository.save(membership);
    }

    private GroupResponse toResponse(StudyGroup group, UUID currentUserId) {
        long memberCount = membershipRepository.countByGroupId(group.getId());
        boolean joined = membershipRepository.existsByGroupIdAndUserId(group.getId(), currentUserId);
        return GroupResponse.from(group, memberCount, joined);
    }

    private StudyGroup load(UUID groupId) {
        return groupRepository.findById(groupId).orElseThrow(() -> new NotFoundException("Group", groupId));
    }
}
