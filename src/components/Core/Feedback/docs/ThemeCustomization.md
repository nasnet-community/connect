# Theme Customization Guide

Learn how to customize and extend the unified theme system for Core Feedback Components with mobile-responsive design and dark mode support.

## 🎨 Theme System Overview

The Core Feedback Components use a unified theme system that provides:

- **Consistent color palettes** across all components
- **Automatic dark mode** support with proper contrast ratios
- **Responsive sizing** that adapts to screen sizes
- **Customizable variants** (solid, outline, subtle)
- **Accessibility compliance** with WCAG 2.1 AA standards

## 🏗️ Theme Architecture

### Theme Structure

```tsx
// Theme configuration structure
interface FeedbackTheme {
  colors: {
    // Status-based color scales
    info: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    error: ColorScale;
    
    // Surface colors for backgrounds
    surface: {
      light: SurfaceColors;
      dark: SurfaceColors;
    };
  };
  
  sizing: {
    // Component size variants
    sm: SizeConfig;
    md: SizeConfig;
    lg: SizeConfig;
  };
  
  animations: {
    // Animation configurations
    duration: AnimationDurations;
    easing: AnimationEasing;
    transforms: AnimationTransforms;
  };
  
  mobile: {
    // Mobile-specific overrides
    breakpoints: Breakpoints;
    touchTargets: TouchTargetSizes;
    safeAreas: SafeAreaConfig;
  };
}
```

### Color Scale Structure

```tsx
// Each status color has a complete scale
interface ColorScale {
  // Light mode colors
  50: string;   // Lightest background
  100: string;  // Light background  
  200: string;  // Border color
  300: string;  // Muted text
  400: string;  // Secondary text
  500: string;  // Primary color
  600: string;  // Darker primary
  700: string;  // Dark text
  800: string;  // Darkest text
  900: string;  // Highest contrast
  
  // Additional semantic colors
  surface: string;  // Very light background
  
  // Dark mode variants (automatically generated or custom)
  dark: {
    50: string;
    100: string;
    // ... complete dark scale
  };
}
```

## 🎯 Basic Theme Customization

### Custom Color Palette

```tsx
// Define your custom color palette
const customTheme = {
  colors: {
    // Custom info colors (blue to purple gradient)
    info: {
      50: '#faf5ff',
      100: '#f3e8ff', 
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',  // Primary info color
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
      surface: '#fefbff',
      
      // Dark mode variants
      dark: {
        50: '#581c87',
        100: '#6b21a8',
        200: '#7c3aed',
        300: '#9333ea',
        400: '#a855f7',
        500: '#c084fc',
        600: '#d8b4fe',
        700: '#e9d5ff',
        800: '#f3e8ff',
        900: '#faf5ff',
        surface: '#1e1b4b',
      }
    },
    
    // Custom success colors (green to emerald)
    success: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',  // Primary success color
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
      surface: '#f0fdf4',
      
      dark: {
        50: '#064e3b',
        100: '#065f46',
        200: '#047857',
        300: '#059669',
        400: '#10b981',
        500: '#34d399',
        600: '#6ee7b7',
        700: '#a7f3d0',
        800: '#d1fae5',
        900: '#ecfdf5',
        surface: '#022c22',
      }
    },
    
    // Continue for warning and error...
  }
};
```

### Apply Custom Theme

```tsx
// Method 1: CSS Custom Properties (Recommended)
import { applyTheme } from '../utils/theme';

// Apply theme at app initialization
useVisibleTask$(() => {
  applyTheme(customTheme);
});

// Method 2: Theme Provider Context
import { ThemeProvider } from "~/components/Core/theme";

export default component$(() => {
  return (
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  );
});

// Method 3: Direct CSS
const CustomThemeComponent = component$(() => {
  return (
    <div
      style={{
        '--feedback-info-500': '#a855f7',
        '--feedback-success-500': '#10b981',
        '--feedback-warning-500': '#f59e0b',
        '--feedback-error-500': '#ef4444',
      }}
    >
      <Alert status="info" title="Custom themed alert" />
    </div>
  );
});
```

## 🎨 Advanced Color Customization

### Brand Color Integration

