package com.KeremAcar.FaliyetTakip.repository;

import com.KeremAcar.FaliyetTakip.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByActiveTrue(); //True veya False olarak isimlendirmezsen düzgün çalışmaz.
}
