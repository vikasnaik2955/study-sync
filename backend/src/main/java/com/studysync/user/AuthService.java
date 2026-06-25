package com.studysync.user;

import com.studysync.common.exception.ConflictException;
import com.studysync.common.exception.UnauthorizedException;
import com.studysync.security.JwtService;
import com.studysync.user.dto.LoginRequest;
import com.studysync.user.dto.RegisterRequest;
import com.studysync.user.dto.TokenResponse;
import com.studysync.user.dto.UserResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * Authentication use-cases: register, login, refresh, logout. Issues an access JWT plus a
 * rotating refresh token on every successful auth. Roles are assigned here (always STUDENT on
 * self-registration) and never read from the client.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, RefreshTokenService refreshTokenService,
                       JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.refreshTokenService = refreshTokenService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public TokenResponse register(RegisterRequest req) {
        if (userRepository.existsByEmailIgnoreCase(req.email())) {
            throw new ConflictException("An account with this email already exists.");
        }
        User user = new User();
        user.setEmail(req.email().toLowerCase());
        user.setPasswordHash(passwordEncoder.encode(req.password()));
        user.setDisplayName(req.displayName());
        user.setRole(Role.STUDENT);          // never trust a client-supplied role
        userRepository.save(user);
        return issueTokens(user);
    }

    @Transactional
    public TokenResponse login(LoginRequest req) {
        User user = userRepository.findByEmailIgnoreCase(req.email())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password."));
        if (!passwordEncoder.matches(req.password(), user.getPasswordHash())) {
            throw new UnauthorizedException("Invalid email or password.");
        }
        return issueTokens(user);
    }

    @Transactional
    public TokenResponse refresh(String refreshToken) {
        RefreshTokenService.RotationResult result = refreshTokenService.rotate(refreshToken);
        String access = jwtService.generateAccessToken(result.user());
        return TokenResponse.bearer(access, result.rawToken(),
                jwtService.accessTtlSeconds(), UserResponse.from(result.user()));
    }

    @Transactional
    public void logout(UUID userId) {
        refreshTokenService.revokeAllForUser(userId);
    }

    private TokenResponse issueTokens(User user) {
        String access = jwtService.generateAccessToken(user);
        String refresh = refreshTokenService.issue(user);
        return TokenResponse.bearer(access, refresh, jwtService.accessTtlSeconds(), UserResponse.from(user));
    }
}
