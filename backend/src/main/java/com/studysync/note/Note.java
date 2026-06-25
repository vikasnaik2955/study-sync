package com.studysync.note;

import com.studysync.common.BaseEntity;
import com.studysync.subject.Subject;
import com.studysync.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 * An uploaded study note (PDF/DOC/PPT). The bytes live in {@link com.studysync.storage.StorageService}
 * under {@code storageKey}; this row is just metadata plus a download counter.
 */
@Entity
@Table(name = "notes")
@Getter
@Setter
public class Note extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "uploader_id", nullable = false)
    private User uploader;

    @Column(name = "storage_key", nullable = false)
    private String storageKey;

    @Column(name = "original_filename", nullable = false)
    private String originalFilename;

    @Column(name = "content_type", nullable = false)
    private String contentType;

    @Column(name = "size_bytes", nullable = false)
    private long sizeBytes;

    @Column(name = "download_count", nullable = false)
    private int downloadCount = 0;
}
