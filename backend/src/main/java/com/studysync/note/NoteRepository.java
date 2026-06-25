package com.studysync.note;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface NoteRepository extends JpaRepository<Note, UUID> {

    /**
     * Paginated search: both filters are optional. Kept portable (ILIKE-style via lower()/like)
     * rather than Postgres full-text so the JPQL runs unchanged on any database.
     */
    @Query("""
            select n from Note n
            where (:subjectId is null or n.subject.id = :subjectId)
              and (:q is null or lower(n.title) like lower(concat('%', :q, '%')))
            """)
    Page<Note> search(@Param("subjectId") UUID subjectId, @Param("q") String q, Pageable pageable);

    /** Atomic counter bump — avoids a read-modify-write race on popular notes. */
    @Modifying
    @Query("update Note n set n.downloadCount = n.downloadCount + 1 where n.id = :id")
    void incrementDownloadCount(@Param("id") UUID id);
}
