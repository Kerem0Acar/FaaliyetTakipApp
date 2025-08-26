package com.KeremAcar.FaliyetTakip.repository;

import com.KeremAcar.FaliyetTakip.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
