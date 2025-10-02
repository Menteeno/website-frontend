# Analytics Setup Guide - Google Analytics 4 & Google Search Console

This guide will help you set up Google Analytics 4 (GA4) and Google Search Console (GSC) for your Menteeno website.

## Table of Contents

1. [Google Analytics 4 Setup](#google-analytics-4-setup)
2. [Google Search Console Setup](#google-search-console-setup)
3. [Environment Configuration](#environment-configuration)
4. [Custom Event Tracking](#custom-event-tracking)
5. [Verification & Testing](#verification--testing)
6. [Troubleshooting](#troubleshooting)

## Google Analytics 4 Setup

### Step 1: Create GA4 Property

1. **Go to Google Analytics**
   - Visit [analytics.google.com](https://analytics.google.com/)
   - Sign in with your Google account

2. **Create Account**
   - Click "Start measuring" or "Create Account"
   - Account name: `Menteeno`
   - Property name: `Menteeno Website`
   - Reporting time zone: `Tehran` (or your preferred timezone)
   - Currency: `USD` (or your preferred currency)

3. **Set Up Data Stream**
   - Go to **Admin** → **Data Streams**
   - Click **Add stream** → **Web**
   - Enter your website URL: `https://menteeno.app`
   - Stream name: `Menteeno Website`
   - Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 2: Configure Enhanced Ecommerce

1. **Enable Enhanced Ecommerce**
   - In GA4, go to **Admin** → **Data Streams**
   - Click on your web stream
   - Go to **Enhanced measurement**
   - Enable all relevant events:
     - Page views
     - Scrolls
     - Outbound clicks
     - Site search
     - Video engagement
     - File downloads

2. **Set Up Custom Events**
   - Go to **Events** in GA4
   - Create custom events for:
     - Course enrollments
     - Blog post views
     - Contact form submissions
     - User registrations

### Step 3: Configure Goals and Conversions

1. **Mark Key Events as Conversions**
   - Go to **Admin** → **Events**
   - Mark these events as conversions:
     - `purchase` (course enrollment)
     - `sign_up` (user registration)
     - `contact_form_submit`
     - `blog_view`

## Google Search Console Setup

### Step 1: Add Property to GSC

1. **Go to Google Search Console**
   - Visit [search.google.com/search-console](https://search.google.com/search-console/)
   - Sign in with your Google account

2. **Add Property**
   - Click "Add property"
   - Choose "URL prefix" method
   - Enter your website URL: `https://menteeno.app`
   - Click "Continue"

### Step 2: Verify Ownership

Choose one of these verification methods:

#### Method 1: HTML File Upload (Recommended)

1. Download the HTML verification file from GSC
2. Upload it to your `public/` folder
3. Ensure it's accessible at `https://menteeno.app/google[random-string].html`
4. Click "Verify" in GSC

#### Method 2: HTML Meta Tag

1. Copy the meta tag from GSC
2. Add it to your `src/app/layout.tsx` in the `<head>` section:

```tsx
<meta name="google-site-verification" content="your-verification-code" />
```

#### Method 3: Google Analytics (If GA4 is already set up)

1. Ensure GA4 is properly configured
2. Select "Google Analytics" verification method
3. Click "Verify"

### Step 3: Submit Sitemaps

1. **Submit Main Sitemap**
   - Go to **Sitemaps** in GSC
   - Add sitemap: `https://menteeno.app/sitemap.xml`
   - Click "Submit"

2. **Submit Additional Sitemaps**
   - Blog sitemap: `https://menteeno.app/sitemap-blog.xml`
   - Persian sitemap: `https://menteeno.app/sitemap-fa.xml`

### Step 4: Configure International Targeting

1. **Set Target Country**
   - Go to **Settings** → **International targeting**
   - Select "Iran" as target country
   - Add "United States" for English content

2. **Configure Hreflang**
   - Your site already has proper hreflang implementation
   - Verify in GSC that international targeting is working

## Environment Configuration

### Step 1: Create Environment File

Create a `.env.local` file in your project root:

```bash
# Analytics & Tracking
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=123456789012345
NEXT_PUBLIC_HOTJAR_ID=1234567
```

### Step 2: Update Production Environment

For production deployment, set these environment variables:

```bash
# Replace with your actual IDs
NEXT_PUBLIC_GA_ID=G-ABC123DEF4
NEXT_PUBLIC_GTM_ID=GTM-XYZ789
```

## Custom Event Tracking

### Using the Analytics Hook

The project includes a custom hook for tracking events:

```tsx
import { useAnalytics } from "@/hooks/use-analytics";

function CourseEnrollmentButton() {
  const { trackCourseEnrollment } = useAnalytics();

  const handleEnrollment = () => {
    // Your enrollment logic
    trackCourseEnrollment("course-123", "React Fundamentals", 99.99);
  };

  return <button onClick={handleEnrollment}>Enroll Now</button>;
}
```

### Available Tracking Methods

- `trackEvent()` - Generic event tracking
- `trackPageView()` - Page view tracking
- `trackEcommerceEvent()` - Ecommerce events
- `trackCourseEnrollment()` - Course enrollment tracking
- `trackBlogView()` - Blog post view tracking
- `trackContactForm()` - Contact form submission
- `trackUserRegistration()` - User registration
- `trackUserLogin()` - User login

### Example Implementations

#### Blog Post Tracking

```tsx
// In your blog post component
const { trackBlogView } = useAnalytics();

useEffect(() => {
  trackBlogView(post.title, post.category);
}, [post.title, post.category]);
```

#### Contact Form Tracking

```tsx
// In your contact form component
const { trackContactForm } = useAnalytics();

const handleSubmit = (formData) => {
  // Submit form logic
  trackContactForm("contact");
};
```

## Verification & Testing

### GA4 Testing

1. **Real-time Reports**
   - Go to GA4 → **Reports** → **Realtime**
   - Visit your website
   - Verify events are appearing in real-time

2. **Debug Mode**
   - Add `?debug_mode=true` to your URL
   - Check GA4 DebugView for detailed event data

3. **Google Tag Assistant**
   - Install Chrome extension
   - Visit your website
   - Verify GA4 tag is firing correctly

### GSC Testing

1. **URL Inspection Tool**
   - Use GSC URL Inspection tool
   - Test key pages: homepage, blog posts, course pages
   - Verify pages are indexed correctly

2. **Coverage Report**
   - Check **Coverage** report in GSC
   - Ensure all important pages are indexed
   - Fix any indexing issues

3. **Performance Report**
   - Monitor **Performance** report
   - Track search queries and click-through rates
   - Optimize based on data

## Troubleshooting

### Common GA4 Issues

1. **Events Not Showing**
   - Check if GA4 ID is correct
   - Verify script is loading (check Network tab)
   - Ensure events are being sent to correct property

2. **Duplicate Page Views**
   - Check if both GA4 and GTM are installed
   - Remove duplicate tracking code

3. **Real-time Data Not Appearing**
   - Wait 5-10 minutes for data to appear
   - Check if ad blockers are interfering
   - Verify correct GA4 property

### Common GSC Issues

1. **Verification Failed**
   - Ensure verification file is accessible
   - Check meta tag is in correct location
   - Try different verification method

2. **Sitemap Not Found**
   - Verify sitemap URL is correct
   - Check if sitemap is generating properly
   - Ensure robots.txt allows sitemap

3. **Pages Not Indexed**
   - Check robots.txt for blocking rules
   - Ensure pages have proper meta tags
   - Submit individual URLs for indexing

### Performance Optimization

1. **Script Loading**
   - GA4 script loads with `afterInteractive` strategy
   - Minimizes impact on page load speed

2. **Privacy Compliance**
   - IP anonymization is enabled
   - Cookie consent should be implemented
   - GDPR compliance considerations

3. **Data Quality**
   - Regular data audits
   - Monitor for spam traffic
   - Set up filters for internal traffic

## Next Steps

1. **Set up Goals and Conversions** in GA4
2. **Configure Custom Dimensions** for better segmentation
3. **Set up Automated Reports** in GA4
4. **Monitor GSC Performance** regularly
5. **Implement Enhanced Ecommerce** tracking
6. **Set up Data Studio** dashboards for reporting

## Support

For additional help:

- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GSC Help Center](https://support.google.com/webmasters/)
- [Next.js Analytics Guide](https://nextjs.org/docs/advanced-features/measuring-performance)
