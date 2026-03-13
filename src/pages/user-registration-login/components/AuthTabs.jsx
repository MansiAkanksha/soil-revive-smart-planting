import React from 'react';

const AuthTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login', label: 'Sign In' },
    { id: 'register', label: 'Create Account' }
  ];

  return (
    <div className="flex gap-2 p-1 bg-muted rounded-xl mb-8">
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`
            flex-1 py-3 px-6 rounded-lg font-medium transition-organic
            ${activeTab === tab?.id
              ? 'bg-card text-foreground shadow-earth-sm'
              : 'text-muted-foreground hover:text-foreground'
            }
          `}
        >
          {tab?.label}
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;