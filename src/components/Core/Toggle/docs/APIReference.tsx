import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const toggleProps = [
    {
      name: "checked",
      type: "boolean",
      description: "Whether the toggle is checked/on.",
    },
    {
      name: "onChange$",
      type: "QRL<(checked: boolean) => void>",
      description: "Callback function fired when the toggle state changes.",
    },
    {
      name: "label",
      type: "string",
      description: "Text label for the toggle.",
    },
    {
      name: "labelPosition",
      type: "'left' | 'right'",
      defaultValue: "right",
      description: "Where to position the label relative to the toggle.",
    },
    {
      name: "size",
      type: "ToggleSize | ResponsiveSize",
      defaultValue: "md",
      description: "Size of the toggle. Can be 'sm', 'md', 'lg', or a responsive object with breakpoint values.",
    },
    {
      name: "color",
      type: "ToggleColor",
      defaultValue: "primary",
      description: "Color variant of the toggle. Options: 'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'.",
    },
    {
      name: "loading",
      type: "boolean",
      defaultValue: "false",
      description: "When true, shows a loading spinner inside the toggle and disables interaction.",
    },
    {
      name: "checkedIcon",
      type: "any",
      description: "JSX element to display when the toggle is in the checked state. Replaces the default indicator.",
    },
    {
      name: "uncheckedIcon",
      type: "any",
      description: "JSX element to display when the toggle is in the unchecked state. Replaces the default indicator.",
    },
    {
      name: "focusVisibleOnly",
      type: "boolean",
      defaultValue: "true",
      description: "When true, focus outline is only visible when focused via keyboard navigation (not mouse clicks).",
    },
    {
      name: "showIconsWithIndicator",
      type: "boolean",
      defaultValue: "false",
      description: "When true, shows icons alongside the default toggle indicator for enhanced visual feedback.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description:
        "When true, disables the toggle and prevents user interaction.",
    },
    {
      name: "name",
      type: "string",
      description:
        "Name attribute for the underlying input element, useful in forms.",
    },
    {
      name: "value",
      type: "string",
      description: "Value attribute for the underlying input element.",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description:
        "When true, marks the toggle as required and displays a required indicator.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the toggle container.",
    },
    {
      name: "id",
      type: "string",
      defaultValue: "auto-generated",
      description:
        "ID for the underlying input element. If not provided, an ID is auto-generated.",
    },
    {
      name: "aria-label",
      type: "string",
      description:
        "Accessible label for the toggle when no visible label is provided.",
    },
    {
      name: "aria-describedby",
      type: "string",
      description:
        "ID of an element that describes the toggle for accessibility.",
    },
  ];

  return (
    <APIReferenceTemplate props={toggleProps}>
      <p>
        The Toggle component provides a switch-like interface for toggling
        between two states. It's built on top of a native checkbox input for
        accessibility and form compatibility. The component supports multiple
        color variants, loading states, custom icons, responsive sizing, and
        advanced focus management.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Accessibility</h3>
      <p class="mb-4">
        The Toggle component follows accessibility best practices:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          Uses a native checkbox input with <code>role="switch"</code> for complete keyboard and screen reader support
        </li>
        <li>
          Supports proper labeling via the <code>label</code> prop or{" "}
          <code>aria-label</code>
        </li>
        <li>
          Enhanced keyboard navigation with Space and Enter key support
        </li>
        <li>
          Loading state announcements via <code>aria-live</code> regions for screen readers
        </li>
        <li>
          Includes proper disabled states with visual and semantic indicators
        </li>
        <li>
          Provides additional context with <code>aria-describedby</code> when
          needed
        </li>
        <li>Ensures sufficient contrast between states for visibility</li>
        <li>Includes visible focus states for keyboard navigation with <code>focusVisibleOnly</code> option</li>
        <li>Touch-optimized with proper gesture handling and minimum 44px touch targets</li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Form Integration</h3>
      <p class="mb-4">
        The Toggle component is designed to work seamlessly within forms:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>It uses a native checkbox input that submits with forms</li>
        <li>
          Supports <code>name</code> and <code>value</code> attributes for form
          submissions
        </li>
        <li>
          Respects the <code>required</code> attribute and displays appropriate
          indicators
        </li>
        <li>
          Can be controlled via the <code>checked</code> and{" "}
          <code>onChange$</code> props
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Styling & Visual Features</h3>
      <p class="mb-2">
        The Toggle component uses a consistent design that integrates with the
        Connect design system and offers extensive customization options:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>Automatically adapts to light and dark color modes</li>
        <li>Seven color variants: primary, secondary, success, warning, danger, info, and neutral</li>
        <li>Responsive sizing with support for breakpoint-specific sizes</li>
        <li>Custom icon support for both checked and unchecked states</li>
        <li>Loading state with integrated spinner animation</li>
        <li>Includes smooth transitions between states</li>
        <li>Provides clear visual differentiation between on and off states</li>
        <li>
          Can be customized with additional classes via the <code>class</code>{" "}
          prop
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Advanced Features</h3>
      <p class="mb-4">
        The Toggle component includes several advanced features for enhanced user experience:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          <strong>Loading States:</strong> Use the <code>loading</code> prop to show a spinner
          and disable interaction during async operations with screen reader announcements
        </li>
        <li>
          <strong>Enhanced Icon Support:</strong> Replace or complement the default toggle indicator with custom
          JSX elements using <code>checkedIcon</code> and <code>uncheckedIcon</code>. Use <code>showIconsWithIndicator</code>
          to display icons alongside the toggle indicator for enhanced visual feedback
        </li>
        <li>
          <strong>Real-time Responsive Sizing:</strong> The <code>size</code> prop accepts both
          string values and responsive objects with automatic breakpoint detection for different screen sizes
        </li>
        <li>
          <strong>Advanced Focus Management:</strong> Use <code>focusVisibleOnly</code> to show
          focus outlines only during keyboard navigation, not mouse interactions, with enhanced keyboard support
        </li>
        <li>
          <strong>Touch Gesture Support:</strong> Optimized touch interactions with gesture handling
          and prevention of text selection during toggle operations
        </li>
        <li>
          <strong>Performance Optimization:</strong> Built-in memoization for responsive calculations
          and style computations to prevent unnecessary re-renders
        </li>
        <li>
          <strong>Color Variants:</strong> Seven semantic color options to match
          different contexts and design requirements
        </li>
      </ul>
    </APIReferenceTemplate>
  );
});
