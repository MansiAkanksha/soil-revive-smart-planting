import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ModeSelectionCard from './components/ModeSelectionCard';
import SuccessMessage from './components/SuccessMessage';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../context/AuthContext';

const UserRegistrationLogin = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [authStep, setAuthStep] = useState(isAuthenticated ? 'mode-selection' : 'auth');
  const [userData, setUserData] = useState(user);
  const [selectedMode, setSelectedMode] = useState(null);

  const handleLoginSuccess = (data) => {
    setUserData(data);
    setAuthStep('mode-selection');
  };

  const handleRegisterSuccess = (data) => {
    setUserData(data);
    setAuthStep('mode-selection');
  };

  const handleModeSelection = (mode) => {
    setSelectedMode(mode);
  };

  const handleContinue = () => {
    if (selectedMode) {
      navigate('/input-wizard-form', {
        state: {
          user: userData,
          mode: selectedMode
        }
      });
    }
  };

  const handleLogout = () => {
    logout();
    setUserData(null);
    setAuthStep('auth');
    setSelectedMode(null);
    setActiveTab('login');
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout}
      />
      <main className="pt-[60px]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          {authStep === 'auth' && (
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon name="Sprout" size={36} color="var(--color-primary)" />
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-3">
                  Welcome to SoilRevive
                </h1>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Start your journey towards sustainable soil regeneration
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-earth-lg p-6 md:p-8">
                <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

                {activeTab === 'login' ? (
                  <LoginForm
                    onLoginSuccess={handleLoginSuccess}
                    onSwitchToRegister={() => setActiveTab('register')}
                  />
                ) : (
                  <RegisterForm
                    onRegisterSuccess={handleRegisterSuccess}
                    onSwitchToLogin={() => setActiveTab('login')}
                  />
                )}
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
                <button
                  onClick={() => navigate('/landing-page')}
                  className="text-sm font-medium text-primary hover:underline transition-organic inline-flex items-center gap-2"
                >
                  <Icon name="ArrowLeft" size={16} />
                  Back to Home
                </button>
              </div>
            </div>
          )}

          {authStep === 'mode-selection' && (
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <SuccessMessage
                  message="Your account is ready! Now, let's customize your experience by selecting the mode that best fits your needs."
                  userName={userData?.name || userData?.fullName || userData?.email?.split('@')?.[0]}
                />
              </div>

              <div className="mb-8 md:mb-12">
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground text-center mb-4">
                  Choose Your Mode
                </h2>
                <p className="text-base md:text-lg text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
                  Select the mode that matches your space and goals. You can always change this later in your settings.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
                <ModeSelectionCard
                  mode="urban"
                  isSelected={selectedMode === 'urban'}
                  onSelect={handleModeSelection}
                />
                <ModeSelectionCard
                  mode="rural"
                  isSelected={selectedMode === 'rural'}
                  onSelect={handleModeSelection}
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="ArrowLeft"
                  iconPosition="left"
                  onClick={handleLogout}
                  className="w-full sm:w-auto"
                >
                  Back to Login
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  disabled={!selectedMode}
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={handleContinue}
                  className="w-full sm:w-auto"
                >
                  Continue to Assessment
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-card border-t border-border py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon name="Sprout" size={20} color="var(--color-primary)" />
              </div>
              <span className="font-heading font-semibold text-lg text-foreground">
                SoilRevive
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {new Date()?.getFullYear()} SoilRevive. All rights reserved. Cultivating sustainable futures.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserRegistrationLogin;
