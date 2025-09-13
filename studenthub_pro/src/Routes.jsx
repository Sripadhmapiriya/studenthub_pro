import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AddStudent from './pages/add-student';
import LoginPage from './pages/login';
import StudentProfile from './pages/student-profile';
import Dashboard from './pages/dashboard';
import EditStudent from './pages/edit-student';
import StudentList from './pages/student-list';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AddStudent />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-student" element={<EditStudent />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
