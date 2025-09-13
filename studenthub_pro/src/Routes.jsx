import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AddStudent from './pages/add-student';
import LoginPage from './pages/login';
import StudentProfile from './pages/student-profile';
import Dashboard from './pages/dashboard';
import EditStudent from './pages/edit-student';
import StudentList from './pages/student-list';
import ProtectedRoute from './components/ProtectedRoute';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your routes here */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/add-student" element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>
          } />
          <Route path="/student-profile" element={
            <ProtectedRoute>
              <StudentProfile />
            </ProtectedRoute>
          } />
          <Route path="/edit-student" element={
            <ProtectedRoute>
              <EditStudent />
            </ProtectedRoute>
          } />
          <Route path="/student-list" element={
            <ProtectedRoute>
              <StudentList />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
