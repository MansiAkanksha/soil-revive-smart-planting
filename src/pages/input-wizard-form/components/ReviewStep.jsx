import React from 'react';
import Icon from '../../../components/AppIcon';

const ReviewStep = ({ formData }) => {
  const sections = [
    {
      title: 'Location',
      icon: 'MapPin',
      color: 'bg-blue-600',
      items: [
        { label: 'City', value: formData?.city },
        { label: 'State', value: formData?.state }
      ]
    },
    {
      title: 'Space Details',
      icon: 'Home',
      color: 'bg-green-600',
      items: [
        { 
          label: 'Space Type', 
          value: formData?.spaceType ? formData?.spaceType?.charAt(0)?.toUpperCase() + formData?.spaceType?.slice(1) : ''
        },
        { 
          label: 'Soil Type', 
          value: formData?.soilType ? formData?.soilType?.charAt(0)?.toUpperCase() + formData?.soilType?.slice(1) : ''
        }
      ]
    },
    {
      title: 'Environmental Conditions',
      icon: 'CloudSun',
      color: 'bg-amber-600',
      items: [
        { label: 'Sunlight Hours', value: `${formData?.sunlightHours} hours/day` },
        { 
          label: 'Water Availability', 
          value: formData?.waterAvailability ? formData?.waterAvailability?.charAt(0)?.toUpperCase() + formData?.waterAvailability?.slice(1) : ''
        },
        { 
          label: 'Area Size', 
          value: `${formData?.areaSize} ${formData?.areaUnit === 'sqft' ? 'sq ft' : 'sq m'}`
        }
      ]
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card rounded-2xl shadow-earth-lg p-6 md:p-8 lg:p-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle2" size={32} color="var(--color-success)" />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
            Review Your Information
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Please verify all details before generating your personalized plant recommendations
          </p>
        </div>

        <div className="space-y-6">
          {sections?.map((section, index) => (
            <div 
              key={index}
              className="bg-background rounded-xl border border-border p-6 hover:shadow-earth transition-organic"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${section?.color} rounded-full flex items-center justify-center`}>
                  <Icon name={section?.icon} size={20} color="#FFFFFF" />
                </div>
                <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground">
                  {section?.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section?.items?.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex flex-col">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                      {item?.label}
                    </span>
                    <span className="text-sm md:text-base text-foreground font-medium">
                      {item?.value || 'Not specified'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-primary/10 rounded-xl border border-primary/20">
          <div className="flex gap-4">
            <Icon name="Sparkles" size={24} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-base font-semibold text-foreground mb-2">
                What happens next?
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                  <span>Our algorithm analyzes your micro-environment conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                  <span>We match scientifically-proven plant combinations for your space</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                  <span>You'll receive detailed planting guides and soil regeneration projections</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex gap-3">
            <Icon name="Info" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-medium">Need to make changes?</span> Use the "Previous" button to go back and edit any section. Your progress is saved automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;