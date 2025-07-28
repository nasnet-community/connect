import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/Core/Feedback/Popover";

export const FormPopover = component$(() => {
  const isOpen = useSignal(false);
  const name = useSignal("");
  const email = useSignal("");
  const submitted = useSignal(false);

  const handleOpen = $(() => {
    submitted.value = false;
  });

  const handleSubmit = $((e: Event) => {
    e.preventDefault();
    if (name.value && email.value) {
      submitted.value = true;
      // In a real app, you would submit the form data here
      setTimeout(() => {
        isOpen.value = false;
        // Reset form after closing
        setTimeout(() => {
          name.value = "";
          email.value = "";
        }, 300);
      }, 1500);
    }
  });

  return (
    <div class="flex justify-center py-4">
      <Popover
        trigger="click"
        openSignal={isOpen}
        onOpen$={handleOpen}
        size="lg"
      >
        <PopoverTrigger>
          <button class="rounded-md bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600">
            Open Form Popover
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div class="p-4">
            <h4 class="text-lg font-semibold">Contact Form</h4>
            {!submitted.value ? (
              <form onSubmit$={handleSubmit} class="mt-3 space-y-4">
                <div>
                  <label class="mb-1 block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    value={name.value}
                    onInput$={(e) =>
                      (name.value = (e.target as HTMLInputElement).value)
                    }
                    class="w-full rounded-md border p-2"
                    required
                  />
                </div>
                <div>
                  <label class="mb-1 block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={email.value}
                    onInput$={(e) =>
                      (email.value = (e.target as HTMLInputElement).value)
                    }
                    class="w-full rounded-md border p-2"
                    required
                  />
                </div>
                <div class="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick$={() => (isOpen.value = false)}
                    class="rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="rounded-md bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            ) : (
              <div class="mt-3 py-4 text-center">
                <p class="font-medium text-green-600">
                  Thanks for your submission!
                </p>
                <p class="mt-1 text-sm text-gray-600">
                  We'll contact you soon.
                </p>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});
