# Landing Page Components

A modern, Apple-inspired landing page for the MikroTik router configuration application.

## Features

- ✨ Modern glassmorphism design
- 📱 Fully responsive (mobile, tablet, desktop)
- 🌍 RTL/LTR support
- 🎨 Tailwind CSS with custom animations
- 🚀 Apple-inspired interactions
- ♿ Accessibility compliant

## Usage

```tsx
import { LandingPage } from "~/components/Star/LandingPage";

export default component$(() => {
  return (
    <div>
      <LandingPage />
    </div>
  );
});
```

## Components Included

### 1. HeroSection
- Animated background with floating particles
- Gradient text effects
- Feature pills and call-to-action buttons
- Trust indicators

### 2. FeatureShowcase
- 6 main feature cards with icons
- Hover animations and glassmorphism effects
- Progressive animation delays

### 3. RouterModelsSection
- Interactive category filtering
- 17+ router model cards
- 3D hover effects and animations
- Technical specifications display

### 4. VPNCapabilities
- 6 VPN protocol showcase
- Interactive protocol selection
- Performance metrics visualization
- Server/Client mode indicators

### 5. TechSpecsSection
- Technical specifications grid
- User testimonials
- Trust indicators and stats
- Professional metrics display

### 6. NavigationBar
- Sticky navigation with glassmorphism
- Mobile-responsive menu
- Smooth scroll effects

### 7. FooterSection
- Comprehensive footer links
- Newsletter signup
- Social media links
- Back to top button

## Customization

All components use the existing Tailwind configuration with:
- Custom color palette (primary, secondary, surface)
- Animation utilities
- Glassmorphism effects
- RTL/LTR support

## Accessibility

- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- WCAG AA compliant colors

## Performance

- Lazy loading for images
- Optimized animations
- Progressive enhancement
- Fast loading transitions

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers