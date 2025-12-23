/**
 * Centralized SEO Metadata for SEOSERVICESMIAMI.COM
 * 
 * Page-specific meta descriptions, keywords, and schema data
 */

import { primaryKeywordString, serviceKeywordString } from './keywords';

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
}

// Homepage metadata
export const homePage: PageMetadata = {
  title: 'Miami SEO Services | Top-Rated SEO Agency in Miami',
  description: 'Expert SEO services in Miami with proven results. Dominate local search, increase traffic, and grow your business with our data-driven SEO strategies. Free audit available.',
  keywords: primaryKeywordString,
  ogImage: '/images/og-default.png',
};

// Service-specific metadata
export const serviceMetadata: Record<string, PageMetadata> = {
  localSEO: {
    title: 'Local SEO Miami | Dominate Google Maps & Local Search',
    description: 'Rank #1 in Miami local search results. Expert Google Business Profile optimization, citation building, and local link strategies. 300% average traffic increase.',
    keywords: 'Local SEO Miami, Google My Business Optimization Miami, Miami Local Search, Local SEO Services Miami, Google Maps Ranking Miami',
    ogImage: '/images/services/local-seo-miami.jpg',
  },
  ecommerce: {
    title: 'E-commerce SEO Miami | Shopify & Online Store Optimization',
    description: 'Drive qualified traffic and increase online sales with expert e-commerce SEO. Shopify optimization, product page SEO, and conversion strategies for Miami stores.',
    keywords: 'E-commerce SEO Miami, Shopify SEO Miami, Online Store SEO, E-commerce Optimization Miami, Product SEO',
    ogImage: '/images/services/ecommerce-seo-miami.jpg',
  },
  technical: {
    title: 'Technical SEO Audit Miami | Find & Fix Critical Issues',
    description: 'Comprehensive technical SEO audit identifying site speed issues, indexing problems, and Core Web Vitals. Get a detailed roadmap to improve rankings.',
    keywords: 'Technical SEO Audit Miami, SEO Site Audit, Website SEO Analysis Miami, Technical SEO Services, SEO Audit Report',
    ogImage: '/images/services/technical-seo-audit.jpg',
  },
  contentMarketing: {
    title: 'Content Marketing & Link Building Miami | SEO Content Strategy',
    description: 'Build authority with high-quality content and strategic link building. Expert SEO copywriting and outreach services for Miami businesses.',
    keywords: 'Content Marketing Miami, Link Building Services Miami, SEO Content Writing, Content Strategy, Backlink Building Miami',
    ogImage: '/images/services/content-marketing-miami.jpg',
  },
};

// Location-specific metadata (for future neighborhood pages)
export const locationMetadata: Record<string, PageMetadata> = {
  brickell: {
    title: 'SEO Services Brickell | Local SEO Agency in Brickell, Miami',
    description: 'Expert SEO services for Brickell businesses. Dominate local search in Miami\'s financial district. Proven strategies for law firms, real estate, and professional services.',
    keywords: 'SEO Brickell, Brickell SEO Company, SEO Services Brickell Miami, Local SEO Brickell',
  },
  coralGables: {
    title: 'Coral Gables SEO Services | Local SEO Agency',
    description: 'Premier SEO services for Coral Gables businesses. Increase visibility in this prestigious Miami neighborhood. Specialized in luxury brands and professional services.',
    keywords: 'SEO Coral Gables, Coral Gables SEO Company, Local SEO Coral Gables, SEO Services Coral Gables',
  },
  wynwood: {
    title: 'Wynwood SEO Services | Creative District Marketing',
    description: 'Innovative SEO strategies for Wynwood\'s creative businesses. Perfect for art galleries, restaurants, and boutique shops in Miami\'s arts district.',
    keywords: 'SEO Wynwood, Wynwood SEO Services, Local SEO Wynwood Miami, Wynwood Business Marketing',
  },
  miamiBeach: {
    title: 'Miami Beach SEO | South Beach Local SEO Services',
    description: 'Expert SEO for Miami Beach and South Beach businesses. Dominate local tourism search, restaurant rankings, and hospitality industry results.',
    keywords: 'Miami Beach SEO, South Beach SEO, SEO Services Miami Beach, Local SEO Miami Beach',
  },
  doral: {
    title: 'Doral SEO Services | Local SEO Agency in Doral',
    description: 'Professional SEO services for Doral businesses. Reach bilingual audiences and dominate local search in West Miami-Dade County.',
    keywords: 'SEO Doral, Doral SEO Company, Local SEO Doral, SEO Services Doral Miami',
  },
};

