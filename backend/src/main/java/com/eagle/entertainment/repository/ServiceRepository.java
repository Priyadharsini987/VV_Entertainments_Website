package com.eagle.entertainment.repository;

import com.eagle.entertainment.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    List<Service> findByActiveTrueOrderByDisplayOrderAsc();
}
