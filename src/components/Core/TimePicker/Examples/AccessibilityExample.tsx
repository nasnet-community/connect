import { component$, useSignal, $ } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "../Timepicker";

export const AccessibilityExample = component$(() => {
  // Basic accessible time picker state
  const basicTime = useSignal<TimeValue>({ 
    hour: "09", 
    minute: "30", 
    period: "AM" 
  });

  // Required field with validation
  const requiredTime = useSignal<TimeValue>({ 
    hour: "", 
    minute: "", 
    period: "AM" 
  });
  const requiredError = useSignal(false);
  const requiredErrorMessage = useSignal("");

  // Time picker with seconds for screen readers
  const detailedTime = useSignal<TimeValue>({ 
    hour: "14", 
    minute: "15", 
    second: "30" 
  });

  // Focus management example
  const focusTime = useSignal<TimeValue>({ 
    hour: "12", 
    minute: "00", 
    period: "PM" 
  });
  const focusAnnouncement = useSignal("");

  // High contrast mode example
  const contrastTime = useSignal<TimeValue>({ 
    hour: "08", 
    minute: "45" 
  });

  // Disabled state for accessibility testing
  const disabledTime = useSignal<TimeValue>({ 
    hour: "16", 
    minute: "20" 
  });

  const handleBasicTimeChange$ = $((type: keyof TimeValue, value: string) => {
    basicTime.value = { ...basicTime.value, [type]: value };
  });

  const handleRequiredTimeChange$ = $((type: keyof TimeValue, value: string) => {
    requiredTime.value = { ...requiredTime.value, [type]: value };
    
    // Validate required field
    if (!requiredTime.value.hour || !requiredTime.value.minute) {
      requiredError.value = true;
      requiredErrorMessage.value = "Please select both hour and minute for the meeting time";
    } else {
      requiredError.value = false;
      requiredErrorMessage.value = "";
    }
  });

  const handleDetailedTimeChange$ = $((type: keyof TimeValue, value: string) => {
    detailedTime.value = { ...detailedTime.value, [type]: value };
  });

  const handleFocusTimeChange$ = $((type: keyof TimeValue, value: string) => {
    focusTime.value = { ...focusTime.value, [type]: value };
    
    // Provide live feedback for screen readers
    const timeStr = `${focusTime.value.hour}:${focusTime.value.minute} ${focusTime.value.period || ""}`;
    focusAnnouncement.value = `Selected time: ${timeStr}`;
    
    // Clear announcement after delay
    setTimeout(() => {
      focusAnnouncement.value = "";
    }, 2000);
  });

  const handleContrastTimeChange$ = $((type: keyof TimeValue, value: string) => {
    contrastTime.value = { ...contrastTime.value, [type]: value };
  });

  const handleClearTime$ = $(() => {
    focusTime.value = { hour: "", minute: "", period: "AM" };
    focusAnnouncement.value = "Time cleared";
  });

  return (
    <div class="space-y-12 p-6">
      {/* Screen Reader Only Instructions */}
      <div class="sr-only" aria-live="polite">
        Instructions for screen reader users: Use tab to navigate between time fields. 
        Use arrow keys to increment or decrement time values. 
        Use space or enter to open dropdown menus.
      </div>

      {/* Live Region for Announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        class="sr-only"
      >
        {focusAnnouncement.value}
      </div>

      <div class="prose prose-slate dark:prose-invert max-w-none">
        <h2>TimePicker Accessibility Examples</h2>
        <p>
          These examples demonstrate comprehensive accessibility features including 
          ARIA labels, keyboard navigation, screen reader support, and high contrast compatibility.
        </p>
      </div>

      {/* 1. Basic Accessible TimePicker */}
      <section class="space-y-4">
        <div class="prose prose-slate dark:prose-invert max-w-none">
          <h3>1. Proper ARIA Labels and Descriptions</h3>
          <p>
            This example shows a fully accessible TimePicker with proper labeling, 
            ARIA attributes, and semantic markup for assistive technologies.
          </p>
        </div>

        <div class="p-6 border border-border-DEFAULT dark:border-border-dark rounded-lg bg-surface-light dark:bg-surface-dark">
          <TimePicker
            time={basicTime.value}
            onChange$={handleBasicTimeChange$}
            format="12"
            label="Appointment Time"
            id="appointment-time"
            name="appointment"
            class="max-w-md"
          />
          
          <div class="mt-4 p-3 bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-800 rounded">
            <h4 class="text-sm font-medium text-info-800 dark:text-info-200 mb-2">
              Accessibility Features:
            </h4>
            <ul class="text-sm text-info-700 dark:text-info-300 space-y-1">
              <li>• Proper semantic labeling with <code>label</code> element</li>
              <li>• Individual ARIA labels for each time component</li>
              <li>• Keyboard navigation support (Tab, Arrow keys)</li>
              <li>• Focus indicators and visual feedback</li>
              <li>• Proper color contrast ratios</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Keyboard Navigation */}
      <section class="space-y-4">
        <div class="prose prose-slate dark:prose-invert max-w-none">
          <h3>2. Keyboard Navigation Examples</h3>
          <p>
            Focus this TimePicker and use keyboard shortcuts. Press Tab to move between 
            fields, Arrow Up/Down to change values, and test the clear functionality.
          </p>
        </div>

        <div class="p-6 border border-border-DEFAULT dark:border-border-dark rounded-lg bg-surface-light dark:bg-surface-dark">
          <TimePicker
            time={focusTime.value}
            onChange$={handleFocusTimeChange$}
            format="12"
            label="Event Start Time"
            id="event-time"
            name="event"
            showClearButton={true}
            onClear$={handleClearTime$}
            class="max-w-md"
          />
          
          <div class="mt-4 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
            <h4 class="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              Keyboard Shortcuts:
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
              <div><kbd class="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Tab</kbd> Navigate fields</div>
              <div><kbd class="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">↑/↓</kbd> Change values</div>
              <div><kbd class="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Space</kbd> Open dropdown</div>
              <div><kbd class="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Enter</kbd> Select value</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Screen Reader Friendly Setup */}
      <section class="space-y-4">
        <div class="prose prose-slate dark:prose-invert max-w-none">
          <h3>3. Screen Reader Friendly Setup</h3>
          <p>
            This TimePicker includes seconds and demonstrates how screen readers 
            announce time selections with detailed feedback and context.
          </p>
        </div>

        <div class="p-6 border border-border-DEFAULT dark:border-border-dark rounded-lg bg-surface-light dark:bg-surface-dark">
          <TimePicker
            time={detailedTime.value}
            onChange$={handleDetailedTimeChange$}
            format="24"
            showSeconds={true}
            label="Precise Schedule Time"
            id="precise-time"
            name="precise"
            class="max-w-lg"
          />
          
          <div class="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
            <h4 class="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
              Screen Reader Features:
            </h4>
            <ul class="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• Detailed time component labels (Hours, Minutes, Seconds)</li>
              <li>• Live region announcements for time changes</li>
              <li>• Context information for 24-hour format</li>
              <li>• Proper reading order and navigation flow</li>
              <li>• Descriptive field grouping</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Required Field Handling */}
      <section class="space-y-4">
        <div class="prose prose-slate dark:prose-invert max-w-none">
          <h3>4. Required Field Handling</h3>
          <p>
            This example shows proper error handling, validation feedback, and 
            accessibility considerations for required time fields.
          </p>
        </div>

        <div class="p-6 border border-border-DEFAULT dark:border-border-dark rounded-lg bg-surface-light dark:bg-surface-dark">
          <TimePicker
            time={requiredTime.value}
            onChange$={handleRequiredTimeChange$}
            format="12"
            label="Meeting Time"
            id="meeting-time"
            name="meeting"
            required={true}
            error={requiredError.value}
            errorMessage={requiredErrorMessage.value}
            class="max-w-md"
          />
          
          <div class="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
            <h4 class="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              Required Field Features:
            </h4>
            <ul class="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• Visual required indicator (*)</li>
              <li>• ARIA-required attribute</li>
              <li>• Error message with proper association</li>
              <li>• ARIA-invalid state management</li>
              <li>• Error announcement via role="alert"</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. High Contrast Mode Compatibility */}
      <section class="space-y-4">
        <div class="prose prose-slate dark:prose-invert max-w-none">
          <h3>5. High Contrast Mode Compatibility</h3>
          <p>
            This TimePicker uses system colors and maintains usability in high 
            contrast mode, with enhanced borders and focus indicators.
          </p>
        </div>

        <div class="p-6 border-2 border-border-DEFAULT dark:border-border-dark rounded-lg bg-surface-light dark:bg-surface-dark">
          <TimePicker
            time={contrastTime.value}
            onChange$={handleContrastTimeChange$}
            format="24"
            variant="outline"
            label="High Contrast Time"
            id="contrast-time"
            name="contrast"
            class="max-w-md"
          />
          
          <div class="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded">
            <h4 class="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
              High Contrast Features:
            </h4>
            <ul class="text-sm text-purple-700 dark:text-purple-300 space-y-1">
              <li>• System color compliance</li>
              <li>• Enhanced border visibility</li>
              <li>• Strong focus indicators</li>
              <li>• Proper text contrast ratios</li>
              <li>• Icon visibility in high contrast</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Disabled State Accessibility */}
      <section class="space-y-4">
        <div class="prose prose-slate dark:prose-invert max-w-none">
          <h3>6. Focus Management & Disabled States</h3>
          <p>
            This example demonstrates proper disabled state handling and focus 
            management for accessibility compliance.
          </p>
        </div>

        <div class="p-6 border border-border-DEFAULT dark:border-border-dark rounded-lg bg-surface-light dark:bg-surface-dark">
          <TimePicker
            time={disabledTime.value}
            onChange$={$(() => {})}
            format="24"
            label="Readonly Schedule Time"
            id="disabled-time"
            name="disabled"
            disabled={true}
            class="max-w-md"
          />
          
          <div class="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
            <h4 class="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
              Disabled State Features:
            </h4>
            <ul class="text-sm text-red-700 dark:text-red-300 space-y-1">
              <li>• Proper ARIA-disabled attribute</li>
              <li>• Visual opacity reduction</li>
              <li>• Cursor state changes</li>
              <li>• Focus prevention</li>
              <li>• Screen reader disabled announcements</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessibility Testing Guide */}
      <section class="space-y-4">
        <div class="prose prose-slate dark:prose-invert max-w-none">
          <h3>Accessibility Testing Guide</h3>
          <p>
            Use these methods to test the accessibility of TimePicker components:
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-4 border border-border-DEFAULT dark:border-border-dark rounded-lg">
            <h4 class="font-medium text-text-DEFAULT dark:text-text-dark-default mb-3">
              Keyboard Testing
            </h4>
            <ul class="text-sm space-y-2 text-text-muted dark:text-text-dark-muted">
              <li>• Navigate using only Tab and Arrow keys</li>
              <li>• Verify all interactive elements are reachable</li>
              <li>• Test keyboard shortcuts functionality</li>
              <li>• Ensure logical tab order</li>
              <li>• Verify focus indicators are visible</li>
            </ul>
          </div>

          <div class="p-4 border border-border-DEFAULT dark:border-border-dark rounded-lg">
            <h4 class="font-medium text-text-DEFAULT dark:text-text-dark-default mb-3">
              Screen Reader Testing
            </h4>
            <ul class="text-sm space-y-2 text-text-muted dark:text-text-dark-muted">
              <li>• Test with NVDA, JAWS, or VoiceOver</li>
              <li>• Verify proper label announcements</li>
              <li>• Check error message associations</li>
              <li>• Test live region updates</li>
              <li>• Verify component role announcements</li>
            </ul>
          </div>

          <div class="p-4 border border-border-DEFAULT dark:border-border-dark rounded-lg">
            <h4 class="font-medium text-text-DEFAULT dark:text-text-dark-default mb-3">
              Visual Testing
            </h4>
            <ul class="text-sm space-y-2 text-text-muted dark:text-text-dark-muted">
              <li>• Test in high contrast mode</li>
              <li>• Verify 4.5:1 color contrast ratios</li>
              <li>• Test at 200% zoom level</li>
              <li>• Check focus indicator visibility</li>
              <li>• Verify dark/light theme support</li>
            </ul>
          </div>

          <div class="p-4 border border-border-DEFAULT dark:border-border-dark rounded-lg">
            <h4 class="font-medium text-text-DEFAULT dark:text-text-dark-default mb-3">
              Automated Testing
            </h4>
            <ul class="text-sm space-y-2 text-text-muted dark:text-text-dark-muted">
              <li>• Run axe-core accessibility tests</li>
              <li>• Use Lighthouse accessibility audit</li>
              <li>• Validate HTML semantics</li>
              <li>• Check ARIA implementation</li>
              <li>• Test with accessibility browser extensions</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
});