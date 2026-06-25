-- V5: chat — conversations, participants, messages.

CREATE TABLE conversations (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type       VARCHAR(20) NOT NULL,
    group_id   UUID REFERENCES study_groups (id) ON DELETE CASCADE,
    direct_key VARCHAR(80),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- A pair of users can only ever have one DIRECT conversation.
CREATE UNIQUE INDEX ux_conversations_direct_key ON conversations (direct_key);
CREATE UNIQUE INDEX ux_conversations_group ON conversations (group_id);

CREATE TABLE conversation_participants (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
    user_id         UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ux_conv_participant UNIQUE (conversation_id, user_id)
);
CREATE INDEX ix_participants_user ON conversation_participants (user_id);

CREATE TABLE messages (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
    sender_id       UUID NOT NULL REFERENCES users (id),
    body            TEXT,
    attachment_url  VARCHAR(512),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- Page message history newest-first per conversation.
CREATE INDEX ix_messages_conversation ON messages (conversation_id, created_at DESC);
