import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../context/AuthContext';

const LoginForm = ({ onLoginSuccess, onSwitchToRegister }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await login({
        email: formData.email,
        password: formData.password
      });
      onLoginSuccess({
        ...response.user,
        rememberMe: formData.rememberMe
      });
    } catch (error) {
      setErrors({
        submit: error?.response?.data?.message || 'Invalid credentials. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors?.[name] || errors?.submit) {
      setErrors((prev) => ({ ...prev, [name]: '', submit: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.submit && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-xl flex items-start gap-3">
          <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-error mb-1">Authentication Failed</p>
            <p className="text-sm text-error/80 whitespace-pre-line">{errors?.submit}</p>
          </div>
        </div>
      )}
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="your.email@example.com"
        value={formData?.email}
        onChange={handleChange}
        error={errors?.email}
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData?.password}
        onChange={handleChange}
        error={errors?.password}
        required
      />
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleChange}
        />
        <button
          type="button"
          className="text-sm font-medium text-primary hover:underline transition-organic"
        >
          Forgot password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="left"
      >
        Sign In
      </Button>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-medium text-primary hover:underline transition-organic"
          >
            Create one now
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
