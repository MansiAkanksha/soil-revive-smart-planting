import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ currentStep = 1, totalSteps = 3, stepLabels = [] }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'active';
    return 'inactive';
  };

  const defaultLabels = steps?.map(step => `Step ${step}`);
  const labels = stepLabels?.length === totalSteps ? stepLabels : defaultLabels;

  return (
    <div className="progress-indicator">
      <div className="max-w-4xl mx-auto">
        <div className="hidden md:flex items-center justify-between relative">
          {steps?.map((step, index) => {
            const status = getStepStatus(step);
            const isLast = index === steps?.length - 1;

            return (
              <div key={step} className="progress-step flex-1 relative">
                <div className="flex flex-col items-center">
                  <div className={`progress-step-circle ${status}`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={20} strokeWidth={3} />
                    ) : (
                      <span className="font-heading font-semibold">{step}</span>
                    )}
                  </div>
                  <span className={`
                    mt-3 text-sm font-medium font-caption text-center
                    ${status === 'active' ? 'text-primary' : ''}
                    ${status === 'completed' ? 'text-success' : ''}
                    ${status === 'inactive' ? 'text-muted-foreground' : ''}
                  `}>
                    {labels?.[index]}
                  </span>
                </div>
                {!isLast && (
                  <div className={`
                    progress-step-line
                    ${status === 'completed' ? 'completed' : ''}
                  `} />
                )}
              </div>
            );
          })}
        </div>

        <div className="md:hidden">
          <div className="flex items-center gap-4 mb-4">
            <div className={`progress-step-circle ${getStepStatus(currentStep)}`}>
              <span className="font-heading font-semibold">{currentStep}</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Step {currentStep} of {totalSteps}
              </div>
              <div className="text-base font-semibold text-foreground">
                {labels?.[currentStep - 1]}
              </div>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-organic rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;