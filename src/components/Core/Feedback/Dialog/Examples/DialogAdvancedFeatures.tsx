import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "~/components/Core/Feedback/Dialog";
import { Button } from "~/components/Core/button";

export const DialogAdvancedFeatures = component$(() => {
  const isScrollableDialogOpen = useSignal(false);
  const isFormDialogOpen = useSignal(false);

  // Form state
  const formState = useSignal({
    name: "",
    email: "",
    message: "",
  });

  // Handlers
  const openScrollableDialog = $(() => {
    isScrollableDialogOpen.value = true;
  });

  const closeScrollableDialog = $(() => {
    isScrollableDialogOpen.value = false;
  });

  const openFormDialog = $(() => {
    isFormDialogOpen.value = true;
  });

  const closeFormDialog = $(() => {
    isFormDialogOpen.value = false;
  });

  const submitForm = $(() => {
    // In a real app, you would process the form data here
    console.log("Form submitted:", formState.value);
    closeFormDialog();

    // Reset form
    formState.value = {
      name: "",
      email: "",
      message: "",
    };
  });

  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-medium">Scrollable Dialog</h3>
        <Button onClick$={openScrollableDialog}>Open Scrollable Dialog</Button>

        <Dialog
          isOpen={isScrollableDialogOpen.value}
          onClose$={closeScrollableDialog}
          scrollable={true}
          size="md"
          ariaLabel="Scrollable Dialog Example"
        >
          <DialogHeader>Scrollable Content</DialogHeader>
          <DialogBody scrollable={true}>
            <div class="space-y-4">
              <p>
                This dialog demonstrates scrollable content when the content
                exceeds the available height.
              </p>

              {/* Generate some long content to demonstrate scrolling */}
              {Array.from({ length: 20 }).map((_, index) => (
                <div
                  key={index}
                  class="rounded bg-gray-100 p-3 dark:bg-gray-700"
                >
                  <h4 class="font-medium">Section {index + 1}</h4>
                  <p>
                    This is a section of content that will make the dialog body
                    scrollable. When there is a lot of content, the dialog body
                    will scroll while keeping the header and footer fixed.
                  </p>
                </div>
              ))}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button onClick$={closeScrollableDialog}>Close</Button>
          </DialogFooter>
        </Dialog>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Form Dialog</h3>
        <Button onClick$={openFormDialog}>Open Form Dialog</Button>

        <Dialog
          isOpen={isFormDialogOpen.value}
          onClose$={closeFormDialog}
          size="md"
          ariaLabel="Form Dialog Example"
          closeOnEsc={false}
          closeOnOutsideClick={false}
        >
          <DialogHeader>Contact Form</DialogHeader>
          <DialogBody>
            <form preventdefault:submit class="space-y-4">
              <div>
                <label
                  for="name"
                  class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formState.value.name}
                  onInput$={(e: any) =>
                    (formState.value = {
                      ...formState.value,
                      name: e.target.value,
                    })
                  }
                  class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  required
                />
              </div>

              <div>
                <label
                  for="email"
                  class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formState.value.email}
                  onInput$={(e: any) =>
                    (formState.value = {
                      ...formState.value,
                      email: e.target.value,
                    })
                  }
                  class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  required
                />
              </div>

              <div>
                <label
                  for="message"
                  class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formState.value.message}
                  onInput$={(e: any) =>
                    (formState.value = {
                      ...formState.value,
                      message: e.target.value,
                    })
                  }
                  class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  required
                ></textarea>
              </div>
            </form>
          </DialogBody>
          <DialogFooter>
            <div class="flex justify-end gap-3">
              <Button variant="outline" onClick$={closeFormDialog}>
                Cancel
              </Button>
              <Button
                onClick$={submitForm}
                disabled={
                  !formState.value.name ||
                  !formState.value.email ||
                  !formState.value.message
                }
              >
                Submit
              </Button>
            </div>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
});
