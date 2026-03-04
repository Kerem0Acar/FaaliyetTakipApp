package com.KeremAcar.FaliyetTakip.Service;

import com.KeremAcar.FaliyetTakip.model.Activity;
import com.KeremAcar.FaliyetTakip.model.User;
import com.KeremAcar.FaliyetTakip.repository.ActivityRepository;
import com.KeremAcar.FaliyetTakip.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;

    public ActivityService(ActivityRepository activityRepository, UserRepository userRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
    }

    // Tüm aktiviteleri getir
    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    // ID’ye göre aktivite getir
    public Optional<Activity> getActivityById(Long id) {
        return activityRepository.findById(id);
    }

    // Aktivite ekle (sadece admin çağıracak)
    public Activity createActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    // Aktiviteye kullanıcı ekle (sadece admin yetkili olacak)
    public Activity addParticipant(Long activityId, Long userId) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Aktivite bulunamadı"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        if (!activity.getParticipants().contains(user)) {
            activity.getParticipants().add(user);
            activityRepository.save(activity);
        }

        return activity;
    }

    public Optional<Activity> findById(Long id) {
        return activityRepository.findById(id);
    }
    public Activity save(Activity activity) {
        return activityRepository.save(activity);
    }

    public Activity removeParticipant(Long activityId, Long userId) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Aktivite bulunamadı"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        if (!activity.getParticipants().contains(user)) {
            throw new RuntimeException("Kullanıcı bu aktivitede değil!");
        }

        activity.getParticipants().remove(user);
        return activityRepository.save(activity);
    }

    // Katılımcıları listele
    public List<User> getParticipants(Long activityId) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Aktivite bulunamadı"));

        return activity.getParticipants();
    }

}
