import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const EditStudentHeader = () => {
  const [searchParams] = useSearchParams();
  const studentId = searchParams?.get('id');

  // Mock student data for header display
  const mockStudentData = {
    1: { name: "Sarah Johnson", id: "STU001" },
    2: { name: "Michael Chen", id: "STU002" },
    3: { name: "Emily Rodriguez", id: "STU003" }
  };

  const student = mockStudentData?.[studentId] || mockStudentData?.[1];

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
          <Icon name="UserCog" size={20} color="white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit Student</h1>
          <p className="text-muted-foreground">
            Modify information for {student?.name} (ID: {student?.id})
          </p>
        </div>
      </div>
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-accent mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-accent font-medium mb-1">Important Notes</p>
            <ul className="text-sm text-accent/80 space-y-1">
              <li>• Changes will be saved immediately upon submission</li>
              <li>• Email changes may require verification</li>
              <li>• Profile picture changes are optional</li>
              <li>• All required fields must be completed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudentHeader;