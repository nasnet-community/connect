import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  Modal,
} from "../Modal";

/**
 * ModalAdvancedFeatures - Comprehensive showcase of all advanced Modal features
 * 
 * This component demonstrates:
 * 1. Animation variants (fade, scale, slide)
 * 2. Backdrop variants (light, medium, dark)
 * 3. Elevation levels (none, low, medium, high, elevated)
 * 4. ARIA accessibility features
 * 5. Focus management and initial focus element
 * 6. Custom callbacks and event handling
 * 7. Z-index stacking for multiple modals
 * 8. Accessibility best practices
 * 9. Custom styling and configuration options
 */
export const ModalAdvancedFeatures = component$(() => {
  // Animation showcase signals
  const showFadeModal = useSignal(false);
  const showScaleModal = useSignal(false);
  const showSlideModal = useSignal(false);

  // Backdrop showcase signals  
  const showLightBackdrop = useSignal(false);
  const showMediumBackdrop = useSignal(false);
  const showDarkBackdrop = useSignal(false);

  // Elevation showcase signals
  const showElevationNone = useSignal(false);
  const showElevationLow = useSignal(false);
  const showElevationMedium = useSignal(false);
  const showElevationHigh = useSignal(false);
  const showElevationElevated = useSignal(false);

  // ARIA and accessibility showcase signals
  const showAriaModal = useSignal(false);
  const showFocusModal = useSignal(false);
  const showAccessibilityModal = useSignal(false);

  // Advanced features signals
  const showStackingModal = useSignal(false);
  const showNestedModal = useSignal(false);
  const showCustomCallbackModal = useSignal(false);

  // State tracking for demonstrations
  const modalOpenCount = useSignal(0);
  const lastAction = useSignal<string>("");

  /**
   * Demonstrates onOpenChange callback functionality
   * Tracks modal state changes and user interactions
   */
  const handleModalOpenChange = $((isOpen: boolean, modalName: string) => {
    if (isOpen) {
      modalOpenCount.value++;
      lastAction.value = `Opened ${modalName} (Total opens: ${modalOpenCount.value})`;
    } else {
      lastAction.value = `Closed ${modalName}`;
    }
  });

  /**
   * Enhanced close handlers with logging for demonstration
   */
  const createCloseHandler = (modalName: string, signal: any) => $(() => {
    signal.value = false;
    lastAction.value = `${modalName} closed via close handler`;
  });

  return (
    <div class="space-y-8 p-6">
      <div class="space-y-4">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Modal Advanced Features Showcase
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Comprehensive demonstration of all Modal component capabilities including animations, 
          accessibility features, and advanced configuration options.
        </p>
        
        {/* Status Display */}
        <div class="rounded-lg bg-surface-light-secondary dark:bg-surface-dark-DEFAULT p-4">
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Last Action: <span class="text-primary-600 dark:text-primary-400">{lastAction.value || "None"}</span>
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Total Modal Opens: {modalOpenCount.value}
          </p>
        </div>
      </div>

      {/* Animation Variants Section */}
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Animation Variants
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          Different animation styles for modal entrance and exit. All animations respect 
          user's motion preferences and can be disabled for accessibility.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <button
              type="button"
              onClick$={() => showFadeModal.value = true}
              class="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Fade Animation
            </button>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Smooth opacity transition (default for low-motion preferences)
            </p>
          </div>

          <div class="space-y-2">
            <button
              type="button"
              onClick$={() => showScaleModal.value = true}
              class="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Scale Animation
            </button>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Scale up from center (default animation)
            </p>
          </div>

          <div class="space-y-2">
            <button
              type="button"
              onClick$={() => showSlideModal.value = true}
              class="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Slide Animation
            </button>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Slide up from bottom (mobile-friendly)
            </p>
          </div>
        </div>
      </section>

      {/* Backdrop Variants Section */}
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Backdrop Variants
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          Control backdrop darkness to match your design needs and improve content visibility.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <button
              type="button"
              onClick$={() => showLightBackdrop.value = true}
              class="w-full rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Light Backdrop
            </button>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Subtle overlay for minimal distraction
            </p>
          </div>

          <div class="space-y-2">
            <button
              type="button"
              onClick$={() => showMediumBackdrop.value = true}
              class="w-full rounded-lg bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Medium Backdrop
            </button>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Balanced contrast (default setting)
            </p>
          </div>

          <div class="space-y-2">
            <button
              type="button"
              onClick$={() => showDarkBackdrop.value = true}
              class="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Dark Backdrop
            </button>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Strong overlay for maximum focus
            </p>
          </div>
        </div>
      </section>

      {/* Elevation Levels Section */}
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Elevation Levels
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          Different shadow depths create visual hierarchy and depth perception.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
          {([
            { level: "none", label: "None", description: "Flat appearance" },
            { level: "low", label: "Low", description: "Subtle depth" },
            { level: "medium", label: "Medium", description: "Moderate depth" },
            { level: "high", label: "High", description: "Strong depth" },
            { level: "elevated", label: "Elevated", description: "Maximum depth (default)" },
          ] as const).map((elevation) => (
            <div key={elevation.level} class="space-y-2">
              <button
                type="button"
                onClick$={() => {
                  if (elevation.level === "none") showElevationNone.value = true;
                  else if (elevation.level === "low") showElevationLow.value = true;
                  else if (elevation.level === "medium") showElevationMedium.value = true;
                  else if (elevation.level === "high") showElevationHigh.value = true;
                  else if (elevation.level === "elevated") showElevationElevated.value = true;
                }}
                class={[
                  "w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  "bg-surface-light-DEFAULT dark:bg-surface-dark-secondary",
                  "text-gray-900 dark:text-gray-50",
                  "hover:bg-surface-light-secondary dark:hover:bg-surface-dark-DEFAULT",
                  "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                  "dark:focus:ring-offset-gray-800",
                  // Apply shadow preview
                  elevation.level === "none" ? "" :
                  elevation.level === "low" ? "shadow-sm dark:shadow-dark-sm" :
                  elevation.level === "medium" ? "shadow-md dark:shadow-dark-md" :
                  elevation.level === "high" ? "shadow-lg dark:shadow-dark-lg" :
                  "shadow-xl dark:shadow-dark-xl"
                ].join(" ")}
              >
                {elevation.label}
              </button>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {elevation.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ARIA and Accessibility Section */}
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          ARIA & Accessibility Features
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          Comprehensive accessibility support including ARIA labels, focus management, 
          and keyboard navigation.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <button
              type="button"
              onClick$={() => showAriaModal.value = true}
              class="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              ARIA Description
            </button>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Modal with aria-describedby for screen readers
            </p>
          </div>

          <div class="space-y-2">
            <button
              type="button"
              onClick$={() => showFocusModal.value = true}
              class="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Initial Focus
            </button>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Auto-focus specific element on open
            </p>
          </div>

          <div class="space-y-2">
            <button
              type="button"
              onClick$={() => showAccessibilityModal.value = true}
              class="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Reduced Motion
            </button>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Disabled animations for accessibility
            </p>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Advanced Features
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          Complex scenarios including modal stacking, callbacks, and custom configurations.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <button
              type="button"
              onClick$={() => showStackingModal.value = true}
              class="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Modal Stacking
            </button>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Multiple modals with proper z-index management
            </p>
          </div>

          <div class="space-y-2">
            <button
              type="button"
              onClick$={() => showCustomCallbackModal.value = true}
              class="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Custom Callbacks
            </button>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              onOpenChange tracking and logging
            </p>
          </div>

          <div class="space-y-2">
            <button
              type="button"
              disabled
              class="w-full rounded-lg bg-gray-400 px-4 py-2 text-sm font-medium text-gray-700 cursor-not-allowed"
            >
              More Features
            </button>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Additional advanced features coming soon
            </p>
          </div>
        </div>
      </section>

      {/* Animation Variants Modals */}
      <Modal
        isOpen={showFadeModal.value}
        onClose={createCloseHandler("Fade Modal", showFadeModal)}
        title="Fade Animation Demo"
        animationVariant="fade"
        size="md"
        ariaDescription="Modal demonstrating fade animation variant with smooth opacity transitions"
        onOpenChange={$((isOpen) => handleModalOpenChange(isOpen, "Fade Animation Modal"))}
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            This modal uses the <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">fade</code> animation variant.
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            The fade animation provides smooth opacity transitions and is the most accessible option,
            automatically used when users have reduced motion preferences enabled.
          </p>
          <div class="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4">
            <h4 class="text-sm font-medium text-blue-900 dark:text-blue-300">Best Use Cases:</h4>
            <ul class="mt-2 text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Accessibility-first applications</li>
              <li>• Professional/business interfaces</li>
              <li>• When subtle animations are preferred</li>
            </ul>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showScaleModal.value}
        onClose={createCloseHandler("Scale Modal", showScaleModal)}
        title="Scale Animation Demo"
        animationVariant="scale"
        size="md"
        ariaDescription="Modal demonstrating scale animation variant with zoom effects"
        onOpenChange={$((isOpen) => handleModalOpenChange(isOpen, "Scale Animation Modal"))}
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            This modal uses the <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">scale</code> animation variant (default).
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            The scale animation creates a zoom effect from the center, providing a modern and 
            engaging user experience while maintaining good accessibility.
          </p>
          <div class="rounded-lg bg-green-50 dark:bg-green-900/20 p-4">
            <h4 class="text-sm font-medium text-green-900 dark:text-green-300">Best Use Cases:</h4>
            <ul class="mt-2 text-sm text-green-800 dark:text-green-200 space-y-1">
              <li>• General-purpose modals</li>
              <li>• Confirmation dialogs</li>
              <li>• Form presentations</li>
            </ul>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showSlideModal.value}
        onClose={createCloseHandler("Slide Modal", showSlideModal)}
        title="Slide Animation Demo"
        animationVariant="slide"
        size="md"
        ariaDescription="Modal demonstrating slide animation variant with upward motion"
        onOpenChange={$((isOpen) => handleModalOpenChange(isOpen, "Slide Animation Modal"))}
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            This modal uses the <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">slide</code> animation variant.
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            The slide animation moves the modal upward from the bottom, creating a natural
            mobile-like experience that works well on both mobile and desktop.
          </p>
          <div class="rounded-lg bg-purple-50 dark:bg-purple-900/20 p-4">
            <h4 class="text-sm font-medium text-purple-900 dark:text-purple-300">Best Use Cases:</h4>
            <ul class="mt-2 text-sm text-purple-800 dark:text-purple-200 space-y-1">
              <li>• Mobile-first applications</li>
              <li>• Bottom sheet alternatives</li>
              <li>• Action confirmations</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Backdrop Variants Modals */}
      <Modal
        isOpen={showLightBackdrop.value}
        onClose={createCloseHandler("Light Backdrop Modal", showLightBackdrop)}
        title="Light Backdrop Demo"
        backdropVariant="light"
        size="md"
        ariaDescription="Modal demonstrating light backdrop variant for minimal visual interference"
        onOpenChange={$((isOpen) => handleModalOpenChange(isOpen, "Light Backdrop Modal"))}
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            This modal uses the <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">light</code> backdrop variant.
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            The light backdrop provides minimal visual interference while still indicating 
            that the background content is not interactive.
          </p>
          <div class="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 p-4">
            <h4 class="text-sm font-medium text-yellow-900 dark:text-yellow-300">When to Use:</h4>
            <ul class="mt-2 text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
              <li>• When background content should remain visible</li>
              <li>• Non-critical information modals</li>
              <li>• Lightweight notifications</li>
            </ul>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showMediumBackdrop.value}
        onClose={createCloseHandler("Medium Backdrop Modal", showMediumBackdrop)}
        title="Medium Backdrop Demo"
        backdropVariant="medium"
        size="md"
        ariaDescription="Modal demonstrating medium backdrop variant for balanced visual emphasis"
        onOpenChange={$((isOpen) => handleModalOpenChange(isOpen, "Medium Backdrop Modal"))}
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            This modal uses the <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">medium</code> backdrop variant (default).
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            The medium backdrop provides balanced contrast between the modal and background,
            offering good focus without being too aggressive.
          </p>
          <div class="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4">
            <h4 class="text-sm font-medium text-blue-900 dark:text-blue-300">When to Use:</h4>
            <ul class="mt-2 text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Most general-purpose modals</li>
              <li>• Form dialogs</li>
              <li>• Standard confirmations</li>
            </ul>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showDarkBackdrop.value}
        onClose={createCloseHandler("Dark Backdrop Modal", showDarkBackdrop)}
        title="Dark Backdrop Demo"
        backdropVariant="dark"
        size="md"
        ariaDescription="Modal demonstrating dark backdrop variant for maximum focus and attention"
        onOpenChange={$((isOpen) => handleModalOpenChange(isOpen, "Dark Backdrop Modal"))}
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            This modal uses the <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">dark</code> backdrop variant.
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            The dark backdrop creates maximum focus by strongly dimming the background,
            ideal for critical actions or when complete attention is required.
          </p>
          <div class="rounded-lg bg-red-50 dark:bg-red-900/20 p-4">
            <h4 class="text-sm font-medium text-red-900 dark:text-red-300">When to Use:</h4>
            <ul class="mt-2 text-sm text-red-800 dark:text-red-200 space-y-1">
              <li>• Critical confirmations</li>
              <li>• Destructive actions</li>
              <li>• Media viewers/galleries</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Elevation Modals */}
      <Modal
        isOpen={showElevationNone.value}
        onClose={createCloseHandler("No Elevation Modal", showElevationNone)}
        title="No Elevation Demo"
        elevation="none"
        size="md"
        ariaDescription="Modal demonstrating no elevation for flat design aesthetics"
        onOpenChange={$((isOpen) => handleModalOpenChange(isOpen, "No Elevation Modal"))}
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            This modal has <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">elevation="none"</code>.
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            No shadow creates a flat appearance that works well in minimalist designs 
            or when the backdrop provides sufficient visual separation.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={showElevationLow.value}
        onClose={createCloseHandler("Low Elevation Modal", showElevationLow)}
        title="Low Elevation Demo"
        elevation="low"
        size="md"
        ariaDescription="Modal demonstrating low elevation for subtle depth"
        onOpenChange={$((isOpen) => handleModalOpenChange(isOpen, "Low Elevation Modal"))}
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            This modal has <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">elevation="low"</code>.
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            Low elevation provides subtle depth without being visually overwhelming.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={showElevationMedium.value}
        onClose={createCloseHandler("Medium Elevation Modal", showElevationMedium)}
        title="Medium Elevation Demo"
        elevation="medium"
        size="md"
        ariaDescription="Modal demonstrating medium elevation for moderate depth"
        onOpenChange={$((isOpen) => handleModalOpenChange(isOpen, "Medium Elevation Modal"))}
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            This modal has <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">elevation="medium"</code>.
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            Medium elevation creates noticeable depth for standard modal presentations.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={showElevationHigh.value}
        onClose={createCloseHandler("High Elevation Modal", showElevationHigh)}
        title="High Elevation Demo"
        elevation="high"
        size="md"
        ariaDescription="Modal demonstrating high elevation for strong depth"
        onOpenChange={$((isOpen) => handleModalOpenChange(isOpen, "High Elevation Modal"))}
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            This modal has <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">elevation="high"</code>.
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            High elevation creates strong depth for important content that needs emphasis.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={showElevationElevated.value}
        onClose={createCloseHandler("Elevated Modal", showElevationElevated)}
        title="Elevated Demo"
        elevation="elevated"
        size="md"
        ariaDescription="Modal demonstrating elevated level for maximum depth"
        onOpenChange={$((isOpen) => handleModalOpenChange(isOpen, "Elevated Modal"))}
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            This modal has <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">elevation="elevated"</code> (default).
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            Elevated provides maximum depth and prominence for critical modal content.
          </p>
        </div>
      </Modal>

      {/* ARIA and Accessibility Modals */}
      <Modal
        isOpen={showAriaModal.value}
        onClose={createCloseHandler("ARIA Modal", showAriaModal)}
        title="ARIA Description Demo"
        size="md"
        ariaDescription="This modal demonstrates the use of aria-describedby for providing additional context to screen reader users. The description explains the modal's purpose and content structure, helping users understand what they can expect to find within."
        onOpenChange={$((isOpen) => handleModalOpenChange(isOpen, "ARIA Description Modal"))}
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            This modal includes an <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">ariaDescription</code> 
            that provides context for screen reader users.
          </p>
          <div class="rounded-lg bg-green-50 dark:bg-green-900/20 p-4">
            <h4 class="text-sm font-medium text-green-900 dark:text-green-300">Accessibility Features:</h4>
            <ul class="mt-2 text-sm text-green-800 dark:text-green-200 space-y-1">
              <li>• <strong>aria-describedby:</strong> Links to descriptive text</li>
              <li>• <strong>aria-labelledby:</strong> Links to modal title</li>
              <li>• <strong>aria-modal:</strong> Indicates modal behavior</li>
              <li>• <strong>role="document":</strong> Defines content area</li>
            </ul>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Screen readers will announce the description when the modal opens, providing 
            context about the modal's content and purpose.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={showFocusModal.value}
        onClose={createCloseHandler("Focus Modal", showFocusModal)}
        title="Initial Focus Demo"
        size="md"
        initialFocusElement="#focus-target"
        ariaDescription="Modal demonstrating automatic focus management with a specific target element"
        onOpenChange={$((isOpen) => handleModalOpenChange(isOpen, "Initial Focus Modal"))}
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            This modal automatically focuses on a specific element when opened using the{" "}
            <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">initialFocusElement</code> prop.
          </p>
          
          <div class="space-y-3">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Regular Input:
            </label>
            <input
              type="text"
              class="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="This input is not auto-focused"
            />
            
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Auto-Focused Input:
            </label>
            <input
              id="focus-target"
              type="text"
              class="w-full rounded-md border border-primary-300 dark:border-primary-600 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100 ring-2 ring-primary-500"
              placeholder="This input receives initial focus"
            />
          </div>

          <div class="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4">
            <h4 class="text-sm font-medium text-blue-900 dark:text-blue-300">Focus Management Benefits:</h4>
            <ul class="mt-2 text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Improved keyboard navigation</li>
              <li>• Better screen reader experience</li>
              <li>• Reduced cognitive load for users</li>
              <li>• Compliance with WCAG guidelines</li>
            </ul>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showAccessibilityModal.value}
        onClose={createCloseHandler("Accessibility Modal", showAccessibilityModal)}
        title="Reduced Motion Demo"
        size="md"
        disableAnimation={true}
        ariaDescription="Modal demonstrating disabled animations for users with motion sensitivity"
        onOpenChange={$((isOpen) => handleModalOpenChange(isOpen, "Accessibility Modal"))}
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            This modal has <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">disableAnimation={true}</code> 
            to respect users with motion sensitivity.
          </p>
          
          <div class="rounded-lg bg-purple-50 dark:bg-purple-900/20 p-4">
            <h4 class="text-sm font-medium text-purple-900 dark:text-purple-300">Accessibility Considerations:</h4>
            <ul class="mt-2 text-sm text-purple-800 dark:text-purple-200 space-y-1">
              <li>• Respects <code>prefers-reduced-motion</code> setting</li>
              <li>• Reduces motion-triggered vestibular disorders</li>
              <li>• Maintains functionality without animations</li>
              <li>• Improves performance on slower devices</li>
            </ul>
          </div>

          <p class="text-sm text-gray-500 dark:text-gray-400">
            The Modal component automatically respects the user's reduced motion preference,
            but you can also explicitly disable animations using the <code>disableAnimation</code> prop.
          </p>
        </div>
      </Modal>

      {/* Advanced Features Modals */}
      <Modal
        isOpen={showStackingModal.value}
        onClose={createCloseHandler("Stacking Modal", showStackingModal)}
        title="Modal Stacking Demo"
        size="lg"
        zIndex={1100}
        ariaDescription="Modal demonstrating z-index stacking with a higher layer modal"
        onOpenChange={$((isOpen) => handleModalOpenChange(isOpen, "Stacking Modal"))}
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            This modal has a higher <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">zIndex={1100}</code> 
            to demonstrate proper modal stacking.
          </p>
          
          <div class="space-y-3">
            <button
              type="button"
              onClick$={() => showNestedModal.value = true}
              class="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
            >
              Open Nested Modal (Higher Z-Index)
            </button>
            
            <div class="rounded-lg bg-orange-50 dark:bg-orange-900/20 p-4">
              <h4 class="text-sm font-medium text-orange-900 dark:text-orange-300">Z-Index Management:</h4>
              <ul class="mt-2 text-sm text-orange-800 dark:text-orange-200 space-y-1">
                <li>• Base modal: z-index 1050 (default)</li>
                <li>• This modal: z-index 1100</li>
                <li>• Nested modal: z-index 1150</li>
                <li>• Each layer properly stacks</li>
              </ul>
            </div>
          </div>

          <p class="text-sm text-gray-500 dark:text-gray-400">
            When working with multiple modals, ensure each successive modal has a higher z-index 
            to maintain proper visual layering.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={showNestedModal.value}
        onClose={createCloseHandler("Nested Modal", showNestedModal)}
        title="Nested Modal"
        size="md"
        zIndex={1150}
        backdropVariant="dark"
        ariaDescription="Nested modal demonstrating higher z-index stacking over the parent modal"
        onOpenChange={$((isOpen) => handleModalOpenChange(isOpen, "Nested Modal"))}
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            This is a nested modal with <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">zIndex={1150}</code>.
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            It appears above the parent modal and uses a dark backdrop for maximum focus.
          </p>
          <div class="text-center">
            <button
              type="button"
              onClick$={() => {
                showNestedModal.value = false;
                showStackingModal.value = false;
              }}
              class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Close Both Modals
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showCustomCallbackModal.value}
        onClose={createCloseHandler("Custom Callback Modal", showCustomCallbackModal)}
        title="Custom Callbacks Demo"
        size="md"
        ariaDescription="Modal demonstrating custom onOpenChange callback functionality"
        onOpenChange={$((isOpen) => {
          handleModalOpenChange(isOpen, "Custom Callback Modal");
          // Additional custom logic can be added here
          if (isOpen) {
            console.log("Custom Callback Modal opened - you can add analytics tracking here");
          } else {
            console.log("Custom Callback Modal closed - cleanup logic can go here");
          }
        })}
      >
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            This modal demonstrates the <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">onOpenChange</code> callback.
          </p>
          
          <div class="rounded-lg bg-indigo-50 dark:bg-indigo-900/20 p-4">
            <h4 class="text-sm font-medium text-indigo-900 dark:text-indigo-300">Callback Use Cases:</h4>
            <ul class="mt-2 text-sm text-indigo-800 dark:text-indigo-200 space-y-1">
              <li>• Analytics tracking</li>
              <li>• State synchronization</li>
              <li>• Custom cleanup logic</li>
              <li>• Parent component updates</li>
            </ul>
          </div>

          <p class="text-sm text-gray-500 dark:text-gray-400">
            Check the status display at the top of the page to see the callback in action.
            The callback fires whenever the modal's open state changes.
          </p>
        </div>
      </Modal>
    </div>
  );
});