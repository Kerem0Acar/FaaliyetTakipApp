package com.KeremAcar.FaliyetTakip.controller;

import com.KeremAcar.FaliyetTakip.Service.ActivityService;
import com.KeremAcar.FaliyetTakip.Service.UserService;
import com.KeremAcar.FaliyetTakip.model.Notification;
import com.KeremAcar.FaliyetTakip.repository.NotificationRepository;
import org.apache.tomcat.util.modeler.NotificationInfo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:4200")
public class NotificationController {
    private final NotificationRepository notificationRepository;
    private final UserService userService;
    private final ActivityService activityService;

    public NotificationController(NotificationRepository notificationRepository,
                                  UserService userService,
                                  ActivityService activityService) {
        this.notificationRepository = notificationRepository;
        this.userService = userService;
        this.activityService = activityService;
    }

    @PostMapping("/send")
    public Notification sendNotification(@RequestParam Long adminId,
                                         @RequestParam Long userId,
                                         @RequestParam Long activityId,
                                         @RequestBody String message) {

        var admin = userService.findById(adminId).orElseThrow();
        if (!userService.isAdmin(admin)) throw new RuntimeException("Sadece admin istekte bulunabilir");

        var user = userService.findById(userId).orElseThrow();
        var activity = activityService.findById(activityId).orElseThrow();

        Notification n = new Notification();
        n.setUser(user);
        n.setActivity(activity);
        n.setMessage(message);
        n.setStatus(Notification.Status.PENDING);

        return notificationRepository.save(n);
    }

    @GetMapping("/{userId}")
    public List<Notification> getUserNotifications(@PathVariable Long userId) {
        return notificationRepository.findByUserIdAndStatus(userId, Notification.Status.PENDING);
    }

    @PostMapping("/{notificationId}/respond")
    public Notification respondNotification(@PathVariable Long notificationId,
                                            @RequestParam boolean accept) {
        Notification n = notificationRepository.findById(notificationId).orElseThrow();

        n.setStatus(accept ? Notification.Status.ACCEPTED : Notification.Status.REJECTED);

        if (accept) {
            // Kullanıcıyı aktiviteye ekle
            activityService.addParticipant(n.getActivity().getId(), n.getUser().getId());
        }

        return notificationRepository.save(n);
    }
}
