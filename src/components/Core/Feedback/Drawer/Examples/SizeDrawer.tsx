import { component$, useSignal, $ } from "@builder.io/qwik";
import { Drawer } from "~/components/Core/Feedback/Drawer";
import { Button } from "~/components/Core/button";

export const SizeDrawer = component$(() => {
  const isDrawerOpen = useSignal(false);
  const size = useSignal<"xs" | "sm" | "md" | "lg" | "xl" | "full">("md");

  const openDrawer = $(
    (drawerSize: "xs" | "sm" | "md" | "lg" | "xl" | "full") => {
      size.value = drawerSize;
      isDrawerOpen.value = true;
    },
  );

  const closeDrawer = $(() => {
    isDrawerOpen.value = false;
  });

  return (
    <div class="space-y-4">
      <div class="flex flex-wrap gap-2">
        <Button onClick$={() => openDrawer("xs")}>Extra Small</Button>
        <Button onClick$={() => openDrawer("sm")}>Small</Button>
        <Button onClick$={() => openDrawer("md")}>Medium</Button>
        <Button onClick$={() => openDrawer("lg")}>Large</Button>
        <Button onClick$={() => openDrawer("xl")}>Extra Large</Button>
        <Button onClick$={() => openDrawer("full")}>Full Width</Button>
      </div>

      <Drawer
        isOpen={isDrawerOpen.value}
        onClose$={closeDrawer}
        size={size.value}
      >
        <span q:slot="header">{size.value.toUpperCase()} Size Drawer</span>
        <div class="p-2">
          <p>This drawer is set to the {size.value} size.</p>
          <p class="mt-3">
            Drawers come in various sizes to accommodate different amounts of
            content and different screen sizes.
          </p>
        </div>
      </Drawer>
    </div>
  );
});
