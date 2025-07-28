import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const keyFeatures = [
    "Multiple skeleton types: text, avatar, card, and custom shapes",
    "Built-in loading animations (pulse, wave, shimmer)",
    "Dark mode optimized with proper contrast",
    "Mobile-responsive with appropriate sizing",
    "Customizable dimensions and border radius",
    "Accessibility support with proper ARIA attributes",
    "Smooth transitions when content loads",
  ];

  const whenToUse = [
    "While fetching data from APIs to prevent layout shift",
    "During initial page load to show content structure",
    "When lazy loading images or heavy content",
    "In place of components that take time to render",
    "To improve perceived performance of your application",
    "When content is loading incrementally or in chunks",
  ];

  const whenNotToUse = [
    "For content that loads instantly (< 100ms)",
    "When you have a specific loading indicator already",
    "For error states (use error components instead)",
    "If the loading state is very brief and might cause flashing",
    "When the content structure is unknown or highly variable",
  ];

  return (
    <OverviewTemplate
      title="Skeleton Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Skeleton component provides placeholder animations while content is
        loading, improving perceived performance and preventing layout shift.
        It helps maintain a smooth user experience by showing the approximate
        structure of content before it's fully loaded.
      </p>

      <p class="mt-2">
        Skeleton components come in various pre-built shapes like text lines,
        avatars, and cards, but can also be customized to match any content
        structure. The component uses subtle animations to indicate loading
        state while being optimized for performance across all devices.
      </p>

      <p class="mt-2">
        With built-in dark mode support and mobile optimization, skeleton
        loaders automatically adapt to different themes and screen sizes. They
        provide a seamless transition from loading to loaded state, enhancing
        the overall user experience.
      </p>
    </OverviewTemplate>
  );
});