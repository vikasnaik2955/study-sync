package com.studysync.qa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface QuestionRepository extends JpaRepository<Question, UUID> {

    @Query("""
            select q from Question q
            where (:subjectId is null or q.subject.id = :subjectId)
              and (:term is null
                   or lower(q.title) like lower(concat('%', :term, '%'))
                   or lower(q.body)  like lower(concat('%', :term, '%')))
            """)
    Page<Question> search(@Param("subjectId") UUID subjectId, @Param("term") String term, Pageable pageable);

    @Modifying
    @Query("update Question q set q.viewCount = q.viewCount + 1 where q.id = :id")
    void incrementViewCount(@Param("id") UUID id);
}
