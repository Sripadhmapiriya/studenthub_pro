import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EditStudentForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams?.get('id');

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

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState({});

  // Mock student data
  const mockStudentData = {
    1: {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+91 9876543210",
      course: "computer-science",
      year: "2",
      studentId: "STU-2023-1001",
      address: "123 Main Street",
      city: "Mumbai",
      state: "mh",
      zipCode: "400001",
      country: "in",
      status: "active",
      enrollmentDate: "2023-08-15",
      gpa: 3.8
    },
    2: {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+91 9876543211",
      course: "business-administration",
      year: "3",
      studentId: "STU-2022-1002",
      address: "456 Park Road",
      city: "Delhi",
      state: "dl",
      zipCode: "110001",
      country: "in",
      status: "active",
      enrollmentDate: "2022-08-20",
      gpa: 3.6
    },
    3: {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      phone: "+91 9876543212",
      course: "psychology",
      year: "4",
      studentId: "STU-2021-1003",
      address: "789 Tech Park",
      city: "Bangalore",
      state: "ka",
      zipCode: "560001",
      country: "in",
      status: "active",
      enrollmentDate: "2021-08-25",
      gpa: 3.9
    }
  };

  const courseOptions = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'business-administration', label: 'Business Administration' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'english-literature', label: 'English Literature' },
    { value: 'history', label: 'History' },
    { value: 'economics', label: 'Economics' },
    { value: 'political-science', label: 'Political Science' }
  ];

  const yearOptions = [
    { value: '1', label: 'First Year' },
    { value: '2', label: 'Second Year' },
    { value: '3', label: 'Third Year' },
    { value: '4', label: 'Fourth Year' },
    { value: 'graduate', label: 'Graduate' }
  ];

  const countryOptions = [
    { value: 'in', label: 'India' }
  ];

  const stateOptions = [
    { value: 'ap', label: 'Andhra Pradesh' },
    { value: 'ar', label: 'Arunachal Pradesh' },
    { value: 'as', label: 'Assam' },
    { value: 'br', label: 'Bihar' },
    { value: 'ct', label: 'Chhattisgarh' },
    { value: 'ga', label: 'Goa' },
    { value: 'gj', label: 'Gujarat' },
    { value: 'hr', label: 'Haryana' },
    { value: 'hp', label: 'Himachal Pradesh' },
    { value: 'jh', label: 'Jharkhand' },
    { value: 'ka', label: 'Karnataka' },
    { value: 'kl', label: 'Kerala' },
    { value: 'mp', label: 'Madhya Pradesh' },
    { value: 'mh', label: 'Maharashtra' },
    { value: 'mn', label: 'Manipur' },
    { value: 'ml', label: 'Meghalaya' },
    { value: 'mz', label: 'Mizoram' },
    { value: 'nl', label: 'Nagaland' },
    { value: 'or', label: 'Odisha' },
    { value: 'pb', label: 'Punjab' },
    { value: 'rj', label: 'Rajasthan' },
    { value: 'sk', label: 'Sikkim' },
    { value: 'tn', label: 'Tamil Nadu' },
    { value: 'tg', label: 'Telangana' },
    { value: 'tr', label: 'Tripura' },
    { value: 'up', label: 'Uttar Pradesh' },
    { value: 'ut', label: 'Uttarakhand' },
    { value: 'wb', label: 'West Bengal' },
    { value: 'an', label: 'Andaman and Nicobar Islands' },
    { value: 'ch', label: 'Chandigarh' },
    { value: 'dh', label: 'Dadra and Nagar Haveli and Daman and Diu' },
    { value: 'dl', label: 'Delhi' },
    { value: 'jk', label: 'Jammu and Kashmir' },
    { value: 'la', label: 'Ladakh' },
    { value: 'ld', label: 'Lakshadweep' },
    { value: 'py', label: 'Puducherry' }
  ];

  useEffect(() => {
    const loadStudentData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const student = mockStudentData?.[studentId] || mockStudentData?.[1];
      const initialData = {
        name: student?.name,
        email: student?.email,
        phone: student?.phone,
        course: student?.course,
        year: student?.year,
        studentId: student?.studentId,
        address: student?.address,
        city: student?.city,
        state: student?.state,
        zipCode: student?.zipCode,
        country: student?.country
      };
      
      setFormData(initialData);
      setOriginalData(initialData);
      setIsLoading(false);
    };

    if (studentId) {
      loadStudentData();
    }
  }, [studentId]);

  useEffect(() => {
    const dataChanged = JSON.stringify(formData) !== JSON.stringify(originalData);
    setHasChanges(dataChanged);
  }, [formData, originalData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData?.name?.trim()?.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData?.course) {
      newErrors.course = 'Course is required';
    }

    if (!formData?.year) {
      newErrors.year = 'Year is required';
    }

    if (!formData?.address?.trim()) {
      newErrors.address = 'Street address is required';
    }

    if (!formData?.city?.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData?.state) {
      newErrors.state = 'State is required';
    }

    if (!formData?.zipCode?.trim()) {
      newErrors.zipCode = 'PIN code is required';
    } else if (!/^\d{6}$/?.test(formData?.zipCode)) {
      newErrors.zipCode = 'Please enter a valid 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - navigate back to student profile
      navigate(`/student-profile?id=${studentId}`, {
        state: { 
          message: 'Student information updated successfully',
          type: 'success'
        }
      });
    } catch (error) {
      setErrors({
        submit: 'Failed to update student information. Please try again.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave without saving?'
      );
      if (!confirmLeave) return;
    }
    
    navigate(`/student-profile?id=${studentId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Loading student information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter full name"
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              error={errors?.name}
              required
              className="md:col-span-2"
            />
            
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter email address"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              required
            />
            
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter phone number"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              error={errors?.phone}
              required
            />
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Academic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Course"
              placeholder="Select course"
              options={courseOptions}
              value={formData?.course}
              onChange={(value) => handleInputChange('course', value)}
              error={errors?.course}
              required
              searchable
            />
            
            <Select
              label="Academic Year"
              placeholder="Select year"
              options={yearOptions}
              value={formData?.year}
              onChange={(value) => handleInputChange('year', value)}
              error={errors?.year}
              required
            />

            <Input
              label="Student ID"
              type="text"
              placeholder="STU-2025-001"
              value={formData?.studentId}
              onChange={(e) => handleInputChange('studentId', e?.target?.value)}
              error={errors?.studentId}
              className="md:col-span-2"
            />
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Location Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Street Address"
              type="text"
              placeholder="123 Main Street"
              value={formData?.address}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
              error={errors?.address}
              required
              className="md:col-span-2"
            />
            
            <Input
              label="City"
              type="text"
              placeholder="Mumbai"
              value={formData?.city}
              onChange={(e) => handleInputChange('city', e?.target?.value)}
              error={errors?.city}
              required
            />

            <Select
              label="State"
              placeholder="Select state"
              options={stateOptions}
              value={formData?.state}
              onChange={(value) => handleInputChange('state', value)}
              error={errors?.state}
              required
              searchable
            />
            
            <Input
              label="PIN Code"
              type="text"
              placeholder="110001"
              value={formData?.zipCode}
              onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
              error={errors?.zipCode}
              required
            />

            <Select
              label="Country"
              placeholder="Select country"
              options={countryOptions}
              value={formData?.country}
              onChange={(value) => handleInputChange('country', value)}
              error={errors?.country}
              required
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-border">
          <div className="flex items-center space-x-2">
            {hasChanges && (
              <div className="flex items-center space-x-2 text-sm text-warning">
                <span>You have unsaved changes</span>
              </div>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              variant="default"
              disabled={!hasChanges || isSaving}
              className="gradient-primary"
            >
              {isSaving ? 'Saving Changes...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {/* Submit Error */}
        {errors?.submit && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-destructive">{errors?.submit}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditStudentForm;