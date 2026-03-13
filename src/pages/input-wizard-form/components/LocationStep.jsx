import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const STATE_CITY_MAP = {
  Telangana: ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati'],
  Karnataka: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
  Delhi: ['New Delhi', 'Dwarka', 'Rohini', 'Saket'],
  Kerala: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur'],
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
};

const LocationStep = ({ formData, errors, onChange }) => {
  const stateOptions = Object.keys(STATE_CITY_MAP).map((stateName) => ({
    label: stateName,
    value: stateName,
  }));

  const cityOptions = (STATE_CITY_MAP[formData?.state] || []).map((cityName) => ({
    label: cityName,
    value: cityName,
  }));

  const handleStateChange = (value) => {
    onChange({
      state: value,
      city: '',
    });
  };

  const handleCityChange = (value) => {
    onChange({ city: value });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-2xl shadow-earth-lg p-6 md:p-8 lg:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="MapPin" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
              Location Details
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Help us understand your geographical context
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Select
            label="State"
            placeholder="Select your state"
            options={stateOptions}
            value={formData?.state}
            onChange={handleStateChange}
            error={errors?.state}
            required
            searchable
            clearable
            description="State information helps determine climate zone"
          />

          <Select
            label="City"
            placeholder={formData?.state ? 'Select your city' : 'Select state first'}
            options={cityOptions}
            value={formData?.city}
            onChange={handleCityChange}
            error={errors?.city}
            disabled={!formData?.state}
            required
            searchable
            clearable
            description="We'll use this to recommend native plant species"
          />
        </div>

        <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex gap-3">
            <Icon name="Info" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-medium mb-1">
                Why we need your location
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Location data enables us to recommend plants that are naturally adapted to your regional climate, soil conditions, and seasonal patterns. This ensures higher success rates and better soil regeneration outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationStep;
