import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AcademicInfoSection = ({ formData, errors, onChange }) => {
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

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-2 h-6 bg-accent rounded-full" />
        <h3 className="text-lg font-semibold text-foreground">Academic Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Course/Program"
          placeholder="Select a course"
          options={courseOptions}
          value={formData?.course}
          onChange={(value) => onChange('course', value)}
          error={errors?.course}
          searchable
          required
        />
        
        <Select
          label="Academic Year"
          placeholder="Select year"
          options={yearOptions}
          value={formData?.year}
          onChange={(value) => onChange('year', value)}
          error={errors?.year}
          required
        />
        
        <Input
          label="Student ID"
          type="text"
          placeholder="STU-2025-001"
          value={formData?.studentId}
          onChange={(e) => onChange('studentId', e?.target?.value)}
          error={errors?.studentId}
          description="Auto-generated if left empty"
          className="col-span-1 md:col-span-2"
        />
      </div>
    </div>
  );
};

export default AcademicInfoSection;