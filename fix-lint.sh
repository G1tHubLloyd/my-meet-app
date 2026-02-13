#!/bin/bash

# ESLint Fix Script
# Automatically fixes linting issues where possible

echo "🔧 Running ESLint with automatic fixes..."
npm run lint -- --fix
echo "✅ Linting complete!"
