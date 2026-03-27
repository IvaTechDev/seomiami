/**
 * Miami-Dade County neighborhoods data for interactive map
 */

export interface Neighborhood {
  id: string;
  name: string;
  slug: string;
  description: string;
  activeClients: number;
  avgRankingImprovement: number; // percentage
  coordinates: {
    x: number; // SVG coordinate (0-100)
    y: number; // SVG coordinate (0-100)
  };
  color: string; // for map visualization
}

export const miamiNeighborhoods: Neighborhood[] = [
  {
    id: 'downtown',
    name: 'Downtown Miami',
    slug: 'downtown-miami',
    description: 'Financial and cultural hub of Miami.',
    activeClients: 24,
    avgRankingImprovement: 156,
    coordinates: { x: 50, y: 55 },
    color: '#FF0080',
  },
  {
    id: 'brickell',
    name: 'Brickell',
    slug: 'brickell',
    description: 'Luxury high-rise neighborhood with upscale dining.',
    activeClients: 31,
    avgRankingImprovement: 178,
    coordinates: { x: 52, y: 60 },
    color: '#7928CA',
  },
  {
    id: 'coral-gables',
    name: 'Coral Gables',
    slug: 'coral-gables',
    description: 'Prestigious neighborhood with Mediterranean-style architecture.',
    activeClients: 19,
    avgRankingImprovement: 142,
    coordinates: { x: 42, y: 65 },
    color: '#FF0080',
  },
  {
    id: 'wynwood',
    name: 'Wynwood',
    slug: 'wynwood',
    description: 'Art district known for murals and creative businesses.',
    activeClients: 27,
    avgRankingImprovement: 189,
    coordinates: { x: 55, y: 50 },
    color: '#00DFD8',
  },
  {
    id: 'miami-beach',
    name: 'Miami Beach',
    slug: 'miami-beach',
    description: 'World-famous beach destination with vibrant nightlife.',
    activeClients: 42,
    avgRankingImprovement: 203,
    coordinates: { x: 75, y: 48 },
    color: '#7928CA',
  },
  {
    id: 'coconut-grove',
    name: 'Coconut Grove',
    slug: 'coconut-grove',
    description: 'Bohemian waterfront neighborhood with lush greenery.',
    activeClients: 16,
    avgRankingImprovement: 134,
    coordinates: { x: 48, y: 70 },
    color: '#FF0080',
  },
  {
    id: 'little-havana',
    name: 'Little Havana',
    slug: 'little-havana',
    description: 'Cultural heart of Miami with Cuban heritage.',
    activeClients: 22,
    avgRankingImprovement: 167,
    coordinates: { x: 45, y: 58 },
    color: '#00DFD8',
  },
  {
    id: 'design-district',
    name: 'Design District',
    slug: 'design-district',
    description: 'Luxury shopping and art destination.',
    activeClients: 18,
    avgRankingImprovement: 145,
    coordinates: { x: 57, y: 48 },
    color: '#7928CA',
  },
  {
    id: 'aventura',
    name: 'Aventura',
    slug: 'aventura',
    description: 'Upscale shopping and residential area.',
    activeClients: 25,
    avgRankingImprovement: 171,
    coordinates: { x: 60, y: 25 },
    color: '#00DFD8',
  },
  {
    id: 'key-biscayne',
    name: 'Key Biscayne',
    slug: 'key-biscayne',
    description: 'Island paradise with beautiful beaches.',
    activeClients: 13,
    avgRankingImprovement: 128,
    coordinates: { x: 65, y: 75 },
    color: '#FF0080',
  },
];

export const coverageDensityLevels = [
  { label: 'High Coverage', minClients: 30, color: '#7928CA' },
  { label: 'Medium Coverage', minClients: 20, color: '#FF0080' },
  { label: 'Growing Coverage', minClients: 10, color: '#00DFD8' },
];
