package com.studysync.room;

import com.studysync.room.dto.RoomEvent;
import com.studysync.room.dto.RoomPostCommand;
import com.studysync.user.UserService;
import com.studysync.user.dto.UserResponse;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;

import java.security.Principal;
import java.util.UUID;

/**
 * STOMP handler for live room discussion. Posts are authorized against active room membership and
 * broadcast to {@code /topic/room/{roomId}} but not persisted (v1 — see {@link RoomEvent}).
 */
@Controller
public class RoomWsController {

    private final RoomService roomService;
    private final UserService userService;
    private final SimpMessagingTemplate messagingTemplate;

    public RoomWsController(RoomService roomService, UserService userService,
                            SimpMessagingTemplate messagingTemplate) {
        this.roomService = roomService;
        this.userService = userService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/room.post")
    public void post(@Payload RoomPostCommand cmd, Principal principal) {
        if (!StringUtils.hasText(cmd.body())) {
            return;
        }
        UUID userId = UUID.fromString(principal.getName());
        roomService.requireActiveParticipant(cmd.roomId(), userId);
        UserResponse user = userService.getById(userId);
        RoomEvent event = RoomEvent.post(cmd.roomId(), userId, user.displayName(), cmd.body());
        messagingTemplate.convertAndSend("/topic/room/" + cmd.roomId(), event);
    }
}
