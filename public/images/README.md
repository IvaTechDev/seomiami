# Image Optimization Guide for SEOSERVICESMIAMI.COM

## Directory Structure

```
public/images/
├── hero/                    # Hero section images
│   ├── miami-seo-services-hero.webp
│   ├── miami-seo-services-hero.jpg (fallback)
│   └── miami-skyline-background.webp
├── services/               # Service-specific images
│   ├── local-seo-miami.webp
│   ├── ecommerce-seo-miami.webp
│   ├── technical-seo-audit.webp
│   └── content-marketing-miami.webp
├── case-studies/           # Case study images
│   ├── restaurant-seo-results.webp
│   ├── real-estate-seo-results.webp
│   ├── legal-seo-results.webp
│   └── medical-seo-results.webp
├── clients/                # Client logos (from Phase 5)
├── neighborhoods/          # Miami neighborhood images
│   ├── brickell-miami.webp
│   ├── wynwood-miami.webp
│   ├── coral-gables-miami.webp
│   ├── doral-miami.webp
│   └── miami-beach.webp
├── og/                     # Open Graph images
│   ├── og-default.jpg (1200x630)
│   ├── og-services.jpg
│   ├── og-pricing.jpg
│   └── og-case-studies.jpg
└── README.md              # This file
```

## Image Optimization Requirements

### Format Standards
- **Primary Format**: WebP for ~30% smaller file sizes
- **Fallback Format**: JPEG/PNG for older browsers
- **Future Format**: AVIF (optional, even better compression)

### Dimensions & Quality

#### Hero Images
- **Desktop**: 1920x1080px
- **Mobile**: 768x1024px
- **Quality**: 85% for WebP, 90% for JPEG
- **Max File Size**: 200KB

#### Service Images
- **Dimensions**: 800x600px
- **Quality**: 80% WebP, 85% JPEG
- **Max File Size**: 100KB

#### Case Study Images
- **Dimensions**: 1200x800px
- **Quality**: 85% WebP, 90% JPEG
- **Max File Size**: 150KB

#### Open Graph Images
- **Dimensions**: 1200x630px (Facebook/LinkedIn standard)
- **Quality**: 90% JPEG (no transparency needed)
- **Max File Size**: 200KB
- **Required**: og:image meta tag

#### Client Logos
- **Format**: SVG (preferred) or PNG with transparency
- **Dimensions**: 200x80px maximum
- **Grayscale**: Yes, for professional look
- **Background**: Transparent

#### Neighborhood Images
- **Dimensions**: 600x400px
- **Quality**: 80% WebP, 85% JPEG
- **Max File Size**: 80KB

## Naming Conventions

### Best Practices
✅ **Good**: `miami-seo-services-hero.webp`
✅ **Good**: `local-seo-miami-results.jpg`
✅ **Good**: `brickell-miami-offices.webp`

❌ **Bad**: `IMG_1234.jpg`
❌ **Bad**: `image-1.png`
❌ **Bad**: `photo.webp`

### Naming Format
```
{subject}-{location}-{type}.{ext}
```

Examples:
- `restaurant-seo-case-study.webp`
- `miami-beach-seo-services.jpg`
- `wynwood-art-district-map.webp`

## Alt Text Requirements

All images MUST have descriptive alt text for:
1. **SEO**: Helps search engines understand image content
2. **Accessibility**: Screen readers for visually impaired users
3. **Context**: If image fails to load, alt text describes it

### Alt Text Examples
```html
<!-- Good alt text -->
<img src="local-seo-miami.webp" alt="Miami local SEO results showing 275% traffic increase for restaurant client" />

<img src="brickell-miami.webp" alt="Aerial view of Brickell financial district in Miami, Florida" />

<!-- Bad alt text -->
<img src="image1.jpg" alt="image" />
<img src="photo.png" alt="" />
```

## Lazy Loading

All below-the-fold images should use lazy loading:

```astro
<img 
  src="image.webp" 
  alt="Descriptive alt text"
  loading="lazy"
  decoding="async"
  width="800"
  height="600"
/>
```

## Astro Image Component

Use Astro's built-in Image component for automatic optimization:

```astro
---
import { Image } from 'astro:assets';
import heroImage from '@/images/hero/miami-seo-hero.jpg';
---

<Image
  src={heroImage}
  alt="Miami SEO Services - Dominate local search results"
  width={1920}
  height={1080}
  format="webp"
  quality={85}
  loading="eager"
/>
```

## Responsive Images

Provide multiple sizes for different screen sizes:

```html
<picture>
  <source 
    srcset="
      /images/hero/miami-seo-hero-320.webp 320w,
      /images/hero/miami-seo-hero-640.webp 640w,
      /images/hero/miami-seo-hero-1024.webp 1024w,
      /images/hero/miami-seo-hero-1920.webp 1920w
    "
    type="image/webp"
  />
  <img 
    src="/images/hero/miami-seo-hero-1920.jpg"
    alt="Miami SEO Services hero image"
    loading="eager"
  />
</picture>
```

## Image Compression Tools

### Recommended Tools
1. **Squoosh** (https://squoosh.app) - Online, free
2. **ImageOptim** (Mac) - Desktop app
3. **TinyPNG** (https://tinypng.com) - Online
4. **Sharp** (Node.js) - Automated compression

### Command Line (Sharp)
```bash
npm install sharp
node scripts/optimize-images.js
```

## SEO Image Checklist

- [ ] All images have descriptive, SEO-friendly filenames
- [ ] All images have comprehensive alt text (50-125 characters)
- [ ] Hero images loaded eagerly (`loading="eager"`)
- [ ] Below-fold images loaded lazily (`loading="lazy"`)
- [ ] WebP format with JPEG/PNG fallback
- [ ] All images compressed (target 80-90% quality)
- [ ] Dimensions specified in HTML (prevents CLS)
- [ ] No images exceed 300KB file size
- [ ] Open Graph images are 1200x630px
- [ ] All images have proper aspect ratios

## Performance Targets

- **Largest Contentful Paint (LCP)**: < 2.5s
  - Hero image should be < 200KB
  - Preload hero image in `<head>`
  
- **Cumulative Layout Shift (CLS)**: < 0.1
  - Always specify width and height
  - Reserve space for images before load

## Miami-Specific Image Strategy

### Local Content
- **Neighborhoods**: Show recognizable Miami landmarks
- **Businesses**: Feature actual Miami businesses (with permission)
- **Culture**: Reflect Miami's diverse, bilingual community
- **Results**: Use real screenshots from Google Search/Maps

### Geographic Context
- Include Miami skyline, beaches, landmarks
- Show local business environments (restaurants, offices, shops)
- Use images with Miami-Dade County locations
- Feature recognizable neighborhoods (Brickell, Wynwood, etc.)

## Copyright & Licensing

### Stock Photos
- **Unsplash**: Free, high-quality
- **Pexels**: Free, curated
- **Miami .gov**: Public domain (government photos)

### Client Photos
- Always get written permission
- Include attribution if required
- Maintain aspect ratios
- Don't alter logos (except grayscale)

## Future Enhancements

1. **AVIF Support**: Even better compression than WebP
2. **Blur-up Placeholders**: Show low-quality placeholder while loading
3. **Cloudflare Polish**: Automatic image optimization via Cloudflare
4. **CDN Integration**: Serve images from Cloudflare CDN
5. **Automated Pipeline**: CI/CD image optimization on commit

---

**Last Updated**: 2025-12-22
**Phase**: 6 (SEO Implementation)
