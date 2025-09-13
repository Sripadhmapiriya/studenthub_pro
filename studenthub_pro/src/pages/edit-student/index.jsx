import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import EditStudentHeader from './components/EditStudentHeader';
import EditStudentForm from './components/EditStudentForm';

const EditStudent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  useEffect(() => {
    document.title = 'Edit Student - StudentHub Pro';
  }, []);

  // Use actual user data from AuthContext
  const mockUser = user || {
    name: "Administrator",
    email: "admin@studenthub.edu",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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