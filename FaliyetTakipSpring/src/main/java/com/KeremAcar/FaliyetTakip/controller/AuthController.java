package com.KeremAcar.FaliyetTakip.controller;

import com.KeremAcar.FaliyetTakip.Service.ActivityService;
import com.KeremAcar.FaliyetTakip.Service.UserService;
import com.KeremAcar.FaliyetTakip.model.Activity;
import com.KeremAcar.FaliyetTakip.model.User;
import com.KeremAcar.FaliyetTakip.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // Kayıt
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User savedUser = userService.register(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Kayıt sırasında hata: " + e.getMessage());
        }
    }


    // Giriş
    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {
        Optional<User> user = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
        return user.orElseThrow(() -> new RuntimeException("Geçersiz kullanıcı adı veya şifre"));
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }


}
