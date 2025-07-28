import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const boxProps = [
    // Core Properties
    {
      name: "children",
      type: "JSXChildren",
      description: "Content to be rendered inside the Box.",
    },
    {
      name: "as",
      type: "keyof QwikIntrinsicElements",
      defaultValue: "div",
      description: "HTML element to render the Box as.",
    },
    {
      name: "padding",
      type: "ResponsiveValue<BoxPadding> | ResponsiveValue<PaddingObject>",
      defaultValue: "none",
      description:
        "Responsive padding with mobile-first design. Supports responsive values, safe areas (safe, safe-top, safe-bottom), touch-friendly sizes (touch, touch-sm, touch-lg), and logical properties (inline, block, inlineStart, inlineEnd).",
    },
    {
      name: "margin",
      type: "ResponsiveValue<BoxMargin> | ResponsiveValue<MarginObject>",
      defaultValue: "none",
      description:
        "Responsive margin with mobile-first design. Supports responsive values, auto margins, safe areas, and logical properties for RTL support.",
    },
    {
      name: "borderRadius",
      type: "ResponsiveValue<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'>",
      defaultValue: "none",
      description: "Responsive border radius with enhanced size options.",
    },
    {
      name: "borderWidth",
      type: "ResponsiveValue<'none' | 'thin' | 'normal' | 'thick'>",
      defaultValue: "none",
      description: "Responsive border width.",
    },
    {
      name: "borderStyle",
      type: "ResponsiveValue<'solid' | 'dashed' | 'dotted' | 'double' | 'none'>",
      defaultValue: "solid",
      description: "Responsive border style.",
    },
    {
      name: "borderColor",
      type: "ResponsiveValue<'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted'>",
      defaultValue: "default",
      description: "Responsive border color with automatic dark mode variants.",
    },
    {
      name: "backgroundColor",
      type: "ResponsiveValue<'transparent' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted' | 'surface' | 'surface-alt' | 'surface-elevated' | 'surface-depressed' | 'background' | 'background-alt'>",
      defaultValue: "transparent",
      description: "Responsive background color with enhanced semantic options and automatic dark mode variants.",
    },
    {
      name: "shadow",
      type: "ResponsiveValue<'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner' | 'mobile-card' | 'mobile-nav' | 'elevated' | 'floating'>",
      defaultValue: "none",
      description: "Responsive shadow with mobile-optimized options and dark mode variants.",
    },
    {
      name: "fullWidth",
      type: "boolean | ResponsiveValue<boolean>",
      defaultValue: "false",
      description:
        "Responsive control for full width. Can be responsive to show full width only on certain breakpoints.",
    },
    {
      name: "fullHeight",
      type: "boolean | ResponsiveValue<boolean>",
      defaultValue: "false",
      description:
        "Responsive control for full height. Can be responsive to show full height only on certain breakpoints.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the Box.",
    },
    {
      name: "role",
      type: "string",
      description: "ARIA role for the Box.",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label for the Box.",
    },
    {
      name: "aria-labelledby",
      type: "string",
      description: "ID of an element that labels the Box.",
    },
    {
      name: "aria-describedby",
      type: "string",
      description: "ID of an element that describes the Box.",
    },
    // Mobile & Touch Optimization
    {
      name: "touchTarget",
      type: "'none' | 'sm' | 'md' | 'lg' | 'accessible'",
      defaultValue: "none",
      description: "Ensures proper touch target sizes for mobile accessibility. 'accessible' provides 44px minimum with adaptive sizing.",
    },
    {
      name: "touchOptimized",
      type: "boolean",
      defaultValue: "false",
      description: "Enables touch manipulation and cursor optimizations for mobile devices.",
    },
    {
      name: "mobileSafe",
      type: "boolean",
      defaultValue: "false",
      description: "Automatically adds safe area padding for mobile devices with notches and rounded corners.",
    },
    // Focus & Accessibility
    {
      name: "focusStyle",
      type: "'none' | 'default' | 'ring' | 'outline' | 'glow'",
      defaultValue: "none",
      description: "Enhanced focus indicators for keyboard navigation and accessibility.",
    },
    // Viewport & Modern CSS
    {
      name: "viewportWidth",
      type: "'vh' | 'vw' | 'dvh' | 'svh' | 'lvh' | string",
      description: "Uses modern viewport units for responsive width sizing.",
    },
    {
      name: "viewportHeight",
      type: "'vh' | 'vw' | 'dvh' | 'svh' | 'lvh' | string",
      description: "Uses modern viewport units for responsive height sizing.",
    },
    // RTL & Internationalization
    {
      name: "supportRtl",
      type: "boolean",
      defaultValue: "false",
      description: "Enables RTL (right-to-left) support with logical properties for international layouts.",
    },
    // Performance
    {
      name: "optimize",
      type: "boolean",
      defaultValue: "false",
      description: "Enables performance optimizations for class generation in large applications.",
    },
  ];

  return (
    <APIReferenceTemplate props={boxProps}>
      <p>
        The Box component is the most basic layout component in the Connect
        design system. This enhanced version provides mobile-first responsive design,
        accessibility improvements, touch optimization, and modern CSS features
        while maintaining consistent spacing, backgrounds, borders, and theme-aware props.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Enhanced Component API</h3>
      <p class="mb-4">
        The Box component accepts all standard HTML attributes for div elements
        in addition to the props listed below. This enhanced version includes
        mobile-first responsive design, accessibility improvements, and modern CSS features.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Component Composition</h3>
      <p class="mb-4">
        Box is a versatile component that can be composed in various ways:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>Use as a container for other components</li>
        <li>
          Combine with other layout components (Grid, Flex, etc.) to create
          complex layouts
        </li>
        <li>Use the 'as' prop to change the HTML element type</li>
        <li>Apply responsive values for mobile-first design</li>
        <li>Enable touch optimization for mobile interactions</li>
        <li>Use logical properties for RTL language support</li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Enhanced Accessibility</h3>
      <p class="mb-4">
        Box supports comprehensive accessibility features:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          Use <code>role</code> to define the ARIA role when changing the
          semantic element
        </li>
        <li>
          Use <code>aria-label</code> to provide an accessible name
        </li>
        <li>
          Use <code>aria-labelledby</code> to reference an element that labels
          the box
        </li>
        <li>
          Use <code>aria-describedby</code> to reference an element that
          describes the box
        </li>
        <li>
          Use <code>touchTarget</code> to ensure proper touch target sizes (minimum 44px)
        </li>
        <li>
          Use <code>focusStyle</code> for enhanced keyboard navigation indicators
        </li>
        <li>
          Enable <code>mobileSafe</code> for safe area support on mobile devices
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Mobile-First Responsive Design</h3>
      <p class="mb-4">
        Box supports responsive values using a mobile-first approach:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          Use responsive objects: <code>{`{ base: 'sm', md: 'lg', lg: 'xl' }`}</code>
        </li>
        <li>
          Safe area support with <code>safe</code>, <code>safe-top</code>, <code>safe-bottom</code>
        </li>
        <li>
          Touch-friendly sizes with <code>touch</code>, <code>touch-sm</code>, <code>touch-lg</code>
        </li>
        <li>
          Modern viewport units with <code>viewportHeight="dvh"</code>
        </li>
        <li>
          RTL support with logical properties: <code>inlineStart</code>, <code>inlineEnd</code>
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Performance Optimization</h3>
      <p class="mb-4">
        For large applications, enable performance optimizations:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          Use <code>optimize={true}</code> for optimized class generation
        </li>
        <li>
          Development mode includes debug information for troubleshooting
        </li>
        <li>
          Responsive class generation is optimized for minimal bundle impact
        </li>
      </ul>
    </APIReferenceTemplate>
  );
});
