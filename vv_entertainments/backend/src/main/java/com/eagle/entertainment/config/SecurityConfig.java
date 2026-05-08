package com.eagle.entertainment.config;

import com.eagle.entertainment.security.JwtAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public auth endpoints
                .requestMatchers("/api/auth/**").permitAll()
                // Public GET endpoints
                .requestMatchers(HttpMethod.GET, "/api/services").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/services/").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/gallery").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/gallery/").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/gallery/category/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/testimonials").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/testimonials/").permitAll()
                // Public POST for contact form
                .requestMatchers(HttpMethod.POST, "/api/contact").permitAll()
                // Serve uploaded files
                .requestMatchers("/uploads/**").permitAll()
                // H2 console
                .requestMatchers("/h2-console/**").permitAll()
                // Everything else needs auth
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .headers(headers -> headers.frameOptions(frame -> frame.disable()));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // FIX: list every origin that will call this backend.
        // - Add your exact Vercel production URL.
        // - Vercel also generates preview URLs (e.g. vv-entertainments-git-main-xxx.vercel.app)
        //   for each deployment. Use setAllowedOriginPatterns instead of setAllowedOrigins
        //   to cover those with a wildcard, while still supporting credentials.
        config.setAllowedOriginPatterns(Arrays.asList(
            "http://localhost:3000",
            "http://localhost:5173",
            "http://127.0.0.1:3000",
            "http://127.0.0.1:5173",
            // Your Vercel production domain — confirm this matches exactly in your Vercel dashboard
            "https://vv-entertainments.vercel.app",
            // Covers all Vercel preview/branch deployment URLs for this project
            "https://vv-entertainments-*.vercel.app"
        ));

        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}