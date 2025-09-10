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

  // Modals
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Validation functions (unchanged)
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

  const isPasswordStrong = () => Object.values(passwordCriteria).every(criteria => criteria);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'username': error = validateUsername(value); break;
      case 'email': error = validateEmail(value); break;
      case 'password':
        error = validatePassword(value);
        updatePasswordCriteria(value);
        if (formData.confirmPassword) {
          setErrors(prev => ({
            ...prev,
            confirmPassword: validateConfirmPassword(formData.confirmPassword, value)
          }));
        }
        break;
      case 'confirmPassword': error = validateConfirmPassword(value, formData.password); break;
      case 'agreeToTerms': error = !value ? 'You must agree to the Terms of Service and Privacy Policy' : ''; break;
      default: break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: fieldValue }));
    setMessage('');
    validateField(name, fieldValue);
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    validateField(name, fieldValue);
  };

  const validateAllFields = () => {
    const newErrors = {
      username: validateUsername(formData.username),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
      agreeToTerms: !formData.agreeToTerms ? 'You must agree to the Terms of Service and Privacy Policy' : ''
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const sanitizeInput = (input) => input.trim().replace(/<[^>]*>?/gm, '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

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
      const sanitizedData = {
        username: sanitizeInput(formData.username),
        email: sanitizeInput(formData.email.toLowerCase()),
        role: formData.role,
        password: formData.password,
      };
      const response = await fetch('http://localhost/InternBackend/api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedData),
      });
      const data = await response.json();
      if (data.success) {
        alert('Account created successfully! Please sign in.');
        onNavigateToLogin();
      } else {
        setMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('Server error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClass = (fieldName) => {
    const base = "w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 transition-colors";
    const err = errors[fieldName] ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-orange-500";
    return `${base} ${err}`;
  };

  const PasswordCriteriaItem = ({ met, text }) => (
    <div className={`flex items-center space-x-2 text-sm ${met ? 'text-green-600' : 'text-gray-500'}`}>
      {met ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-gray-400" />}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-oxfordblue-900">
      <div className="w-full max-w-md p-10 bg-white shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-extrabold text-oxfordblue-900">Create Account</h2>
          <p className="text-sm text-gray-500">Join thousands of aspiring interns</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block mb-1 text-sm font-medium text-oxfordblue-800">Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} onBlur={handleBlur}
              placeholder="Enter your username" className={getInputClass('username')} maxLength="30" required />
            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-oxfordblue-800">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur}
              placeholder="Enter your email" className={getInputClass('email')} maxLength="100" required />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 text-sm font-medium text-oxfordblue-800">Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className={getInputClass('role')} required>
              <option value="student">Student</option>
              <option value="company">Company</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-oxfordblue-800">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password}
                onChange={handleChange} onBlur={handleBlur} placeholder="Enter your password"
                className={`${getInputClass('password')} pr-10`} maxLength="128" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 flex items-center text-gray-500 right-3 hover:text-oxfordblue-900 focus:outline-none">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}

            {formData.password && (
              <div className="p-3 mt-3 border rounded-lg bg-gray-50">
                <div className="mb-2">
                  <div className="flex justify-between mb-1 text-sm text-gray-600">
                    <span>Password strength</span>
                    <span>{formData.password.length} characters</span>
                  </div>
                  <div className="w-full h-1 bg-gray-200 rounded-full">
                    <div className={`h-1 rounded-full transition-all duration-300 ${
                        Object.values(passwordCriteria).filter(Boolean).length >= 4 ? 'bg-green-500'
                        : Object.values(passwordCriteria).filter(Boolean).length >= 2 ? 'bg-yellow-500'
                        : 'bg-red-500'
                      }`}
                      style={{ width: `${(Object.values(passwordCriteria).filter(Boolean).length / 5) * 100}%` }} />
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

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-oxfordblue-800">Confirm Password</label>
            <div className="relative">
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword"
                value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur}
                placeholder="Confirm your password" className={`${getInputClass('confirmPassword')} pr-10`} maxLength="128" required />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 flex items-center text-gray-500 right-3 hover:text-oxfordblue-900 focus:outline-none">
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>

          {/* Terms */}
          <div>
            <div className="flex items-start text-sm text-gray-700">
              <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms}
                onChange={handleChange} onBlur={handleBlur}
                className={`mt-1 mr-2 ${errors.agreeToTerms ? 'border-red-400' : ''}`} required />
              <span>
                I agree to the{' '}
                <button type="button" onClick={() => setShowTerms(true)}
                  className="text-orange-600 underline hover:text-orange-700">Terms of Service</button>{' '}
                and{' '}
                <button type="button" onClick={() => setShowPrivacy(true)}
                  className="text-orange-600 underline hover:text-orange-700">Privacy Policy</button>
              </span>
            </div>
            {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}
          </div>

          {/* Message */}
          {message && (
            <p className={`text-sm text-center ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          {/* Submit */}
          <button type="submit" disabled={isSubmitting}
            className="w-full py-3 font-semibold text-white transition duration-300 bg-orange-600 rounded-lg shadow-lg hover:bg-orange-500 disabled:opacity-70">
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <span className="text-gray-700">Already have an account? </span>
          <button onClick={onNavigateToLogin} className="font-medium text-orange-600 hover:text-orange-700">
            Sign in
          </button>
        </div>
      </div>

      {/* Terms & Privacy Modals (unchanged content, same style as LoginPage popups) */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] relative">
            <h2 className="mb-4 text-3xl font-bold text-oxfordblue-900">Terms of Service</h2>
            <p className="text-gray-700">...your terms content...</p>
            <button onClick={() => setShowTerms(false)} className="absolute text-gray-600 top-3 right-3 hover:text-black">✖</button>
          </div>
        </div>
      )}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] relative">
            <h2 className="mb-4 text-3xl font-bold text-oxfordblue-900">Privacy Policy</h2>
            <p className="text-gray-700">...your privacy content...</p>
            <button onClick={() => setShowPrivacy(false)} className="absolute text-gray-600 top-3 right-3 hover:text-black">✖</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
