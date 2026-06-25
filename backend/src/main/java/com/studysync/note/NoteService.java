package com.studysync.note;

import com.studysync.common.PageResponse;
import com.studysync.common.exception.ForbiddenException;
import com.studysync.common.exception.NotFoundException;
import com.studysync.common.exception.ValidationException;
import com.studysync.config.UploadProperties;
import com.studysync.note.dto.NoteResponse;
import com.studysync.security.AppPrincipal;
import com.studysync.storage.StorageContext;
import com.studysync.storage.StorageService;
import com.studysync.storage.StoredObject;
import com.studysync.subject.Subject;
import com.studysync.subject.SubjectService;
import com.studysync.user.Role;
import com.studysync.user.User;
import com.studysync.user.UserService;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

/**
 * Notes use-cases: validated upload, paginated search, streamed download (with counter bump),
 * and owner/admin delete. File type + size are enforced here before a byte is written to storage.
 */
@Service
public class NoteService {

    private final NoteRepository noteRepository;
    private final StorageService storageService;
    private final SubjectService subjectService;
    private final UserService userService;
    private final UploadProperties uploadProperties;

    public NoteService(NoteRepository noteRepository, StorageService storageService,
                       SubjectService subjectService, UserService userService,
                       UploadProperties uploadProperties) {
        this.noteRepository = noteRepository;
        this.storageService = storageService;
        this.subjectService = subjectService;
        this.userService = userService;
        this.uploadProperties = uploadProperties;
    }

    @Transactional(readOnly = true)
    public PageResponse<NoteResponse> search(UUID subjectId, String q, Pageable pageable) {
        String query = StringUtils.hasText(q) ? q.trim() : null;
        Page<Note> page = noteRepository.search(subjectId, query, pageable);
        return PageResponse.from(page, NoteResponse::from);
    }

    @Transactional(readOnly = true)
    public NoteResponse get(UUID id) {
        return NoteResponse.from(load(id));
    }

    @Transactional
    public NoteResponse upload(AppPrincipal principal, String title, UUID subjectId, MultipartFile file) {
        validateFile(file);
        Subject subject = subjectService.getEntity(subjectId);
        User uploader = userService.getEntity(principal.id());

        StoredObject stored = storageService.store(file, StorageContext.of("notes"));

        Note note = new Note();
        note.setTitle(StringUtils.hasText(title) ? title.trim() : originalName(file));
        note.setSubject(subject);
        note.setUploader(uploader);
        note.setStorageKey(stored.storageKey());
        note.setOriginalFilename(originalName(file));
        note.setContentType(file.getContentType());
        note.setSizeBytes(file.getSize());
        return NoteResponse.from(noteRepository.save(note));
    }

    /** Returns the streamable resource and the note (for headers); bumps the download counter. */
    @Transactional
    public Download download(UUID id) {
        Note note = load(id);
        Resource resource = storageService.loadAsResource(note.getStorageKey());
        noteRepository.incrementDownloadCount(id);
        return new Download(resource, note.getOriginalFilename(), note.getContentType());
    }

    @Transactional
    public void delete(AppPrincipal principal, UUID id) {
        Note note = load(id);
        boolean isOwner = note.getUploader().getId().equals(principal.id());
        boolean isAdmin = principal.role() == Role.ADMIN;
        if (!isOwner && !isAdmin) {
            throw new ForbiddenException("Only the uploader or an admin can delete this note.");
        }
        storageService.delete(note.getStorageKey());
        noteRepository.delete(note);
    }

    /** Used by groups/rooms to share an existing note. */
    @Transactional(readOnly = true)
    public Note getEntity(UUID id) {
        return load(id);
    }

    public record Download(Resource resource, String filename, String contentType) {}

    private Note load(UUID id) {
        return noteRepository.findById(id).orElseThrow(() -> new NotFoundException("Note", id));
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ValidationException("No file provided.");
        }
        if (file.getSize() > uploadProperties.maxSizeBytes()) {
            throw new ValidationException("File exceeds the maximum allowed size.");
        }
        String contentType = file.getContentType();
        if (contentType == null || !uploadProperties.allowedContentTypes().contains(contentType)) {
            throw new ValidationException("File type not allowed. Allowed: PDF, DOC/DOCX, PPT/PPTX.");
        }
    }

    private String originalName(MultipartFile file) {
        String name = file.getOriginalFilename();
        return StringUtils.hasText(name) ? name : "note";
    }
}
