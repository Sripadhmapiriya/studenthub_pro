package com.studenthub.backend.repository;

import com.studenthub.backend.model.Student;
import com.studenthub.backend.model.Student.EnrollmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    Optional<Student> findByStudentId(String studentId);
    
    Optional<Student> findByEmail(String email);
    
    boolean existsByStudentId(String studentId);
    
    boolean existsByEmail(String email);
    
    List<Student> findByEnrollmentStatus(EnrollmentStatus status);
    
    List<Student> findByCourse(String course);
    
    List<Student> findByYear(String year);
    
    @Query("SELECT s FROM Student s WHERE " +
           "LOWER(s.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.studentId) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.course) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Student> findBySearchTerm(@Param("searchTerm") String searchTerm, Pageable pageable);
    
    @Query("SELECT s FROM Student s WHERE " +
           "(:course IS NULL OR s.course = :course) AND " +
           "(:year IS NULL OR s.year = :year) AND " +
           "(:status IS NULL OR s.enrollmentStatus = :status)")
    Page<Student> findByFilters(@Param("course") String course, 
                               @Param("year") String year, 
                               @Param("status") EnrollmentStatus status, 
                               Pageable pageable);
    
    @Query("SELECT COUNT(s) FROM Student s WHERE s.enrollmentStatus = :status")
    long countByEnrollmentStatus(@Param("status") EnrollmentStatus status);
    
    @Query("SELECT s.course, COUNT(s) FROM Student s GROUP BY s.course")
    List<Object[]> getStudentCountByCourse();
    
    @Query("SELECT s.year, COUNT(s) FROM Student s GROUP BY s.year ORDER BY s.year")
    List<Object[]> getStudentCountByYear();
}