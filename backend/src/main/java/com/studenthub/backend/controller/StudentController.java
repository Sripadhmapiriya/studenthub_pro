package com.studenthub.backend.controller;

import com.studenthub.backend.dto.StudentCreateRequest;
import com.studenthub.backend.dto.StudentResponse;
import com.studenthub.backend.model.Student;
import com.studenthub.backend.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:4028"})
public class StudentController {
    
    @Autowired
    private StudentService studentService;
    
    @PostMapping
    public ResponseEntity<?> createStudent(@Valid @RequestBody StudentCreateRequest request) {
        try {
            StudentResponse response = studentService.createStudent(request);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping
    public ResponseEntity<Page<StudentResponse>> getAllStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        Page<StudentResponse> students = studentService.getAllStudents(page, size, sortBy, sortDir);
        return ResponseEntity.ok(students);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<StudentResponse> getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id)
                .map(student -> ResponseEntity.ok(student))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/student-id/{studentId}")
    public ResponseEntity<StudentResponse> getStudentByStudentId(@PathVariable String studentId) {
        return studentService.getStudentByStudentId(studentId)
                .map(student -> ResponseEntity.ok(student))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search")
    public ResponseEntity<Page<StudentResponse>> searchStudents(
            @RequestParam String searchTerm,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<StudentResponse> students = studentService.searchStudents(searchTerm, page, size);
        return ResponseEntity.ok(students);
    }
    
    @GetMapping("/filter")
    public ResponseEntity<Page<StudentResponse>> filterStudents(
            @RequestParam(required = false) String course,
            @RequestParam(required = false) String year,
            @RequestParam(required = false) Student.EnrollmentStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<StudentResponse> students = studentService.filterStudents(course, year, status, page, size);
        return ResponseEntity.ok(students);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<StudentResponse> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentCreateRequest request) {
        try {
            StudentResponse response = studentService.updateStudent(id, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        try {
            studentService.deleteStudent(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateEnrollmentStatus(
            @PathVariable Long id,
            @RequestParam Student.EnrollmentStatus status) {
        try {
            studentService.updateEnrollmentStatus(id, status);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getStudentStats() {
        Map<String, Long> stats = studentService.getStudentStats();
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/stats/courses")
    public ResponseEntity<List<Map<String, Object>>> getCourseStats() {
        List<Map<String, Object>> stats = studentService.getCourseStats();
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/stats/years")
    public ResponseEntity<List<Map<String, Object>>> getYearStats() {
        List<Map<String, Object>> stats = studentService.getYearStats();
        return ResponseEntity.ok(stats);
    }
}