import { component$, useSignal } from "@builder.io/qwik";
import { Drawer } from "../Drawer";
import { Button } from "~/components/Core";

/**
 * Example demonstrating touch gesture support for mobile devices.
 * The drawer can be swiped to close on mobile devices.
 */
export const TouchGestureDrawer = component$(() => {
  const isOpen = useSignal(false);
  const placement = useSignal<"left" | "right" | "top" | "bottom">("bottom");

  return (
    <div class="flex flex-col gap-4">
      <div class="flex flex-wrap gap-2">
        <Button
          onClick$={() => {
            placement.value = "bottom";
            isOpen.value = true;
          }}
          variant="outline"
        >
          Open Bottom Drawer
        </Button>
        <Button
          onClick$={() => {
            placement.value = "left";
            isOpen.value = true;
          }}
          variant="outline"
        >
          Open Left Drawer
        </Button>
        <Button
          onClick$={() => {
            placement.value = "right";
            isOpen.value = true;
          }}
          variant="outline"
        >
          Open Right Drawer
        </Button>
        <Button
          onClick$={() => {
            placement.value = "top";
            isOpen.value = true;
          }}
          variant="outline"
        >
          Open Top Drawer
        </Button>
      </div>

      <Drawer
        isOpen={isOpen.value}
        onClose$={() => (isOpen.value = false)}
        placement={placement.value}
        size="md"
        enableSwipeGestures={true}
        showDragHandle={true}
        backdropBlur="medium"
        mobileAnimation={true}
      >
        <div q:slot="header">
          <h2 class="text-lg font-semibold">Touch Gesture Drawer</h2>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Swipe{" "}
            {placement.value === "bottom"
              ? "down"
              : placement.value === "top"
                ? "up"
                : placement.value === "left"
                  ? "left"
                  : "right"}{" "}
            to close on mobile
          </p>
        </div>

        <div class="p-4">
          <div class="space-y-4">
            <div class="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <h3 class="mb-2 font-medium">Touch Gestures Enabled</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                On mobile devices, you can swipe this drawer to close it. The
                swipe direction depends on the drawer placement.
              </p>
            </div>

            <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <h3 class="mb-2 font-medium text-blue-900 dark:text-blue-100">
                Features:
              </h3>
              <ul class="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                <li>• Swipe to close with velocity detection</li>
                <li>• Drag handle indicator on mobile</li>
                <li>• Smooth animations that follow touch</li>
                <li>• Backdrop blur effect</li>
                <li>• Safe area support for modern devices</li>
              </ul>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="rounded bg-gray-50 p-3 dark:bg-gray-900">
                <p class="mb-1 text-xs text-gray-500 dark:text-gray-400">
                  Swipe Threshold
                </p>
                <p class="font-mono text-sm">40%</p>
              </div>
              <div class="rounded bg-gray-50 p-3 dark:bg-gray-900">
                <p class="mb-1 text-xs text-gray-500 dark:text-gray-400">
                  Current Placement
                </p>
                <p class="font-mono text-sm">{placement.value}</p>
              </div>
            </div>
          </div>
        </div>

        <div q:slot="footer" class="flex justify-end gap-2">
          <Button onClick$={() => (isOpen.value = false)} variant="ghost">
            Cancel
          </Button>
          <Button onClick$={() => (isOpen.value = false)} variant="primary">
            Confirm
          </Button>
        </div>
      </Drawer>
    </div>
  );
});

export default TouchGestureDrawer;
