package com.studysync.note;

import com.studysync.common.PageResponse;
import com.studysync.note.dto.NoteResponse;
import com.studysync.security.AppPrincipal;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

/** Notes: upload, browse/search, stream-download (counter++), and owner/admin delete. */
@RestController
@RequestMapping("/api/v1/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public PageResponse<NoteResponse> list(@RequestParam(required = false) UUID subjectId,
                                           @RequestParam(required = false) String q,
                                           @PageableDefault(size = 20, sort = "createdAt",
                                                   direction = Sort.Direction.DESC) Pageable pageable) {
        return noteService.search(subjectId, q, pageable);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<NoteResponse> upload(@AuthenticationPrincipal AppPrincipal principal,
                                               @RequestParam String title,
                                               @RequestParam UUID subjectId,
                                               @RequestParam("file") MultipartFile file) {
        NoteResponse created = noteService.upload(principal, title, subjectId, file);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public NoteResponse get(@PathVariable UUID id) {
        return noteService.get(id);
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> download(@PathVariable UUID id) {
        NoteService.Download dl = noteService.download(id);
        String filename = dl.filename().replace("\"", "");
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(
                        dl.contentType() != null ? dl.contentType() : MediaType.APPLICATION_OCTET_STREAM_VALUE))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .body(dl.resource());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@AuthenticationPrincipal AppPrincipal principal, @PathVariable UUID id) {
        noteService.delete(principal, id);
        return ResponseEntity.noContent().build();
    }
}
