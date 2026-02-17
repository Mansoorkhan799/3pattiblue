#!/bin/bash
# Download OG images from Card Rummy repo into public/feature
set -e
mkdir -p public/feature
BASE="https://raw.githubusercontent.com/Mansoorkhan799/card-rummy/main/public/feature"
curl -sL -o public/feature/og-image.webp "$BASE/og-image.webp"
curl -sL -o public/feature/og-image-square.webp "$BASE/og-image-square.webp"
curl -sL -o public/feature/twitter-card.webp "$BASE/twitter-card.webp"
echo "Done. Files in public/feature:"
ls -la public/feature
