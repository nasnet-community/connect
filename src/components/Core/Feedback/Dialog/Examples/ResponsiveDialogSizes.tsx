import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  type DialogSize,
} from "~/components/Core/Feedback/Dialog";
import { Button } from "~/components/Core/button";

export const ResponsiveDialogSizes = component$(() => {
  const dialogStates = {
    sm: useSignal(false),
    md: useSignal(false),
    lg: useSignal(false),
    xl: useSignal(false),
    full: useSignal(false),
  };

  const openDialog = $((size: DialogSize) => {
    dialogStates[size].value = true;
  });

  const closeDialog = $((size: DialogSize) => {
    dialogStates[size].value = false;
  });

  const sizes: { value: DialogSize; label: string; description: string }[] = [
    {
      value: "sm",
      label: "Small",
      description: "Compact dialogs for simple confirmations",
    },
    {
      value: "md",
      label: "Medium",
      description: "Default size for most use cases",
    },
    {
      value: "lg",
      label: "Large",
      description: "More space for complex forms or content",
    },
    {
      value: "xl",
      label: "Extra Large",
      description: "Maximum width while maintaining margins",
    },
    {
      value: "full",
      label: "Full Width",
      description: "Takes up the full viewport width with margins",
    },
  ];

  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-4 text-lg font-semibold">Responsive Dialog Sizes</h3>
        <p class="mb-6 text-gray-600 dark:text-gray-400">
          All dialog sizes are responsive and adapt to different screen sizes.
          On mobile devices, they automatically switch to fullscreen mode for
          better usability.
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sizes.map((sizeConfig) => (
          <div
            key={sizeConfig.value}
            class="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
          >
            <h4 class="mb-2 font-medium">{sizeConfig.label}</h4>
            <p class="mb-3 text-sm text-gray-600 dark:text-gray-400">
              {sizeConfig.description}
            </p>
            <Button
              size="sm"
              onClick$={() => openDialog(sizeConfig.value)}
              class="w-full"
            >
              Open {sizeConfig.label}
            </Button>
          </div>
        ))}
      </div>

      {/* Dialog instances for each size */}
      {sizes.map((sizeConfig) => (
        <Dialog
          key={sizeConfig.value}
          isOpen={dialogStates[sizeConfig.value].value}
          onClose$={() => closeDialog(sizeConfig.value)}
          size={sizeConfig.value}
          ariaLabel={`${sizeConfig.label} Dialog Example`}
        >
          <DialogHeader onClose$={() => closeDialog(sizeConfig.value)}>
            <h3 class="text-lg font-semibold">
              {sizeConfig.label} Dialog ({sizeConfig.value})
            </h3>
          </DialogHeader>

          <DialogBody>
            <div class="space-y-4">
              <div class="rounded-lg bg-primary-50 p-4 dark:bg-primary-900/20">
                <p class="mb-2 text-sm font-medium text-primary-800 dark:text-primary-200">
                  Responsive Behavior:
                </p>
                <ul class="space-y-1 text-sm text-primary-700 dark:text-primary-300">
                  <li>• Mobile: Full screen with slide animation</li>
                  <li>
                    • Tablet:{" "}
                    {sizeConfig.value === "full"
                      ? "Full width"
                      : "Centered with constrained width"}
                  </li>
                  <li>
                    • Desktop:{" "}
                    {sizeConfig.value === "full"
                      ? "Full width with margins"
                      : `Max width: ${sizeConfig.value}`}
                  </li>
                </ul>
              </div>

              <p>
                This is a <strong>{sizeConfig.label}</strong> dialog
                demonstrating the responsive sizing behavior. The dialog
                automatically adapts to different screen sizes while maintaining
                optimal readability and usability.
              </p>

              {sizeConfig.value === "lg" ||
              sizeConfig.value === "xl" ||
              sizeConfig.value === "full" ? (
                <div class="grid gap-4 sm:grid-cols-2">
                  <div class="rounded bg-gray-100 p-4 dark:bg-gray-800">
                    <h5 class="mb-2 font-medium">Column 1</h5>
                    <p class="text-sm">
                      Larger dialogs can accommodate multi-column layouts for
                      complex forms or content organization.
                    </p>
                  </div>
                  <div class="rounded bg-gray-100 p-4 dark:bg-gray-800">
                    <h5 class="mb-2 font-medium">Column 2</h5>
                    <p class="text-sm">
                      The layout remains responsive and stacks on smaller
                      screens for optimal mobile experience.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </DialogBody>

          <DialogFooter>
            <div class="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick$={() => closeDialog(sizeConfig.value)}
              >
                Close
              </Button>
              <Button onClick$={() => closeDialog(sizeConfig.value)}>
                Got it
              </Button>
            </div>
          </DialogFooter>
        </Dialog>
      ))}
    </div>
  );
});
