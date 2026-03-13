import React from 'react';
import Icon from '../../../components/AppIcon';

const SuccessMessage = ({ message, userName }) => {
  return (
    <div className="p-6 bg-success/10 border border-success/20 rounded-2xl">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="CheckCircle2" size={24} color="var(--color-success-foreground)" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <h4 className="font-heading text-lg font-semibold text-success mb-2">
            {userName ? `Welcome, ${userName}!` : 'Success!'}
          </h4>
          <p className="text-sm md:text-base text-foreground leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;