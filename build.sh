#!/bin/bash
set -e

# Clean build artifacts
rm -rf .next

# Build Next.js
npm run build

# Remove cache before deploying
rm -rf .next/cache

echo "Build complete. Ready for deployment."
