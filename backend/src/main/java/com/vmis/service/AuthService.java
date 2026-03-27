package com.vmis.service;

import com.vmis.dto.auth.LoginRequest;
import com.vmis.dto.auth.RegisterRequest;
import com.vmis.dto.response.JwtResponse;
import com.vmis.exception.BadRequestException;
import com.vmis.model.User;
import com.vmis.model.enums.UserRole;
import com.vmis.repository.UserRepository;
import com.vmis.security.JwtUtils;
import com.vmis.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public JwtResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Username is already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already in use");
        }

        Set<UserRole> roles = new HashSet<>();
        roles.add(UserRole.ROLE_NURSE);

        User user = new User(
                request.getUsername(),
                request.getEmail(),
                request.getPassword(),
                request.getFullName(),
                roles
        );
        user.encodePassword(passwordEncoder);
        userRepository.save(user);

        return authenticateUser(new LoginRequest(request.getUsername(), request.getPassword()));
    }

    public JwtResponse login(LoginRequest request) {
        return authenticateUser(request);
    }

    private JwtResponse authenticateUser(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Set<String> roles = userDetails.getAuthorities().stream()
                .map(auth -> auth.getAuthority())
                .collect(java.util.stream.Collectors.toSet());

        return new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getFullName(),
                roles
        );
    }

    public User getCurrentUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userRepository.findById(userDetails.getId()).orElseThrow();
    }
}