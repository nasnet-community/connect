import { component$, useSignal } from "@builder.io/qwik";
import { ErrorMessage } from "../ErrorMessage";

/**
 * Responsive ErrorMessage examples showing different display modes and device behaviors
 */
export const ResponsiveErrorMessage = component$(() => {
  const showInline = useSignal(true);
  const showBlock = useSignal(true);
  const showResponsive = useSignal(true);
  const showForm = useSignal(true);

  return (
    <div class="space-y-8 p-4">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Responsive Display Modes</h3>
        
        {/* Inline Mode */}
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="font-medium">Inline Mode (Always inline)</h4>
            <button
              onClick$={() => showInline.value = !showInline.value}
              class="text-sm text-blue-600 hover:text-blue-700"
            >
              {showInline.value ? "Hide" : "Show"}
            </button>
          </div>
          {showInline.value && (
            <ErrorMessage
              message="This error appears inline with surrounding content"
              size="sm"
              displayMode="inline"
              dismissible={true}
              onDismiss$={() => showInline.value = false}
              variant="subtle"
            />
          )}
        </div>

        {/* Block Mode */}
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="font-medium">Block Mode (Always block)</h4>
            <button
              onClick$={() => showBlock.value = !showBlock.value}
              class="text-sm text-blue-600 hover:text-blue-700"
            >
              {showBlock.value ? "Hide" : "Show"}
            </button>
          </div>
          {showBlock.value && (
            <ErrorMessage
              message="This error takes full width and appears as a block element"
              size="md"
              displayMode="block"
              dismissible={true}
              onDismiss$={() => showBlock.value = false}
              variant="solid"
            />
          )}
        </div>

        {/* Responsive Mode */}
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="font-medium">Responsive Mode (Adapts to screen size)</h4>
            <button
              onClick$={() => showResponsive.value = !showResponsive.value}
              class="text-sm text-blue-600 hover:text-blue-700"
            >
              {showResponsive.value ? "Hide" : "Show"}
            </button>
          </div>
          {showResponsive.value && (
            <ErrorMessage
              title="Network Configuration Error"
              message="Failed to connect to the router. Please check your network settings and try again."
              size="lg"
              displayMode="responsive"
              dismissible={true}
              onDismiss$={() => showResponsive.value = false}
              variant="outline"
            />
          )}
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Different Sizes</h3>
        <div class="space-y-3">
          <ErrorMessage
            message="Small error message for minor issues"
            size="sm"
            variant="subtle"
            showIcon={true}
          />
          <ErrorMessage
            title="Medium Error"
            message="Medium-sized error message for standard notifications"
            size="md"
            variant="solid"
            showIcon={true}
          />
          <ErrorMessage
            title="Critical System Error"
            message="Large error message for important issues that require immediate attention from the user"
            size="lg"
            variant="outline"
            showIcon={true}
            dismissible={true}
            onDismiss$={() => {}}
          />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Form Integration Example</h3>
        <div class="max-w-md space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Router IP Address
            </label>
            <input
              type="text"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
              placeholder="192.168.1.1"
            />
          </div>
          
          {showForm.value && (
            <ErrorMessage
              message="Please enter a valid IP address (e.g., 192.168.1.1)"
              size="sm"
              displayMode="responsive"
              variant="solid"
              showIcon={true}
              dismissible={true}
              onDismiss$={() => showForm.value = false}
            />
          )}

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
              placeholder="admin"
            />
          </div>
          
          <button
            onClick$={() => showForm.value = true}
            class="w-full rounded-lg bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
          >
            Test Connection
          </button>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Custom Icon Example</h3>
        <ErrorMessage
          title="VPN Connection Failed"
          message="Unable to establish VPN connection. Check your credentials and server settings."
          size="md"
          variant="solid"
          showIcon={true}
          customIcon={
            <svg class="h-5 w-5 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          }
          dismissible={true}
          onDismiss$={() => {}}
        />
      </div>

      <div class="space-y-4">
        <div class="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
          <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
            <span>📱</span>
            Responsive Behavior Guide
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="rounded bg-blue-100/50 p-3 dark:bg-blue-800/30">
              <h5 class="font-medium text-blue-800 dark:text-blue-200 mb-2">Display Modes</h5>
              <ul class="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                <li>• <strong>Inline:</strong> Flows with content</li>
                <li>• <strong>Block:</strong> Full width container</li>
                <li>• <strong>Responsive:</strong> Adapts to screen size</li>
              </ul>
            </div>
            <div class="rounded bg-indigo-100/50 p-3 dark:bg-indigo-800/30">
              <h5 class="font-medium text-indigo-800 dark:text-indigo-200 mb-2">Mobile Features</h5>
              <ul class="space-y-1 text-xs text-indigo-700 dark:text-indigo-300">
                <li>• Touch-friendly dismiss buttons</li>
                <li>• Optimized text wrapping</li>
                <li>• Safe area support</li>
              </ul>
            </div>
            <div class="rounded bg-purple-100/50 p-3 dark:bg-purple-800/30">
              <h5 class="font-medium text-purple-800 dark:text-purple-200 mb-2">Accessibility</h5>
              <ul class="space-y-1 text-xs text-purple-700 dark:text-purple-300">
                <li>• ARIA live regions</li>
                <li>• High contrast support</li>
                <li>• Screen reader friendly</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <h4 class="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
            <span>🎨</span>
            Design System Integration
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div class="space-y-2">
              <h5 class="font-medium text-green-700 dark:text-green-300">Visual Consistency:</h5>
              <ul class="space-y-1 text-xs text-green-600 dark:text-green-400">
                <li>✓ Theme-aware colors and contrast</li>
                <li>✓ Consistent typography scaling</li>
                <li>✓ Unified spacing and padding</li>
                <li>✓ Icon and size harmonization</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h5 class="font-medium text-green-700 dark:text-green-300">Form Integration:</h5>
              <ul class="space-y-1 text-xs text-green-600 dark:text-green-400">
                <li>✓ Seamless field validation display</li>
                <li>✓ Contextual positioning</li>
                <li>✓ Real-time error state updates</li>
                <li>✓ Multiple error message handling</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <div class="flex items-start gap-3">
            <span class="text-amber-500 text-xl">⚠️</span>
            <div>
              <h4 class="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                Best Practices for Error Messages
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-700 dark:text-amber-300">
                <div>
                  <h6 class="font-medium mb-1">Content Guidelines:</h6>
                  <ul class="space-y-1 text-xs">
                    <li>• Use clear, actionable language</li>
                    <li>• Provide specific problem descriptions</li>
                    <li>• Include solution suggestions when possible</li>
                  </ul>
                </div>
                <div>
                  <h6 class="font-medium mb-1">UX Considerations:</h6>
                  <ul class="space-y-1 text-xs">
                    <li>• Show errors close to problem source</li>
                    <li>• Use appropriate severity levels</li>
                    <li>• Allow easy dismissal when appropriate</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});