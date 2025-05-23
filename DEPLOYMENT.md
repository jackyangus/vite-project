# GitHub Pages Deployment Guide

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

## 🚀 Setup Instructions

### 1. Repository Settings

1. Go to your GitHub repository: `https://github.com/jackyangus/vite-project`
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 2. Enable GitHub Actions

1. Go to **Actions** tab in your repository
2. If prompted, click **I understand my workflows, go ahead and enable them**
3. The workflow file is already created at `.github/workflows/deploy.yml`

### 3. Deploy Your Site

The deployment will automatically trigger when you:

- Push to the `main` branch
- Manually trigger the workflow from the Actions tab

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### 4. Access Your Site

Once deployed, your site will be available at:
**https://jackyangus.github.io/vite-project**

## 📋 What Happens During Deployment

1. **Build Process**:

   - Checks out your code
   - Sets up Node.js 20
   - Installs dependencies with `npm ci`
   - Runs `npm run build`
   - Uploads the `dist` folder as an artifact

2. **Deploy Process**:
   - Downloads the build artifact
   - Deploys to GitHub Pages
   - Updates the live site

## 🔧 Configuration Details

### Vite Configuration

- **Base Path**: `/vite-project/` (automatically applied in production)
- **Output Directory**: `dist/`
- **Asset Handling**: All assets are properly prefixed with the base path

### GitHub Actions Workflow

- **Trigger**: Push to `main` branch or manual dispatch
- **Node Version**: 20.x
- **Build Command**: `npm run build`
- **Deploy Source**: `./dist` folder

## 🐛 Troubleshooting

### Common Issues

1. **404 Error on Site Load**:

   - Check that the base path is correctly set in `vite.config.ts`
   - Ensure GitHub Pages is configured to use GitHub Actions

2. **Assets Not Loading**:

   - Verify the build output in `dist/index.html` has correct asset paths
   - Check browser console for 404 errors on assets

3. **Workflow Fails**:
   - Check the Actions tab for error details
   - Ensure all dependencies are correctly listed in `package.json`
   - Verify the build command works locally

### Manual Verification

Test the build locally before pushing:

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` to verify everything works correctly.

## 📝 Notes

- The site updates automatically on every push to `main`
- Build time is typically 2-3 minutes
- GitHub Pages may take a few minutes to update after deployment
- The workflow requires `contents: read` and `pages: write` permissions (already configured)

## 🔄 Manual Deployment

If you need to deploy manually:

1. Go to **Actions** tab
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Choose the branch and click **Run workflow**
