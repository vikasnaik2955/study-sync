-- V2: subjects + notes.

CREATE TABLE subjects (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name       VARCHAR(120) NOT NULL,
    code       VARCHAR(32),
    created_at TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX ux_subjects_name ON subjects (lower(name));

CREATE TABLE notes (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title             VARCHAR(255) NOT NULL,
    subject_id        UUID NOT NULL REFERENCES subjects (id),
    uploader_id       UUID NOT NULL REFERENCES users (id),
    storage_key       VARCHAR(512) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    content_type      VARCHAR(120) NOT NULL,
    size_bytes        BIGINT       NOT NULL,
    download_count    INTEGER      NOT NULL DEFAULT 0,
    created_at        TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- Indexes for the common access paths: by subject, by uploader, and title search.
CREATE INDEX ix_notes_subject  ON notes (subject_id);
CREATE INDEX ix_notes_uploader ON notes (uploader_id);
CREATE INDEX ix_notes_title    ON notes (lower(title));
CREATE INDEX ix_notes_created  ON notes (created_at DESC);
