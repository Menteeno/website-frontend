# SEO Troubleshooting Guide

## Common Issues and Solutions

### 1. Hydration Mismatch Errors

**Problem**: Browser extensions (like Dark Reader) modify the DOM after React hydration, causing mismatches.

**Solution**: Use hydration-safe components:

```typescript
import { HydrationSafe, ClientOnly } from '@/components/seo/hydration-safe';

// Wrap components that might cause hydration issues
<HydrationSafe>
  <YourComponent />
</HydrationSafe>

// Or use client-only rendering
<ClientOnly>
  <YourComponent />
</ClientOnly>
```

### 2. Structured Data Errors

**Problem**: JSON-LD structured data fails to generate or contains errors.

**Solution**: Use error boundaries and validation:

```typescript
import { SEOSafeWrapper } from '@/components/seo/error-boundary';

<SEOSafeWrapper>
  <StructuredData type="article" data={articleData} />
</SEOSafeWrapper>
```

### 3. Persian Language SEO Issues

**Problem**: Persian content not properly indexed or displayed.

**Solutions**:

1. **Ensure proper locale detection**:

```typescript
const isPersian = pathname.startsWith("/fa");
```

2. **Use Persian-specific meta tags**:

```typescript
// In your metadata generation
other: isPersian
  ? {
      language: "fa",
      "content-language": "fa-IR",
      "geo.region": "IR",
      "geo.country": "Iran",
      // ... other Persian-specific tags
    }
  : undefined;
```

3. **Validate Persian keywords**:

```typescript
import { validatePersianSEO } from "@/lib/seo-validation";

const validation = validatePersianSEO({
  title: "عنوان فارسی",
  description: "توضیحات فارسی",
  locale: "fa",
});
```

### 4. Image Optimization Issues

**Problem**: Images not properly optimized for SEO.

**Solution**: Use the optimized image components:

```typescript
import { BlogImage, HeroImage, ThumbnailImage } from '@/components/seo/optimized-image';

// For blog posts
<BlogImage
  src="/path/to/image.jpg"
  alt="توضیحات تصویر به فارسی"
  caption="عنوان تصویر"
/>

// For hero sections
<HeroImage
  src="/path/to/hero.jpg"
  alt="تصویر اصلی صفحه"
/>
```

### 5. Canonical URL Issues

**Problem**: Duplicate content due to incorrect canonical URLs.

**Solution**: Ensure proper canonical URL generation:

```typescript
// In your metadata
alternates: {
  canonical: `https://menteeno.app/${locale}/blog/${slug}`,
  languages: {
    en: `https://menteeno.app/en/blog/${slug}`,
    fa: `https://menteeno.app/fa/blog/${slug}`,
    "x-default": `https://menteeno.app/en/blog/${slug}`,
  },
}
```

### 6. Robots.txt Issues

**Problem**: Search engines not properly crawling the site.

**Solution**: Verify robots.txt includes Persian-specific bots:

```typescript
// In robots.ts
rules: [
  {
    userAgent: "YandexBot",
    allow: "/",
    disallow: ["/api/", "/admin/", "/private/"],
  },
  {
    userAgent: "ParsijooBot",
    allow: "/",
    disallow: ["/api/", "/admin/", "/private/"],
  },
  // ... other bots
];
```

### 7. Sitemap Issues

**Problem**: Sitemaps not properly generated or submitted.

**Solution**: Ensure all sitemaps are included:

```typescript
sitemap: [
  `${config.baseUrl}/sitemap.xml`,
  `${config.baseUrl}/sitemap-blog.xml`,
  `${config.baseUrl}/sitemap-fa.xml`,
  `${config.baseUrl}/en/sitemap.xml`,
  `${config.baseUrl}/fa/sitemap.xml`,
];
```

## Debugging Tools

### 1. SEO Validation

Use the built-in validation utility:

```typescript
import { validateSEO, generateSEOReport } from "@/lib/seo-validation";

const seoData = {
  title: "Your Page Title",
  description: "Your meta description",
  keywords: ["keyword1", "keyword2"],
  locale: "fa",
  url: "https://menteeno.app/fa/page",
  images: [{ src: "/image.jpg", alt: "Image description" }],
  headings: [
    { level: 1, text: "Main Heading" },
    { level: 2, text: "Sub Heading" },
  ],
};

const validation = validateSEO(seoData);
console.log(generateSEOReport(seoData));
```

### 2. Browser DevTools

1. **Check HTML structure**:
   - Right-click → Inspect Element
   - Look for proper meta tags, structured data, and canonical URLs

2. **Validate structured data**:
   - Use Google's Rich Results Test: https://search.google.com/test/rich-results
   - Use Schema.org validator: https://validator.schema.org/

3. **Check Persian text rendering**:
   - Ensure proper UTF-8 encoding
   - Verify RTL direction is set correctly

### 3. Google Search Console

1. **Submit sitemaps**:
   - Go to Sitemaps section
   - Submit all sitemap URLs

2. **Check indexing status**:
   - Use URL Inspection tool
   - Monitor indexing coverage

3. **Monitor Core Web Vitals**:
   - Check Page Experience report
   - Monitor Core Web Vitals metrics

## Performance Optimization

### 1. Image Optimization

```typescript
// Use Next.js Image component with proper optimization
<Image
  src="/image.jpg"
  alt="Descriptive alt text"
  width={800}
  height={450}
  priority={true} // For above-the-fold images
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
  quality={90}
/>
```

### 2. Lazy Loading

```typescript
// Use lazy loading for below-the-fold content
<Image
  src="/image.jpg"
  alt="Alt text"
  loading="lazy"
  // ... other props
/>
```

### 3. Resource Hints

```typescript
// Preload critical resources
<link rel="preload" href="/fonts/critical-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
<link rel="preload" href="/css/critical.css" as="style" />
```

## Monitoring and Maintenance

### 1. Regular SEO Audits

Run monthly SEO audits using the validation utility:

```typescript
// Create a script to audit all pages
const pages = [
  { url: "/fa", locale: "fa" },
  { url: "/en", locale: "en" },
  { url: "/fa/blog", locale: "fa" },
  // ... other pages
];

pages.forEach((page) => {
  const validation = validateSEO(page);
  if (!validation.isValid) {
    console.warn(`SEO issues found on ${page.url}:`, validation.errors);
  }
});
```

### 2. Performance Monitoring

Monitor Core Web Vitals regularly:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 3. Content Updates

Keep content fresh and relevant:

- Update blog posts regularly
- Refresh meta descriptions
- Add new structured data as needed
- Monitor keyword rankings

## Emergency Fixes

### 1. Quick Hydration Fix

If hydration errors persist, add this to your root layout:

```typescript
<html suppressHydrationWarning>
  {/* ... */}
</html>
```

### 2. Disable Problematic Components

Temporarily disable components causing issues:

```typescript
// In development, disable problematic SEO components
{process.env.NODE_ENV === 'development' ? null : (
  <StructuredData type="article" data={data} />
)}
```

### 3. Fallback SEO

Ensure basic SEO works even if advanced features fail:

```typescript
// Always include basic meta tags
<meta name="description" content="Fallback description" />
<meta name="keywords" content="fallback, keywords" />
<link rel="canonical" href="https://menteeno.app/fa" />
```

## Contact and Support

For additional SEO support:

1. Check the validation utility output
2. Review browser console for errors
3. Test with Google's SEO tools
4. Monitor Google Search Console for issues

Remember: SEO is a long-term strategy. Focus on providing valuable content and a great user experience first, then optimize for search engines.
