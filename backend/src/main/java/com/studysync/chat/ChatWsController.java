package com.studysync.chat;

import com.studysync.chat.dto.ChatEvent;
import com.studysync.chat.dto.MessageResponse;
import com.studysync.chat.dto.PresenceEvent;
import com.studysync.chat.dto.PresencePing;
import com.studysync.chat.dto.SendMessageCommand;
import com.studysync.chat.dto.TypingCommand;
import com.studysync.user.dto.UserResponse;
import com.studysync.user.UserService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.UUID;

/**
 * STOMP message handlers. The CONNECT frame is already authenticated (see
 * {@code WsAuthChannelInterceptor}), so {@code principal.getName()} is the user id. Every inbound
 * frame is authorized against conversation membership in the service before anything is broadcast.
 */
@Controller
public class ChatWsController {

    private final ChatService chatService;
    private final UserService userService;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatWsController(ChatService chatService, UserService userService,
                            SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.userService = userService;
        this.messagingTemplate = messagingTemplate;
    }

    /** Persist then fan out: to the conversation topic and to each participant's personal queue. */
    @MessageMapping("/chat.send")
    public void send(@Payload SendMessageCommand cmd, Principal principal) {
        UUID senderId = userId(principal);
        MessageResponse message = chatService.saveMessage(
                senderId, cmd.conversationId(), cmd.body(), cmd.attachmentUrl());
        ChatEvent event = ChatEvent.messageCreated(message);

        messagingTemplate.convertAndSend("/topic/conversation/" + cmd.conversationId(), event);
        for (UUID participantId : chatService.participantIds(cmd.conversationId())) {
            messagingTemplate.convertAndSendToUser(participantId.toString(), "/queue/messages", event);
        }
    }

    /** Transient typing indicator — authorized but never persisted. */
    @MessageMapping("/chat.typing")
    public void typing(@Payload TypingCommand cmd, Principal principal) {
        UUID senderId = userId(principal);
        chatService.requireParticipant(cmd.conversationId(), senderId);
        UserResponse sender = userService.getById(senderId);
        ChatEvent event = ChatEvent.typing(cmd.conversationId(), senderId, sender.displayName());
        messagingTemplate.convertAndSend("/topic/conversation/" + cmd.conversationId(), event);
    }

    /** Heartbeat-driven presence for a group/room scope. */
    @MessageMapping("/presence.ping")
    public void presence(@Payload PresencePing ping, Principal principal) {
        UUID userId = userId(principal);
        UserResponse user = userService.getById(userId);
        PresenceEvent event = new PresenceEvent("PRESENCE_UPDATE", ping.scopeId(),
                userId, user.displayName(), true);
        messagingTemplate.convertAndSend("/topic/presence/" + ping.scopeId(), event);
    }

    private UUID userId(Principal principal) {
        return UUID.fromString(principal.getName());
    }
}
