#!/bin/bash

# GitHub Pages Deployment Script
# This script builds and deploys the app to GitHub Pages

set -e

echo "🚀 Starting deployment to GitHub Pages..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found. Make sure you're in the project root directory."
  exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
  echo "❌ Error: Build failed. dist directory not created."
  exit 1
fi

echo "✅ Build successful!"
echo ""
echo "📝 Next steps:"
echo "1. Commit your changes: git add . && git commit -m 'Update app'"
echo "2. Push to GitHub: git push origin main"
echo "3. Enable GitHub Pages in repository settings:"
echo "   - Go to Settings > Pages"
echo "   - Select 'Deploy from a branch'"
echo "   - Choose 'main' branch and 'root' or '/docs' folder"
echo "4. Your app will be available at: https://yourusername.github.io/my-meet-app"
echo ""
echo "🎉 Deployment ready!"
