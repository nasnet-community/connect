import { component$, useSignal, useComputed$, $ } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "../Timepicker";

export const TimeRangeValidationExample = component$(() => {
  const startTime = useSignal<TimeValue>({ hour: "09", minute: "00" });
  const endTime = useSignal<TimeValue>({ hour: "17", minute: "00" });
  const minDuration = useSignal(30); // Minimum duration in minutes
  const maxDuration = useSignal(480); // Maximum duration in minutes (8 hours)
  
  const startError = useSignal(false);
  const endError = useSignal(false);
  const startErrorMessage = useSignal("");
  const endErrorMessage = useSignal("");

  // Helper function to convert time to minutes
  const timeToMinutes = $((time: TimeValue): number => {
    const hours = parseInt(time.hour, 10) || 0;
    const minutes = parseInt(time.minute, 10) || 0;
    return hours * 60 + minutes;
  });


  // Computed duration and validation
  const duration = useComputed$(() => {
    const start = timeToMinutes(startTime.value);
    const end = timeToMinutes(endTime.value);
    const startNum = Number(start) || 0;
    const endNum = Number(end) || 0;
    return endNum - startNum;
  });

  const isValidRange = useComputed$(() => {
    const dur = Number(duration.value) || 0;
    const minDur = Number(minDuration.value) || 0;
    const maxDur = Number(maxDuration.value) || 0;
    return dur >= minDur && dur <= maxDur;
  });

  const validationMessage = useComputed$(() => {
    const dur = Number(duration.value) || 0;
    const minDur = Number(minDuration.value) || 0;
    const maxDur = Number(maxDuration.value) || 0;
    
    if (dur < 0) return "End time must be after start time";
    
    // Inline format duration logic to avoid QRL issues
    const formatDur = (minutes: number): string => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      if (hours === 0) return `${mins}m`;
      if (mins === 0) return `${hours}h`;
      return `${hours}h ${mins}m`;
    };
    
    if (dur < minDur) return `Duration must be at least ${formatDur(minDur)}`;
    if (dur > maxDur) return `Duration cannot exceed ${formatDur(maxDur)}`;
    return "";
  });

  // Validation handlers
  const validateTimeRange$ = $(() => {
    const dur = Number(duration.value) || 0;
    const isValid = isValidRange.value;
    const message = validationMessage.value;

    // Update start time error
    if (dur < 0) {
      startError.value = true;
      startErrorMessage.value = "Start time must be before end time";
    } else {
      startError.value = false;
      startErrorMessage.value = "";
    }

    // Update end time error
    if (!isValid && dur >= 0) {
      endError.value = true;
      endErrorMessage.value = message;
    } else {
      endError.value = false;
      endErrorMessage.value = "";
    }
  });

  const handleStartTimeChange$ = $((field: keyof TimeValue, value: string) => {
    startTime.value = { ...startTime.value, [field]: value };
    validateTimeRange$();
  });

  const handleEndTimeChange$ = $((field: keyof TimeValue, value: string) => {
    endTime.value = { ...endTime.value, [field]: value };
    validateTimeRange$();
  });

  const handleQuickSelect$ = $((preset: string) => {
    switch (preset) {
      case "morning":
        startTime.value = { hour: "08", minute: "00" };
        endTime.value = { hour: "12", minute: "00" };
        break;
      case "afternoon":
        startTime.value = { hour: "13", minute: "00" };
        endTime.value = { hour: "17", minute: "00" };
        break;
      case "fullday":
        startTime.value = { hour: "09", minute: "00" };
        endTime.value = { hour: "17", minute: "00" };
        break;
      case "meeting":
        startTime.value = { hour: "14", minute: "00" };
        endTime.value = { hour: "15", minute: "30" };
        break;
    }
    validateTimeRange$();
  });

  return (
    <div class="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Time Range Validation Example
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          This example demonstrates advanced time range validation with duration constraints,
          error handling, and user-friendly feedback.
        </p>
      </div>

      {/* Quick Presets */}
      <div class="space-y-3">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Quick Presets
        </h3>
        <div class="flex flex-wrap gap-2">
          {[
            { key: "morning", label: "Morning (8 AM - 12 PM)" },
            { key: "afternoon", label: "Afternoon (1 PM - 5 PM)" },
            { key: "fullday", label: "Full Day (9 AM - 5 PM)" },
            { key: "meeting", label: "Meeting (2 PM - 3:30 PM)" },
          ].map((preset) => (
            <button
              key={preset.key}
              onClick$={() => handleQuickSelect$(preset.key)}
              class="px-3 py-2 text-sm rounded-lg border border-border-DEFAULT dark:border-border-dark
                     hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Time Range Selectors */}
      <div class="grid gap-6 sm:grid-cols-2">
        <div class="space-y-4">
          <TimePicker
            time={startTime.value}
            onChange$={handleStartTimeChange$}
            label="Start Time"
            size="md"
            variant="outline"
            error={startError.value}
            errorMessage={startErrorMessage.value}
            minuteStep={15}
          />
        </div>

        <div class="space-y-4">
          <TimePicker
            time={endTime.value}
            onChange$={handleEndTimeChange$}
            label="End Time"
            size="md"
            variant="outline"
            error={endError.value}
            errorMessage={endErrorMessage.value}
            minuteStep={15}
          />
        </div>
      </div>

      {/* Duration Constraints */}
      <div class="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Duration Constraints
        </h3>
        
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Minimum Duration: {(() => {
                const minutes = minDuration.value;
                const hours = Math.floor(minutes / 60);
                const mins = minutes % 60;
                if (hours === 0) return `${mins}m`;
                if (mins === 0) return `${hours}h`;
                return `${hours}h ${mins}m`;
              })()}
            </label>
            <input
              type="range"
              min="15"
              max="120"
              step="15"
              value={minDuration.value}
              onInput$={(e, el) => {
                minDuration.value = parseInt(el.value);
                validateTimeRange$();
              }}
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                     dark:bg-gray-700 slider"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Maximum Duration: {(() => {
                const minutes = maxDuration.value;
                const hours = Math.floor(minutes / 60);
                const mins = minutes % 60;
                if (hours === 0) return `${mins}m`;
                if (mins === 0) return `${hours}h`;
                return `${hours}h ${mins}m`;
              })()}
            </label>
            <input
              type="range"
              min="60"
              max="720"
              step="30"
              value={maxDuration.value}
              onInput$={(e, el) => {
                maxDuration.value = parseInt(el.value);
                validateTimeRange$();
              }}
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                     dark:bg-gray-700 slider"
            />
          </div>
        </div>
      </div>

      {/* Duration Display and Validation */}
      <div class={`
        p-4 rounded-lg border-2 transition-all duration-200
        ${isValidRange.value 
          ? "border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-900/20" 
          : "border-error-200 dark:border-error-800 bg-error-50 dark:bg-error-900/20"
        }
      `}>
        <div class="flex items-center justify-between mb-2">
          <h3 class={`text-lg font-semibold ${
            isValidRange.value 
              ? "text-success-800 dark:text-success-200" 
              : "text-error-800 dark:text-error-200"
          }`}>
            Duration: {(() => {
              const minutes = Math.abs(duration.value);
              const hours = Math.floor(minutes / 60);
              const mins = minutes % 60;
              if (hours === 0) return `${mins}m`;
              if (mins === 0) return `${hours}h`;
              return `${hours}h ${mins}m`;
            })()}
          </h3>
          
          <div class={`flex items-center ${
            isValidRange.value 
              ? "text-success-600 dark:text-success-400" 
              : "text-error-600 dark:text-error-400"
          }`}>
            {isValidRange.value ? (
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            ) : (
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            )}
          </div>
        </div>

        <div class={`text-sm ${
          isValidRange.value 
            ? "text-success-700 dark:text-success-300" 
            : "text-error-700 dark:text-error-300"
        }`}>
          {isValidRange.value 
            ? `✓ Duration is within acceptable range (${(() => {
                const minutes = minDuration.value;
                const hours = Math.floor(minutes / 60);
                const mins = minutes % 60;
                if (hours === 0) return `${mins}m`;
                if (mins === 0) return `${hours}h`;
                return `${hours}h ${mins}m`;
              })()} - ${(() => {
                const minutes = maxDuration.value;
                const hours = Math.floor(minutes / 60);
                const mins = minutes % 60;
                if (hours === 0) return `${mins}m`;
                if (mins === 0) return `${hours}h`;
                return `${hours}h ${mins}m`;
              })()})`
            : `✗ ${validationMessage.value}`
          }
        </div>

        {/* Time Summary */}
        <div class="mt-3 pt-3 border-t border-current/20">
          <div class="text-sm space-y-1">
            <div>Start: {startTime.value.hour}:{startTime.value.minute}</div>
            <div>End: {endTime.value.hour}:{endTime.value.minute}</div>
            <div>Total Duration: {(() => {
              const minutes = Math.abs(duration.value);
              const hours = Math.floor(minutes / 60);
              const mins = minutes % 60;
              if (hours === 0) return `${mins}m`;
              if (mins === 0) return `${hours}h`;
              return `${hours}h ${mins}m`;
            })()}</div>
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <div class="space-y-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100">
          Advanced Features Demonstrated
        </h3>
        
        <div class="grid gap-3 sm:grid-cols-2 text-sm text-blue-800 dark:text-blue-200">
          <div class="space-y-2">
            <h4 class="font-medium">Validation Features:</h4>
            <ul class="space-y-1 text-xs">
              <li>• Real-time duration calculation</li>
              <li>• Min/max duration constraints</li>
              <li>• Cross-field validation</li>
              <li>• Dynamic error messages</li>
              <li>• Visual validation feedback</li>
            </ul>
          </div>
          
          <div class="space-y-2">
            <h4 class="font-medium">User Experience:</h4>
            <ul class="space-y-1 text-xs">
              <li>• Quick preset buttons</li>
              <li>• Adjustable constraints</li>
              <li>• Live duration display</li>
              <li>• Clear error indicators</li>
              <li>• Intuitive validation states</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TimeRangeValidationExample;