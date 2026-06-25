package com.studysync.storage;

import com.studysync.common.exception.NotFoundException;
import com.studysync.common.exception.ValidationException;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.util.HexFormat;
import java.util.UUID;

/**
 * Local-filesystem storage for dev. Files are written under {@code storage.local.dir} in a
 * per-category subfolder with a random key (original name never used on disk, defeating path
 * traversal). {@link #url} returns the authenticated streaming endpoint; the bytes are never
 * served from a public folder.
 *
 * <p>Active when {@code storage.provider=local} (the default).
 */
@Service
@ConditionalOnProperty(name = "storage.provider", havingValue = "local", matchIfMissing = true)
public class LocalStorageService implements StorageService {

    private final Path root;

    public LocalStorageService(StorageProperties props) {
        this.root = Paths.get(props.local().dir()).toAbsolutePath().normalize();
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new IllegalStateException("Could not create storage dir: " + root, e);
        }
    }

    @Override
    public StoredObject store(MultipartFile file, StorageContext ctx) {
        if (file == null || file.isEmpty()) {
            throw new ValidationException("File is empty.");
        }
        String category = sanitizeCategory(ctx.category());
        String ext = extensionOf(file.getOriginalFilename());
        String key = category + "/" + UUID.randomUUID() + ext;

        Path target = resolveKey(key);
        try {
            Files.createDirectories(target.getParent());
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            try (InputStream in = file.getInputStream();
                 DigestInputStream dis = new DigestInputStream(in, digest)) {
                Files.copy(dis, target);
            }
            String checksum = HexFormat.of().formatHex(digest.digest());
            return new StoredObject(key, url(key, null), file.getSize(), file.getContentType(), checksum);
        } catch (NoSuchAlgorithmException | IOException e) {
            throw new IllegalStateException("Failed to store file for key " + key, e);
        }
    }

    @Override
    public Resource loadAsResource(String storageKey) {
        Path file = resolveKey(storageKey);
        if (!Files.exists(file)) {
            throw new NotFoundException("File", storageKey);
        }
        try {
            return new UrlResource(file.toUri());
        } catch (MalformedURLException e) {
            throw new NotFoundException("File", storageKey);
        }
    }

    @Override
    public String url(String storageKey, Duration ttl) {
        // Local files are streamed through an authenticated controller, not served directly.
        return "/api/v1/files/" + storageKey;
    }

    @Override
    public void delete(String storageKey) {
        try {
            Files.deleteIfExists(resolveKey(storageKey));
        } catch (IOException e) {
            // idempotent best-effort; surface nothing
        }
    }

    /** Resolve a key under root and refuse anything that escapes it. */
    private Path resolveKey(String storageKey) {
        Path resolved = root.resolve(storageKey).normalize();
        if (!resolved.startsWith(root)) {
            throw new ValidationException("Invalid storage key.");
        }
        return resolved;
    }

    private String sanitizeCategory(String category) {
        String cleaned = StringUtils.hasText(category) ? category.replaceAll("[^a-zA-Z0-9_-]", "") : "misc";
        return cleaned.isBlank() ? "misc" : cleaned;
    }

    private String extensionOf(String filename) {
        String ext = StringUtils.getFilenameExtension(filename);
        return (ext != null && !ext.isBlank()) ? "." + ext.toLowerCase() : "";
    }
}
