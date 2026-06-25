package com.studysync.chat;

import com.studysync.chat.dto.AttachmentResponse;
import com.studysync.chat.dto.ConversationResponse;
import com.studysync.chat.dto.MessageResponse;
import com.studysync.chat.dto.OpenConversationRequest;
import com.studysync.chat.dto.ParticipantBrief;
import com.studysync.common.PageResponse;
import com.studysync.common.exception.ForbiddenException;
import com.studysync.common.exception.NotFoundException;
import com.studysync.common.exception.ValidationException;
import com.studysync.group.GroupMembership;
import com.studysync.group.GroupMembershipRepository;
import com.studysync.group.StudyGroup;
import com.studysync.group.StudyGroupRepository;
import com.studysync.storage.StorageContext;
import com.studysync.storage.StorageService;
import com.studysync.storage.StoredObject;
import com.studysync.user.User;
import com.studysync.user.UserService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * Chat use-cases: open/list conversations, persist + read message history, and store attachments.
 * History is always loaded via REST; the WebSocket layer only carries live deltas. Every read and
 * write is gated on conversation membership.
 */
@Service
public class ChatService {

    private final ConversationRepository conversationRepository;
    private final ConversationParticipantRepository participantRepository;
    private final MessageRepository messageRepository;
    private final UserService userService;
    private final GroupMembershipRepository groupMembershipRepository;
    private final StudyGroupRepository studyGroupRepository;
    private final StorageService storageService;

    public ChatService(ConversationRepository conversationRepository,
                       ConversationParticipantRepository participantRepository,
                       MessageRepository messageRepository, UserService userService,
                       GroupMembershipRepository groupMembershipRepository,
                       StudyGroupRepository studyGroupRepository, StorageService storageService) {
        this.conversationRepository = conversationRepository;
        this.participantRepository = participantRepository;
        this.messageRepository = messageRepository;
        this.userService = userService;
        this.groupMembershipRepository = groupMembershipRepository;
        this.studyGroupRepository = studyGroupRepository;
        this.storageService = storageService;
    }

    @Transactional(readOnly = true)
    public List<ConversationResponse> listConversations(UUID userId) {
        return conversationRepository.findAllForUser(userId).stream()
                .map(c -> toResponse(c, userId))
                .toList();
    }

    @Transactional
    public ConversationResponse open(UUID requesterId, OpenConversationRequest req) {
        if (req.groupId() != null) {
            return toResponse(openGroupConversation(req.groupId(), requesterId), requesterId);
        }
        if (req.participantId() != null) {
            return toResponse(openDirectConversation(requesterId, req.participantId()), requesterId);
        }
        throw new ValidationException("Provide either participantId (direct) or groupId (group).");
    }

    @Transactional(readOnly = true)
    public PageResponse<MessageResponse> getMessages(UUID conversationId, UUID userId, Pageable pageable) {
        requireParticipant(conversationId, userId);
        return PageResponse.from(messageRepository.findByConversationId(conversationId, pageable),
                MessageResponse::from);
    }

    /** Persist a message (called by the WS controller before it broadcasts). */
    @Transactional
    public MessageResponse saveMessage(UUID senderId, UUID conversationId, String body, String attachmentUrl) {
        Conversation conversation = loadConversation(conversationId);
        requireParticipant(conversationId, senderId);
        if (!StringUtils.hasText(body) && !StringUtils.hasText(attachmentUrl)) {
            throw new ValidationException("A message needs text or an attachment.");
        }
        Message message = new Message();
        message.setConversation(conversation);
        message.setSender(userService.getEntity(senderId));
        message.setBody(StringUtils.hasText(body) ? body : null);
        message.setAttachmentUrl(StringUtils.hasText(attachmentUrl) ? attachmentUrl : null);
        messageRepository.save(message);

        conversation.setUpdatedAt(Instant.now());   // bump so the inbox re-sorts by activity
        conversationRepository.save(conversation);
        return MessageResponse.from(message);
    }

