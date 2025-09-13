import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'deadline': return 'Clock';
      case 'approval': return 'CheckCircle';
      case 'alert': return 'AlertTriangle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'deadline': return 'text-warning';
      case 'approval': return 'text-success';
      case 'alert': return 'text-error';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-error text-error-foreground',
      medium: 'bg-warning text-warning-foreground',
      low: 'bg-muted text-muted-foreground'
    };
    
    return colors?.[priority] || colors?.low;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            <p className="text-sm text-muted-foreground">Important updates and reminders</p>
          </div>
          <Button variant="ghost" size="sm" iconName="Settings" />
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {notifications?.map((notification) => (
            <div key={notification?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-micro">
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getNotificationColor(notification?.type)}`}>
                <Icon name={getNotificationIcon(notification?.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{notification?.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification?.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notification?.time}</p>
                  </div>
                  {notification?.priority && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(notification?.priority)}`}>
                      {notification?.priority}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-border">
          <Button variant="outline" size="sm" className="w-full">
            View all notifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;