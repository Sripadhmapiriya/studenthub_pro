import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-elevation-2">
            <Icon name="GraduationCap" size={32} color="white" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
            <Icon name="Check" size={12} color="white" />
          </div>
        </div>
      </div>

      {/* Welcome Text */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome Back
        </h1>
        <p className="text-muted-foreground text-base">
          Sign in to access your StudentHub Pro dashboard
        </p>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">2,847</div>
          <div className="text-xs text-muted-foreground">Active Students</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">156</div>
          <div className="text-xs text-muted-foreground">Courses</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;