import { component$, useSignal } from "@builder.io/qwik";
import { Drawer } from "../Drawer";
import { Button } from "~/components/Core";

/**
 * Example showing mobile-optimized drawer with native-like behavior.
 * Features bottom sheet style, drag handle, and smooth gestures.
 */
export const MobileDrawer = component$(() => {
  const isOpen = useSignal(false);
  const selectedItem = useSignal<string | null>(null);

  const menuItems = [
    { id: "share", label: "Share", icon: "📤" },
    { id: "edit", label: "Edit", icon: "✏️" },
    { id: "delete", label: "Delete", icon: "🗑️", danger: true },
    { id: "archive", label: "Archive", icon: "📁" },
    { id: "download", label: "Download", icon: "⬇️" },
  ];

  return (
    <div class="flex flex-col gap-4">
      <Button
        onClick$={() => (isOpen.value = true)}
        variant="primary"
        class="w-full md:w-auto"
      >
        Open Mobile Menu
      </Button>

      {selectedItem.value && (
        <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <p class="text-sm text-green-800 dark:text-green-200">
            Selected: {selectedItem.value}
          </p>
        </div>
      )}

      <Drawer
        isOpen={isOpen.value}
        onClose$={() => (isOpen.value = false)}
        placement="bottom"
        size="md"
        enableSwipeGestures={true}
        showDragHandle={true}
        backdropBlur="medium"
        mobileAnimation={true}
        responsiveSize="lg"
        class="mobile:rounded-t-3xl"
      >
        <div q:slot="header" class="pb-2 text-center">
          <h2 class="text-lg font-semibold">Actions</h2>
        </div>

        <div class="pb-safe">
          <nav class="divide-y divide-gray-200 dark:divide-gray-700">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick$={() => {
                  selectedItem.value = item.label;
                  isOpen.value = false;
                }}
                class={[
                  "flex w-full items-center gap-4 px-6 py-4",
                  "hover:bg-gray-50 dark:hover:bg-gray-800",
                  "active:bg-gray-100 dark:active:bg-gray-700",
                  "transition-colors duration-150",
                  "touch-manipulation", // Improves touch responsiveness
                  item.danger && "text-red-600 dark:text-red-400",
                ]}
              >
                <span class="text-2xl" aria-hidden="true">
                  {item.icon}
                </span>
                <span class="text-base font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div class="mt-4 px-6">
            <button
              onClick$={() => (isOpen.value = false)}
              class={[
                "w-full rounded-xl px-4 py-3",
                "bg-gray-100 dark:bg-gray-800",
                "text-gray-700 dark:text-gray-300",
                "font-medium",
                "hover:bg-gray-200 dark:hover:bg-gray-700",
                "active:scale-95",
                "transition-all duration-150",
                "touch-manipulation",
              ]}
            >
              Cancel
            </button>
          </div>
        </div>
      </Drawer>

      {/* Information card */}
      <div class="mt-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <h3 class="mb-2 font-medium text-blue-900 dark:text-blue-100">
          Mobile-First Features
        </h3>
        <ul class="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <li>• Native-like bottom sheet behavior</li>
          <li>• Swipe down to dismiss</li>
          <li>• Touch-optimized hit targets (44px minimum)</li>
          <li>• Safe area padding for modern devices</li>
          <li>• Smooth 60fps animations</li>
          <li>• Haptic feedback ready (with device support)</li>
        </ul>
      </div>
    </div>
  );
});

export default MobileDrawer;
