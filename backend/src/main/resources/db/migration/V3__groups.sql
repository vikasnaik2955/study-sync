-- V3: study groups, memberships, shared notes, and discussion posts.

CREATE TABLE study_groups (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(120) NOT NULL,
    description TEXT,
    subject_id  UUID NOT NULL REFERENCES subjects (id),
    owner_id    UUID NOT NULL REFERENCES users (id),
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX ix_groups_subject ON study_groups (subject_id);
CREATE INDEX ix_groups_owner   ON study_groups (owner_id);
CREATE INDEX ix_groups_name    ON study_groups (lower(name));

CREATE TABLE group_memberships (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id   UUID NOT NULL REFERENCES study_groups (id) ON DELETE CASCADE,
    user_id    UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    role       VARCHAR(20) NOT NULL DEFAULT 'MEMBER',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ux_group_member UNIQUE (group_id, user_id)
);
CREATE INDEX ix_memberships_user ON group_memberships (user_id);

CREATE TABLE group_notes (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id   UUID NOT NULL REFERENCES study_groups (id) ON DELETE CASCADE,
    note_id    UUID NOT NULL REFERENCES notes (id) ON DELETE CASCADE,
    shared_by  UUID NOT NULL REFERENCES users (id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ux_group_note UNIQUE (group_id, note_id)
);

CREATE TABLE group_posts (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id   UUID NOT NULL REFERENCES study_groups (id) ON DELETE CASCADE,
    author_id  UUID NOT NULL REFERENCES users (id),
    body       TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ix_group_posts_group ON group_posts (group_id, created_at DESC);
