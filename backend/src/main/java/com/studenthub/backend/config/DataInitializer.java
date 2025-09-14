package com.studenthub.backend.config;

import com.studenthub.backend.model.User;
import com.studenthub.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {
    
    @Autowired
    private UserService userService;
    
    @EventListener(ApplicationReadyEvent.class)
    public void initializeData() {
        System.out.println("=== DataInitializer START ===");
        System.out.println("Initializing default users...");
        
        try {
            // Create default admin user if it doesn't exist
            try {
                userService.getUserByUsername("admin");
                System.out.println("Admin user already exists");
            } catch (RuntimeException e) {
                // User doesn't exist, create default admin
                try {
                    User admin = userService.createUser(
                        "admin",
                        "admin@studenthub.com",
                        "admin123",
                        "Admin",
                        "User"
                    );
                    System.out.println("Default admin user created:");
                    System.out.println("Username: admin");
                    System.out.println("Password: admin123");
                    System.out.println("Email: admin@studenthub.com");
                } catch (Exception ex) {
                    System.err.println("Failed to create admin user: " + ex.getMessage());
                }
            }
        
            // Create additional sample users for testing
            try {
                userService.getUserByUsername("sharika");
                System.out.println("Sharika user already exists");
            } catch (RuntimeException e) {
                try {
                    User sharika = userService.createUser(
                        "sharika",
                        "sharika@studenthub.com",
                        "sharika123",
                        "Sharika",
                        "User"
                    );
                    System.out.println("Sample user created:");
                    System.out.println("Username: sharika");
                    System.out.println("Password: sharika123");
                    System.out.println("Email: sharika@studenthub.com");
                } catch (Exception ex) {
                    System.err.println("Failed to create sharika user: " + ex.getMessage());
                }
            }
            
            try {
                userService.getUserByUsername("teacher1");
                System.out.println("Teacher1 user already exists");
            } catch (RuntimeException e) {
                try {
                    User teacher = userService.createUser(
                        "teacher1",
                        "teacher1@studenthub.com",
                        "teacher123",
                        "John",
                        "Teacher"
                    );
                    System.out.println("Sample teacher user created:");
                    System.out.println("Username: teacher1");
                    System.out.println("Password: teacher123");
                    System.out.println("Email: teacher1@studenthub.com");
                } catch (Exception ex) {
                    System.err.println("Failed to create teacher1 user: " + ex.getMessage());
                }
            }
            
            try {
                userService.getUserByUsername("student1");
                System.out.println("Student1 user already exists");
            } catch (RuntimeException e) {
                try {
                    User student = userService.createUser(
                        "student1",
                        "student1@studenthub.com",
                        "student123",
                        "Jane",
                        "Student"
                    );
                    System.out.println("Sample student user created:");
                    System.out.println("Username: student1");
                    System.out.println("Password: student123");
                    System.out.println("Email: student1@studenthub.com");
                } catch (Exception ex) {
                    System.err.println("Failed to create student1 user: " + ex.getMessage());
                }
            }
            
            System.out.println("User initialization completed.");
            System.out.println("=== DataInitializer END ===");
            System.out.println("Application should continue running...");
        } catch (Exception e) {
            System.err.println("Error in DataInitializer: " + e.getMessage());
            e.printStackTrace();
        }
    }
}