#!/bin/bash

# Deploy script for virtuesextractor.com to Cloudflare Workers
# This script builds and deploys to Cloudflare Workers

set -e

echo "Building Next.js application..."
npm run build

echo "Creating output directory..."
mkdir -p .vercel/output/static

echo "Copying static assets..."
cp -r .next/static/* .vercel/output/static/

echo "Copying HTML files..."
find .next/server/app -name "*.html" -exec cp {} .vercel/output/static/ \;

echo "Copying public files..."
cp -r public/* .vercel/output/static/

echo "Build complete. Ready for deployment."
echo ""
echo "To deploy to Cloudflare Workers, run:"
echo "  npx wrangler deploy"
