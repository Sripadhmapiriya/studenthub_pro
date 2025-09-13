import React from 'react';
import Icon from '../../../components/AppIcon';

const PersonalInfoCard = ({ student }) => {
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const formatPhoneNumber = (phone) => {
    const cleaned = phone?.replace(/\D/g, '');
    const match = cleaned?.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match?.[1]}) ${match?.[2]}-${match?.[3]}`;
    }
    return phone;
  };

  const personalDetails = [
    {
      label: 'Full Name',
      value: student?.name,
      icon: 'User'
    },
    {
      label: 'Email Address',
      value: student?.email,
      icon: 'Mail'
    },
    {
      label: 'Phone Number',
      value: formatPhoneNumber(student?.phone),
      icon: 'Phone'
    },
    {
      label: 'Location',
      value: student?.location,
      icon: 'MapPin'
    },
    {
      label: 'Date of Birth',
      value: student?.dateOfBirth ? formatDate(student?.dateOfBirth) : 'Not provided',
      icon: 'Calendar'
    },
    {
      label: 'Gender',
      value: student?.gender || 'Not specified',
      icon: 'Users'
    },
    {
      label: 'Emergency Contact',
      value: student?.emergencyContact || 'Not provided',
      icon: 'Phone'
    },
    {
      label: 'Address',
      value: student?.address || 'Not provided',
      icon: 'Home'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="User" size={18} className="text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {personalDetails?.map((detail, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name={detail?.icon} size={16} className="text-muted-foreground" />
              <label className="text-sm font-medium text-muted-foreground">
                {detail?.label}
              </label>
            </div>
            <p className="text-foreground font-medium pl-6">
              {detail?.value}
            </p>
          </div>
        ))}
      </div>
      {/* Additional Information */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <label className="text-sm font-medium text-muted-foreground">
                Registration Date
              </label>
            </div>
            <p className="text-foreground font-medium pl-6">
              {formatDate(student?.createdAt)}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <label className="text-sm font-medium text-muted-foreground">
                Last Updated
              </label>
            </div>
            <p className="text-foreground font-medium pl-6">
              {formatDate(student?.updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoCard;