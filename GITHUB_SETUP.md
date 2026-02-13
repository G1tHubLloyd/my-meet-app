# GitHub Repository Setup Guide

This guide will help you set up the My Meet App repository on GitHub and deploy it using GitHub Pages.

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in (or create an account)
2. Click the **+** icon in the top right corner
3. Select **New repository**
4. Fill in the repository details:
   - **Repository name**: `my-meet-app`
   - **Description**: "A serverless, progressive web app for discovering and filtering events using Google Calendar API"
   - **Visibility**: Public (required for GitHub Pages free tier)
   - **Initialize with**: Do NOT check any boxes (you'll push existing code)
5. Click **Create repository**

## Step 2: Initialize Git in Your Local Project

```bash
# Navigate to your project directory
cd "c:\Users\jongi\Desktop\Full Stack Web Development\my-meet-app"

# Initialize git repository
git init

# Add all files to git
git add .

# Create initial commit
git commit -m "Initial commit: Meet App with all features"

# Rename branch to main (if needed)
git branch -M main
```

## Step 3: Connect Local Repository to GitHub

```bash
# Add the remote repository (replace yourusername with your GitHub username)
git remote add origin https://github.com/yourusername/my-meet-app.git

# Push to GitHub
git push -u origin main
```

## Step 4: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (gear icon)
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select "main" and "/" (root)
   - Click **Save**
5. GitHub will build and deploy your site
6. After a few minutes, you'll see a message with your site URL:
   ```
   Your site is live at https://yourusername.github.io/my-meet-app/
   ```

## Step 5: Update Repository Settings (Optional)

### Add a description
1. Go to your repository home page
2. Click the settings icon next to "About"
3. Add:
   - **Description**: "A serverless, progressive web app for discovering events"
   - **Website**: Paste your GitHub Pages URL
4. Click **Save changes**

### Add topics
1. Under the repo name, click on "Add topics"
2. Add relevant tags: `react`, `pwa`, `google-calendar`, `aws-lambda`, `tdd`, `vite`

## Step 6: Deployment Workflow

After initial setup, use this workflow for future updates:

```bash
# Make your changes
# ... edit files ...

# Stage changes
git add .

# Commit changes
git commit -m "Description of your changes"

# Push to GitHub (auto-deploys)
git push origin main
```

The deployment will automatically trigger and take 1-2 minutes.

## Troubleshooting

### GitHub Pages not showing updated content
- **Solution**: Clear your browser cache (Ctrl+Shift+Delete) or use incognito mode
- GitHub Pages can take a few minutes to update

### Build fails on GitHub Pages
- **Solution**: Check the "Actions" tab in your GitHub repository
- Click on the failed workflow to see error details

### Service Worker not working
- **Solution**: GitHub Pages requires HTTPS for Service Workers
- Make sure you're accessing via HTTPS: `https://yourusername.github.io/my-meet-app/`

### 404 errors for routes
- **Solution**: GitHub Pages doesn't support client-side routing by default
- The project uses hash routing to work around this
- Routes will be like: `https://yourusername.github.io/my-meet-app/#/route-name`

## Advanced: Custom Domain

To use your own domain instead of github.com domain:

1. Go to **Settings > Pages**
2. Under "Custom domain", enter your domain
3. Update your domain's DNS records (see GitHub documentation)
4. GitHub will provision an SSL certificate automatically

## Useful GitHub Commands

```bash
# Check status of local repository
git status

# View commit history
git log --oneline

# Undo last commit (before push)
git reset HEAD~1

# View differences
git diff

# Create a new branch for feature development
git checkout -b feature/my-feature

# Switch branches
git checkout main

# Merge a branch
git merge feature/my-feature

# Delete a branch
git branch -d feature/my-feature
```

## GitHub Actions (Optional)

You can set up GitHub Actions to run tests on every push:

1. Create `.github/workflows/test.yml`:
```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test
      - run: npm run build
```

2. Commit and push the workflow file
3. GitHub will now run tests automatically

## Resources

- [GitHub Documentation](https://docs.github.com/)
- [GitHub Pages Documentation](https://pages.github.com/)
- [Git Tutorial](https://git-scm.com/doc)
- [GitHub Actions](https://github.com/features/actions)

## Next Steps

1. ✅ Create GitHub repository
2. ✅ Push your code
3. ✅ Enable GitHub Pages
4. ✅ Verify deployment
5. Configure Google Calendar API credentials
6. Configure AWS Lambda functions
7. Set up environment variables in GitHub
8. Deploy!

---

**Your GitHub Pages URL will be**: `https://yourusername.github.io/my-meet-app/`

Update the repository settings with this URL and share it with your team!
