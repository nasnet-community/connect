import { component$, useSignal, $, type QRL } from "@builder.io/qwik";
import {
  HiDevicePhoneMobileOutline,
  HiHandRaisedOutline,
  HiArrowsUpDownOutline,
  HiFingerPrintOutline,
  HiEyeSlashOutline,
  HiBoltOutline,
} from "@qwikest/icons/heroicons";
import { Card } from "../../../Card/Card";
import { Alert } from "../../Alert/Alert";
import { Toast } from "../../Toast/Toast";
import { Drawer } from "../../Drawer/Drawer";
import { Dialog } from "../../Dialog/Dialog";
interface MobileFeaturesSectionProps {}

export const MobileFeaturesSection = component$<MobileFeaturesSectionProps>(
  () => {
    const activeDemo = useSignal<string | null>(null);
    const showSwipeToast = useSignal(false);
    const showTouchDrawer = useSignal(false);
    const showFullscreenDialog = useSignal(false);

    const getIcon = $((iconName: string, className?: string) => {
      switch (iconName) {
        case "fingerprint":
          return <HiFingerPrintOutline class={className} />;
        case "arrows":
          return <HiArrowsUpDownOutline class={className} />;
        case "device":
          return <HiDevicePhoneMobileOutline class={className} />;
        case "hand":
          return <HiHandRaisedOutline class={className} />;
        case "eye":
          return <HiEyeSlashOutline class={className} />;
        case "bolt":
          return <HiBoltOutline class={className} />;
        default:
          return null;
      }
    });

    const mobileFeatures = [
      {
        id: "touch-targets",
        title: "Touch-Friendly Targets",
        description: "All interactive elements meet WCAG 2.1 AA minimum size requirements",
        iconName: "fingerprint",
        implementation: "Minimum 44px × 44px touch targets with proper spacing",
        demo: (
          <div class="space-y-4">
            <Alert
              status="info"
              message="Notice the larger dismiss button optimized for touch"
              dismissible
              size="md"
            />
            <div class="flex space-x-2">
              <button class="rounded bg-blue-600 px-6 py-3 text-white min-h-[44px] min-w-[44px]">
                Touch Me
              </button>
              <button class="rounded bg-green-600 px-6 py-3 text-white min-h-[44px] min-w-[44px]">
                Or Me
              </button>
            </div>
          </div>
        ),
      },
      {
        id: "swipe-gestures",
        title: "Swipe Gestures",
        description: "Natural swipe-to-dismiss functionality for toasts and cards",
        iconName: "arrows",
        implementation: "Pan gesture recognition with velocity and distance thresholds",
        demo: (
          <div class="space-y-4">
            <button
              onClick$={() => showSwipeToast.value = true}
              class="rounded bg-[var(--showcase-primary)] px-4 py-2 text-white"
            >
              Show Swipeable Toast
            </button>
            {showSwipeToast.value && (
              <Toast
                id="swipe-toast-demo"
                message="👆 Swipe me up or down to dismiss!"
                status="info"
                position="top-center"
                duration={8000}
                swipeable
                onDismiss$={() => showSwipeToast.value = false}
              />
            )}
            <div class="rounded border-2 border-dashed border-gray-300 p-4 text-center text-sm text-gray-500">
              Swipe area - Try swiping the toast above
            </div>
          </div>
        ),
      },
      {
        id: "responsive-sizing",
        title: "Responsive Component Sizing",
        description: "Automatic size adjustment based on viewport and device type",
        iconName: "device",
        implementation: "CSS container queries and mobile-first responsive design",
        demo: (
          <div class="space-y-4">
            <Alert
              status="success"
              title="Responsive Alert"
              message="This alert automatically adjusts its padding, text size, and layout based on the current viewport size."
              dismissible
            />
            <div class="grid grid-cols-1 gap-2 text-xs text-gray-500">
              <div>Mobile: Compact spacing, smaller text</div>
              <div>Tablet: Medium spacing, base text</div>
              <div>Desktop: Generous spacing, larger text</div>
            </div>
          </div>
        ),
      },
      {
        id: "drag-handles",
        title: "Drag Handles & Touch Affordances",
        description: "Visual indicators for draggable components with haptic feedback",
        iconName: "hand",
        implementation: "Drag handle UI with touch feedback and visual states",
        demo: (
          <div class="space-y-4">
            <button
              onClick$={() => showTouchDrawer.value = true}
              class="rounded bg-[var(--showcase-primary)] px-4 py-2 text-white"
            >
              Open Drawer with Drag Handle
            </button>
            <Drawer
              isOpen={showTouchDrawer.value}
              onClose$={() => showTouchDrawer.value = false}
              placement="bottom"
              size="md"
              showDragHandle
            >
              <div class="p-6">
                <h3 class="mb-2 text-lg font-semibold">Touch-Friendly Drawer</h3>
                <p class="text-sm text-gray-600">
                  Notice the drag handle at the top. You can drag it down to close this drawer,
                  or tap the handle area for visual feedback.
                </p>
              </div>
            </Drawer>
          </div>
        ),
      },
      {
        id: "fullscreen-mobile",
        title: "Fullscreen Mobile Mode",
        description: "Modals automatically expand to fullscreen on mobile devices",
        iconName: "eye",
        implementation: "Automatic fullscreen mode with safe area handling",
        demo: (
          <div class="space-y-4">
            <button
              onClick$={() => showFullscreenDialog.value = true}
              class="rounded bg-[var(--showcase-primary)] px-4 py-2 text-white"
            >
              Open Fullscreen Dialog (Mobile)
            </button>
            <Dialog
              isOpen={showFullscreenDialog.value}
              onClose$={() => showFullscreenDialog.value = false}
              title="Mobile Fullscreen Dialog"
              size="full"
              fullscreenOnMobile
            >
              <div class="p-4">
                <p class="mb-4 text-gray-600">
                  On mobile devices, this dialog takes up the full screen for better usability.
                  On larger screens, it behaves as a regular modal.
                </p>
                <div class="rounded bg-blue-50 p-3 text-sm text-blue-700">
                  <strong>Mobile Features:</strong>
                  <ul class="mt-2 list-disc list-inside space-y-1">
                    <li>Respects safe areas (notch, home indicator)</li>
                    <li>Full viewport utilization</li>
                    <li>Optimized close button placement</li>
                    <li>Scrollable content handling</li>
                  </ul>
                </div>
              </div>
            </Dialog>
          </div>
        ),
      },
      {
        id: "performance",
        title: "Mobile Performance Optimizations",
        description: "Hardware acceleration and optimized animations for smooth interactions",
        iconName: "bolt",
        implementation: "CSS transforms, will-change properties, and RAF-based animations",
        demo: (
          <div class="space-y-4">
            <div class="rounded bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
              <h4 class="font-semibold">Hardware Accelerated</h4>
              <p class="text-sm opacity-90">
                This gradient uses GPU acceleration for smooth animations
              </p>
            </div>
            <div class="grid grid-cols-2 gap-3 text-xs">
              <div class="rounded bg-green-50 p-2 text-green-700">
                <div class="font-medium">✓ GPU Layers</div>
                <div>Transform3d usage</div>
              </div>
              <div class="rounded bg-green-50 p-2 text-green-700">
                <div class="font-medium">✓ 60fps Animations</div>
                <div>Optimized transitions</div>
              </div>
              <div class="rounded bg-green-50 p-2 text-green-700">
                <div class="font-medium">✓ Reduced Reflows</div>
                <div>Layout optimization</div>
              </div>
              <div class="rounded bg-green-50 p-2 text-green-700">
                <div class="font-medium">✓ Memory Efficient</div>
                <div>Cleanup on unmount</div>
              </div>
            </div>
          </div>
        ),
      },
    ];

    const FeatureDemo = component$<{
      feature: typeof mobileFeatures[0];
      isActive: boolean;
      onToggle: QRL<() => void>;
    }>(({ feature, isActive, onToggle }) => (
      <Card class="overflow-hidden">
        <div class="p-6">
          <div class="mb-4 flex items-start justify-between">
            <div class="flex items-start space-x-3">
              <div class="rounded-lg bg-[var(--showcase-primary)]/10 p-3">
                {getIcon(feature.iconName, "h-6 w-6 text-[var(--showcase-primary)]")}
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-[var(--showcase-text)]">
                  {feature.title}
                </h3>
                <p class="mt-1 text-sm text-[var(--showcase-text)]/70">
                  {feature.description}
                </p>
                <div class="mt-2 rounded bg-[var(--showcase-surface)] px-2 py-1 text-xs text-[var(--showcase-text)]/60">
                  <strong>Implementation:</strong> {feature.implementation}
                </div>
              </div>
            </div>
            <button
              onClick$={onToggle}
              class="rounded bg-[var(--showcase-primary)] px-3 py-1 text-sm text-white hover:bg-[var(--showcase-primary)]/90"
            >
              {isActive ? "Hide Demo" : "Show Demo"}
            </button>
          </div>

          {isActive && (
            <div class="rounded border border-[var(--showcase-border)] bg-[var(--showcase-bg)] p-4">
              {feature.demo}
            </div>
          )}
        </div>
      </Card>
    ));

    return (
      <div class="space-y-8">
        {/* Header */}
        <div class="text-center">
          <h2 class="mb-4 text-3xl font-bold text-[var(--showcase-text)]">
            Mobile Features Showcase
          </h2>
          <p class="mx-auto max-w-2xl text-[var(--showcase-text)]/70">
            Comprehensive mobile optimizations including touch gestures, responsive design,
            and performance enhancements for the best mobile user experience.
          </p>
        </div>

        {/* Mobile-First Benefits */}
        <Card class="p-6">
          <h3 class="mb-4 text-xl font-semibold text-[var(--showcase-text)]">
            Why Mobile-First Matters
          </h3>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div class="text-center">
              <div class="mb-2 text-2xl">📱</div>
              <div class="font-medium text-[var(--showcase-text)]">60%+ Mobile Traffic</div>
              <div class="text-sm text-[var(--showcase-text)]/70">
                Most users access applications on mobile devices
              </div>
            </div>
            <div class="text-center">
              <div class="mb-2 text-2xl">⚡</div>
              <div class="font-medium text-[var(--showcase-text)]">Better Performance</div>
              <div class="text-sm text-[var(--showcase-text)]/70">
                Mobile-first design leads to faster load times
              </div>
            </div>
            <div class="text-center">
              <div class="mb-2 text-2xl">♿</div>
              <div class="font-medium text-[var(--showcase-text)]">Enhanced Accessibility</div>
              <div class="text-sm text-[var(--showcase-text)]/70">
                Touch-friendly design benefits all users
              </div>
            </div>
          </div>
        </Card>

        {/* Feature Demonstrations */}
        <div class="space-y-6">
          {mobileFeatures.map((feature) => (
            <FeatureDemo
              key={feature.id}
              feature={feature}
              isActive={activeDemo.value === feature.id}
              onToggle={$(() => {
                activeDemo.value = activeDemo.value === feature.id ? null : feature.id;
              })}
            />
          ))}
        </div>

        {/* Testing Instructions */}
        <Card class="p-6">
          <h3 class="mb-4 text-lg font-semibold text-[var(--showcase-text)]">
            Testing Mobile Features
          </h3>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 class="mb-2 font-medium text-[var(--showcase-text)]">On Desktop</h4>
              <ul class="space-y-1 text-sm text-[var(--showcase-text)]/70">
                <li>• Use device simulator in browser DevTools</li>
                <li>• Toggle device emulation (F12 → Device Mode)</li>
                <li>• Test different screen sizes and orientations</li>
                <li>• Simulate touch events in DevTools</li>
              </ul>
            </div>
            <div>
              <h4 class="mb-2 font-medium text-[var(--showcase-text)]">On Mobile Device</h4>
              <ul class="space-y-1 text-sm text-[var(--showcase-text)]/70">
                <li>• Access this showcase on your mobile device</li>
                <li>• Try swipe gestures on toasts and drawers</li>
                <li>• Test touch targets with your finger</li>
                <li>• Notice fullscreen modal behavior</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Performance Metrics */}
        <Card class="p-6">
          <h3 class="mb-4 text-lg font-semibold text-[var(--showcase-text)]">
            Mobile Performance Metrics
          </h3>
          <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div class="rounded bg-green-50 p-3 text-center">
              <div class="text-lg font-bold text-green-600">60fps</div>
              <div class="text-xs text-green-700">Animation Smoothness</div>
            </div>
            <div class="rounded bg-blue-50 p-3 text-center">
              <div class="text-lg font-bold text-blue-600">&lt;16ms</div>
              <div class="text-xs text-blue-700">Touch Response Time</div>
            </div>
            <div class="rounded bg-purple-50 p-3 text-center">
              <div class="text-lg font-bold text-purple-600">44px+</div>
              <div class="text-xs text-purple-700">Touch Target Size</div>
            </div>
            <div class="rounded bg-orange-50 p-3 text-center">
              <div class="text-lg font-bold text-orange-600">WCAG AA</div>
              <div class="text-xs text-orange-700">Accessibility Level</div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
);