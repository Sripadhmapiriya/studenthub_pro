import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumbs = ({ customBreadcrumbs = null }) => {
  const location = useLocation();
  
  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [];

    // Always start with Dashboard for student-related pages
    if (pathSegments?.length > 0 && pathSegments?.[0] !== 'dashboard') {
      breadcrumbs?.push({
        label: 'Dashboard',
        path: '/dashboard',
        icon: 'LayoutDashboard'
      });
    }

    // Generate breadcrumbs based on current path
    switch (location?.pathname) {
      case '/dashboard':
        breadcrumbs?.push({
          label: 'Dashboard',
          path: '/dashboard',
          icon: 'LayoutDashboard',
          current: true
        });
        break;
      
      case '/student-list':
        breadcrumbs?.push({
          label: 'Students',
          path: '/student-list',
          icon: 'Users',
          current: true
        });
        break;
      
      case '/add-student':
        breadcrumbs?.push(
          {
            label: 'Students',
            path: '/student-list',
            icon: 'Users'
          },
          {
            label: 'Add Student',
            path: '/add-student',
            icon: 'UserPlus',
            current: true
          }
        );
        break;
      
      case '/student-profile':
        breadcrumbs?.push(
          {
            label: 'Students',
            path: '/student-list',
            icon: 'Users'
          },
          {
            label: 'Student Profile',
            path: '/student-profile',
            icon: 'User',
            current: true
          }
        );
        break;
      
      case '/edit-student':
        breadcrumbs?.push(
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
        );
        break;
      
      default:
        // Handle dynamic routes or unknown paths
        if (pathSegments?.includes('student-profile') || pathSegments?.includes('edit-student')) {
          breadcrumbs?.push(
            {
              label: 'Students',
              path: '/student-list',
              icon: 'Users'
            },
            {
              label: pathSegments?.includes('edit-student') ? 'Edit Student' : 'Student Profile',
              path: location?.pathname,
              icon: pathSegments?.includes('edit-student') ? 'UserCog' : 'User',
              current: true
            }
          );
        }
        break;
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't render breadcrumbs on login page or if no breadcrumbs
  if (location?.pathname === '/login' || breadcrumbs?.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      {breadcrumbs?.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={16} className="text-muted-foreground/50" />
          )}
          
          {breadcrumb?.current ? (
            <span className="flex items-center space-x-1.5 text-foreground font-medium">
              {breadcrumb?.icon && <Icon name={breadcrumb?.icon} size={16} />}
              <span>{breadcrumb?.label}</span>
            </span>
          ) : (
            <Link
              to={breadcrumb?.path}
              className="flex items-center space-x-1.5 hover:text-foreground transition-micro hover-lift"
            >
              {breadcrumb?.icon && <Icon name={breadcrumb?.icon} size={16} />}
              <span>{breadcrumb?.label}</span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;