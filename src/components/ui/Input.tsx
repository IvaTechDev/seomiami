/**
 * Input Component (React)
 * 
 * Form input component with glassmorphic styling matching the Miami Nights theme.
 * Includes error states, focus effects with glow, and label support.
 * 
 * @param {string} type - Input type (text, email, tel, url, etc.)
 * @param {string} name - Input name attribute
 * @param {string} label - Label text
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Whether the field is required
 * @param {string} value - Controlled input value
 * @param {function} onChange - Change handler
 * @param {string} error - Error message to display
 * @param {string} className - Additional CSS classes
 */

import React from 'react';

interface InputProps {
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  name,
  label,
  placeholder,
  required = false,
  value,
  onChange,
  error,
  className = '',
}) => {
  const inputId = `input-${name}`;
  
  const baseStyles = 'w-full px-4 py-3 bg-white/5 backdrop-blur-md border rounded-lg transition-all duration-300 text-white placeholder-white/40 focus:outline-none';
  
  const normalStyles = 'border-white/10 focus:border-miami-cyan focus:ring-2 focus:ring-miami-cyan/50 focus:shadow-lg focus:shadow-miami-cyan/20';
  
  const errorStyles = 'border-miami-pink focus:border-miami-pink focus:ring-2 focus:ring-miami-pink/50';
  
  const inputClasses = `${baseStyles} ${error ? errorStyles : normalStyles} ${className}`;
  
  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-white/90"
        >
          {label}
          {required && <span className="text-miami-pink ml-1">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={inputClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      
      {error && (
        <p 
          id={`${inputId}-error`}
          className="text-sm text-miami-pink flex items-center gap-1"
        >
          <svg 
            className="w-4 h-4" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
              clipRule="evenodd" 
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
