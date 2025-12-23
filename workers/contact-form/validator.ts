/**
 * Validation utilities for contact form data
 * Includes email, phone, URL validation and input sanitization
 */

import { ValidationError } from './errors';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  website?: string;
  service: string;
  budget?: string;
  message: string;
  honeypot?: string;
}

/**
 * Email validation using RFC 5322 compatible regex
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Phone number validation (US format)
 * Accepts various formats: (305) 555-0123, 305-555-0123, 3055550123
 */
export function validatePhone(phone: string): boolean {
  if (!phone || phone.trim() === '') return true; // optional field
  
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Check if it has 10 or 11 digits (11 for +1 prefix)
  if (digitsOnly.length < 10 || digitsOnly.length > 11) {
    return false;
  }
  
  // If 11 digits, first digit should be 1 (country code)
  if (digitsOnly.length === 11 && digitsOnly[0] !== '1') {
    return false;
  }
  
  return true;
}

/**
 * URL validation
 */
export function validateURL(url: string): boolean {
  if (!url || url.trim() === '') return true; // optional field
  
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Sanitize string input to prevent XSS
 */
export function sanitizeString(input: string): string {
  if (!input) return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .slice(0, 1000); // Limit length
}

/**
 * Sanitize name (allow only letters, spaces, hyphens, apostrophes)
 */
export function sanitizeName(name: string): string {
  if (!name) return '';
  
  return name
    .trim()
    .replace(/[^a-zA-Z\s\-']/g, '')
    .slice(0, 100);
}

/**
 * Sanitize email (basic sanitization)
 */
export function sanitizeEmail(email: string): string {
  if (!email) return '';
  
  return email
    .trim()
    .toLowerCase()
    .slice(0, 254); // Max email length per RFC 5321
}

/**
 * Validate service selection
 */
const VALID_SERVICES = [
  'local-seo',
  'ecommerce-seo',
  'technical-seo',
  'content-strategy',
  'gmb-optimization',
  'link-building',
  'full-service',
];

export function validateService(service: string): boolean {
  return VALID_SERVICES.includes(service);
}

/**
 * Validate budget selection
 */
const VALID_BUDGETS = [
  'under-1k',
  '1k-5k',
  '5k-10k',
  '10k-plus',
];

export function validateBudget(budget: string): boolean {
  if (!budget || budget.trim() === '') return true; // optional field
  return VALID_BUDGETS.includes(budget);
}

/**
 * Check honeypot field (should be empty)
 */
export function checkHoneypot(honeypot?: string): boolean {
  return !honeypot || honeypot.trim() === '';
}

/**
 * Validate and sanitize form data
 * Throws ValidationError if validation fails
 */
export function validateAndSanitizeFormData(data: any): ContactFormData {
  // Check required fields exist
  if (!data.name || typeof data.name !== 'string') {
    throw new ValidationError('Name is required', 'name');
  }
  
  if (!data.email || typeof data.email !== 'string') {
    throw new ValidationError('Email is required', 'email');
  }
  
  if (!data.message || typeof data.message !== 'string') {
    throw new ValidationError('Message is required', 'message');
  }

  // Sanitize inputs
  const sanitizedData: ContactFormData = {
    name: sanitizeName(data.name),
    email: sanitizeEmail(data.email),
    phone: data.phone ? sanitizeString(data.phone) : undefined,
    website: data.website ? sanitizeString(data.website) : undefined,
    service: sanitizeString(data.service),
    budget: data.budget ? sanitizeString(data.budget) : undefined,
    message: sanitizeString(data.message),
    honeypot: data.honeypot,
  };

  // Validate name
  if (sanitizedData.name.length < 2) {
    throw new ValidationError('Please enter a valid name (at least 2 characters)', 'name');
  }

  // Validate email
  if (!validateEmail(sanitizedData.email)) {
    throw new ValidationError('Please enter a valid email address', 'email');
  }

  // Validate phone if provided
  if (sanitizedData.phone && !validatePhone(sanitizedData.phone)) {
    throw new ValidationError('Please enter a valid phone number', 'phone');
  }

  // Validate website if provided
  if (sanitizedData.website && !validateURL(sanitizedData.website)) {
    throw new ValidationError('Please enter a valid URL (e.g., https://example.com)', 'website');
  }

  // Validate service
  if (!validateService(sanitizedData.service)) {
    throw new ValidationError('Please select a valid service', 'service');
  }

  // Validate budget if provided
  if (sanitizedData.budget && !validateBudget(sanitizedData.budget)) {
    throw new ValidationError('Please select a valid budget range', 'budget');
  }

  // Validate message
  if (sanitizedData.message.length < 10) {
    throw new ValidationError('Please provide more details (at least 10 characters)', 'message');
  }

  // Check honeypot
  if (!checkHoneypot(sanitizedData.honeypot)) {
    throw new ValidationError('Invalid submission detected', 'honeypot');
  }

  return sanitizedData;
}
