import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityTimelineCard = ({ student }) => {
  const activities = [
    {
      id: 1,
      type: 'enrollment',
      title: 'Enrolled in Spring 2024 courses',
      description: 'Successfully enrolled in 4 courses for the current semester',
      timestamp: '2024-01-15T10:30:00Z',
      icon: 'BookOpen',
      color: 'text-success'
    },
    {
      id: 2,
      type: 'grade',
      title: 'Grades posted for Fall 2023',
      description: 'Semester GPA: 3.75 - Excellent performance in all courses',
      timestamp: '2023-12-20T14:15:00Z',
      icon: 'Award',
      color: 'text-primary'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Added to Dean\'s List',
      description: 'Recognized for academic excellence in Fall 2023 semester',
      timestamp: '2023-12-18T09:00:00Z',
      icon: 'Star',
      color: 'text-accent'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Tuition payment received',
      description: 'Spring 2024 tuition payment processed successfully',
      timestamp: '2023-12-10T16:45:00Z',
      icon: 'CreditCard',
      color: 'text-success'
    },
    {
      id: 5,
      type: 'profile',
      title: 'Profile information updated',
      description: 'Contact information and emergency contacts updated',
      timestamp: '2023-11-28T11:20:00Z',
      icon: 'User',
      color: 'text-muted-foreground'
    },
    {
      id: 6,
      type: 'enrollment',
      title: 'Course registration completed',
      description: 'Registered for Fall 2023 semester courses',
      timestamp: '2023-08-15T13:30:00Z',
      icon: 'Calendar',
      color: 'text-primary'
    }
  ];

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getActivityTypeLabel = (type) => {
    const types = {
      enrollment: 'Enrollment',
      grade: 'Academic',
      achievement: 'Achievement',
      payment: 'Financial',
      profile: 'Profile',
      system: 'System'
    };
    return types?.[type] || 'Activity';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="Clock" size={18} className="text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
      </div>
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <div key={activity?.id} className="relative">
            {/* Timeline Line */}
            {index !== activities?.length - 1 && (
              <div className="absolute left-6 top-12 w-px h-16 bg-border" />
            )}
            
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-card border-2 border-border flex items-center justify-center flex-shrink-0">
                <Icon name={activity?.icon} size={18} className={activity?.color} />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground">{activity?.title}</h4>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {formatTimestamp(activity?.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {activity?.description}
                </p>
                
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted ${activity?.color}`}>
                    {getActivityTypeLabel(activity?.type)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* View More Button */}
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full flex items-center justify-center space-x-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-micro">
          <Icon name="ChevronDown" size={16} />
          <span>View more activities</span>
        </button>
      </div>
    </div>
  );
};

export default ActivityTimelineCard;