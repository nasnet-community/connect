/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import scrollbar from "tailwind-scrollbar";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";
import containerQueries from "@tailwindcss/container-queries";
import rtl from "tailwindcss-rtl";

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./index.html"],
  // Enhanced dark mode with class strategy for component compatibility
  darkMode: "class",
  theme: {
    // Custom screens optimized for mobile, tablet, and desktop
    screens: {
      // Mobile first breakpoints
      "2xs": "360px", // Small phones
      xs: "475px", // Standard phones
      sm: "640px", // Large phones
      md: "768px", // Tablets
      lg: "1024px", // Small laptops
      xl: "1280px", // Desktop
      "2xl": "1536px", // Large desktop
      "3xl": "1920px", // Full HD
      "4xl": "2560px", // 2K/4K

      // Device-specific aliases
      mobile: "360px",
      "mobile-md": "475px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",

      // Max-width breakpoints for targeting specific ranges
      "max-2xs": { max: "359px" },
      "max-xs": { max: "474px" },
      "max-sm": { max: "639px" },
      "max-md": { max: "767px" },
      "max-lg": { max: "1023px" },
      "max-xl": { max: "1279px" },
      "max-2xl": { max: "1535px" },

      // Range breakpoints for precise targeting
      "mobile-only": { min: "360px", max: "767px" },
      "tablet-only": { min: "768px", max: "1023px" },
      "desktop-only": { min: "1024px", max: "1535px" },

      // Orientation-based breakpoints
      portrait: { raw: "(orientation: portrait)" },
      landscape: { raw: "(orientation: landscape)" },

      // Feature queries
      touch: { raw: "(hover: none) and (pointer: coarse)" },
      "can-hover": { raw: "(hover: hover) and (pointer: fine)" },

      // High-resolution displays
      retina: {
        raw: "(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)",
      },

      // Print mode
      print: { raw: "print" },
    },
    extend: {
      // Complete Color System with RTL/LTR and Dark Mode optimization
      colors: {
        // Brand Colors with dark mode optimization
        primary: {
          50: "#FEF9E7",
          100: "#FDF3CF",
          200: "#FCE7A0",
          300: "#FADB71",
          400: "#F7CF42",
          500: "#EFC729",
          600: "#D1AC13",
          700: "#A6890F",
          800: "#7A660B",
          900: "#4E4207",
          950: "#2A2404",
          // Dark mode specific shades
          dark: {
            50: "#2A2404",
            100: "#4E4207",
            200: "#7A660B",
            300: "#A6890F",
            400: "#D1AC13",
            500: "#EFC729",
            600: "#F7CF42",
            700: "#FADB71",
            800: "#FCE7A0",
            900: "#FDF3CF",
            950: "#FEF9E7",
          },
        },
        secondary: {
          50: "#EEF4FA",
          100: "#DCE8F5",
          200: "#B9D1EB",
          300: "#96BAE1",
          400: "#73A3D7",
          500: "#4972ba",
          600: "#3B5B95",
          700: "#2D4470",
          800: "#1F2D4B",
          900: "#111726",
          950: "#0A0D15",
          // Dark mode specific shades
          dark: {
            50: "#0A0D15",
            100: "#111726",
            200: "#1F2D4B",
            300: "#2D4470",
            400: "#3B5B95",
            500: "#4972ba",
            600: "#73A3D7",
            700: "#96BAE1",
            800: "#B9D1EB",
            900: "#DCE8F5",
            950: "#EEF4FA",
          },
        },
        // Optimized surface colors for dark/light themes
        surface: {
          light: {
            DEFAULT: "#FFFFFF",
            secondary: "#F8FAFC",
            tertiary: "#F1F5F9",
            quaternary: "#E2E8F0",
            elevated: "#FFFFFF",
            depressed: "#E2E8F0",
          },
          dark: {
            DEFAULT: "#0F172A",
            secondary: "#1E293B",
            tertiary: "#334155",
            quaternary: "#475569",
            elevated: "#1E293B",
            depressed: "#020617",
          },
          // Intermediate "dim" theme
          dim: {
            DEFAULT: "#1A202C",
            secondary: "#2D3748",
            tertiary: "#4A5568",
            quaternary: "#718096",
            elevated: "#2D3748",
            depressed: "#171923",
          },
        },
        // Semantic colors with WCAG AA compliance
        success: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          DEFAULT: "#22C55E",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
          950: "#052E16",
          light: "#4ADE80",
          dark: "#15803D",
          surface: "#F0FDF4",
          "on-surface": "#052E16",
        },
        warning: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          DEFAULT: "#F59E0B",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
          950: "#451A03",
          light: "#FBBF24",
          dark: "#B45309",
          surface: "#FFFBEB",
          "on-surface": "#451A03",
        },
        error: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          DEFAULT: "#EF4444",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
          950: "#450A0A",
          light: "#F87171",
          dark: "#B91C1C",
          surface: "#FEF2F2",
          "on-surface": "#450A0A",
        },
        info: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          DEFAULT: "#0EA5E9",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
          950: "#082F49",
          light: "#38BDF8",
          dark: "#0369A1",
          surface: "#F0F9FF",
          "on-surface": "#082F49",
        },
        // System grays with proper contrast
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#030712",
        },
        // High contrast mode colors
        contrast: {
          lower: "rgba(0, 0, 0, 0.05)",
          low: "rgba(0, 0, 0, 0.1)",
          medium: "rgba(0, 0, 0, 0.5)",
          high: "rgba(0, 0, 0, 0.9)",
          higher: "rgba(0, 0, 0, 0.95)",
        },
        // Backward compatibility colors
        background: {
          DEFAULT: "#F1F5F9",
          dark: "#0F172A",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#1E293B",
        },
        border: {
          DEFAULT: "#E2E8F0",
          dark: "#334155",
        },
        text: {
          DEFAULT: "#0F172A",
          "dark-default": "#F8FAFC",
        },
      },
      // Typography optimized for RTL and mobile
      fontFamily: {
        // RTL-friendly font stacks
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Noto Sans",
          "Ubuntu",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        "sans-rtl": [
          "Vazirmatn",
          "Noto Sans Arabic",
          "Tahoma",
          "Arial",
          "sans-serif",
        ],
        serif: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        "serif-rtl": ["Noto Serif Arabic", "Amiri", "serif"],
        mono: [
          "Fira Code",
          "Consolas",
          "Monaco",
          "Andale Mono",
          "Ubuntu Mono",
          "monospace",
        ],
        display: ["Satoshi", "Inter", ...defaultTheme.fontFamily.sans],
        body: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      // Responsive font sizes
      fontSize: {
        // Mobile-optimized sizes
        "3xs": ["0.5rem", { lineHeight: "0.75rem" }], // 8px
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }], // 10px
        xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
        base: ["1rem", { lineHeight: "1.5rem" }], // 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
        xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
        "5xl": ["3rem", { lineHeight: "1" }], // 48px
        "6xl": ["3.75rem", { lineHeight: "1" }], // 60px
        "7xl": ["4.5rem", { lineHeight: "1" }], // 72px
        "8xl": ["6rem", { lineHeight: "1" }], // 96px
        "9xl": ["8rem", { lineHeight: "1" }], // 128px
        // Fluid typography
        "fluid-xs": "clamp(0.75rem, 2vw, 0.875rem)",
        "fluid-sm": "clamp(0.875rem, 2.5vw, 1rem)",
        "fluid-base": "clamp(1rem, 3vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 3.5vw, 1.25rem)",
        "fluid-xl": "clamp(1.25rem, 4vw, 1.5rem)",
        "fluid-2xl": "clamp(1.5rem, 5vw, 2rem)",
        "fluid-3xl": "clamp(2rem, 6vw, 3rem)",
        "fluid-4xl": "clamp(2.5rem, 8vw, 4rem)",
      },
      // Background images for modern UI effects
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "grid-pattern": "url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
      // Background size utilities for gradient animations
      backgroundSize: {
        auto: "auto",
        cover: "cover",
        contain: "contain",
        "50%": "50%",
        "100%": "100%",
        "200%": "200%",
        "300%": "300%",
        "400%": "400%",
      },
      // Logical spacing utilities
      spacing: {
        // Standard spacing
        px: "1px",
        0: "0px",
        0.5: "0.125rem",
        1: "0.25rem",
        1.5: "0.375rem",
        2: "0.5rem",
        2.5: "0.625rem",
        3: "0.75rem",
        3.5: "0.875rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        14: "3.5rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        72: "18rem",
        80: "20rem",
        96: "24rem",
        // Viewport-based spacing
        "screen-1/4": "25vh",
        "screen-1/3": "33.333333vh",
        "screen-1/2": "50vh",
        "screen-2/3": "66.666667vh",
        "screen-3/4": "75vh",
        // Safe area spacing for mobile
        safe: "env(safe-area-inset-bottom)",
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
      // Enhanced animations for mobile interactions
      animation: {
        // Basic animations
        none: "none",
        spin: "spin 1s linear infinite",
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite",
        // Mobile-optimized animations
        "fade-in": "fadeIn 0.2s ease-out",
        "fade-out": "fadeOut 0.2s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "slide-left": "slideLeft 0.3s ease-out",
        "slide-right": "slideRight 0.3s ease-out",
        "scale-up": "scaleUp 0.2s ease-out",
        "scale-down": "scaleDown 0.2s ease-out",
        // RTL-aware animations
        "slide-in-start": "slideInStart 0.3s ease-out",
        "slide-in-end": "slideInEnd 0.3s ease-out",
        "slide-out-start": "slideOutStart 0.3s ease-out",
        "slide-out-end": "slideOutEnd 0.3s ease-out",
        // Touch feedback animations
        press: "press 0.2s ease-out",
        lift: "lift 0.2s ease-out",
        // Loading animations
        shimmer: "shimmer 2s ease-out infinite",
        skeleton: "skeleton 1.5s ease-in-out infinite",
        // Button ripple effect
        ripple: "ripple 0.6s ease-out",
        // Subtle animations for TimePicker
        "pulse-subtle": "pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        // Modern glassmorphism animations
        "pulse-slow": "pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
        "scale-in": "scale-in 0.3s ease-out",
        // Additional animations for router cards
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
        "gradient": "gradient 3s ease infinite",
      },
      keyframes: {
        // Subtle pulse for separators
        pulseSubtle: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        // Slow pulse for background elements
        pulseSlow: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.05)" },
        },
        // Floating animation for background elements
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        // Glow animation for interactive elements
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(79, 70, 229, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(79, 70, 229, 0.5)" },
        },
        // Shimmer effect for loading states
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        // Gradient animation for backgrounds
        "gradient-xy": {
          "0%, 100%": {
            backgroundSize: "400% 400%",
            backgroundPosition: "left center",
          },
          "50%": {
            backgroundSize: "200% 200%",
            backgroundPosition: "right center",
          },
        },
        // Scale in animation for elements
        "scale-in": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        // Fade in up animation for router cards
        fadeInUp: {
          "0%": { 
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": { 
            opacity: "1",
            transform: "translateY(0)"
          },
        },
        // Gradient animation for text
        gradient: {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
        // Standard animations
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideLeft: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        // RTL-aware animations using logical properties
        slideInStart: {
          "0%": {
            transform: "translateX(var(--tw-translate-x-start, -100%))",
            opacity: "0",
          },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInEnd: {
          "0%": {
            transform: "translateX(var(--tw-translate-x-end, 100%))",
            opacity: "0",
          },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOutStart: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": {
            transform: "translateX(var(--tw-translate-x-start, -100%))",
            opacity: "0",
          },
        },
        slideOutEnd: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": {
            transform: "translateX(var(--tw-translate-x-end, 100%))",
            opacity: "0",
          },
        },
        // Scale animations
        scaleUp: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        scaleDown: {
          "0%": { transform: "scale(1.05)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        // Touch feedback
        press: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        lift: {
          "0%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
          },
          "50%": {
            transform: "scale(1.02)",
            boxShadow: "0 5px 10px -3px rgba(0, 0, 0, 0.1)",
          },
          "100%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
          },
        },
        // Loading animations
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        skeleton: {
          "0%": { backgroundColor: "hsl(200, 20%, 80%)" },
          "100%": { backgroundColor: "hsl(200, 20%, 95%)" },
        },
        // Button ripple effect
        ripple: {
          "0%": {
            transform: "scale(0)",
            opacity: "0.5",
          },
          "100%": {
            transform: "scale(4)",
            opacity: "0",
          },
        },
      },
      // Mobile-optimized transitions
      transitionDuration: {
        0: "0ms",
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        250: "250ms",
        300: "300ms",
        350: "350ms",
        400: "400ms",
        450: "450ms",
        500: "500ms",
        600: "600ms",
        700: "700ms",
        800: "800ms",
        900: "900ms",
        1000: "1000ms",
        1200: "1200ms",
        1500: "1500ms",
        2000: "2000ms",
      },
      // Mobile-friendly shadows
      boxShadow: {
        // Light theme shadows
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "none",
        // Dark theme shadows
        "dark-sm": "0 1px 2px 0 rgb(0 0 0 / 0.5)",
        "dark-DEFAULT":
          "0 1px 3px 0 rgb(0 0 0 / 0.6), 0 1px 2px -1px rgb(0 0 0 / 0.6)",
        "dark-md":
          "0 4px 6px -1px rgb(0 0 0 / 0.6), 0 2px 4px -2px rgb(0 0 0 / 0.6)",
        "dark-lg":
          "0 10px 15px -3px rgb(0 0 0 / 0.6), 0 4px 6px -4px rgb(0 0 0 / 0.6)",
        "dark-xl":
          "0 20px 25px -5px rgb(0 0 0 / 0.6), 0 8px 10px -6px rgb(0 0 0 / 0.6)",
        // Colored shadows
        primary: "0 4px 14px 0 rgba(239, 199, 41, 0.39)",
        secondary: "0 4px 14px 0 rgba(73, 114, 186, 0.39)",
        success: "0 4px 14px 0 rgba(34, 197, 94, 0.39)",
        error: "0 4px 14px 0 rgba(239, 68, 68, 0.39)",
        warning: "0 4px 14px 0 rgba(245, 158, 11, 0.39)",
        info: "0 4px 14px 0 rgba(14, 165, 233, 0.39)",
        // Mobile-specific shadows
        "mobile-nav": "0 -2px 10px 0 rgb(0 0 0 / 0.1)",
        "mobile-card": "0 2px 4px 0 rgb(0 0 0 / 0.05)",
      },
      // Border radius with logical properties
      borderRadius: {
        none: "0px",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
        // Logical border radius (for RTL support)
        "s-sm": "0.125rem 0 0 0.125rem",
        "s-md": "0.375rem 0 0 0.375rem",
        "s-lg": "0.5rem 0 0 0.5rem",
        "e-sm": "0 0.125rem 0.125rem 0",
        "e-md": "0 0.375rem 0.375rem 0",
        "e-lg": "0 0.5rem 0.5rem 0",
        "t-sm": "0.125rem 0.125rem 0 0",
        "t-md": "0.375rem 0.375rem 0 0",
        "t-lg": "0.5rem 0.5rem 0 0",
        "b-sm": "0 0 0.125rem 0.125rem",
        "b-md": "0 0 0.375rem 0.375rem",
        "b-lg": "0 0 0.5rem 0.5rem",
      },
      // Z-index system for layered mobile UI
      zIndex: {
        auto: "auto",
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
        // Semantic z-index
        base: "1",
        dropdown: "1000",
        sticky: "1020",
        fixed: "1030",
        "modal-backdrop": "1040",
        modal: "1050",
        popover: "1060",
        tooltip: "1070",
        toast: "1080",
        "mobile-nav": "1090",
      },
      // Container configuration
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          md: "2rem",
          lg: "2rem",
          xl: "3rem",
          "2xl": "4rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
      // Viewport-based sizing
      minHeight: (theme) => ({
        ...theme("spacing"),
        0: "0px",
        full: "100%",
        screen: "100vh",
        svh: "100svh",
        lvh: "100lvh",
        dvh: "100dvh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
      }),
      maxHeight: (theme) => ({
        ...theme("spacing"),
        0: "0px",
        full: "100%",
        screen: "100vh",
        svh: "100svh",
        lvh: "100lvh",
        dvh: "100dvh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
      }),
      height: (theme) => ({
        auto: "auto",
        ...theme("spacing"),
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        full: "100%",
        screen: "100vh",
        svh: "100svh",
        lvh: "100lvh",
        dvh: "100dvh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
      }),
      // Logical properties support
      inset: (theme) => ({
        auto: "auto",
        ...theme("spacing"),
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        full: "100%",
      }),
      // Typography plugin customization for RTL
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.gray.700"),
            "--tw-prose-headings": theme("colors.gray.900"),
            "--tw-prose-lead": theme("colors.gray.600"),
            "--tw-prose-links": theme("colors.primary.600"),
            "--tw-prose-bold": theme("colors.gray.900"),
            "--tw-prose-counters": theme("colors.gray.500"),
            "--tw-prose-bullets": theme("colors.gray.300"),
            "--tw-prose-hr": theme("colors.gray.200"),
            "--tw-prose-quotes": theme("colors.gray.900"),
            "--tw-prose-quote-borders": theme("colors.gray.200"),
            "--tw-prose-captions": theme("colors.gray.500"),
            "--tw-prose-code": theme("colors.gray.900"),
            "--tw-prose-pre-code": theme("colors.gray.200"),
            "--tw-prose-pre-bg": theme("colors.gray.800"),
            "--tw-prose-th-borders": theme("colors.gray.300"),
            "--tw-prose-td-borders": theme("colors.gray.200"),
            // Dark mode
            "--tw-prose-invert-body": theme("colors.gray.300"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.gray.400"),
            "--tw-prose-invert-links": theme("colors.primary.400"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.gray.400"),
            "--tw-prose-invert-bullets": theme("colors.gray.600"),
            "--tw-prose-invert-hr": theme("colors.gray.700"),
            "--tw-prose-invert-quotes": theme("colors.gray.100"),
            "--tw-prose-invert-quote-borders": theme("colors.gray.700"),
            "--tw-prose-invert-captions": theme("colors.gray.400"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.gray.300"),
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme("colors.gray.600"),
            "--tw-prose-invert-td-borders": theme("colors.gray.700"),
            // RTL support
            direction: "ltr",
            '[dir="rtl"] &': {
              direction: "rtl",
            },
            // Mobile optimizations
            fontSize: theme("fontSize.base[0]"),
            lineHeight: theme("fontSize.base[1].lineHeight"),
          },
        },
        // RTL variant
        rtl: {
          css: {
            direction: "rtl",
            textAlign: "right",
            "ol > li::before": {
              left: "auto",
              right: "0",
            },
            "ul > li::before": {
              left: "auto",
              right: theme("spacing.1"),
            },
            blockquote: {
              borderLeftWidth: "0",
              borderRightWidth: theme("borderWidth.4"),
              paddingLeft: "0",
              paddingRight: theme("spacing.6"),
            },
          },
        },
      }),
      // Accessibility utilities
      aria: {
        checked: 'checked="true"',
        disabled: 'disabled="true"',
        expanded: 'expanded="true"',
        hidden: 'hidden="true"',
        pressed: 'pressed="true"',
        readonly: 'readonly="true"',
        required: 'required="true"',
        selected: 'selected="true"',
      },
      // Custom utilities for mobile
      aspectRatio: {
        auto: "auto",
        square: "1 / 1",
        video: "16 / 9",
        "4/3": "4 / 3",
        "21/9": "21 / 9",
        // Mobile-specific ratios
        "mobile-portrait": "9 / 16",
        "mobile-landscape": "16 / 9",
        story: "9 / 16",
        reel: "9 / 16",
      },
      // Touch-friendly cursor styles
      cursor: {
        auto: "auto",
        default: "default",
        pointer: "pointer",
        wait: "wait",
        text: "text",
        move: "move",
        help: "help",
        "not-allowed": "not-allowed",
        none: "none",
        "context-menu": "context-menu",
        progress: "progress",
        cell: "cell",
        crosshair: "crosshair",
        "vertical-text": "vertical-text",
        alias: "alias",
        copy: "copy",
        "no-drop": "no-drop",
        grab: "grab",
        grabbing: "grabbing",
        // Touch-specific
        touch: "pointer",
      },
      // Backdrop filters for mobile overlays
      backdropBlur: {
        none: "0",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px",
      },
      // Logical margin utilities
      margin: {
        "ms-auto": "auto",
        "me-auto": "auto",
      },
    },
  },
  safelist: [
    // RTL/LTR utilities
    {
      pattern: /(ps|pe|ms|me|start|end)-(0|1|2|3|4|5|6|8|10|12|16|20|24)/,
      variants: ["sm", "md", "lg", "xl", "rtl", "ltr"],
    },
    // Dark mode utilities
    {
      pattern:
        /(bg|text|border)-(primary|secondary|surface|gray)-(50|100|200|300|400|500|600|700|800|900|950)/,
      variants: ["dark", "dark:hover", "dark:focus", "dark:active"],
    },
    // Responsive utilities
    {
      pattern: /(block|hidden|flex|grid)/,
      variants: ["sm", "md", "lg", "xl", "2xl", "mobile", "tablet", "desktop"],
    },
    // Animation utilities
    {
      pattern: /animate-(fade|slide|scale)/,
      variants: [
        "hover",
        "focus",
        "group-hover",
        "motion-safe",
        "motion-reduce",
      ],
    },
    // Touch utilities
    {
      pattern: /(touch-none|touch-pan-x|touch-pan-y|touch-manipulation)/,
    },
    // Print utilities
    "print:hidden",
    "print:block",
    "print:inline-block",
    "print:flex",
  ],
  plugins: [
    typography,
    scrollbar,
    forms({
      strategy: "class",
    }),
    aspectRatio,
    containerQueries,
    rtl,
    // Custom plugin for animation delays
    function ({ addUtilities }) {
      const animationDelays = {
        '.animation-delay-200': { 'animation-delay': '200ms' },
        '.animation-delay-500': { 'animation-delay': '500ms' },
        '.animation-delay-1000': { 'animation-delay': '1000ms' },
        '.animation-delay-2000': { 'animation-delay': '2000ms' },
        '.animation-delay-3000': { 'animation-delay': '3000ms' },
        '.animation-delay-4000': { 'animation-delay': '4000ms' },
      };
      addUtilities(animationDelays);
    },
    // Custom plugin for logical properties
    function ({ addUtilities, theme }) {
      const logicalUtilities = {
        // Padding logical properties
        ".ps-0": { paddingInlineStart: theme("spacing.0") },
        ".pe-0": { paddingInlineEnd: theme("spacing.0") },
        ".pbs-0": { paddingBlockStart: theme("spacing.0") },
        ".pbe-0": { paddingBlockEnd: theme("spacing.0") },
        // Margin logical properties
        ".ms-0": { marginInlineStart: theme("spacing.0") },
        ".me-0": { marginInlineEnd: theme("spacing.0") },
        ".mbs-0": { marginBlockStart: theme("spacing.0") },
        ".mbe-0": { marginBlockEnd: theme("spacing.0") },
        // Border logical properties
        ".border-s": { borderInlineStartWidth: "1px" },
        ".border-e": { borderInlineEndWidth: "1px" },
        ".border-bs": { borderBlockStartWidth: "1px" },
        ".border-be": { borderBlockEndWidth: "1px" },
        // Position logical properties
        ".start-0": { insetInlineStart: theme("spacing.0") },
        ".end-0": { insetInlineEnd: theme("spacing.0") },
        ".block-start-0": { insetBlockStart: theme("spacing.0") },
        ".block-end-0": { insetBlockEnd: theme("spacing.0") },
        // Text alignment logical properties
        ".text-start": { textAlign: "start" },
        ".text-end": { textAlign: "end" },
        // Float logical properties
        ".float-start": { float: "inline-start" },
        ".float-end": { float: "inline-end" },
        ".clear-start": { clear: "inline-start" },
        ".clear-end": { clear: "inline-end" },
      };
      addUtilities(logicalUtilities);
    },
    // Custom plugin for theme variants
    function ({ addVariant }) {
      // High contrast mode
      addVariant("high-contrast", "@media (prefers-contrast: high)");
      addVariant("low-contrast", "@media (prefers-contrast: low)");
      // Reduced motion
      addVariant(
        "motion-safe",
        "@media (prefers-reduced-motion: no-preference)",
      );
      addVariant("motion-reduce", "@media (prefers-reduced-motion: reduce)");
      // Color scheme preference (keeping these for backward compatibility)
      addVariant("light", '[data-theme="light"] &');
      addVariant("theme-dark", '[data-theme="dark"] &');
      addVariant("dim", '[data-theme="dim"] &');
      // Device capabilities
      addVariant("touch", "@media (hover: none) and (pointer: coarse)");
      addVariant("stylus", "@media (hover: none) and (pointer: fine)");
      addVariant("pointer", "@media (hover: hover) and (pointer: fine)");
      addVariant("mouse", "@media (hover: hover) and (pointer: fine)");
      // Orientation
      addVariant("portrait", "@media (orientation: portrait)");
      addVariant("landscape", "@media (orientation: landscape)");
    },
  ],
  // Performance optimizations
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
  },
  experimental: {
    // optimizeUniversalDefaults: true,
  },
  corePlugins: {
    // Disable aspect-ratio as we're using the plugin
    aspectRatio: false,
  },
};
