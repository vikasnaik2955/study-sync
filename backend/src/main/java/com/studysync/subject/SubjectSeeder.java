package com.studysync.subject;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * Seeds a starter set of subjects on boot if the table is empty. Replaces the old repeatable Flyway
 * seed script now that Hibernate owns the schema (MySQL). Idempotent: it never runs once subjects
 * exist, so admins can add/rename freely without it stomping their data.
 */
@Component
public class SubjectSeeder implements CommandLineRunner {

    private static final Map<String, String> DEFAULTS = Map.ofEntries(
            Map.entry("Mathematics", "MATH"),
            Map.entry("Physics", "PHY"),
            Map.entry("Chemistry", "CHEM"),
            Map.entry("Biology", "BIO"),
            Map.entry("Computer Science", "CS"),
            Map.entry("Data Structures", "DSA"),
            Map.entry("Operating Systems", "OS"),
            Map.entry("Databases", "DBMS"),
            Map.entry("Economics", "ECON"),
            Map.entry("English Literature", "ENG")
    );

    private final SubjectRepository subjectRepository;

    public SubjectSeeder(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    @Override
    public void run(String... args) {
        if (subjectRepository.count() > 0) {
            return;
        }
        List<Subject> subjects = DEFAULTS.entrySet().stream().map(e -> {
            Subject s = new Subject();
            s.setName(e.getKey());
            s.setCode(e.getValue());
            return s;
        }).toList();
        subjectRepository.saveAll(subjects);
    }
}
