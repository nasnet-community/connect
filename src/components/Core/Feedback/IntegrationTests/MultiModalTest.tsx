import { component$, useSignal, $ } from "@builder.io/qwik";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "../Dialog";
import { Alert } from "../Alert";
import { useToast } from "../Toast";
import { Button } from "../../button";

/**
 * MultiModalTest - Tests Dialog with Toast notifications and Alert messages
 * 
 * Integration scenarios tested:
 * 1. Dialog containing Alert components
 * 2. Toast notifications triggered from Dialog
 * 3. Z-index layering (Toast over Dialog over backdrop)
 * 4. Focus management between components
 * 5. Theme consistency across components
 */
export const MultiModalTest = component$(() => {
  const isDialogOpen = useSignal(false);
  const showAlert = useSignal(false);
  const alertStatus = useSignal<"info" | "success" | "warning" | "error">("info");
  const toast = useToast();

  const triggerToast = $(async (status: "info" | "success" | "warning" | "error") => {
    await toast[status](`${status.charAt(0).toUpperCase() + status.slice(1)} toast triggered from dialog`, {
      duration: 3000,
      dismissible: true,
      position: "top-right"
    });
  });

  const triggerAllToasts = $(async () => {
    await toast.info("Info toast", { duration: 4000, position: "top-right" });
    setTimeout(async () => {
      await toast.success("Success toast", { duration: 4000, position: "top-right" });
    }, 500);
    setTimeout(async () => {
      await toast.warning("Warning toast", { duration: 4000, position: "top-right" });
    }, 1000);
    setTimeout(async () => {
      await toast.error("Error toast", { duration: 4000, position: "top-right" });
    }, 1500);
  });

  const showAlertWithStatus = $((status: typeof alertStatus.value) => {
    alertStatus.value = status;
    showAlert.value = true;
  });

  return (
    <div class="p-6 space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Multi-Modal Integration Test
        </h2>
        
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          This test demonstrates the interaction between Dialog, Toast, and Alert components.
          It verifies z-index layering, focus management, and theme consistency.
        </p>

        <div class="space-y-4">
          <Button 
            onClick$={() => isDialogOpen.value = true}
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Open Dialog with Integrated Components
          </Button>

          <div class="flex gap-2 flex-wrap">
            <Button
              onClick$={() => triggerToast("info")}
              class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              Trigger Info Toast
            </Button>
            <Button
              onClick$={() => triggerToast("success")}
              class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
            >
              Trigger Success Toast
            </Button>
            <Button
              onClick$={() => triggerToast("warning")}
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
            >
              Trigger Warning Toast
            </Button>
            <Button
              onClick$={() => triggerToast("error")}
              class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Trigger Error Toast
            </Button>
          </div>

          <Button
            onClick$={triggerAllToasts}
            class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            Trigger Sequential Toasts
          </Button>
        </div>
      </div>

      <Dialog
        isOpen={isDialogOpen.value}
        onClose$={() => isDialogOpen.value = false}
        size="lg"
        closeOnOutsideClick={true}
        closeOnEsc={true}
        hasCloseButton={true}
        ariaLabel="Multi-modal integration test dialog"
        zIndex={1000}
      >
        <DialogHeader hasCloseButton onClose$={() => isDialogOpen.value = false}>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Dialog with Integrated Feedback Components
          </h3>
        </DialogHeader>

        <DialogBody class="space-y-4">
          {showAlert.value && (
            <Alert
              status={alertStatus.value}
              title={`${alertStatus.value.charAt(0).toUpperCase() + alertStatus.value.slice(1)} Alert`}
              message="This alert is displayed inside the dialog to test component integration."
              dismissible={true}
              onDismiss$={() => showAlert.value = false}
              size="md"
              variant="solid"
            />
          )}

          <div class="space-y-3">
            <p class="text-gray-700 dark:text-gray-300">
              This dialog contains other feedback components to test integration scenarios:
            </p>

            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 class="font-medium mb-3 text-gray-900 dark:text-gray-100">
                Test Alert Components:
              </h4>
              <div class="flex gap-2 flex-wrap">
                <Button
                  onClick$={() => showAlertWithStatus("info")}
                  class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Show Info Alert
                </Button>
                <Button
                  onClick$={() => showAlertWithStatus("success")}
                  class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  Show Success Alert
                </Button>
                <Button
                  onClick$={() => showAlertWithStatus("warning")}
                  class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                >
                  Show Warning Alert
                </Button>
                <Button
                  onClick$={() => showAlertWithStatus("error")}
                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Show Error Alert
                </Button>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 class="font-medium mb-3 text-gray-900 dark:text-gray-100">
                Test Toast Notifications:
              </h4>
              <div class="flex gap-2 flex-wrap">
                <Button
                  onClick$={() => triggerToast("info")}
                  class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Toast from Dialog
                </Button>
                <Button
                  onClick$={triggerAllToasts}
                  class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
                >
                  Multiple Toasts
                </Button>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Toasts should appear above this dialog (higher z-index)
              </p>
            </div>

            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h5 class="font-medium text-blue-900 dark:text-blue-100 mb-2">
                Integration Test Points:
              </h5>
              <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Alerts render correctly inside dialog content</li>
                <li>• Toasts appear above dialog (z-index management)</li>
                <li>• Focus is managed properly between components</li>
                <li>• Theme colors are consistent across components</li>
                <li>• Dialog remains functional with embedded components</li>
                <li>• Dismissing alerts doesn't affect dialog state</li>
              </ul>
            </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <div class="flex justify-end gap-3">
            <Button
              onClick$={() => {
                showAlert.value = false;
                isDialogOpen.value = false;
              }}
              class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Close & Reset
            </Button>
            <Button
              onClick$={() => isDialogOpen.value = false}
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Close Dialog
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
});