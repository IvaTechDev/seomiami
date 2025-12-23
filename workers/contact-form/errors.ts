/**
 * Custom error classes for the contact form worker
 * Provides structured error handling with appropriate HTTP status codes
 */

export class ContactFormError extends Error {
  statusCode: number;
  userMessage: string;

  constructor(message: string, statusCode: number = 500, userMessage?: string) {
    super(message);
    this.name = 'ContactFormError';
    this.statusCode = statusCode;
    this.userMessage = userMessage || 'An unexpected error occurred. Please try again.';
  }
}

export class ValidationError extends ContactFormError {
  field?: string;

  constructor(message: string, field?: string) {
    super(
      message,
      400,
      message
    );
    this.name = 'ValidationError';
    this.field = field;
  }
}

export class RateLimitError extends ContactFormError {
  retryAfter: number;

  constructor(retryAfter: number = 3600) {
    super(
      `Rate limit exceeded. Please try again later.`,
      429,
      `You've submitted too many requests. Please try again in ${Math.ceil(retryAfter / 60)} minutes.`
    );
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

export class SpamError extends ContactFormError {
  constructor() {
    super(
      'Spam detected',
      403,
      'Your submission was flagged as spam. Please contact us directly if this is an error.'
    );
    this.name = 'SpamError';
  }
}

export class EmailDeliveryError extends ContactFormError {
  constructor(originalError?: string) {
    super(
      `Email delivery failed: ${originalError || 'Unknown error'}`,
      500,
      'We encountered an issue sending your message. Please try again or contact us directly.'
    );
    this.name = 'EmailDeliveryError';
  }
}

/**
 * Format error response for API
 */
export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
    field?: string;
    retryAfter?: number;
  };
}

export function formatErrorResponse(error: Error): ErrorResponse {
  if (error instanceof ValidationError) {
    return {
      success: false,
      error: {
        message: error.userMessage,
        code: 'VALIDATION_ERROR',
        field: error.field,
      },
    };
  }

  if (error instanceof RateLimitError) {
    return {
      success: false,
      error: {
        message: error.userMessage,
        code: 'RATE_LIMIT_EXCEEDED',
        retryAfter: error.retryAfter,
      },
    };
  }

  if (error instanceof SpamError) {
    return {
      success: false,
      error: {
        message: error.userMessage,
        code: 'SPAM_DETECTED',
      },
    };
  }

  if (error instanceof EmailDeliveryError) {
    return {
      success: false,
      error: {
        message: error.userMessage,
        code: 'EMAIL_DELIVERY_FAILED',
      },
    };
  }

  if (error instanceof ContactFormError) {
    return {
      success: false,
      error: {
        message: error.userMessage,
        code: 'CONTACT_FORM_ERROR',
      },
    };
  }

  // Generic error
  return {
    success: false,
    error: {
      message: 'An unexpected error occurred. Please try again.',
      code: 'INTERNAL_ERROR',
    },
  };
}

/**
 * Create error response with proper headers
 */
export function createErrorResponse(error: Error): Response {
  const statusCode = error instanceof ContactFormError ? error.statusCode : 500;
  const errorResponse = formatErrorResponse(error);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add Retry-After header for rate limit errors
  if (error instanceof RateLimitError) {
    headers['Retry-After'] = error.retryAfter.toString();
  }

  return new Response(JSON.stringify(errorResponse), {
    status: statusCode,
    headers,
  });
}
