import React from 'react';
import Icon from '../../../components/AppIcon';

const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      number: "01",
      icon: "MapPin",
      title: "Define Site Context",
      description: "Provide location and land-use context so recommendations align with regional rainfall patterns, temperature regimes, and exposure conditions.",
      features: ["City and State", "Site Type", "Area Size"]
    },
    {
      id: 2,
      number: "02",
      icon: "Layers",
      title: "Characterize Soil Constraints",
      description: "Enter soil class, light duration, and water availability to represent root-zone limitations that influence establishment and nutrient turnover.",
      features: ["Soil Texture", "Sunlight Hours", "Water Availability"]
    },
    {
      id: 3,
      number: "03",
      icon: "Sparkles",
      title: "Generate Plant Strategy",
      description: "Receive research-oriented species combinations selected for cover persistence, root architecture diversity, and regenerative ecosystem function.",
      features: ["Priority Species", "Companion Sets", "Establishment Window"]
    },
    {
      id: 4,
      number: "04",
      icon: "TrendingUp",
      title: "Evaluate Expected Outcomes",
      description: "Review projected change across organic matter, infiltration, erosion risk, and habitat support using clear monitoring indicators.",
      features: ["Impact Metrics", "Trend Views", "Thermal Effects"]
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-4">
            <Icon name="Zap" size={16} color="var(--color-accent)" />
            <span className="text-sm font-medium text-accent">Applied Workflow</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How SoilRevive Works
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A four-step decision flow that translates site data into defensible plant recommendations for long-term soil regeneration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {steps?.map((step, index) => (
            <div key={step?.id} className="relative">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-earth hover:shadow-earth-lg transition-organic border border-border">
                <div className="flex items-start gap-4 md:gap-6 mb-6">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Icon name={step?.icon} size={32} color="var(--color-primary)" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-earth">
                      <span className="text-xs font-bold text-primary-foreground">{step?.number}</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-3">
                      {step?.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                      {step?.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {step?.features?.map((feature, idx) => (
                        <div
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success/10 rounded-lg"
                        >
                          <Icon name="Check" size={14} color="var(--color-success)" />
                          <span className="text-xs md:text-sm font-medium text-success">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {index < steps?.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 w-12 lg:w-16 h-0.5 bg-border">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <Icon name="ArrowRight" size={20} color="var(--color-border)" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
