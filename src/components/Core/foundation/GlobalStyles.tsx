import { component$ } from "@builder.io/qwik";

/**
 * GlobalStyles component that applies custom global styles beyond Tailwind's preflight.
 * This component should be used in the root layout component to apply global styles.
 *
 * Note: Most styles should be applied using Tailwind's utility classes directly.
 * This component only adds styles that can't be easily achieved with Tailwind.
 */
export const GlobalStyles = component$(() => {
  return (
    <style
      dangerouslySetInnerHTML={`
        /* Base resets and styling beyond Tailwind preflight */
        
        /* Ensure consistent box sizing */
        *, *::before, *::after {
          box-sizing: border-box;
        }
        
        /* Interactive element focus states for keyboard navigation */
        /* Remove default focus styling */
        :focus {
          outline: none;
        }
        
        /* Apply enhanced focus styles only for keyboard navigation */
        :focus-visible {
          outline: 2px solid var(--tw-ring-color, #4972ba);
          outline-offset: 2px;
          box-shadow: 0 0 0 3px rgba(73, 114, 186, 0.25);
          position: relative;
          z-index: 1;
        }
        
        /* Specific focus styles for different interactive elements */
        a:focus-visible {
          text-decoration: underline;
        }
        
        button:focus-visible, 
        [role="button"]:focus-visible {
          outline: 2px solid var(--tw-ring-color, #4972ba);
          outline-offset: 2px;
        }
        
        input:focus-visible, 
        select:focus-visible, 
        textarea:focus-visible {
          border-color: var(--tw-ring-color, #4972ba);
          box-shadow: 0 0 0 3px rgba(73, 114, 186, 0.25);
        }
        
        /* Smooth scrolling with reduced-motion preference support */
        @media (prefers-reduced-motion: no-preference) {
          html {
            scroll-behavior: smooth;
          }
        }
        
        /* Custom scrollbar styling - Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: #CBD5E1 transparent;
        }
        
        /* Dark mode scrollbar - Firefox */
        .dark * {
          scrollbar-color: #475569 transparent;
        }
        
        /* Custom scrollbar styling - WebKit/Blink browsers (Chrome, Safari, Edge) */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background-color: #CBD5E1;
          border-radius: 4px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background-color: #94A3B8;
        }
        
        ::-webkit-scrollbar-corner {
          background: transparent;
        }
        
        /* Dark mode scrollbar - WebKit/Blink browsers */
        .dark ::-webkit-scrollbar-thumb {
          background-color: #475569;
        }
        
        .dark ::-webkit-scrollbar-thumb:hover {
          background-color: #64748B;
        }
        
        /* RTL scrollbar adjustments */
        html[dir="rtl"] ::-webkit-scrollbar-thumb {
          border-radius: 4px;
        }
        
        /* Theme transition animations with reduced-motion support */
        @media (prefers-reduced-motion: no-preference) {
          /* Base transitions for most elements */
          html.transition-theme * {
            transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 300ms;
          }
          
          /* Performance optimization - exclude certain properties from transition */
          html.transition-theme *:not(svg, svg *, path, g, circle, rect, line, polyline, polygon) {
            transition-property: background-color, border-color, color, box-shadow;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 300ms;
          }
          
          /* Specific transition durations for different properties */
          html.transition-theme {
            & .fast-transition {
              transition-duration: 150ms;
            }
            
            & .medium-transition {
              transition-duration: 300ms;
            }
            
            & .slow-transition {
              transition-duration: 500ms;
            }
            
            /* Individual property transitions */
            & .transition-bg {
              transition-property: background-color;
            }
            
            & .transition-colors {
              transition-property: background-color, border-color, color, fill, stroke;
            }
            
            & .transition-opacity {
              transition-property: opacity;
            }
            
            & .transition-shadow {
              transition-property: box-shadow;
            }
            
            & .transition-transform {
              transition-property: transform;
            }
          }
        }
        
        /* Reset margins on common elements for more consistent layouts */
        blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre {
          margin: 0;
        }
        
        /* Reset headings */
        h1, h2, h3, h4, h5, h6 {
          font-size: inherit;
          font-weight: inherit;
        }
        
        /* Reset lists */
        ol, ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        /* Reset buttons for better cross-browser consistency */
        button {
          background-color: transparent;
          background-image: none;
          padding: 0;
          cursor: pointer;
        }

        /* Fix for image display and alignment */
        img, svg, video, canvas, audio, iframe, embed, object {
          display: block;
          vertical-align: middle;
          max-width: 100%;
          height: auto;
        }
        
        /* Table styles for better defaults */
        table {
          border-collapse: collapse;
          border-spacing: 0;
          width: 100%;
          table-layout: fixed;
        }
        
        /* Autocomplete input styling */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px white inset;
          transition: background-color 5000s ease-in-out 0s;
        }
        
        .dark input:-webkit-autofill,
        .dark input:-webkit-autofill:hover,
        .dark input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px #1e293b inset;
          -webkit-text-fill-color: #f8fafc;
        }
        
        /* Fix for Chrome's autofill background */
        @supports (-webkit-appearance: none) {
          input:autofill {
            background-clip: content-box !important;
          }
        }
        
        /* Better font rendering */
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          line-height: 1.5;
        }
        
        /* Remove ugly tap highlight on mobile */
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Hide number input arrows */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type="number"] {
          -moz-appearance: textfield;
        }
        
        /* Default focus rings for form elements */
        input:focus, select:focus, textarea:focus, button:focus {
          outline: none;
          ring: 2px;
          ring-color: rgba(73, 114, 186, 0.5);
        }
        
        /* Form element consistency across browsers */
        input, button, textarea, select {
          font: inherit;
          color: inherit;
          letter-spacing: inherit;
        }
        
        /* Base heading typographic styles */
        h1, h2, h3, h4, h5, h6 {
          margin-top: 0;
          margin-bottom: 0.5em;
          font-weight: 600;
          line-height: 1.2;
          color: var(--tw-text-default, #0F172A);
        }
        
        h1 {
          font-size: 2.25rem; /* text-4xl */
          letter-spacing: -0.025em;
        }
        
        h2 {
          font-size: 1.875rem; /* text-3xl */
          letter-spacing: -0.025em;
        }
        
        h3 {
          font-size: 1.5rem; /* text-2xl */
        }
        
        h4 {
          font-size: 1.25rem; /* text-xl */
        }
        
        h5 {
          font-size: 1.125rem; /* text-lg */
        }
        
        h6 {
          font-size: 1rem; /* text-base */
        }
        
        /* Dark mode for headings */
        .dark h1, .dark h2, .dark h3, .dark h4, .dark h5, .dark h6 {
          color: var(--tw-text-dark-default, #F8FAFC);
        }
        
        /* Base paragraph and text typographic styles */
        p {
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1rem; /* text-base */
          line-height: 1.5;
          color: var(--tw-text-default, #0F172A);
        }
        
        /* Text variations */
        .text-xs {
          font-size: 0.75rem;
          line-height: 1rem;
        }
        
        .text-sm {
          font-size: 0.875rem;
          line-height: 1.25rem;
        }
        
        .text-base {
          font-size: 1rem;
          line-height: 1.5rem;
        }
        
        .text-lg {
          font-size: 1.125rem;
          line-height: 1.75rem;
        }
        
        /* Common text elements */
        small {
          font-size: 0.875rem;
          line-height: 1.25rem;
        }
        
        strong, b {
          font-weight: 600;
        }
        
        code, kbd, samp, pre {
          font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 0.875em;
        }
        
        /* Dark mode for text */
        .dark p, .dark span, .dark div {
          color: var(--tw-text-dark-default, #F8FAFC);
        }
        
        /* Additional text helpers */
        .truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .line-clamp-1, .line-clamp-2, .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
        
        .line-clamp-1 {
          -webkit-line-clamp: 1;
        }
        
        .line-clamp-2 {
          -webkit-line-clamp: 2;
        }
        
        .line-clamp-3 {
          -webkit-line-clamp: 3;
        }
        
        /* RTL Support for Arabic and Persian */
        html[dir="rtl"] body,
        [dir="rtl"] {
          text-align: right;
        }
        
        /* RTL specific adjustments */
        html[dir="rtl"] .space-x-1 > :not([hidden]) ~ :not([hidden]),
        html[dir="rtl"] .space-x-2 > :not([hidden]) ~ :not([hidden]),
        html[dir="rtl"] .space-x-3 > :not([hidden]) ~ :not([hidden]),
        html[dir="rtl"] .space-x-4 > :not([hidden]) ~ :not([hidden]),
        html[dir="rtl"] .space-x-5 > :not([hidden]) ~ :not([hidden]),
        html[dir="rtl"] .space-x-6 > :not([hidden]) ~ :not([hidden]),
        html[dir="rtl"] .space-x-8 > :not([hidden]) ~ :not([hidden]),
        html[dir="rtl"] .space-x-10 > :not([hidden]) ~ :not([hidden]),
        html[dir="rtl"] .space-x-12 > :not([hidden]) ~ :not([hidden]) {
          --tw-space-x-reverse: 1;
        }
        
        /* Additional RTL adjustments */
        html[dir="rtl"] .ml-auto,
        [dir="rtl"] .ml-auto {
          margin-left: 0;
          margin-right: auto;
        }
        
        html[dir="rtl"] .mr-auto,
        [dir="rtl"] .mr-auto {
          margin-right: 0;
          margin-left: auto;
        }
        
        /* RTL for flexbox */
        html[dir="rtl"] .justify-start,
        [dir="rtl"] .justify-start {
          justify-content: flex-end;
        }
        
        html[dir="rtl"] .justify-end,
        [dir="rtl"] .justify-end {
          justify-content: flex-start;
        }
        
        /* RTL for transformations */
        html[dir="rtl"] .rotate-90,
        [dir="rtl"] .rotate-90 {
          --tw-rotate: -90deg;
        }
        
        html[dir="rtl"] .rotate-180,
        [dir="rtl"] .rotate-180 {
          --tw-rotate: 180deg;
        }
        
        html[dir="rtl"] .rotate-270,
        [dir="rtl"] .rotate-270 {
          --tw-rotate: -270deg;
        }
        
        /* RTL for form elements */
        html[dir="rtl"] input[type="tel"],
        html[dir="rtl"] input[type="url"],
        html[dir="rtl"] input[type="email"],
        html[dir="rtl"] input[type="number"],
        [dir="rtl"] input[type="tel"],
        [dir="rtl"] input[type="url"],
        [dir="rtl"] input[type="email"],
        [dir="rtl"] input[type="number"] {
          direction: ltr;
          text-align: right;
        }
        
        /* Ensure hidden attribute works properly */
        [hidden] {
          display: none !important;
        }
      `}
    />
  );
});

export default GlobalStyles;
