import { component$, useSignal, $ } from '@builder.io/qwik';
import { 
  Dialog, 
  DialogHeader, 
  DialogBody, 
  DialogFooter 
} from './Dialog';
import { DialogSize } from './Dialog.types';

export default component$(() => {
  // Dialog states
  const isBasicDialogOpen = useSignal(false);
  const isCustomDialogOpen = useSignal(false);
  const isLongContentDialogOpen = useSignal(false);
  const isFormDialogOpen = useSignal(false);
  const isConfirmationDialogOpen = useSignal(false);
  
  // Form state
  const formState = useSignal({
    name: '',
    email: '',
    message: ''
  });
  
  // Size selection state
  const selectedSize = useSignal<DialogSize>('md');
  
  // Handle form submission
  const handleFormSubmit$ = $(() => {
    // In a real application, you would submit the form data
    console.log('Form submitted:', formState.value);
    alert(`Form submitted with values:\nName: ${formState.value.name}\nEmail: ${formState.value.email}\nMessage: ${formState.value.message}`);
    isFormDialogOpen.value = false;
  });

  // Confirmation dialog result
  const confirmationResult = useSignal<string | null>(null);
  const handleConfirm$ = $(() => {
    confirmationResult.value = 'Confirmed';
    isConfirmationDialogOpen.value = false;
  });
  
  const handleCancel$ = $(() => {
    confirmationResult.value = 'Cancelled';
    isConfirmationDialogOpen.value = false;
  });
  
  return (
    <div class="space-y-8 p-6">
      <h2 class="text-xl font-semibold mb-4">Dialog Component Examples</h2>
      
      {/* Basic Dialog */}
      <section class="space-y-4">
        <h3 class="text-lg font-medium">Basic Dialog</h3>
        <p class="text-gray-600 dark:text-gray-300">
          A simple dialog with default configuration.
        </p>
        
        <button
          onClick$={() => isBasicDialogOpen.value = true}
          class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
        >
          Open Basic Dialog
        </button>
        
        <Dialog
          isOpen={isBasicDialogOpen.value}
          onClose$={() => isBasicDialogOpen.value = false}
          title="Basic Dialog"
        >
          <DialogBody>
            <p>This is a basic dialog with default configuration.</p>
            <p class="mt-2">Dialogs are useful for displaying content that requires the user's attention or interaction.</p>
          </DialogBody>
          <DialogFooter>
            <button
              onClick$={() => isBasicDialogOpen.value = false}
              class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
            >
              Close
            </button>
          </DialogFooter>
        </Dialog>
      </section>
      
      {/* Dialog Sizes */}
      <section class="space-y-4">
        <h3 class="text-lg font-medium">Dialog Sizes</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Dialogs come in different sizes to accommodate different content needs.
        </p>
        
        <div class="flex flex-wrap gap-3">
          {(['sm', 'md', 'lg', 'xl', 'full'] as DialogSize[]).map((size) => (
            <button
              key={size}
              onClick$={() => {
                selectedSize.value = size;
                isCustomDialogOpen.value = true;
              }}
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              {size.toUpperCase()} Size
            </button>
          ))}
        </div>
        
        <Dialog
          isOpen={isCustomDialogOpen.value}
          onClose$={() => isCustomDialogOpen.value = false}
          size={selectedSize.value}
        >
          <DialogHeader onClose$={() => isCustomDialogOpen.value = false}>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {selectedSize.value.toUpperCase()} Size Dialog
            </h3>
          </DialogHeader>
          <DialogBody>
            <p>This dialog is set to <strong>{selectedSize.value}</strong> size.</p>
            <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
              <p class="font-medium">Size Recommendations:</p>
              <ul class="list-disc pl-5 mt-2 space-y-1">
                <li><strong>sm:</strong> Simple messages, short forms</li>
                <li><strong>md:</strong> Standard content, forms, alerts</li>
                <li><strong>lg:</strong> Detailed content, complex forms</li>
                <li><strong>xl:</strong> Rich content, multiple sections</li>
                <li><strong>full:</strong> Maximum content space, complex layouts</li>
              </ul>
            </div>
          </DialogBody>
          <DialogFooter>
            <button
              onClick$={() => isCustomDialogOpen.value = false}
              class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors mr-2"
            >
              Close
            </button>
          </DialogFooter>
        </Dialog>
      </section>
      
      {/* Long Content with Scrolling */}
      <section class="space-y-4">
        <h3 class="text-lg font-medium">Scrollable Content</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Dialogs can handle long content with built-in scrolling.
        </p>
        
        <button
          onClick$={() => isLongContentDialogOpen.value = true}
          class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Open Scrollable Dialog
        </button>
        
        <Dialog
          isOpen={isLongContentDialogOpen.value}
          onClose$={() => isLongContentDialogOpen.value = false}
          size="md"
        >
          <DialogHeader onClose$={() => isLongContentDialogOpen.value = false}>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              Terms of Service
            </h3>
          </DialogHeader>
          <DialogBody scrollable={true}>
            <div class="space-y-4">
              <p>Welcome to our service. By using our platform, you agree to these terms, which are designed to create a positive experience for all users.</p>
              
              <h4 class="text-md font-semibold">1. Introduction</h4>
              <p>These Terms of Service govern your use of our platform, including any content, functionality, and services offered.</p>
              <p>By accessing our platform, you agree to be bound by these Terms. If you do not agree, please do not access or use our platform.</p>
              
              <h4 class="text-md font-semibold">2. User Accounts</h4>
              <p>When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the security of your account.</p>
              <p>You are responsible for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.</p>
              
              <h4 class="text-md font-semibold">3. Content Standards</h4>
              <p>You may not post content that is illegal, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable.</p>
              <p>You may not impersonate any person or entity or misrepresent your affiliation with a person or entity.</p>
              
              <h4 class="text-md font-semibold">4. Intellectual Property</h4>
              <p>Our platform and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
              
              <h4 class="text-md font-semibold">5. Termination</h4>
              <p>We may terminate or suspend your account and access to our platform immediately, without prior notice or liability, for any reason.</p>
              <p>If you wish to terminate your account, you may simply discontinue using our platform or contact us to request account deletion.</p>
              
              <h4 class="text-md font-semibold">6. Limitation of Liability</h4>
              <p>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our platform.</p>
              
              <h4 class="text-md font-semibold">7. Changes to Terms</h4>
              <p>We reserve the right to modify these terms at any time. We will provide notice of significant changes to these terms.</p>
              <p>By continuing to access or use our platform after any revisions become effective, you agree to be bound by the revised terms.</p>
              
              <h4 class="text-md font-semibold">8. Governing Law</h4>
              <p>These terms shall be governed by and construed in accordance with the laws of our jurisdiction, without regard to its conflict of law provisions.</p>
              
              <h4 class="text-md font-semibold">9. Contact Us</h4>
              <p>If you have any questions about these Terms, please contact us at support@example.com.</p>
            </div>
          </DialogBody>
          <DialogFooter>
            <div class="flex justify-end gap-3">
              <button
                onClick$={() => isLongContentDialogOpen.value = false}
                class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
              >
                Decline
              </button>
              <button
                onClick$={() => isLongContentDialogOpen.value = false}
                class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
              >
                Accept
              </button>
            </div>
          </DialogFooter>
        </Dialog>
      </section>
      
      {/* Form in Dialog */}
      <section class="space-y-4">
        <h3 class="text-lg font-medium">Form in Dialog</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Dialogs are perfect for containing forms and capturing user input.
        </p>
        
        <button
          onClick$={() => isFormDialogOpen.value = true}
          class="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
        >
          Open Form Dialog
        </button>
        
        <Dialog
          isOpen={isFormDialogOpen.value}
          onClose$={() => isFormDialogOpen.value = false}
          size="md"
          closeOnOutsideClick={false}
        >
          <DialogHeader onClose$={() => isFormDialogOpen.value = false}>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              Contact Form
            </h3>
          </DialogHeader>
          <DialogBody>
            <form id="contact-form" preventdefault:submit class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  value={formState.value.name}
                  onInput$={(_, el) => formState.value = { ...formState.value, name: el.value }}
                  required
                />
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  value={formState.value.email}
                  onInput$={(_, el) => formState.value = { ...formState.value, email: el.value }}
                  required
                />
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  value={formState.value.message}
                  onInput$={(_, el) => formState.value = { ...formState.value, message: el.value }}
                  required
                ></textarea>
              </div>
            </form>
          </DialogBody>
          <DialogFooter>
            <div class="flex justify-end gap-3">
              <button
                type="button"
                class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                onClick$={() => isFormDialogOpen.value = false}
              >
                Cancel
              </button>
              <button
                type="button"
                class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                onClick$={handleFormSubmit$}
              >
                Submit
              </button>
            </div>
          </DialogFooter>
        </Dialog>
      </section>
      
      {/* Confirmation Dialog */}
      <section class="space-y-4">
        <h3 class="text-lg font-medium">Confirmation Dialog</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Use dialogs to confirm important user actions before proceeding.
        </p>
        
        <div class="flex flex-col gap-4">
          <button
            onClick$={() => isConfirmationDialogOpen.value = true}
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors w-fit"
          >
            Delete Item
          </button>
          
          {confirmationResult.value && (
            <div class={`mt-2 p-3 rounded-md ${confirmationResult.value === 'Confirmed' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}>
              Action {confirmationResult.value}: {confirmationResult.value === 'Confirmed' ? 'Item has been deleted' : 'Operation cancelled'}
            </div>
          )}
        </div>
        
        <Dialog
          isOpen={isConfirmationDialogOpen.value}
          onClose$={() => isConfirmationDialogOpen.value = false}
          size="sm"
          closeOnOutsideClick={false}
        >
          <DialogHeader onClose$={() => isConfirmationDialogOpen.value = false}>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              Confirm Deletion
            </h3>
          </DialogHeader>
          <DialogBody>
            <div class="flex items-start">
              <div class="flex-shrink-0 text-red-500">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Are you sure you want to delete this item? This action cannot be undone.
                </p>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <div class="flex justify-end gap-3">
              <button
                type="button"
                class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                onClick$={handleCancel$}
              >
                Cancel
              </button>
              <button
                type="button"
                class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                onClick$={handleConfirm$}
              >
                Delete
              </button>
            </div>
          </DialogFooter>
        </Dialog>
      </section>
      
      {/* Accessibility Information */}
      <section class="mt-12 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 class="text-lg font-medium text-blue-800 dark:text-blue-200">Accessibility Features</h3>
        <ul class="list-disc ml-5 mt-3 text-blue-700 dark:text-blue-300 space-y-2">
          <li>
            <strong>Keyboard Navigation:</strong> Close with Escape key, and focus is trapped within the dialog
          </li>
          <li>
            <strong>Focus Management:</strong> Focus is automatically moved into the dialog when opened and restored to the triggering element when closed
          </li>
          <li>
            <strong>ARIA Attributes:</strong> Proper <code class="bg-blue-100 dark:bg-blue-800/50 px-1 rounded">role="dialog"</code> and <code class="bg-blue-100 dark:bg-blue-800/50 px-1 rounded">aria-modal="true"</code> for screen readers
          </li>
          <li>
            <strong>Scrolling Content:</strong> Dialog body content scrolls while header and footer remain fixed
          </li>
          <li>
            <strong>Background Scroll Lock:</strong> Page scrolling is disabled when dialog is open to maintain focus
          </li>
        </ul>
      </section>
    </div>
  );
});
