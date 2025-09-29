# GitHub Pages Deployment

This project is configured to deploy automatically to GitHub Pages when changes are pushed to the `main` branch.

## Setup Instructions

1. **Enable GitHub Pages in your repository:**

   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select "GitHub Actions"

2. **Configure repository permissions:**

   - Go to Settings → Actions → General
   - Under "Workflow permissions", select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"

3. **Deploy:**
   - Push changes to the `main` branch
   - The GitHub Action will automatically build and deploy your site
   - Your site will be available at: `https://menteeno.github.io/website-frontend`

## Manual Deployment

If you want to test the build locally:

```bash
# Install dependencies
pnpm install

# Build for GitHub Pages
pnpm run build:github-pages

# The static files will be generated in the `out` directory
```

## Configuration Details

- **Base Path**: `/website-frontend` (matches repository name)
- **Output Directory**: `out`
- **Static Export**: Enabled for GitHub Pages compatibility
- **Image Optimization**: Disabled (GitHub Pages doesn't support Next.js Image Optimization)
- **Trailing Slashes**: Enabled for better GitHub Pages compatibility

## Troubleshooting

1. **Build fails**: Check that all dependencies are properly installed
2. **404 errors**: Ensure the base path is correctly configured
3. **Images not loading**: Verify that images are in the `public` directory and referenced correctly
4. **Routing issues**: Make sure all routes are properly configured for static export

## Environment Variables

The following environment variables are used during GitHub Pages build:

- `GITHUB_PAGES=true`: Enables GitHub Pages specific configuration
- `NODE_ENV=production`: Sets production mode

## Notes

- The site will be available at `https://menteeno.github.io/website-frontend`
- All internal links and assets will automatically use the correct base path
- The deployment is automatic on every push to the `main` branch
