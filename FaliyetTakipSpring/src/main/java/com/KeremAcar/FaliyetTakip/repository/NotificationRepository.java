package com.KeremAcar.FaliyetTakip.repository;

import com.KeremAcar.FaliyetTakip.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserIdAndStatus(Long userId, Notification.Status status);
    List<Notification> findByUserId(Long userId);
}

