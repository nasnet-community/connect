import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="space-y-4">
      <p>
        The <code>Popover</code> component displays floating content that
        appears when a user interacts with a trigger element. It's ideal for
        displaying additional information, contextual menus, or secondary forms
        without navigating away from the current view.
      </p>

      <h2 class="mt-4 text-xl font-semibold">Key Features</h2>
      <ul class="list-disc space-y-2 pl-6">
        <li>
          <strong>Composite Component:</strong> Consists of trigger and content
          parts for flexible composition
        </li>
        <li>
          <strong>Multiple Placements:</strong> Can be positioned in 12
          different ways relative to the trigger
        </li>
        <li>
          <strong>Various Trigger Methods:</strong> Supports click, hover,
          focus, or manual triggering
        </li>
        <li>
          <strong>Customizable Sizes:</strong> Available in small, medium, and
          large sizes
        </li>
        <li>
          <strong>Optional Arrow:</strong> Can display an arrow pointing to the
          trigger element
        </li>
        <li>
          <strong>Keyboard Navigation:</strong> Fully accessible with keyboard
          control
        </li>
        <li>
          <strong>Event Callbacks:</strong> Provides onOpen$ and onClose$ events
        </li>
        <li>
          <strong>Portal Support:</strong> Renders at the document root to avoid
          clipping issues
        </li>
      </ul>

      <h2 class="mt-4 text-xl font-semibold">When to Use</h2>
      <ul class="list-disc space-y-2 pl-6">
        <li>
          To display additional information about an element without cluttering
          the UI
        </li>
        <li>For contextual actions related to a specific element</li>
        <li>
          To collect user input through forms without navigating to a new page
        </li>
        <li>For creating custom dropdown menus and selection controls</li>
        <li>To display interactive tooltips with rich content</li>
        <li>
          For contextual help or explanations that are only shown on demand
        </li>
      </ul>

      <h2 class="mt-4 text-xl font-semibold">Component Structure</h2>
      <p>The Popover is composed of multiple components that work together:</p>
      <ul class="list-disc space-y-2 pl-6">
        <li>
          <code>Popover</code>: The container component that manages state and
          configuration
        </li>
        <li>
          <code>PopoverTrigger</code>: Wraps the element that will trigger the
          popover
        </li>
        <li>
          <code>PopoverContent</code>: Contains the content that appears when
          the popover is open
        </li>
      </ul>

      <h2 class="mt-4 text-xl font-semibold">Accessibility</h2>
      <p>
        The Popover component follows WAI-ARIA guidelines for accessibility:
      </p>
      <ul class="list-disc space-y-2 pl-6">
        <li>
          Content is associated with the trigger using{" "}
          <code>aria-controls</code>
        </li>
        <li>
          Popover applies <code>role="dialog"</code> for screen reader
          announcement
        </li>
        <li>Supports keyboard navigation and focus trapping when opened</li>
        <li>Automatically closes when Escape key is pressed</li>
        <li>Ensures focus is returned to the trigger when closed</li>
        <li>
          Provides <code>aria-expanded</code> state on the trigger element
        </li>
      </ul>
    </div>
  );
});
