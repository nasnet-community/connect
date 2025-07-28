import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate } from "~/components/Docs/templates";

// Import examples
import { BasicImage } from "../Examples/BasicImage";
import { LazyLoadingImage } from "../Examples/LazyLoadingImage";
import { ResponsiveImage } from "../Examples/ResponsiveImage";

export default component$(() => {
  const examples = [
    {
      title: "Basic Image Usage",
      description:
        "Demonstrates basic image display with different object-fit options and rounded corners.",
      component: <BasicImage />,
    },
    {
      title: "Lazy Loading Features",
      description:
        "Shows different placeholder types, loading states, and error handling with retry functionality.",
      component: <LazyLoadingImage />,
    },
    {
      title: "Responsive Images",
      description:
        "Examples of responsive image implementation using srcset, sizes, and picture elements for optimal delivery across devices.",
      component: <ResponsiveImage />,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The following examples demonstrate various configurations and use cases
        for the Image component. Each example showcases different features like
        lazy loading, responsive behavior, error handling, and styling options
        to help you implement images that provide optimal user experience and
        performance.
      </p>

      <p class="mt-2">
        These examples cover real-world scenarios including content images, user
        avatars, hero banners, and gallery implementations with proper
        accessibility and performance considerations.
      </p>
    </ExamplesTemplate>
  );
});
