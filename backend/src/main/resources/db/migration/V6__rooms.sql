-- V6: virtual study rooms — rooms, participants, shared notes.

CREATE TABLE study_rooms (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name       VARCHAR(120) NOT NULL,
    subject_id UUID NOT NULL REFERENCES subjects (id),
    host_id    UUID NOT NULL REFERENCES users (id),
    status     VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX ix_rooms_status  ON study_rooms (status);
CREATE INDEX ix_rooms_subject ON study_rooms (subject_id);

CREATE TABLE study_room_participants (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id    UUID NOT NULL REFERENCES study_rooms (id) ON DELETE CASCADE,
    user_id    UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    joined_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    left_at    TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ux_room_participant UNIQUE (room_id, user_id)
);
CREATE INDEX ix_room_participants_active ON study_room_participants (room_id) WHERE left_at IS NULL;

CREATE TABLE room_notes (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id    UUID NOT NULL REFERENCES study_rooms (id) ON DELETE CASCADE,
    note_id    UUID NOT NULL REFERENCES notes (id) ON DELETE CASCADE,
    shared_by  UUID NOT NULL REFERENCES users (id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ux_room_note UNIQUE (room_id, note_id)
);
