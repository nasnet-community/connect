import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "~/components/Core/Feedback/Dialog";
import { Button } from "~/components/Core/button";

export const MobileFullscreenDialog = component$(() => {
  const isDialogOpen = useSignal(false);
  const fullscreenOnMobile = useSignal(true);
  const size = useSignal<"sm" | "md" | "lg">("md");
  const elevation = useSignal<"base" | "elevated" | "depressed">("elevated");
  const backdropVariant = useSignal<"light" | "medium" | "heavy">("medium");

  const openDialog = $(() => {
    isDialogOpen.value = true;
  });

  const closeDialog = $(() => {
    isDialogOpen.value = false;
  });

  return (
    <div class="space-y-6">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Dialog Configuration</h3>

        <div class="flex items-center gap-4">
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              checked={fullscreenOnMobile.value}
              onChange$={(e) => {
                fullscreenOnMobile.value = (
                  e.target as HTMLInputElement
                ).checked;
              }}
              class="rounded border-gray-300"
            />
            <span>Fullscreen on Mobile</span>
          </label>
        </div>

        <div class="flex gap-2">
          <label>
            Size:
            <select
              value={size.value}
              onChange$={(e) => {
                size.value = (e.target as HTMLSelectElement).value as any;
              }}
              class="ml-2 rounded border border-gray-300 px-2 py-1"
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </select>
          </label>

          <label>
            Elevation:
            <select
              value={elevation.value}
              onChange$={(e) => {
                elevation.value = (e.target as HTMLSelectElement).value as any;
              }}
              class="ml-2 rounded border border-gray-300 px-2 py-1"
            >
              <option value="base">Base</option>
              <option value="elevated">Elevated</option>
              <option value="depressed">Depressed</option>
            </select>
          </label>

          <label>
            Backdrop:
            <select
              value={backdropVariant.value}
              onChange$={(e) => {
                backdropVariant.value = (e.target as HTMLSelectElement)
                  .value as any;
              }}
              class="ml-2 rounded border border-gray-300 px-2 py-1"
            >
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="heavy">Heavy</option>
            </select>
          </label>
        </div>
      </div>

      <Button onClick$={openDialog}>Open Mobile-Optimized Dialog</Button>

      <Dialog
        isOpen={isDialogOpen.value}
        onClose$={closeDialog}
        size={size.value}
        fullscreenOnMobile={fullscreenOnMobile.value}
        elevation={elevation.value}
        backdropVariant={backdropVariant.value}
        ariaLabel="Mobile Fullscreen Dialog Example"
      >
        <DialogHeader onClose$={closeDialog}>
          <h3 class="text-lg font-semibold">Mobile-Optimized Dialog</h3>
        </DialogHeader>

        <DialogBody>
          <div class="space-y-4">
            <p>
              This dialog is optimized for mobile devices. When viewed on a
              mobile device:
            </p>
            <ul class="ml-4 list-inside list-disc space-y-2">
              <li>The dialog takes up the full screen for better usability</li>
              <li>The close button is touch-friendly with a larger hit area</li>
              <li>Safe areas are respected for devices with notches</li>
              <li>Smooth animations enhance the user experience</li>
              <li>Content scrolls smoothly with momentum scrolling</li>
            </ul>

            <div class="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-4 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
              <h4 class="mb-3 font-medium text-blue-900 dark:text-blue-100 flex items-center gap-2">
                <span>📱</span>
                Responsive Features:
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div class="rounded bg-blue-100/50 p-3 dark:bg-blue-800/30">
                  <div class="font-medium text-blue-800 dark:text-blue-200 mb-1">Mobile</div>
                  <div class="text-blue-600 dark:text-blue-300 text-xs">
                    • Fullscreen layout<br/>
                    • Slide-up animation<br/>
                    • Safe area support<br/>
                    • Touch-optimized
                  </div>
                </div>
                <div class="rounded bg-indigo-100/50 p-3 dark:bg-indigo-800/30">
                  <div class="font-medium text-indigo-800 dark:text-indigo-200 mb-1">Tablet</div>
                  <div class="text-indigo-600 dark:text-indigo-300 text-xs">
                    • Centered modal<br/>
                    • Scale animation<br/>
                    • Responsive sizing<br/>
                    • Backdrop blur
                  </div>
                </div>
                <div class="rounded bg-purple-100/50 p-3 dark:bg-purple-800/30">
                  <div class="font-medium text-purple-800 dark:text-purple-200 mb-1">Desktop</div>
                  <div class="text-purple-600 dark:text-purple-300 text-xs">
                    • Standard modal<br/>
                    • Keyboard nav<br/>
                    • Focus management<br/>
                    • ESC to close
                  </div>
                </div>
              </div>
            </div>

            <div class="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <div class="flex items-start gap-3">
                <span class="text-amber-500 text-xl">💡</span>
                <div>
                  <h5 class="font-medium text-amber-900 dark:text-amber-100 mb-1">
                    Pro Tip: Test Responsive Behavior
                  </h5>
                  <p class="text-sm text-amber-800 dark:text-amber-200">
                    Try resizing your browser window or viewing on different devices
                    to see how the dialog automatically adapts its behavior, animation,
                    and layout for optimal user experience.
                  </p>
                </div>
              </div>
            </div>

            <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <h5 class="font-medium text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                <span>♿</span>
                Accessibility Features
              </h5>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-green-700 dark:text-green-300">
                <div>✓ ARIA labels and roles</div>
                <div>✓ Keyboard navigation</div>
                <div>✓ Focus trap management</div>
                <div>✓ Screen reader support</div>
                <div>✓ High contrast compatibility</div>
                <div>✓ Reduced motion support</div>
              </div>
            </div>

            {/* Add more content to demonstrate scrolling with variety */}
            <div class="space-y-3">
              <h5 class="font-medium text-gray-900 dark:text-gray-100">
                📄 Scrollable Content Demonstration
              </h5>
              {Array.from({ length: 12 }, (_, i) => {
                const contentTypes = [
                  { emoji: "📊", title: "Network Statistics", desc: "Current bandwidth usage and performance metrics" },
                  { emoji: "🔒", title: "Security Settings", desc: "VPN protocols and encryption configuration" },
                  { emoji: "🎮", title: "Gaming Rules", desc: "Port forwarding and traffic optimization" },
                  { emoji: "🌐", title: "WAN Configuration", desc: "Multi-WAN setup and failover settings" },
                ];
                const content = contentTypes[i % contentTypes.length];
                return (
                  <div key={i} class="rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 p-4 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-start gap-3">
                      <span class="text-2xl">{content.emoji}</span>
                      <div>
                        <h6 class="font-medium text-gray-900 dark:text-gray-100 mb-1">
                          {content.title} #{i + 1}
                        </h6>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                          {content.desc}
                        </p>
                        <div class="mt-2 flex gap-2">
                          <span class="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">
                            Item {i + 1}
                          </span>
                          <span class="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick$={closeDialog}
              class="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button onClick$={closeDialog} class="w-full sm:w-auto">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
});
