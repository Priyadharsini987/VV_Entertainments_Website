package com.eagle.entertainment.controller;

import com.eagle.entertainment.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    private static final String ADMIN_USERNAME = "vv_entertainments";
    private static final String ADMIN_PASSWORD = "vv_entertainments@1718";

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        if (username == null || password == null) {
            Map<String, Object> err = new HashMap<>();
            err.put("message", "Username and password are required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
        }

        if (ADMIN_USERNAME.equals(username.trim()) && ADMIN_PASSWORD.equals(password.trim())) {
            String token = jwtUtil.generateToken(username.trim());
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("username", username.trim());
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        }

        Map<String, Object> err = new HashMap<>();
        err.put("message", "Invalid credentials");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(err);
    }

    @GetMapping("/verify")
    public ResponseEntity<Map<String, Object>> verify(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        Map<String, Object> response = new HashMap<>();

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtUtil.validateToken(token)) {
                response.put("valid", true);
                response.put("username", jwtUtil.extractUsername(token));
                return ResponseEntity.ok(response);
            }
        }
        response.put("valid", false);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}
