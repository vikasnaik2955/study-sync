package com.studysync.group;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface StudyGroupRepository extends JpaRepository<StudyGroup, UUID> {

    @Query("""
            select g from StudyGroup g
            where (:subjectId is null or g.subject.id = :subjectId)
              and (:q is null or lower(g.name) like lower(concat('%', :q, '%')))
            """)
    Page<StudyGroup> search(@Param("subjectId") UUID subjectId, @Param("q") String q, Pageable pageable);
}
