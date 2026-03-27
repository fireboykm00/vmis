package com.vmis.config;

import com.vmis.model.User;
import com.vmis.model.enums.UserRole;
import com.vmis.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.logging.Logger;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = Logger.getLogger(DataInitializer.class.getName());
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User(
                "admin",
                "admin@vmis.com",
                "admin123",
                "System Administrator",
                Set.of(UserRole.ROLE_ADMIN)
            );
            admin.encodePassword(passwordEncoder);
            userRepository.save(admin);
            log.info("Admin user created: admin / admin123");
        }

        if (!userRepository.existsByUsername("nurse")) {
            User nurse = new User(
                "nurse",
                "nurse@vmis.com",
                "nurse123",
                "Staff Nurse",
                Set.of(UserRole.ROLE_NURSE)
            );
            nurse.encodePassword(passwordEncoder);
            userRepository.save(nurse);
            log.info("Nurse user created: nurse / nurse123");
        }
    }
}