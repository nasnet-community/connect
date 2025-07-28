import { component$, useSignal, $ } from "@builder.io/qwik";
import { Drawer } from "~/components/Core/Feedback/Drawer";
import { Button } from "~/components/Core/button";

export const BasicDrawer = component$(() => {
  const isDrawerOpen = useSignal(false);

  const openDrawer = $(() => {
    isDrawerOpen.value = true;
  });

  const closeDrawer = $(() => {
    isDrawerOpen.value = false;
  });

  return (
    <div class="space-y-4">
      <Button onClick$={openDrawer}>Open Basic Drawer</Button>

      <Drawer isOpen={isDrawerOpen.value} onClose$={closeDrawer}>
        <span q:slot="header">Drawer Title</span>
        <div class="p-2">
          <p>
            This is a basic drawer with a header, content area, and close
            button.
          </p>
          <p class="mt-3">
            Drawers are used to display supplementary content without navigating
            away from the current context.
          </p>
        </div>
      </Drawer>
    </div>
  );
});
