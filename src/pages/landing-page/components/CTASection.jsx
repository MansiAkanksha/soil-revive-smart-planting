import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
          <Icon name="Sparkles" size={16} color="white" />
          <span className="text-sm font-medium text-white">Begin Your Soil Recovery Plan</span>
        </div>

        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to Build a Defensible Regeneration Strategy?
        </h2>

        <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto">
          Generate site-specific recommendations grounded in soil function, plant ecology, and climate context, then track projected impact over time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            variant="secondary"
            size="xl"
            iconName="Sprout"
            iconPosition="left"
            onClick={() => navigate('/user-registration-login')}
            className="shadow-earth-lg hover:shadow-earth-xl bg-white text-primary hover:bg-white/95"
          >
            Create Research Profile
          </Button>
          <Button
            variant="outline"
            size="xl"
            iconName="PlayCircle"
            iconPosition="left"
            onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-white text-white hover:bg-white/10"
          >
            Watch Demo
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 pt-8 border-t border-white/20">
          <div className="flex items-center gap-2 text-white/90">
            <Icon name="Check" size={20} color="white" />
            <span className="text-sm md:text-base">No credit card required</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <Icon name="Check" size={20} color="white" />
            <span className="text-sm md:text-base">Site-specific plant recommendations</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <Icon name="Check" size={20} color="white" />
            <span className="text-sm md:text-base">Metrics-driven outcome summaries</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
