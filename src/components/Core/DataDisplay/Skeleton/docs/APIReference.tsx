import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates/APIReferenceTemplate";

export default component$(() => {
  return (
    <APIReferenceTemplate
      props={[
        // Skeleton props
        {
          name: "variant",
          type: "'text' | 'circular' | 'rectangular' | 'rounded'",
          defaultValue: "'text'",
          description:
            "The shape variant of the skeleton. Text creates line shapes, circular creates circles, rectangular creates rectangles.",
        },
        {
          name: "animation",
          type: "'pulse' | 'wave' | 'shimmer' | 'none'",
          defaultValue: "'pulse'",
          description:
            "The animation style for the skeleton loading effect.",
        },
        {
          name: "width",
          type: "string | number",
          defaultValue: "'100%'",
          description:
            "Width of the skeleton. Can be a number (in pixels) or any valid CSS width value.",
        },
        {
          name: "height",
          type: "string | number",
          defaultValue: "varies by variant",
          description:
            "Height of the skeleton. Defaults based on variant (e.g., 1em for text).",
        },
        {
          name: "lines",
          type: "number",
          defaultValue: "1",
          description:
            "Number of lines to render when variant is 'text'.",
        },
        {
          name: "spacing",
          type: "'sm' | 'md' | 'lg'",
          defaultValue: "'md'",
          description:
            "Spacing between skeleton lines when multiple lines are rendered.",
        },
        {
          name: "rounded",
          type: "boolean | string",
          defaultValue: "false",
          description:
            "Border radius. True uses default radius, or provide a custom value.",
        },
        {
          name: "class",
          type: "string",
          defaultValue: "''",
          description:
            "Additional CSS classes to apply to the skeleton element.",
        },
        {
          name: "style",
          type: "CSSProperties",
          defaultValue: "{}",
          description:
            "Inline styles to apply to the skeleton element.",
        },
        // SkeletonText props
        {
          name: "fontSize (SkeletonText)",
          type: "'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'",
          defaultValue: "'base'",
          description:
            "Font size reference for text skeleton height calculation.",
        },
        {
          name: "lastLineWidth (SkeletonText)",
          type: "string",
          defaultValue: "'80%'",
          description:
            "Width of the last line in multi-line text skeletons.",
        },
        // SkeletonAvatar props
        {
          name: "size (SkeletonAvatar)",
          type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
          defaultValue: "'md'",
          description:
            "Size of the avatar skeleton. Can use preset sizes or custom number.",
        },
        {
          name: "shape (SkeletonAvatar)",
          type: "'circle' | 'square'",
          defaultValue: "'circle'",
          description:
            "Shape of the avatar skeleton.",
        },
        // SkeletonCard props
        {
          name: "showMedia (SkeletonCard)",
          type: "boolean",
          defaultValue: "true",
          description:
            "Whether to show media placeholder in card skeleton.",
        },
        {
          name: "mediaHeight (SkeletonCard)",
          type: "string | number",
          defaultValue: "200",
          description:
            "Height of the media area in card skeleton.",
        },
        {
          name: "showActions (SkeletonCard)",
          type: "boolean",
          defaultValue: "false",
          description:
            "Whether to show action buttons placeholder in card skeleton.",
        },
      ]}
      cssVariables={[
        {
          name: "--skeleton-base-color",
          defaultValue: "theme(colors.gray.200) dark:theme(colors.gray.700)",
          description: "Base background color for the skeleton.",
        },
        {
          name: "--skeleton-highlight-color",
          defaultValue: "theme(colors.gray.300) dark:theme(colors.gray.600)",
          description: "Highlight color for animations.",
        },
        {
          name: "--skeleton-animation-duration",
          defaultValue: "1.5s",
          description: "Duration of the skeleton animation.",
        },
        {
          name: "--skeleton-border-radius",
          defaultValue: "4px",
          description: "Default border radius for skeleton elements.",
        },
      ]}
    >
      <p>
        The Skeleton component family provides loading placeholders that match
        your content structure. Use the base Skeleton component for custom
        shapes, or specialized components like SkeletonText, SkeletonAvatar,
        and SkeletonCard for common UI patterns.
      </p>
      
      <p class="mt-2">
        All skeleton components are optimized for mobile devices and include
        dark mode support. They automatically adapt their colors and animations
        based on the current theme and provide smooth transitions when replaced
        with actual content.
      </p>
    </APIReferenceTemplate>
  );
});