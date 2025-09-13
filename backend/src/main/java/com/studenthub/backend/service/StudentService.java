package com.studenthub.backend.service;

import com.studenthub.backend.dto.StudentCreateRequest;
import com.studenthub.backend.dto.StudentResponse;
import com.studenthub.backend.model.Student;
import com.studenthub.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    public StudentResponse createStudent(StudentCreateRequest request) {
        // Check if email already exists
        if (studentRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        // Generate student ID if not provided
        String studentId = request.getStudentId();
        if (studentId == null || studentId.trim().isEmpty()) {
            studentId = generateStudentId();
        }
        
        // Check if student ID already exists
        if (studentRepository.existsByStudentId(studentId)) {
            throw new RuntimeException("Student ID already exists");
        }
        
        // Create new student
        Student student = new Student();
        student.setStudentId(studentId);
        student.setName(request.getName());
        student.setEmail(request.getEmail());
        student.setPhone(request.getPhone());
        student.setCourse(request.getCourse());
        student.setYear(request.getYear());
        student.setAddressLine1(request.getAddressLine1());
        student.setAddressLine2(request.getAddressLine2());
        student.setCity(request.getCity());
        student.setState(request.getState());
        student.setCountry(request.getCountry());
        student.setPostalCode(request.getPostalCode());
        student.setProfilePictureUrl(request.getProfilePictureUrl());
        student.setEnrollmentStatus(Student.EnrollmentStatus.ACTIVE);
        
        Student savedStudent = studentRepository.save(student);
        return new StudentResponse(savedStudent);
    }
    
    public Page<StudentResponse> getAllStudents(int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                   Sort.by(sortBy).descending() : 
                   Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Student> students = studentRepository.findAll(pageable);
        
        return students.map(StudentResponse::new);
    }
    
    public Optional<StudentResponse> getStudentById(Long id) {
        return studentRepository.findById(id)
                .map(StudentResponse::new);
    }
    
    public Optional<StudentResponse> getStudentByStudentId(String studentId) {
        return studentRepository.findByStudentId(studentId)
                .map(StudentResponse::new);
    }
    
    public Page<StudentResponse> searchStudents(String searchTerm, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Student> students = studentRepository.findBySearchTerm(searchTerm, pageable);
        return students.map(StudentResponse::new);
    }
    
    public Page<StudentResponse> filterStudents(String course, String year, 
                                              Student.EnrollmentStatus status, 
                                              int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Student> students = studentRepository.findByFilters(course, year, status, pageable);
        return students.map(StudentResponse::new);
    }
    
    public StudentResponse updateStudent(Long id, StudentCreateRequest request) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        
        // Check if email is being changed and if it already exists
        if (!student.getEmail().equals(request.getEmail()) && 
            studentRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        // Update student fields
        student.setName(request.getName());
        student.setEmail(request.getEmail());
        student.setPhone(request.getPhone());
        student.setCourse(request.getCourse());
        student.setYear(request.getYear());
        student.setAddressLine1(request.getAddressLine1());
        student.setAddressLine2(request.getAddressLine2());
        student.setCity(request.getCity());
        student.setState(request.getState());
        student.setCountry(request.getCountry());
        student.setPostalCode(request.getPostalCode());
        student.setProfilePictureUrl(request.getProfilePictureUrl());
        
        Student updatedStudent = studentRepository.save(student);
        return new StudentResponse(updatedStudent);
    }
    
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        studentRepository.delete(student);
    }
    
    public void updateEnrollmentStatus(Long id, Student.EnrollmentStatus status) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        student.setEnrollmentStatus(status);
        studentRepository.save(student);
    }
    
    public Map<String, Long> getStudentStats() {
        return Map.of(
            "total", studentRepository.count(),
            "active", studentRepository.countByEnrollmentStatus(Student.EnrollmentStatus.ACTIVE),
            "inactive", studentRepository.countByEnrollmentStatus(Student.EnrollmentStatus.INACTIVE),
            "graduated", studentRepository.countByEnrollmentStatus(Student.EnrollmentStatus.GRADUATED),
            "suspended", studentRepository.countByEnrollmentStatus(Student.EnrollmentStatus.SUSPENDED)
        );
    }
    
    public List<Map<String, Object>> getCourseStats() {
        List<Object[]> results = studentRepository.getStudentCountByCourse();
        return results.stream()
                .map(result -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("course", (String) result[0]);
                    map.put("count", (Long) result[1]);
                    return map;
                })
                .collect(Collectors.toList());
    }
    
    public List<Map<String, Object>> getYearStats() {
        List<Object[]> results = studentRepository.getStudentCountByYear();
        return results.stream()
                .map(result -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("year", (String) result[0]);
                    map.put("count", (Long) result[1]);
                    return map;
                })
                .collect(Collectors.toList());
    }
    
    private String generateStudentId() {
        int currentYear = LocalDateTime.now().getYear();
        long count = studentRepository.count() + 1;
        return String.format("STU-%d-%03d", currentYear, count);
    }
}