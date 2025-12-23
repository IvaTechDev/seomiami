/**
 * Before/After case study data for comparison slider
 */

export interface CaseStudy {
  id: string;
  clientName: string;
  industry: string;
  location: string;
  timeframe: string; // "6 months", "12 months", etc.
  before: {
    ranking: number | string; // "Page 3" or specific number
    traffic: number; // monthly visits
    revenue: number; // monthly revenue
    leads: number; // monthly leads
  };
  after: {
    ranking: number | string;
    traffic: number;
    revenue: number;
    leads: number;
  };
  improvements: {
    rankingChange: string; // "+45 positions"
    trafficIncrease: number; // percentage
    revenueIncrease: number; // percentage
    leadsIncrease: number; // percentage
  };
  screenshot?: {
    before: string; // image path
    after: string; // image path
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'restaurant-chain',
    clientName: 'Local Restaurant Chain',
    industry: 'Food & Dining',
    location: 'Little Havana & Wynwood',
    timeframe: '6 months',
    before: {
      ranking: 'Page 3',
      traffic: 1200,
      revenue: 15000,
      leads: 45,
    },
    after: {
      ranking: '#1-3',
      traffic: 4620,
      revenue: 57750,
      leads: 173,
    },
    improvements: {
      rankingChange: '+45 positions',
      trafficIncrease: 285,
      revenueIncrease: 285,
      leadsIncrease: 284,
    },
  },
  {
    id: 'luxury-real-estate',
    clientName: 'Luxury Real Estate Group',
    industry: 'Real Estate',
    location: 'Brickell & Miami Beach',
    timeframe: '9 months',
    before: {
      ranking: 'Page 2',
      traffic: 850,
      revenue: 250000,
      leads: 12,
    },
    after: {
      ranking: '#1-2',
      traffic: 4420,
      revenue: 1300000,
      leads: 62,
    },
    improvements: {
      rankingChange: '+28 positions',
      trafficIncrease: 420,
      revenueIncrease: 420,
      leadsIncrease: 417,
    },
  },
  {
    id: 'dental-practice',
    clientName: 'Dental Spa',
    industry: 'Healthcare',
    location: 'Coral Gables',
    timeframe: '8 months',
    before: {
      ranking: 'Not Ranked',
      traffic: 320,
      revenue: 28000,
      leads: 18,
    },
    after: {
      ranking: '#1-5',
      traffic: 1318,
      revenue: 115360,
      leads: 74,
    },
    improvements: {
      rankingChange: 'Top 5 rankings',
      trafficIncrease: 312,
      revenueIncrease: 312,
      leadsIncrease: 311,
    },
  },
  {
    id: 'law-firm',
    clientName: 'Maritime Law Firm',
    industry: 'Legal Services',
    location: 'Downtown Miami',
    timeframe: '12 months',
    before: {
      ranking: 'Page 4',
      traffic: 680,
      revenue: 85000,
      leads: 22,
    },
    after: {
      ranking: '#1-3',
      traffic: 2496,
      revenue: 311950,
      leads: 81,
    },
    improvements: {
      rankingChange: '+52 positions',
      trafficIncrease: 267,
      revenueIncrease: 267,
      leadsIncrease: 268,
    },
  },
  {
    id: 'art-gallery',
    clientName: 'Contemporary Art Gallery',
    industry: 'Arts & Culture',
    location: 'Wynwood',
    timeframe: '7 months',
    before: {
      ranking: 'Page 5',
      traffic: 450,
      revenue: 12000,
      leads: 8,
    },
    after: {
      ranking: '#2-4',
      traffic: 1301,
      revenue: 34680,
      leads: 23,
    },
    improvements: {
      rankingChange: '+38 positions',
      trafficIncrease: 189,
      revenueIncrease: 189,
      leadsIncrease: 188,
    },
  },
];
