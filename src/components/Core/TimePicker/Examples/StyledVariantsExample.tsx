import { component$, useSignal, $ } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "../Timepicker";

export const StyledVariantsExample = component$(() => {
  // State for different time pickers
  const defaultTimes = {
    sm: useSignal<TimeValue>({ hour: "09", minute: "30" }),
    md: useSignal<TimeValue>({ hour: "14", minute: "15" }),
    lg: useSignal<TimeValue>({ hour: "18", minute: "45" })
  };

  const outlineTimes = {
    sm: useSignal<TimeValue>({ hour: "10", minute: "00" }),
    md: useSignal<TimeValue>({ hour: "12", minute: "30" }),
    lg: useSignal<TimeValue>({ hour: "16", minute: "20" })
  };

  const filledTimes = {
    sm: useSignal<TimeValue>({ hour: "08", minute: "15" }),
    md: useSignal<TimeValue>({ hour: "13", minute: "45" }),
    lg: useSignal<TimeValue>({ hour: "20", minute: "00" })
  };

  // State for special cases
  const disabledTime = useSignal<TimeValue>({ hour: "11", minute: "30" });
  const loadingTime = useSignal<TimeValue>({ hour: "15", minute: "00" });
  const errorTime = useSignal<TimeValue>({ hour: "", minute: "" });
  const clearableTime = useSignal<TimeValue>({ hour: "17", minute: "25" });
  const withSecondsTime = useSignal<TimeValue>({ hour: "19", minute: "35", second: "45" });
  const format12Time = useSignal<TimeValue>({ hour: "03", minute: "20", period: "PM" });

  // Loading state
  const isLoading = useSignal(false);

  // Change handlers
  const handleTimeChange$ = $(
    (timeSignal: any, type: keyof TimeValue, value: string) => {
      timeSignal.value = { ...timeSignal.value, [type]: value };
    }
  );

  const handleClear$ = $((timeSignal: any) => {
    timeSignal.value = { hour: "", minute: "", second: "", period: "AM" };
  });

  const toggleLoading$ = $(() => {
    isLoading.value = !isLoading.value;
  });

  return (
    <div class="p-6 max-w-7xl mx-auto">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          TimePicker Styled Variants
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Comprehensive examples showing all variants, sizes, and states with dark mode compatibility.
        </p>
      </div>

      {/* Variants Grid */}
      <div class="space-y-12">
        {/* Default Variant */}
        <section>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Default Variant
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Small (sm)</h4>
              <TimePicker
                time={defaultTimes.sm.value}
                onChange$={(type, value) => handleTimeChange$(defaultTimes.sm, type, value)}
                size="sm"
                variant="default"
                label="Small Default"
                id="default-sm"
              />
            </div>
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Medium (md)</h4>
              <TimePicker
                time={defaultTimes.md.value}
                onChange$={(type, value) => handleTimeChange$(defaultTimes.md, type, value)}
                size="md"
                variant="default"
                label="Medium Default"
                id="default-md"
              />
            </div>
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Large (lg)</h4>
              <TimePicker
                time={defaultTimes.lg.value}
                onChange$={(type, value) => handleTimeChange$(defaultTimes.lg, type, value)}
                size="lg"
                variant="default"
                label="Large Default"
                id="default-lg"
              />
            </div>
          </div>
        </section>

        {/* Outline Variant */}
        <section>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Outline Variant
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Small (sm)</h4>
              <TimePicker
                time={outlineTimes.sm.value}
                onChange$={(type, value) => handleTimeChange$(outlineTimes.sm, type, value)}
                size="sm"
                variant="outline"
                label="Small Outline"
                id="outline-sm"
              />
            </div>
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Medium (md)</h4>
              <TimePicker
                time={outlineTimes.md.value}
                onChange$={(type, value) => handleTimeChange$(outlineTimes.md, type, value)}
                size="md"
                variant="outline"
                label="Medium Outline"
                id="outline-md"
              />
            </div>
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Large (lg)</h4>
              <TimePicker
                time={outlineTimes.lg.value}
                onChange$={(type, value) => handleTimeChange$(outlineTimes.lg, type, value)}
                size="lg"
                variant="outline"
                label="Large Outline"
                id="outline-lg"
              />
            </div>
          </div>
        </section>

        {/* Filled Variant */}
        <section>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Filled Variant
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Small (sm)</h4>
              <TimePicker
                time={filledTimes.sm.value}
                onChange$={(type, value) => handleTimeChange$(filledTimes.sm, type, value)}
                size="sm"
                variant="filled"
                label="Small Filled"
                id="filled-sm"
              />
            </div>
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Medium (md)</h4>
              <TimePicker
                time={filledTimes.md.value}
                onChange$={(type, value) => handleTimeChange$(filledTimes.md, type, value)}
                size="md"
                variant="filled"
                label="Medium Filled"
                id="filled-md"
              />
            </div>
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Large (lg)</h4>
              <TimePicker
                time={filledTimes.lg.value}
                onChange$={(type, value) => handleTimeChange$(filledTimes.lg, type, value)}
                size="lg"
                variant="filled"
                label="Large Filled"
                id="filled-lg"
              />
            </div>
          </div>
        </section>

        {/* States Section */}
        <section>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Different States
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Disabled State */}
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Disabled</h4>
              <TimePicker
                time={disabledTime.value}
                onChange$={(type, value) => handleTimeChange$(disabledTime, type, value)}
                size="md"
                variant="default"
                disabled={true}
                label="Disabled TimePicker"
                id="disabled-time"
              />
            </div>

            {/* Loading State */}
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Loading</h4>
              <TimePicker
                time={loadingTime.value}
                onChange$={(type, value) => handleTimeChange$(loadingTime, type, value)}
                size="md"
                variant="outline"
                loading={isLoading.value}
                label="Loading TimePicker"
                id="loading-time"
              />
              <button
                onClick$={toggleLoading$}
                class="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Toggle Loading
              </button>
            </div>

            {/* Error State */}
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Error</h4>
              <TimePicker
                time={errorTime.value}
                onChange$={(type, value) => handleTimeChange$(errorTime, type, value)}
                size="md"
                variant="filled"
                error={true}
                errorMessage="Please select a valid time"
                label="Error TimePicker"
                id="error-time"
                required={true}
              />
            </div>
          </div>
        </section>

        {/* Special Features */}
        <section>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Special Features
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Clear Button */}
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">With Clear Button</h4>
              <TimePicker
                time={clearableTime.value}
                onChange$={(type, value) => handleTimeChange$(clearableTime, type, value)}
                size="md"
                variant="default"
                showClearButton={true}
                onClear$={() => handleClear$(clearableTime)}
                label="Clearable TimePicker"
                id="clearable-time"
              />
            </div>

            {/* With Seconds */}
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">With Seconds</h4>
              <TimePicker
                time={withSecondsTime.value}
                onChange$={(type, value) => handleTimeChange$(withSecondsTime, type, value)}
                size="md"
                variant="outline"
                showSeconds={true}
                label="TimePicker with Seconds"
                id="seconds-time"
              />
            </div>

            {/* 12-Hour Format */}
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">12-Hour Format</h4>
              <TimePicker
                time={format12Time.value}
                onChange$={(type, value) => handleTimeChange$(format12Time, type, value)}
                size="md"
                variant="filled"
                format="12"
                label="12-Hour Format"
                id="format12-time"
              />
            </div>

            {/* Read-Only */}
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Read-Only</h4>
              <TimePicker
                time={{ hour: "22", minute: "15" }}
                onChange$={() => {}}
                size="md"
                variant="default"
                readOnly={true}
                label="Read-Only TimePicker"
                id="readonly-time"
              />
            </div>
          </div>
        </section>

        {/* Dark Mode Note */}
        <section>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Dark Mode Compatibility
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              All TimePicker variants automatically adapt to dark mode using CSS custom properties.
              Toggle your system's dark mode or use the application's theme switcher to see the adaptive styling in action.
              The component maintains proper contrast ratios and accessibility standards in both light and dark themes.
            </p>
          </div>
        </section>

        {/* Customization Examples */}
        <section>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Customization Examples
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inline TimePicker */}
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Inline Style</h4>
              <div class="flex items-center gap-4">
                <span class="text-sm text-gray-600 dark:text-gray-400">Meeting time:</span>
                <TimePicker
                  time={{ hour: "14", minute: "30" }}
                  onChange$={() => {}}
                  size="sm"
                  variant="outline"
                  inline={true}
                  id="inline-time"
                />
              </div>
            </div>

            {/* With Minute Step */}
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">15-Minute Intervals</h4>
              <TimePicker
                time={{ hour: "09", minute: "15" }}
                onChange$={() => {}}
                size="md"
                variant="default"
                minuteStep={15}
                label="15-Minute Steps"
                id="step-time"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
});