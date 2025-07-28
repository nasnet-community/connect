import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const aspectRatioProps = [
    {
      name: "children",
      type: "JSXChildren",
      required: true,
      description: "Content to be displayed within the aspect ratio container.",
    },
    {
      name: "ratio",
      type: "'square' | 'video' | 'ultrawide' | 'portrait' | 'landscape' | 'photo' | 'golden'",
      defaultValue: "video",
      description: "Predefined aspect ratio preset to use.",
    },
    {
      name: "customRatio",
      type: "number",
      description:
        "Custom aspect ratio as a number (width / height). Overrides the ratio prop when provided.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the outer container.",
    },
    {
      name: "id",
      type: "string",
      description: "HTML id attribute for the container element.",
    },
    {
      name: "bgColor",
      type: "string",
      description:
        "Background color for the content area when content doesn't fill the entire space.",
    },
    {
      name: "overflow",
      type: "'cover' | 'contain' | 'fill' | 'scale-down'",
      defaultValue: "cover",
      description:
        "How to handle content that doesn't match the aspect ratio exactly.",
    },
    {
      name: "centered",
      type: "boolean",
      defaultValue: "true",
      description:
        "Whether to center the content within the aspect ratio container.",
    },
    {
      name: "style",
      type: "Record<string, string>",
      defaultValue: "{}",
      description: "Additional inline styles to apply to the container.",
    },
    {
      name: "maxWidth",
      type: "string",
      description:
        "Maximum width constraint for the container (e.g., '400px', '50vw').",
    },
    {
      name: "minWidth",
      type: "string",
      description:
        "Minimum width constraint for the container (e.g., '200px', '20rem').",
    },
  ];

  return (
    <APIReferenceTemplate props={aspectRatioProps}>
      <p>
        The AspectRatio component provides a flexible way to maintain consistent
        proportions for content across different screen sizes. It creates a
        responsive container that scales proportionally while keeping its aspect
        ratio intact.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Preset Ratios</h3>
      <p class="mb-2">
        The component includes seven preset aspect ratios for common use cases:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          <code>square</code> - 1:1 ratio (perfect square)
        </li>
        <li>
          <code>video</code> - 16:9 ratio (standard video/TV format)
        </li>
        <li>
          <code>ultrawide</code> - 21:9 ratio (cinematic widescreen)
        </li>
        <li>
          <code>portrait</code> - 9:16 ratio (vertical phone orientation)
        </li>
        <li>
          <code>landscape</code> - 4:3 ratio (traditional monitor format)
        </li>
        <li>
          <code>photo</code> - 3:2 ratio (classic photography format)
        </li>
        <li>
          <code>golden</code> - 1.618:1 ratio (golden ratio)
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Custom Ratios</h3>
      <p class="mb-2">
        For specific design requirements, you can use the{" "}
        <code>customRatio</code> prop with a numeric value representing width
        divided by height:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          <code>customRatio={2.5}</code> - Creates a 2.5:1 ratio (ultra-wide
          banner)
        </li>
        <li>
          <code>customRatio={0.75}</code> - Creates a 3:4 ratio (portrait
          orientation)
        </li>
        <li>
          <code>customRatio={1.33}</code> - Creates a 4:3 ratio (landscape)
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Overflow Modes</h3>
      <p class="mb-2">
        The <code>overflow</code> prop determines how content behaves when it
        doesn't perfectly match the aspect ratio:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          <code>cover</code> - Content fills entire area, may be cropped
          (similar to CSS object-fit: cover)
        </li>
        <li>
          <code>contain</code> - Content fits entirely within area, may leave
          empty space (similar to CSS object-fit: contain)
        </li>
        <li>
          <code>fill</code> - Content stretches to fill entire area, may be
          distorted (similar to CSS object-fit: fill)
        </li>
        <li>
          <code>scale-down</code> - Content scales down if needed, but never up
          (similar to CSS object-fit: scale-down)
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Sizing Constraints</h3>
      <p class="mb-2">
        Use <code>maxWidth</code> and <code>minWidth</code> to control the
        container size:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>Values can be any valid CSS width value (px, rem, %, vw, etc.)</li>
        <li>
          Constraints apply to the container width, height adjusts to maintain
          aspect ratio
        </li>
        <li>
          Useful for preventing extremely large or small elements on different
          screen sizes
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Implementation Details</h3>
      <p class="mb-2">
        The component uses the percentage-based padding technique for
        cross-browser compatibility:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          Creates a spacer element with padding-bottom calculated from the
          aspect ratio
        </li>
        <li>Positions content absolutely within the created space</li>
        <li>Works reliably across all browsers and devices</li>
        <li>No JavaScript required for the aspect ratio calculation</li>
      </ul>
    </APIReferenceTemplate>
  );
});
