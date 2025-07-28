import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const keyFeatures = [
    "Seven preset aspect ratios for common use cases (square, video, ultrawide, etc.)",
    "Custom aspect ratio support with precise numeric values",
    "Multiple overflow handling modes (cover, contain, fill, scale-down)",
    "Flexible content centering and positioning options",
    "Size constraints with minimum and maximum width settings",
    "Background color support for content that doesn't fill the container",
    "Responsive design with percentage-based padding technique",
    "Clean CSS implementation without JavaScript dependencies",
  ];

  const whenToUse = [
    "When displaying video content that needs consistent 16:9 ratio",
    "For image galleries with uniform aspect ratios",
    "In card layouts where content height should be proportional to width",
    "When embedding responsive videos or iframes",
    "For creating square profile picture containers",
    "In hero sections that need to maintain specific proportions",
    "When building responsive grid layouts with consistent item heights",
  ];

  const whenNotToUse = [
    "For content with naturally varying heights (like text articles)",
    "When you need fixed pixel dimensions rather than proportional sizing",
    "For simple square elements where CSS aspect-ratio is sufficient",
    "When content needs to expand beyond the aspect ratio constraint",
    "For layouts where height should be independent of width",
    "When using CSS Grid or Flexbox already provides the needed proportions",
  ];

  return (
    <OverviewTemplate
      title="AspectRatio Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The AspectRatio component maintains a specific width-to-height ratio for
        its content, ensuring consistent proportions across different screen
        sizes and container widths. It uses the percentage-based padding
        technique to create intrinsic aspect ratios that work reliably across
        all browsers and devices.
      </p>

      <p class="mt-2">
        With seven built-in presets covering common use cases like video (16:9),
        square (1:1), and photo (3:2) ratios, the component handles most design
        requirements out of the box. For specific needs, custom ratios can be
        defined using precise numeric values, giving designers complete control
        over proportions.
      </p>

      <p class="mt-2">
        The component is particularly useful for responsive designs where
        content needs to maintain consistent proportions regardless of screen
        size. It handles content overflow intelligently with different modes,
        ensures proper centering, and provides size constraints to prevent
        elements from becoming too large or small on extreme screen sizes.
      </p>
    </OverviewTemplate>
  );
});
