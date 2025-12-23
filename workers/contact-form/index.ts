/**
 * Cloudflare Worker for handling contact form submissions
 * Integrates with Resend API for email delivery
 */

import {
  ContactFormError,
  SpamError,
  EmailDeliveryError,
  createErrorResponse,
} from './errors';
import { validateAndSanitizeFormData } from './validator';
import type { ContactFormData } from './validator';
import {
  generateHTMLEmail,
  generatePlainTextEmail,
  generateEmailSubject,
} from './email-template';
import {
  enforceRateLimit,
  getClientIP,
  createRateLimitKey,
} from '../rate-limiter';

// Environment variables interface
interface Env {
  RESEND_API_KEY: string;
  FORM_SUBMISSION_EMAIL: string;
  ALLOWED_ORIGIN?: string;
  RATE_LIMIT_MAX?: string;
  RATE_LIMIT_WINDOW?: string;
  RATE_LIMITER_KV?: any; // KVNamespace if available
  TURNSTILE_SECRET_KEY: string;
}

// Success response interface
interface SuccessResponse {
  success: true;
  message: string;
}

/**
 * Handle CORS preflight requests
 */
function handleCORS(origin: string, allowedOrigin?: string): Response {
  const corsOrigin = allowedOrigin || '*';
  
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

/**
 * Get CORS headers
 */
function getCORSHeaders(allowedOrigin?: string): Record<string, string> {
  const corsOrigin = allowedOrigin || '*';
  
  return {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

/**
 * Send email via Resend API
 */
async function sendEmail(
  apiKey: string,
  to: string,
  subject: string,
  html: string,
  text: string,
  replyTo: string
): Promise<void> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'SEO Services Miami <noreply@seoservicesmiami.com>',
      to: [to],
      reply_to: replyTo,
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Resend API error:', errorData);
    throw new EmailDeliveryError(errorData);
  }

  const result = await response.json();
  console.log('Email sent successfully:', result);
}

/**
 * Verify Cloudflare Turnstile token
 */
async function verifyTurnstileToken(token: string, secret: string): Promise<boolean> {
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret,
        response: token,
      }),
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

/**
 * Process contact form submission
 */
async function handleContactForm(
  request: Request,
  env: Env
): Promise<Response> {
  try {
    // Check method
    if (request.method !== 'POST') {
      throw new ContactFormError('Method not allowed', 405);
    }

    // Get client IP for rate limiting
    const clientIP = getClientIP(request);
    const rateLimitKey = createRateLimitKey(clientIP);

    // Rate limiting configuration
    const maxRequests = parseInt(env.RATE_LIMIT_MAX || '5', 10);
    const windowSeconds = parseInt(env.RATE_LIMIT_WINDOW || '3600', 10);

    // Enforce rate limit
    const rateLimitResult = await enforceRateLimit(
      rateLimitKey,
      { maxRequests, windowSeconds },
      env.RATE_LIMITER_KV
    );

    // Parse request body
    let requestData: any;
    try {
      requestData = await request.json();
    } catch (error) {
      throw new ContactFormError('Invalid JSON in request body', 400);
    }

    // Check honeypot first (spam protection)
    if (requestData.honeypot && requestData.honeypot.trim() !== '') {
      console.log('Spam detected via honeypot:', requestData);
      throw new SpamError();
    }

    // Validate and sanitize form data
    const formData: ContactFormData = validateAndSanitizeFormData(requestData);

    // Verify Turnstile token
    const isValidToken = await verifyTurnstileToken(formData.turnstileToken, env.TURNSTILE_SECRET_KEY);
    if (!isValidToken) {
      throw new ContactFormError('CAPTCHA verification failed', 400);
    }

    // Prepare email metadata
    const metadata = {
      ip: clientIP,
      userAgent: request.headers.get('User-Agent') || undefined,
      timestamp: new Date(),
    };

    // Generate email content
    const emailSubject = generateEmailSubject(formData);
    const emailHTML = generateHTMLEmail(formData, metadata);
    const emailText = generatePlainTextEmail(formData, metadata);

    // Check for API key
    if (!env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured, logging email instead');
      console.log('Would send email:', {
        to: env.FORM_SUBMISSION_EMAIL,
        subject: emailSubject,
        formData,
        metadata,
      });
    } else {
      // Send email via Resend
      await sendEmail(
        env.RESEND_API_KEY,
        env.FORM_SUBMISSION_EMAIL,
        emailSubject,
        emailHTML,
        emailText,
        formData.email
      );
    }

    // Return success response
    const successResponse: SuccessResponse = {
      success: true,
      message: 'Thank you for your inquiry! We will get back to you within 24 hours.',
    };

    return new Response(JSON.stringify(successResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...getCORSHeaders(env.ALLOWED_ORIGIN),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
      },
    });
  } catch (error) {
    // Log error for debugging
    console.error('Contact form error:', error);

    // Return appropriate error response
    const errorResponse = createErrorResponse(error as Error);
    
    // Add CORS headers to error response
    const headers = new Headers(errorResponse.headers);
    const corsHeaders = getCORSHeaders(env.ALLOWED_ORIGIN);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });

    return new Response(errorResponse.body, {
      status: errorResponse.status,
      headers,
    });
  }
}

/**
 * Main worker entry point
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleCORS(request.headers.get('Origin') || '', env.ALLOWED_ORIGIN);
    }

    // Route to contact form handler
    if (url.pathname === '/api/contact' || url.pathname === '/') {
      return handleContactForm(request, env);
    }

    // 404 for other routes
    return new Response('Not Found', {
      status: 404,
      headers: getCORSHeaders(env.ALLOWED_ORIGIN),
    });
  },
};
