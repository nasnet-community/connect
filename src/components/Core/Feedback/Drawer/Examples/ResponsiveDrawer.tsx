import { component$, useSignal } from "@builder.io/qwik";
import { Drawer } from "../Drawer";
import { Button } from "~/components/Core";

/**
 * Example demonstrating responsive drawer behavior.
 * The drawer adapts its size and animation based on screen size.
 */
export const ResponsiveDrawer = component$(() => {
  const isOpen = useSignal(false);
  const responsiveSize = useSignal<"sm" | "md" | "lg">("md");

  return (
    <div class="flex flex-col gap-4">
      <div class="flex flex-wrap gap-2">
        <Button
          onClick$={() => {
            responsiveSize.value = "sm";
            isOpen.value = true;
          }}
          variant="outline"
          size="sm"
        >
          Small Drawer
        </Button>
        <Button
          onClick$={() => {
            responsiveSize.value = "md";
            isOpen.value = true;
          }}
          variant="outline"
        >
          Medium Drawer
        </Button>
        <Button
          onClick$={() => {
            responsiveSize.value = "lg";
            isOpen.value = true;
          }}
          variant="outline"
          size="lg"
        >
          Large Drawer
        </Button>
      </div>

      <Drawer
        isOpen={isOpen.value}
        onClose$={() => (isOpen.value = false)}
        placement="right"
        size="full"
        responsiveSize={responsiveSize.value}
        enableSwipeGestures={true}
        showDragHandle={true}
        backdropBlur="heavy"
        mobileAnimation={true}
      >
        <div q:slot="header">
          <h2 class="text-lg font-semibold">Responsive Drawer</h2>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Size: {responsiveSize.value.toUpperCase()}
          </p>
        </div>

        <div class="p-4">
          <div class="space-y-4">
            <div class="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900/20 dark:to-purple-900/20">
              <h3 class="mb-2 font-medium">Responsive Behavior</h3>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                This drawer adapts to different screen sizes:
              </p>
              <ul class="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  • <strong>Mobile:</strong> Full width with bottom placement
                </li>
                <li>
                  • <strong>Tablet:</strong> Responsive width based on size
                </li>
                <li>
                  • <strong>Desktop:</strong> Fixed width with smooth animations
                </li>
              </ul>
            </div>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h4 class="mb-2 text-sm font-medium">Mobile Features</h4>
                <ul class="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  <li>✓ Touch gestures enabled</li>
                  <li>✓ Drag handle visible</li>
                  <li>✓ Safe area support</li>
                  <li>✓ Full screen width</li>
                </ul>
              </div>
              <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h4 class="mb-2 text-sm font-medium">Desktop Features</h4>
                <ul class="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  <li>✓ Keyboard navigation</li>
                  <li>✓ Focus management</li>
                  <li>✓ Fixed positioning</li>
                  <li>✓ Smooth transitions</li>
                </ul>
              </div>
            </div>

            <div class="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
              <h4 class="mb-2 font-medium text-amber-900 dark:text-amber-100">
                Try resizing your browser!
              </h4>
              <p class="text-sm text-amber-800 dark:text-amber-200">
                The drawer will automatically adapt its behavior based on your
                screen size. On mobile devices, it will slide from the bottom
                with full width.
              </p>
            </div>

            {/* Demo content to show scrolling */}
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} class="rounded bg-gray-50 p-3 dark:bg-gray-900">
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Scrollable content item {i + 1}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div q:slot="footer" class="flex items-center justify-between">
          <span class="text-xs text-gray-500 dark:text-gray-400">
            Responsive size: {responsiveSize.value}
          </span>
          <div class="flex gap-2">
            <Button
              onClick$={() => (isOpen.value = false)}
              variant="ghost"
              size="sm"
            >
              Close
            </Button>
            <Button
              onClick$={() => (isOpen.value = false)}
              variant="primary"
              size="sm"
            >
              Save
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
});

export default ResponsiveDrawer;
