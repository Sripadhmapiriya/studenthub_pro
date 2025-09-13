import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import EditStudentHeader from './components/EditStudentHeader';
import EditStudentForm from './components/EditStudentForm';

const EditStudent = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Edit Student - StudentHub Pro';
  }, []);

  // Mock user data for header
  const mockUser = {
    name: "Administrator",
    email: "admin@studenthub.edu",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  const handleLogout = () => {
    // Mock logout functionality
    console.log('Logging out...');
    // In real app: clear tokens, redirect to login
  };

  const handleToggleDarkMode = () => {
    // Mock dark mode toggle
    console.log('Toggling dark mode...');
    // In real app: toggle theme state
  };

  const customBreadcrumbs = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Students',
      path: '/student-list',
      icon: 'Users'
    },
    {
      label: 'Edit Student',
      path: '/edit-student',
      icon: 'UserCog',
      current: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={mockUser}
        onLogout={handleLogout}
        isDarkMode={false}
        onToggleDarkMode={handleToggleDarkMode}
      />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumbs customBreadcrumbs={customBreadcrumbs} />
          <EditStudentHeader />
          <EditStudentForm />
        </div>
      </main>
    </div>
  );
};

export default EditStudent;