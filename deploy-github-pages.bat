@echo off
REM GitHub Pages Deployment Script for Windows
REM This script builds and deploys the app to GitHub Pages

echo 🚀 Starting deployment to GitHub Pages...

REM Check if we're in the right directory
if not exist package.json (
    echo ❌ Error: package.json not found. Make sure you're in the project root directory.
    exit /b 1
)

REM Install dependencies if needed
if not exist node_modules (
    echo 📦 Installing dependencies...
    call npm install
)

REM Build the project
echo 🔨 Building the project...
call npm run build

REM Check if build was successful
if not exist dist (
    echo ❌ Error: Build failed. dist directory not created.
    exit /b 1
)

echo ✅ Build successful!
echo.
echo 📝 Next steps:
echo 1. Commit your changes: git add . and git commit -m "Update app"
echo 2. Push to GitHub: git push origin main
echo 3. Enable GitHub Pages in repository settings:
echo    - Go to Settings ^> Pages
echo    - Select 'Deploy from a branch'
echo    - Choose 'main' branch and 'root' or '/docs' folder
echo 4. Your app will be available at: https://yourusername.github.io/my-meet-app
echo.
echo 🎉 Deployment ready!
