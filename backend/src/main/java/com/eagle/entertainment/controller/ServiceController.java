package com.eagle.entertainment.controller;

import com.eagle.entertainment.model.Service;
import com.eagle.entertainment.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @GetMapping
    public List<Service> getAllActive() {
        return serviceRepository.findByActiveTrueOrderByDisplayOrderAsc();
    }

    @GetMapping("/all")
    public List<Service> getAll() {
        return serviceRepository.findAll();
    }

    @PostMapping
    public Service create(@RequestBody Service service) {
        return serviceRepository.save(service);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Service> update(@PathVariable Long id, @RequestBody Service updated) {
        return serviceRepository.findById(id).map(s -> {
            s.setTitle(updated.getTitle());
            s.setDescription(updated.getDescription());
            s.setIcon(updated.getIcon());
            s.setImageUrl(updated.getImageUrl());
            s.setActive(updated.isActive());
            s.setDisplayOrder(updated.getDisplayOrder());
            return ResponseEntity.ok(serviceRepository.save(s));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (serviceRepository.existsById(id)) {
            serviceRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
