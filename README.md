# Portfolio Website - Badmus Kolade

A minimal, modern portfolio website showcasing software engineering expertise, built with React.

## 🚀 Features

- **SEO Optimized**: Comprehensive meta tags, Open Graph support, structured data (JSON-LD)
- **Accessible**: WCAG AA compliant with keyboard navigation, ARIA labels, and screen reader support
- **Responsive**: Mobile-first design with optimized layouts for all screen sizes
- **Modern Form Handling**: Web3Forms integration for contact form (no backend needed)
- **Performance**: Optimized bundle size and loading times
- **PWA Ready**: Manifest and service worker support for installability

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. **Set up Web3Forms**:
   - Visit [Web3Forms](https://web3forms.com/)
   - Sign up for a free account
   - Get your Access Key
   - Open `src/components/contact/Contact.jsx`
   - Replace `YOUR_WEB3FORMS_ACCESS_KEY_HERE` with your actual key (line 42)

## 🏃 Running the Application

### Development Mode
```bash
npm start
```
Runs the app at [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `build` folder.

### Run Tests
```bash
npm test
```

## 🎨 Customization

### Update Personal Information

1. **Meta Tags**: Edit `public/index.html` to update:
   - Title and description
   - Social media links in structured data
   - Domain URLs

2. **Content**: Update these files:
   - `src/components/header/Header.jsx` - Name and title
   - `src/components/about/About.jsx` - Bio and experience
   - `src/components/contact/Contact.jsx` - Contact details

3. **Colors**: Modify CSS variables in `src/index.css`:
   ```css
   :root {
     --color-bg: #F5F5F5;
     --color-bg-variant: #BE375f;
     --color-primary: #ED8554;
   }
   ```

## ♿ Accessibility Features

- **Keyboard Navigation**: Full site navigation using Tab, Arrow keys, Enter, and Space
- **Skip Links**: Quick navigation to main content
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Indicators**: Visible focus states for all interactive elements
- **Reduced Motion**: Respects user's motion preferences

## 📱 Responsive Breakpoints

- Desktop: > 1024px
- Tablet: 600px - 1024px  
- Mobile: < 600px

## 🔒 Security

- No sensitive API keys in client code (Web3Forms key is safe for client-side use)
- Honeypot spam protection in contact form
- CORS-compliant form submissions

## 📦 Dependencies

Main dependencies:
- React 18.3.1
- React Icons 4.12.0
- Swiper 9.4.1
- Web Vitals 3.5.2

## 🌐 Deployment

The site can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop the `build` folder
- **GitHub Pages**: Use `gh-pages` package

Remember to:
1. Update all URLs in `public/index.html` with your domain
2. Add your Web3Forms access key
3. Test the contact form after deployment

## 📄 License

All rights reserved © Badmus Kolade

## 🤝 Contact

- Email: leodarkseid@gmail.com
- Telegram: [@leodarkseid](https://t.me/leodarkseid)
- Discord: [@leodarkseid](https://discordapp.com/users/770896443560427530)

---

Built with ❤️ using React
