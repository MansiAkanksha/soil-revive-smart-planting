import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Button from './Button';

const AuthenticationGuard = ({ 
  children, 
  isAuthenticated = false, 
  redirectPath = '/user-registration-login',
  customMessage = 'Please sign in to access this feature'
}) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full bg-card rounded-2xl shadow-earth-lg p-8 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg 
              className="w-8 h-8 text-primary" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
          </div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">
            Authentication Required
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {customMessage}
          </p>
          <Navigate 
            to={redirectPath} 
            state={{ from: location?.pathname }} 
            replace 
          />
          <Button
            variant="default"
            size="lg"
            fullWidth
            iconName="LogIn"
            iconPosition="left"
            onClick={() => window.location.href = redirectPath}
          >
            Sign In
          </Button>
          <p className="mt-6 text-sm text-muted-foreground">
            Don't have an account?{' '}
            <a 
              href={redirectPath} 
              className="text-primary font-medium hover:underline transition-organic"
            >
              Create one now
            </a>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthenticationGuard;