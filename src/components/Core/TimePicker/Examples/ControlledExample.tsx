import { component$, useSignal, $, useComputed$ } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "../Timepicker";

interface FormData {
  startTime: TimeValue;
  endTime: TimeValue;
  breakTime: TimeValue;
}

interface ValidationErrors {
  startTime?: string;
  endTime?: string;
  breakTime?: string;
  form?: string;
}

export const ControlledExample = component$(() => {
  // Form state
  const formData = useSignal<FormData>({
    startTime: { hour: "", minute: "" },
    endTime: { hour: "", minute: "" },
    breakTime: { hour: "", minute: "" },
  });

  // Validation errors
  const errors = useSignal<ValidationErrors>({});

  // Form submission state
  const isSubmitting = useSignal(false);
  const isSubmitted = useSignal(false);

  // Convert time to minutes for easier comparison
  const timeToMinutes = $((time: TimeValue): number => {
    const hour = parseInt(time.hour, 10) || 0;
    const minute = parseInt(time.minute, 10) || 0;
    return hour * 60 + minute;
  });

  // Validate individual time fields
  const validateTime = $((time: TimeValue, fieldName: string): string | undefined => {
    if (!time.hour || !time.minute) {
      return `${fieldName} is required`;
    }

    const hour = parseInt(time.hour);
    const minute = parseInt(time.minute);

    // Business hours validation (9 AM to 5 PM)
    if (fieldName === "Start time" || fieldName === "End time") {
      if (hour < 9 || hour > 17) {
        return `${fieldName} must be between 9:00 AM and 5:00 PM`;
      }
    }

    // Break time validation (11 AM to 2 PM)
    if (fieldName === "Break time") {
      if (hour < 11 || hour > 14) {
        return `${fieldName} must be between 11:00 AM and 2:00 PM`;
      }
    }

    // Additional minute validation for break time (must be 30 or 60 minutes)
    if (fieldName === "Break time" && minute !== 0 && minute !== 30) {
      return "Break time must be on the hour or half hour";
    }

    return undefined;
  });

  // Real-time validation computed values
  const startTimeError = useComputed$(() => 
    validateTime(formData.value.startTime, "Start time")
  );

  const endTimeError = useComputed$(() => {
    const baseError = validateTime(formData.value.endTime, "End time");
    if (baseError) return baseError;

    // Check if end time is after start time
    const startMinutes = timeToMinutes(formData.value.startTime);
    const endMinutes = timeToMinutes(formData.value.endTime);
    const startCompareMinutes = Number(startMinutes) || 0;
    const endCompareMinutes = Number(endMinutes) || 0;

    if (startCompareMinutes > 0 && endCompareMinutes > 0 && endCompareMinutes <= startCompareMinutes) {
      return "End time must be after start time";
    }

    // Check minimum 4-hour work period
    const startDurationMinutes = Number(startMinutes) || 0;
    const endDurationMinutes = Number(endMinutes) || 0;
    if (startDurationMinutes > 0 && endDurationMinutes > 0 && (endDurationMinutes - startDurationMinutes) < 240) {
      return "Work period must be at least 4 hours";
    }

    return undefined;
  });

  const breakTimeError = useComputed$(() => {
    const baseError = validateTime(formData.value.breakTime, "Break time");
    if (baseError) return baseError;

    // Check if break time is within work hours
    const startMinutes = timeToMinutes(formData.value.startTime);
    const endMinutes = timeToMinutes(formData.value.endTime);
    const breakMinutes = timeToMinutes(formData.value.breakTime);
    const startBreakMinutes = Number(startMinutes) || 0;
    const endBreakMinutes = Number(endMinutes) || 0;
    const breakTimeMinutes = Number(breakMinutes) || 0;

    if (startBreakMinutes > 0 && endBreakMinutes > 0 && breakTimeMinutes > 0) {
      if (breakTimeMinutes <= startBreakMinutes || breakTimeMinutes >= endBreakMinutes) {
        return "Break time must be within work hours";
      }
    }

    return undefined;
  });

  // Form validation
  const isFormValid = useComputed$(() => 
    !startTimeError.value && !endTimeError.value && !breakTimeError.value &&
    formData.value.startTime.hour && formData.value.startTime.minute &&
    formData.value.endTime.hour && formData.value.endTime.minute &&
    formData.value.breakTime.hour && formData.value.breakTime.minute
  );

  // Handle time change
  const handleTimeChange = $((timeType: keyof FormData, field: keyof TimeValue, value: string) => {
    formData.value = {
      ...formData.value,
      [timeType]: {
        ...formData.value[timeType],
        [field]: value,
      },
    };

    // Clear form-level errors when user makes changes
    if (errors.value.form) {
      errors.value = { ...errors.value, form: undefined };
    }
  });

  // Handle form submission
  const handleSubmit = $(async () => {
    isSubmitting.value = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check for final validation
      if (!isFormValid.value) {
        errors.value = { ...errors.value, form: "Please fix all validation errors before submitting" };
        return;
      }

      // Success
      isSubmitted.value = true;
      errors.value = {};
      
      console.log("Form submitted successfully:", formData.value);
    } catch (error) {
      errors.value = { ...errors.value, form: "Failed to submit form. Please try again." };
    } finally {
      isSubmitting.value = false;
    }
  });

  // Reset form
  const handleReset = $(() => {
    formData.value = {
      startTime: { hour: "", minute: "" },
      endTime: { hour: "", minute: "" },
      breakTime: { hour: "", minute: "" },
    };
    errors.value = {};
    isSubmitted.value = false;
  });

  return (
    <div class="space-y-6">
      <div class="rounded-lg border border-border-DEFAULT dark:border-border-dark p-6">
        <h3 class="mb-4 text-lg font-semibold">Work Schedule Configuration</h3>
        <p class="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Configure your work schedule with validation. Work hours must be between 9 AM and 5 PM, 
          break time must be between 11 AM and 2 PM, and minimum work period is 4 hours.
        </p>

        <form class="space-y-6" preventdefault:submit onSubmit$={handleSubmit}>
          {/* Start Time */}
          <div>
            <TimePicker
              time={formData.value.startTime}
              label="Start Time"
              id="start-time"
              name="startTime"
              required
              format="24"
              minuteStep={15}
              error={!!startTimeError.value}
              errorMessage={startTimeError.value}
              placeholder={{ hour: "Select hour", minute: "Select minute" }}
              onChange$={(field, value) => handleTimeChange("startTime", field, value)}
            />
          </div>

          {/* End Time */}
          <div>
            <TimePicker
              time={formData.value.endTime}
              label="End Time"
              id="end-time"
              name="endTime"
              required
              format="24"
              minuteStep={15}
              error={!!endTimeError.value}
              errorMessage={endTimeError.value}
              placeholder={{ hour: "Select hour", minute: "Select minute" }}
              onChange$={(field, value) => handleTimeChange("endTime", field, value)}
            />
          </div>

          {/* Break Time */}
          <div>
            <TimePicker
              time={formData.value.breakTime}
              label="Break Time"
              id="break-time"
              name="breakTime"
              required
              format="24"
              minuteStep={30}
              error={!!breakTimeError.value}
              errorMessage={breakTimeError.value}
              placeholder={{ hour: "Select hour", minute: "Select minute" }}
              onChange$={(field, value) => handleTimeChange("breakTime", field, value)}
            />
          </div>

          {/* Form-level error */}
          {errors.value.form && (
            <div class="rounded-lg bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 p-4">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-error-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm text-error-700 dark:text-error-400">{errors.value.form}</p>
              </div>
            </div>
          )}

          {/* Success message */}
          {isSubmitted.value && (
            <div class="rounded-lg bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 p-4">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-success-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M5 13l4 4L19 7" />
                </svg>
                <p class="text-sm text-success-700 dark:text-success-400">
                  Work schedule saved successfully!
                </p>
              </div>
            </div>
          )}

          {/* Current values display */}
          <div class="rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
            <h4 class="text-sm font-medium mb-2">Current Schedule:</h4>
            <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Start: {formData.value.startTime.hour}:{formData.value.startTime.minute || "00"}</div>
              <div>End: {formData.value.endTime.hour}:{formData.value.endTime.minute || "00"}</div>
              <div>Break: {formData.value.breakTime.hour}:{formData.value.breakTime.minute || "00"}</div>
              {formData.value.startTime.hour && formData.value.endTime.hour && (
                <div class="pt-1 border-t border-gray-200 dark:border-gray-700">
                  Work Duration: {(() => {
                    const startMins = timeToMinutes(formData.value.startTime);
                    const endMins = timeToMinutes(formData.value.endTime);
                    return Math.max(0, Number(endMins) - Number(startMins));
                  })()} minutes
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div class="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={!isFormValid.value || isSubmitting.value}
              class={`
                px-4 py-2 rounded-lg font-medium transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-primary-500/20
                ${isFormValid.value && !isSubmitting.value
                  ? "bg-primary-600 hover:bg-primary-700 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                }
              `}
            >
              {isSubmitting.value ? (
                <div class="flex items-center">
                  <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                "Save Schedule"
              )}
            </button>

            <button
              type="button"
              onClick$={handleReset}
              disabled={isSubmitting.value}
              class="
                px-4 py-2 rounded-lg font-medium transition-all duration-200
                border border-gray-300 dark:border-gray-600
                text-gray-700 dark:text-gray-300
                hover:bg-gray-50 dark:hover:bg-gray-700
                focus:outline-none focus:ring-2 focus:ring-gray-500/20
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              Reset
            </button>
          </div>

          {/* Validation status indicator */}
          <div class="text-xs text-gray-500 dark:text-gray-400">
            Form status: {isFormValid.value ? (
              <span class="text-success-600 dark:text-success-400">✓ Valid</span>
            ) : (
              <span class="text-error-600 dark:text-error-400">✗ Invalid</span>
            )}
          </div>
        </form>
      </div>

      {/* Business Rules Documentation */}
      <div class="rounded-lg border border-border-DEFAULT dark:border-border-dark p-4">
        <h4 class="text-sm font-semibold mb-2">Validation Rules:</h4>
        <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Work hours must be between 9:00 AM (09:00) and 5:00 PM (17:00)</li>
          <li>• Break time must be between 11:00 AM (11:00) and 2:00 PM (14:00)</li>
          <li>• Break time must be on the hour or half hour (00 or 30 minutes)</li>
          <li>• End time must be after start time</li>
          <li>• Minimum work period is 4 hours</li>
          <li>• Break time must be within work hours</li>
        </ul>
      </div>
    </div>
  );
});