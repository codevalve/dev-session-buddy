#!/bin/bash

# Dev Session Buddy - Minimal Template
# This is a framework-agnostic template that provides basic development session setup

echo "Starting development session..."

# Check if .env exists, create if not
if [ ! -f .env ]; then
  echo "Creating .env file..."
  cp .env.example .env
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Run development server if package.json has a dev script
if grep -q "\"dev\":" package.json; then
  echo "Starting development server..."
  npm run dev
else
  echo "No development server configured. Add a 'dev' script to package.json to enable automatic server startup."
fi
