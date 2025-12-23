# SEOSERVICESMIAMI.COM

A high-performance, one-page SEO service website built with Astro, Tailwind CSS, and hosted on Cloudflare Pages.

## 🚀 Project Overview

**Target:** Miami-based businesses seeking expert SEO services  
**Goal:** 100/100 Lighthouse scores across all metrics  
**Design Theme:** Miami Nights - A modern dark theme with cyan, purple, and pink accents

## 🛠️ Technology Stack

- **Framework:** Astro v4+ (Static Site Generation)
- **Styling:** Tailwind CSS with custom Miami Nights theme
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Interactive Components:** React 18
- **Backend:** Cloudflare Workers
- **Email:** Resend
- **Hosting:** Cloudflare Pages
- **Fonts:** Inter (body), Syne (headings)

## 📁 Project Structure

```
seo/
├── public/              # Static assets
│   ├── fonts/          # Custom fonts
│   ├── images/         # Optimized images
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/         # Asset imports
│   ├── components/
│   │   ├── interactive/ # React components
│   │   ├── layout/     # Layout components
│   │   ├── sections/   # Page sections
│   │   ├── seo/        # SEO components
│   │   └── ui/         # UI components
│   ├── data/           # Static data
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript types
│   └── utils/          # Helper functions
├── workers/            # Cloudflare Workers
│   └── contact-form/   # Form handler
└── plans/              # Project documentation
```

## 🎨 Design System

### Miami Nights Color Palette

- **Navy:** `#0A0E27` - Primary background
- **Charcoal:** `#1A1D2E` - Secondary background
- **Cyan:** `#00D9FF` - Primary accent
- **Purple:** `#9D4EDD` - Secondary accent
- **Pink:** `#FF006E` - Tertiary accent

### Typography

- **Display/Headings:** Syne (700, 800)
- **Body:** Inter (400, 500, 600, 700, 800)

### Key Features

- Glassmorphism design with backdrop blur effects
- Gradient text and button styles
- Smooth scroll animations
- Responsive grid layouts
- Custom glow effects

## 🚦 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd seo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   Navigate to `http://localhost:4321`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run Astro checks
- `npm run format` - Format code with Prettier

## 🔧 Configuration

### Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `@/*` - Root src directory
- `@components/*` - Components directory
- `@layouts/*` - Layouts directory
- `@utils/*` - Utility functions
- `@styles/*` - Style files
- `@data/*` - Data files
- `@types/*` - TypeScript types

### Tailwind Configuration

Custom Tailwind utilities include:
- Glass card variants (light, medium, heavy)
- Glow effects (cyan, purple, pink)
- Gradient text utilities
- Custom animations (fade-in, slide-up, glow)

## 🌐 Deployment

### Cloudflare Pages

1. **Connect Repository:**
   - Link GitHub repository to Cloudflare Pages
   - Set build command: `npm run build`
   - Set build directory: `dist`

2. **Environment Variables:**
   Configure in Cloudflare Pages dashboard:
   - `NODE_VERSION=20`
   - `PUBLIC_SITE_URL=https://seoservicesmiami.com`

3. **Deploy:**
   - Push to main branch triggers automatic deployment
   - Preview deployments on feature branches

### Cloudflare Workers

Contact form handler deployed separately:

```bash
cd workers/contact-form
npm install
wrangler deploy
```

## 📊 SEO Features

- **Schema.org JSON-LD:** ProfessionalService, FAQPage, Review schemas
- **Open Graph:** Full meta tag support
- **Twitter Cards:** Large image cards
- **Sitemap:** Auto-generated with @astrojs/sitemap
- **Robots.txt:** Configured for optimal crawling
- **Local SEO:** Miami neighborhood targeting
- **Structured Data:** Rich snippets ready

## 🎯 Performance Goals & Optimization

### Lighthouse Scores: 100/100 Target

- **Performance:** 100/100
- **Accessibility:** 100/100
- **Best Practices:** 100/100
- **SEO:** 100/100

### Core Web Vitals

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **FCP (First Contentful Paint):** < 1.8s
- **TTI (Time to Interactive):** < 3.8s

### Performance Optimizations Implemented

#### Image Optimization
- **OptimizedImage Component:** [`src/components/ui/OptimizedImage.astro`](src/components/ui/OptimizedImage.astro)
  - Automatic WebP/AVIF generation
  - Responsive srcset for different screen sizes
  - Lazy loading by default (eager for above-fold)
  - Aspect ratio preservation prevents CLS
  - Proper `loading`, `decoding`, and `fetchpriority` attributes

#### Font Optimization
- Preconnect to Google Fonts domains
- Font preloading for critical fonts
- `font-display: swap` to prevent FOIT
- Optimized font loading strategy

#### Critical CSS
- Inline critical above-the-fold CSS
- Defer non-critical CSS loading
- Utility functions in [`src/utils/critical-css.ts`](src/utils/critical-css.ts)

#### JavaScript Optimization
- Optimized React hydration directives:
  - `client:visible` for below-fold interactive components
  - `client:idle` for non-critical components
  - `client:load` only for critical elements
- Code splitting with manual chunks
- Tree shaking enabled
- Minification with esbuild

#### Bundle Optimization
- **Vendor Chunking:** React and Framer Motion separated
- **CSS Code Splitting:** Enabled
- **Asset Optimization:** Hash-based filenames for caching
- **Target:** ES2020 for smaller bundles
- See [`astro.config.mjs`](astro.config.mjs) for full config

#### Animation Performance
- Hardware-accelerated animations (transform3d)
- `will-change` optimization
- GPU acceleration for smooth 60fps
- Respect `prefers-reduced-motion`
- See [`src/styles/global.css`](src/styles/global.css)

#### Accessibility Features
- Skip links for keyboard navigation
- WCAG AA color contrast (4.5:1 minimum)
- Focus indicators on all interactive elements
- ARIA labels and landmarks
- Semantic HTML structure
- Screen reader compatible

#### Service Worker (Optional)
- Offline support with [`public/sw.js`](public/sw.js)
- Cache-first for static assets
- Network-first for API calls
- Stale-while-revalidate for pages
- Offline fallback page

#### Analytics & Monitoring
- Web Vitals tracking
- Performance monitoring ready
- GDPR-compliant setup
- See [`src/components/analytics/Analytics.astro`](src/components/analytics/Analytics.astro)

### Performance Budget

Configuration in [`performance-budget.json`](performance-budget.json):

- **Total Page Size:** < 1MB
- **JavaScript:** < 300KB
- **CSS:** < 100KB
- **Images:** < 500KB
- **Fonts:** < 100KB

### Testing & Validation

Run Lighthouse audit:
```bash
npm run build
npx lighthouse http://localhost:4321 --view
```

See full checklist: [`LIGHTHOUSE_CHECKLIST.md`](LIGHTHOUSE_CHECKLIST.md)

## 📝 Development Phases

- ✅ **Phase 1:** Foundation Setup
- ✅ **Phase 2:** Core UI Components
- ✅ **Phase 3:** Page Sections - Above the Fold
- ✅ **Phase 4:** Interactive Components
- ✅ **Phase 5:** Content Sections
- ✅ **Phase 6:** SEO Implementation
- ✅ **Phase 7:** Contact Form & Backend
- ✅ **Phase 8:** Performance Optimization (Current)
- ⏳ **Phase 9:** Testing & QA
- ⏳ **Phase 10:** Deployment & Launch

## 📚 Documentation

- [Development Roadmap](plans/development_roadmap.md)
- [Content Map](plans/content_map.md)
- [SEO Strategy](plans/seo_strategy.md)
- [Project Plan](plans/plan.md)
- [Lighthouse Checklist](LIGHTHOUSE_CHECKLIST.md)
- [Performance Budget](performance-budget.json)

## 🤝 Contributing

This is a private client project. For questions or issues, contact the development team.

## 📄 License

Proprietary - All rights reserved

## 🔗 Links

- **Production:** https://seoservicesmiami.com
- **Cloudflare Pages:** https://seoservicesmiami.pages.dev
- **Documentation:** See `/plans` directory

---

**Built with ❤️ in Miami**
