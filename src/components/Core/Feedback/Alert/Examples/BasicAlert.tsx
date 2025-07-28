import { component$ } from "@builder.io/qwik";
import { Alert } from "~/components/Core/Feedback/Alert";

/**
 * Basic Alert examples showcasing different status types with mobile-optimized features.
 * 
 * Features demonstrated:
 * - All status types (info, success, warning, error)
 * - Mobile-friendly touch targets
 * - Responsive typography and spacing
 * - Theme-aware styling
 */
export const BasicAlert = component$(() => {
  return (
    <div class="space-y-6">
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2">Basic Alert Types</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          All alerts are mobile-optimized with touch-friendly dismiss buttons, 
          responsive text scaling, and theme-aware colors.
        </p>
      </div>
      
      <div class="space-y-4">
        <div>
          <h4 class="text-sm font-medium mb-2 text-blue-700 dark:text-blue-300">Information Alert</h4>
          <Alert
            status="info"
            title="Router Configuration Updated"
            message="Your network settings have been applied successfully. The changes will take effect within 30 seconds."
            dismissible
          />
        </div>

        <div>
          <h4 class="text-sm font-medium mb-2 text-green-700 dark:text-green-300">Success Alert</h4>
          <Alert
            status="success"
            title="VPN Connection Established"
            message="Successfully connected to the VPN server. Your internet traffic is now encrypted and secure."
            dismissible
          />
        </div>

        <div>
          <h4 class="text-sm font-medium mb-2 text-yellow-700 dark:text-yellow-300">Warning Alert</h4>
          <Alert
            status="warning"
            title="Firmware Update Available"
            message="A new firmware version (v2.1.3) is available. Update now to ensure optimal security and performance."
            dismissible
          />
        </div>

        <div>
          <h4 class="text-sm font-medium mb-2 text-red-700 dark:text-red-300">Error Alert</h4>
          <Alert
            status="error"
            title="Connection Failed"
            message="Unable to establish connection to the router. Please check your network settings and try again."
            dismissible
          />
        </div>
      </div>

      <div class="mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
          <span>📱</span>
          Mobile-First Features
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
          <div class="flex items-start gap-2">
            <span class="text-green-500 mt-0.5">✓</span>
            <span>Touch-friendly dismiss buttons (44px+ target)</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-green-500 mt-0.5">✓</span>
            <span>Responsive text scaling for readability</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-green-500 mt-0.5">✓</span>
            <span>Theme-aware colors with proper contrast</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-green-500 mt-0.5">✓</span>
            <span>Smooth animations with hardware acceleration</span>
          </div>
        </div>
      </div>
    </div>
  );
});
