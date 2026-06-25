package com.studysync.subject;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SubjectRepository extends JpaRepository<Subject, UUID> {

    List<Subject> findByNameContainingIgnoreCaseOrderByName(String name);

    List<Subject> findAllByOrderByName();

    boolean existsByNameIgnoreCase(String name);
}
