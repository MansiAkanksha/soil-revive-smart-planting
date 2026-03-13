import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const EnvironmentStep = ({ formData, errors, onChange }) => {
  const waterAvailabilityOptions = [
    { 
      value: 'low', 
      label: 'Low - Minimal irrigation available',
      description: 'Rainwater only or very limited watering capacity'
    },
    { 
      value: 'medium', 
      label: 'Medium - Regular watering possible',
      description: 'Can water 2-3 times per week consistently'
    },
    { 
      value: 'high', 
      label: 'High - Abundant water access',
      description: 'Daily watering or automated irrigation system'
    }
  ];

  const handleChange = (field) => (e) => {
    const value = e?.target?.value;
    onChange({ [field]: value });
  };

  const handleSelectChange = (field) => (value) => {
    onChange({ [field]: value });
  };

  const handleSliderChange = (e) => {
    onChange({ sunlightHours: e?.target?.value });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-2xl shadow-earth-lg p-6 md:p-8 lg:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="CloudSun" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
              Environmental Conditions
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Light and water availability shape plant selection
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-foreground mb-4">
              Daily Sunlight Hours <span className="text-error">*</span>
            </label>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.5"
                  value={formData?.sunlightHours}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>0h</span>
                  <span>3h</span>
                  <span>6h</span>
                  <span>9h</span>
                  <span>12h</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-3">
                  <Icon name="Sun" size={24} color="var(--color-primary)" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Selected: {formData?.sunlightHours} hours per day
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formData?.sunlightHours < 4 && 'Shade to partial shade conditions'}
                      {formData?.sunlightHours >= 4 && formData?.sunlightHours < 8 && 'Partial sun to partial shade'}
                      {formData?.sunlightHours >= 8 && 'Full sun conditions'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {errors?.sunlightHours && (
              <p className="text-sm text-error mt-2 flex items-center gap-2">
                <Icon name="AlertCircle" size={16} />
                {errors?.sunlightHours}
              </p>
            )}
          </div>

          <Select
            label="Water Availability"
            description="How frequently can you water your plants?"
            options={waterAvailabilityOptions}
            value={formData?.waterAvailability}
            onChange={handleSelectChange('waterAvailability')}
            error={errors?.waterAvailability}
            required
            placeholder="Select water availability level"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Area Size"
              type="number"
              placeholder="Enter area size"
              value={formData?.areaSize}
              onChange={handleChange('areaSize')}
              error={errors?.areaSize}
              required
              min="1"
              description="Total planting area"
            />

            <Select
              label="Unit"
              options={[
                { value: 'sqft', label: 'Square Feet (sq ft)' },
                { value: 'sqm', label: 'Square Meters (sq m)' }
              ]}
              value={formData?.areaUnit}
              onChange={handleSelectChange('areaUnit')}
              required
            />
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
            <div className="flex gap-3">
              <Icon name="Info" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-foreground font-medium mb-1">
                  Sunlight measurement tips
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Observe your space throughout the day. Count hours of direct sunlight (not filtered through trees or buildings). Morning sun is gentler than afternoon sun.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex gap-3">
              <Icon name="Droplets" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-foreground font-medium mb-1">
                  Water-wise planting
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We'll prioritize drought-tolerant species for low water availability and moisture-loving plants for high water access, ensuring sustainable growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentStep;