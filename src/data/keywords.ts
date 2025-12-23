/**
 * Target Keywords Strategy for SEOSERVICESMIAMI.COM
 * 
 * Organized keyword strategy based on search volume and intent
 * Source: Google Keyword Planner, Ahrefs analysis
 */

export interface KeywordData {
  keyword: string;
  monthlySearches: number;
  difficulty: 'low' | 'medium' | 'high';
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
}

// Primary target keywords (highest priority)
export const primaryKeywords: KeywordData[] = [
  {
    keyword: 'Miami SEO',
    monthlySearches: 2900,
    difficulty: 'high',
    intent: 'commercial',
  },
  {
    keyword: 'SEO Miami',
    monthlySearches: 1600,
    difficulty: 'high',
    intent: 'commercial',
  },
  {
    keyword: 'Miami SEO Company',
    monthlySearches: 880,
    difficulty: 'high',
    intent: 'commercial',
  },
  {
    keyword: 'SEO Services Miami',
    monthlySearches: 720,
    difficulty: 'medium',
    intent: 'transactional',
  },
  {
    keyword: 'Miami SEO Agency',
    monthlySearches: 590,
    difficulty: 'medium',
    intent: 'commercial',
  },
];

// Secondary keywords by category
export const serviceKeywords: Record<string, KeywordData[]> = {
  local: [
    {
      keyword: 'Local SEO Miami',
      monthlySearches: 480,
      difficulty: 'medium',
      intent: 'commercial',
    },
    {
      keyword: 'Google My Business Optimization Miami',
      monthlySearches: 210,
      difficulty: 'low',
      intent: 'transactional',
    },
    {
      keyword: 'Miami Local Search Optimization',
      monthlySearches: 170,
      difficulty: 'low',
      intent: 'commercial',
    },
  ],
  ecommerce: [
    {
      keyword: 'E-commerce SEO Miami',
      monthlySearches: 320,
      difficulty: 'medium',
      intent: 'commercial',
    },
    {
      keyword: 'Shopify SEO Miami',
      monthlySearches: 190,
      difficulty: 'low',
      intent: 'commercial',
    },
    {
      keyword: 'Online Store SEO Miami',
      monthlySearches: 140,
      difficulty: 'low',
      intent: 'commercial',
    },
  ],
  technical: [
    {
      keyword: 'Technical SEO Audit Miami',
      monthlySearches: 260,
      difficulty: 'medium',
      intent: 'transactional',
    },
    {
      keyword: 'Website SEO Analysis Miami',
      monthlySearches: 180,
      difficulty: 'low',
      intent: 'informational',
    },
    {
      keyword: 'SEO Site Audit Miami',
      monthlySearches: 150,
      difficulty: 'low',
      intent: 'transactional',
    },
  ],
  contentMarketing: [
    {
      keyword: 'Content Marketing Miami',
      monthlySearches: 390,
      difficulty: 'medium',
      intent: 'commercial',
    },
    {
      keyword: 'Link Building Services Miami',
      monthlySearches: 220,
      difficulty: 'medium',
      intent: 'transactional',
    },
    {
      keyword: 'SEO Content Writing Miami',
      monthlySearches: 170,
      difficulty: 'low',
      intent: 'commercial',
    },
  ],
};

// Long-tail keywords (lower volume, higher intent)
export const longTailKeywords: KeywordData[] = [
  {
    keyword: 'Best SEO Company in Miami',
    monthlySearches: 320,
    difficulty: 'medium',
    intent: 'commercial',
  },
  {
    keyword: 'Affordable SEO Services Miami',
    monthlySearches: 290,
    difficulty: 'low',
    intent: 'transactional',
  },
  {
    keyword: 'Miami SEO Expert',
    monthlySearches: 260,
    difficulty: 'medium',
    intent: 'commercial',
  },
  {
    keyword: 'SEO Consultant Miami',
    monthlySearches: 240,
    difficulty: 'medium',
    intent: 'commercial',
  },
  {
    keyword: 'Miami SEO Services for Small Business',
    monthlySearches: 180,
    difficulty: 'low',
    intent: 'transactional',
  },
  {
    keyword: 'Bilingual SEO Services Miami',
    monthlySearches: 140,
    difficulty: 'low',
    intent: 'commercial',
  },
  {
    keyword: 'Spanish SEO Miami',
    monthlySearches: 110,
    difficulty: 'low',
    intent: 'commercial',
  },
  {
    keyword: 'Miami SEO Company Near Me',
    monthlySearches: 95,
    difficulty: 'low',
    intent: 'navigational',
  },
];

