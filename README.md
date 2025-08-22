
# Demo 
https://simplec0de.github.io/portfolio-01/

# Modern Portfolio Template

A modern, responsive portfolio template built with React, TypeScript, and Vite. Features smooth animations, optimized performance, and accessibility-first design.

## 🚀 Features

- **Modern Tech Stack**: React 19, TypeScript, Vite 6
- **Styled with Emotion**: Utilizes `@emotion/styled` for component-based styling
- **Smooth Animations**: Powered by Framer Motion
- **Optimized Performance**:
  - Automatic code splitting
  - Brotli & Gzip compression
  - Lazy-loaded components
  - Bundle size visualization
- **Fully Responsive**: Works seamlessly on all devices
- **Accessibility**: ARIA labels and semantic HTML
- **Dark Mode Ready**: Built-in theming support

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/simpleC0de/portfolio-01.git
cd portfolio-01
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 📝 Customization

### Personal Information
Edit the following files to customize your portfolio:

1. `src/components/sections/Hero.tsx`:
   - Update your name, title, and description
   - Modify social media links

2. `src/components/sections/Projects.tsx`:
   - Add your projects and their details

3. `src/components/sections/Skills.tsx`:
   - Update your skills and expertise

4. `src/components/sections/Contact.tsx`:
   - Customize contact information

### Styling
- Theme customization: `src/styles/theme.ts`
- Global styles: `src/styles/GlobalStyles.tsx`

## 🚀 Deployment

This template is configured for GitHub Pages deployment by default. The `vite.config.ts` is set up with:
```typescript
base: '/portfolio-01/'  // Change this to your repo name
```

To deploy:

1. Update the `base` in `vite.config.ts` to match your repository name:
```typescript
base: '/your-repo-name/'
```

2. Build the project:
```bash
npm run build
```

3. Deploy to GitHub Pages:
   - Push to your GitHub repository
   - Enable GitHub Pages in repository settings
   - Select the `gh-pages` branch as source

### Alternative Deployment

For other platforms (Vercel, Netlify, etc.):
1. Remove or update the `base` property in `vite.config.ts`
2. Follow the platform-specific deployment instructions

## ⚙️ Development Features

### Build Optimization

The project includes several optimization features:

- **Code Splitting**: Vendor chunks are automatically separated
```typescript
manualChunks: {
  vendor: ['react', 'react-dom', 'framer-motion', '@emotion/react', '@emotion/styled'],
  icons: ['react-icons']
}
```

- **Compression**: Both Brotli and Gzip compression are enabled
  - Brotli: Level 11 compression
  - Gzip: Level 9 compression
  - Threshold: 512 bytes

- **Bundle Analysis**: Visualize your bundle size
```bash
npm run build
# Opens bundle analysis in browser automatically
```

### Performance Monitoring

- Bundle size visualization with `rollup-plugin-visualizer`
- Compressed size reporting
- Chunk size warnings (limit: 1000kb)

## 📦 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Lint code

## 🔧 System Requirements

- Node.js 18+
- npm 7+

## 📄 License

MIT License - feel free to use this template for your portfolio!
