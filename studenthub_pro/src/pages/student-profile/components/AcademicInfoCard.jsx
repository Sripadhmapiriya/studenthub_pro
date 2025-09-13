import React from 'react';
import Icon from '../../../components/AppIcon';

const AcademicInfoCard = ({ student }) => {
  const getYearLabel = (year) => {
    const yearLabels = {
      1: '1st Year',
      2: '2nd Year',
      3: '3rd Year',
      4: '4th Year',
      5: '5th Year'
    };
    return yearLabels?.[year] || `Year ${year}`;
  };

  const getGPAColor = (gpa) => {
    if (gpa >= 3.5) return 'text-success';
    if (gpa >= 3.0) return 'text-warning';
    return 'text-destructive';
  };

  const academicDetails = [
    {
      label: 'Course/Program',
      value: student?.course,
      icon: 'BookOpen'
    },
    {
      label: 'Academic Year',
      value: getYearLabel(student?.year),
      icon: 'Calendar'
    },
    {
      label: 'Student ID',
      value: student?.studentId || student?.id,
      icon: 'Hash'
    },
    {
      label: 'Enrollment Status',
      value: student?.status,
      icon: 'CheckCircle'
    },
    {
      label: 'Current GPA',
      value: student?.gpa ? `${student?.gpa}/4.0` : 'Not available',
      icon: 'TrendingUp',
      valueClass: student?.gpa ? getGPAColor(student?.gpa) : ''
    },
    {
      label: 'Credits Completed',
      value: student?.creditsCompleted ? `${student?.creditsCompleted} credits` : 'Not available',
      icon: 'Award'
    },
    {
      label: 'Expected Graduation',
      value: student?.expectedGraduation || 'Not set',
      icon: 'GraduationCap'
    },
    {
      label: 'Academic Advisor',
      value: student?.advisor || 'Not assigned',
      icon: 'Users'
    }
  ];

  const achievements = [
    { title: 'Dean\'s List', semester: 'Fall 2023', icon: 'Award' },
    { title: 'Perfect Attendance', semester: 'Spring 2023', icon: 'Calendar' },
    { title: 'Academic Excellence', semester: 'Fall 2022', icon: 'Star' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
          <Icon name="GraduationCap" size={18} className="text-accent" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Academic Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {academicDetails?.map((detail, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name={detail?.icon} size={16} className="text-muted-foreground" />
              <label className="text-sm font-medium text-muted-foreground">
                {detail?.label}
              </label>
            </div>
            <p className={`font-medium pl-6 ${detail?.valueClass || 'text-foreground'}`}>
              {detail?.value}
            </p>
          </div>
        ))}
      </div>
      {/* Academic Progress */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Academic Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-foreground">Course Completion</span>
              <span className="text-sm font-medium text-foreground">75%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '75%' }} />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-foreground">Credit Hours</span>
              <span className="text-sm font-medium text-foreground">90/120</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-success h-2 rounded-full transition-all duration-300" style={{ width: '75%' }} />
            </div>
          </div>
        </div>
      </div>
      {/* Recent Achievements */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          {achievements?.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <Icon name={achievement?.icon} size={16} className="text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{achievement?.title}</p>
                <p className="text-xs text-muted-foreground">{achievement?.semester}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicInfoCard;