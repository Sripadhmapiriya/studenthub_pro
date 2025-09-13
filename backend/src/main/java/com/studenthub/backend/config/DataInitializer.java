package com.studenthub.backend.config;

import com.studenthub.backend.model.User;
import com.studenthub.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserService userService;
    
    @Override
    public void run(String... args) throws Exception {
        // Create default admin user if it doesn't exist
        try {
            userService.getUserByUsername("admin");
        } catch (RuntimeException e) {
            // User doesn't exist, create default admin
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
        }
        
        // Create additional sample users for testing
        try {
            userService.getUserByUsername("sharika");
        } catch (RuntimeException e) {
            User sharika = userService.createUser(
                "sharika",
                "sharika@studenthub.com",
                "shariraj04",
                "Sharika",
                "User"
            );
            System.out.println("Sample user created:");
            System.out.println("Username: sharika");
            System.out.println("Password: shariraj04");
            System.out.println("Email: sharika@studenthub.com");
        }
        
        try {
            userService.getUserByUsername("teacher1");
        } catch (RuntimeException e) {
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
        }
        
        try {
            userService.getUserByUsername("student1");
        } catch (RuntimeException e) {
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
        }
    }
}