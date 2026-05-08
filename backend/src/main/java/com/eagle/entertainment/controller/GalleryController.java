package com.eagle.entertainment.controller;

import com.eagle.entertainment.model.GalleryImage;
import com.eagle.entertainment.repository.GalleryImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    @Autowired
    private GalleryImageRepository galleryImageRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // FIX: inject the backend's public base URL so image URLs are absolute.
    // Set app.base-url in application.properties (local) and as an environment
    // variable on Render (production).
    @Value("${app.base-url}")
    private String baseUrl;

    @GetMapping
    public List<GalleryImage> getAll() {
        return galleryImageRepository.findByActiveTrueOrderByUploadedAtDesc();
    }

    @GetMapping("/all")
    public List<GalleryImage> getAllAdmin() {
        return galleryImageRepository.findAll();
    }

    @GetMapping("/category/{category}")
    public List<GalleryImage> getByCategory(@PathVariable String category) {
        return galleryImageRepository.findByCategoryAndActiveTrue(category);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "description", required = false) String description) {

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".")
                    ? originalFilename.substring(originalFilename.lastIndexOf("."))
                    : ".jpg";
            String filename = UUID.randomUUID() + extension;

            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            GalleryImage image = new GalleryImage();
            // FIX: store an absolute URL so the browser can load images correctly
            // when the frontend is on a different domain (Vercel) from the backend (Render).
            image.setImageUrl(baseUrl + "/uploads/" + filename);
            image.setTitle(title);
            image.setCategory(category);
            image.setDescription(description);
            image.setUploadedAt(LocalDateTime.now());
            image.setActive(true);

            return ResponseEntity.ok(galleryImageRepository.save(image));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload image: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<GalleryImage> update(@PathVariable Long id, @RequestBody GalleryImage updated) {
        return galleryImageRepository.findById(id).map(img -> {
            img.setTitle(updated.getTitle());
            img.setCategory(updated.getCategory());
            img.setDescription(updated.getDescription());
            img.setActive(updated.isActive());
            return ResponseEntity.ok(galleryImageRepository.save(img));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return galleryImageRepository.findById(id).map(img -> {
            try {
                String url = img.getImageUrl();
                if (url != null && url.contains("/uploads/")) {
                    String filename = url.substring(url.lastIndexOf("/uploads/") + "/uploads/".length());
                    Path file = Paths.get(uploadDir).resolve(filename);
                    Files.deleteIfExists(file);
                }
            } catch (IOException ignored) {}
            galleryImageRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}