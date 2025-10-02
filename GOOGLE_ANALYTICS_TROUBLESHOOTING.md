# Google Analytics Troubleshooting Guide

## Issue: Google Tag Manager not detected on menteeno.app

### Problem Analysis

The Google Analytics ID `G-ELCJW5JXCB` is configured but not being detected by Google's verification tools.

### Current Configuration

- **Google Analytics ID**: `G-ELCJW5JXCB`
- **Google Tag Manager ID**: `GTM-5FDNSG37`
- **Environment**: Production (menteeno.app)

### Solutions Applied

#### 1. Environment Configuration ✅

- Updated `.env.local` with correct GA ID
- Updated `.env` file for production deployment
- Verified environment variables are properly set

#### 2. Code Implementation ✅

- Fixed duplicate `page_view` event in analytics component
- Added debug logging for development environments
- Verified Next.js Script component usage

#### 3. Testing Steps

##### Local Testing

```bash
# Start development server
npm run dev

# Open browser console and check for:
# - "Google Analytics initialized with ID: G-ELCJW5JXCB"
# - DataLayer array with items
# - No JavaScript errors
```

##### Production Testing

1. **Browser Developer Tools**:
   - Open menteeno.app
   - Check Network tab for `gtag/js?id=G-ELCJW5JXCB` request
   - Check Console for any errors
   - Verify `window.gtag` function exists

2. **Google Analytics Real-time Reports**:
   - Go to GA4 Real-time reports
   - Visit menteeno.app
   - Check if page views appear within 30 seconds

3. **Google Tag Assistant**:
   - Install Google Tag Assistant browser extension
   - Visit menteeno.app
   - Check if GA4 tag is detected

4. **Manual Verification**:
   ```javascript
   // Run in browser console on menteeno.app
   console.log("GA ID:", window.gtag ? "Loaded" : "Not loaded");
   console.log("DataLayer:", window.dataLayer);
   ```

### Common Issues & Solutions

#### Issue 1: Script Loading Order

**Problem**: Scripts loading in wrong order
**Solution**: Using Next.js `Script` component with `strategy="afterInteractive"`

#### Issue 2: CSP (Content Security Policy) Blocking

**Problem**: CSP blocking Google Analytics scripts
**Solution**: Verify CSP allows `https://www.googletagmanager.com`

#### Issue 3: Ad Blockers

**Problem**: Ad blockers preventing GA from loading
**Solution**: Test in incognito mode or disable ad blockers

#### Issue 4: Environment Variables Not Set

**Problem**: GA ID not available in production
**Solution**: Verify environment variables in deployment platform

### Deployment Checklist

#### For Vercel/Netlify:

```bash
# Set environment variables in deployment platform
NEXT_PUBLIC_GA_ID=G-ELCJW5JXCB
NEXT_PUBLIC_GTM_ID=GTM-5FDNSG37
```

#### For GitHub Pages:

- Environment variables are set in `.env` file
- Static export includes GA scripts

### Verification Commands

```bash
# Check environment variables
grep NEXT_PUBLIC_GA_ID .env

# Test local build
npm run build
npm run start

# Check production build
npm run build
npm run export  # For GitHub Pages
```

### Next Steps

1. **Deploy Changes**: Push updated code to production
2. **Wait for Propagation**: Allow 5-10 minutes for changes to propagate
3. **Test Verification**: Use Google's verification tools again
4. **Monitor Real-time**: Check GA4 Real-time reports for data

### Debug Information

#### Current Implementation:

- Uses Next.js `Script` component
- Loads after page interaction
- Includes proper error handling
- Supports both GA4 and GTM

#### Files Modified:

- `src/components/seo/analytics.tsx` - Fixed duplicate events
- `.env.local` - Added GA ID
- `.env` - Updated production config

### Contact Information

If issues persist, check:

- Google Analytics account permissions
- Domain verification in GA4
- Network connectivity
- Browser compatibility
