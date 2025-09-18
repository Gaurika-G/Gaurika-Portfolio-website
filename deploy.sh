#!/bin/bash

echo "🚀 Deploying Portfolio to GitHub Pages..."
echo

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Add all files
echo "📁 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Update portfolio website - $(date)"

# Push to GitHub
echo "🌐 Pushing to GitHub..."
git push origin main

echo
echo "✅ Deployment complete!"
echo "🌍 Your website will be available at: https://gaurika-g.github.io/Gaurika-portfolio"
echo "⏱️  It may take 1-2 minutes for changes to appear."
