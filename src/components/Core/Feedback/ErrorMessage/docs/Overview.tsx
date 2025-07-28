import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="space-y-4">
      <p>
        The <code>ErrorMessage</code> component provides a consistent way to
        display error messages to users. It's designed to be visually
        distinctive and accessible, helping users understand what went wrong and
        how to resolve the issue.
      </p>

      <h2 class="mt-4 text-xl font-semibold">Key Features</h2>
      <ul class="list-disc space-y-2 pl-6">
        <li>
          <strong>Clear Error Communication:</strong> Presents error information
          in a visually distinct manner
        </li>
        <li>
          <strong>Customizable Content:</strong> Supports custom titles and
          error messages
        </li>
        <li>
          <strong>Dismissible:</strong> Can be configured to allow users to
          dismiss errors
        </li>
        <li>
          <strong>Auto-dismiss:</strong> Optional automatic dismissal after a
          configurable duration
        </li>
        <li>
          <strong>Animation:</strong> Smooth appearance animations for better
          user experience
        </li>
        <li>
          <strong>Utility Hook:</strong> Includes <code>useErrorMessage</code>{" "}
          hook for managing error state
        </li>
      </ul>

      <h2 class="mt-4 text-xl font-semibold">When to Use</h2>
      <ul class="list-disc space-y-2 pl-6">
        <li>
          When form validation fails and you need to show specific error details
        </li>
        <li>After failed API requests or server-side errors</li>
        <li>
          When a user action cannot be completed due to system constraints
        </li>
        <li>To provide error context for configuration issues</li>
        <li>When users need guidance on how to resolve an error situation</li>
      </ul>

      <h2 class="mt-4 text-xl font-semibold">Accessibility</h2>
      <p>The ErrorMessage component prioritizes accessibility:</p>
      <ul class="list-disc space-y-2 pl-6">
        <li>
          Uses <code>role="alert"</code> to announce errors to screen readers
        </li>
        <li>Uses semantic structure with proper heading hierarchy</li>
        <li>Provides clear visual indication through color and iconography</li>
        <li>
          When dismissible, includes an accessible button with appropriate
          aria-label
        </li>
        <li>Uses colors with sufficient contrast ratios</li>
      </ul>
    </div>
  );
});
