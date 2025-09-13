import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import PersonalInfoSection from './components/PersonalInfoSection';
import AcademicInfoSection from './components/AcademicInfoSection';
import LocationInfoSection from './components/LocationInfoSection';
import FormActions from './components/FormActions';
import { studentsAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const AddStudent = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    year: '',
    studentId: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'in'
  });

  // Form errors state
  const [errors, setErrors] = useState({});

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)')?.matches);
    setIsDarkMode(prefersDark);
    document.documentElement?.classList?.toggle('dark', prefersDark);
  }, []);

  const handleToggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement?.classList?.toggle('dark', newMode);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Personal Information Validation
    if (!formData?.name?.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData?.name?.trim()?.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/?.test(formData?.phone?.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Academic Information Validation
    if (!formData?.course) {
      newErrors.course = 'Course selection is required';
    }

    if (!formData?.year) {
      newErrors.year = 'Academic year is required';
    }

    // Location Information Validation
    if (!formData?.address?.trim()) {
      newErrors.address = 'Street address is required';
    }

    if (!formData?.city?.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData?.state) {
      newErrors.state = 'State selection is required';
    }

    if (!formData?.zipCode?.trim()) {
      newErrors.zipCode = 'PIN code is required';
    } else if (!/^\d{6}$/?.test(formData?.zipCode)) {
      newErrors.zipCode = 'Please enter a valid 6-digit PIN code';
    }

    if (!formData?.country) {
      newErrors.country = 'Country selection is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const generateStudentId = () => {
    const year = new Date()?.getFullYear();
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    return `STU-${year}-${randomNum}`;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Prepare data for backend API
      const studentData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        course: formData.course,
        year: formData.year,
        studentId: formData.studentId || undefined, // Let backend generate if empty
        addressLine1: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        postalCode: formData.zipCode
      };

      // Call backend API
      const createdStudent = await studentsAPI.create(studentData);

      // Show success message
      setShowSuccessMessage(true);

      // Navigate to student list after a short delay
      setTimeout(() => {
        navigate('/student-list', {
          state: {
            message: `Student "${createdStudent.name}" has been successfully created!`,
            type: 'success'
          }
        });
      }, 1500);

    } catch (error) {
      console.error('Error creating student:', error);
      setErrors({
        submit: error.message || 'Failed to create student. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasErrors = Object.keys(errors)?.length > 0;

  if (showSuccessMessage) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          user={user}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />
        
        <main className="pt-16">
          <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6">
            <div className="bg-card border border-border rounded-lg p-8 text-center max-w-md w-full shadow-elevation-2">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Student Created Successfully!</h2>
              <p className="text-muted-foreground mb-4">
                The new student record has been added to the system.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                <span>Redirecting to student list...</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto p-6">
          <Breadcrumbs />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Add New Student</h1>
            <p className="text-muted-foreground">
              Create a comprehensive student profile with personal, academic, and contact information.
            </p>
          </div>

          {/* Form Sections */}
          <div className="space-y-6">
            <PersonalInfoSection
              formData={formData}
              errors={errors}
              onChange={handleFormChange}
            />

            <AcademicInfoSection
              formData={formData}
              errors={errors}
              onChange={handleFormChange}
            />

            <LocationInfoSection
              formData={formData}
              errors={errors}
              onChange={handleFormChange}
            />

            {/* Submit Error */}
            {errors?.submit && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <p className="text-sm text-destructive">{errors?.submit}</p>
              </div>
            )}

            <FormActions
              isLoading={isLoading}
              onSubmit={handleSubmit}
              hasErrors={hasErrors}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddStudent;