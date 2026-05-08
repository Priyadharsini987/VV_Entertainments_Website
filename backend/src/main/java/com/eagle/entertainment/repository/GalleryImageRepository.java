package com.eagle.entertainment.repository;

import com.eagle.entertainment.model.GalleryImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GalleryImageRepository extends JpaRepository<GalleryImage, Long> {
    List<GalleryImage> findByActiveTrueOrderByUploadedAtDesc();
    List<GalleryImage> findByCategoryAndActiveTrue(String category);
}
