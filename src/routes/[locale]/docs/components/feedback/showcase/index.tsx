import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { FeedbackShowcase } from "~/components/Core/Feedback/showcase";

export default component$(() => {
  return <FeedbackShowcase />;
});

export const head: DocumentHead = {
  title: "Feedback Components Showcase - Enhanced Mobile-First Design",
  meta: [
    {
      name: "description",
      content:
        "Interactive showcase of enhanced feedback components with mobile optimizations, touch gestures, responsive design, and comprehensive accessibility features.",
    },
    {
      name: "keywords",
      content:
        "feedback components, mobile UI, touch gestures, responsive design, accessibility, alert, toast, dialog, drawer, popover, error message, promo banner, Qwik UI, Connect design system",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, user-scalable=no",
    },
  ],
  links: [
    {
      rel: "preload",
      href: "/fonts/inter-var.woff2",
      as: "font",
      type: "font/woff2",
    },
  ],
  styles: [
    {
      style: `
        /* Custom showcase styles */
        .showcase-gradient {
          background: linear-gradient(135deg, var(--showcase-primary), var(--showcase-accent));
        }
        
        .touch-target-example button {
          min-height: 44px;
          min-width: 44px;
        }
        
        @media (hover: none) and (pointer: coarse) {
          .touch-target-example button {
            min-height: 48px;
            min-width: 48px;
          }
        }
        
        /* Performance optimizations */
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .showcase-card {
            border-width: 2px;
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01s !important;
            transition-duration: 0.01s !important;
          }
        }
      `,
    },
  ],
};