import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const keyFeatures = [
    "Lazy loading with intersection observer for performance optimization",
    "Multiple placeholder types: skeleton, blur, spinner, and custom",
    "Responsive image support with srcset and picture elements",
    "Built-in error handling with retry functionality and fallback images",
    "Object fit options for content sizing within containers",
    "Rounded corners with configurable border radius sizes",
    "Accessibility features with proper ARIA attributes",
    "Performance optimizations with priority loading and fetch hints",
  ];

  const whenToUse = [
    "When displaying user-generated content that needs loading states",
    "For hero images and banners that require responsive behavior",
    "In image galleries where lazy loading improves performance",
    "When you need fallback images for broken or missing content",
    "For profile pictures and avatars with rounded styling",
    "In content-heavy pages where progressive loading is important",
    "When implementing art direction with different image sources",
  ];

  const whenNotToUse = [
    "For simple decorative icons (use SVG icons instead)",
    "When you need vector graphics that scale infinitely",
    "For images that are critical above-the-fold (consider eager loading)",
    "When the image source is guaranteed to be available",
    "For background images where CSS background-image is more appropriate",
    "When you need complex image manipulations (use Canvas API)",
  ];

  return (
    <OverviewTemplate
      title="Image Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Image component is an enhanced replacement for the standard HTML img
        element, providing advanced features like lazy loading, placeholder
        states, error handling, and responsive image support. It's designed to
        improve both user experience and website performance by progressively
        loading images and providing visual feedback during the loading process.
      </p>

      <p class="mt-2">
        Built with modern web standards, the component supports responsive
        images through srcset and picture elements, enabling optimal image
        delivery across different devices and screen sizes. The lazy loading
        implementation uses intersection observer for efficient resource
        management, only loading images when they enter the viewport.
      </p>

      <p class="mt-2">
        Error handling is built-in with automatic retry functionality and
        fallback image support, ensuring a robust user experience even when
        network conditions are poor or image sources are unavailable. The
        component also includes comprehensive accessibility features and
        performance optimizations like priority loading for critical images.
      </p>
    </OverviewTemplate>
  );
});
