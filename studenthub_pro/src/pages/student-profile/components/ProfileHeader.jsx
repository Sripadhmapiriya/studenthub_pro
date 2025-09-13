import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ student, onEdit, onDelete, onImageUpload, isLoading }) => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file?.type?.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file?.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setIsImageUploading(true);
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      const imageUrl = URL.createObjectURL(file);
      onImageUpload?.(imageUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    onDelete?.(student?.id);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Active' },
      inactive: { color: 'bg-warning text-warning-foreground', label: 'Inactive' },
      graduated: { color: 'bg-primary text-primary-foreground', label: 'Graduated' },
      suspended: { color: 'bg-destructive text-destructive-foreground', label: 'Suspended' }
    };

    const config = statusConfig?.[status] || statusConfig?.active;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg shadow-elevation-2 overflow-hidden">
        {/* Header Background */}
        <div className="h-32 gradient-primary relative">
          <div className="absolute inset-0 bg-black/10" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/student-list')}
            className="absolute top-4 left-4 text-white hover:bg-white/20"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
        </div>

        {/* Profile Content */}
        <div className="relative px-6 pb-6">
          {/* Profile Picture */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-card bg-card shadow-elevation-3 overflow-hidden">
                <Image
                  src={student?.profilePicture || `https://api.dicebear.com/7.x/initials/svg?seed=${student?.name}`}
                  alt={`${student?.name}'s profile picture`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Upload Button */}
              <label className="absolute bottom-2 right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-micro shadow-elevation-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isImageUploading}
                />
                {isImageUploading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Icon name="Camera" size={16} />
                )}
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                onClick={onEdit}
                iconName="Edit"
                iconPosition="left"
                disabled={isLoading}
              >
                Edit Student
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
                iconName="Trash2"
                iconPosition="left"
                disabled={isLoading}
              >
                Delete
              </Button>
            </div>
          </div>

          {/* Student Info */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-1">{student?.name}</h1>
                <p className="text-muted-foreground">Student ID: {student?.id}</p>
              </div>
              <div className="mt-2 sm:mt-0">
                {getStatusBadge(student?.status)}
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{student?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{student?.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{student?.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)} />
          <div className="relative bg-card border border-border rounded-lg shadow-elevation-3 p-6 w-full max-w-md mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Delete Student</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-foreground mb-6">
              Are you sure you want to delete <strong>{student?.name}</strong>? This will permanently remove all student data and cannot be recovered.
            </p>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                loading={isLoading}
              >
                Delete Student
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileHeader;