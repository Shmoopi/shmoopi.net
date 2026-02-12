#!/usr/bin/env bash
set -euo pipefail

DIST="dist"

# Clean previous build
rm -rf "$DIST"
mkdir -p "$DIST"

# Copy all site files, excluding anything in .gitignore plus build artifacts
rsync -a \
  --filter=':- .gitignore' \
  --exclude='.git' \
  --exclude='package.json' \
  --exclude='package-lock.json' \
  --exclude='build.sh' \
  --exclude='.gitignore' \
  ./ "$DIST/"

# Minify HTML files
echo "Minifying HTML..."
for file in "$DIST"/*.html; do
  npx html-minifier-terser \
    --collapse-whitespace \
    --remove-comments \
    --remove-redundant-attributes \
    --remove-script-type-attributes \
    --remove-style-link-type-attributes \
    --minify-css true \
    --minify-js true \
    -o "$file" "$file"
  echo "  ✓ $(basename "$file")"
done

# Minify CSS
echo "Minifying CSS..."
find "$DIST" -name '*.css' -print0 | while IFS= read -r -d '' file; do
  npx cleancss -o "$file" "$file"
  echo "  ✓ $file"
done

# Minify JS
echo "Minifying JS..."
find "$DIST" -name '*.js' -print0 | while IFS= read -r -d '' file; do
  npx terser "$file" --compress --mangle -o "$file"
  echo "  ✓ $file"
done

echo "Build complete → $DIST/"
