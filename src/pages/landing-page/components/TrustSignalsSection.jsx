import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignalsSection = () => {
  const certifications = [
    {
      id: 1,
      icon: "Award",
      title: "Soil Health Indicator Framework",
      description: "Recommendations aligned with measurable soil quality indicators"
    },
    {
      id: 2,
      icon: "Shield",
      title: "Climate Adaptation Criteria",
      description: "Species selection tuned for heat, rainfall, and water constraints"
    },
    {
      id: 3,
      icon: "Leaf",
      title: "Ecosystem Service Design",
      description: "Plant combinations support erosion control and habitat function"
    },
    {
      id: 4,
      icon: "BookOpen",
      title: "Evidence-Based Method",
      description: "Built from agronomy and restoration research literature"
    }
  ];

  const statistics = [
    {
      id: 1,
      value: "10,000+",
      label: "Modeled Regeneration Plans",
      icon: "CheckCircle2"
    },
    {
      id: 2,
      value: "500+",
      label: "Species Profiles",
      icon: "Database"
    },
    {
      id: 3,
      value: "85%",
      label: "Projected Soil Health Gain",
      icon: "TrendingUp"
    },
    {
      id: 4,
      value: "98%",
      label: "Recommendation Coverage",
      icon: "Heart"
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Icon name="ShieldCheck" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary">Scientific Foundation</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Backed By Science & Standards
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Recommendation logic integrates practical restoration constraints with established evidence from soil science and ecological management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
          {certifications?.map((cert) => (
            <div
              key={cert?.id}
              className="bg-card rounded-xl p-6 text-center shadow-earth hover:shadow-earth-lg transition-organic border border-border"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={cert?.icon} size={32} color="var(--color-primary)" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                {cert?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {cert?.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 border border-border">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {statistics?.map((stat) => (
              <div key={stat?.id} className="text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={stat?.icon} size={24} color="var(--color-success)" />
                </div>
                <div className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                  {stat?.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {stat?.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;
