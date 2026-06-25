package com.studysync.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.studysync.common.ApiError;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * Per-IP token-bucket rate limiting on the auth endpoints (login/register/refresh) — the spots
 * worth protecting from brute force / abuse. A small in-house bucket (see {@link TokenBucket})
 * keeps the dependency surface minimal; for a multi-node deployment swap it for a distributed
 * backend (Redis/Hazelcast) — the filter shape stays the same. Runs before the security chain so
 * throttled requests stay cheap.
 */
@Component
@Order(1)
public class RateLimitFilter extends OncePerRequestFilter {

    private final RateLimitProperties props;
    private final ObjectMapper objectMapper;
    private final ConcurrentMap<String, TokenBucket> buckets = new ConcurrentHashMap<>();

    public RateLimitFilter(RateLimitProperties props, ObjectMapper objectMapper) {
        this.props = props;
        this.objectMapper = objectMapper;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        // Only guard the auth surface; everything else passes straight through.
        return !props.enabled() || !request.getRequestURI().startsWith("/api/v1/auth/");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        TokenBucket bucket = buckets.computeIfAbsent(clientKey(request),
                k -> new TokenBucket(props.authCapacity(), props.authRefillMinutes() * 60_000L));
        if (bucket.tryConsume()) {
            chain.doFilter(request, response);
        } else {
            writeTooMany(request, response);
        }
    }

    private String clientKey(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        return (forwarded != null && !forwarded.isBlank())
                ? forwarded.split(",")[0].trim()
                : request.getRemoteAddr();
    }

    private void writeTooMany(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setHeader(HttpHeaders.RETRY_AFTER, String.valueOf(props.authRefillMinutes() * 60L));
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ApiError body = ApiError.of(429, "RATE_LIMITED",
                "Too many requests. Please slow down and retry shortly.",
                request.getRequestURI(), UUID.randomUUID().toString().substring(0, 8));
        objectMapper.writeValue(response.getOutputStream(), body);
    }

    /**
     * Minimal thread-safe token bucket: {@code capacity} tokens that refill linearly over
     * {@code refillMillis}. {@code tryConsume} takes one token if available.
     */
    static final class TokenBucket {
        private final int capacity;
        private final double refillPerMs;
        private double tokens;
        private long lastRefill;

        TokenBucket(int capacity, long refillMillis) {
            this.capacity = capacity;
            this.refillPerMs = (double) capacity / refillMillis;
            this.tokens = capacity;
            this.lastRefill = System.currentTimeMillis();
        }

        synchronized boolean tryConsume() {
            refill();
            if (tokens >= 1) {
                tokens -= 1;
                return true;
            }
            return false;
        }

        private void refill() {
            long now = System.currentTimeMillis();
            tokens = Math.min(capacity, tokens + (now - lastRefill) * refillPerMs);
            lastRefill = now;
        }
    }
}
