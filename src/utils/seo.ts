/**
 * SEO Utility Functions
 * 
 * Helper functions for SEO optimization tasks
 */

const SITE_URL = 'https://seoservicesmiami.com';

/**
 * Generate a meta description with optimal length
 * @param content - The content to create description from
 * @param maxLength - Maximum length (default 160 chars)
 * @returns Trimmed description
 */
export function generateMetaDescription(content: string, maxLength: number = 160): string {
  // Remove HTML tags if present
  const cleanContent = content.replace(/<[^>]*>/g, '');
  
  // Trim whitespace
  const trimmed = cleanContent.trim();
  
  if (trimmed.length <= maxLength) {
    return trimmed;
  }
  
  // Find the last complete word within maxLength
  const truncated = trimmed.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

/**
 * Create a URL-friendly slug from text
 * @param text - The text to convert to slug
 * @returns URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

/**
 * Extract keywords from content
 * @param content - The content to extract keywords from
 * @param maxKeywords - Maximum number of keywords to return
 * @returns Array of keywords
 */
export function extractKeywords(content: string, maxKeywords: number = 10): string[] {
  // Remove HTML tags and special characters
  const cleanContent = content
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\s]/g, ' ')
    .toLowerCase();
  
  // Split into words
  const words = cleanContent.split(/\s+/);
  
  // Common stop words to filter out
  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
    'to', 'was', 'will', 'with', 'the', 'this', 'but', 'they', 'have',
    'had', 'what', 'when', 'where', 'who', 'which', 'why', 'how'
  ]);
  
  // Count word frequency
  const wordFrequency: Record<string, number> = {};
  
  words.forEach(word => {
    const trimmed = word.trim();
    if (trimmed.length > 3 && !stopWords.has(trimmed)) {
      wordFrequency[trimmed] = (wordFrequency[trimmed] || 0) + 1;
    }
  });
  
  // Sort by frequency and return top keywords
  return Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

/**
 * Generate a canonical URL
 * @param path - The path to generate canonical URL for
 * @returns Full canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Remove trailing slash
  const normalizedPath = cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : cleanPath;
  
  // Construct full URL
  return normalizedPath ? `${SITE_URL}/${normalizedPath}` : SITE_URL;
}

/**
 * Validate JSON-LD schema structure
 * @param schema - The schema object to validate
 * @returns Validation result with any errors
 */
export function validateSchema(schema: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check for @context
  if (!schema['@context']) {
    errors.push('Missing @context property');
  }
  
  // Check for @type
  if (!schema['@type']) {
    errors.push('Missing @type property');
  }
  
  // Validate common required fields based on type
  if (schema['@type'] === 'Organization' || schema['@type'] === 'ProfessionalService') {
    if (!schema.name) errors.push('Missing name property');
    if (!schema.url) errors.push('Missing url property');
  }
  
  if (schema['@type'] === 'FAQPage') {
    if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
      errors.push('FAQPage must have mainEntity array');
    }
  }
  
  if (schema['@type'] === 'Review') {
    if (!schema.reviewRating) errors.push('Review missing reviewRating');
    if (!schema.author) errors.push('Review missing author');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Generate Open Graph image URL
 * @param imagePath - Path to the image (can be relative or absolute)
 * @returns Full URL to the image
 */
export function generateOgImageUrl(imagePath: string): string {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Format keywords array into a comma-separated string
 * @param keywords - Array of keywords
 * @returns Comma-separated string
 */
export function formatKeywords(keywords: string[]): string {
  return keywords.join(', ');
}

/**
 * Calculate reading time for content
 * @param content - The content to calculate reading time for
 * @param wordsPerMinute - Average reading speed (default 200)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
  const cleanContent = content.replace(/<[^>]*>/g, '');
  const words = cleanContent.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Validate and normalize phone number
 * @param phone - Phone number to validate
 * @returns Normalized phone number or null if invalid
 */
export function normalizePhoneNumber(phone: string): string | null {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Check if it's a valid US phone number (10 digits)
  if (digits.length === 10) {
    return `+1-${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  
  // Check if it already has country code (11 digits)
  if (digits.length === 11 && digits[0] === '1') {
    return `+1-${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  
  return null;
}

/**
 * Generate hreflang tags data
 * @param path - Current page path
 * @returns Array of hreflang objects
 */
export function generateHreflangTags(path: string): Array<{ lang: string; url: string }> {
  const canonicalUrl = generateCanonicalUrl(path);
  
  return [
    { lang: 'en-us', url: canonicalUrl },
    { lang: 'es-us', url: canonicalUrl }, // Spanish version (same URL for now)
    { lang: 'x-default', url: canonicalUrl }
  ];
}

/**
 * Create breadcrumb list from path
 * @param path - Current page path
 * @returns Array of breadcrumb items
 */
export function generateBreadcrumbs(path: string): Array<{ name: string; url: string; position: number }> {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL, position: 1 }
  ];
  
  if (path === '/' || path === '') {
    return breadcrumbs;
  }
  
  const segments = path.split('/').filter(Boolean);
  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      url: `${SITE_URL}${currentPath}`,
      position: index + 2
    });
  });
  
  return breadcrumbs;
}
