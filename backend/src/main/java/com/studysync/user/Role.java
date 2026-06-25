package com.studysync.user;

/**
 * Coarse account role. Group ownership is a per-resource concept (a STUDENT who owns a group),
 * tracked on the membership row — not a global role. Only STUDENT and ADMIN are global.
 */
public enum Role {
    STUDENT,
    ADMIN
}
