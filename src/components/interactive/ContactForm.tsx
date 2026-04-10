import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: { sitekey: string; theme: string }) => void;
    };
  }
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  website: string;
  service: string;
  message: string;
  budget: string;
  honeypot: string; // spam protection
  turnstileToken: string; // CAPTCHA token
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

/**
 * Main contact/lead form component
 * Includes validation, loading states, and success feedback
 */
export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    website: '',
    service: '',
    message: '',
    budget: '',
    honeypot: '',
    turnstileToken: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [turnstileReady, setTurnstileReady] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const siteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey || !turnstileRef.current) return;

    const renderWidget = () => {
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          theme: 'dark',
        });
        setTurnstileReady(true);
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      script.onerror = () => console.error('Failed to load Turnstile script');
      document.head.appendChild(script);
    }
  }, []);

  // Validation helpers
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // optional field
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Format phone number as user types
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let formatted = value;

    if (value.length >= 6) {
      formatted = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length >= 3) {
      formatted = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }

    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot (spam protection)
    if (formData.honeypot) {
      console.log('Spam detected');
      return;
    }

    if (!validateForm()) {
      return;
    }

    // Get Turnstile token
    const turnstileInput = document.querySelector(
      '[name="cf-turnstile-response"]'
    ) as HTMLInputElement | null;
    const turnstileToken = turnstileInput?.value || '';
    if (!turnstileToken) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Submit to Cloudflare Worker endpoint
      const endpoint = import.meta.env.PUBLIC_CONTACT_FORM_API || '/api/contact';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          website: formData.website,
          service: formData.service,
          budget: formData.budget,
          message: formData.message,
          honeypot: formData.honeypot,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to submit form');
      }

      setSubmitStatus('success');

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          website: '',
          service: '',
          message: '',
          budget: '',
          honeypot: '',
          turnstileToken: '',
        });
        setSubmitStatus('idle');
      }, 10000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl" id="contact">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        onSubmit={handleSubmit}
        className="from-miami-dark/80 to-miami-dark/60 rounded-2xl border border-white/10 bg-gradient-to-br p-6 shadow-2xl backdrop-blur-xl md:p-8"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
            Get Your Free SEO Audit
          </h3>
          <p className="text-gray-300">
            Fill out the form below and we'll analyze your website's SEO performance
          </p>
        </div>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-200">
              Name <span className="text-miami-pink">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`bg-miami-dark/60 w-full rounded-xl border px-4 py-3 ${
                errors.name ? 'border-red-500' : 'border-white/20'
              } text-white placeholder-gray-500 transition-colors focus:border-miami-cyan focus:outline-none`}
              placeholder="John Doe"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                id="name-error"
                className="mt-1 text-sm text-red-400"
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-200">
              Email <span className="text-miami-pink">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`bg-miami-dark/60 w-full rounded-xl border px-4 py-3 ${
                errors.email ? 'border-red-500' : 'border-white/20'
              } text-white placeholder-gray-500 transition-colors focus:border-miami-cyan focus:outline-none`}
              placeholder="john@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                id="email-error"
                className="mt-1 text-sm text-red-400"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-200">
              Phone (optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              className={`bg-miami-dark/60 w-full rounded-xl border px-4 py-3 ${
                errors.phone ? 'border-red-500' : 'border-white/20'
              } text-white placeholder-gray-500 transition-colors focus:border-miami-cyan focus:outline-none`}
              placeholder="(305) 555-0123"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                id="phone-error"
                className="mt-1 text-sm text-red-400"
              >
                {errors.phone}
              </motion.p>
            )}
          </div>

          {/* Website URL */}
          <div>
            <label htmlFor="website" className="mb-2 block text-sm font-medium text-gray-200">
              Business Website (optional)
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="bg-miami-dark/60 w-full rounded-xl border border-white/20 px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-miami-cyan focus:outline-none"
              placeholder="https://yourwebsite.com"
            />
          </div>

          {/* Service Interest */}
          <div>
            <label htmlFor="service" className="mb-2 block text-sm font-medium text-gray-200">
              Service Interest
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="bg-miami-dark/60 w-full cursor-pointer rounded-xl border border-white/20 px-4 py-3 text-white transition-colors focus:border-miami-cyan focus:outline-none"
            >
              <option value="">Select a service...</option>
              <option value="local-seo">Local SEO</option>
              <option value="ecommerce-seo">E-commerce SEO</option>
              <option value="technical-seo">Technical SEO</option>
              <option value="content-strategy">Content Strategy</option>
              <option value="gmb-optimization">Google Business Profile</option>
              <option value="link-building">Link Building</option>
              <option value="full-service">Full-Service SEO</option>
            </select>
          </div>

          {/* Budget Range */}
          <div>
            <label htmlFor="budget" className="mb-2 block text-sm font-medium text-gray-200">
              Monthly Budget (optional)
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="bg-miami-dark/60 w-full cursor-pointer rounded-xl border border-white/20 px-4 py-3 text-white transition-colors focus:border-miami-cyan focus:outline-none"
            >
              <option value="">Select budget range...</option>
              <option value="under-1k">Under $1,000</option>
              <option value="1k-5k">$1,000 - $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-plus">$10,000+</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-200">
              Tell us about your goals <span className="text-miami-pink">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`bg-miami-dark/60 w-full rounded-xl border px-4 py-3 ${
                errors.message ? 'border-red-500' : 'border-white/20'
              } resize-none text-white placeholder-gray-500 transition-colors focus:border-miami-cyan focus:outline-none`}
              placeholder="Tell us about your business and SEO goals..."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                id="message-error"
                className="mt-1 text-sm text-red-400"
              >
                {errors.message}
              </motion.p>
            )}
          </div>

          {/* Cloudflare Turnstile CAPTCHA - rendered after hydration */}
          <div className="flex justify-center">
            <div ref={turnstileRef} className="cf-turnstile"></div>
          </div>

          {/* Honeypot (hidden spam protection) */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !turnstileReady}
            whileHover={{
              scale: shouldReduceMotion ? 1 : isSubmitting || !turnstileReady ? 1 : 1.02,
            }}
            whileTap={{
              scale: shouldReduceMotion ? 1 : isSubmitting || !turnstileReady ? 1 : 0.98,
            }}
            className={`w-full rounded-xl px-6 py-4 text-lg font-bold text-white transition-all ${
              isSubmitting || !turnstileReady
                ? 'cursor-not-allowed bg-gray-600'
                : 'bg-gradient-to-r from-miami-purple via-miami-pink to-miami-cyan hover:shadow-2xl hover:shadow-miami-pink/50'
            }`}
          >
            {!turnstileReady ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </span>
            ) : isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              'Get Free SEO Audit'
            )}
          </motion.button>
        </div>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-xl border border-green-500/50 bg-green-500/20 p-4 text-center"
            role="alert"
          >
            <div className="mb-1 text-lg font-bold text-green-400">✓ Success!</div>
            <p className="text-sm text-green-200">
              We've received your request. We'll be in touch within 24 hours!
            </p>
          </motion.div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-xl border border-red-500/50 bg-red-500/20 p-4 text-center"
            role="alert"
          >
            <div className="mb-1 text-lg font-bold text-red-400">Error</div>
            <p className="text-sm text-red-200">
              Something went wrong. Please try again or email us directly.
            </p>
          </motion.div>
        )}

        {/* Privacy Notice */}
        <p className="mt-6 text-center text-xs text-gray-400">
          By submitting this form, you agree to our privacy policy. We'll never share your
          information.
        </p>
      </motion.form>
    </div>
  );
}
