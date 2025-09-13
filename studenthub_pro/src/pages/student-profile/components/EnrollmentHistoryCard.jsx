import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const EnrollmentHistoryCard = ({ student }) => {
  const [activeTab, setActiveTab] = useState('courses');

  const enrollmentHistory = [
    {
      id: 1,
      semester: 'Fall 2023',
      courses: [
        { code: 'CS301', name: 'Data Structures', credits: 3, grade: 'A', gpa: 4.0 },
        { code: 'CS302', name: 'Algorithms', credits: 3, grade: 'A-', gpa: 3.7 },
        { code: 'MATH201', name: 'Calculus II', credits: 4, grade: 'B+', gpa: 3.3 },
        { code: 'ENG102', name: 'Technical Writing', credits: 2, grade: 'A', gpa: 4.0 }
      ],
      semesterGPA: 3.75,
      totalCredits: 12,
      status: 'Completed'
    },
    {
      id: 2,
      semester: 'Spring 2023',
      courses: [
        { code: 'CS201', name: 'Programming Fundamentals', credits: 4, grade: 'A', gpa: 4.0 },
        { code: 'CS202', name: 'Object-Oriented Programming', credits: 3, grade: 'B+', gpa: 3.3 },
        { code: 'MATH101', name: 'Calculus I', credits: 4, grade: 'A-', gpa: 3.7 },
        { code: 'PHY101', name: 'Physics I', credits: 3, grade: 'B', gpa: 3.0 }
      ],
      semesterGPA: 3.5,
      totalCredits: 14,
      status: 'Completed'
    }
  ];

  const currentCourses = [
    { code: 'CS401', name: 'Software Engineering', credits: 3, instructor: 'Dr. Smith', schedule: 'MWF 10:00-11:00' },
    { code: 'CS402', name: 'Database Systems', credits: 3, instructor: 'Prof. Johnson', schedule: 'TTh 2:00-3:30' },
    { code: 'CS403', name: 'Computer Networks', credits: 3, instructor: 'Dr. Brown', schedule: 'MWF 1:00-2:00' },
    { code: 'MGMT301', name: 'Project Management', credits: 2, instructor: 'Prof. Davis', schedule: 'TTh 11:00-12:00' }
  ];

  const getGradeColor = (grade) => {
    if (grade?.startsWith('A')) return 'text-success';
    if (grade?.startsWith('B')) return 'text-warning';
    if (grade?.startsWith('C')) return 'text-accent';
    return 'text-destructive';
  };

  const tabs = [
    { id: 'courses', label: 'Current Courses', icon: 'BookOpen' },
    { id: 'history', label: 'Academic History', icon: 'History' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
          <Icon name="BookOpen" size={18} className="text-success" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Enrollment & Courses</h2>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-micro ${
              activeTab === tab?.id
                ? 'bg-card text-foreground shadow-elevation-1'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Current Courses Tab */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Spring 2024 - Current Semester</h3>
            <span className="text-sm text-muted-foreground">11 Credits</span>
          </div>
          
          <div className="space-y-3">
            {currentCourses?.map((course, index) => (
              <div key={index} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{course?.code?.slice(-3)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{course?.name}</h4>
                      <p className="text-sm text-muted-foreground">{course?.code} • {course?.credits} Credits</p>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 text-right">
                    <p className="text-sm font-medium text-foreground">{course?.instructor}</p>
                    <p className="text-xs text-muted-foreground">{course?.schedule}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Academic History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          {enrollmentHistory?.map((semester) => (
            <div key={semester?.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">{semester?.semester}</h3>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-muted-foreground">GPA: <span className="font-medium text-foreground">{semester?.semesterGPA}</span></span>
                  <span className="text-muted-foreground">Credits: <span className="font-medium text-foreground">{semester?.totalCredits}</span></span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {semester?.courses?.map((course, courseIndex) => (
                  <div key={courseIndex} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded bg-card flex items-center justify-center">
                        <span className="text-xs font-bold text-muted-foreground">{course?.code?.slice(-3)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{course?.name}</p>
                        <p className="text-sm text-muted-foreground">{course?.code} • {course?.credits} Credits</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${getGradeColor(course?.grade)}`}>{course?.grade}</p>
                      <p className="text-xs text-muted-foreground">{course?.gpa} GPA</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {semester?.id !== enrollmentHistory?.length && (
                <div className="border-b border-border" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollmentHistoryCard;