import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const examples = [
    {
      title: "Basic Skeleton",
      description: "Simple skeleton loader with default pulse animation",
      path: "../Examples/BasicSkeleton.tsx",
    },
    {
      title: "Skeleton Variants",
      description: "Different skeleton shapes and types for various content",
      path: "../Examples/SkeletonVariants.tsx",
    },
    {
      title: "Skeleton Animations",
      description: "Various animation styles: pulse, wave, and shimmer",
      path: "../Examples/SkeletonAnimations.tsx",
    },
    {
      title: "Skeleton Sizes",
      description: "Different sizes for text, avatars, and custom elements",
      path: "../Examples/SkeletonSizes.tsx",
    },
    {
      title: "Mobile Responsive",
      description: "Skeleton that adapts to mobile, tablet, and desktop",
      path: "../Examples/SkeletonMobile.tsx",
    },
    {
      title: "Theme Support",
      description: "Skeleton with light and dark mode variations",
      path: "../Examples/SkeletonThemes.tsx",
    },
    {
      title: "Responsive Layout",
      description: "Complex skeleton layouts that adapt to screen size",
      path: "../Examples/SkeletonResponsive.tsx",
    },
    {
      title: "Interactive Loading",
      description: "Skeleton with loading states and transitions",
      path: "../Examples/SkeletonInteractive.tsx",
    },
    {
      title: "With Data Loading",
      description: "Real-world example showing skeleton during data fetch",
      path: "../Examples/SkeletonWithData.tsx",
    },
  ];

  return (
    <ExamplesTemplate
      examples={examples}
    />
  );
});