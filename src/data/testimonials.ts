/**
 * Client testimonials data
 */

export interface Testimonial {
  id: string;
  name: string;
  business: string;
  location: string;
  rating: number; // 1-5
  quote: string;
  photo?: string; // optional photo URL
  results?: string; // optional mini result stat
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Rodriguez',
    business: 'Rodriguez & Sons Restaurants',
    location: 'Little Havana, Miami',
    rating: 5,
    quote: "Within 6 months, we went from page 3 to consistently ranking #1 for 'Cuban restaurant Miami'. Our online orders have tripled and we've opened two new locations. The ROI has been absolutely incredible.",
    results: '+285% organic traffic',
  },
  {
    id: '2',
    name: 'Jennifer Martinez',
    business: 'Miami Luxury Real Estate Group',
    location: 'Brickell, Miami',
    rating: 5,
    quote: "As a luxury realtor in Brickell, being visible online is everything. Their Miami-focused SEO strategy got us ranking for high-value keywords. We now generate 15-20 qualified leads per month through our website alone.",
    results: '+420% online leads',
  },
  {
    id: '3',
    name: 'Dr. Michael Chen',
    business: 'Miami Dental Spa',
    location: 'Coral Gables, Miami',
    rating: 5,
    quote: "Their local SEO expertise transformed our practice. We now dominate local search results and Google Maps. New patient bookings from organic search increased by over 300%. Best investment we've made.",
    results: '+312% new patients',
  },
  {
    id: '4',
    name: 'Sofia Alvarez',
    business: 'Wynwood Art Gallery',
    location: 'Wynwood, Miami',
    rating: 5,
    quote: "They understood the unique Miami art scene and positioned our gallery perfectly in search. We've seen tremendous growth in both local visitors and international collectors finding us online. Their creative approach matched our brand perfectly.",
    results: '+189% website visits',
  },
  {
    id: '5',
    name: 'David Thompson',
    business: 'Atlantic Coast Law Firm',
    location: 'Downtown Miami',
    rating: 5,
    quote: "Competing in Miami's legal market is tough, but their technical SEO expertise gave us the edge. We now rank on page 1 for multiple practice areas and receive 40+ consultation requests monthly. Their reporting is transparent and results-driven.",
    results: '+267% consultation requests',
  },
];
