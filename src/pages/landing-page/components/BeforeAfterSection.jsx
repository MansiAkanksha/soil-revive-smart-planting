import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const BeforeAfterSection = () => {
  const [activeTab, setActiveTab] = useState('rooftop');
  const beforeImage = "/assets/pictures/soil-degraded.png";
  const afterImage = "/assets/pictures/soil-regenerated.png";
  const beforeImageFallback = "/assets/pictures/soil-degraded.jpg";
  const afterImageFallback = "/assets/pictures/soil-regenerated.jpg";

  const scenarios = [
  {
    id: 'rooftop',
    label: 'Rooftop Garden',
    icon: 'Building2',
    before: {
      image: beforeImage,
      imageAlt: "Bare concrete rooftop with exposed gray surface showing cracks and weathering under high solar exposure and no vegetative cover",
      title: "Low-Function Roof Surface",
      issues: ["Surface heating near 45 C", "No thermal buffering", "No biological cover", "High heat-island contribution"]
    },
    after: {
      image: afterImage,
      imageAlt: "Rooftop retrofit with mixed vegetation in raised beds and modular planters improving cover density and microclimate",
      title: "Regenerative Roof Layer",
      benefits: ["Peak temperature reduced up to 8 C", "Improved insulation behavior", "Added productive biomass", "Pollinator support habitat"]
    }
  },
  {
    id: 'slope',
    label: 'Slope Erosion',
    icon: 'Mountain',
    before: {
      image: beforeImage,
      imageAlt: "Bare hillside with exposed soil, rill formation, and visible topsoil displacement after runoff events",
      title: "Unstable Eroding Slope",
      issues: ["Topsoil loss near 15 cm/year", "High runoff velocity", "Progressive nutrient depletion", "Elevated slope-failure risk"]
    },
    after: {
      image: afterImage,
      imageAlt: "Slope stabilized with layered groundcover, grasses, and shrubs creating dense root reinforcement",
      title: "Stabilized Vegetative Matrix",
      benefits: ["Up to 85% erosion-risk reduction", "Higher infiltration capacity", "Root-zone mechanical stability", "Restored local habitat function"]
    }
  },
  {
    id: 'backyard',
    label: 'Small Backyard',
    icon: 'Home',
    before: {
      image: beforeImage,
      imageAlt: "Compacted residential soil with sparse vegetation, low infiltration, and patchy cover",
      title: "Compacted Low-Carbon Soil",
      issues: ["Limited infiltration", "Low organic carbon", "Reduced biological activity", "High irrigation dependence"]
    },
    after: {
      image: afterImage,
      imageAlt: "Residential plot converted to mixed functional planting with improved cover and visible soil structure",
      title: "Regenerated Garden Soil",
      benefits: ["Organic matter trend up to 60%", "Improved self-mulching cover", "Increased pollinator visitation", "Lower seasonal inputs"]
    }
  }];


  const activeScenario = scenarios?.find((s) => s?.id === activeTab);

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full mb-4">
            <Icon name="RefreshCw" size={16} color="var(--color-success)" />
            <span className="text-sm font-medium text-success">Field-Informed Comparisons</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Soil Function Before and After
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Compare baseline constraints with projected regenerative outcomes across common urban and peri-urban land-use scenarios.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-12">
          {scenarios?.map((scenario) =>
          <button
            key={scenario?.id}
            onClick={() => setActiveTab(scenario?.id)}
            className={`
                flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl font-medium transition-organic
                ${activeTab === scenario?.id ?
            'bg-primary text-primary-foreground shadow-earth' :
            'bg-card text-foreground hover:bg-muted border border-border'}
              `
            }>
            
              <Icon name={scenario?.icon} size={20} />
              <span className="text-sm md:text-base">{scenario?.label}</span>
            </button>
          )}
        </div>

        {activeScenario &&
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            <div className="bg-card rounded-2xl overflow-hidden shadow-earth border border-border">
              <div className="relative">
                <Image
                src={activeScenario?.before?.image}
                alt={activeScenario?.before?.imageAlt}
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
                onError={(e) => {
                  if (!e.currentTarget.dataset.fallbackTried) {
                    e.currentTarget.dataset.fallbackTried = "true";
                    e.currentTarget.src = beforeImageFallback;
                    return;
                  }
                  e.currentTarget.src = beforeImage;
                }}
              />
              
                <div className="absolute top-4 left-4 px-4 py-2 bg-error/90 backdrop-blur-sm rounded-lg">
                  <span className="text-sm font-semibold text-error-foreground">Before</span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  {activeScenario?.before?.title}
                </h3>
                <div className="space-y-3">
                  {activeScenario?.before?.issues?.map((issue, idx) =>
                <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-error/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="X" size={12} color="var(--color-error)" />
                      </div>
                      <span className="text-sm md:text-base text-muted-foreground">{issue}</span>
                    </div>
                )}
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl overflow-hidden shadow-earth border border-primary/30">
              <div className="relative">
                <Image
                src={activeScenario?.after?.image}
                alt={activeScenario?.after?.imageAlt}
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
                onError={(e) => {
                  if (!e.currentTarget.dataset.fallbackTried) {
                    e.currentTarget.dataset.fallbackTried = "true";
                    e.currentTarget.src = afterImageFallback;
                    return;
                  }
                  e.currentTarget.src = afterImage;
                }}
              />
              
                <div className="absolute top-4 left-4 px-4 py-2 bg-success/90 backdrop-blur-sm rounded-lg">
                  <span className="text-sm font-semibold text-success-foreground">After</span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  {activeScenario?.after?.title}
                </h3>
                <div className="space-y-3">
                  {activeScenario?.after?.benefits?.map((benefit, idx) =>
                <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={12} color="var(--color-success)" />
                      </div>
                      <span className="text-sm md:text-base text-foreground font-medium">{benefit}</span>
                    </div>
                )}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </section>);

};

export default BeforeAfterSection;