    @Transactional
    public AttachmentResponse uploadAttachment(UUID conversationId, UUID userId, MultipartFile file) {
        requireParticipant(conversationId, userId);
        if (file == null || file.isEmpty()) {
            throw new ValidationException("No file provided.");
        }
        StoredObject stored = storageService.store(file, StorageContext.of("chat"));
        return new AttachmentResponse(stored.url(), file.getOriginalFilename(),
                file.getContentType(), stored.size());
    }

    @Transactional(readOnly = true)
    public List<UUID> participantIds(UUID conversationId) {
        return participantRepository.findByConversationId(conversationId).stream()
                .map(p -> p.getUser().getId())
                .toList();
    }

    public void requireParticipant(UUID conversationId, UUID userId) {
        if (!participantRepository.existsByConversationIdAndUserId(conversationId, userId)) {
            throw new ForbiddenException("You are not a participant of this conversation.");
        }
    }

    // ---- conversation creation -----------------------------------------------------------

    private Conversation openDirectConversation(UUID a, UUID b) {
        if (a.equals(b)) {
            throw new ValidationException("Cannot open a conversation with yourself.");
        }
        String key = directKey(a, b);
        return conversationRepository.findByDirectKey(key).orElseGet(() -> {
            Conversation conversation = new Conversation();
            conversation.setType(ConversationType.DIRECT);
            conversation.setDirectKey(key);
            conversationRepository.save(conversation);
            addParticipant(conversation, userService.getEntity(a));
            addParticipant(conversation, userService.getEntity(b));
            return conversation;
        });
    }

    private Conversation openGroupConversation(UUID groupId, UUID requesterId) {
        if (!groupMembershipRepository.existsByGroupIdAndUserId(groupId, requesterId)) {
            throw new ForbiddenException("You must be a group member to access its chat.");
        }
        return conversationRepository.findByGroupId(groupId).orElseGet(() -> {
            StudyGroup group = studyGroupRepository.findById(groupId)
                    .orElseThrow(() -> new NotFoundException("Group", groupId));
            Conversation conversation = new Conversation();
            conversation.setType(ConversationType.GROUP);
            conversation.setGroup(group);
            conversationRepository.save(conversation);
            for (GroupMembership m : groupMembershipRepository.findByGroupIdOrderByCreatedAtAsc(groupId)) {
                addParticipant(conversation, m.getUser());
            }
            return conversation;
        });
    }

    private void addParticipant(Conversation conversation, User user) {
        ConversationParticipant participant = new ConversationParticipant();
        participant.setConversation(conversation);
        participant.setUser(user);
        participantRepository.save(participant);
    }

    private String directKey(UUID a, UUID b) {
        return a.compareTo(b) < 0 ? a + ":" + b : b + ":" + a;
    }

    private ConversationResponse toResponse(Conversation c, UUID viewerId) {
        List<ParticipantBrief> participants = participantRepository.findByConversationId(c.getId()).stream()
                .map(p -> ParticipantBrief.from(p.getUser()))
                .toList();
        String title = titleFor(c, participants, viewerId);
        Message last = messageRepository.findFirstByConversationIdOrderByCreatedAtDesc(c.getId());
        MessageResponse lastMessage = last != null ? MessageResponse.from(last) : null;
        return new ConversationResponse(c.getId(), c.getType(),
                c.getGroup() != null ? c.getGroup().getId() : null,
                title, participants, lastMessage, c.getCreatedAt());
    }

    private String titleFor(Conversation c, List<ParticipantBrief> participants, UUID viewerId) {
        if (c.getType() == ConversationType.GROUP && c.getGroup() != null) {
            return c.getGroup().getName();
        }
        return participants.stream()
                .filter(p -> !p.userId().equals(viewerId))
                .map(ParticipantBrief::displayName)
                .findFirst()
                .orElse("Direct message");
    }

    private Conversation loadConversation(UUID id) {
        return conversationRepository.findById(id).orElseThrow(() -> new NotFoundException("Conversation", id));
    }
}
