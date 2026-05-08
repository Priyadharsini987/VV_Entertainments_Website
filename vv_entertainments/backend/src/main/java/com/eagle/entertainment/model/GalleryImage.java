package com.eagle.entertainment.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "gallery_images")
public class GalleryImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;

    private String title;
    private String category;
    private String description;
    private LocalDateTime uploadedAt = LocalDateTime.now();
    private boolean active = true;

    public GalleryImage() {}

    public GalleryImage(Long id, String imageUrl, String title, String category,
                        String description, LocalDateTime uploadedAt, boolean active) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.title = title;
        this.category = category;
        this.description = description;
        this.uploadedAt = uploadedAt;
        this.active = active;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
