package com.KeremAcar.FaliyetTakip.Service;

import com.KeremAcar.FaliyetTakip.model.Activity;
import com.KeremAcar.FaliyetTakip.model.Notification;
import com.KeremAcar.FaliyetTakip.model.User;
import com.KeremAcar.FaliyetTakip.repository.NotificationRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final ActivityService activityService;
    private final UserService userService;

    public NotificationService(NotificationRepository notificationRepository,
                               ActivityService activityService,
                               UserService userService) {
        this.notificationRepository = notificationRepository;
        this.activityService = activityService;
        this.userService = userService;
    }

    public List<Notification> getNotificationsForUser(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    public Notification sendInvite(Long activityId, Long userId, Long adminId) {
        User admin = userService.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin bulunamadı"));
        if (!userService.isAdmin(admin)) throw new RuntimeException("Sadece admin davet gönderebilir");

        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        Activity activity = activityService.getActivityById(activityId)
                .orElseThrow(() -> new RuntimeException("Aktivite bulunamadı"));

        Notification notification = new Notification();
        notification.setActivity(activity);
        notification.setUser(user);
        notification.setStatus(Notification.Status.PENDING);
        notification.setMessage(activity.getTitle() + " etkinliğine davet edildiniz.");

        return notificationRepository.save(notification);
    }

    public Notification respondNotification(Long notificationId, boolean accept) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Bildirim bulunamadı"));

        if (accept) {
            notification.setStatus(Notification.Status.ACCEPTED);
            Activity activity = notification.getActivity();
            activity.getParticipants().add(notification.getUser());
        } else {
            notification.setStatus(Notification.Status.REJECTED);
        }

        return notificationRepository.save(notification);
    }

    public Notification save(Notification notification) {
        return notificationRepository.save(notification);
    }

}
