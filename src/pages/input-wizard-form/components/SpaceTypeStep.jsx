import React from 'react';
import Icon from '../../../components/AppIcon';

const SpaceTypeStep = ({ formData, errors, onChange }) => {
  const spaceTypes = [
    {
      value: 'rooftop',
      label: 'Rooftop',
      icon: 'Building2',
      description: 'Elevated urban spaces with limited soil depth',
      features: ['Weight restrictions', 'Wind exposure', 'Drainage needs']
    },
    {
      value: 'backyard',
      label: 'Small Backyard',
      icon: 'Home',
      description: 'Residential ground-level garden spaces',
      features: ['Ground access', 'Moderate space', 'Flexible planting']
    },
    {
      value: 'slope',
      label: 'Slope/Hillside',
      icon: 'Mountain',
      description: 'Inclined terrain requiring erosion control',
      features: ['Erosion risk', 'Water runoff', 'Root anchoring']
    },
    {
      value: 'farmland',
      label: 'Agricultural Land',
      icon: 'Tractor',
      description: 'Large-scale farming or cultivation areas',
      features: ['Extensive area', 'Crop rotation', 'Soil enrichment']
    }
  ];

  const handleSelect = (value) => {
    onChange({ spaceType: value });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card rounded-2xl shadow-earth-lg p-6 md:p-8 lg:p-10">
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
            Select Your Space Type
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Different spaces have unique characteristics that influence plant selection and soil regeneration strategies
          </p>
        </div>

        {errors?.spaceType && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex items-center gap-3">
            <Icon name="AlertCircle" size={20} color="var(--color-error)" />
            <p className="text-sm text-error font-medium">{errors?.spaceType}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {spaceTypes?.map((type) => (
            <button
              key={type?.value}
              onClick={() => handleSelect(type?.value)}
              className={`
                relative p-6 rounded-xl border-2 transition-organic text-left
                hover:shadow-earth-md hover:scale-[1.02]
                ${formData?.spaceType === type?.value
                  ? 'border-primary bg-primary/5 shadow-earth'
                  : 'border-border bg-background hover:border-primary/30'
                }
              `}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`
                  w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0
                  ${formData?.spaceType === type?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                  }
                `}>
                  <Icon name={type?.icon} size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground mb-1">
                    {type?.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {type?.description}
                  </p>
                </div>
                {formData?.spaceType === type?.value && (
                  <Icon name="CheckCircle2" size={24} color="var(--color-primary)" className="flex-shrink-0" />
                )}
              </div>

              <div className="space-y-2">
                {type?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Icon name="Check" size={16} color="var(--color-success)" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex gap-3">
            <Icon name="Lightbulb" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-medium">Pro Tip:</span> Each space type requires specific plant characteristics. Rooftops need shallow-rooted plants, slopes require deep-rooted erosion controllers, and farmland benefits from nitrogen-fixing cover crops.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceTypeStep;