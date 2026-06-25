package com.studysync.subject;

import com.studysync.common.exception.ConflictException;
import com.studysync.common.exception.NotFoundException;
import com.studysync.subject.dto.SubjectRequest;
import com.studysync.subject.dto.SubjectResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.UUID;

@Service
public class SubjectService {

    private final SubjectRepository repository;

    public SubjectService(SubjectRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<SubjectResponse> list(String q) {
        List<Subject> subjects = StringUtils.hasText(q)
                ? repository.findByNameContainingIgnoreCaseOrderByName(q)
                : repository.findAllByOrderByName();
        return subjects.stream().map(SubjectResponse::from).toList();
    }

    @Transactional
    public SubjectResponse create(SubjectRequest req) {
        if (repository.existsByNameIgnoreCase(req.name())) {
            throw new ConflictException("A subject with this name already exists.");
        }
        Subject subject = new Subject();
        subject.setName(req.name());
        subject.setCode(req.code());
        return SubjectResponse.from(repository.save(subject));
    }

    @Transactional
    public SubjectResponse update(UUID id, SubjectRequest req) {
        Subject subject = getEntity(id);
        subject.setName(req.name());
        subject.setCode(req.code());
        return SubjectResponse.from(subject);
    }

    @Transactional
    public void delete(UUID id) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Subject", id);
        }
        repository.deleteById(id);
    }

    /** Used by other modules (notes/groups/qa/rooms) to resolve a subject reference. */
    @Transactional(readOnly = true)
    public Subject getEntity(UUID id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Subject", id));
    }
}
