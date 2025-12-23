/**
 * TextArea Component (React)
 * 
 * Form textarea component with glassmorphic styling matching the Miami Nights theme.
 * Similar to Input but for multi-line text with optional character count.
 * 
 * @param {string} name - Textarea name attribute
 * @param {string} label - Label text
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Whether the field is required
 * @param {string} value - Controlled textarea value
 * @param {function} onChange - Change handler
 * @param {string} error - Error message to display
 * @param {number} rows - Number of visible text rows
 * @param {number} maxLength - Maximum character count
 * @param {boolean} showCount - Show character count
 * @param {boolean} resizable - Allow textarea resizing
 * @param {string} className - Additional CSS classes
 */

import React from 'react';

interface TextAreaProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
  resizable?: boolean;
  className?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  placeholder,
  required = false,
  value = '',
  onChange,
  error,
  rows = 4,
  maxLength,
  showCount = false,
  resizable = true,
  className = '',
}) => {
  const textareaId = `textarea-${name}`;
  
  const baseStyles = 'w-full px-4 py-3 bg-white/5 backdrop-blur-md border rounded-lg transition-all duration-300 text-white placeholder-white/40 focus:outline-none';
  
  const normalStyles = 'border-white/10 focus:border-miami-cyan focus:ring-2 focus:ring-miami-cyan/50 focus:shadow-lg focus:shadow-miami-cyan/20';
  
  const errorStyles = 'border-miami-pink focus:border-miami-pink focus:ring-2 focus:ring-miami-pink/50';
  
  const resizeStyles = resizable ? 'resize-y' : 'resize-none';
  
  const textareaClasses = `${baseStyles} ${error ? errorStyles : normalStyles} ${resizeStyles} ${className}`;
  
  const characterCount = value?.length || 0;
  const isNearLimit = maxLength && characterCount > maxLength * 0.9;
  
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label 
            htmlFor={textareaId}
            className="block text-sm font-medium text-white/90"
          >
            {label}
            {required && <span className="text-miami-pink ml-1">*</span>}
          </label>
          
          {showCount && maxLength && (
            <span 
              className={`text-sm ${
                isNearLimit 
                  ? 'text-miami-pink' 
                  : 'text-white/60'
              }`}
            >
              {characterCount}/{maxLength}
            </span>
          )}
        </div>
      )}
      
      <textarea
        id={textareaId}
        name={name}
        placeholder={placeholder}
        required={required}
        defaultValue={value}
        onChange={onChange}
        rows={rows}
        maxLength={maxLength}
        className={textareaClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${textareaId}-error` : undefined}
      />
      
      {error && (
        <p 
          id={`${textareaId}-error`}
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

export default TextArea;
