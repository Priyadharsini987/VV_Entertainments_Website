package com.eagle.entertainment.controller;

import com.eagle.entertainment.model.Testimonial;
import com.eagle.entertainment.repository.TestimonialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {

    @Autowired
    private TestimonialRepository testimonialRepository;

    @GetMapping
    public List<Testimonial> getActive() {
        return testimonialRepository.findByActiveTrueOrderByIdDesc();
    }

    @GetMapping("/all")
    public List<Testimonial> getAll() {
        return testimonialRepository.findAll();
    }

    @PostMapping
    public Testimonial create(@RequestBody Testimonial testimonial) {
        return testimonialRepository.save(testimonial);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Testimonial> update(@PathVariable Long id, @RequestBody Testimonial updated) {
        return testimonialRepository.findById(id).map(t -> {
            t.setClientName(updated.getClientName());
            t.setDesignation(updated.getDesignation());
            t.setCompany(updated.getCompany());
            t.setReview(updated.getReview());
            t.setRating(updated.getRating());
            t.setActive(updated.isActive());
            return ResponseEntity.ok(testimonialRepository.save(t));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (testimonialRepository.existsById(id)) {
            testimonialRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
