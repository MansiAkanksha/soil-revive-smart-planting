import React from 'react';
import { BrowserRouter, Navigate, Routes as RouterRoutes, Route } from 'react-router-dom';
import ScrollToTop from 'components/ScrollToTop';
import ErrorBoundary from 'components/ErrorBoundary';
import NotFound from 'pages/NotFound';
import InputWizardForm from './pages/input-wizard-form';
import LandingPage from './pages/landing-page';
import UserRegistrationLogin from './pages/user-registration-login';
import RecommendationsPage from './pages/recommendations';
import History from './pages/History';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/user-registration-login" replace />;
  }
  return children;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/input-wizard-form"
            element={
              <ProtectedRoute>
                <InputWizardForm />
              </ProtectedRoute>
            }
          />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
          <Route
            path="/recommendations"
            element={
              <ProtectedRoute>
                <RecommendationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
