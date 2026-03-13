import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import { useAuth } from '../../../context/AuthContext';

const RegisterForm = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await register({
        name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });
      onRegisterSuccess({
        ...response.user
      });
    } catch (error) {
      const isAlreadyExists = error?.response?.status === 409;
      setErrors((prev) => ({
        ...prev,
        email: isAlreadyExists ? 'An account with this email already exists' : '',
        submit: isAlreadyExists
          ? 'This email is already registered. Please sign in using the Login tab.'
          : error?.response?.data?.message || 'Registration failed. Please try again.'
      }));
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
    if (errors?.[name]) {
      setErrors((prev) => ({ ...prev, [name]: '', submit: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.submit && (
        <p className="text-sm text-error bg-error/10 border border-error/20 rounded-lg p-3">
          {errors.submit}
        </p>
      )}
      <Input
        label="Full Name"
        type="text"
        name="fullName"
        placeholder="John Doe"
        value={formData?.fullName}
        onChange={handleChange}
        error={errors?.fullName}
        required
      />
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="your.email@example.com"
        description="We'll use this for your account login"
        value={formData?.email}
        onChange={handleChange}
        error={errors?.email}
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Create a strong password"
        description="Must be at least 6 characters"
        value={formData?.password}
        onChange={handleChange}
        error={errors?.password}
        required
      />
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Re-enter your password"
        value={formData?.confirmPassword}
        onChange={handleChange}
        error={errors?.confirmPassword}
        required
      />
      <Checkbox
        label="I agree to the Terms of Service and Privacy Policy"
        name="agreeToTerms"
        checked={formData?.agreeToTerms}
        onChange={handleChange}
        error={errors?.agreeToTerms}
        required
      />
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        Create Account
      </Button>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-medium text-primary hover:underline transition-organic"
          >
            Sign in instead
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
