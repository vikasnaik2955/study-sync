package com.studysync.user;

import com.studysync.security.AppPrincipal;
import com.studysync.user.dto.ChangePasswordRequest;
import com.studysync.user.dto.UpdateProfileRequest;
import com.studysync.user.dto.UserResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

/** Current-user profile + public profile lookup. All endpoints require authentication. */
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserResponse me(@AuthenticationPrincipal AppPrincipal principal) {
        return userService.getById(principal.id());
    }

    @PatchMapping("/me")
    public UserResponse updateMe(@AuthenticationPrincipal AppPrincipal principal,
                                 @Valid @RequestBody UpdateProfileRequest req) {
        return userService.updateProfile(principal.id(), req);
    }

    @PostMapping("/me/password")
    public ResponseEntity<Void> changePassword(@AuthenticationPrincipal AppPrincipal principal,
                                               @Valid @RequestBody ChangePasswordRequest req) {
        userService.changePassword(principal.id(), req);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public UserResponse getById(@PathVariable UUID id) {
        // Public profile — never leaks another user's email.
        return userService.getPublicProfile(id);
    }
}
