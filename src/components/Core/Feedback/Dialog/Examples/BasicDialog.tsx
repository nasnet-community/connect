import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "~/components/Core/Feedback/Dialog";
import { Button } from "~/components/Core/button";

export const BasicDialog = component$(() => {
  const isDialogOpen = useSignal(false);

  const openDialog = $(() => {
    isDialogOpen.value = true;
  });

  const closeDialog = $(() => {
    isDialogOpen.value = false;
  });

  return (
    <div class="space-y-4">
      <Button onClick$={openDialog}>Open Basic Dialog</Button>

      <Dialog
        isOpen={isDialogOpen.value}
        onClose$={closeDialog}
        ariaLabel="Basic Dialog Example"
      >
        <DialogHeader>Dialog Title</DialogHeader>
        <DialogBody>
          <p>This is a basic dialog with a header, body, and footer.</p>
          <p class="mt-2">
            Dialogs are used to show important information that requires user
            attention or interaction.
          </p>
        </DialogBody>
        <DialogFooter>
          <div class="flex justify-end gap-3">
            <Button variant="outline" onClick$={closeDialog}>
              Cancel
            </Button>
            <Button onClick$={closeDialog}>Confirm</Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
});
