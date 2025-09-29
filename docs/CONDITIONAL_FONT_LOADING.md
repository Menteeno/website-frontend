# Conditional Font Loading Optimization

This document describes the implementation of conditional font loading based on the current locale (Persian vs English).

## Problem Solved

Previously, both Persian (Dana) and English (Instrument Sans) fonts were being loaded on every page, regardless of the current language. This caused:

- Unnecessary network requests
- Increased bundle size
- Slower page load times
- Poor performance scores

## Solution Implemented

### 1. Locale-Aware Font Preloader

**File**: `src/components/locale-aware-font-preloader.tsx`

This component:

- Detects the current locale from the URL pathname
- Loads only the relevant font for the current locale
- Provides console logging for debugging
- Handles font switching when locale changes

**Features**:

- **Persian locale (`/fa`)**: Loads Dana font only
- **English locale (`/en`)**: Loads Instrument Sans font only
- **Default**: Falls back to Persian if no locale is detected

### 2. Updated Font Loading Strategy

**Files Modified**:

- `src/app/layout.tsx` - Removed hardcoded font loading
- `src/components/optimized-font-loader.tsx` - Made conditional based on locale
- `src/components/css-optimizer.tsx` - Updated critical CSS for locale-specific fonts
- `src/components/seo/performance.tsx` - Made resource hints conditional

### 3. Font Switching Utility

**Component**: `FontSwitcher`

- Updates CSS custom properties when locale changes
- Ensures smooth font transitions
- Maintains consistent typography across language switches

## Implementation Details

### Font Loading Logic

```typescript
// Determine locale from pathname
const segments = pathname.split("/");
const locale = segments[1] || "fa"; // Default to Persian

// Load fonts based on locale
if (locale === "fa") {
  loadPersianFont(); // Dana font
} else {
  loadEnglishFont(); // Instrument Sans font
}
```

### Critical CSS Optimization

The critical CSS now includes locale-specific font families:

```css
body {
  font-family: ${locale === "fa" ? "var(--font-dana)" : "var(--font-sans)"}, system-ui, sans-serif;
}
```

### Resource Hints Optimization

Resource hints are now conditional:

- **Persian**: Preloads Dana font files
- **English**: Preloads Instrument Sans from fonts.bunny.net

## Performance Benefits

### Before Optimization

- Both fonts loaded on every page
- ~2.2 KiB of font CSS loaded unnecessarily
- Multiple network requests for unused fonts
- Slower First Contentful Paint (FCP)

### After Optimization

- Only relevant font loaded per locale
- ~50% reduction in font-related network requests
- Faster FCP for both Persian and English pages
- Better Core Web Vitals scores

## Usage

The optimization is automatically applied. No manual intervention required.

### Console Logging

The system provides helpful console logs:

```
🌍 Loading fonts for locale: fa
📝 Loading Persian font (Dana)
✅ Persian font (Dana) loaded successfully
```

### Font Switching

When users switch languages, fonts are automatically updated:

```
🔄 Font switched for locale: en
```

## Testing

To test the optimization:

1. **Persian Pages** (`/fa/*`):

   - Check Network tab - only Dana font should load
   - Verify Persian text renders correctly

2. **English Pages** (`/en/*`):

   - Check Network tab - only Instrument Sans should load
   - Verify English text renders correctly

3. **Language Switching**:
   - Navigate between `/fa` and `/en` pages
   - Verify fonts switch correctly
   - Check console for switching logs

## Files Created/Modified

### New Files:

- `src/components/locale-aware-font-preloader.tsx`

### Modified Files:

- `src/app/layout.tsx` - Removed hardcoded font loading
- `src/components/optimized-font-loader.tsx` - Made conditional
- `src/components/css-optimizer.tsx` - Locale-aware critical CSS
- `src/components/seo/performance.tsx` - Conditional resource hints

## Expected Results

1. **Network Requests**: 50% reduction in font-related requests
2. **Bundle Size**: Smaller initial bundle for each locale
3. **Performance**: Improved FCP and LCP scores
4. **User Experience**: Faster page loads, especially on slower connections
5. **SEO**: Better Core Web Vitals scores

## Monitoring

The system includes built-in monitoring:

- Console logs for font loading status
- Performance metrics tracking
- Resource loading time monitoring

Check the browser console for optimization status and performance metrics.