```tsx
// Integrate your brand colors into the feedback system
const brandTheme = {
  colors: {
    info: {
      // Use your brand primary color
      500: '#your-brand-primary',
      600: '#your-brand-primary-dark',
      700: '#your-brand-primary-darker',
      // Auto-generate the rest of the scale
      ...generateColorScale('#your-brand-primary')
    },
    
    success: {
      // Custom success color that complements your brand
      500: '#your-success-color',
      ...generateColorScale('#your-success-color')
    },
    
    // Brand-specific surface colors
    surface: {
      light: {
        DEFAULT: '#your-light-bg',
        elevated: '#your-light-elevated',
        depressed: '#your-light-depressed',
      },
      dark: {
        DEFAULT: '#your-dark-bg', 
        elevated: '#your-dark-elevated',
        depressed: '#your-dark-depressed',
      }
    }
  }
};

// Helper function to generate color scales
function generateColorScale(baseColor: string): ColorScale {
  // Use color manipulation library (e.g., chroma-js, polished)
  return {
    50: lighten(0.45, baseColor),
    100: lighten(0.35, baseColor),
    200: lighten(0.25, baseColor),
    300: lighten(0.15, baseColor),
    400: lighten(0.05, baseColor),
    500: baseColor,  // Base color
    600: darken(0.05, baseColor),
    700: darken(0.15, baseColor),
    800: darken(0.25, baseColor),
    900: darken(0.35, baseColor),
    surface: lighten(0.48, baseColor),
  };
}
```

### Accessibility-First Color System

```tsx
// Ensure all color combinations meet WCAG AA standards
const accessibleTheme = {
  colors: {
    info: {
      // Ensure 4.5:1 contrast ratio for text
      500: '#0f4c75',  // Base color
      100: '#e3f2fd',  // Background (19:1 contrast with text)
      800: '#0d47a1',  // Text color (7:1 contrast with background)
      
      // High contrast mode overrides
      hc: {
        background: '#000000',
        text: '#ffffff',
        border: '#ffffff',
      }
    }
  },
  
  // Accessibility-first sizing
  sizing: {
    sm: {
      minTouchTarget: 44,  // iOS/Android minimum
      padding: '8px 12px',
      fontSize: '14px',
      lineHeight: 1.5,
    },
    md: {
      minTouchTarget: 44,
      padding: '12px 16px', 
      fontSize: '16px',     // Base readable size
      lineHeight: 1.5,
    },
    lg: {
      minTouchTarget: 48,   // Generous touch target
      padding: '16px 20px',
      fontSize: '18px',
      lineHeight: 1.6,
    }
  }
};
```

## 📱 Mobile-Responsive Theming

### Responsive Color Adaptation

```tsx
// Colors that adapt based on screen size and device capabilities
const responsiveTheme = {
  colors: {
    info: {
      // Mobile: Higher contrast for outdoor visibility
      mobile: {
        500: '#1976d2',  // More saturated
        800: '#0d47a1',  // Higher contrast text
      },
      
      // Desktop: Softer colors for comfortable viewing
      desktop: {
        500: '#2196f3',  // Less saturated
        800: '#1565c0',  // Balanced contrast
      },
      
      // Dark mode mobile: Extra consideration for OLED screens
      darkMobile: {
        500: '#42a5f5',  // Prevents OLED burn-in
        background: '#000000', // True black for OLED
      }
    }
  },
  
  // Device-specific theming
  mobile: {
    // High-DPI display adjustments
    retina: {
      borderWidth: '0.5px',  // Thinner borders on high-DPI
      shadowBlur: '2px',     // Subtler shadows
    },
    
    // Touch-friendly sizing
    touchTargets: {
      minimum: 44,           // iOS/Android standard
      comfortable: 48,       // More generous
      thumb: 56,            // Thumb-friendly size
    },
    
    // Safe area considerations
    safeAreas: {
      padding: 16,          // Base safe area padding
      status: 44,           // Status bar height
      home: 34,             // Home indicator height
      dynamic: true,        // Use env() values when available
    }
  }
};
```

### Responsive Size System

