package com.KeremAcar.FaliyetTakip.controller;

import com.KeremAcar.FaliyetTakip.model.User;
import com.KeremAcar.FaliyetTakip.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user){
        if(userRepository.findByUsername(user.getUsername()).isPresent()){
            return  ResponseEntity.badRequest().body("User already created");
        }
        userRepository.save(user);
        return ResponseEntity.ok("Registered successfully");
    }

    public ResponseEntity<?> login(@RequestBody User user){
        return userRepository.findByUsername(user.getUsername()).map(u -> {
            if (u.getPassword().equals(user.getPassword())){
                return ResponseEntity.ok(u);
            }else {
                return ResponseEntity.status(401).body("Wrong Password");
            }
        }).orElseGet(() -> ResponseEntity.status(404).body("There no user"));
    }
}
