import { component$, useSignal, $ } from "@builder.io/qwik";
import { Drawer } from "~/components/Core/Feedback/Drawer";
import { Button } from "~/components/Core/button";

export const DrawerWithFooter = component$(() => {
  const isDrawerOpen = useSignal(false);

  const openDrawer = $(() => {
    isDrawerOpen.value = true;
  });

  const closeDrawer = $(() => {
    isDrawerOpen.value = false;
  });

  return (
    <div class="space-y-4">
      <Button onClick$={openDrawer}>Open Drawer with Footer</Button>

      <Drawer isOpen={isDrawerOpen.value} onClose$={closeDrawer}>
        <span q:slot="header">Drawer with Footer</span>
        <div class="p-2">
          <p>This drawer includes a footer section with action buttons.</p>
          <p class="mt-3">
            Adding a footer is useful for drawers that require user actions or
            decisions, such as forms or confirmation dialogs.
          </p>
        </div>
        <div
          q:slot="footer"
          class="flex justify-end gap-2 border-t border-gray-200 p-4 dark:border-gray-700"
        >
          <Button onClick$={closeDrawer} variant="outline">
            Cancel
          </Button>
          <Button onClick$={closeDrawer}>Save</Button>
        </div>
      </Drawer>
    </div>
  );
});
