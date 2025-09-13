import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ user, onLogout, isDarkMode, onToggleDarkMode }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Students', path: '/student-list', icon: 'Users' },
  ];

  const isActivePath = (path) => {
    if (path === '/dashboard') {
      return location?.pathname === '/dashboard';
    }
    if (path === '/student-list') {
      return location?.pathname?.startsWith('/student') || location?.pathname === '/add-student';
    }
    return location?.pathname === path;
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    onLogout();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-elevation-1">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-primary">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">StudentHub Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-micro hover-lift ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleDarkMode}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={18} />
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                onClick={handleUserMenuToggle}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <span className="text-sm font-medium">{user?.name || 'Admin'}</span>
                <Icon name="ChevronDown" size={16} />
              </Button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-3 py-1">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="text-sm font-medium text-foreground">{user?.name || 'Administrator'}</p>
                    <p className="text-xs text-muted-foreground">{user?.email || 'admin@studenthub.edu'}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-micro"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMobileMenuToggle}
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
          </Button>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={handleMobileMenuToggle} />
          <div className="fixed top-16 left-0 right-0 bg-card border-b border-border shadow-elevation-3 p-6">
            <nav className="space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={handleMobileMenuToggle}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-micro ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.name}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Icon name="User" size={18} color="white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{user?.name || 'Administrator'}</p>
                    <p className="text-xs text-muted-foreground">{user?.email || 'admin@studenthub.edu'}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleDarkMode}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={18} />
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full justify-start"
                iconName="LogOut"
                iconPosition="left"
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;