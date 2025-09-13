import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import LoadingGuard, { ContentSkeleton } from '../../components/ui/LoadingGuard';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoCard from './components/PersonalInfoCard';
import AcademicInfoCard from './components/AcademicInfoCard';
import EnrollmentHistoryCard from './components/EnrollmentHistoryCard';
import ActivityTimelineCard from './components/ActivityTimelineCard';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState({ name: 'Administrator', email: 'admin@studenthub.edu' });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Mock student data
  const mockStudents = [
    {
      id: "STU001",
      studentId: "STU001",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@studenthub.edu",
      phone: "5551234567",
      location: "San Francisco, CA",
      course: "Computer Science",
      year: 3,
      status: "active",
      gpa: 3.75,
      creditsCompleted: 90,
      expectedGraduation: "May 2025",
      advisor: "Dr. Sarah Johnson",
      dateOfBirth: "2002-03-15",
      gender: "Female",
      emergencyContact: "(555) 987-6543 - Maria Rodriguez (Mother)",
      address: "1234 University Ave, San Francisco, CA 94102",
      profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      createdAt: "2022-08-15T09:00:00Z",
      updatedAt: "2024-01-10T14:30:00Z"
    },
    {
      id: "STU002",
      studentId: "STU002",
      name: "Michael Chen",
      email: "michael.chen@studenthub.edu",
      phone: "5559876543",
      location: "Los Angeles, CA",
      course: "Business Administration",
      year: 2,
      status: "active",
      gpa: 3.45,
      creditsCompleted: 60,
      expectedGraduation: "May 2026",
      advisor: "Prof. David Kim",
      dateOfBirth: "2003-07-22",
      gender: "Male",
      emergencyContact: "(555) 123-9876 - Linda Chen (Mother)",
      address: "5678 College Blvd, Los Angeles, CA 90210",
      profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      createdAt: "2023-01-20T10:15:00Z",
      updatedAt: "2024-01-08T16:45:00Z"
    }
  ];

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement?.classList?.add('dark');
    }

    // Load student data
    loadStudentData();
  }, [searchParams]);

  const loadStudentData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const studentId = searchParams?.get('id') || 'STU001';
      const foundStudent = mockStudents?.find(s => s?.id === studentId);
      
      if (foundStudent) {
        setStudent(foundStudent);
      } else {
        // If student not found, redirect to student list
        navigate('/student-list');
        return;
      }
    } catch (error) {
      console.error('Error loading student data:', error);
      navigate('/student-list');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditStudent = () => {
    navigate(`/edit-student?id=${student?.id}`);
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message (in real app, use toast notification)
      alert('Student deleted successfully');
      
      // Navigate back to student list
      navigate('/student-list');
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student. Please try again.');
    }
  };

  const handleImageUpload = (imageUrl) => {
    setStudent(prev => ({
      ...prev,
      profilePicture: imageUrl,
      updatedAt: new Date()?.toISOString()
    }));
    
    // Show success message
    alert('Profile picture updated successfully');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleToggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode?.toString());
    
    if (newDarkMode) {
      document.documentElement?.classList?.add('dark');
    } else {
      document.documentElement?.classList?.remove('dark');
    }
  };

  if (!isAuthenticated) {
    return <LoadingGuard isAuthenticated={false} isLoading={false} />;
  }

  return (
    <LoadingGuard isAuthenticated={isAuthenticated} isLoading={isLoading}>
      <div className="min-h-screen bg-background">
        <Header
          user={user}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />

        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <Breadcrumbs />

            {isLoading ? (
              <div className="space-y-6">
                <ContentSkeleton lines={2} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <ContentSkeleton lines={4} />
                    <ContentSkeleton lines={3} />
                  </div>
                  <div className="space-y-6">
                    <ContentSkeleton lines={3} />
                    <ContentSkeleton lines={4} />
                  </div>
                </div>
              </div>
            ) : student ? (
              <div className="space-y-6">
                {/* Profile Header */}
                <ProfileHeader
                  student={student}
                  onEdit={handleEditStudent}
                  onDelete={handleDeleteStudent}
                  onImageUpload={handleImageUpload}
                  isLoading={isLoading}
                />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Main Information */}
                  <div className="lg:col-span-2 space-y-6">
                    <PersonalInfoCard student={student} />
                    <AcademicInfoCard student={student} />
                    <EnrollmentHistoryCard student={student} />
                  </div>

                  {/* Right Column - Activity & Timeline */}
                  <div className="space-y-6">
                    <ActivityTimelineCard student={student} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-foreground mb-2">Student Not Found</h2>
                  <p className="text-muted-foreground mb-4">The requested student profile could not be found.</p>
                  <button
                    onClick={() => navigate('/student-list')}
                    className="text-primary hover:text-primary/80 transition-micro"
                  >
                    Return to Student List
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </LoadingGuard>
  );
};

export default StudentProfile;