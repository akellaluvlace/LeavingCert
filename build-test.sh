#!/bin/bash
set -e

echo "🚀 Testing Integrated Build Process..."

# Clean any existing builds
echo "🧹 Cleaning existing builds..."
rm -rf dist
rm -rf frontend/dist
rm -rf ui/out
rm -rf ui/.next

# Build GraidGenie frontend (Vite)
echo "🎨 Building GraidGenie frontend..."
cd frontend
npm run build
cd ..

# Build Irish LC Demo (Next.js)
echo "🇮🇪 Building Irish LC Demo..."
cd ui
NODE_ENV=production npm run build
cd ..

# Combine builds
echo "🔗 Combining builds..."
mkdir -p dist
cp -r frontend/dist/* dist/
mkdir -p dist/demo
cp -r ui/out/* dist/demo/

echo "✅ Integration build complete!"
echo ""
echo "📁 Build structure:"
find dist -type f -name "*.html" | head -10
echo ""
echo "🌐 URLs will be:"
echo "  - GraidGenie.com: https://www.graidgenie.com/"
echo "  - Irish LC Demo: https://www.graidgenie.com/demo/"
echo ""
echo "🎯 Ready for Netlify deployment!"