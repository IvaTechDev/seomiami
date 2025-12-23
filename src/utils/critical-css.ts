/**
 * Critical CSS Utility
 * 
 * This utility helps manage critical CSS for above-the-fold content
 * to improve First Contentful Paint (FCP) and Largest Contentful Paint (LCP)
 */

/**
 * Extract critical CSS rules for above-the-fold content
 * This should include only the styles necessary to render the visible content
 */
export const criticalCSS = `
  /* Reset & Base Styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  :root {
    /* Color System */
    --primary-50: #eff6ff;
    --primary-100: #dbeafe;
    --primary-200: #bfdbfe;
    --primary-300: #93c5fd;
    --primary-400: #60a5fa;
    --primary-500: #3b82f6;
    --primary-600: #2563eb;
    --primary-700: #1d4ed8;
    --primary-800: #1e40af;
    --primary-900: #1e3a8a;
    
    /* Spacing */
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 2rem;
    --spacing-xl: 4rem;
    
    /* Typography */
    --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-heading: 'Syne', 'Inter', sans-serif;
  }
  
  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }
  
  body {
    margin: 0;
    font-family: var(--font-body);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  
  /* Hero Section Critical Styles */
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
  }
  
  /* Navigation Critical Styles */
  .navigation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    will-change: transform;
  }
  
  /* Prevent Layout Shifts */
  img, video {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  /* Loading State */
  .loading {
    content-visibility: auto;
  }
`;

/**
 * Get critical CSS as a string to inline in the head
 */
export function getCriticalCSS(): string {
  return criticalCSS.trim();
}

/**
 * Check if an element is above the fold
 * Can be used at build time or runtime
 */
export function isAboveFold(elementSelector: string): boolean {
  if (typeof window === 'undefined') {
    // During SSR, assume first section is above the fold
    return elementSelector.includes('hero') || elementSelector.includes('nav');
  }
  
  const element = document.querySelector(elementSelector);
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight;
}

/**
 * Defer non-critical CSS loading
 * Use media="print" trick for async CSS loading
 */
export function deferCSS(href: string): string {
  return `
    <link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="${href}"></noscript>
  `;
}

/**
 * Preload critical fonts
 */
export function preloadFont(href: string, type: string = 'font/woff2'): string {
  return `<link rel="preload" href="${href}" as="font" type="${type}" crossorigin>`;
}

/**
 * Generate resource hints for better performance
 */
export function generateResourceHints(domains: string[]): string {
  return domains
    .map(domain => `<link rel="dns-prefetch" href="${domain}">`)
    .join('\n');
}
