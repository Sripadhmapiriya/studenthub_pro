import React from 'react';
import Input from '../../../components/ui/Input';

const PersonalInfoSection = ({ formData, errors, onChange }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-2 h-6 bg-primary rounded-full" />
        <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter student's full name"
          value={formData?.name}
          onChange={(e) => onChange('name', e?.target?.value)}
          error={errors?.name}
          required
          className="col-span-1 md:col-span-2"
        />
        
        <Input
          label="Email Address"
          type="email"
          placeholder="student@example.com"
          value={formData?.email}
          onChange={(e) => onChange('email', e?.target?.value)}
          error={errors?.email}
          description="This will be used for student login and communications"
          required
        />
        
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+91 9876543210"
          value={formData?.phone}
          onChange={(e) => onChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;