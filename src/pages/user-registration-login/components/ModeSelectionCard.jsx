import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModeSelectionCard = ({ mode, isSelected, onSelect }) => {
  const modeConfig = {
    urban: {
      icon: 'Building2',
      title: 'Urban Mode',
      description: 'Perfect for rooftops, small backyards, and limited spaces in urban environments',
      features: [
        'Rooftop garden solutions',
        'Small backyard optimization',
        'Container-friendly plants',
        'Space-efficient recommendations'
      ],
      color: 'var(--color-accent)'
    },
    rural: {
      icon: 'Tractor',
      title: 'Rural Mode',
      description: 'Designed for agricultural land, farmlands, and larger outdoor areas',
      features: [
        'Agricultural land enhancement',
        'Large-scale planting strategies',
        'Crop rotation compatibility',
        'Soil regeneration at scale'
      ],
      color: 'var(--color-secondary)'
    }
  };

  const config = modeConfig?.[mode];

  return (
    <div
      className={`
        relative p-6 md:p-8 rounded-2xl border-2 transition-organic cursor-pointer
        ${isSelected
          ? 'border-primary bg-primary/5 shadow-earth-md'
          : 'border-border bg-card hover:border-primary/50 hover:shadow-earth-sm'
        }
      `}
      onClick={() => onSelect(mode)}
    >
      {isSelected && (
        <div className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Check" size={18} color="var(--color-primary-foreground)" strokeWidth={3} />
        </div>
      )}
      <div className="flex items-start gap-4 mb-6">
        <div
          className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${config?.color}15` }}
        >
          <Icon name={config?.icon} size={28} color={config?.color} />
        </div>
        <div className="flex-1">
          <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-2">
            {config?.title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {config?.description}
          </p>
        </div>
      </div>
      <div className="space-y-3 mb-6">
        {config?.features?.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Check" size={14} color="var(--color-success)" strokeWidth={3} />
            </div>
            <span className="text-sm md:text-base text-foreground">{feature}</span>
          </div>
        ))}
      </div>
      <Button
        variant={isSelected ? 'default' : 'outline'}
        size="lg"
        fullWidth
        iconName={isSelected ? 'Check' : 'ArrowRight'}
        iconPosition="right"
        onClick={(e) => {
          e?.stopPropagation();
          onSelect(mode);
        }}
      >
        {isSelected ? 'Selected' : 'Select Mode'}
      </Button>
    </div>
  );
};

export default ModeSelectionCard;