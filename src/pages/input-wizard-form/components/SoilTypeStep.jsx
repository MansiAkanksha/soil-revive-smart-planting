import React from 'react';
import Icon from '../../../components/AppIcon';

const SoilTypeStep = ({ formData, errors, onChange }) => {
  const soilTypes = [
    {
      value: 'clay',
      label: 'Clay Soil',
      icon: 'Droplets',
      color: 'bg-amber-600',
      description: 'Heavy, dense soil that retains water but drains poorly',
      characteristics: ['High water retention', 'Poor drainage', 'Nutrient-rich', 'Compacts easily'],
      challenges: 'Prone to waterlogging and compaction'
    },
    {
      value: 'sandy',
      label: 'Sandy Soil',
      icon: 'Wind',
      color: 'bg-yellow-600',
      description: 'Light, gritty soil with excellent drainage',
      characteristics: ['Fast drainage', 'Low water retention', 'Low nutrients', 'Easy to work'],
      challenges: 'Requires frequent watering and fertilization'
    },
    {
      value: 'loamy',
      label: 'Loamy Soil',
      icon: 'Leaf',
      color: 'bg-green-700',
      description: 'Ideal balanced mixture of sand, silt, and clay',
      characteristics: ['Balanced drainage', 'Good water retention', 'Nutrient-rich', 'Easy cultivation'],
      challenges: 'Minimal challenges - optimal soil type'
    },
    {
      value: 'dry',
      label: 'Dry/Arid Soil',
      icon: 'Sun',
      color: 'bg-orange-600',
      description: 'Low moisture content with minimal organic matter',
      characteristics: ['Very low moisture', 'Poor structure', 'Low fertility', 'Drought-prone'],
      challenges: 'Requires drought-tolerant species'
    },
    {
      value: 'compact',
      label: 'Compact Soil',
      icon: 'Layers',
      color: 'bg-stone-700',
      description: 'Dense, hard-packed soil with poor aeration',
      characteristics: ['Poor air circulation', 'Restricted root growth', 'Water pooling', 'Hard surface'],
      challenges: 'Needs soil loosening and organic matter'
    }
  ];

  const handleSelect = (value) => {
    onChange({ soilType: value });
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-card rounded-2xl shadow-earth-lg p-6 md:p-8 lg:p-10">
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
            Identify Your Soil Type
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Understanding your soil composition is crucial for selecting plants that will thrive and improve soil health
          </p>
        </div>

        {errors?.soilType && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex items-center gap-3">
            <Icon name="AlertCircle" size={20} color="var(--color-error)" />
            <p className="text-sm text-error font-medium">{errors?.soilType}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {soilTypes?.map((type) => (
            <button
              key={type?.value}
              onClick={() => handleSelect(type?.value)}
              className={`
                relative p-6 rounded-xl border-2 transition-organic text-left
                hover:shadow-earth-md hover:scale-[1.02]
                ${formData?.soilType === type?.value
                  ? 'border-primary bg-primary/5 shadow-earth'
                  : 'border-border bg-background hover:border-primary/30'
                }
              `}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${type?.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <Icon name={type?.icon} size={24} color="#FFFFFF" />
                </div>
                {formData?.soilType === type?.value && (
                  <Icon name="CheckCircle2" size={24} color="var(--color-primary)" />
                )}
              </div>

              <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground mb-2">
                {type?.label}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {type?.description}
              </p>

              <div className="space-y-2 mb-4">
                {type?.characteristics?.slice(0, 3)?.map((char, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-xs text-foreground">{char}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Challenge:</span> {type?.challenges}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
            <div className="flex gap-3">
              <Icon name="HelpCircle" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-foreground font-medium mb-1">
                  Not sure about your soil type?
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Perform a simple squeeze test: Wet soil and squeeze it. Clay forms a tight ball, sandy soil crumbles, loamy soil holds shape but breaks easily.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex gap-3">
              <Icon name="Sprout" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-foreground font-medium mb-1">
                  Soil regeneration potential
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All soil types can be improved! We'll recommend plants that specifically address your soil's challenges and enhance its structure over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilTypeStep;