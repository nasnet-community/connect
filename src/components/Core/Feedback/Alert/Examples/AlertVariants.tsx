import { component$ } from "@builder.io/qwik";
import { Alert } from "~/components/Core/Feedback/Alert";

export const AlertVariants = component$(() => {
  return (
    <div class="flex flex-col gap-6">
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">Visual Variants</h2>
        
        <div>
          <h3 class="mb-2 text-sm font-medium">Solid Variant (Default)</h3>
          <Alert
            variant="solid"
            status="info"
            title="Solid Variant"
            message="High contrast variant with colored background - ideal for important notifications that need immediate attention."
            dismissible
          />
        </div>

        <div>
          <h3 class="mb-2 text-sm font-medium">Outline Variant</h3>
          <Alert
            variant="outline"
            status="success"
            title="Outline Variant"
            message="Medium emphasis variant with border styling - perfect for secondary notifications that don't require immediate action."
            dismissible
          />
        </div>

        <div>
          <h3 class="mb-2 text-sm font-medium">Subtle Variant</h3>
          <Alert
            variant="subtle"
            status="warning"
            title="Subtle Variant"
            message="Low emphasis variant with subtle background - great for informational messages that shouldn't interrupt workflow."
            dismissible
          />
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-lg font-semibold">Icon Customization</h2>
        
        <div>
          <h3 class="mb-2 text-sm font-medium">Default Status Icons</h3>
          <div class="space-y-2">
            <Alert
              status="info"
              title="Information"
              message="Default info icon with consistent styling"
              size="sm"
            />
            <Alert
              status="success"
              title="Success"
              message="Default success icon with theme colors"
              size="sm"
            />
            <Alert
              status="warning"
              title="Warning"
              message="Default warning icon with proper contrast"
              size="sm"
            />
            <Alert
              status="error"
              title="Error"
              message="Default error icon with accessibility support"
              size="sm"
            />
          </div>
        </div>

        <div>
          <h3 class="mb-2 text-sm font-medium">Custom Icons</h3>
          <div class="space-y-2">
            <Alert
              status="info"
              title="Router Configuration"
              message="This alert uses a custom network icon for router-specific notifications."
              icon={<span class="text-xl" aria-label="Network">🌐</span>}
              dismissible
            />
            <Alert
              status="success"
              title="VPN Connected"
              message="Custom VPN icon indicates secure connection status."
              icon={<span class="text-xl" aria-label="VPN Shield">🛡️</span>}
              dismissible
            />
            <Alert
              status="warning"
              title="Gaming Mode Active"
              message="Gaming-specific icon for performance notifications."
              icon={<span class="text-xl" aria-label="Gaming">🎮</span>}
              dismissible
            />
          </div>
        </div>

        <div>
          <h3 class="mb-2 text-sm font-medium">No Icon</h3>
          <Alert
            status="info"
            title="Clean Layout"
            message="Sometimes a clean, icon-free layout provides better focus on the message content."
            icon={false}
            dismissible
          />
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-lg font-semibold">Mobile-Optimized Features</h2>
        
        <Alert
          status="info"
          title="Touch-Friendly Design"
          variant="solid"
          size="lg"
          dismissible
        >
          <div class="space-y-3">
            <p>All alert variants are optimized for mobile devices:</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div class="rounded bg-blue-100 p-2 dark:bg-blue-900/20">
                <span class="font-medium">Touch Targets:</span> 44px minimum
              </div>
              <div class="rounded bg-blue-100 p-2 dark:bg-blue-900/20">
                <span class="font-medium">Typography:</span> Responsive scaling
              </div>
              <div class="rounded bg-blue-100 p-2 dark:bg-blue-900/20">
                <span class="font-medium">Spacing:</span> Mobile-optimized
              </div>
              <div class="rounded bg-blue-100 p-2 dark:bg-blue-900/20">
                <span class="font-medium">Animations:</span> Hardware accelerated
              </div>
            </div>
          </div>
        </Alert>

        <Alert
          status="success"
          title="Theme Integration"
          variant="outline"
          dismissible
        >
          <p class="mb-2">
            All variants seamlessly integrate with your theme system and automatically
            adapt to light/dark mode preferences while maintaining proper contrast ratios.
          </p>
          <div class="text-xs text-green-600 dark:text-green-400">
            ✓ WCAG 2.1 AA compliant • ✓ High contrast support • ✓ Reduced motion respect
          </div>
        </Alert>
      </div>
    </div>
  );
});
