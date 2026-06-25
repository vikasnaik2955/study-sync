package com.studysync.chat;

import com.studysync.chat.dto.AttachmentResponse;
import com.studysync.chat.dto.ConversationResponse;
import com.studysync.chat.dto.MessageResponse;
import com.studysync.chat.dto.OpenConversationRequest;
import com.studysync.common.PageResponse;
import com.studysync.security.AppPrincipal;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

/**
 * REST surface for chat: list/open conversations, load message history (the socket only carries
 * live deltas), and upload attachments. Sending a message happens over STOMP (see
 * {@link ChatWsController}).
 */
@RestController
@RequestMapping("/api/v1/conversations")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping
    public List<ConversationResponse> list(@AuthenticationPrincipal AppPrincipal principal) {
        return chatService.listConversations(principal.id());
    }

    @PostMapping
    public ConversationResponse open(@AuthenticationPrincipal AppPrincipal principal,
                                     @RequestBody OpenConversationRequest req) {
        return chatService.open(principal.id(), req);
    }

    @GetMapping("/{id}/messages")
    public PageResponse<MessageResponse> messages(@AuthenticationPrincipal AppPrincipal principal,
                                                  @PathVariable UUID id,
                                                  @PageableDefault(size = 30, sort = "createdAt",
                                                          direction = Sort.Direction.DESC) Pageable pageable) {
        return chatService.getMessages(id, principal.id(), pageable);
    }

    @PostMapping(value = "/{id}/files", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public AttachmentResponse uploadFile(@AuthenticationPrincipal AppPrincipal principal,
                                         @PathVariable UUID id,
                                         @RequestParam("file") MultipartFile file) {
        return chatService.uploadAttachment(id, principal.id(), file);
    }
}
