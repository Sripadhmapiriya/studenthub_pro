import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import LoadingGuard from '../../components/ui/LoadingGuard';
import MetricCard from './components/MetricCard';
import QuickActionCard from './components/QuickActionCard';
import RecentActivityFeed from './components/RecentActivityFeed';
import EnrollmentChart from './components/EnrollmentChart';
import CoursePopularityChart from './components/CoursePopularityChart';
import NotificationPanel from './components/NotificationPanel';
import Button from '../../components/ui/Button';


const Dashboard = () => {
  const navigate = useNavigate();
  const { user: authUser, logout, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Use actual authenticated user data
  const user = authUser ? {
    name: authUser.username || authUser.email || "User",
    email: authUser.email || "",
    role: authUser.role || "User"
  } : null;

  // Mock data for dashboard metrics
  const metrics = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12.5%",
      changeType: "positive",
      icon: "Users",
      gradient: "gradient-primary",
      description: "Active enrolled students"
    },
    {
      title: "Active Enrollments",
      value: "2,634",
      change: "+8.2%",
      changeType: "positive",
      icon: "BookOpen",
      gradient: "gradient-accent",
      description: "Currently enrolled"
    },
    {
      title: "Course Programs",
      value: "47",
      change: "+3",
      changeType: "positive",
      icon: "GraduationCap",
      gradient: "bg-success",
      description: "Available programs"
    },
    {
      title: "New Registrations",
      value: "156",
      change: "-2.1%",
      changeType: "negative",
      icon: "UserPlus",
      gradient: "bg-warning",
      description: "This month"
    }
  ];

  // Mock data for quick actions
  const quickActions = [
    {
      title: "Manage Students",
      description: "View, edit, and manage all student records in the system",
      icon: "Users",
      route: "/student-list",
      buttonText: "View Students",
      gradient: "gradient-primary"
    },
    {
      title: "Add New Student",
      description: "Register a new student with complete profile information",
      icon: "UserPlus",
      route: "/add-student",
      buttonText: "Add Student",
      gradient: "gradient-accent"
    },
    {
      title: "Generate Reports",
      description: "Create comprehensive reports and export student data",
      icon: "FileText",
      route: "/student-list",
      buttonText: "Create Report",
      gradient: "bg-success"
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: "enrollment",
      description: "Emily Rodriguez enrolled in Computer Science Program",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      type: "update",
      description: "Michael Chen updated profile information",
      timestamp: new Date(Date.now() - 900000)
    },
    {
      id: 3,
      type: "graduation",
      description: "Sarah Williams completed Business Administration",
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 4,
      type: "payment",
      description: "David Thompson submitted tuition payment",
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 5,
      type: "enrollment",
      description: "Jessica Martinez enrolled in Psychology Program",
      timestamp: new Date(Date.now() - 7200000)
    }
  ];

  // Mock data for enrollment trends
  const enrollmentData = [
    { month: 'Jan', enrollments: 245 },
    { month: 'Feb', enrollments: 289 },
    { month: 'Mar', enrollments: 312 },
    { month: 'Apr', enrollments: 278 },
    { month: 'May', enrollments: 334 },
    { month: 'Jun', enrollments: 298 },
    { month: 'Jul', enrollments: 356 },
    { month: 'Aug', enrollments: 423 },
    { month: 'Sep', enrollments: 387 },
    { month: 'Oct', enrollments: 445 },
    { month: 'Nov', enrollments: 412 },
    { month: 'Dec', enrollments: 389 }
  ];

  // Mock data for course popularity
  const courseData = [
    { course: 'Computer Science', students: 487 },
    { course: 'Business Admin', students: 423 },
    { course: 'Psychology', students: 356 },
    { course: 'Engineering', students: 334 },
    { course: 'Medicine', students: 298 },
    { course: 'Arts & Design', students: 267 },
    { course: 'Mathematics', students: 234 },
    { course: 'Physics', students: 198 }
  ];

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      type: "deadline",
      title: "Registration Deadline",
      message: "Spring semester registration closes in 3 days",
      time: "2 hours ago",
      priority: "high"
    },
    {
      id: 2,
      type: "approval",
      title: "Course Approval",
      message: "New Data Science course has been approved",
      time: "4 hours ago",
      priority: "medium"
    },
    {
      id: 3,
      type: "alert",
      title: "System Maintenance",
      message: "Scheduled maintenance on Sunday 2:00 AM - 4:00 AM",
      time: "1 day ago",
      priority: "low"
    },
    {
      id: 4,
      type: "info",
      title: "New Feature",
      message: "Bulk student import feature is now available",
      time: "2 days ago",
      priority: "medium"
    }
  ];

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Load dark mode preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }

    return () => clearTimeout(timer);
  }, []);

  const handleToggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    document.documentElement?.classList?.toggle('dark', newMode);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <LoadingGuard isLoading={isLoading} isAuthenticated={true}>
        <div />
      </LoadingGuard>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={user}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumbs />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, {user?.name?.split(' ')?.[1]}! 👋
                </h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your student management system today.
                </p>
              </div>
              <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => navigate('/student-list')}
                >
                  Export Data
                </Button>
                <Button
                  variant="default"
                  iconName="UserPlus"
                  iconPosition="left"
                  onClick={() => navigate('/add-student')}
                  className="gradient-primary"
                >
                  Add New Student
                </Button>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics?.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions?.map((action, index) => (
                <QuickActionCard key={index} {...action} />
              ))}
            </div>
          </div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <EnrollmentChart data={enrollmentData} />
            <CoursePopularityChart data={courseData} />
          </div>

          {/* Activity Feed and Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentActivityFeed activities={recentActivities} />
            </div>
            <div>
              <NotificationPanel notifications={notifications} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;