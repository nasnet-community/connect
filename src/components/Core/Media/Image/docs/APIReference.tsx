import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const imageProps = [
    {
      name: "src",
      type: "string",
      required: true,
      description: "Source URL of the image to display.",
    },
    {
      name: "alt",
      type: "string",
      required: true,
      description: "Alternative text for accessibility and SEO.",
    },
    {
      name: "width",
      type: "number | string",
      description: "Intrinsic width of the image in pixels.",
    },
    {
      name: "height",
      type: "number | string",
      description: "Intrinsic height of the image in pixels.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the container.",
    },
    {
      name: "id",
      type: "string",
      description: "HTML id attribute for the container element.",
    },
    {
      name: "srcset",
      type: "string",
      description: "Responsive image sources with different resolutions.",
    },
    {
      name: "sizes",
      type: "string",
      description: "Media conditions for responsive image selection.",
    },
    {
      name: "sources",
      type: "ImageSource[]",
      description:
        "Array of source objects for picture element with art direction.",
    },
    {
      name: "loading",
      type: "'lazy' | 'eager'",
      defaultValue: "lazy",
      description:
        "Loading behavior - lazy loads when entering viewport, eager loads immediately.",
    },
    {
      name: "decoding",
      type: "'async' | 'sync' | 'auto'",
      defaultValue: "async",
      description: "Image decoding hint for browser optimization.",
    },
    {
      name: "priority",
      type: "boolean",
      defaultValue: "false",
      description:
        "When true, forces eager loading and high fetch priority for critical images.",
    },
    {
      name: "placeholder",
      type: "'skeleton' | 'blur' | 'spinner' | 'custom'",
      defaultValue: "skeleton",
      description: "Type of placeholder to show while image loads.",
    },
    {
      name: "placeholderSrc",
      type: "string",
      description: "Low-quality image source for blur placeholder type.",
    },
    {
      name: "placeholderContent",
      type: "JSXChildren",
      description:
        "Custom content to display as placeholder when placeholder='custom'.",
    },
    {
      name: "showSpinner",
      type: "boolean",
      defaultValue: "true",
      description:
        "Whether to show loading spinner for spinner placeholder type.",
    },
    {
      name: "spinnerSize",
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "md",
      description: "Size of the loading spinner.",
    },
    {
      name: "objectFit",
      type: "'cover' | 'contain' | 'fill' | 'none' | 'scale-down'",
      defaultValue: "cover",
      description: "How the image should fit within its container.",
    },
    {
      name: "objectPosition",
      type: "string",
      defaultValue: "center",
      description:
        "Position of the image within its container when using object-fit.",
    },
    {
      name: "rounded",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to apply rounded corners to the image.",
    },
    {
      name: "roundedSize",
      type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
      defaultValue: "md",
      description: "Size of the border radius when rounded is true.",
    },
    {
      name: "fallbackSrc",
      type: "string",
      description:
        "Alternative image source to use if the primary source fails to load.",
    },
    {
      name: "fallbackAlt",
      type: "string",
      description: "Alternative text to use when fallback image is displayed.",
    },
    {
      name: "retryOnError",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to show retry button when image fails to load.",
    },
    {
      name: "maxRetries",
      type: "number",
      defaultValue: "3",
      description: "Maximum number of automatic retry attempts.",
    },
    {
      name: "onLoad$",
      type: "QRL<(event: Event) => void>",
      description: "Callback function called when image successfully loads.",
    },
    {
      name: "onError$",
      type: "QRL<(event: Event) => void>",
      description: "Callback function called when image fails to load.",
    },
    {
      name: "onClick$",
      type: "QRL<(event: MouseEvent) => void>",
      description: "Callback function called when image is clicked.",
    },
    {
      name: "role",
      type: "string",
      description: "ARIA role attribute for accessibility.",
    },
    {
      name: "ariaLabel",
      type: "string",
      description: "ARIA label for additional accessibility context.",
    },
    {
      name: "ariaDescribedby",
      type: "string",
      description: "References to elements that describe the image.",
    },
    {
      name: "fetchPriority",
      type: "'high' | 'low' | 'auto'",
      description: "Hint for relative priority of this image fetch.",
    },
    {
      name: "referrerPolicy",
      type: "ReferrerPolicy",
      description: "Referrer policy for the image request.",
    },
    {
      name: "crossOrigin",
      type: "'anonymous' | 'use-credentials'",
      description: "CORS settings for cross-origin image requests.",
    },
  ];

  return (
    <APIReferenceTemplate props={imageProps}>
      <p>
        The Image component provides a comprehensive set of props for handling
        various image loading scenarios, performance optimizations, and
        accessibility requirements. It extends the standard HTML img element
        with enhanced functionality for modern web applications.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-semibold">ImageSource Interface</h3>
      <p class="mb-2">
        When using the <code>sources</code> prop for art direction, each source
        object should contain:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          <code>src: string</code> - Source URL for this media condition
        </li>
        <li>
          <code>type?: string</code> - MIME type of the image (e.g.,
          'image/webp')
        </li>
        <li>
          <code>media?: string</code> - Media query for when to use this source
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Loading States</h3>
      <p class="mb-2">
        The component manages several internal states that affect its
        appearance:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          <strong>Loading</strong> - Shows placeholder until image loads
        </li>
        <li>
          <strong>Loaded</strong> - Image successfully loaded and displayed
        </li>
        <li>
          <strong>Error</strong> - Image failed to load, shows retry option or
          fallback
        </li>
        <li>
          <strong>Retry</strong> - Attempting to reload failed image
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Performance Features</h3>
      <p class="mb-2">
        The Image component includes several performance optimizations:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          <strong>Intersection Observer</strong> - Lazy loading when image
          enters viewport
        </li>
        <li>
          <strong>Priority Loading</strong> - Eager loading for above-the-fold
          critical images
        </li>
        <li>
          <strong>Responsive Images</strong> - Automatic selection of optimal
          image size
        </li>
        <li>
          <strong>Fetch Hints</strong> - Browser optimization hints for loading
          priority
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Accessibility</h3>
      <p class="mb-2">The component follows accessibility best practices:</p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          Required <code>alt</code> attribute for screen readers
        </li>
        <li>Support for additional ARIA attributes</li>
        <li>Proper focus management for interactive images</li>
        <li>Semantic HTML structure with appropriate roles</li>
      </ul>
    </APIReferenceTemplate>
  );
});
