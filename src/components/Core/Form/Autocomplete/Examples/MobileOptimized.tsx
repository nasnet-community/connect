import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { Autocomplete } from "../Autocomplete";
import type { AutocompleteOption } from "../Autocomplete.types";

/**
 * Mobile Optimized Example
 * 
 * Demonstrates mobile-first design patterns with touch-friendly interfaces,
 * responsive sizing, gesture support, and optimized dropdown positioning.
 */

// Sample data optimized for mobile scenarios
const cities: AutocompleteOption[] = [
  { value: "nyc", label: "New York City, NY" },
  { value: "los_angeles", label: "Los Angeles, CA" },
  { value: "chicago", label: "Chicago, IL" },
  { value: "houston", label: "Houston, TX" },
  { value: "phoenix", label: "Phoenix, AZ" },
  { value: "philadelphia", label: "Philadelphia, PA" },
  { value: "san_antonio", label: "San Antonio, TX" },
  { value: "san_diego", label: "San Diego, CA" },
  { value: "dallas", label: "Dallas, TX" },
  { value: "san_jose", label: "San Jose, CA" },
];

const emojiFoods: AutocompleteOption[] = [
  { value: "pizza", label: "🍕 Pizza" },
  { value: "burger", label: "🍔 Burger" },
  { value: "sushi", label: "🍣 Sushi" },
  { value: "tacos", label: "🌮 Tacos" },
  { value: "pasta", label: "🍝 Pasta" },
  { value: "salad", label: "🥗 Salad" },
  { value: "sandwich", label: "🥪 Sandwich" },
  { value: "ramen", label: "🍜 Ramen" },
  { value: "ice_cream", label: "🍦 Ice Cream" },
  { value: "donut", label: "🍩 Donut" },
];

const quickActions: AutocompleteOption[] = [
  { value: "call", label: "📞 Make a Call", group: "Communication" },
  { value: "message", label: "💬 Send Message", group: "Communication" },
  { value: "email", label: "✉️ Send Email", group: "Communication" },
  { value: "calendar", label: "📅 Add to Calendar", group: "Productivity" },
  { value: "reminder", label: "⏰ Set Reminder", group: "Productivity" },
  { value: "note", label: "📝 Create Note", group: "Productivity" },
  { value: "photo", label: "📸 Take Photo", group: "Media" },
  { value: "location", label: "📍 Share Location", group: "Location" },
];

export default component$(() => {
  // State for different mobile scenarios
  const touchFriendlyValue = useSignal("");
  const responsiveValue = useSignal("");
  const gestureValue = useSignal("");
  const quickActionValue = useSignal("");
  const fullScreenValue = useSignal("");

  const deviceInfo = useStore({
    isMobile: false,
    screenWidth: 0,
    touchSupported: false,
  });

  // Detect device capabilities (this would normally be in a useVisibleTask)
  const detectDevice = $(() => {
    if (typeof window !== 'undefined') {
      deviceInfo.screenWidth = window.innerWidth;
      deviceInfo.isMobile = window.innerWidth < 768;
      deviceInfo.touchSupported = 'ontouchstart' in window;
    }
  });

  return (
    <div class="space-y-8 p-4 md:p-6">
      <div class="mb-6">
        <h2 class="mb-2 text-2xl font-bold text-text-default dark:text-text-dark-default">
          Mobile-Optimized Autocomplete
        </h2>
        <p class="text-text-secondary dark:text-text-dark-secondary">
          Touch-friendly interfaces designed for mobile-first experiences with responsive behavior.
        </p>
      </div>

      {/* Touch-Friendly Large Targets */}
      <div class="space-y-4">
        <div>
          <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
            Touch-Friendly Large Targets
          </h3>
          <p class="mb-4 text-sm text-text-secondary dark:text-text-dark-secondary">
            Minimum 44px touch targets for easy thumb navigation on mobile devices.
          </p>
        </div>
        
        <Autocomplete
          value={touchFriendlyValue.value}
          options={cities}
          size="lg"
          label="Select City"
          placeholder="Touch-friendly city search"
          helperText="Large touch targets for mobile"
          class="mobile:min-h-[44px] touch:min-h-[48px]"
          onValueChange$={(value) => {
            touchFriendlyValue.value = value;
          }}
        />

        <div class="text-xs text-text-secondary dark:text-text-dark-secondary bg-surface-light-tertiary dark:bg-surface-dark-tertiary rounded p-3">
          <strong>Mobile optimizations:</strong>
          <ul class="mt-1 space-y-0.5 ml-4">
            <li>• size="lg" provides larger input field</li>
            <li>• Minimum 44px height for touch accessibility</li>
            <li>• Enhanced spacing for finger navigation</li>
            <li>• Visual feedback on touch interactions</li>
          </ul>
        </div>
      </div>

      {/* Responsive Behavior */}
      <div class="space-y-4">
        <div>
          <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
            Responsive Behavior
          </h3>
          <p class="mb-4 text-sm text-text-secondary dark:text-text-dark-secondary">
            Adapts to different screen sizes with appropriate dropdown heights and positioning.
          </p>
        </div>

        <Autocomplete
          value={responsiveValue.value}
          options={emojiFoods}
          label="Food Selection"
          placeholder="Responsive dropdown sizing"
          helperText="Dropdown height adapts to viewport"
          maxDropdownHeight="mobile:40vh tablet:50vh desktop:300px"
          class="w-full max-w-none mobile:max-w-full tablet:max-w-md desktop:max-w-lg"
          onValueChange$={(value) => {
            responsiveValue.value = value;
          }}
        />

        <div class="grid grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-2 text-xs">
          <div class="bg-surface-light-tertiary dark:bg-surface-dark-tertiary rounded p-2">
            <strong>Mobile (&lt; 768px):</strong><br />
            • 40vh max dropdown height<br />
            • Full width input<br />
            • Bottom positioning preference
          </div>
          <div class="bg-surface-light-tertiary dark:bg-surface-dark-tertiary rounded p-2">
            <strong>Tablet (768px - 1024px):</strong><br />
            • 50vh max dropdown height<br />
            • Medium width input<br />
            • Smart positioning
          </div>
          <div class="bg-surface-light-tertiary dark:bg-surface-dark-tertiary rounded p-2">
            <strong>Desktop (&gt; 1024px):</strong><br />
            • 300px max dropdown height<br />
            • Large width input<br />
            • Standard positioning
          </div>
        </div>
      </div>

      {/* Gesture Support */}
      <div class="space-y-4">
        <div>
          <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
            Gesture Support
          </h3>
          <p class="mb-4 text-sm text-text-secondary dark:text-text-dark-secondary">
            Optimized for swipe gestures and touch interactions with haptic feedback simulation.
          </p>
        </div>

        <Autocomplete
          value={gestureValue.value}
          options={cities}
          label="Gesture-Enabled Search"
          placeholder="Swipe and touch optimized"
          helperText="Try swiping on mobile devices"
          class="touch-manipulation"
          onValueChange$={(value) => {
            gestureValue.value = value;
            // Simulate haptic feedback on touch devices
            if (typeof window !== 'undefined' && 'vibrate' in navigator) {
              navigator.vibrate(50);
            }
          }}
        />

        <div class="flex items-center gap-2 text-sm text-text-secondary dark:text-text-dark-secondary">
          <span class="inline-block w-2 h-2 rounded-full bg-green-500"></span>
          Touch manipulation enabled for smooth scrolling and gestures
        </div>
      </div>

      {/* Quick Actions Interface */}
      <div class="space-y-4">
        <div>
          <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
            Quick Actions Interface
          </h3>
          <p class="mb-4 text-sm text-text-secondary dark:text-text-dark-secondary">
            Mobile-first quick action picker with emoji icons for better visual recognition.
          </p>
        </div>

        <Autocomplete
          value={quickActionValue.value}
          options={quickActions}
          label="Quick Actions"
          placeholder="Search actions..."
          helperText="Visual icons help with quick recognition"
          size="lg"
          highlightMatches={true}
          clearable={true}
          class="mobile:text-base tablet:text-sm"
          onValueChange$={(value) => {
            quickActionValue.value = value;
          }}
        />

        {quickActionValue.value && (
          <div class="rounded-lg bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 p-4">
            <div class="flex items-center gap-3">
              <div class="text-2xl">
                {quickActions.find(action => action.value === quickActionValue.value)?.label.split(' ')[0]}
              </div>
              <div>
                <div class="font-medium text-primary-800 dark:text-primary-200">
                  {quickActions.find(action => action.value === quickActionValue.value)?.label.substring(2)}
                </div>
                <div class="text-sm text-primary-600 dark:text-primary-400">
                  Category: {quickActions.find(action => action.value === quickActionValue.value)?.group}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen Mobile Experience */}
      <div class="space-y-4">
        <div>
          <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
            Full-Screen Mobile Experience
          </h3>
          <p class="mb-4 text-sm text-text-secondary dark:text-text-dark-secondary">
            On very small screens, the dropdown can take full viewport height for better usability.
          </p>
        </div>

        <Autocomplete
          value={fullScreenValue.value}
          options={cities}
          label="Full-Screen on Mobile"
          placeholder="Full screen dropdown on small devices"
          helperText="Dropdown expands to full screen on mobile"
          size="lg"
          maxDropdownHeight="max-mobile:90vh mobile-only:85vh tablet:300px"
          class="max-mobile:fixed max-mobile:inset-x-0 max-mobile:bottom-0 max-mobile:z-50 mobile-only:relative"
          onValueChange$={(value) => {
            fullScreenValue.value = value;
          }}
        />

        <div class="rounded-md bg-info-50 dark:bg-info-950 border border-info-200 dark:border-info-800 p-3">
          <div class="flex items-start gap-2">
            <svg class="w-4 h-4 text-info-600 dark:text-info-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>
            <div class="text-sm text-info-800 dark:text-info-200">
              <strong>Responsive Design Tips:</strong>
              <ul class="mt-1 space-y-0.5">
                <li>• Use viewport units (vh, vw) for mobile sizing</li>
                <li>• Consider safe area insets for newer devices</li>
                <li>• Test on actual devices, not just browser dev tools</li>
                <li>• Provide visual feedback for touch interactions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Device Detection Info */}
      <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Current Device Information
        </h3>
        <button
          onClick$={detectDevice}
          class="mb-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Detect Device Capabilities
        </button>
        
        <div class="grid gap-4 md:grid-cols-3">
          <div class="bg-surface-light-tertiary dark:bg-surface-dark-tertiary rounded p-3">
            <div class="text-sm font-medium text-text-default dark:text-text-dark-default">Screen Width</div>
            <div class="text-lg text-primary-600 dark:text-primary-400">
              {deviceInfo.screenWidth}px
            </div>
          </div>
          <div class="bg-surface-light-tertiary dark:bg-surface-dark-tertiary rounded p-3">
            <div class="text-sm font-medium text-text-default dark:text-text-dark-default">Device Type</div>
            <div class="text-lg text-primary-600 dark:text-primary-400">
              {deviceInfo.isMobile ? 'Mobile' : 'Desktop'}
            </div>
          </div>
          <div class="bg-surface-light-tertiary dark:bg-surface-dark-tertiary rounded p-3">
            <div class="text-sm font-medium text-text-default dark:text-text-dark-default">Touch Support</div>
            <div class="text-lg text-primary-600 dark:text-primary-400">
              {deviceInfo.touchSupported ? 'Yes' : 'No'}
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Guidelines */}
      <div class="rounded-lg border border-warning-200 dark:border-warning-800 bg-warning-50 dark:bg-warning-950 p-6">
        <h3 class="mb-4 text-lg font-medium text-warning-800 dark:text-warning-200">
          Mobile Implementation Guidelines
        </h3>
        <div class="space-y-3 text-sm text-warning-700 dark:text-warning-300">
          <div>
            <strong>Touch Targets:</strong> Ensure all interactive elements are at least 44px in height and width for comfortable thumb navigation.
          </div>
          <div>
            <strong>Responsive Dropdown:</strong> Use viewport-relative units for dropdown sizing and consider safe area insets on modern devices.
          </div>
          <div>
            <strong>Performance:</strong> Optimize for slower mobile connections with debouncing and progressive loading.
          </div>
          <div>
            <strong>Accessibility:</strong> Test with screen readers and ensure keyboard navigation works well with virtual keyboards.
          </div>
          <div>
            <strong>Visual Feedback:</strong> Provide clear visual feedback for touch interactions and loading states.
          </div>
        </div>
      </div>
    </div>
  );
});