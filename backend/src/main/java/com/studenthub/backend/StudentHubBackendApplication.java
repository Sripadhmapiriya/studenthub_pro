package com.studenthub.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StudentHubBackendApplication {

    public static void main(String[] args) {
        System.out.println("=== STARTING SPRING BOOT APPLICATION ===");
        SpringApplication app = new SpringApplication(StudentHubBackendApplication.class);
        app.run(args);
        System.out.println("=== SPRING BOOT APPLICATION STARTED AND RUNNING ===");
    }

}