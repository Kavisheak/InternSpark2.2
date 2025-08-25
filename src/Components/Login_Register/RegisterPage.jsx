import React, { useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';

const RegisterPage = ({ onNavigateToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'student',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateUsername = (username) => {
    if (!username.trim()) return 'Username is required';
    if (username.length < 3) return 'Username must be at least 3 characters';
    if (username.length > 30) return 'Username must be less than 30 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Username can only contain letters, numbers, and underscores';
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    if (email.length > 100) return 'Email must be less than 100 characters';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length > 128) return 'Password must be less than 128 characters';
    return '';
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== password) return 'Passwords do not match';
    return '';
  };

  const updatePasswordCriteria = (password) => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[\W_]/.test(password)
    });
  };

  const isPasswordStrong = () => {
    return Object.values(passwordCriteria).every(criteria => criteria);
  };

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'username':
        error = validateUsername(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        updatePasswordCriteria(value);
        // Re-validate confirm password if it exists
        if (formData.confirmPassword) {
          setErrors(prev => ({
            ...prev,
            confirmPassword: validateConfirmPassword(formData.confirmPassword, value)
          }));
        }
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(value, formData.password);
        break;
      case 'agreeToTerms':
        error = !value ? 'You must agree to the Terms of Service and Privacy Policy' : '';
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Clear any existing error messages
    setMessage('');

    // Validate field on change
    validateField(name, fieldValue);
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    validateField(name, fieldValue);
  };

  const validateAllFields = () => {
    const newErrors = {};
    
    newErrors.username = validateUsername(formData.username);
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);
    newErrors.confirmPassword = validateConfirmPassword(formData.confirmPassword, formData.password);
    newErrors.agreeToTerms = !formData.agreeToTerms ? 'You must agree to the Terms of Service and Privacy Policy' : '';

    setErrors(newErrors);
    
    // Check if there are any errors
    return Object.values(newErrors).every(error => !error);
  };

  const sanitizeInput = (input) => {
    return input.trim().replace(/<[^>]*>?/gm, ''); // Remove HTML tags
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    // Validate all fields
    if (!validateAllFields()) {
      setMessage('Please fix all validation errors before submitting.');
      setIsSubmitting(false);
      return;
    }

    if (!isPasswordStrong()) {
      setMessage('Please ensure your password meets all requirements.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Sanitize inputs before sending
      const sanitizedData = {
        username: sanitizeInput(formData.username),
        email: sanitizeInput(formData.email.toLowerCase()),
        role: formData.role,
        password: formData.password, // Don't sanitize password
      };

      const response = await fetch('http://localhost/InternBackend/api/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        alert('Account created successfully! Please sign in.');
        onNavigateToLogin();
      } else {
        setMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.message.includes('HTTP error')) {
        setMessage('Server error. Please try again later.');
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setMessage('Network error. Please check your connection and try again.');
      } else {
        setMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClass = (fieldName) => {
    const baseClass = "w-full px-4 py-3 bg-blue-50 border text-blue-900 placeholder-blue-400 rounded-lg focus:outline-none focus:ring-2 transition-colors";
    const errorClass = errors[fieldName] ? "border-red-400 focus:ring-red-400" : "border-blue-300 focus:ring-blue-400";
    return `${baseClass} ${errorClass}`;
  };

  const PasswordCriteriaItem = ({ met, text }) => (
    <div className={`flex items-center space-x-2 text-sm ${met ? 'text-green-600' : 'text-gray-500'}`}>
      {met ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <X className="w-4 h-4 text-gray-400" />
      )}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-gray-300">
      <div className="w-full max-w-md p-10 bg-white border border-blue-200 shadow-2xl rounded-2xl">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-700 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 4H8m4 4H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v4" />
              </svg>
            </div>
            <span className="ml-2 text-2xl font-semibold tracking-wide text-blue-800">
              Internspark
            </span>
          </div>
          <h2 className="mb-1 text-3xl font-bold text-blue-800">Create Account</h2>
          <p className="text-sm text-blue-500">Join thousands of aspiring interns</p>
        </div>

        <div onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-blue-800">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your username"
              className={getInputClass('username')}
              maxLength="30"
              required
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-blue-800">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              className={getInputClass('email')}
              maxLength="100"
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-blue-800">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={getInputClass('role')}
              required
            >
              <option value="student">Student</option>
              <option value="company">Company</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-blue-800">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your password"
                className={`${getInputClass('password')} pr-12`}
                maxLength="128"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-blue-600 hover:text-blue-800"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
            
            {/* Password Criteria */}
            {formData.password && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Password strength</span>
                    <span>{formData.password.length} characters</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        Object.values(passwordCriteria).filter(Boolean).length >= 4 
                          ? 'bg-green-500' 
                          : Object.values(passwordCriteria).filter(Boolean).length >= 2 
                          ? 'bg-yellow-500' 
                          : 'bg-red-500'
                      }`}
                      style={{ 
                        width: `${(Object.values(passwordCriteria).filter(Boolean).length / 5) * 100}%` 
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <PasswordCriteriaItem met={passwordCriteria.uppercase} text="One uppercase letter" />
                  <PasswordCriteriaItem met={passwordCriteria.lowercase} text="One lowercase letter" />
                  <PasswordCriteriaItem met={passwordCriteria.number} text="One number" />
                  <PasswordCriteriaItem met={passwordCriteria.special} text="One special character" />
                  <PasswordCriteriaItem met={passwordCriteria.length} text="8 characters" />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-blue-800">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm your password"
                className={`${getInputClass('confirmPassword')} pr-12`}
                maxLength="128"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-blue-600 hover:text-blue-800"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <div>
            <div className="flex items-start text-sm text-blue-700">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 mr-2 ${errors.agreeToTerms ? 'border-red-400' : ''}`}
                required
              />
              <span>
                I agree to the{' '}
                <button type="button" className="text-blue-600 underline hover:text-blue-800">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-blue-600 underline hover:text-blue-800">
                  Privacy Policy
                </button>
              </span>
            </div>
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
            )}
          </div>

          {message && (
            <div className={`p-3 rounded-lg ${message.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              <p className="text-sm">{message}</p>
            </div>
          )}

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-3 font-semibold text-white transition duration-300 rounded-lg ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-400'
            }`}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <span className="text-blue-700">Already have an account? </span>
          <button
            onClick={onNavigateToLogin}
            className="font-medium text-blue-600 underline hover:text-blue-800"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;