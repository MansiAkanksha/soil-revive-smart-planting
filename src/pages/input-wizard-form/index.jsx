import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import Button from '../../components/ui/Button';
import Navbar from '../../components/Navbar';
import LocationStep from './components/LocationStep';
import SpaceTypeStep from './components/SpaceTypeStep';
import SoilTypeStep from './components/SoilTypeStep';
import EnvironmentStep from './components/EnvironmentStep';
import ReviewStep from './components/ReviewStep';
import { useAuth } from '../../context/AuthContext';
import { recommendationApi } from '../../services/api';

const InputWizardForm = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    city: '',
    state: '',
    spaceType: '',
    soilType: '',
    sunlightHours: 6,
    waterAvailability: '',
    areaSize: '',
    areaUnit: 'sqft'
  });
  const [errors, setErrors] = useState({});

  const totalSteps = 5;
  const stepLabels = [
    'Location',
    'Space Type',
    'Soil Type',
    'Environment',
    'Review'
  ];

  const handleLogout = () => {
    logout();
    navigate('/user-registration-login');
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData?.city?.trim()) {
          newErrors.city = 'City is required';
        }
        if (!formData?.state?.trim()) {
          newErrors.state = 'State is required';
        }
        break;

      case 2:
        if (!formData?.spaceType) {
          newErrors.spaceType = 'Please select a space type';
        }
        break;

      case 3:
        if (!formData?.soilType) {
          newErrors.soilType = 'Please select a soil type';
        }
        break;

      case 4:
        if (!formData?.sunlightHours || Number(formData?.sunlightHours) < 0) {
          newErrors.sunlightHours = 'Please specify sunlight hours';
        }
        if (!formData?.waterAvailability) {
          newErrors.waterAvailability = 'Please select water availability';
        }
        if (!formData?.areaSize || Number(formData?.areaSize) <= 0) {
          newErrors.areaSize = 'Please enter a valid area size';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setSubmitError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        ...formData,
        sunlightHours: Number(formData?.sunlightHours),
        areaSize: Number(formData?.areaSize),
        location: `${formData?.city}, ${formData?.state}`,
      };

      const response = await recommendationApi.createRecommendation(payload);
      const responseData = response?.data || {};
      const recommendations = Array.isArray(responseData)
        ? responseData
        : Array.isArray(responseData?.plants)
        ? responseData.plants
        : [];

      navigate('/recommendations', {
        state: {
          formData: payload,
          recommendations,
          climateSummary: responseData?.climateSummary || null,
          climateAdaptiveSuggestion: responseData?.climateAdaptiveSuggestion || '',
          projection: responseData?.projection || null,
        },
      });
    } catch (error) {
      setSubmitError(
        error?.response?.data?.message ||
          'Unable to generate recommendations right now. Please ensure backend is running and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSubmitError('');
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFormDataChange = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(updates)?.forEach((key) => {
        delete newErrors?.[key];
      });
      return newErrors;
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <LocationStep
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
          />
        );
      case 2:
        return (
          <SpaceTypeStep
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
          />
        );
      case 3:
        return (
          <SoilTypeStep
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
          />
        );
      case 4:
        return (
          <EnvironmentStep
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
          />
        );
      case 5:
        return <ReviewStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLogout={handleLogout} />
      <div className="pt-[60px]">
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepLabels={stepLabels}
        />

        <main className="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {renderStep()}

            <div className="max-w-2xl mx-auto mt-8 md:mt-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="ChevronLeft"
                  iconPosition="left"
                  onClick={handlePrevious}
                  disabled={currentStep === 1 || isSubmitting}
                  className="sm:w-auto w-full"
                >
                  Previous
                </Button>

                <Button
                  variant="default"
                  size="lg"
                  iconName={currentStep === totalSteps ? 'Check' : 'ChevronRight'}
                  iconPosition="right"
                  onClick={handleNext}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className="sm:w-auto w-full"
                >
                  {currentStep === totalSteps ? 'Generate Recommendations' : 'Next Step'}
                </Button>
              </div>

              {submitError && (
                <p className="mt-4 text-sm text-error text-center">{submitError}</p>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Step {currentStep} of {totalSteps} | {stepLabels?.[currentStep - 1]}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InputWizardForm;
