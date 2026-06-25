package com.studysync.storage;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.HandlerMapping;
import jakarta.servlet.http.HttpServletRequest;

/**
 * Authenticated streaming of stored objects (chat attachments, avatars) by their storage key.
 * Note downloads use their own endpoint so they can increment the download counter. Keys are
 * random UUIDs and every request requires a valid token, so this is safe for v1; cloud providers
 * would instead hand out short-lived signed URLs and bypass this controller.
 */
@RestController
@RequestMapping("/api/v1/files")
public class FileController {

    private final StorageService storageService;

    public FileController(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/**")
    public ResponseEntity<Resource> stream(HttpServletRequest request) {
        // Everything after "/api/v1/files/" is the storage key (it contains slashes).
        String path = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
        String storageKey = path.substring("/api/v1/files/".length());

        Resource resource = storageService.loadAsResource(storageKey);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
                .body(resource);
    }
}
