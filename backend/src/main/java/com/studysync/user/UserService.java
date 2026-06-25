package com.studysync.user;

import com.studysync.common.exception.NotFoundException;
import com.studysync.common.exception.UnauthorizedException;
import com.studysync.user.dto.ChangePasswordRequest;
import com.studysync.user.dto.UpdateProfileRequest;
import com.studysync.user.dto.UserResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.UUID;

/**
 * Profile use-cases. A user only ever edits their own profile (the controller passes the
 * authenticated id); password change re-verifies the current password and revokes all refresh
 * tokens so other sessions are forced to re-authenticate.
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RefreshTokenService refreshTokenService,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.refreshTokenService = refreshTokenService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public UserResponse getById(UUID id) {
        return UserResponse.from(loadUser(id));
    }

    @Transactional
    public UserResponse updateProfile(UUID userId, UpdateProfileRequest req) {
        User user = loadUser(userId);
        if (StringUtils.hasText(req.displayName())) {
            user.setDisplayName(req.displayName());
        }
        if (req.avatarUrl() != null) {
            user.setAvatarUrl(req.avatarUrl());
        }
        if (req.bio() != null) {
            user.setBio(req.bio());
        }
        return UserResponse.from(user);
    }

    @Transactional
    public void changePassword(UUID userId, ChangePasswordRequest req) {
        User user = loadUser(userId);
        if (!passwordEncoder.matches(req.currentPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Current password is incorrect.");
        }
        user.setPasswordHash(passwordEncoder.encode(req.newPassword()));
        refreshTokenService.revokeAllForUser(userId);   // force re-login elsewhere
    }

    /** Loaded by other modules that need the entity (e.g. setting an uploader/author). */
    @Transactional(readOnly = true)
    public User getEntity(UUID id) {
        return loadUser(id);
    }

    private User loadUser(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException("User", id));
    }
}
