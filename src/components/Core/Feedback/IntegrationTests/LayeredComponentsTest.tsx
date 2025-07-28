import { component$, useSignal, $ } from "@builder.io/qwik";
import { Drawer, DrawerHeader, DrawerContent, DrawerFooter } from "../Drawer";
import { Popover, PopoverTrigger, PopoverContent } from "../Popover";
import { Alert } from "../Alert";
import { ErrorMessage } from "../ErrorMessage";
import { useToast } from "../Toast";
import { Button } from "../../button";

/**
 * LayeredComponentsTest - Tests Popover triggered from within a Drawer
 * 
 * Integration scenarios tested:
 * 1. Popover triggered from within Drawer content
 * 2. Multiple z-index layers (Popover > Drawer > backdrop)
 * 3. Complex focus management across nested components
 * 4. Mobile gesture handling with layered components
 * 5. Accessibility with nested interactive elements
 */
export const LayeredComponentsTest = component$(() => {
  const isDrawerOpen = useSignal(false);
  const isPopoverOpen = useSignal(false);
  const drawerPlacement = useSignal<"left" | "right" | "top" | "bottom">("right");
  const popoverPlacement = useSignal<"top" | "bottom" | "left" | "right">("top");
  const showDrawerAlert = useSignal(false);
  const showPopoverError = useSignal(false);
  const toast = useToast();

  const triggerNestedToast = $(async () => {
    await toast.success("Toast triggered from nested popover!", {
      duration: 3000,
      position: "top-center",
      dismissible: true
    });
  });

  const openDrawer = $((placement: typeof drawerPlacement.value) => {
    drawerPlacement.value = placement;
    isDrawerOpen.value = true;
  });

  const testComplexInteraction = $(async () => {
    // Test complex interaction sequence
    showDrawerAlert.value = true;
    await new Promise(resolve => setTimeout(resolve, 500));
    isPopoverOpen.value = true;
    await new Promise(resolve => setTimeout(resolve, 500));
    showPopoverError.value = true;
    await triggerNestedToast();
  });

  return (
    <div class="p-6 space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Layered Components Integration Test
        </h2>
        
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          This test demonstrates complex layering with Drawer containing Popover components.
          Tests z-index management, focus handling, and mobile gestures.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">
              Drawer Placement Tests
            </h3>
            <div class="grid grid-cols-2 gap-2">
              <Button
                onClick$={() => openDrawer("left")}
                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm"
              >
                Left Drawer
              </Button>
              <Button
                onClick$={() => openDrawer("right")}
                class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm"
              >
                Right Drawer
              </Button>
              <Button
                onClick$={() => openDrawer("top")}
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm"
              >
                Top Drawer
              </Button>
              <Button
                onClick$={() => openDrawer("bottom")}
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm"
              >
                Bottom Drawer
              </Button>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">
              Complex Interaction Tests
            </h3>
            <Button
              onClick$={testComplexInteraction}
              class="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              Test Complex Layer Interaction
            </Button>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Opens drawer → shows alert → opens popover → shows error → triggers toast
            </p>
          </div>
        </div>
      </div>

      <Drawer
        isOpen={isDrawerOpen.value}
        onClose$={() => {
          isDrawerOpen.value = false;
          isPopoverOpen.value = false;
          showDrawerAlert.value = false;
          showPopoverError.value = false;
        }}
        placement={drawerPlacement.value}
        size="md"
        hasOverlay={true}
        closeOnOverlayClick={true}
        closeOnEsc={true}
        trapFocus={true}
        enableSwipeGestures={true}
        showDragHandle={true}
        backdropBlur="medium"
        zIndex={900}
        ariaLabel="Layered components test drawer"
      >
        <DrawerHeader class="border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Drawer with Nested Components
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Placement: {drawerPlacement.value}
          </p>
        </DrawerHeader>

        <DrawerContent class="p-4 space-y-4">
          {showDrawerAlert.value && (
            <Alert
              status="info"
              title="Drawer Alert"
              message="This alert is displayed inside the drawer content."
              dismissible={true}
              onDismiss$={() => showDrawerAlert.value = false}
              size="md"
              variant="subtle"
            />
          )}

          <div class="space-y-4">
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 class="font-medium mb-3 text-gray-900 dark:text-gray-100">
                Popover Integration Test
              </h4>
              
              <div class="space-y-3">
                <Popover
                  isOpen={isPopoverOpen.value}
                  onOpen$={() => isPopoverOpen.value = true}
                  onClose$={() => {
                    isPopoverOpen.value = false;
                    showPopoverError.value = false;
                  }}
                  placement={popoverPlacement.value}
                  trigger="click"
                  hasArrow={true}
                  closeOnOutsideClick={true}
                  closeOnEsc={true}
                  zIndex={1100}
                  mobileFullscreen={false}
                  touchOptimized={true}
                >
                  <PopoverTrigger>
                    <Button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                      Open Popover ({popoverPlacement.value})
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent class="w-80 p-4 space-y-3">
                    <h5 class="font-semibold text-gray-900 dark:text-gray-100">
                      Popover Inside Drawer
                    </h5>
                    
                    {showPopoverError.value && (
                      <ErrorMessage
                        message="This error message is nested inside the popover."
                        title="Nested Error"
                        dismissible={true}
                        onDismiss$={() => showPopoverError.value = false}
                        size="md"
                        variant="subtle"
                      />
                    )}

                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      This popover is triggered from within the drawer and should appear
                      above the drawer overlay.
                    </p>

                    <div class="space-y-2">
                      <Button
                        onClick$={() => showPopoverError.value = !showPopoverError.value}
                        class="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm"
                      >
                        Toggle Error Message
                      </Button>
                      
                      <Button
                        onClick$={triggerNestedToast}
                        class="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm"
                      >
                        Trigger Toast from Popover
                      </Button>
                    </div>

                    <div class="border-t pt-3 text-xs text-gray-500 dark:text-gray-400">
                      <strong>Z-Index Layer Test:</strong>
                      <br />Toast (1200) &gt; Popover (1100) &gt; Drawer (900) &gt; Backdrop
                    </div>
                  </PopoverContent>
                </Popover>

                <div class="flex gap-2 flex-wrap">
                  <Button
                    onClick$={() => { popoverPlacement.value = "top"; }}
                    class={`px-2 py-1 rounded text-xs ${
                      popoverPlacement.value === "top"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Top
                  </Button>
                  <Button
                    onClick$={() => { popoverPlacement.value = "bottom"; }}
                    class={`px-2 py-1 rounded text-xs ${
                      popoverPlacement.value === "bottom"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Bottom
                  </Button>
                  <Button
                    onClick$={() => { popoverPlacement.value = "left"; }}
                    class={`px-2 py-1 rounded text-xs ${
                      popoverPlacement.value === "left"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Left
                  </Button>
                  <Button
                    onClick$={() => { popoverPlacement.value = "right"; }}
                    class={`px-2 py-1 rounded text-xs ${
                      popoverPlacement.value === "right"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Right
                  </Button>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h5 class="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                Layer Testing Checklist:
              </h5>
              <ul class="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                <li>• Popover appears above drawer overlay</li>
                <li>• Focus is trapped correctly in nested components</li>
                <li>• ESC key closes components in correct order</li>
                <li>• Mobile gestures work on drawer without affecting popover</li>
                <li>• Touch interactions are properly isolated</li>
                <li>• Accessibility attributes are maintained</li>
                <li>• Theme consistency across all layers</li>
              </ul>
            </div>
          </div>
        </DrawerContent>

        <DrawerFooter class="border-t border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center">
            <Button
              onClick$={() => showDrawerAlert.value = !showDrawerAlert.value}
              class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm"
            >
              Toggle Drawer Alert
            </Button>
            <Button
              onClick$={() => {
                isDrawerOpen.value = false;
                isPopoverOpen.value = false;
                showDrawerAlert.value = false;
                showPopoverError.value = false;
              }}
              class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Close All
            </Button>
          </div>
        </DrawerFooter>
      </Drawer>
    </div>
  );
});