```tsx
// Size system that adapts to screen size and usage context
const responsiveSizing = {
  // Alert component sizing
  alert: {
    sm: {
      // Mobile: Compact but readable
      mobile: 'text-sm py-2 px-3',
      // Tablet: Slightly more spacious  
      tablet: 'text-sm py-2.5 px-3.5',
      // Desktop: Generous spacing
      desktop: 'text-base py-3 px-4',
    },
    md: {
      mobile: 'text-base py-3 px-4',
      tablet: 'text-base py-3.5 px-4.5', 
      desktop: 'text-lg py-4 px-5',
    },
    lg: {
      mobile: 'text-lg py-4 px-5',
      tablet: 'text-lg py-4.5 px-5.5',
      desktop: 'text-xl py-5 px-6',
    }
  },
  
  // Toast sizing with mobile considerations
  toast: {
    sm: {
      mobile: 'text-sm p-3 max-w-[90vw]',  // Constrain width on mobile
      tablet: 'text-sm p-3 max-w-xs',
      desktop: 'text-base p-4 max-w-sm',
    }
  },
  
  // Dialog sizing for different screen sizes
  dialog: {
    responsive: {
      mobile: 'w-full h-full m-0',         // Fullscreen on mobile
      tablet: 'max-w-md mx-4 my-8',        // Modal on tablet
      desktop: 'max-w-lg mx-auto my-16',   // Generous spacing on desktop
    }
  }
};
```

## 🌙 Dark Mode Customization

### Automatic Dark Mode Colors

```tsx
// Define light colors, dark variants are automatically calculated
const autoDarkTheme = {
  colors: {
    info: {
      // Light mode colors
      500: '#2196f3',
      
      // Dark mode automatically uses appropriate contrast
      // But you can override specific values
      dark: {
        500: '#42a5f5',      // Lighter for dark backgrounds
        background: '#0d1421', // Custom dark background
        surface: '#1a2332',    // Custom dark surface
      }
    }
  },
  
  // Dark mode behavior settings
  darkMode: {
    // Automatic calculation settings
    contrastBoost: 1.2,        // Increase contrast in dark mode
    surfaceLightness: 0.08,    // How light dark surfaces should be
    textContrast: 7,           // Minimum contrast ratio for text
    
    // Color temperature adjustments
    warmth: 0.02,              // Slightly warmer colors in dark mode
    saturation: 0.9,           // Reduce saturation slightly
    
    // Device-specific adjustments
    oled: {
      useTrueBlack: true,      // Use #000000 for OLED displays
      reduceBlueLights: true,   // Warmer colors for night viewing
    }
  }
};
```

### Custom Dark Mode Implementation

```tsx
// Manual dark mode color definitions for complete control
const manualDarkTheme = {
  colors: {
    info: {
      // Light mode
      500: '#1976d2',
      100: '#e3f2fd',
      800: '#0d47a1',
      
      // Carefully chosen dark mode colors
      dark: {
        500: '#42a5f5',        // Blue that works on dark
        100: '#0a1929',        // Very dark blue background
        800: '#90caf9',        // Light blue text
        border: '#1e3a5f',     // Subtle border color
        
        // Context-aware variants
        hover: '#1e88e5',      // Hover state color
        active: '#1565c0',     // Active state color
        disabled: '#424242',   // Disabled state color
      }
    },
    
    // Surface colors for dark mode
    surface: {
      dark: {
        DEFAULT: '#121212',     // Material Design dark surface
        elevated: '#1e1e1e',    // Elevated surface
        depressed: '#0a0a0a',   // Depressed surface
        
        // Paper-like surfaces with elevation
        paper1: '#1e1e1e',      // 1dp elevation
        paper2: '#222222',      // 2dp elevation  
        paper3: '#242424',      // 3dp elevation
        paper4: '#262626',      // 4dp elevation
      }
    }
  }
};
```

### Theme-Aware Component Usage

```tsx
// Using theme-aware components
const ThemeAwareExample = component$(() => {
  return (
    <div class="space-y-4">
      {/* Components automatically use theme colors */}
      <Alert status="info" variant="solid">
        This alert uses theme colors for both light and dark mode
      </Alert>
      
      <Alert status="success" variant="outline">
        Outline variant with theme-aware borders
      </Alert>
      
      <Alert status="warning" variant="subtle">
        Subtle variant with theme-aware backgrounds
      </Alert>
      
      {/* Custom themed component */}
      <div class={cn(
        "p-4 rounded-lg border",
        // Use theme utilities for consistent colors
        getStatusColors("info", "solid"),
        getSurfaceElevation("elevated")
      )}>
        Custom component using theme utilities
      </div>
    </div>
  );
});
```

## 🎯 Component-Specific Theming

### Alert Component Theming

