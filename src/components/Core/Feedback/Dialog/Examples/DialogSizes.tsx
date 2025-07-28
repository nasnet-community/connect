import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "~/components/Core/Feedback/Dialog";
import { Button } from "~/components/Core/button";
import type { DialogSize } from "~/components/Core/Feedback/Dialog/Dialog.types";

export const DialogSizes = component$(() => {
  const isDialogOpen = useSignal(false);
  const selectedSize = useSignal<DialogSize>("md");

  const openDialog = $((size: DialogSize) => {
    selectedSize.value = size;
    isDialogOpen.value = true;
  });

  const closeDialog = $(() => {
    isDialogOpen.value = false;
  });

  return (
    <div class="space-y-4">
      <div class="flex flex-wrap gap-3">
        <Button onClick$={() => openDialog("sm")}>Small Dialog</Button>
        <Button onClick$={() => openDialog("md")}>Medium Dialog</Button>
        <Button onClick$={() => openDialog("lg")}>Large Dialog</Button>
        <Button onClick$={() => openDialog("xl")}>Extra Large Dialog</Button>
        <Button onClick$={() => openDialog("full")}>Full Screen Dialog</Button>
      </div>

      <Dialog
        isOpen={isDialogOpen.value}
        onClose$={closeDialog}
        size={selectedSize.value}
        ariaLabel={`${selectedSize.value} Dialog Example`}
      >
        <DialogHeader>
          {selectedSize.value.toUpperCase()} Size Dialog
        </DialogHeader>
        <DialogBody>
          <p>
            This dialog is set to <strong>{selectedSize.value}</strong> size.
          </p>
          <p class="mt-2">
            You can choose from 5 different sizes: sm, md, lg, xl, and full.
          </p>
          <p class="mt-2">
            The size affects the width and maximum width of the dialog window.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button onClick$={closeDialog}>Close</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
});
