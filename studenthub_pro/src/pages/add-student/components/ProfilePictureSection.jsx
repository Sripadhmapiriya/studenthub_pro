import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfilePictureSection = ({ formData, errors, onChange }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes?.includes(file?.type)) {
      onChange('profilePictureError', 'Please select a valid image file (JPEG, PNG, or GIF)');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file?.size > maxSize) {
      onChange('profilePictureError', 'File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange('profilePicture', e?.target?.result);
      onChange('profilePictureFile', file);
      onChange('profilePictureError', '');
      setIsUploading(false);
    };
    reader?.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const file = e?.dataTransfer?.files?.[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e) => {
    const file = e?.target?.files?.[0];
    handleFileSelect(file);
  };

  const handleRemoveImage = () => {
    onChange('profilePicture', '');
    onChange('profilePictureFile', null);
    onChange('profilePictureError', '');
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-2 h-6 bg-warning rounded-full" />
        <h3 className="text-lg font-semibold text-foreground">Profile Picture</h3>
      </div>
      <div className="space-y-4">
        {formData?.profilePicture ? (
          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-border">
                <Image
                  src={formData?.profilePicture}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/80 transition-micro"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
            
            <div className="flex-1">
              <h4 className="text-sm font-medium text-foreground mb-2">Profile Picture Selected</h4>
              <p className="text-sm text-muted-foreground mb-4">
                {formData?.profilePictureFile?.name || 'Profile picture uploaded successfully'}
              </p>
              <button
                type="button"
                onClick={handleBrowseClick}
                className="text-sm text-primary hover:text-primary/80 transition-micro"
              >
                Change Picture
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-micro ${
              isDragOver
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {isUploading ? (
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                <p className="text-sm text-muted-foreground">Uploading image...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Icon name="Upload" size={24} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Drop your image here, or{' '}
                    <button
                      type="button"
                      onClick={handleBrowseClick}
                      className="text-primary hover:text-primary/80 transition-micro"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports: JPEG, PNG, GIF up to 5MB
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        
        {errors?.profilePictureError && (
          <p className="text-sm text-destructive">{errors?.profilePictureError}</p>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ProfilePictureSection;