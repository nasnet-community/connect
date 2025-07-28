import { component$, useSignal, $ } from "@builder.io/qwik";
import { Drawer } from "~/components/Core/Feedback/Drawer";
import { Button } from "~/components/Core/button";

export const PlacementDrawer = component$(() => {
  const isDrawerOpen = useSignal(false);
  const placement = useSignal<"left" | "right" | "top" | "bottom">("right");

  const openDrawer = $((position: "left" | "right" | "top" | "bottom") => {
    placement.value = position;
    isDrawerOpen.value = true;
  });

  const closeDrawer = $(() => {
    isDrawerOpen.value = false;
  });

  return (
    <div class="space-y-4">
      <div class="flex flex-wrap gap-2">
        <Button onClick$={() => openDrawer("left")}>Left Drawer</Button>
        <Button onClick$={() => openDrawer("right")}>Right Drawer</Button>
        <Button onClick$={() => openDrawer("top")}>Top Drawer</Button>
        <Button onClick$={() => openDrawer("bottom")}>Bottom Drawer</Button>
      </div>

      <Drawer
        isOpen={isDrawerOpen.value}
        onClose$={closeDrawer}
        placement={placement.value}
      >
        <span q:slot="header">
          {placement.value.charAt(0).toUpperCase() + placement.value.slice(1)}{" "}
          Drawer
        </span>
        <div class="p-2">
          <p>
            This drawer is positioned to appear from the {placement.value} of
            the screen.
          </p>
          <p class="mt-3">
            Drawers can be positioned on any of the four sides of the screen
            depending on your application's needs.
          </p>
        </div>
      </Drawer>
    </div>
  );
});
