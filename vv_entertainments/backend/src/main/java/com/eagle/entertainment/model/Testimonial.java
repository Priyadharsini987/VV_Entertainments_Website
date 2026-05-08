package com.eagle.entertainment.model;

import jakarta.persistence.*;

@Entity
@Table(name = "testimonials")
public class Testimonial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String clientName;

    private String designation;
    private String company;

    @Column(columnDefinition = "TEXT")
    private String review;

    private int rating = 5;
    private String avatarUrl;
    private boolean active = true;

    public Testimonial() {}

    public Testimonial(Long id, String clientName, String designation, String company,
                       String review, int rating, String avatarUrl, boolean active) {
        this.id = id;
        this.clientName = clientName;
        this.designation = designation;
        this.company = company;
        this.review = review;
        this.rating = rating;
        this.avatarUrl = avatarUrl;
        this.active = active;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getReview() { return review; }
    public void setReview(String review) { this.review = review; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
