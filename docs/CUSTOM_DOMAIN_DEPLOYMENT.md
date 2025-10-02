# Custom Domain Deployment Guide - menteeno.app

This guide will help you deploy your Menteeno website to the custom domain `menteeno.app` using GitHub Pages.

## Prerequisites

1. **Domain Ownership**: You must own the `menteeno.app` domain
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **DNS Provider Access**: Access to your domain's DNS settings

## Step 1: GitHub Repository Setup

### 1.1 Enable GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 1.2 Configure Repository Permissions

1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select **Read and write permissions**
3. Check **Allow GitHub Actions to create and approve pull requests**
4. Save the settings

## Step 2: DNS Configuration

### 2.1 Configure DNS Records

Add the following DNS records to your domain provider:

#### For Root Domain (menteeno.app):

```
Type: A
Name: @
Value: 185.199.108.153
TTL: 300

Type: A
Name: @
Value: 185.199.109.153
TTL: 300

Type: A
Name: @
Value: 185.199.110.153
TTL: 300

Type: A
Name: @
Value: 185.199.111.153
TTL: 300
```

#### For WWW Subdomain (www.menteeno.app):

```
Type: CNAME
Name: www
Value: menteeno.github.io
TTL: 300
```

### 2.2 Alternative DNS Configuration (if your provider doesn't support multiple A records):

```
Type: CNAME
Name: @
Value: menteeno.github.io
TTL: 300

Type: CNAME
Name: www
Value: menteeno.github.io
TTL: 300
```

## Step 3: Domain Verification

### 3.1 Add Domain to GitHub Pages

1. Go to your repository **Settings** → **Pages**
2. In the **Custom domain** field, enter: `menteeno.app`
3. Check **Enforce HTTPS** (this will be available after DNS propagation)
4. Click **Save**

### 3.2 Verify DNS Propagation

Use these tools to check if your DNS changes have propagated:

- [DNS Checker](https://dnschecker.org/)
- [What's My DNS](https://whatsmydns.net/)

## Step 4: Deploy Your Site

### 4.1 Automatic Deployment

Your site will automatically deploy when you push to the `main` branch. The GitHub Action will:

1. Build your Next.js application
2. Generate static files in the `out` directory
3. Deploy to GitHub Pages
4. Make your site available at `https://menteeno.app`

### 4.2 Manual Deployment Test

To test the build locally:

```bash
# Install dependencies
pnpm install

# Build for GitHub Pages
pnpm run build:github-pages

# Check the generated files
ls -la out/
```

## Step 5: SSL Certificate

GitHub Pages automatically provides SSL certificates for custom domains. After DNS propagation:

1. Go to **Settings** → **Pages**
2. Check **Enforce HTTPS**
3. Wait for the certificate to be issued (usually takes a few minutes)

## Troubleshooting

### Common Issues

1. **DNS Not Propagating**
   - Wait 24-48 hours for full propagation
   - Check with multiple DNS checker tools
   - Verify DNS records are correct

2. **SSL Certificate Issues**
   - Ensure DNS is properly configured
   - Wait for certificate issuance
   - Check GitHub Pages status

3. **Build Failures**
   - Check GitHub Actions logs
   - Verify all dependencies are installed
   - Ensure build script works locally

4. **404 Errors**
   - Verify CNAME file exists in public directory
   - Check base path configuration
   - Ensure all routes are properly configured

### Verification Commands

```bash
# Check if CNAME file exists
ls -la public/CNAME

# Test build locally
pnpm run build:github-pages

# Check generated files
ls -la out/
```

## Configuration Files

The following files have been configured for custom domain deployment:

- `public/CNAME` - Contains the custom domain
- `src/lib/config.ts` - Updated with custom domain URLs
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow
- `next.config.ts` - Next.js configuration for static export

## Environment Variables

The following environment variables are used during deployment:

- `GITHUB_PAGES=true` - Enables GitHub Pages specific configuration
- `NEXT_PUBLIC_DEPLOYMENT_ENV=github-pages` - Sets deployment environment

## Final Checklist

- [ ] Domain DNS records configured
- [ ] GitHub Pages enabled with GitHub Actions
- [ ] Repository permissions configured
- [ ] Custom domain added in GitHub Pages settings
- [ ] HTTPS enforced
- [ ] Site accessible at https://menteeno.app
- [ ] All internal links working correctly
- [ ] Images and assets loading properly

## Support

If you encounter any issues:

1. Check GitHub Actions logs for build errors
2. Verify DNS configuration with online tools
3. Check GitHub Pages status page for service issues
4. Review the troubleshooting section above

Your site should be live at `https://menteeno.app` once all steps are completed!
