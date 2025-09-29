# Flexible Domain Configuration System

This project now supports easy switching between different base URLs and deployment environments without code changes.

## 🚀 Quick Start

### 1. Environment Variables

Create a `.env.local` file and set your desired configuration:

```bash
# For localhost development
NEXT_PUBLIC_DEPLOYMENT_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# For production deployment
NEXT_PUBLIC_DEPLOYMENT_ENV=production
NEXT_PUBLIC_BASE_URL=https://menteeno.app

# For GitHub Pages
NEXT_PUBLIC_DEPLOYMENT_ENV=github-pages
NEXT_PUBLIC_BASE_URL=https://menteeno.github.io/website-frontend

# For custom domain
NEXT_PUBLIC_DEPLOYMENT_ENV=custom
NEXT_PUBLIC_BASE_URL=https://menteeno.com
```

### 2. Build Commands

```bash
# Development
pnpm dev

# Production build
pnpm run build:production

# GitHub Pages build
pnpm run build:github-pages

# Custom domain build
pnpm run build:custom
```

## 🔧 Configuration Options

### Predefined Environments

| Environment | Base URL | Use Case |
|-------------|----------|----------|
| `development` | `http://localhost:3000` | Local development |
| `production` | `https://menteeno.app` | Production deployment |
| `github-pages` | `https://menteeno.github.io/website-frontend` | GitHub Pages |
| `custom` | Configurable via env vars | Any custom domain |

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_DEPLOYMENT_ENV` | Environment type | Auto-detected |
| `NEXT_PUBLIC_BASE_URL` | Base URL for the app | Environment-specific |
| `NEXT_PUBLIC_BASE_PATH` | Base path for routing | Environment-specific |
| `NEXT_PUBLIC_ASSET_PREFIX` | Asset prefix for static files | Environment-specific |
| `NEXT_PUBLIC_API_URL` | API endpoint URL | `${BASE_URL}/api` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Menteeno` |
| `NEXT_PUBLIC_APP_DESCRIPTION` | Application description | `Professional Skill Development Platform` |

## 📁 Domain Examples

### 1. Localhost Development
```bash
NEXT_PUBLIC_DEPLOYMENT_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
**Result**: `http://localhost:3000`

### 2. Production Domain
```bash
NEXT_PUBLIC_DEPLOYMENT_ENV=production
NEXT_PUBLIC_BASE_URL=https://menteeno.app
```
**Result**: `https://menteeno.app`

### 3. GitHub Pages
```bash
NEXT_PUBLIC_DEPLOYMENT_ENV=github-pages
NEXT_PUBLIC_BASE_URL=https://menteeno.github.io/website-frontend
```
**Result**: `https://menteeno.github.io/website-frontend`

### 4. Custom Domain
```bash
NEXT_PUBLIC_DEPLOYMENT_ENV=custom
NEXT_PUBLIC_BASE_URL=https://menteeno.com
```
**Result**: `https://menteeno.com`

### 5. Subdomain
```bash
NEXT_PUBLIC_DEPLOYMENT_ENV=custom
NEXT_PUBLIC_BASE_URL=https://app.menteeno.com
```
**Result**: `https://app.menteeno.com`

### 6. Subpath Deployment
```bash
NEXT_PUBLIC_DEPLOYMENT_ENV=custom
NEXT_PUBLIC_BASE_URL=https://mycompany.com/app
NEXT_PUBLIC_BASE_PATH=/app
NEXT_PUBLIC_ASSET_PREFIX=/app
```
**Result**: `https://mycompany.com/app`

## 🔄 Switching Between Domains

### Method 1: Environment Variables (Recommended)
```bash
# Switch to custom domain
NEXT_PUBLIC_DEPLOYMENT_ENV=custom
NEXT_PUBLIC_BASE_URL=https://menteeno.com
pnpm run build:custom
```

### Method 2: Direct Environment Override
```bash
# Override for one-time build
NEXT_PUBLIC_BASE_URL=https://menteeno.com pnpm build
```

### Method 3: Multiple Environment Files
```bash
# Create different env files
cp .env.local .env.production
cp .env.local .env.github-pages
cp .env.local .env.custom

# Edit each file with specific settings
# Use with: NODE_ENV=production next build
```

## 🏗️ Architecture

### Configuration Flow
1. **Environment Detection**: System detects deployment environment
2. **Config Loading**: Loads appropriate configuration
3. **URL Generation**: Generates all URLs based on config
4. **Build Process**: Applies environment-specific build settings

### Key Files
- `src/lib/config.ts` - Central configuration system
- `src/lib/metadata.ts` - SEO metadata generation
- `next.config.ts` - Next.js configuration
- `env.example` - Environment variable examples

## 🚀 Deployment Examples

### Vercel Deployment
```bash
# Set environment variables in Vercel dashboard
NEXT_PUBLIC_DEPLOYMENT_ENV=production
NEXT_PUBLIC_BASE_URL=https://menteeno.app
```

### GitHub Pages
```bash
# Automatic via GitHub Actions
# Uses github-pages environment automatically
```

### Custom Server
```bash
# Build with custom domain
NEXT_PUBLIC_DEPLOYMENT_ENV=custom
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
pnpm run build:custom
```

## 🔍 Debugging

### Check Current Configuration
```typescript
import { getAppConfig } from '@/lib/config';

console.log('Current config:', getAppConfig());
```

### Verify URLs
```typescript
import { getUrl, getLocalizedUrl } from '@/lib/config';

console.log('Base URL:', getUrl());
console.log('English URL:', getLocalizedUrl('en'));
console.log('Persian URL:', getLocalizedUrl('fa'));
```

## 📝 Best Practices

1. **Always use environment variables** for different deployments
2. **Test all environments** before deploying
3. **Keep configuration centralized** in `src/lib/config.ts`
4. **Use TypeScript** for type safety
5. **Document custom configurations** for team members

## 🐛 Troubleshooting

### Common Issues

1. **Wrong base URL**: Check `NEXT_PUBLIC_BASE_URL` environment variable
2. **Asset loading issues**: Verify `NEXT_PUBLIC_ASSET_PREFIX` for subpath deployments
3. **SEO issues**: Ensure all metadata URLs are correctly generated
4. **Build failures**: Check environment variable syntax and values

### Debug Commands
```bash
# Check environment variables
echo $NEXT_PUBLIC_BASE_URL

# Test build locally
NEXT_PUBLIC_BASE_URL=https://test.com pnpm build

# Verify configuration
pnpm dev
# Check browser console for config output
```
