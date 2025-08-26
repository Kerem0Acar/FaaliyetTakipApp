package com.KeremAcar.FaliyetTakip.Service;

import com.KeremAcar.FaliyetTakip.model.User;
import com.KeremAcar.FaliyetTakip.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Kullanıcı kayıt işlemi
    public User register(User user) {
        return userRepository.save(user);
    }

    // Kullanıcı giriş işlemi
    public Optional<User> login(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(u -> u.getPassword().equals(password));
    }

    // Kullanıcıyı ID’ye göre getir
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    // Kullanıcıyı username’e göre getir
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Admin kontrolü
    public boolean isAdmin(User user) {
        return user != null && "ADMIN".equalsIgnoreCase(user.getRole());
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}