```tsx
// Customize Alert component appearance
const alertTheme = {
  alert: {
    // Base styling that applies to all variants
    base: 'rounded-lg border flex items-start gap-3 transition-all duration-200',
    
    // Variant-specific styling
    variants: {
      solid: {
        info: 'bg-info-100 text-info-800 border-info-200',
        success: 'bg-success-100 text-success-800 border-success-200',
        warning: 'bg-warning-100 text-warning-800 border-warning-200', 
        error: 'bg-error-100 text-error-800 border-error-200',
      },
      
      outline: {
        info: 'bg-transparent border-2 border-info-500 text-info-700',
        success: 'bg-transparent border-2 border-success-500 text-success-700',
        // ...
      },
      
      subtle: {
        info: 'bg-info-50 text-info-700 border-info-100',
        success: 'bg-success-50 text-success-700 border-success-100',
        // ...
      },
      
      // Custom variant
      gradient: {
        info: 'bg-gradient-to-r from-info-100 to-info-200 text-info-800',
        success: 'bg-gradient-to-r from-success-100 to-success-200 text-success-800',
        // ...
      }
    },
    
    // Size-specific styling
    sizes: {
      sm: 'text-sm py-2 px-3',
      md: 'text-base py-3 px-4', 
      lg: 'text-lg py-4 px-5',
      
      // Mobile overrides
      mobile: {
        sm: 'text-xs py-2 px-3',
        md: 'text-sm py-3 px-4',
        lg: 'text-base py-4 px-5',
      }
    },
    
    // Animation themes
    animations: {
      fadeIn: 'animate-fade-in',
      slideDown: 'animate-slide-down',
      slideUp: 'animate-slide-up',
      scaleUp: 'animate-scale-up',
      
      // Custom animations
      bounceIn: 'animate-bounce-in',
      slideInLeft: 'animate-slide-in-left',
    }
  }
};
```

### Toast Component Theming

```tsx
// Toast-specific theme configuration
const toastTheme = {
  toast: {
    // Container styling
    container: {
      base: 'fixed z-50 pointer-events-none',
      positions: {
        'top-left': 'top-4 left-4',
        'top-center': 'top-4 left-1/2 -translate-x-1/2',
        'top-right': 'top-4 right-4',
        'bottom-left': 'bottom-4 left-4', 
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
        'bottom-right': 'bottom-4 right-4',
      },
      
      // Mobile positioning
      mobile: {
        'top-center': 'top-safe left-4 right-4',
        'bottom-center': 'bottom-safe left-4 right-4', 
      }
    },
    
    // Individual toast styling
    item: {
      base: 'pointer-events-auto rounded-lg shadow-lg backdrop-blur-sm',
      variants: {
        solid: {
          info: 'bg-info-500 text-white',
          success: 'bg-success-500 text-white',
          warning: 'bg-warning-500 text-white',
          error: 'bg-error-500 text-white',
        },
        
        // Glass morphism variant
        glass: {
          info: 'bg-info-100/80 backdrop-blur-md text-info-800 border border-info-200/50',
          success: 'bg-success-100/80 backdrop-blur-md text-success-800 border border-success-200/50',
          // ...
        }
      },
      
      // Mobile-specific styling
      mobile: {
        base: 'mx-4 max-w-none',
        swipeIndicator: 'relative overflow-hidden',
        swipeProgress: 'absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-200',
      }
    }
  }
};
```

## 🎨 CSS Custom Properties Integration

### Theme CSS Variables

```css
/* Define theme variables in CSS */
:root {
  /* Status colors */
  --feedback-info-50: #f0f9ff;
  --feedback-info-100: #e0f2fe;
  --feedback-info-200: #bae6fd;
  --feedback-info-300: #7dd3fc;
  --feedback-info-400: #38bdf8;
  --feedback-info-500: #0ea5e9;
  --feedback-info-600: #0284c7;
  --feedback-info-700: #0369a1;
  --feedback-info-800: #075985;
  --feedback-info-900: #0c4a6e;
  
  /* Surface colors */
  --feedback-surface-light: #ffffff;
  --feedback-surface-light-elevated: #ffffff;
  --feedback-surface-light-depressed: #f8fafc;
  
  /* Sizing variables */
  --feedback-size-sm: 0.875rem;
  --feedback-size-md: 1rem;
  --feedback-size-lg: 1.125rem;
  
  /* Animation variables */
  --feedback-duration-fast: 150ms;
  --feedback-duration-normal: 200ms;
  --feedback-duration-slow: 300ms;
  
  /* Mobile-specific variables */
  --feedback-touch-target-min: 44px;
  --feedback-mobile-padding: 1rem;
  --feedback-safe-area-top: env(safe-area-inset-top, 0px);
  --feedback-safe-area-bottom: env(safe-area-inset-bottom, 0px);
}

/* Dark mode overrides */
[data-theme="dark"] {
  --feedback-info-50: #0c4a6e;
  --feedback-info-100: #075985;
  --feedback-info-200: #0369a1;
  --feedback-info-300: #0284c7;
  --feedback-info-400: #0ea5e9;
  --feedback-info-500: #38bdf8;
  --feedback-info-600: #7dd3fc;
  --feedback-info-700: #bae6fd;
  --feedback-info-800: #e0f2fe;
  --feedback-info-900: #f0f9ff;
  
  --feedback-surface-light: #1f2937;
  --feedback-surface-light-elevated: #374151;
  --feedback-surface-light-depressed: #111827;
}

/* Mobile responsive overrides */
@media (max-width: 768px) {
  :root {
    --feedback-size-sm: 0.75rem;
    --feedback-size-md: 0.875rem;
    --feedback-size-lg: 1rem;
    
    --feedback-mobile-padding: 0.75rem;
  }
}
```

### Using CSS Variables in Components

```tsx
// Use CSS variables for dynamic theming
const CSSVariableExample = component$(() => {
  return (
    <div
      style={{
        backgroundColor: 'var(--feedback-info-100)',
        color: 'var(--feedback-info-800)',
        borderColor: 'var(--feedback-info-200)',
        padding: 'var(--feedback-mobile-padding)',
        fontSize: 'var(--feedback-size-md)',
        borderRadius: '0.5rem',
        borderWidth: '1px',
        transition: 'all var(--feedback-duration-normal)',
      }}
    >
      Component using CSS variables for theming
    </div>
  );
});

// Helper for CSS variable values
const useCSSVar = (variable: string, fallback?: string) => {
  return `var(${variable}${fallback ? `, ${fallback}` : ''})`;
};

const StyledComponent = component$(() => {
  return (
    <div
      style={{
        backgroundColor: useCSSVar('--feedback-info-100', '#e0f2fe'),
        color: useCSSVar('--feedback-info-800', '#075985'),
        padding: useCSSVar('--feedback-mobile-padding', '1rem'),
      }}
    >
      Safely using CSS variables with fallbacks
    </div>
  );
});
```

## 🛠️ Theme Development Tools

### Theme Preview Component

```tsx
// Component to preview all theme variations
const ThemePreview = component$(() => {
  const statuses = ['info', 'success', 'warning', 'error'] as const;
  const variants = ['solid', 'outline', 'subtle'] as const;
  const sizes = ['sm', 'md', 'lg'] as const;
  
  return (
    <div class="p-8 space-y-8">
      <h1 class="text-2xl font-bold">Theme Preview</h1>
      
      {/* Status Colors */}
      <section>
        <h2 class="text-xl font-semibold mb-4">Status Colors</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statuses.map((status) => (
            <div key={status} class="space-y-2">
              <h3 class="font-medium capitalize">{status}</h3>
              {variants.map((variant) => (
                <Alert
                  key={`${status}-${variant}`}
                  status={status}
                  variant={variant}
                  title={`${status} ${variant}`}
                  dismissible
                />
              ))}
            </div>
          ))}
        </div>
      </section>
      
      {/* Sizes */}
      <section>
        <h2 class="text-xl font-semibold mb-4">Sizes</h2>
        <div class="space-y-4">
          {sizes.map((size) => (
            <Alert
              key={size}
              status="info"
              size={size}
              title={`Size: ${size}`}
              message={`This alert demonstrates the ${size} size variant`}
              dismissible
            />
          ))}
        </div>
      </section>
      
      {/* Dark Mode Toggle */}
      <section>
        <h2 class="text-xl font-semibold mb-4">Dark Mode</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Light Mode */}
          <div data-theme="light" class="p-4 rounded-lg bg-white">
            <h3 class="font-medium mb-4">Light Mode</h3>
            <div class="space-y-2">
              {statuses.map((status) => (
                <Alert
                  key={status}
                  status={status}
                  title={`Light ${status}`}
                  size="sm"
                />
              ))}
            </div>
          </div>
          
          {/* Dark Mode */}
          <div data-theme="dark" class="p-4 rounded-lg bg-gray-900">
            <h3 class="font-medium mb-4 text-white">Dark Mode</h3> 
            <div class="space-y-2">
              {statuses.map((status) => (
                <Alert
                  key={status}
                  status={status}
                  title={`Dark ${status}`}
                  size="sm"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
```

### Theme Color Generator

```tsx
// Tool to generate theme colors from a base color
const ThemeColorGenerator = component$(() => {
  const baseColor = useSignal('#2196f3');
  const generatedScale = useComputed$(() => {
    return generateColorScale(baseColor.value);
  });
  
  return (
    <div class="p-6 max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold mb-6">Theme Color Generator</h2>
      
      {/* Color Input */}
      <div class="mb-6">
        <label class="block text-sm font-medium mb-2">
          Base Color
        </label>
        <input
          type="color"
          value={baseColor.value}
          onInput$={(event) => {
            baseColor.value = (event.target as HTMLInputElement).value;
          }}
          class="w-20 h-10 rounded border"
        />
        <input
          type="text"
          value={baseColor.value}
          onInput$={(event) => {
            baseColor.value = (event.target as HTMLInputElement).value;
          }}
          class="ml-4 px-3 py-2 border rounded"
          placeholder="#2196f3"
        />
      </div>
      
      {/* Generated Scale */}
      <div class="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
        {Object.entries(generatedScale.value).map(([shade, color]) => (
          <div key={shade} class="text-center">
            <div
              class="w-full h-16 rounded mb-2 border"
              style={{ backgroundColor: color }}
            />
            <div class="text-xs font-mono">{shade}</div>
            <div class="text-xs font-mono text-gray-500">{color}</div>
          </div>
        ))}
      </div>
      
      {/* Preview with Generated Colors */}
      <div class="mt-8">
        <h3 class="text-lg font-semibold mb-4">Preview</h3>
        <div class="space-y-4">
          <Alert
            status="info"
            variant="solid"
            title="Generated Color Preview"
            message="This shows how your generated colors look in actual components"
            style={{
              '--feedback-info-100': generatedScale.value[100],
              '--feedback-info-500': generatedScale.value[500],
              '--feedback-info-800': generatedScale.value[800],
            }}
          />
        </div>
      </div>
      
      {/* Export Code */}
      <div class="mt-8">
        <h3 class="text-lg font-semibold mb-4">Generated CSS</h3>
        <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
          <code>{`
:root {
${Object.entries(generatedScale.value)
  .map(([shade, color]) => `  --feedback-info-${shade}: ${color};`)
  .join('\n')}
}
          `.trim()}</code>
        </pre>
      </div>
    </div>
  );
});
```

## 🎯 Best Practices

### ✅ Theme Best Practices

1. **Start with System Colors** - Build on established design system colors
2. **Ensure Accessibility** - Always check contrast ratios (4.5:1 minimum)
3. **Test in Dark Mode** - Verify all colors work in both light and dark themes
4. **Use Semantic Naming** - Name colors by purpose, not appearance
5. **Plan for Mobile** - Consider outdoor visibility and OLED displays
6. **Provide Fallbacks** - Always include fallback values for CSS variables
7. **Document Your Theme** - Create a style guide for your custom theme

### ❌ Common Mistakes

1. **Hard-coding Colors** - Don't use fixed color values in components
2. **Ignoring Contrast** - Don't assume light mode colors work in dark mode
3. **Forgetting Mobile** - Don't design only for desktop screens
4. **Breaking Accessibility** - Don't sacrifice accessibility for aesthetics
5. **Inconsistent Naming** - Don't mix different naming conventions
6. **Missing States** - Don't forget hover, focus, active, and disabled states

## 🔗 Next Steps

After customizing your theme:

1. **Test Thoroughly** - Use the theme preview component to test all variations
2. **Document Changes** - Create a theme guide for your team
3. **Performance Check** - Ensure your theme doesn't impact performance
4. **Accessibility Audit** - Run accessibility tests with your custom colors
5. **Mobile Testing** - Test on actual devices with your theme

**Related Guides:**
- [Mobile Optimization](./MobileOptimization.md) - Mobile-specific theming considerations
- [Accessibility Guide](./AccessibilityGuide.md) - Ensuring your theme is accessible
- [Performance Guide](./PerformanceGuide.md) - Optimizing theme performance

---

**Need help with theming?** Check out the individual component documentation for specific theming examples and the [Troubleshooting Guide](./TroubleshootingGuide.md) for common theming issues.