// Industry-specific keywords
export const industryKeywords: Record<string, KeywordData[]> = {
  legal: [
    {
      keyword: 'SEO for Law Firms Miami',
      monthlySearches: 210,
      difficulty: 'medium',
      intent: 'commercial',
    },
    {
      keyword: 'Lawyer SEO Miami',
      monthlySearches: 170,
      difficulty: 'medium',
      intent: 'commercial',
    },
    {
      keyword: 'Attorney SEO Services Miami',
      monthlySearches: 140,
      difficulty: 'low',
      intent: 'transactional',
    },
  ],
  realEstate: [
    {
      keyword: 'Real Estate SEO Miami',
      monthlySearches: 280,
      difficulty: 'medium',
      intent: 'commercial',
    },
    {
      keyword: 'Realtor SEO Miami',
      monthlySearches: 190,
      difficulty: 'low',
      intent: 'commercial',
    },
    {
      keyword: 'Property SEO Miami',
      monthlySearches: 120,
      difficulty: 'low',
      intent: 'commercial',
    },
  ],
  medical: [
    {
      keyword: 'Medical SEO Miami',
      monthlySearches: 240,
      difficulty: 'medium',
      intent: 'commercial',
    },
    {
      keyword: 'Healthcare SEO Miami',
      monthlySearches: 180,
      difficulty: 'low',
      intent: 'commercial',
    },
    {
      keyword: 'Dental SEO Miami',
      monthlySearches: 160,
      difficulty: 'low',
      intent: 'commercial',
    },
  ],
  restaurants: [
    {
      keyword: 'Restaurant SEO Miami',
      monthlySearches: 220,
      difficulty: 'medium',
      intent: 'commercial',
    },
    {
      keyword: 'Food SEO Miami',
      monthlySearches: 150,
      difficulty: 'low',
      intent: 'commercial',
    },
    {
      keyword: 'Miami Restaurant Marketing',
      monthlySearches: 190,
      difficulty: 'medium',
      intent: 'commercial',
    },
  ],
};

// Location-based keywords (neighborhood targeting)
export const locationKeywords: Record<string, KeywordData[]> = {
  brickell: [
    {
      keyword: 'SEO Services Brickell',
      monthlySearches: 140,
      difficulty: 'low',
      intent: 'commercial',
    },
    {
      keyword: 'Brickell SEO Company',
      monthlySearches: 90,
      difficulty: 'low',
      intent: 'commercial',
    },
  ],
  coralGables: [
    {
      keyword: 'SEO Coral Gables',
      monthlySearches: 120,
      difficulty: 'low',
      intent: 'commercial',
    },
    {
      keyword: 'Coral Gables SEO Services',
      monthlySearches: 80,
      difficulty: 'low',
      intent: 'commercial',
    },
  ],
  wynwood: [
    {
      keyword: 'Wynwood SEO',
      monthlySearches: 95,
      difficulty: 'low',
      intent: 'commercial',
    },
    {
      keyword: 'SEO Services Wynwood',
      monthlySearches: 70,
      difficulty: 'low',
      intent: 'commercial',
    },
  ],
  miamiBeach: [
    {
      keyword: 'Miami Beach SEO',
      monthlySearches: 180,
      difficulty: 'medium',
      intent: 'commercial',
    },
    {
      keyword: 'South Beach SEO Services',
      monthlySearches: 110,
      difficulty: 'low',
      intent: 'commercial',
    },
  ],
  doral: [
    {
      keyword: 'SEO Doral',
      monthlySearches: 130,
      difficulty: 'low',
      intent: 'commercial',
    },
    {
      keyword: 'Doral SEO Company',
      monthlySearches: 85,
      difficulty: 'low',
      intent: 'commercial',
    },
  ],
};

// Question-based keywords (featured snippet opportunities)
export const questionKeywords: KeywordData[] = [
  {
    keyword: 'What is Local SEO',
    monthlySearches: 8100,
    difficulty: 'low',
    intent: 'informational',
  },
  {
    keyword: 'How much does SEO cost',
    monthlySearches: 5400,
    difficulty: 'low',
    intent: 'informational',
  },
  {
    keyword: 'How long does SEO take',
    monthlySearches: 3600,
    difficulty: 'low',
    intent: 'informational',
  },
  {
    keyword: 'What does an SEO company do',
    monthlySearches: 2400,
    difficulty: 'low',
    intent: 'informational',
  },
  {
    keyword: 'Why is SEO important',
    monthlySearches: 1900,
    difficulty: 'low',
    intent: 'informational',
  },
  {
    keyword: 'How to choose an SEO company',
    monthlySearches: 890,
    difficulty: 'low',
    intent: 'informational',
  },
];

// Competitor keywords
export const competitorKeywords: string[] = [
  'Thrive Internet Marketing Miami',
  'WebFX Miami',
  'Boostability Miami',
  'Ignite Visibility Miami',
  'Victorious SEO Miami',
];

// All keywords combined (for easy access)
export const allKeywords = {
  primary: primaryKeywords,
  service: serviceKeywords,
  longTail: longTailKeywords,
  industry: industryKeywords,
  location: locationKeywords,
  question: questionKeywords,
  competitor: competitorKeywords,
};

// Helper function to get keywords by difficulty
export function getKeywordsByDifficulty(difficulty: 'low' | 'medium' | 'high'): KeywordData[] {
  const keywords: KeywordData[] = [];
  
  keywords.push(...primaryKeywords.filter(k => k.difficulty === difficulty));
  keywords.push(...longTailKeywords.filter(k => k.difficulty === difficulty));
  keywords.push(...questionKeywords.filter(k => k.difficulty === difficulty));
  
  Object.values(serviceKeywords).forEach(categoryKeywords => {
    keywords.push(...categoryKeywords.filter(k => k.difficulty === difficulty));
  });
  
  Object.values(industryKeywords).forEach(categoryKeywords => {
    keywords.push(...categoryKeywords.filter(k => k.difficulty === difficulty));
  });
  
  Object.values(locationKeywords).forEach(categoryKeywords => {
    keywords.push(...categoryKeywords.filter(k => k.difficulty === difficulty));
  });
  
  return keywords;
}

// Helper function to get keywords by intent
export function getKeywordsByIntent(intent: KeywordData['intent']): KeywordData[] {
  const keywords: KeywordData[] = [];
  
  keywords.push(...primaryKeywords.filter(k => k.intent === intent));
  keywords.push(...longTailKeywords.filter(k => k.intent === intent));
  keywords.push(...questionKeywords.filter(k => k.intent === intent));
  
  Object.values(serviceKeywords).forEach(categoryKeywords => {
    keywords.push(...categoryKeywords.filter(k => k.intent === intent));
  });
  
  Object.values(industryKeywords).forEach(categoryKeywords => {
    keywords.push(...categoryKeywords.filter(k => k.intent === intent));
  });
  
  Object.values(locationKeywords).forEach(categoryKeywords => {
    keywords.push(...categoryKeywords.filter(k => k.intent === intent));
  });
  
  return keywords;
}

// Export keyword strings for meta tags
export const primaryKeywordString = primaryKeywords.map(k => k.keyword).join(', ');
export const serviceKeywordString = Object.values(serviceKeywords)
  .flat()
  .map(k => k.keyword)
  .slice(0, 10)
  .join(', ');
