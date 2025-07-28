import { component$ } from "@builder.io/qwik";

export const Usage = component$(() => {
  return (
    <div class="space-y-8">
      <section>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          Usage Guide
        </h1>
        <p class="text-lg text-gray-700 dark:text-gray-300">
          Learn how to implement and customize the Modal component in your application.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Basic Implementation
        </h2>
        <p class="text-gray-700 dark:text-gray-300">
          The simplest way to use the Modal component requires only the <code class="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">isOpen</code> and <code class="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">onClose</code> props:
        </p>
        <pre class="bg-gray-900 text-gray-50 p-4 rounded-lg overflow-x-auto">
          <code>{`import { component$, useSignal, $ } from "@builder.io/qwik";
import { Modal } from "~/components/Core/Modal";

export const MyComponent = component$(() => {
  const isModalOpen = useSignal(false);

  const handleClose = $(() => {
    isModalOpen.value = false;
  });

  return (
    <>
      <button 
        onClick$={() => (isModalOpen.value = true)}
        class="px-4 py-2 bg-primary-500 text-white rounded"
      >
        Open Modal
      </button>

      <Modal 
        isOpen={isModalOpen.value} 
        onClose={handleClose}
        title="Welcome"
      >
        <p>This is a simple modal dialog.</p>
      </Modal>
    </>
  );
});`}</code>
        </pre>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          With Footer Actions
        </h2>
        <p class="text-gray-700 dark:text-gray-300">
          Add footer actions for user interactions:
        </p>
        <pre class="bg-gray-900 text-gray-50 p-4 rounded-lg overflow-x-auto">
          <code>{`<Modal 
  isOpen={isModalOpen.value} 
  onClose={handleClose}
  title="Confirm Action"
  hasFooter={true}
>
  <p>Are you sure you want to proceed?</p>
  
  <div q:slot="footer">
    <button 
      onClick$={handleClose}
      class="px-4 py-2 border border-gray-300 rounded"
    >
      Cancel
    </button>
    <button 
      onClick$={handleConfirm}
      class="px-4 py-2 bg-primary-500 text-white rounded"
    >
      Confirm
    </button>
  </div>
</Modal>`}</code>
        </pre>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Mobile Optimization
        </h2>
        <p class="text-gray-700 dark:text-gray-300">
          Enable fullscreen mode on mobile devices for better user experience:
        </p>
        <pre class="bg-gray-900 text-gray-50 p-4 rounded-lg overflow-x-auto">
          <code>{`<Modal 
  isOpen={isModalOpen.value} 
  onClose={handleClose}
  title="Mobile Optimized"
  fullscreenOnMobile={true}
  mobileBreakpoint="tablet" // Fullscreen on tablets too
>
  <form class="space-y-4">
    <input 
      type="text" 
      placeholder="Enter your name"
      class="w-full px-3 py-2 border rounded"
    />
    <textarea 
      placeholder="Message"
      rows={4}
      class="w-full px-3 py-2 border rounded"
    />
  </form>
</Modal>`}</code>
        </pre>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Custom Animations
        </h2>
        <p class="text-gray-700 dark:text-gray-300">
          Choose from different animation variants or disable animations entirely:
        </p>
        <pre class="bg-gray-900 text-gray-50 p-4 rounded-lg overflow-x-auto">
          <code>{`// Fade animation
<Modal 
  isOpen={isModalOpen.value} 
  onClose={handleClose}
  animationVariant="fade"
>
  <p>Fades in and out smoothly</p>
</Modal>

// Slide animation
<Modal 
  isOpen={isModalOpen.value} 
  onClose={handleClose}
  animationVariant="slide"
>
  <p>Slides up from bottom</p>
</Modal>

// No animation (for accessibility)
<Modal 
  isOpen={isModalOpen.value} 
  onClose={handleClose}
  disableAnimation={true}
>
  <p>No animation, instant open/close</p>
</Modal>`}</code>
        </pre>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Focus Management
        </h2>
        <p class="text-gray-700 dark:text-gray-300">
          Control which element receives focus when the modal opens:
        </p>
        <pre class="bg-gray-900 text-gray-50 p-4 rounded-lg overflow-x-auto">
          <code>{`<Modal 
  isOpen={isModalOpen.value} 
  onClose={handleClose}
  title="Login"
  initialFocusElement="#username-input"
  ariaDescription="Login to your account"
>
  <form class="space-y-4">
    <input 
      id="username-input"
      type="text" 
      placeholder="Username"
      class="w-full px-3 py-2 border rounded"
    />
    <input 
      type="password" 
      placeholder="Password"
      class="w-full px-3 py-2 border rounded"
    />
  </form>
</Modal>`}</code>
        </pre>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Advanced Styling
        </h2>
        <p class="text-gray-700 dark:text-gray-300">
          Customize the appearance with various style props:
        </p>
        <pre class="bg-gray-900 text-gray-50 p-4 rounded-lg overflow-x-auto">
          <code>{`<Modal 
  isOpen={isModalOpen.value} 
  onClose={handleClose}
  title="Custom Styled Modal"
  size="lg"
  backdropVariant="dark"
  elevation="high"
  centered={false}
  class="custom-modal-class"
  backdropClass="custom-backdrop-class"
>
  <div class="p-8 text-center">
    <p>A highly customized modal appearance</p>
  </div>
</Modal>`}</code>
        </pre>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          State Change Callbacks
        </h2>
        <p class="text-gray-700 dark:text-gray-300">
          React to modal state changes with the <code class="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">onOpenChange</code> callback:
        </p>
        <pre class="bg-gray-900 text-gray-50 p-4 rounded-lg overflow-x-auto">
          <code>{`const handleOpenChange = $((isOpen: boolean) => {
  console.log('Modal is now:', isOpen ? 'open' : 'closed');
  
  if (isOpen) {
    // Track analytics event
    trackEvent('modal_opened');
  } else {
    // Clean up resources
    resetForm();
  }
});

<Modal 
  isOpen={isModalOpen.value} 
  onClose={handleClose}
  onOpenChange={handleOpenChange}
  title="Tracked Modal"
>
  <p>This modal tracks open/close events</p>
</Modal>`}</code>
        </pre>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Best Practices
        </h2>
        <div class="space-y-3">
          <div class="flex gap-3">
            <span class="text-green-600 dark:text-green-400">✓</span>
            <div>
              <strong class="text-gray-900 dark:text-gray-50">Always provide a clear close mechanism</strong>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Users should always have an obvious way to dismiss the modal.
              </p>
            </div>
          </div>
          <div class="flex gap-3">
            <span class="text-green-600 dark:text-green-400">✓</span>
            <div>
              <strong class="text-gray-900 dark:text-gray-50">Use appropriate sizes</strong>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Choose a size that fits your content without overwhelming the screen.
              </p>
            </div>
          </div>
          <div class="flex gap-3">
            <span class="text-green-600 dark:text-green-400">✓</span>
            <div>
              <strong class="text-gray-900 dark:text-gray-50">Optimize for mobile</strong>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Enable fullscreen mode for forms and content-heavy modals on mobile. The component handles safe area insets automatically.
              </p>
            </div>
          </div>
          <div class="flex gap-3">
            <span class="text-green-600 dark:text-green-400">✓</span>
            <div>
              <strong class="text-gray-900 dark:text-gray-50">Add ARIA descriptions</strong>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Provide context for screen reader users with the ariaDescription prop.
              </p>
            </div>
          </div>
          <div class="flex gap-3">
            <span class="text-green-600 dark:text-green-400">✓</span>
            <div>
              <strong class="text-gray-900 dark:text-gray-50">Respect user preferences</strong>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                The component automatically respects reduced motion preferences using motion-safe/motion-reduce variants.
              </p>
            </div>
          </div>
          <div class="flex gap-3">
            <span class="text-green-600 dark:text-green-400">✓</span>
            <div>
              <strong class="text-gray-900 dark:text-gray-50">Focus management</strong>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Use initialFocusElement to control which element receives focus when the modal opens. Defaults to the close button.
              </p>
            </div>
          </div>
          <div class="flex gap-3">
            <span class="text-red-600 dark:text-red-400">✗</span>
            <div>
              <strong class="text-gray-900 dark:text-gray-50">Avoid nested modals</strong>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Multiple stacked modals create a confusing user experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Mobile-Specific Guidelines
        </h2>
        <div class="bg-info-50 dark:bg-info-900/20 p-6 rounded-lg">
          <h3 class="font-semibold text-info-900 dark:text-info-200 mb-4">
            Mobile Optimization Features
          </h3>
          <ul class="space-y-3 text-sm text-info-800 dark:text-info-300">
            <li class="flex gap-2">
              <span class="text-info-600 dark:text-info-400">•</span>
              <div>
                <strong>fullscreenOnMobile:</strong> Automatically makes modals fullscreen on mobile devices for better UX
              </div>
            </li>
            <li class="flex gap-2">
              <span class="text-info-600 dark:text-info-400">•</span>
              <div>
                <strong>Safe Area Support:</strong> Automatically handles notched devices and safe area insets
              </div>
            </li>
            <li class="flex gap-2">
              <span class="text-info-600 dark:text-info-400">•</span>
              <div>
                <strong>Touch Targets:</strong> All interactive elements meet minimum 44px touch target size
              </div>
            </li>
            <li class="flex gap-2">
              <span class="text-info-600 dark:text-info-400">•</span>
              <div>
                <strong>Responsive Breakpoints:</strong> Choose between 'mobile' (640px) or 'tablet' (768px) breakpoints
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Accessibility Guidelines
        </h2>
        <div class="bg-success-50 dark:bg-success-900/20 p-6 rounded-lg">
          <h3 class="font-semibold text-success-900 dark:text-success-200 mb-4">
            Built-in Accessibility Features
          </h3>
          <ul class="space-y-3 text-sm text-success-800 dark:text-success-300">
            <li class="flex gap-2">
              <span class="text-success-600 dark:text-success-400">•</span>
              <div>
                <strong>Native Dialog Element:</strong> Uses HTML dialog for proper focus management and screen reader support
              </div>
            </li>
            <li class="flex gap-2">
              <span class="text-success-600 dark:text-success-400">•</span>
              <div>
                <strong>ARIA Attributes:</strong> Proper aria-modal, aria-labelledby, and aria-describedby support
              </div>
            </li>
            <li class="flex gap-2">
              <span class="text-success-600 dark:text-success-400">•</span>
              <div>
                <strong>Keyboard Navigation:</strong> Full keyboard support with Escape key handling
              </div>
            </li>
            <li class="flex gap-2">
              <span class="text-success-600 dark:text-success-400">•</span>
              <div>
                <strong>Focus Trap:</strong> Focus is properly managed within the modal when open
              </div>
            </li>
            <li class="flex gap-2">
              <span class="text-success-600 dark:text-success-400">•</span>
              <div>
                <strong>Reduced Motion:</strong> Respects prefers-reduced-motion settings automatically
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
});