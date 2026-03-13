import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const HeaderNavigation = ({ isAuthenticated = false, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/landing-page', requiresAuth: false, icon: 'Home' },
    { label: 'Get Started', path: '/user-registration-login', requiresAuth: false, icon: 'LogIn' },
    { label: 'Assessment', path: '/input-wizard-form', requiresAuth: true, icon: 'ClipboardList' },
  ];

  const visibleItems = navigationItems?.filter(item => 
    !item?.requiresAuth || (item?.requiresAuth && isAuthenticated)
  );

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header-navigation">
        <div className="flex items-center justify-between h-full max-w-9xl mx-auto">
          <Link to="/landing-page" className="flex items-center gap-3" onClick={closeMobileMenu}>
            <div className="header-logo">
              <Icon name="Sprout" size={28} color="var(--color-primary)" />
            </div>
            <span className="font-heading font-semibold text-xl text-foreground hidden sm:block">
              SoilRevive
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {visibleItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                  transition-organic hover:bg-muted
                  ${isActivePath(item?.path) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground'
                  }
                `}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                iconName="LogOut"
                iconPosition="left"
                onClick={onLogout}
                className="ml-2"
              >
                Logout
              </Button>
            )}
          </nav>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-organic"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[1100] md:hidden">
          <div 
            className="absolute inset-0 bg-background"
            onClick={closeMobileMenu}
          />
          <nav className="absolute top-0 right-0 w-64 h-full bg-card shadow-earth-xl p-6 overflow-y-auto">
            <div className="flex justify-end mb-6">
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-muted transition-organic"
                aria-label="Close menu"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {visibleItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg font-medium
                    transition-organic hover:bg-muted
                    ${isActivePath(item?.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  fullWidth
                  iconName="LogOut"
                  iconPosition="left"
                  onClick={() => {
                    onLogout();
                    closeMobileMenu();
                  }}
                  className="mt-4 justify-start"
                >
                  Logout
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default HeaderNavigation;