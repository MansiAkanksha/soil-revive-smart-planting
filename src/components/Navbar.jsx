import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "./AppIcon";
import Button from "./ui/Button";

const Navbar = ({ onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/landing-page", icon: "Home" },
    { label: "Dashboard", path: "/input-wizard-form", icon: "LayoutDashboard" },
    { label: "History", path: "/history", icon: "History", newTab: true },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="header-navigation">
        <div className="flex items-center justify-between h-full max-w-9xl mx-auto">
          <Link to="/input-wizard-form" className="flex items-center gap-3">
            <div className="header-logo">
              <Icon name="Sprout" size={28} color="var(--color-primary)" />
            </div>
            <span className="font-heading font-semibold text-xl text-foreground hidden sm:block">
              SoilRevive
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                target={item.newTab ? "_blank" : undefined}
                rel={item.newTab ? "noopener noreferrer" : undefined}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-organic hover:bg-muted ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground"
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              iconName="LogOut"
              iconPosition="left"
              onClick={onLogout}
            >
              Logout
            </Button>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-organic"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[1100] md:hidden">
          <div
            className="absolute inset-0 bg-background"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <nav className="absolute top-0 right-0 w-64 h-full bg-card shadow-earth-xl p-6 overflow-y-auto">
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-muted transition-organic"
                aria-label="Close menu"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  target={item.newTab ? "_blank" : undefined}
                  rel={item.newTab ? "noopener noreferrer" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-organic hover:bg-muted ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground"
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
              <Button
                variant="ghost"
                fullWidth
                iconName="LogOut"
                iconPosition="left"
                onClick={() => {
                  onLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="mt-4 justify-start"
              >
                Logout
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
