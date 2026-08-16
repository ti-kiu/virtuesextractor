#!/bin/bash

# Deploy script for virtuesextractor.com to Cloudflare Pages
# This script builds and deploys to Cloudflare Pages

set -e

echo "Building Next.js application..."
npm run build

echo "Creating output directory..."
mkdir -p .vercel/output/static

echo "Copying static assets..."
cp -r .next/static/* .vercel/output/static/

echo "Copying HTML files..."
find .next/server/app -name "*.html" -exec cp {} .vercel/output/static/ \;

echo "Copying RSC files..."
find .next/server/app -name "*.rsc" -exec cp {} .vercel/output/static/ \;

echo "Copying meta files..."
find .next/server/app -name "*.meta" -exec cp {} .vercel/output/static/ \;

echo "Copying public files..."
cp -r public/* .vercel/output/static/

echo "Build complete. Ready for deployment."
echo ""
echo "To deploy to Cloudflare Pages, run:"
echo "  npx wrangler pages deploy .vercel/output/static --project-name=virtuesextractor"
echo ""
echo "Or connect to GitHub for automatic deployments:"
echo "  1. Go to Cloudflare Dashboard > Pages"
echo "  2. Create a new project"
echo "  3. Connect your GitHub repository"
echo "  4. Set build command: npm run build"
echo "  5. Set output directory: .vercel/output/static"
