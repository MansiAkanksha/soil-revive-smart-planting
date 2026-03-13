import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import Navbar from '../../components/Navbar';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import HowItWorksSection from './components/HowItWorksSection';
import BeforeAfterSection from './components/BeforeAfterSection';
import TrustSignalsSection from './components/TrustSignalsSection';
import CTASection from './components/CTASection';
import FooterSection from './components/FooterSection';
import HistoryPreviewSection from './components/HistoryPreviewSection';
import CommunityImpactSection from './components/CommunityImpactSection';
import { useAuth } from '../../context/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/user-registration-login');
  };

  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated ? (
        <Navbar onLogout={handleLogout} />
      ) : (
        <HeaderNavigation isAuthenticated={false} onLogout={() => {}} />
      )}
      
      <main className="pt-[60px]">
        <HeroSection />
        <BenefitsSection />
        <HowItWorksSection />
        <BeforeAfterSection />
        <TrustSignalsSection />
        <CommunityImpactSection />
        <HistoryPreviewSection />
        <CTASection />
      </main>

      <FooterSection />
    </div>
  );
};

export default LandingPage;
