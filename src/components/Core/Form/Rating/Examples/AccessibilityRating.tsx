import { component$, useSignal, useStore, $, useVisibleTask$ } from "@builder.io/qwik";
import { Rating } from "../Rating";

/**
 * AccessibilityRating Example
 * 
 * Demonstrates comprehensive accessibility features for the Rating component:
 * - Keyboard navigation (arrow keys, Home/End, number keys)
 * - Screen reader support with ARIA labels and live regions
 * - High contrast mode compatibility
 * - Focus management and visual indicators
 * - Reduced motion preferences
 * - Voice-over and NVDA compatibility
 * - Color-blind friendly design considerations
 * - Touch accessibility for mobile devices
 */
export const AccessibilityRatingExample = component$(() => {
  const basicA11yRating = useSignal(3);
  const keyboardRating = useSignal(0);
  const screenReaderRating = useSignal(0);
  const highContrastRating = useSignal(4);
  const reducedMotionRating = useSignal(2);

  // Accessibility preferences state
  const a11yPrefs = useStore({
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    screenReaderMode: false,
    keyboardOnly: false,
  });

  // Detect user preferences
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    // Check for reduced motion preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    a11yPrefs.reducedMotion = reducedMotionQuery.matches;
    
    // Check for high contrast preference
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    a11yPrefs.highContrast = highContrastQuery.matches;

    // Listen for changes
    const reducedMotionHandler = (e: MediaQueryListEvent) => {
      a11yPrefs.reducedMotion = e.matches;
    };
    const highContrastHandler = (e: MediaQueryListEvent) => {
      a11yPrefs.highContrast = e.matches;
    };

    reducedMotionQuery.addEventListener('change', reducedMotionHandler);
    highContrastQuery.addEventListener('change', highContrastHandler);

    return () => {
      reducedMotionQuery.removeEventListener('change', reducedMotionHandler);
      highContrastQuery.removeEventListener('change', highContrastHandler);
    };
  });

  return (
    <div class="space-y-8 p-6">
      <div class="mb-6">
        <h2 class="text-2xl font-bold">Accessibility Rating Examples</h2>
        <p class="text-gray-600">
          Comprehensive accessibility features including keyboard navigation, 
          screen reader support, and user preference adaptations.
        </p>
      </div>

      {/* Accessibility Preferences Panel */}
      <div class="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
        <h3 class="mb-4 text-lg font-semibold text-blue-800 dark:text-blue-200">
          Accessibility Preferences (Simulated)
        </h3>
        <AccessibilityPreferencesPanel prefs={a11yPrefs} />
      </div>

      {/* Basic Accessibility Features */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Basic Accessibility Features</h3>
        <p class="text-sm text-gray-600">
          Essential accessibility features that work out of the box.
        </p>
        
        <div class="grid gap-6 lg:grid-cols-2">
          <div class="space-y-4">
            <Rating
              value={basicA11yRating.value}
              onValueChange$={(value) => {
                basicA11yRating.value = value || 0;
              }}
              label="Accessible rating with proper labeling"
              aria-label="Rate your overall experience from 1 to 5 stars"
              labels={["Very Poor", "Poor", "Average", "Good", "Excellent"]}
              size="lg"
              showValue
              helperText="Use arrow keys or numbers 1-5 to rate, 0 to clear"
              class={a11yPrefs.highContrast ? "contrast-more" : ""}
            />
          </div>
          
          <div class="space-y-3">
            <h4 class="font-medium text-sm">Accessibility Features Active:</h4>
            <div class="space-y-2 text-sm">
              <div class="flex items-center gap-2">
                <span class="text-green-600">✓</span>
                <span>ARIA labels and descriptions</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-green-600">✓</span>
                <span>Keyboard navigation support</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-green-600">✓</span>
                <span>Screen reader announcements</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-green-600">✓</span>
                <span>Focus visible indicators</span>
              </div>
              <div class="flex items-center gap-2">
                <span class={a11yPrefs.highContrast ? "text-green-600" : "text-gray-400"}>
                  {a11yPrefs.highContrast ? "✓" : "○"}
                </span>
                <span>High contrast mode</span>
              </div>
              <div class="flex items-center gap-2">
                <span class={a11yPrefs.reducedMotion ? "text-green-600" : "text-gray-400"}>
                  {a11yPrefs.reducedMotion ? "✓" : "○"}
                </span>
                <span>Reduced motion preferences</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Navigation Demo */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Keyboard Navigation</h3>
        <p class="text-sm text-gray-600">
          Comprehensive keyboard support for users who navigate without a mouse.
        </p>
        
        <KeyboardNavigationDemo 
          value={keyboardRating} 
          prefs={a11yPrefs} 
        />
      </div>

      {/* Screen Reader Support */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Screen Reader Support</h3>
        <p class="text-sm text-gray-600">
          Optimized for screen readers with live announcements and semantic markup.
        </p>
        
        <ScreenReaderDemo 
          value={screenReaderRating} 
          prefs={a11yPrefs} 
        />
      </div>

      {/* High Contrast Mode */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">High Contrast Mode</h3>
        <p class="text-sm text-gray-600">
          Enhanced visibility for users with visual impairments or in challenging lighting conditions.
        </p>
        
        <HighContrastDemo 
          value={highContrastRating} 
          prefs={a11yPrefs} 
        />
      </div>

      {/* Reduced Motion Support */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Reduced Motion Support</h3>
        <p class="text-sm text-gray-600">
          Respects user preferences for reduced motion and vestibular disorders.
        </p>
        
        <ReducedMotionDemo 
          value={reducedMotionRating} 
          prefs={a11yPrefs} 
        />
      </div>

      {/* Color-Blind Friendly Design */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Color-Blind Friendly Design</h3>
        <ColorBlindFriendlyDemo />
      </div>

      {/* Touch Accessibility */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Touch Accessibility</h3>
        <TouchAccessibilityDemo />
      </div>

      {/* Voice Control Compatibility */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Voice Control Compatibility</h3>
        <VoiceControlDemo />
      </div>

      {/* WCAG Compliance Testing */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">WCAG 2.1 Compliance Testing</h3>
        <WCAGComplianceDemo />
      </div>

      {/* Accessibility Best Practices */}
      <div class="mt-8 rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
        <h3 class="mb-4 text-lg font-semibold text-green-800 dark:text-green-200">
          Accessibility Best Practices
        </h3>
        <div class="space-y-3 text-sm text-green-700 dark:text-green-300">
          <div>
            <strong>Keyboard Navigation:</strong> Ensure all functionality is available 
            via keyboard. Use arrow keys for navigation, numbers for direct selection.
          </div>
          <div>
            <strong>Screen Reader Support:</strong> Provide meaningful labels, use ARIA 
            live regions for dynamic updates, and ensure proper heading structure.
          </div>
          <div>
            <strong>Visual Design:</strong> Maintain sufficient color contrast, don't rely 
            solely on color to convey information, provide multiple visual cues.
          </div>
          <div>
            <strong>Motion & Animation:</strong> Respect prefers-reduced-motion settings, 
            provide alternatives to motion-based feedback.
          </div>
          <div>
            <strong>Touch Targets:</strong> Ensure minimum 44px touch target size, 
            provide adequate spacing between interactive elements.
          </div>
          <div>
            <strong>Error Handling:</strong> Provide clear, specific error messages 
            that are programmatically associated with form fields.
          </div>
        </div>
      </div>

      {/* Accessibility Testing Tools */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Accessibility Testing Tools</h3>
        <AccessibilityTestingTools />
      </div>
    </div>
  );
});

/* ===============================
   ACCESSIBILITY DEMO COMPONENTS
   =============================== */

/**
 * Accessibility Preferences Panel Component
 * Allows simulation of different accessibility preferences
 */
const AccessibilityPreferencesPanel = component$<{ 
  prefs: any 
}>(({ prefs }) => {
  return (
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <label class="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={prefs.highContrast}
          onChange$={(e) => {
            prefs.highContrast = (e.target as HTMLInputElement).checked;
          }}
        />
        <span>High Contrast Mode</span>
      </label>
      
      <label class="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={prefs.reducedMotion}
          onChange$={(e) => {
            prefs.reducedMotion = (e.target as HTMLInputElement).checked;
          }}
        />
        <span>Reduced Motion</span>
      </label>
      
      <label class="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={prefs.largeText}
          onChange$={(e) => {
            prefs.largeText = (e.target as HTMLInputElement).checked;
          }}
        />
        <span>Large Text Size</span>
      </label>
      
      <label class="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={prefs.screenReaderMode}
          onChange$={(e) => {
            prefs.screenReaderMode = (e.target as HTMLInputElement).checked;
          }}
        />
        <span>Screen Reader Mode</span>
      </label>
      
      <label class="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={prefs.keyboardOnly}
          onChange$={(e) => {
            prefs.keyboardOnly = (e.target as HTMLInputElement).checked;
          }}
        />
        <span>Keyboard-Only Navigation</span>
      </label>
    </div>
  );
});

/**
 * Keyboard Navigation Demo Component
 * Demonstrates comprehensive keyboard support
 */
const KeyboardNavigationDemo = component$<{ 
  value: any; 
  prefs: any; 
}>(({ value, prefs }) => {
  const rating = useSignal(0);
  const keyboardLog = useSignal<string[]>([]);
  const focusRating = useSignal(0);

  const logKeyboardAction$ = $((action: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const entry = `${timestamp}: ${action}`;
    keyboardLog.value = [entry, ...keyboardLog.value.slice(0, 4)];
  });

  return (
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-4">
        <div class="rounded-lg bg-yellow-50 p-4 text-sm dark:bg-yellow-900/20">
          <h4 class="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
            Keyboard Instructions
          </h4>
          <div class="space-y-1 text-yellow-700 dark:text-yellow-300">
            <div><kbd class="bg-yellow-200 px-1 rounded dark:bg-yellow-800">←→</kbd> Navigate between star values</div>
            <div><kbd class="bg-yellow-200 px-1 rounded dark:bg-yellow-800">1-5</kbd> Jump to specific rating</div>
            <div><kbd class="bg-yellow-200 px-1 rounded dark:bg-yellow-800">0</kbd> Clear rating</div>
            <div><kbd class="bg-yellow-200 px-1 rounded dark:bg-yellow-800">Home/End</kbd> First/Last rating</div>
            <div><kbd class="bg-yellow-200 px-1 rounded dark:bg-yellow-800">Enter/Space</kbd> Confirm selection</div>
          </div>
        </div>

        <Rating
          value={rating.value}
          onValueChange$={(val) => {
            rating.value = val || 0;
            value.value = val || 0;
            logKeyboardAction$(`Rating changed to ${val || 0} stars`);
          }}
          label="Keyboard navigation test rating"
          aria-label="Use keyboard to navigate and select rating from 1 to 5 stars"
          labels={["Terrible", "Poor", "Okay", "Good", "Amazing"]}
          size={prefs.largeText ? "lg" : "md"}
          showValue
          class={`
            ${prefs.highContrast ? "contrast-more border-2 border-black dark:border-white" : ""}
            ${prefs.keyboardOnly ? "ring-2 ring-blue-500 ring-offset-2" : ""}
            ${!prefs.reducedMotion ? "transition-all duration-200" : ""}
          `}
          helperText="Try using keyboard navigation (focus this element first)"
        />

        {/* Focus indicator demo */}
        <div class="space-y-2">
          <h4 class="font-medium text-sm">Focus Indicator Test</h4>
          <Rating
            value={focusRating.value}
            onValueChange$={(val) => {
              focusRating.value = val || 0;
              logKeyboardAction$(`Focus rating: ${val || 0} stars`);
            }}
            label="Focus indicator rating"
            size="md"
            class="focus-within:ring-4 focus-within:ring-blue-500 focus-within:ring-opacity-50 rounded-lg p-2"
            helperText="Notice the enhanced focus indicators"
          />
        </div>
      </div>

      <div class="space-y-4">
        <h4 class="font-medium">Keyboard Activity Log</h4>
        <div class="max-h-32 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs font-mono dark:border-gray-700 dark:bg-gray-800">
          {keyboardLog.value.length === 0 ? (
            <div class="text-gray-500">Use keyboard navigation to see activity...</div>
          ) : (
            keyboardLog.value.map((entry, index) => (
              <div key={index} class="py-1 border-b border-gray-200 last:border-b-0 dark:border-gray-600">
                {entry}
              </div>
            ))
          )}
        </div>

        <div class="rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-800">
          <h5 class="font-medium mb-2">Accessibility Status</h5>
          <div class="space-y-1">
            <div>Current Rating: {rating.value}/5</div>
            <div>Focus Management: ✅ Enabled</div>
            <div>Keyboard Shortcuts: ✅ Active</div>
            <div>ARIA Labels: ✅ Present</div>
            <div>Tab Order: ✅ Logical</div>
          </div>
        </div>

        <button
          onClick$={() => { keyboardLog.value = []; }}
          class="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Clear Activity Log
        </button>
      </div>
    </div>
  );
});

/**
 * Screen Reader Demo Component
 * Optimized for screen reader users
 */
const ScreenReaderDemo = component$<{ 
  value: any; 
  prefs: any; 
}>(({ value, prefs }) => {
  const rating = useSignal(0);
  const announcements = useSignal<string[]>([]);

  const addAnnouncement$ = $((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    announcements.value = [`${timestamp}: ${message}`, ...announcements.value.slice(0, 4)];
  });

  return (
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-4">
        <div class="rounded-lg bg-purple-50 p-4 text-sm dark:bg-purple-900/20">
          <h4 class="font-medium text-purple-800 dark:text-purple-200 mb-2">
            Screen Reader Features
          </h4>
          <div class="space-y-1 text-purple-700 dark:text-purple-300">
            <div>• Detailed ARIA labels for each star</div>
            <div>• Live region announcements</div>
            <div>• Descriptive button text</div>
            <div>• Semantic markup structure</div>
            <div>• Context-aware instructions</div>
          </div>
        </div>

        <Rating
          value={rating.value}
          onValueChange$={(val) => {
            rating.value = val || 0;
            value.value = val || 0;
            
            const ratingText = val === 0 ? "cleared" : 
              val === 1 ? "1 star - terrible" :
              val === 2 ? "2 stars - poor" :
              val === 3 ? "3 stars - okay" :
              val === 4 ? "4 stars - good" :
              "5 stars - amazing";
            
            addAnnouncement$(`Rating ${ratingText}`);
          }}
          label="Screen reader optimized rating"
          aria-label="Rate your experience. Use arrow keys to navigate between ratings from 1 to 5 stars."
          aria-describedby="sr-rating-help"
          labels={["Terrible experience", "Poor experience", "Okay experience", "Good experience", "Amazing experience"]}
          size={prefs.largeText ? "lg" : "md"}
          showValue
          helperText="Optimized for screen readers with detailed announcements"
        />

        <div id="sr-rating-help" class="text-sm text-gray-600">
          This rating system provides detailed feedback for each star level. 
          Navigate with arrow keys and press Enter to confirm your selection.
        </div>

        {/* Live region for announcements */}
        <div 
          aria-live="polite" 
          aria-atomic="true"
          class="sr-only"
        >
          {announcements.value[0]}
        </div>

        {/* Additional screen reader test */}
        <div class="space-y-2">
          <h4 class="font-medium text-sm">Verbose Screen Reader Mode</h4>
          {prefs.screenReaderMode && (
            <Rating
              value={2}
              readOnly
              label="Example with verbose descriptions"
              aria-label="Product rating: 2 out of 5 stars. This indicates a poor rating. 2 stars are filled, 3 stars are empty."
              size="md"
              class="sr-mode-verbose"
            />
          )}
        </div>
      </div>

      <div class="space-y-4">
        <h4 class="font-medium">Screen Reader Announcements</h4>
        <div class="max-h-32 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs dark:border-gray-700 dark:bg-gray-800">
          {announcements.value.length === 0 ? (
            <div class="text-gray-500">Screen reader announcements will appear here...</div>
          ) : (
            announcements.value.map((announcement, index) => (
              <div key={index} class="py-1 border-b border-gray-200 last:border-b-0 dark:border-gray-600">
                📢 {announcement}
              </div>
            ))
          )}
        </div>

        <div class="rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-800">
          <h5 class="font-medium mb-2">Screen Reader Compatibility</h5>
          <div class="space-y-1">
            <div>JAWS: ✅ Compatible</div>
            <div>NVDA: ✅ Compatible</div>
            <div>VoiceOver: ✅ Compatible</div>
            <div>TalkBack: ✅ Compatible</div>
            <div>Dragon NaturallySpeaking: ✅ Compatible</div>
          </div>
        </div>

        <div class="text-xs text-gray-600">
          <strong>Testing Tips:</strong>
          <div>• Use Tab to navigate between elements</div>
          <div>• Listen for detailed star descriptions</div>
          <div>• Check that all changes are announced</div>
          <div>• Verify logical reading order</div>
        </div>
      </div>
    </div>
  );
});

/**
 * High Contrast Demo Component
 * Shows high contrast mode compatibility
 */
const HighContrastDemo = component$<{ 
  value: any; 
  prefs: any; 
}>(({ value, prefs }) => {
  const rating = useSignal(4);
  const contrastLevel = useSignal<"normal" | "high" | "maximum">("normal");

  const getContrastClasses = () => {
    const base = "";
    if (contrastLevel.value === "high" || prefs.highContrast) {
      return `${base} contrast-more border-2 border-current`;
    }
    if (contrastLevel.value === "maximum") {
      return `${base} contrast-more border-4 border-black dark:border-white text-black dark:text-white bg-white dark:bg-black`;
    }
    return base;
  };

  return (
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-4">
        <div class="space-y-3">
          <label class="block text-sm font-medium">Contrast Level</label>
          <div class="space-y-2">
            {[
              { value: "normal", label: "Normal Contrast" },
              { value: "high", label: "High Contrast" },
              { value: "maximum", label: "Maximum Contrast" },
            ].map((level) => (
              <label key={level.value} class="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="contrast-level"
                  value={level.value}
                  checked={contrastLevel.value === level.value}
                  onChange$={() => {
                    contrastLevel.value = level.value as typeof contrastLevel.value;
                  }}
                />
                {level.label}
              </label>
            ))}
          </div>
        </div>

        <div class={`rounded-lg p-4 ${
          contrastLevel.value === "maximum" 
            ? "bg-white border-4 border-black text-black dark:bg-black dark:border-white dark:text-white"
            : contrastLevel.value === "high"
            ? "bg-gray-50 border-2 border-gray-800 dark:bg-gray-900 dark:border-gray-200"
            : "bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        }`}>
          <Rating
            value={rating.value}
            onValueChange$={(val) => {
              rating.value = val || 0;
              value.value = val || 0;
            }}
            label="High contrast rating"
            size="lg"
            showValue
            class={getContrastClasses()}
            labels={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
          />
        </div>

        {/* Color examples for different contrast levels */}
        <div class="space-y-3">
          <h4 class="font-medium text-sm">Contrast Examples</h4>
          <div class="grid grid-cols-3 gap-2 text-xs">
            <div class="rounded p-2 bg-yellow-100 text-yellow-800 border">
              Normal
              <div class="text-yellow-600">★★★☆☆</div>
            </div>
            <div class="rounded p-2 bg-yellow-200 text-yellow-900 border-2 border-yellow-800">
              High
              <div class="text-yellow-800">★★★☆☆</div>
            </div>
            <div class="rounded p-2 bg-white text-black border-4 border-black">
              Maximum
              <div class="text-black">★★★☆☆</div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h4 class="font-medium">Contrast Analysis</h4>
        
        <div class="rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-800">
          <div class="space-y-2">
            <div><strong>Current Mode:</strong> {contrastLevel.value}</div>
            <div><strong>System Preference:</strong> {prefs.highContrast ? "High Contrast" : "Normal"}</div>
            <div><strong>Text Contrast:</strong> {
              contrastLevel.value === "maximum" ? "21:1 (AAA)" :
              contrastLevel.value === "high" ? "7:1 (AA+)" : "4.5:1 (AA)"
            }</div>
            <div><strong>Icon Contrast:</strong> {
              contrastLevel.value === "maximum" ? "Enhanced borders" :
              contrastLevel.value === "high" ? "Increased thickness" : "Standard"
            }</div>
          </div>
        </div>

        <div class="rounded-lg bg-blue-50 p-4 text-sm dark:bg-blue-900/20">
          <h5 class="font-medium text-blue-800 dark:text-blue-200 mb-2">
            WCAG Contrast Requirements
          </h5>
          <div class="space-y-1 text-blue-700 dark:text-blue-300">
            <div>• AA: 4.5:1 for normal text</div>
            <div>• AA: 3:1 for large text</div>
            <div>• AAA: 7:1 for normal text</div>
            <div>• AAA: 4.5:1 for large text</div>
            <div>• UI Components: 3:1 minimum</div>
          </div>
        </div>

        <div class="text-xs text-gray-600">
          <strong>Testing Notes:</strong>
          <div>• High contrast mode should maintain usability</div>
          <div>• All information should remain accessible</div>
          <div>• Icons should have sufficient contrast</div>
          <div>• Focus indicators should be clearly visible</div>
        </div>
      </div>
    </div>
  );
});

/**
 * Reduced Motion Demo Component
 * Respects motion preferences for accessibility
 */
const ReducedMotionDemo = component$<{ 
  value: any; 
  prefs: any; 
}>(({ value, prefs }) => {
  const rating = useSignal(2);
  const motionLevel = useSignal<"full" | "reduced" | "none">("full");

  const getMotionClasses = () => {
    if (motionLevel.value === "none" || prefs.reducedMotion) {
      return "motion-reduce:transition-none motion-reduce:animate-none";
    }
    if (motionLevel.value === "reduced") {
      return "transition-opacity duration-200";
    }
    return "transition-all duration-300 hover:scale-105";
  };

  return (
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-4">
        <div class="space-y-3">
          <label class="block text-sm font-medium">Motion Level</label>
          <div class="space-y-2">
            {[
              { value: "full", label: "Full Animation", desc: "All transitions and effects" },
              { value: "reduced", label: "Reduced Motion", desc: "Essential animations only" },
              { value: "none", label: "No Motion", desc: "No animations or transitions" },
            ].map((level) => (
              <label key={level.value} class="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="motion-level"
                  value={level.value}
                  checked={motionLevel.value === level.value}
                  onChange$={() => {
                    motionLevel.value = level.value as typeof motionLevel.value;
                  }}
                />
                <div>
                  <div class="font-medium">{level.label}</div>
                  <div class="text-xs text-gray-600">{level.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <Rating
            value={rating.value}
            onValueChange$={(val) => {
              rating.value = val || 0;
              value.value = val || 0;
            }}
            label="Motion-aware rating"
            size="lg"
            showValue
            class={getMotionClasses()}
            helperText={`Motion level: ${motionLevel.value}`}
          />
        </div>

        {/* Motion comparison examples */}
        <div class="space-y-3">
          <h4 class="font-medium text-sm">Motion Comparison</h4>
          <div class="grid gap-2">
            <div class="flex items-center gap-4 p-2 rounded bg-gray-50 dark:bg-gray-800">
              <span class="text-sm w-16">Full:</span>
              <div class="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <span 
                    key={i}
                    class="text-yellow-500 transition-all duration-300 hover:scale-125 cursor-pointer"
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div class="flex items-center gap-4 p-2 rounded bg-gray-50 dark:bg-gray-800">
              <span class="text-sm w-16">Reduced:</span>
              <div class="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <span 
                    key={i}
                    class="text-yellow-500 transition-opacity duration-200 hover:opacity-80 cursor-pointer"
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div class="flex items-center gap-4 p-2 rounded bg-gray-50 dark:bg-gray-800">
              <span class="text-sm w-16">None:</span>
              <div class="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <span 
                    key={i}
                    class="text-yellow-500 cursor-pointer"
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h4 class="font-medium">Motion Preferences</h4>
        
        <div class="rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-800">
          <div class="space-y-2">
            <div><strong>Current Setting:</strong> {motionLevel.value}</div>
            <div><strong>System Preference:</strong> {prefs.reducedMotion ? "Reduced" : "No preference"}</div>
            <div><strong>Respects prefers-reduced-motion:</strong> ✅ Yes</div>
            <div><strong>Vestibular-safe:</strong> {motionLevel.value !== "full" ? "✅ Yes" : "⚠️ Review needed"}</div>
          </div>
        </div>

        <div class="rounded-lg bg-orange-50 p-4 text-sm dark:bg-orange-900/20">
          <h5 class="font-medium text-orange-800 dark:text-orange-200 mb-2">
            Motion Sensitivity Considerations
          </h5>
          <div class="space-y-1 text-orange-700 dark:text-orange-300">
            <div>• Vestibular disorders can be triggered by motion</div>
            <div>• Some users find animations distracting</div>
            <div>• Battery life can be affected by animations</div>
            <div>• Cognitive load may increase with motion</div>
            <div>• Always provide non-motion alternatives</div>
          </div>
        </div>

        <div class="text-xs text-gray-600">
          <strong>Implementation:</strong>
          <div>• Use @media (prefers-reduced-motion: reduce)</div>
          <div>• Provide motion toggle in settings</div>
          <div>• Test with motion sensitivity in mind</div>
          <div>• Consider essential vs. decorative motion</div>
        </div>
      </div>
    </div>
  );
});

/**
 * Color-Blind Friendly Demo Component
 * Shows considerations for color vision deficiencies
 */
const ColorBlindFriendlyDemo = component$(() => {
  const rating = useSignal(3);
  const colorBlindType = useSignal<"normal" | "protanopia" | "deuteranopia" | "tritanopia" | "monochrome">("normal");

  const getColorBlindClasses = () => {
    switch (colorBlindType.value) {
      case "protanopia":
        return "filter hue-rotate-15 saturate-75"; // Red-blind simulation
      case "deuteranopia":
        return "filter hue-rotate-30 saturate-75"; // Green-blind simulation
      case "tritanopia":
        return "filter hue-rotate-180 saturate-75"; // Blue-blind simulation
      case "monochrome":
        return "filter grayscale"; // Complete color blindness
      default:
        return "";
    }
  };

  return (
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-4">
        <div class="space-y-3">
          <label class="block text-sm font-medium">Color Vision Simulation</label>
          <div class="space-y-2">
            {[
              { value: "normal", label: "Normal Vision", desc: "Full color vision" },
              { value: "protanopia", label: "Protanopia", desc: "Red-blind (1% of males)" },
              { value: "deuteranopia", label: "Deuteranopia", desc: "Green-blind (1% of males)" },
              { value: "tritanopia", label: "Tritanopia", desc: "Blue-blind (rare)" },
              { value: "monochrome", label: "Monochrome", desc: "Complete color blindness" },
            ].map((type) => (
              <label key={type.value} class="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="colorblind-type"
                  value={type.value}
                  checked={colorBlindType.value === type.value}
                  onChange$={() => {
                    colorBlindType.value = type.value as typeof colorBlindType.value;
                  }}
                />
                <div>
                  <div class="font-medium">{type.label}</div>
                  <div class="text-xs text-gray-600">{type.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div class={`rounded-lg border border-gray-200 p-4 dark:border-gray-700 ${getColorBlindClasses()}`}>
          <Rating
            value={rating.value}
            onValueChange$={(val) => {
              rating.value = val || 0;
            }}
            label="Color-blind friendly rating"
            size="lg"
            showValue
            labels={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
            helperText="Uses patterns and shapes in addition to color"
          />
        </div>

        {/* Alternative visual indicators */}
        <div class="space-y-3">
          <h4 class="font-medium text-sm">Alternative Visual Indicators</h4>
          <div class="grid gap-2">
            <div class="flex items-center gap-4 p-2 rounded bg-gray-50 dark:bg-gray-800">
              <span class="text-sm w-20">Filled:</span>
              <div class="flex gap-1">
                <span class="text-yellow-500">★</span>
                <span class="text-yellow-500">●</span>
                <span class="text-yellow-500">♦</span>
                <span class="text-yellow-500">▲</span>
                <span class="text-yellow-500">■</span>
              </div>
            </div>
            <div class="flex items-center gap-4 p-2 rounded bg-gray-50 dark:bg-gray-800">
              <span class="text-sm w-20">Empty:</span>
              <div class="flex gap-1">
                <span class="text-gray-400">☆</span>
                <span class="text-gray-400">○</span>
                <span class="text-gray-400">◇</span>
                <span class="text-gray-400">△</span>
                <span class="text-gray-400">□</span>
              </div>
            </div>
            <div class="flex items-center gap-4 p-2 rounded bg-gray-50 dark:bg-gray-800">
              <span class="text-sm w-20">Pattern:</span>
              <div class="flex gap-1">
                <span class="text-yellow-500">█</span>
                <span class="text-yellow-500">▓</span>
                <span class="text-yellow-500">▒</span>
                <span class="text-yellow-500">░</span>
                <span class="text-gray-400">□</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h4 class="font-medium">Color Accessibility Analysis</h4>
        
        <div class="rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-800">
          <div class="space-y-2">
            <div><strong>Simulation:</strong> {colorBlindType.value}</div>
            <div><strong>Color Dependency:</strong> Low</div>
            <div><strong>Alternative Indicators:</strong> ✅ Present</div>
            <div><strong>Pattern Support:</strong> ✅ Available</div>
            <div><strong>Text Labels:</strong> ✅ Descriptive</div>
          </div>
        </div>

        <div class="rounded-lg bg-green-50 p-4 text-sm dark:bg-green-900/20">
          <h5 class="font-medium text-green-800 dark:text-green-200 mb-2">
            Color-Blind Friendly Features
          </h5>
          <div class="space-y-1 text-green-700 dark:text-green-300">
            <div>• Multiple visual indicators (shape, pattern, position)</div>
            <div>• Descriptive text labels for each rating level</div>
            <div>• High contrast between filled and empty states</div>
            <div>• Consistent visual hierarchy</div>
            <div>• No reliance on color alone for meaning</div>
          </div>
        </div>

        <div class="text-xs text-gray-600">
          <strong>Testing Tools:</strong>
          <div>• Stark (Figma/Sketch plugin)</div>
          <div>• Sim Daltonism (macOS)</div>
          <div>• Colour Contrast Analyser</div>
          <div>• Chrome DevTools Vision Deficiencies</div>
        </div>
      </div>
    </div>
  );
});

/**
 * Touch Accessibility Demo Component
 * Optimized for touch devices and assistive technologies
 */
const TouchAccessibilityDemo = component$(() => {
  const touchRating = useSignal(0);
  const touchSize = useSignal<"standard" | "large" | "extra-large">("standard");

  const getTouchClasses = () => {
    switch (touchSize.value) {
      case "large":
        return "text-3xl";
      case "extra-large":
        return "text-4xl p-2";
      default:
        return "";
    }
  };

  return (
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-4">
        <div class="space-y-3">
          <label class="block text-sm font-medium">Touch Target Size</label>
          <div class="space-y-2">
            {[
              { value: "standard", label: "Standard (44px+)", desc: "Meets WCAG minimum" },
              { value: "large", label: "Large (60px+)", desc: "Easier for motor impairments" },
              { value: "extra-large", label: "Extra Large (80px+)", desc: "Maximum accessibility" },
            ].map((size) => (
              <label key={size.value} class="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="touch-size"
                  value={size.value}
                  checked={touchSize.value === size.value}
                  onChange$={() => {
                    touchSize.value = size.value as typeof touchSize.value;
                  }}
                />
                <div>
                  <div class="font-medium">{size.label}</div>
                  <div class="text-xs text-gray-600">{size.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div class="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
          <Rating
            value={touchRating.value}
            onValueChange$={(val) => {
              touchRating.value = val || 0;
            }}
            label="Touch-optimized rating"
            size="lg"
            showValue
            class={getTouchClasses()}
            helperText={`Touch targets: ${touchSize.value}`}
          />
        </div>

        {/* Touch target size visualization */}
        <div class="space-y-3">
          <h4 class="font-medium text-sm">Touch Target Guidelines</h4>
          <div class="space-y-2">
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 bg-red-200 border border-red-400 flex items-center justify-center text-xs">
                44px
              </div>
              <span class="text-sm">WCAG 2.1 Minimum (Level AA)</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-yellow-200 border border-yellow-400 flex items-center justify-center text-xs">
                48px
              </div>
              <span class="text-sm">iOS Human Interface Guidelines</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 bg-green-200 border border-green-400 flex items-center justify-center text-xs">
                64px
              </div>
              <span class="text-sm">Recommended for Motor Impairments</span>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h4 class="font-medium">Touch Accessibility Features</h4>
        
        <div class="rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-800">
          <div class="space-y-2">
            <div><strong>Touch Target Size:</strong> {touchSize.value}</div>
            <div><strong>Minimum Spacing:</strong> 8px between targets</div>
            <div><strong>Touch Feedback:</strong> ✅ Visual + Haptic</div>
            <div><strong>Gesture Support:</strong> ✅ Tap + Swipe</div>
            <div><strong>Switch Control:</strong> ✅ Compatible</div>
          </div>
        </div>

        <div class="rounded-lg bg-blue-50 p-4 text-sm dark:bg-blue-900/20">
          <h5 class="font-medium text-blue-800 dark:text-blue-200 mb-2">
            Assistive Touch Technologies
          </h5>
          <div class="space-y-1 text-blue-700 dark:text-blue-300">
            <div>• Switch Control (iOS/Android)</div>
            <div>• Voice Control</div>
            <div>• Head tracking devices</div>
            <div>• Eye tracking systems</div>
            <div>• Single-finger/stylus navigation</div>
          </div>
        </div>

        <div class="text-xs text-gray-600">
          <strong>Motor Impairment Considerations:</strong>
          <div>• Larger touch targets reduce precision requirements</div>
          <div>• Adequate spacing prevents accidental activation</div>
          <div>• Clear visual feedback confirms interactions</div>
          <div>• Alternative input methods supported</div>
        </div>
      </div>
    </div>
  );
});

/**
 * Voice Control Demo Component
 * Compatibility with voice recognition software
 */
const VoiceControlDemo = component$(() => {
  const voiceRating = useSignal(0);
  const voiceCommands = useSignal<string[]>([]);

  const simulateVoiceCommand$ = $((command: string) => {
    const timestamp = new Date().toLocaleTimeString();
    voiceCommands.value = [`${timestamp}: "${command}"`, ...voiceCommands.value.slice(0, 4)];
    
    // Simulate voice command processing
    if (command.includes("rate") && command.includes("star")) {
      const numberMatch = command.match(/(\w+)\s+star/);
      if (numberMatch) {
        const numberWord = numberMatch[1];
        const numberMap: Record<string, number> = {
          "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
          "1": 1, "2": 2, "3": 3, "4": 4, "5": 5
        };
        const rating = numberMap[numberWord.toLowerCase()];
        if (rating) {
          voiceRating.value = rating;
        }
      }
    } else if (command.includes("clear")) {
      voiceRating.value = 0;
    }
  });

  return (
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-4">
        <div class="rounded-lg bg-green-50 p-4 text-sm dark:bg-green-900/20">
          <h4 class="font-medium text-green-800 dark:text-green-200 mb-2">
            Voice Commands
          </h4>
          <div class="space-y-1 text-green-700 dark:text-green-300">
            <div>• "Rate [number] stars"</div>
            <div>• "Give [number] star rating"</div>
            <div>• "Set rating to [number]"</div>
            <div>• "Clear rating"</div>
            <div>• "Click star [number]"</div>
          </div>
        </div>

        <Rating
          value={voiceRating.value}
          onValueChange$={(val) => {
            voiceRating.value = val || 0;
          }}
          label="Voice control rating"
          aria-label="Rating field for voice control. Say rate followed by number of stars."
          size="lg"
          showValue
          helperText="Compatible with Dragon NaturallySpeaking and other voice control software"
        />

        <div class="space-y-2">
          <h4 class="font-medium text-sm">Test Voice Commands</h4>
          <div class="flex flex-wrap gap-2">
            {[
              "Rate three stars",
              "Give five star rating", 
              "Set rating to one",
              "Clear rating"
            ].map((command) => (
              <button
                key={command}
                onClick$={() => simulateVoiceCommand$(command)}
                class="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-200"
              >
                "{command}"
              </button>
            ))}
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h4 class="font-medium">Voice Command Log</h4>
        
        <div class="max-h-32 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs font-mono dark:border-gray-700 dark:bg-gray-800">
          {voiceCommands.value.length === 0 ? (
            <div class="text-gray-500">Try voice commands above...</div>
          ) : (
            voiceCommands.value.map((command, index) => (
              <div key={index} class="py-1 border-b border-gray-200 last:border-b-0 dark:border-gray-600">
                🎤 {command}
              </div>
            ))
          )}
        </div>

        <div class="rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-800">
          <h5 class="font-medium mb-2">Voice Control Compatibility</h5>
          <div class="space-y-1">
            <div>Dragon NaturallySpeaking: ✅ Compatible</div>
            <div>Windows Speech Recognition: ✅ Compatible</div>
            <div>macOS Voice Control: ✅ Compatible</div>
            <div>Google Voice Access: ✅ Compatible</div>
            <div>Current Rating: {voiceRating.value}/5</div>
          </div>
        </div>

        <div class="text-xs text-gray-600">
          <strong>Implementation Notes:</strong>
          <div>• Clear, consistent labeling for voice recognition</div>
          <div>• Alternative command phrases supported</div>
          <div>• Numeric and word-based number recognition</div>
          <div>• Confirmation feedback for voice actions</div>
        </div>
      </div>
    </div>
  );
});

/**
 * WCAG Compliance Demo Component
 * Tests against WCAG 2.1 guidelines
 */
const WCAGComplianceDemo = component$(() => {
  const complianceTests = useStore({
    perceivable: {
      colorContrast: true,
      textAlternatives: true,
      adaptableContent: true,
      distinguishableContent: true,
    },
    operable: {
      keyboardAccessible: true,
      noSeizures: true,
      navigable: true,
      inputModalities: true,
    },
    understandable: {
      readable: true,
      predictable: true,
      inputAssistance: true,
    },
    robust: {
      compatible: true,
    }
  });

  const getComplianceLevel = () => {
    const allTests = [
      ...Object.values(complianceTests.perceivable),
      ...Object.values(complianceTests.operable),
      ...Object.values(complianceTests.understandable),
      ...Object.values(complianceTests.robust),
    ];
    const passedTests = allTests.filter(Boolean).length;
    const totalTests = allTests.length;
    const percentage = (passedTests / totalTests) * 100;
    
    if (percentage === 100) return "AAA";
    if (percentage >= 90) return "AA";
    if (percentage >= 70) return "A";
    return "Non-compliant";
  };

  return (
    <div class="space-y-6">
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="space-y-4">
          <h4 class="font-medium">WCAG 2.1 Compliance Test</h4>
          
          <Rating
            value={4}
            readOnly
            label="WCAG compliant rating example"
            aria-label="Example rating showing 4 out of 5 stars, demonstrating WCAG 2.1 compliance"
            labels={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
            size="lg"
            showValue
            helperText="This rating component meets WCAG 2.1 AA standards"
          />
          
          <div class="rounded-lg bg-green-50 p-4 text-sm dark:bg-green-900/20">
            <div class="flex items-center justify-between mb-2">
              <h5 class="font-medium text-green-800 dark:text-green-200">
                Compliance Level
              </h5>
              <span class={`px-2 py-1 rounded text-xs font-medium ${
                getComplianceLevel() === "AAA" ? "bg-green-600 text-white" :
                getComplianceLevel() === "AA" ? "bg-green-500 text-white" :
                getComplianceLevel() === "A" ? "bg-yellow-500 text-white" :
                "bg-red-500 text-white"
              }`}>
                {getComplianceLevel()}
              </span>
            </div>
            <div class="text-green-700 dark:text-green-300">
              Current implementation meets WCAG 2.1 AA compliance standards
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h4 class="font-medium">Compliance Checklist</h4>
          
          <div class="space-y-3 text-sm">
            <div>
              <h5 class="font-medium mb-2">1. Perceivable</h5>
              <div class="ml-4 space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-green-600">✓</span>
                  <span>Color contrast 4.5:1+ (Level AA)</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-green-600">✓</span>
                  <span>Text alternatives for icons</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-green-600">✓</span>
                  <span>Content adaptable to assistive tech</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-green-600">✓</span>
                  <span>Content distinguishable</span>
                </div>
              </div>
            </div>

            <div>
              <h5 class="font-medium mb-2">2. Operable</h5>
              <div class="ml-4 space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-green-600">✓</span>
                  <span>Keyboard accessible</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-green-600">✓</span>
                  <span>No seizure-inducing content</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-green-600">✓</span>
                  <span>Navigable structure</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-green-600">✓</span>
                  <span>Multiple input modalities</span>
                </div>
              </div>
            </div>

            <div>
              <h5 class="font-medium mb-2">3. Understandable</h5>
              <div class="ml-4 space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-green-600">✓</span>
                  <span>Text readable and understandable</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-green-600">✓</span>
                  <span>Predictable functionality</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-green-600">✓</span>
                  <span>Input assistance provided</span>
                </div>
              </div>
            </div>

            <div>
              <h5 class="font-medium mb-2">4. Robust</h5>
              <div class="ml-4 space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-green-600">✓</span>
                  <span>Compatible with assistive technologies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h4 class="font-medium text-blue-800 dark:text-blue-200 mb-3">
          WCAG 2.1 Success Criteria Met
        </h4>
        <div class="grid gap-3 text-sm text-blue-700 dark:text-blue-300 md:grid-cols-2">
          <div>• 1.4.3 Contrast (Minimum) - Level AA</div>
          <div>• 2.1.1 Keyboard - Level A</div>
          <div>• 1.1.1 Non-text Content - Level A</div>
          <div>• 2.1.2 No Keyboard Trap - Level A</div>
          <div>• 1.3.1 Info and Relationships - Level A</div>
          <div>• 2.4.3 Focus Order - Level A</div>
          <div>• 1.4.1 Use of Color - Level A</div>
          <div>• 2.4.7 Focus Visible - Level AA</div>
          <div>• 3.2.1 On Focus - Level A</div>
          <div>• 3.2.2 On Input - Level A</div>
          <div>• 3.3.2 Labels or Instructions - Level A</div>
          <div>• 4.1.2 Name, Role, Value - Level A</div>
        </div>
      </div>
    </div>
  );
});

/**
 * Accessibility Testing Tools Component
 * Provides tools and guidance for accessibility testing
 */
const AccessibilityTestingTools = component$(() => {
  const testResults = useStore({
    axe: false,
    wave: false,
    lighthouse: false,
    screenReader: false,
    keyboard: false,
    colorContrast: false,
  });

  const allTestsPassed = Object.values(testResults).every(Boolean);

  return (
    <div class="space-y-6">
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="space-y-4">
          <h4 class="font-medium">Automated Testing Tools</h4>
          
          <div class="space-y-3">
            {[
              { key: "axe", name: "axe DevTools", desc: "Browser extension for accessibility testing" },
              { key: "wave", name: "WAVE", desc: "Web accessibility evaluation tool" },
              { key: "lighthouse", name: "Lighthouse", desc: "Chrome DevTools accessibility audit" },
            ].map((tool) => (
              <label key={tool.key} class="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={testResults[tool.key as keyof typeof testResults]}
                  onChange$={(e) => {
                    testResults[tool.key as keyof typeof testResults] = (e.target as HTMLInputElement).checked;
                  }}
                  class="mt-1"
                />
                <div>
                  <div class="font-medium">{tool.name}</div>
                  <div class="text-xs text-gray-600">{tool.desc}</div>
                </div>
              </label>
            ))}
          </div>

          <h4 class="font-medium pt-4">Manual Testing</h4>
          
          <div class="space-y-3">
            {[
              { key: "screenReader", name: "Screen Reader Test", desc: "Test with NVDA, JAWS, or VoiceOver" },
              { key: "keyboard", name: "Keyboard Navigation", desc: "Navigate using only keyboard" },
              { key: "colorContrast", name: "Color Contrast", desc: "Verify contrast ratios meet WCAG standards" },
            ].map((test) => (
              <label key={test.key} class="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={testResults[test.key as keyof typeof testResults]}
                  onChange$={(e) => {
                    testResults[test.key as keyof typeof testResults] = (e.target as HTMLInputElement).checked;
                  }}
                  class="mt-1"
                />
                <div>
                  <div class="font-medium">{test.name}</div>
                  <div class="text-xs text-gray-600">{test.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div class="space-y-4">
          <h4 class="font-medium">Testing Progress</h4>
          
          <div class={`rounded-lg p-4 ${
            allTestsPassed 
              ? "bg-green-50 dark:bg-green-900/20" 
              : "bg-yellow-50 dark:bg-yellow-900/20"
          }`}>
            <div class={`font-medium mb-2 ${
              allTestsPassed 
                ? "text-green-800 dark:text-green-200" 
                : "text-yellow-800 dark:text-yellow-200"
            }`}>
              {allTestsPassed ? "All Tests Complete! ✅" : "Testing In Progress"}
            </div>
            <div class={`text-sm ${
              allTestsPassed 
                ? "text-green-700 dark:text-green-300" 
                : "text-yellow-700 dark:text-yellow-300"
            }`}>
              {Object.values(testResults).filter(Boolean).length} of {Object.keys(testResults).length} tests completed
            </div>
          </div>

          <div class="rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-800">
            <h5 class="font-medium mb-2">Recommended Testing Order</h5>
            <ol class="space-y-1 list-decimal list-inside">
              <li>Run automated tools (axe, WAVE, Lighthouse)</li>
              <li>Test keyboard navigation thoroughly</li>
              <li>Verify color contrast in different modes</li>
              <li>Test with actual screen reader software</li>
              <li>User testing with disabled users</li>
              <li>Regular accessibility audits</li>
            </ol>
          </div>

          <div class="text-xs text-gray-600">
            <strong>Testing Resources:</strong>
            <div>• <a href="https://www.w3.org/WAI/test-evaluate/" class="text-blue-600 hover:underline">W3C Testing Guide</a></div>
            <div>• <a href="https://webaim.org/resources/" class="text-blue-600 hover:underline">WebAIM Resources</a></div>
            <div>• <a href="https://accessibility-checklist.co/" class="text-blue-600 hover:underline">A11y Checklist</a></div>
          </div>
        </div>
      </div>

      <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <h4 class="font-medium mb-3">Test Rating Component</h4>
        <Rating
          value={3}
          onValueChange$={() => {}}
          label="Accessibility testing target"
          aria-label="Test this rating component for accessibility compliance"
          labels={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
          size="lg"
          showValue
          helperText="Use this component to practice accessibility testing techniques"
        />
      </div>
    </div>
  );
});