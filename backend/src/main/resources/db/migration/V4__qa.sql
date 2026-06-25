-- V4: Q&A forum — questions, answers, votes.

CREATE TABLE questions (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title      VARCHAR(200) NOT NULL,
    body       TEXT         NOT NULL,
    subject_id UUID NOT NULL REFERENCES subjects (id),
    author_id  UUID NOT NULL REFERENCES users (id),
    view_count INTEGER      NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX ix_questions_subject ON questions (subject_id);
CREATE INDEX ix_questions_author  ON questions (author_id);
CREATE INDEX ix_questions_title   ON questions (lower(title));
CREATE INDEX ix_questions_created ON questions (created_at DESC);

CREATE TABLE answers (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES questions (id) ON DELETE CASCADE,
    author_id   UUID NOT NULL REFERENCES users (id),
    body        TEXT    NOT NULL,
    net_votes   INTEGER NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- Serve answers best-first without a sort: index on (question, net_votes desc).
CREATE INDEX ix_answers_question_votes ON answers (question_id, net_votes DESC);

CREATE TABLE votes (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    answer_id  UUID NOT NULL REFERENCES answers (id) ON DELETE CASCADE,
    user_id    UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    value      INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ux_vote_answer_user UNIQUE (answer_id, user_id),
    CONSTRAINT ck_vote_value CHECK (value IN (-1, 1))
);
