import React, { useState, useRef } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  const debounceTimers = useRef({});
  const navigate = useNavigate();

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

    // Debounce only for password and confirmPassword
    if (name === 'password' || name === 'confirmPassword') {
      if (debounceTimers.current[name]) clearTimeout(debounceTimers.current[name]);
      debounceTimers.current[name] = setTimeout(() => {
        validateField(name, fieldValue);
      }, 600); // 600ms delay
    } else {
      validateField(name, fieldValue);
    }
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
      setMessage('⚠️ Please fill out all required fields correctly to create your InternSpark account.');
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
        if (formData.role === "company") {
          navigate("/company/");
        } else {
          navigate("/student/");
        }
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
        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          {/* Username */}
          <div>
            <label className="block mb-1 text-sm font-medium text-oxfordblue-800">Username</label>
            <input
              type="text"
              name="username"
              autoComplete="off"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your username"
              className={getInputClass('username')}
              maxLength="30"
             
            />
            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-oxfordblue-800">Email Address</label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              className={getInputClass('email')}
              maxLength="100"
              
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 text-sm font-medium text-oxfordblue-800">Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className={getInputClass('role')} required>
              <option value="student">Internship Seeker</option>
              <option value="company">Company</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-oxfordblue-800">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your password"
                className={`${getInputClass('password')} pr-10`}
                maxLength="128"
                
              />
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
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm your password"
                className={`${getInputClass('confirmPassword')} pr-10`}
                maxLength="128"
                
              />
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
                className={`mt-1 mr-2 ${errors.agreeToTerms ? 'border-red-400' : ''}`}
              />
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
          <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] relative border-2 border-orange-500">
            {/* Cancel (cross) button at top right */}
            <button
              onClick={() => setShowTerms(false)}
              className="absolute text-2xl font-bold text-gray-600 top-3 right-3 hover:text-orange-600"
              aria-label="Close"
            >✖</button>
            <h2 className="mb-4 text-3xl font-bold text-oxfordblue-900">Terms of Service – InternSpark</h2>
            
            <div className="space-y-5 text-gray-800 text-[1rem]">
              <p>
                Welcome to InternSpark. By creating an account or using our platform, you agree to comply with the following Terms of Service. Please read them carefully before proceeding.
              </p>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-oxfordblue-900">1. General Terms</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>By accessing or using InternSpark, you acknowledge that you are at least 16 years old or the age of majority in your jurisdiction.</li>
                <li>You agree to use the platform only for lawful purposes and in accordance with these Terms.</li>
                <li>InternSpark reserves the right to suspend or terminate accounts that violate these Terms or engage in fraudulent, abusive, or harmful behavior.</li>
              </ul>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-oxfordblue-900">2. For Students and Job Seekers</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>Students and job seekers are responsible for ensuring that all information, CVs, resumes, portfolios, and other uploaded content (“Content”) comply with applicable laws and regulations.</li>
                <li>You guarantee that your Content does not violate any copyright, trademark, intellectual property, or privacy rights of any individual or entity.</li>
                <li>InternSpark assumes no responsibility for inaccuracies, misrepresentations, or illegal content submitted by users.</li>
                <li>You agree to release InternSpark from all obligations, liabilities, and claims related to the use or inability to use the platform.</li>
              </ul>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-oxfordblue-900">3. For Companies and Recruiters</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>Organizations must register with valid details and undergo admin verification before posting internships or job opportunities.</li>
                <li>All postings must clearly specify the role, eligibility criteria, duration, location (or remote), and stipend (if applicable).</li>
                <li>Misleading, fraudulent, discriminatory, or fake postings are strictly prohibited.</li>
                <li>Companies must provide:
                  <ul className="pl-6 space-y-1 list-disc">
                    <li>A fair and transparent selection process.</li>
                    <li>Timely communication and constructive feedback to applicants.</li>
                    <li>Timely payment of agreed stipends (for paid internships).</li>
                    <li>A safe, harassment-free, and professional working environment.</li>
                  </ul>
                </li>
                <li>Misuse of student data for purposes unrelated to internships is strictly forbidden.</li>
              </ul>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-oxfordblue-900">4. User Responsibilities</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>You are solely responsible for maintaining the confidentiality of your account login credentials.</li>
                <li>You must not share, sell, or transfer your account to others.</li>
                <li>You are responsible for all activities conducted under your account.</li>
              </ul>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-oxfordblue-900">5. License & Intellectual Property</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>Unless otherwise stated, InternSpark and/or its licensors own the intellectual property rights for all material on the platform.</li>
                <li>You are granted a limited license to view and print pages for personal use only, subject to the following restrictions:
                  <ul className="pl-6 space-y-1 list-disc">
                    <li>You must not republish material from InternSpark.</li>
                    <li>You must not reproduce, duplicate, or copy platform content.</li>
                    <li>You must not use content for competitive or commercial purposes without permission.</li>
                  </ul>
                </li>
              </ul>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-oxfordblue-900">6. Limitation of Liability</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>InternSpark is not responsible for disputes, agreements, or arrangements made between students and companies outside the platform.</li>
                <li>The platform is provided “as is,” without warranties of any kind.</li>
                <li>InternSpark is not liable for any indirect, incidental, or consequential damages arising from use of the service.</li>
              </ul>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-oxfordblue-900">7. Modifications to the Terms</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>InternSpark reserves the right to update or modify these Terms at any time.</li>
                <li>Such changes will be effective immediately upon posting on the platform.</li>
                <li>Continued use of InternSpark after changes are posted constitutes acceptance of the modified Terms.</li>
              </ul>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-oxfordblue-900">8. Governing Law</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>These Terms shall be governed by and construed in accordance with the laws of <span className="font-semibold text-orange-600">[Insert Country/Region]</span>.</li>
                <li>Any disputes shall be subject to the exclusive jurisdiction of the courts located in <span className="font-semibold text-orange-600">[Insert City/Country]</span>.</li>
              </ul>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-oxfordblue-900">9. Contact Us</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>If you have any questions about these Terms, please contact us at:</li>
                <li>Email: <span className="font-semibold text-orange-600">support@internspark.com</span></li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] relative border-2 border-orange-500">
            {/* Cancel (cross) button at top right */}
            <button
              onClick={() => setShowPrivacy(false)}
              className="absolute text-2xl font-bold text-gray-600 top-3 right-3 hover:text-orange-600"
              aria-label="Close"
            >✖</button>
            <h2 className="mb-4 text-3xl font-bold text-oxfordblue-900">Privacy Policy – InternSpark</h2>
            
            <div className="space-y-5 text-gray-800 text-[1rem]">
              <p>
                InternSpark values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
              </p>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-oxfordblue-900">1. Information We Collect</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>We may collect the following types of information:</li>
                <li>Personal details: name, email address, university ID (if applicable).</li>
                <li>Account credentials: username and password.</li>
                <li>Technical data: IP address, browser type, device information, and cookies.</li>
                <li>Usage data: interactions with our platform, such as pages visited and actions taken.</li>
              </ul>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-oxfordblue-900">2. How We Use Your Information</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>Your information may be used for the following purposes:</li>
                <li>To create and manage your account.</li>
                <li>To provide, operate, and improve our services.</li>
                <li>To send important updates, notifications, and internship opportunities.</li>
                <li>To ensure security, detect fraud, and prevent misuse of the platform.</li>
                <li>To comply with legal obligations when required.</li>
              </ul>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-oxfordblue-900">3. Data Protection & Security</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>We use industry-standard encryption and access controls to safeguard your personal data.</li>
                <li>Access to personal information is restricted to authorized personnel only.</li>
                <li>We do not sell, rent, or trade your personal data to third parties.</li>
                <li>Users may request correction or deletion of their data at any time by contacting us.</li>
              </ul>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-oxfordblue-900">4. Cookies & Tracking Technologies</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>InternSpark uses cookies and similar technologies to improve user experience and analyze platform usage.</li>
                <li>Cookies help us remember your preferences, personalize your experience, and enhance platform functionality.</li>
                <li>You may disable cookies in your browser settings, though some features may not function properly.</li>
              </ul>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-oxfordblue-900">5. Data Retention</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.</li>
                <li>Once data is no longer needed, it is securely deleted or anonymized.</li>
              </ul>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-oxfordblue-900">6. Your Rights</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>Depending on your location, you may have the following rights:</li>
                <li>The right to access the personal data we hold about you.</li>
                <li>The right to request corrections or updates.</li>
                <li>The right to request deletion of your data.</li>
                <li>The right to withdraw consent where processing is based on consent.</li>
              </ul>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-oxfordblue-900">7. Changes to This Privacy Policy</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>InternSpark may update this Privacy Policy from time to time.</li>
                <li>Any changes will be posted on this page with an updated effective date.</li>
                <li>Continued use of the platform after updates constitutes acceptance of the revised policy.</li>
              </ul>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-oxfordblue-900">8. Contact Us</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</li>
                <li>Email: <span className="font-semibold text-orange-600">support@internspark.com</span></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
