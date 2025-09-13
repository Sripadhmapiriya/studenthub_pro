import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';

const BulkActionModal = ({
  isOpen,
  onClose,
  selectedStudents,
  actionType, // 'edit' or 'delete'
  onConfirm,
  isLoading
}) => {
  const [bulkEditData, setBulkEditData] = useState({
    status: '',
    course: '',
    year: ''
  });

  const statusOptions = [
    { value: '', label: 'Keep current status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'graduated', label: 'Graduated' }
  ];

  const courseOptions = [
    { value: '', label: 'Keep current course' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Business Administration', label: 'Business Administration' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Psychology', label: 'Psychology' },
    { value: 'Biology', label: 'Biology' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'English Literature', label: 'English Literature' },
    { value: 'History', label: 'History' }
  ];

  const yearOptions = [
    { value: '', label: 'Keep current year' },
    { value: '1', label: 'Year 1' },
    { value: '2', label: 'Year 2' },
    { value: '3', label: 'Year 3' },
    { value: '4', label: 'Year 4' }
  ];

  const handleConfirm = () => {
    if (actionType === 'edit') {
      onConfirm(bulkEditData);
    } else {
      onConfirm();
    }
  };

  const handleClose = () => {
    setBulkEditData({ status: '', course: '', year: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-card border border-border rounded-lg w-full max-w-md mx-4 shadow-elevation-3">
        {actionType === 'delete' ? (
          // Delete confirmation
          (<div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Delete Students</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">
                Are you sure you want to delete the following {selectedStudents?.length} student{selectedStudents?.length !== 1 ? 's' : ''}?
              </p>
              <div className="bg-muted/50 rounded-lg p-3 max-h-32 overflow-y-auto">
                {selectedStudents?.slice(0, 5)?.map((student, index) => (
                  <div key={student?.id} className="text-sm text-foreground">
                    • {student?.name} ({student?.email})
                  </div>
                ))}
                {selectedStudents?.length > 5 && (
                  <div className="text-sm text-muted-foreground mt-1">
                    ... and {selectedStudents?.length - 5} more
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3">
              <Button variant="outline" onClick={handleClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleConfirm}
                loading={isLoading}
                iconName="Trash2"
                iconPosition="left"
              >
                Delete Students
              </Button>
            </div>
          </div>)
        ) : (
          // Bulk edit form
          (<div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Edit" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Bulk Edit Students</h3>
                <p className="text-sm text-muted-foreground">
                  Update {selectedStudents?.length} selected student{selectedStudents?.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <Select
                label="Status"
                description="Leave empty to keep current status for each student"
                options={statusOptions}
                value={bulkEditData?.status}
                onChange={(value) => setBulkEditData(prev => ({ ...prev, status: value }))}
              />

              <Select
                label="Course"
                description="Leave empty to keep current course for each student"
                options={courseOptions}
                value={bulkEditData?.course}
                onChange={(value) => setBulkEditData(prev => ({ ...prev, course: value }))}
              />

              <Select
                label="Year"
                description="Leave empty to keep current year for each student"
                options={yearOptions}
                value={bulkEditData?.year}
                onChange={(value) => setBulkEditData(prev => ({ ...prev, year: value }))}
              />
            </div>
            <div className="bg-muted/50 rounded-lg p-3 mb-6">
              <h4 className="text-sm font-medium text-foreground mb-2">Selected Students:</h4>
              <div className="max-h-24 overflow-y-auto">
                {selectedStudents?.slice(0, 3)?.map((student) => (
                  <div key={student?.id} className="text-sm text-muted-foreground">
                    • {student?.name}
                  </div>
                ))}
                {selectedStudents?.length > 3 && (
                  <div className="text-sm text-muted-foreground">
                    ... and {selectedStudents?.length - 3} more
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3">
              <Button variant="outline" onClick={handleClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button 
                variant="default" 
                onClick={handleConfirm}
                loading={isLoading}
                iconName="Save"
                iconPosition="left"
              >
                Update Students
              </Button>
            </div>
          </div>)
        )}
      </div>
    </div>
  );
};

export default BulkActionModal;