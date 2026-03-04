package com.KeremAcar.FaliyetTakip.controller;

import com.KeremAcar.FaliyetTakip.Service.NotificationService;
import com.KeremAcar.FaliyetTakip.model.Activity;
import com.KeremAcar.FaliyetTakip.Service.ActivityService;
import com.KeremAcar.FaliyetTakip.Service.UserService;
import com.KeremAcar.FaliyetTakip.model.Notification;
import com.KeremAcar.FaliyetTakip.model.User;
import com.KeremAcar.FaliyetTakip.repository.ActivityRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "http://localhost:4200")
public class ActivityController {

    private final ActivityService activityService;
    private final UserService userService;
    private final ActivityRepository activityRepository;
    private final NotificationService notificationService;


    public ActivityController(ActivityService activityService, UserService userService, ActivityRepository activityRepository, NotificationService notificationService) {
        this.activityService = activityService;
        this.userService = userService;
        this.activityRepository = activityRepository;
        this.notificationService = notificationService;
    }

    // Tüm aktiviteleri listele
    @GetMapping
    public List<Activity> getAll() {
        return activityService.getAllActivities();
    }

    @GetMapping("/active")
    public List<Activity> activityList(){
        return activityRepository.findByActiveTrue();
    }

    // Aktivite oluştur (sadece admin)
    @PostMapping("/create")
    public Activity create(@RequestBody Activity activity, @RequestParam Long adminId) {
        var admin = userService.findById(adminId).orElseThrow(() -> new RuntimeException("Admin bulunamadı"));

        if (!userService.isAdmin(admin)) {
            throw new RuntimeException("Sadece admin aktivite oluşturabilir");
        }

        return activityService.createActivity(activity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Long id) {
        // Kontrol: Aktivite var mı?
        if (!activityRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Varsa, silme işlemini gerçekleştir.
        activityRepository.deleteById(id);

        // İşlem başarılı, ancak geri dönecek içerik yok (204 No Content).
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Aktiviteye kullanıcı ekle (sadece admin)
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/addParticipant/{activityId}/ {userId}")
    public ResponseEntity<?> addParticipant(@PathVariable Long activityId, @PathVariable Long userId) {
        Activity activity = activityService.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Aktivite bulunamadı"));
        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        if (activity.getParticipants().contains(user)) {
            return ResponseEntity
                    .badRequest()
                    .body("Bu kullanıcı zaten bu aktiviteye eklenmiş");
        }

        activity.getParticipants().add(user);
        activityService.save(activity);

        return ResponseEntity.ok(activity);
    }


    @GetMapping("/{id}")
    public Activity getActivity(@PathVariable Long id){
        return activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aktivite bulunamadı"));
    }

    @DeleteMapping("/{activityId}/removeParticipant/{userId}")
    public Activity removeParticipant(@PathVariable Long activityId, @PathVariable Long userId, @RequestParam Long adminId) {
        var admin = userService.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin bulunamadı"));

        if (!userService.isAdmin(admin)) {
            throw new RuntimeException("Sadece admin kullanıcı çıkarabilir!");
        }

        return activityService.removeParticipant(activityId, userId);
    }

    // Katılımcıları listele
    @GetMapping("/{activityId}/participants")
    public List<User> getParticipants(@PathVariable Long activityId, @RequestParam Long adminId) {
        


        return activityService.getParticipants(activityId);
    }

    
    @PostMapping("/{activityId}/invite")
    public ResponseEntity<String> sendInvite(
            @PathVariable Long activityId,
            @RequestParam("userId") Long userId,
            @RequestParam("adminId") Long adminId) {

        // Admin kontrolü
        var admin = userService.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin bulunamadı"));

        if (!userService.isAdmin(admin)) {
            return ResponseEntity.status(403).body("Sadece admin kullanıcı daveti gönderebilir");
        }

        // Kullanıcı kontrolü
        var user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        // Aktivite kontrolü
        var activity = activityService.getActivityById(activityId)
                .orElseThrow(() -> new RuntimeException("Aktivite bulunamadı"));

        // Yeni Notification oluştur
        Notification notification = new Notification();
        notification.setActivity(activity);
        notification.setUser(user);
        notification.setStatus(Notification.Status.PENDING); // Enum: PENDING, ACCEPTED, REJECTED
        notificationService.save(notification);

        return ResponseEntity.ok("Davet gönderildi");
    }



}