// Industry-specific metadata
export const industryMetadata: Record<string, PageMetadata> = {
  legal: {
    title: 'SEO for Law Firms Miami | Attorney & Lawyer SEO Services',
    description: 'Dominate legal search results in Miami. Specialized SEO for personal injury, criminal defense, family law, and corporate attorneys. Get more qualified leads.',
    keywords: 'SEO for Law Firms Miami, Lawyer SEO Miami, Attorney SEO Services, Legal SEO Miami, Law Firm Marketing',
  },
  realEstate: {
    title: 'Real Estate SEO Miami | Realtor & Property SEO Services',
    description: 'Increase property visibility and generate more leads. Expert SEO for realtors, brokers, and property developers in the Miami real estate market.',
    keywords: 'Real Estate SEO Miami, Realtor SEO, Property SEO Miami, Real Estate Marketing Miami',
  },
  medical: {
    title: 'Medical SEO Miami | Healthcare & Dental Practice SEO',
    description: 'Attract more patients with healthcare SEO. Specialized services for medical practices, dental offices, and healthcare providers in Miami.',
    keywords: 'Medical SEO Miami, Healthcare SEO, Dental SEO Miami, Doctor SEO Services, Medical Practice Marketing',
  },
  restaurants: {
    title: 'Restaurant SEO Miami | Food & Hospitality SEO Services',
    description: 'Fill tables with hungry customers. Expert SEO for restaurants, cafes, and food businesses. Dominate local search and food delivery platforms.',
    keywords: 'Restaurant SEO Miami, Food SEO, Restaurant Marketing Miami, Local SEO for Restaurants',
  },
};

// Pricing page metadata
export const pricingPage: PageMetadata = {
  title: 'SEO Pricing Miami | Transparent SEO Service Packages',
  description: 'Clear, transparent SEO pricing for Miami businesses. Choose from Starter, Professional, or Enterprise packages. No hidden fees. Free consultation and audit included.',
  keywords: 'SEO Pricing Miami, SEO Packages Miami, SEO Cost, Affordable SEO Services Miami, SEO Package Prices',
  ogImage: '/images/seo-pricing-miami.jpg',
};

// Case studies metadata
export const caseStudiesPage: PageMetadata = {
  title: 'Miami SEO Case Studies | Proven Results & Success Stories',
  description: 'Real results from real Miami businesses. See how we achieved 300% traffic increases, first-page rankings, and ROI improvements for our clients.',
  keywords: 'SEO Case Studies Miami, SEO Results, SEO Success Stories, Miami SEO Portfolio, SEO ROI',
  ogImage: '/images/case-studies/seo-results-miami.jpg',
};

// Contact page metadata
export const contactPage: PageMetadata = {
  title: 'Contact Miami SEO Agency | Free SEO Audit & Consultation',
  description: 'Get started with a free SEO audit and consultation. Contact our Miami SEO experts today. Fast response, no obligation, and transparent pricing.',
  keywords: 'Contact SEO Miami, Free SEO Audit Miami, SEO Consultation Miami, Miami SEO Agency Contact',
  ogImage: '/images/contact-miami-seo.jpg',
};

// Schema data templates
export const schemaTemplates = {
  professionalService: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SEO Services Miami',
    description: 'Premier SEO agency in Miami specializing in local SEO, e-commerce optimization, and technical SEO audits.',
    url: 'https://seoservicesmiami.com',
    telephone: '+1-305-555-0123',
    email: 'contact@seoservicesmiami.com',
    priceRange: '$$',
    areaServed: 'Miami-Dade County',
  },
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'SEO Services Miami',
    image: 'https://seoservicesmiami.com/images/logo.png',
    '@id': 'https://seoservicesmiami.com',
    url: 'https://seoservicesmiami.com',
    telephone: '+1-305-555-0123',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1450 Brickell Avenue, Suite 1800',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      postalCode: '33131',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.7617,
      longitude: -80.1918,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  },
};

// NAP (Name, Address, Phone) - Ensure consistency across all platforms
export const businessNAP = {
  name: 'SEO Services Miami',
  address: {
    street: '1450 Brickell Avenue, Suite 1800',
    city: 'Miami',
    state: 'FL',
    zip: '33131',
    country: 'United States',
    full: '1450 Brickell Avenue, Suite 1800, Miami, FL 33131',
  },
  phone: '+1-305-555-0123',
  email: 'contact@seoservicesmiami.com',
  geo: {
    latitude: 25.7617,
    longitude: -80.1918,
  },
};

// Social media profiles
export const socialProfiles = {
  facebook: 'https://www.facebook.com/seoservicesmiami',
  twitter: 'https://www.twitter.com/seomiami',
  linkedin: 'https://www.linkedin.com/company/seo-services-miami',
  instagram: 'https://www.instagram.com/seoservicesmiami',
  youtube: 'https://www.youtube.com/@seoservicesmiami',
};

// Default OG images for different sections
export const ogImages = {
  default: '/images/og-default.png',
  services: '/images/og-services.jpg',
  pricing: '/images/og-pricing.jpg',
  caseStudies: '/images/og-case-studies.jpg',
  blog: '/images/og-blog.jpg',
};

// Helper function to get metadata by page
export function getPageMetadata(page: string): PageMetadata {
  const metadataMap: Record<string, PageMetadata> = {
    home: homePage,
    pricing: pricingPage,
    'case-studies': caseStudiesPage,
    contact: contactPage,
    ...serviceMetadata,
    ...locationMetadata,
    ...industryMetadata,
  };

  return metadataMap[page] || homePage;
}

// Generate dynamic meta description based on service
export function generateServiceDescription(serviceName: string, location: string = 'Miami'): string {
  return `Expert ${serviceName} services in ${location}. Proven results, transparent pricing, and dedicated support. Get a free consultation and audit today.`;
}

// Generate dynamic title based on service and location
export function generateServiceTitle(serviceName: string, location: string = 'Miami'): string {
  return `${serviceName} ${location} | Professional SEO Services`;
}
