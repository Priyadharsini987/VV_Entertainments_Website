package com.eagle.entertainment.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contact_messages")
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String phone;
    private String eventType;
    private String eventDate;

    @Column(columnDefinition = "TEXT")
    private String message;

    private LocalDateTime submittedAt = LocalDateTime.now();
    private boolean read = false;

    public ContactMessage() {}

    public ContactMessage(Long id, String name, String email, String phone,
                          String eventType, String eventDate, String message,
                          LocalDateTime submittedAt, boolean read) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.eventType = eventType;
        this.eventDate = eventDate;
        this.message = message;
        this.submittedAt = submittedAt;
        this.read = read;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }

    public String getEventDate() { return eventDate; }
    public void setEventDate(String eventDate) { this.eventDate = eventDate; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }

    public boolean isRead() { return read; }
    public void setRead(boolean read) { this.read = read; }
}
