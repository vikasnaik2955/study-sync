package com.studysync.security;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Authenticates the STOMP CONNECT frame: the client sends the same access JWT it uses for REST
 * in the {@code Authorization} header. We verify it once and bind the {@link AppPrincipal} to the
 * WebSocket session, so every subsequent SUBSCRIBE/SEND is authorized against a known identity.
 */
@Component
public class WsAuthChannelInterceptor implements ChannelInterceptor {

    private static final String PREFIX = "Bearer ";

    private final JwtService jwtService;

    public WsAuthChannelInterceptor(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
            String header = accessor.getFirstNativeHeader("Authorization");
            if (header != null && header.startsWith(PREFIX)) {
                String token = header.substring(PREFIX.length()).trim();
                if (jwtService.isValid(token)) {
                    AppPrincipal principal = jwtService.parse(token);
                    var auth = new UsernamePasswordAuthenticationToken(
                            principal, null,
                            List.of(new SimpleGrantedAuthority("ROLE_" + principal.role().name())));
                    accessor.setUser(auth);
                }
            }
            // No valid token -> no Principal bound; broker rejects user-scoped destinations.
        }
        return message;
    }
}
