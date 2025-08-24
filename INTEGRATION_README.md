# 🔗 Integrated Deployment: GraidGenie.com + Irish LC Demo

This repository now supports **integrated deployment** where both applications are served from a single Netlify site.

## 🌐 URL Structure

- **GraidGenie.com Homepage**: `https://www.graidgenie.com/`
- **Irish LC Demo Platform**: `https://www.graidgenie.com/demo/`

## 📁 Project Structure

```
LeavingCert/
├── frontend/          # GraidGenie.com (Vite React app)
├── ui/                # Irish LC Demo (Next.js app)
├── netlify.toml       # Integrated deployment configuration
├── package.json       # Root build scripts
└── build-test.sh      # Local build testing
```

## 🚀 Deployment Process

### Automatic Deployment (Netlify)
1. **Push to main branch** → Triggers automatic build
2. **Build process runs**:
   - Builds GraidGenie.com frontend (Vite)
   - Builds Irish LC Demo (Next.js static export)
   - Combines both into `dist/` directory
3. **Deploy to single site** at www.graidgenie.com

### Manual Testing Locally
```bash
# Test the integrated build
./build-test.sh

# Serve locally (requires Python)
cd dist && python -m http.server 8000
# Visit: http://localhost:8000 (GraidGenie)
# Visit: http://localhost:8000/demo/ (Irish LC Demo)
```

## ⚙️ Configuration Details

### netlify.toml
- Routes `/` to GraidGenie.com React app
- Routes `/demo/*` to Irish LC Demo Next.js app
- Handles SPA routing for both applications
- Optimized caching for static assets

### next.config.mjs (ui/)
- **Static export enabled** for Netlify
- **Base path** set to `/demo` in production
- **Image optimization disabled** for static hosting
- **Trailing slashes** for better routing

### Build Scripts (package.json)
- `npm run build:integrated` - Full integrated build
- `npm run build:frontend` - GraidGenie.com only
- `npm run build:demo` - Irish LC Demo only
- `npm run combine:builds` - Merge both builds

## 🔄 Two-Way Navigation

### GraidGenie.com → Demo
- Hero section: "🇮🇪 Try Irish LC Demo"
- Demo banner: "🚀 Launch Full Demo Platform"
- Smart URL detection: localhost vs `/demo/`

### Demo → GraidGenie.com  
- Homepage CTAs to `https://www.graidgenie.com`
- Navigation links throughout platform
- Footer attribution links

## 🛠 Development Workflow

### Local Development
```bash
# Run GraidGenie.com locally
cd frontend && npm run dev
# Visit: http://localhost:5173

# Run Irish LC Demo locally  
cd ui && npm run dev
# Visit: http://localhost:3000
```

### Testing Integration
```bash
# Build and test integrated version
./build-test.sh
cd dist && python -m http.server 8000
```

### Deployment
```bash
# Just push to main - Netlify handles the rest!
git add .
git commit -m "Update integrated platform"
git push origin main
```

## ✨ Benefits of Integration

1. **Single Domain**: Both apps under www.graidgenie.com
2. **Seamless Navigation**: Users stay within same domain
3. **Simplified Deployment**: One Netlify site, one build process
4. **Better SEO**: Unified domain authority
5. **Cost Effective**: Single hosting plan
6. **Professional Appearance**: Cohesive brand experience

## 🔍 Troubleshooting

### Build Failures
- Check Node.js version compatibility
- Ensure all dependencies installed
- Verify static export settings in Next.js

### Routing Issues  
- Check netlify.toml redirect rules
- Verify base path configuration
- Test trailing slash handling

### Local Development Issues
- Run apps on different ports (3000, 5173)
- Clear browser cache between tests
- Check console for CORS or path errors

## 📊 Performance Optimization

- **Static Assets**: Cached for 1 year
- **HTML Files**: No caching for updates
- **Gzip Compression**: Enabled by Netlify
- **Image Optimization**: Handled by build process
- **Code Splitting**: Automatic via Next.js/Vite

Ready for production deployment! 🎯