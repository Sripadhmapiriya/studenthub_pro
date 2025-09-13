import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const FormActions = ({ isLoading, onSubmit, hasErrors }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/student-list');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="text-sm text-muted-foreground">
          <p>All fields marked with * are required</p>
          <p className="mt-1">Student will receive login credentials via email</p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          
          <Button
            variant="default"
            onClick={onSubmit}
            loading={isLoading}
            disabled={hasErrors}
            iconName="UserPlus"
            iconPosition="left"
            className="w-full sm:w-auto gradient-primary"
          >
            {isLoading ? 'Creating Student...' : 'Create Student'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormActions;