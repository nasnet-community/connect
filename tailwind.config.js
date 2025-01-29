/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
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
        },
        surface: {
          DEFAULT: "#FFFFFF",
          secondary: "#F8FAFC",
          tertiary: "#F1F5F9",
          dark: "#1E293B",
          "dark-secondary": "#0F172A",
        },
        background: {
          DEFAULT: "#F1F5F9",
          dark: "#0F172A",
        },
        border: {
          DEFAULT: "#E2E8F0",
          secondary: "#CBD5E1",
          dark: "#334155",
          "dark-secondary": "#1E293B",
        },
        text: {
          DEFAULT: "#0F172A",
          secondary: "#475569",
          muted: "#64748B",
          "dark-default": "#F8FAFC",
          "dark-secondary": "#CBD5E1",
          "dark-muted": "#94A3B8",
        },
        success: {
          DEFAULT: "#16A34A",
          light: "#22C55E",
          dark: "#15803D",
          surface: "#F0FDF4",
        },
        warning: {
          DEFAULT: "#EAB308",
          light: "#FACC15",
          dark: "#CA8A04",
          surface: "#FEFCE8",
        },
        error: {
          DEFAULT: "#DC2626",
          light: "#EF4444",
          dark: "#B91C1C",
          surface: "#FEF2F2",
        },
        info: {
          DEFAULT: "#0EA5E9",
          light: "#38BDF8",
          dark: "#0284C7",
          surface: "#F0F9FF",
        },
      },
      ringColor: {
        DEFAULT: "#E2E8F0",
        primary: "#EFC729",
        secondary: "#4972ba",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "inherit",
            a: {
              color: "#EFC729",
              "&:hover": {
                color: "#D1AC13",
              },
            },
          },
        },
      },
      scrollbar: {
        thin: "scrollbar-thin",
        thumb: "scrollbar-thumb",
        track: "scrollbar-track",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
  ],
  variants: {
    extend: {
      backgroundColor: ["dark", "dark-hover"],
      borderColor: ["dark", "dark-hover"],
      textColor: ["dark", "dark-hover"],
      scrollbar: ["dark", "rounded"],
    },
  },
};
