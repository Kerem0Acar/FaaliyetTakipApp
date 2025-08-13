package com.KeremAcar.FaliyetTakip.controller;

import com.KeremAcar.FaliyetTakip.model.Activity;
import com.KeremAcar.FaliyetTakip.model.User;
import com.KeremAcar.FaliyetTakip.repository.ActivityRepository;
import com.KeremAcar.FaliyetTakip.repository.CategoryRepository;
import com.KeremAcar.FaliyetTakip.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "*")
public class ActivityController {

    @Autowired
    private ActivityRepository activityRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping
    public Activity create(@RequestBody Activity activity){
        if(activity.getCategory() != null && activity.getCategory().getId() != null){
            categoryRepository.findById(activity.getCategory().getId()).ifPresent(activity::setCategory);
        }
        return activityRepository.save(activity);
    }

    @GetMapping("/active")
    public List<Activity> activityList(){
        return activityRepository.findByActiveTrue();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Activity> get(@PathVariable Long id){
        return activityRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/addParticipant/{userId}")
    public ResponseEntity<?> addParticipant(@PathVariable Long id, @PathVariable Long userId){
        Optional<Activity> actOpt = activityRepository.findById(id);
        Optional<User> userOpt = userRepository.findById(userId);
        if(actOpt.isEmpty()||userOpt.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        Activity activity = actOpt.get();
        activity.getParticipants().add(userOpt.get());
        return ResponseEntity.ok(activity);
    }

    @PostMapping("/{id}/removeParticipant/{userId}")
    public ResponseEntity<?> removeParticipants(@PathVariable Long id, @PathVariable Long userId){
        Optional<Activity> activityOptional = activityRepository.findById(id);
        Optional<User> userOptional = userRepository.findById(userId);
        if(activityOptional.isEmpty() || userOptional.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        Activity activity = activityOptional.get();
        activity.getParticipants().remove(userOptional.get());
        activityRepository.save(activity);
        return ResponseEntity.ok(activity);
    }
}
