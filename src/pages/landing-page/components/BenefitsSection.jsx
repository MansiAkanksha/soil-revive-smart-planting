import React from 'react';
import Icon from '../../../components/AppIcon';

const BenefitsSection = () => {
  const benefits = [
    {
      id: 1,
      icon: "Leaf",
      title: "Soil Organic Carbon Recovery",
      description: "Increase biologically active organic matter through residue-producing species and root exudates that support aggregate stability and nutrient cycling.",
      stat: "60%",
      statLabel: "SOC Potential",
      color: "success"
    },
    {
      id: 2,
      icon: "Droplets",
      title: "Infiltration and Water Holding",
      description: "Improve infiltration and available water capacity with deep and fibrous root systems that reduce runoff and increase profile recharge.",
      stat: "50%",
      statLabel: "Retention Gain",
      color: "primary"
    },
    {
      id: 3,
      icon: "Mountain",
      title: "Erosion Risk Reduction",
      description: "Lower erosion pressure by maintaining continuous surface cover and root reinforcement that protects topsoil from wind and intense rainfall.",
      stat: "85%",
      statLabel: "Risk Reduction",
      color: "accent"
    },
    {
      id: 4,
      icon: "Bug",
      title: "Functional Biodiversity",
      description: "Strengthen ecological function by supporting pollinators, decomposers, and predatory arthropods linked to resilient soil food webs.",
      stat: "200+",
      statLabel: "Indicator Taxa",
      color: "secondary"
    },
    {
      id: 5,
      icon: "Thermometer",
      title: "Surface Temperature Moderation",
      description: "Reduce peak surface temperatures through canopy shading and evapotranspiration, improving rhizosphere conditions during heat stress.",
      stat: "8 C",
      statLabel: "Peak Reduction",
      color: "warning"
    },
    {
      id: 6,
      icon: "Sprout",
      title: "Locally Adapted Species",
      description: "Prioritize ecologically matched species that establish faster, require fewer inputs, and maintain long-term regenerative performance.",
      stat: "60%",
      statLabel: "Input Reduction",
      color: "success"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      success: "bg-success/10 text-success",
      primary: "bg-primary/10 text-primary",
      accent: "bg-accent/10 text-accent",
      secondary: "bg-secondary/10 text-secondary",
      warning: "bg-warning/10 text-warning"
    };
    return colors?.[color] || colors?.success;
  };

  return (
    <section id="benefits" className="py-12 md:py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Icon name="Sparkles" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary">Science-Backed Benefits</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Measurable Soil System Outcomes
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Recommendation sets are aligned with established soil health metrics, enabling improvements in structure, moisture dynamics, and ecological function.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits?.map((benefit) => (
            <div
              key={benefit?.id}
              className="group bg-card rounded-2xl p-6 md:p-8 shadow-earth hover:shadow-earth-lg transition-organic border border-border hover:border-primary/30"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center ${getColorClasses(benefit?.color)} transition-organic group-hover:scale-110`}>
                  <Icon name={benefit?.icon} size={28} />
                </div>
                <div className="text-right">
                  <div className="text-2xl md:text-3xl font-heading font-bold text-foreground">{benefit?.stat}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{benefit?.statLabel}</div>
                </div>
              </div>

              <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-3">
                {benefit?.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {benefit?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
