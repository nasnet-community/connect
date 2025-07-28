import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate } from "~/components/Docs/templates";

/**
 * Examples documentation for FileInput components
 */
export default component$(() => {
  return (
    <ExamplesTemplate examples={[]}>
      <p>
        The FileInput components are used throughout the application for VPN
        configuration management. Here are links to comprehensive examples
        demonstrating various use cases and configurations.
      </p>

      <div class="mt-6 space-y-4">
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            ConfigFileInput Examples
          </h3>
          <p class="mb-3 text-sm text-gray-600 dark:text-gray-300">
            Simple file input examples for basic VPN configuration handling.
          </p>
          <div class="space-y-2">
            <a
              href="#basic-file-input"
              class="block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              → Basic ConfigFileInput Usage
            </a>
            <a
              href="#validation-states"
              class="block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              → ConfigFileInput with Validation
            </a>
            <a
              href="#multiple-file-types"
              class="block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              → Multi-Protocol Support
            </a>
            <a
              href="#error-handling"
              class="block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              → Error Handling Examples
            </a>
            <a
              href="#custom-validation"
              class="block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              → Custom Validation Logic
            </a>
          </div>
        </div>

        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            VPNConfigFileSection Examples
          </h3>
          <p class="mb-3 text-sm text-gray-600 dark:text-gray-300">
            Advanced file section examples with drag-and-drop and progress
            tracking.
          </p>
          <div class="space-y-2">
            <a
              href="#drag-and-drop"
              class="block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              → Drag & Drop Configuration
            </a>
            <a
              href="#form-integration"
              class="block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              → Form Integration Example
            </a>
            <a
              href="#responsive-layouts"
              class="block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              → Responsive Layout Examples
            </a>
          </div>
        </div>

        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Advanced Examples
          </h3>
          <p class="mb-3 text-sm text-gray-600 dark:text-gray-300">
            Complex scenarios and real-world implementations.
          </p>
          <div class="space-y-2">
            <a
              href="#vpn-configurations"
              class="block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              → VPN Configuration Examples
            </a>
            <a
              href="#error-handling"
              class="block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              → Comprehensive Error Handling
            </a>
            <a
              href="#custom-validation"
              class="block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              → Protocol-Specific Validation
            </a>
          </div>
        </div>

        <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
          <h3 class="mb-2 text-lg font-semibold text-blue-900 dark:text-blue-100">
            Interactive Examples
          </h3>
          <p class="mb-3 text-sm text-blue-700 dark:text-blue-300">
            Try out the components with real file upload and paste
            functionality.
          </p>
          <div class="space-y-2">
            <a
              href="/docs/components/core/fileinput/playground"
              class="block text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              → Interactive Playground
            </a>
            <a
              href="/docs/components/core/fileinput/playground#advanced"
              class="block text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              → Advanced Features Demo
            </a>
          </div>
        </div>
      </div>

      <div class="mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
        <h3 class="mb-2 text-base font-semibold text-gray-900 dark:text-white">
          Available Examples
        </h3>
        <p class="mb-3 text-sm text-gray-600 dark:text-gray-300">
          The following example components demonstrate various FileInput features:
        </p>
        <div class="grid gap-3 md:grid-cols-2">
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Core Examples</h4>
            <ul class="list-disc space-y-1 pl-5 text-xs text-gray-600 dark:text-gray-400">
              <li><strong>BasicFileInput</strong> - Simple file upload functionality</li>
              <li><strong>DragAndDrop</strong> - Drag & drop file handling</li>
              <li><strong>FormIntegration</strong> - Integration with form systems</li>
              <li><strong>ResponsiveLayouts</strong> - Mobile/tablet/desktop adaptations</li>
            </ul>
          </div>
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Advanced Examples</h4>
            <ul class="list-disc space-y-1 pl-5 text-xs text-gray-600 dark:text-gray-400">
              <li><strong>VPNConfigurations</strong> - Protocol-specific handling</li>
              <li><strong>ValidationStates</strong> - Validation feedback UI</li>
              <li><strong>ErrorHandling</strong> - Error scenarios and recovery</li>
              <li><strong>CustomValidation</strong> - Custom validation logic</li>
            </ul>
          </div>
        </div>
      </div>
    </ExamplesTemplate>
  );
});
