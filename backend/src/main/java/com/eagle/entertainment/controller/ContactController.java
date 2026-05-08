package com.eagle.entertainment.controller;

import com.eagle.entertainment.model.ContactMessage;
import com.eagle.entertainment.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @PostMapping
    public ResponseEntity<?> submit(@RequestBody ContactMessage message) {
        message.setSubmittedAt(LocalDateTime.now());
        message.setRead(false);
        ContactMessage saved = contactMessageRepository.save(message);
        return ResponseEntity.ok(Map.of("message", "Your message has been sent successfully!", "id", saved.getId()));
    }

    @GetMapping
    public List<ContactMessage> getAll() {
        return contactMessageRepository.findAllByOrderBySubmittedAtDesc();
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markRead(@PathVariable Long id) {
        return contactMessageRepository.findById(id).map(msg -> {
            msg.setRead(true);
            return ResponseEntity.ok(contactMessageRepository.save(msg));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (contactMessageRepository.existsById(id)) {
            contactMessageRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/unread-count")
    public Map<String, Long> unreadCount() {
        return Map.of("count", contactMessageRepository.countByReadFalse());
    }
}
