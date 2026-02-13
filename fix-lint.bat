@echo off
REM ESLint Fix Script for Windows
REM Automatically fixes linting issues where possible

echo 🔧 Running ESLint with automatic fixes...
call npm run lint -- --fix
echo ✅ Linting complete!
