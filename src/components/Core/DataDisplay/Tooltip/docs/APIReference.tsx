import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const tooltipProps = [
    {
      name: "content",
      type: "string | JSXChildren",
      description:
        "The content to display in the tooltip. Can be a simple string or JSX content.",
    },
    {
      name: "children",
      type: "JSXChildren",
      description: "The trigger element that the tooltip will be attached to.",
    },
    {
      name: "placement",
      type: "'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end'",
      defaultValue: "bottom",
      description:
        "The placement of the tooltip relative to its trigger element.",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "md",
      description:
        "The size of the tooltip which affects padding and font size.",
    },
    {
      name: "color",
      type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",
      defaultValue: "default",
      description: "The color theme of the tooltip.",
    },
    {
      name: "trigger",
      type: "TooltipTriggerType | TooltipTriggerType[] (where TooltipTriggerType = 'hover' | 'click' | 'focus' | 'manual')",
      defaultValue: "hover",
      description: "What user interaction(s) will trigger the tooltip.",
    },
    {
      name: "delay",
      type: "number",
      defaultValue: "0",
      description: "Delay in milliseconds before the tooltip appears.",
    },
    {
      name: "hideDelay",
      type: "number",
      defaultValue: "0",
      description: "Delay in milliseconds before the tooltip disappears.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "When true, the tooltip will not be displayed.",
    },
    {
      name: "visible",
      type: "boolean",
      description:
        "Manually control the visibility of the tooltip (makes it a controlled component).",
    },
    {
      name: "onVisibleChange$",
      type: "QRL<(visible: boolean) => void>",
      description: "Callback fired when the visibility of the tooltip changes.",
    },
    {
      name: "offset",
      type: "number",
      defaultValue: "8",
      description:
        "Distance in pixels between the tooltip and its trigger element.",
    },
    {
      name: "interactive",
      type: "boolean",
      defaultValue: "false",
      description:
        "When true, the tooltip can be interacted with without disappearing.",
    },
    {
      name: "maxWidth",
      type: "string",
      defaultValue: "300px",
      description: "Maximum width of the tooltip before it wraps or truncates.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the tooltip.",
    },
    {
      name: "style",
      type: "Record<string, string>",
      description: "Inline styles to apply to the tooltip.",
    },
  ];

  const tooltipTriggerProps = [
    {
      name: "children",
      type: "JSXChildren",
      description: "The element that triggers the tooltip.",
    },
    {
      name: "setTriggerElement",
      type: "QRL<(el: Element) => void>",
      description: "Callback to register the trigger element reference.",
    },
    {
      name: "mouseEnterHandler",
      type: "QRL<() => void>",
      description: "Handler for mouse enter events.",
    },
    {
      name: "mouseLeaveHandler",
      type: "QRL<() => void>",
      description: "Handler for mouse leave events.",
    },
    {
      name: "focusHandler",
      type: "QRL<() => void>",
      description: "Handler for focus events.",
    },
    {
      name: "blurHandler",
      type: "QRL<() => void>",
      description: "Handler for blur events.",
    },
    {
      name: "clickHandler",
      type: "QRL<() => void>",
      description: "Handler for click events.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes for the trigger wrapper element.",
    },
  ];

  const tooltipContentProps = [
    {
      name: "children",
      type: "JSXChildren",
      description: "The content of the tooltip.",
    },
    {
      name: "id",
      type: "string",
      description: "Unique ID for the tooltip content.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes for the tooltip content.",
    },
    {
      name: "style",
      type: "Record<string, string>",
      description: "Inline styles for the tooltip content.",
    },
    {
      name: "mouseEnterHandler",
      type: "QRL<() => void>",
      description: "Handler for mouse enter events on the tooltip content.",
    },
    {
      name: "mouseLeaveHandler",
      type: "QRL<() => void>",
      description: "Handler for mouse leave events on the tooltip content.",
    },
  ];

  return (
    <APIReferenceTemplate props={tooltipProps}>
      <p>
        The Tooltip component provides a flexible way to display additional
        information or context when a user interacts with an element. It
        consists of several subcomponents that work together to create a
        complete tooltip experience.
      </p>

      <h3 class="mb-2 mt-8 text-lg font-semibold">Component Structure</h3>
      <p class="mb-4">
        While you'll typically use the main <code>Tooltip</code> component for
        most use cases, the tooltip system consists of several subcomponents
        that handle specific aspects of the tooltip:
      </p>
      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          <code>Tooltip</code> - The main component that wraps everything
          together
        </li>
        <li>
          <code>TooltipTrigger</code> - Handles the element that triggers the
          tooltip
        </li>
        <li>
          <code>TooltipContent</code> - The tooltip content container
        </li>
        <li>
          <code>TooltipArrow</code> - The arrow pointing from the tooltip to the
          trigger
        </li>
      </ul>

      <h3 class="mb-2 mt-8 text-lg font-semibold">TooltipTrigger Props</h3>
      <APIReferenceTemplate props={tooltipTriggerProps} />

      <h3 class="mb-2 mt-8 text-lg font-semibold">TooltipContent Props</h3>
      <APIReferenceTemplate props={tooltipContentProps} />

      <h3 class="mb-2 mt-8 text-lg font-semibold">Type Definitions</h3>
      <p class="mb-2">Key type definitions exported by the Tooltip module:</p>
      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          <code>TooltipPlacement</code> - Placement options for the tooltip
        </li>
        <li>
          <code>TooltipTriggerType</code> - Trigger types: 'hover' | 'click' |
          'focus' | 'manual'
        </li>
        <li>
          <code>TooltipSize</code> - Size options: 'sm' | 'md' | 'lg'
        </li>
        <li>
          <code>TooltipColor</code> - Color variants: 'default' | 'primary' |
          'secondary' | 'success' | 'warning' | 'error' | 'info'
        </li>
      </ul>

      <h3 class="mb-2 mt-8 text-lg font-semibold">Hook: useTooltip</h3>
      <p class="mb-2">
        The <code>useTooltip</code> hook provides low-level control for custom
        tooltip implementations:
      </p>
      <pre class="mb-4 overflow-x-auto rounded-md bg-neutral-100 p-4 dark:bg-neutral-800">
        <code>
          {`import { useTooltip } from '~/components/Core/DataDisplay/Tooltip';

// Inside your component
const {
  isVisible,
  triggerRef,
  tooltipRef,
  position,
  arrowPosition,
  showTooltip$,
  hideTooltip$,
  toggleTooltip$,
  setTriggerElement$
} = useTooltip({
  placement: 'bottom',
  offset: 8,
  delay: 0,
  hideDelay: 0
});`}
        </code>
      </pre>
    </APIReferenceTemplate>
  );
});
