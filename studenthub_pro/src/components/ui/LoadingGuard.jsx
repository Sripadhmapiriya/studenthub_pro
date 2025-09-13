import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const LoadingGuard = ({ 
  children, 
  isAuthenticated, 
  isLoading, 
  requireAuth = true,
  redirectTo = '/login' 
}) => {
  const [showContent, setShowContent] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!isLoading) {
      // Small delay to prevent flash of content
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Show loading state
  if (isLoading || !showContent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
              <Icon name="GraduationCap" size={24} color="white" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-1">StudentHub Pro</h3>
            <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Handle authentication requirements
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated && location?.pathname === '/login') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Higher-order component for protecting routes
export const withAuthGuard = (Component, options = {}) => {
  const WrappedComponent = (props) => (
    <LoadingGuard {...options}>
      <Component {...props} />
    </LoadingGuard>
  );
  return WrappedComponent;
};

// Loading skeleton for content areas
export const ContentSkeleton = ({ lines = 3, showHeader = true }) => {
  return (
    <div className="animate-pulse space-y-4">
      {showHeader && (
        <div className="space-y-2">
          <div className="h-8 bg-muted rounded-lg w-1/3" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
      )}
      <div className="space-y-3">
        {Array.from({ length: lines })?.map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Table skeleton for data tables
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns })?.map((_, index) => (
            <div key={index} className="h-4 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>
      {/* Rows */}
      <div className="divide-y divide-border">
        {Array.from({ length: rows })?.map((_, rowIndex) => (
          <div key={rowIndex} className="p-4">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns })?.map((_, colIndex) => (
                <div key={colIndex} className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  {colIndex === 0 && <div className="h-3 bg-muted/60 rounded w-2/3 animate-pulse" />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingGuard;