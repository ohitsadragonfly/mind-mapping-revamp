name: Validate Build

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Validate JS syntax in index.html
        run: |
          node -e "
            const fs = require('fs');
            const html = fs.readFileSync('www/index.html', 'utf8');
            const matches = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g)];
            const code = matches.map(m => m[1]).join('\n');
            try {
              new Function(code);
              console.log('JS syntax OK -', code.length, 'chars');
              process.exit(0);
            } catch (e) {
              console.error('JS PARSE ERROR:', e.message);
              process.exit(1);
            }
          "

      - name: Validate manifest.json
        run: node -e "JSON.parse(require('fs').readFileSync('www/manifest.json', 'utf8'))"

      - name: Validate capacitor config
        run: node -e "JSON.parse(require('fs').readFileSync('capacitor.config.json', 'utf8'))"

      - name: Check required PWA files exist
        run: |
          test -f www/index.html
          test -f www/manifest.json
          test -f www/sw.js
          test -f www/icon-192.png
          test -f www/icon-512.png
          test -f www/icon-180.png
          echo "All required PWA assets present"
