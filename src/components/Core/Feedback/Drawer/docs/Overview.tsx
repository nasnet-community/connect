import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="space-y-4">
      <p>
        The <code>Drawer</code> component provides a sliding panel that appears
        from the edge of the screen. It's used to display content that
        complements the main content without navigating away from the current
        context.
      </p>

      <h2 class="mt-4 text-xl font-semibold">Key Features</h2>
      <ul class="list-disc space-y-2 pl-6">
        <li>
          <strong>Flexible Placement:</strong> Position the drawer from any edge
          of the screen (left, right, top, bottom)
        </li>
        <li>
          <strong>Variable Sizing:</strong> Choose from predefined sizes (xs,
          sm, md, lg, xl, full) or specify a custom size
        </li>
        <li>
          <strong>Structured Layout:</strong> Includes optional header and
          footer sections with a scrollable content area
        </li>
        <li>
          <strong>Focus Management:</strong> Automatically manages focus when
          opened and closed, with focus trapping
        </li>
        <li>
          <strong>Keyboard Navigation:</strong> Close with Escape key and
          navigate with Tab key
        </li>
        <li>
          <strong>Accessibility:</strong> Built with ARIA attributes and
          keyboard navigation support
        </li>
        <li>
          <strong>Customization:</strong> Customize appearance with tailwind
          classes and custom props
        </li>
      </ul>

      <h2 class="mt-4 text-xl font-semibold">When to Use</h2>
      <ul class="list-disc space-y-2 pl-6">
        <li>
          To show secondary content that complements the current page (e.g.,
          filters, details, forms)
        </li>
        <li>
          For temporary interfaces that don't require a full page navigation
        </li>
        <li>
          When you need to display information or collect user input without
          losing context
        </li>
        <li>
          For responsive designs where a side panel is needed on larger screens
        </li>
        <li>As an alternative to modals when more screen space is needed</li>
      </ul>

      <h2 class="mt-4 text-xl font-semibold">Accessibility</h2>
      <p>The Drawer component follows accessibility best practices:</p>
      <ul class="list-disc space-y-2 pl-6">
        <li>
          Uses <code>role="dialog"</code> with <code>aria-modal="true"</code>
        </li>
        <li>
          Supports labeling via <code>aria-label</code>,{" "}
          <code>aria-labelledby</code>, and <code>aria-describedby</code>
        </li>
        <li>Manages focus correctly when opened and closed</li>
        <li>Provides keyboard navigation with Tab and Escape keys</li>
        <li>Traps focus within the drawer when open</li>
        <li>Restores focus to the triggering element when closed</li>
      </ul>
    </div>
  );
});
