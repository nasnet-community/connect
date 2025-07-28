import { component$ } from "@builder.io/qwik";
import { BasicToast } from "../Examples";

export default component$(() => {
  return (
    <div class="space-y-6">
      <section class="space-y-3">
        <p>
          The Toast component provides a way to display brief, non-intrusive
          notifications to users. Toasts appear temporarily and typically
          dismiss automatically after a specified duration. They're perfect for
          communicating status updates, confirmations, warnings, or errors.
        </p>

        <div class="mt-4 rounded-lg border bg-white p-6 dark:bg-gray-800">
          <BasicToast />
        </div>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-semibold">Key Features</h2>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            <strong>Status Types:</strong> Info, success, warning, error, and
            loading states with appropriate styling
          </li>
          <li>
            <strong>Position Control:</strong> Display toasts in six different
            positions on the screen
          </li>
          <li>
            <strong>Interactive Elements:</strong> Add action buttons and handle
            user interactions
          </li>
          <li>
            <strong>Toast Management:</strong> Control toast lifecycle with
            show, update, and dismiss methods
          </li>
          <li>
            <strong>Customizable:</strong> Adjust size, duration, icons, and
            behavior to match your needs
          </li>
          <li>
            <strong>Accessible:</strong> Built with ARIA attributes and keyboard
            support for inclusivity
          </li>
        </ul>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-semibold">When to Use</h2>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            When you need to communicate a brief message about an operation's
            result
          </li>
          <li>
            To provide non-critical information without interrupting user flow
          </li>
          <li>When showing the result of an asynchronous operation</li>
          <li>
            To notify users of state changes that don't require immediate action
          </li>
          <li>
            For momentary feedback like confirmations or validation messages
          </li>
        </ul>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-semibold">Composition</h2>
        <p>The Toast system consists of two primary components:</p>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            <strong>ToastContainer:</strong> A container that manages and
            displays multiple toast messages
          </li>
          <li>
            <strong>Toast:</strong> Individual toast notification components
            with specific status and message
          </li>
          <li>
            <strong>useToast:</strong> A hook that provides methods for creating
            and managing toasts
          </li>
        </ul>
        <p class="mt-2">Additionally, the system includes:</p>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            <strong>Status Icons:</strong> Visual indicators for different types
            of messages
          </li>
          <li>
            <strong>Progress Bar:</strong> Visual indication of the time
            remaining before auto-dismiss
          </li>
          <li>
            <strong>Action Buttons:</strong> Optional interactive elements for
            user response
          </li>
        </ul>
      </section>
    </div>
  );
});
