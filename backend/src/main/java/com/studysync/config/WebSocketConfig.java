package com.studysync.config;

import com.studysync.security.WsAuthChannelInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * STOMP messaging over a single {@code /ws} endpoint (SockJS fallback for browsers; raw WS for
 * the future Android client). Simple in-memory broker for {@code /topic} (group/room broadcast)
 * and {@code /queue} (per-user direct messages). Client sends go to {@code /app/**}.
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final WsAuthChannelInterceptor wsAuthChannelInterceptor;
    private final CorsProperties corsProperties;

    public WebSocketConfig(WsAuthChannelInterceptor wsAuthChannelInterceptor, CorsProperties corsProperties) {
        this.wsAuthChannelInterceptor = wsAuthChannelInterceptor;
        this.corsProperties = corsProperties;
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins(corsProperties.allowedOrigins().toArray(String[]::new))
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic", "/queue");
        registry.setApplicationDestinationPrefixes("/app");
        registry.setUserDestinationPrefix("/user");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        // Authenticate the CONNECT frame and bind the principal for the session.
        registration.interceptors(wsAuthChannelInterceptor);
    }
}
