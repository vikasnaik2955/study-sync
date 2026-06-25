package com.studysync.user;

import com.studysync.security.AppPrincipal;
import com.studysync.user.dto.LoginRequest;
import com.studysync.user.dto.RefreshRequest;
import com.studysync.user.dto.RegisterRequest;
import com.studysync.user.dto.TokenResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Public auth surface (rate-limited): register, login, refresh; logout requires a token. */
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<TokenResponse> register(@Valid @RequestBody RegisterRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(req));
    }

    @PostMapping("/login")
    public TokenResponse login(@Valid @RequestBody LoginRequest req) {
        return authService.login(req);
    }

    @PostMapping("/refresh")
    public TokenResponse refresh(@Valid @RequestBody RefreshRequest req) {
        return authService.refresh(req.refreshToken());
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@AuthenticationPrincipal AppPrincipal principal) {
        // /auth/** is public so the endpoint is reachable even with an expired access token;
        // if a valid one is present we revoke that user's refresh-token family.
        if (principal != null) {
            authService.logout(principal.id());
        }
        return ResponseEntity.noContent().build();
    }
}
