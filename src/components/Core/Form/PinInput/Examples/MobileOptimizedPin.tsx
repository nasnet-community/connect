import { component$, useSignal, useStore, useVisibleTask$, $ } from "@builder.io/qwik";
import { PinInput } from "../PinInput";

/**
 * Mobile Optimized PIN Example
 * 
 * Demonstrates mobile-first PIN input with haptic feedback, responsive sizing,
 * touch-friendly interfaces, and mobile-specific optimizations.
 */

export default component$(() => {
  // Mobile detection and device state
  const deviceState = useStore({
    isMobile: false,
    isTablet: false,
    screenWidth: 1024,
    isTouch: false,
    supportsHaptics: false,
    deviceOrientation: "portrait" as "portrait" | "landscape",
  });

  // PIN input state
  const pinState = useStore({
    quickPin: "",
    securePin: "",
    customPin: "",
    showCustomKeypad: false,
  });

  const completedPins = useSignal<Array<{ type: string; value: string; time: string }>>([]);

  // Detect device capabilities
  useVisibleTask$(({ cleanup }) => {
    const detectDevice = () => {
      const width = window.innerWidth;
      deviceState.screenWidth = width;
      deviceState.isMobile = width < 768;
      deviceState.isTablet = width >= 768 && width < 1024;
      deviceState.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      deviceState.supportsHaptics = 'vibrate' in navigator;
      deviceState.deviceOrientation = window.innerHeight > window.innerWidth ? "portrait" : "landscape";
    };

    detectDevice();
    
    const resizeHandler = () => detectDevice();
    const orientationHandler = () => {
      setTimeout(detectDevice, 100); // Delay to allow orientation change
    };

    window.addEventListener('resize', resizeHandler);
    window.addEventListener('orientationchange', orientationHandler);
    
    cleanup(() => {
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('orientationchange', orientationHandler);
    });
  });

  // Haptic feedback functions
  const triggerHapticFeedback = $((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!deviceState.supportsHaptics) return;
    
    const patterns = {
      light: 50,
      medium: [50, 50, 50],
      heavy: [100, 30, 100, 30, 100]
    };
    
    navigator.vibrate(patterns[type]);
  });

  // Handle PIN completion with haptic feedback
  const handlePinComplete = $((type: string, value: string) => {
    triggerHapticFeedback('medium');
    
    const timestamp = new Date().toLocaleTimeString();
    completedPins.value = [
      { type, value, time: timestamp },
      ...completedPins.value.slice(0, 4) // Keep last 5
    ];
  });

  // Custom keypad number entry
  const handleKeypadInput = $((digit: string) => {
    if (digit === "clear") {
      pinState.customPin = "";
    } else if (digit === "delete") {
      pinState.customPin = pinState.customPin.slice(0, -1);
    } else if (pinState.customPin.length < 4) {
      pinState.customPin += digit;
      triggerHapticFeedback('light');
      
      // Auto-complete when 4 digits entered
      if (pinState.customPin.length === 4) {
        handlePinComplete("Custom Keypad", pinState.customPin);
      }
    }
  });

  // Get responsive size based on device
  const getResponsiveSize = () => {
    if (deviceState.isMobile) return "lg";
    if (deviceState.isTablet) return "md";
    return "md";
  };

  // Get mobile-optimized placeholder
  const getMobilePlaceholder = (type: "secure" | "normal") => {
    if (!deviceState.isMobile) return "○";
    return type === "secure" ? "●" : "○";
  };

  return (
    <div class="space-y-8 p-4 md:p-6">
      <div class="mb-6">
        <h2 class="mb-2 text-2xl font-bold text-text-default dark:text-text-dark-default">
          Mobile-Optimized PIN Input
        </h2>
        <p class="text-text-secondary dark:text-text-dark-secondary">
          Touch-friendly PIN entry with responsive design, haptic feedback, and mobile-specific optimizations.
        </p>
      </div>

      {/* Device Information */}
      <div class="rounded-lg border border-info-200 dark:border-info-800 bg-info-50 dark:bg-info-950 p-4">
        <h3 class="mb-3 text-sm font-medium text-info-800 dark:text-info-200">
          📱 Device Detection
        </h3>
        <div class="grid gap-2 text-xs text-info-700 dark:text-info-300 md:grid-cols-2">
          <div>Screen: {deviceState.screenWidth}px ({deviceState.isMobile ? "Mobile" : deviceState.isTablet ? "Tablet" : "Desktop"})</div>
          <div>Orientation: {deviceState.deviceOrientation}</div>
          <div>Touch Support: {deviceState.isTouch ? "Yes" : "No"}</div>
          <div>Haptic Feedback: {deviceState.supportsHaptics ? "Available" : "Not Available"}</div>
        </div>
      </div>

      {/* Quick PIN Entry */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default">
          Quick PIN Entry
        </h3>
        <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
          Optimized for fast mobile input with large touch targets and immediate feedback.
        </p>
        
        <div class="max-w-md mx-auto">
          <PinInput
            label="Quick Access PIN"
            value={pinState.quickPin}
            length={4}
            type="numeric"
            size={getResponsiveSize()}
            placeholder={getMobilePlaceholder("normal")}
            onValueChange$={(value) => {
              pinState.quickPin = value;
              if (value.length > 0) {
                triggerHapticFeedback('light');
              }
            }}
            onComplete$={(value) => {
              handlePinComplete("Quick Access", value);
              triggerHapticFeedback('heavy');
            }}
            helperText={
              deviceState.isMobile 
                ? "Tap to enter your PIN or use device keypad"
                : "Enter your 4-digit PIN"
            }
            class={[
              "touch-manipulation",
              deviceState.isMobile && "mobile:min-h-[56px]",
              "transition-all duration-200"
            ].filter(Boolean).join(" ")}
            autoFocus={!deviceState.isMobile} // Don't auto-focus on mobile to prevent keyboard popup
          />
        </div>
      </div>

      {/* Secure PIN with Enhanced Mobile Features */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default">
          Secure PIN Entry
        </h3>
        <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
          Masked PIN input with enhanced security features and mobile optimizations.
        </p>
        
        <div class="max-w-md mx-auto">
          <PinInput
            label="Secure Transaction PIN"
            value={pinState.securePin}
            length={6}
            type="numeric"
            mask={true}
            size={getResponsiveSize()}
            placeholder={getMobilePlaceholder("secure")}
            onValueChange$={(value) => {
              pinState.securePin = value;
              if (value.length > 0) {
                triggerHapticFeedback('light');
              }
            }}
            onComplete$={(value) => {
              handlePinComplete("Secure Transaction", value);
              triggerHapticFeedback('heavy');
            }}
            helperText={
              deviceState.isMobile
                ? "Use large buttons for easy touch input"
                : "Enter your 6-digit secure PIN"
            }
            class={[
              "touch-manipulation",
              deviceState.isMobile && "mobile:min-h-[56px] mobile:text-lg",
              "transition-all duration-200"
            ].filter(Boolean).join(" ")}
          />

          {/* Mobile-specific security notice */}
          {deviceState.isMobile && (
            <div class="mt-3 rounded-md bg-warning-50 dark:bg-warning-950 border border-warning-200 dark:border-warning-800 p-3">
              <div class="flex">
                <svg class="w-4 h-4 text-warning-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <p class="ml-2 text-sm text-warning-700 dark:text-warning-300">
                  🔒 Your PIN is masked and secured. Haptic feedback confirms each input.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Mobile Keypad */}
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default">
            Custom Mobile Keypad
          </h3>
          <button
            type="button"
            onClick$={() => {
              pinState.showCustomKeypad = !pinState.showCustomKeypad;
              triggerHapticFeedback('light');
            }}
            class="rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
          >
            {pinState.showCustomKeypad ? "Hide" : "Show"} Keypad
          </button>
        </div>
        
        {pinState.showCustomKeypad && (
          <div class="max-w-sm mx-auto">
            {/* PIN Display */}
            <div class="mb-6">
              <label class="block text-sm font-medium text-text-default dark:text-text-dark-default mb-2">
                Custom Keypad PIN
              </label>
              <div class="flex justify-center space-x-3">
                {Array(4).fill(0).map((_, index) => (
                  <div
                    key={index}
                    class={[
                      "w-12 h-12 md:w-10 md:h-10 rounded-md border-2 flex items-center justify-center",
                      "text-lg font-mono font-semibold",
                      pinState.customPin[index]
                        ? "border-primary-500 bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400"
                        : "border-border dark:border-border-dark bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT text-text-tertiary dark:text-text-dark-tertiary"
                    ]}
                  >
                    {pinState.customPin[index] ? "●" : "○"}
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Keypad */}
            <div class="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick$={() => handleKeypadInput(num.toString())}
                  class={[
                    "h-14 w-14 md:h-12 md:w-12 rounded-xl border border-border dark:border-border-dark",
                    "bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT",
                    "text-text-default dark:text-text-dark-default font-medium text-lg",
                    "touch-manipulation transition-all duration-150",
                    "hover:bg-surface-light-secondary dark:hover:bg-surface-dark-secondary",
                    "active:scale-95 active:bg-surface-light-tertiary dark:active:bg-surface-dark-tertiary",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  ]}
                >
                  {num}
                </button>
              ))}
              
              {/* Bottom row */}
              <button
                type="button"
                onClick$={() => handleKeypadInput("clear")}
                class={[
                  "h-14 w-14 md:h-12 md:w-12 rounded-xl border border-border dark:border-border-dark",
                  "bg-surface-light-tertiary dark:bg-surface-dark-tertiary",
                  "text-text-secondary dark:text-text-dark-secondary font-medium text-sm",
                  "touch-manipulation transition-all duration-150",
                  "hover:bg-surface-light-quaternary dark:hover:bg-surface-dark-quaternary",
                  "active:scale-95"
                ]}
              >
                CLR
              </button>
              
              <button
                type="button"
                onClick$={() => handleKeypadInput("0")}
                class={[
                  "h-14 w-14 md:h-12 md:w-12 rounded-xl border border-border dark:border-border-dark",
                  "bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT",
                  "text-text-default dark:text-text-dark-default font-medium text-lg",
                  "touch-manipulation transition-all duration-150",
                  "hover:bg-surface-light-secondary dark:hover:bg-surface-dark-secondary",
                  "active:scale-95 active:bg-surface-light-tertiary dark:active:bg-surface-dark-tertiary"
                ]}
              >
                0
              </button>
              
              <button
                type="button"
                onClick$={() => handleKeypadInput("delete")}
                class={[
                  "h-14 w-14 md:h-12 md:w-12 rounded-xl border border-border dark:border-border-dark",
                  "bg-surface-light-tertiary dark:bg-surface-dark-tertiary",
                  "text-text-secondary dark:text-text-dark-secondary font-medium text-sm",
                  "touch-manipulation transition-all duration-150",
                  "hover:bg-surface-light-quaternary dark:hover:bg-surface-dark-quaternary",
                  "active:scale-95"
                ]}
              >
                DEL
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Completed PINs Log */}
      {completedPins.value.length > 0 && (
        <div class="rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950 p-4">
          <h3 class="mb-3 text-sm font-medium text-success-800 dark:text-success-200">
            ✅ Completed PIN Entries
          </h3>
          <div class="space-y-2">
            {completedPins.value.map((pin, index) => (
              <div key={index} class="flex items-center justify-between text-sm">
                <div class="flex items-center space-x-3">
                  <span class="font-medium text-success-800 dark:text-success-200">{pin.type}</span>
                  <span class="font-mono text-success-700 dark:text-success-300">{"●".repeat(pin.value.length)}</span>
                </div>
                <span class="text-success-600 dark:text-success-400 text-xs">{pin.time}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick$={() => {
              completedPins.value = [];
              pinState.quickPin = "";
              pinState.securePin = "";
              pinState.customPin = "";
            }}
            class="mt-3 text-xs text-success-700 dark:text-success-300 hover:text-success-800 dark:hover:text-success-200"
          >
            Clear History
          </button>
        </div>
      )}

      {/* Mobile Optimization Tips */}
      <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Mobile Optimization Features
        </h3>
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Touch Interface
            </h4>
            <ul class="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Minimum 44px touch targets (56px on mobile)</li>
              <li>• Touch-manipulation CSS for better responsiveness</li>
              <li>• Visual feedback on press (scale animation)</li>
              <li>• Adequate spacing between interactive elements</li>
              <li>• Haptic feedback for input confirmation</li>
            </ul>
          </div>
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Responsive Design
            </h4>
            <ul class="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Automatic size scaling based on device</li>
              <li>• Orientation change handling</li>
              <li>• Appropriate virtual keyboard triggering</li>
              <li>• Optimized spacing for different screen sizes</li>
              <li>• Conditional auto-focus (disabled on mobile)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Implementation Code Example */}
      <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Mobile Implementation Code
        </h3>
        <div class="rounded-md bg-gray-900 p-4">
          <pre class="text-sm text-gray-100 overflow-x-auto">
            <code>{`// Mobile-optimized PinInput setup
const [isMobile, setIsMobile] = useSignal(false);

// Detect mobile device
useVisibleTask$(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
});

// Haptic feedback function
const triggerHaptic = $(() => {
  if (isMobile.value && 'vibrate' in navigator) {
    navigator.vibrate(50);
  }
});

<PinInput
  label="Mobile PIN"
  value={pin.value}
  length={4}
  size={isMobile.value ? "lg" : "md"}
  placeholder={isMobile.value ? "●" : "○"}
  onValueChange$={(value) => {
    pin.value = value;
    triggerHaptic(); // Haptic feedback on each input
  }}
  onComplete$={(value) => {
    if (isMobile.value && 'vibrate' in navigator) {
      navigator.vibrate([50, 100, 50]); // Success pattern
    }
    handlePinComplete(value);
  }}
  class={[
    "touch-manipulation", // Better touch handling
    isMobile.value && "mobile:min-h-[56px]", // Larger touch targets
    "transition-all duration-200" // Smooth interactions
  ]}
  autoFocus={!isMobile.value} // Prevent keyboard popup on mobile
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
});