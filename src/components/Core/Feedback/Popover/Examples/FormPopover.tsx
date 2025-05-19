import { component$, useSignal, $ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Core/Feedback/Popover';

export const FormPopover = component$(() => {
  const isOpen = useSignal(false);
  const name = useSignal('');
  const email = useSignal('');
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
          name.value = '';
          email.value = '';
        }, 300);
      }, 1500);
    }
  });

  return (
    <div class="flex justify-center py-4">
      <Popover 
        trigger="click" 
        isOpen={isOpen.value} 
        onOpenChange$={(open) => isOpen.value = open}
        onOpen$={handleOpen}
        size="lg"
      >
        <PopoverTrigger>
          <button class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors">
            Open Form Popover
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div class="p-4">
            <h4 class="font-semibold text-lg">Contact Form</h4>
            {!submitted.value ? (
              <form onSubmit$={handleSubmit} class="mt-3 space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Name</label>
                  <input 
                    type="text" 
                    value={name.value}
                    onInput$={(e) => name.value = (e.target as HTMLInputElement).value}
                    class="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    value={email.value}
                    onInput$={(e) => email.value = (e.target as HTMLInputElement).value}
                    class="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div class="flex justify-end space-x-2">
                  <button 
                    type="button"
                    onClick$={() => isOpen.value = false}
                    class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </form>
            ) : (
              <div class="mt-3 text-center py-4">
                <p class="text-green-600 font-medium">Thanks for your submission!</p>
                <p class="text-sm text-gray-600 mt-1">We'll contact you soon.</p>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}); 