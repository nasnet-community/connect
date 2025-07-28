import { component$, useSignal, useComputed$, $ } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "../Timepicker";

interface TimezoneInfo {
  name: string;
  offset: number; // UTC offset in hours
  abbreviation: string;
  city: string;
}

const timezones: TimezoneInfo[] = [
  { name: "Pacific Standard Time", offset: -8, abbreviation: "PST", city: "Los Angeles" },
  { name: "Mountain Standard Time", offset: -7, abbreviation: "MST", city: "Denver" },
  { name: "Central Standard Time", offset: -6, abbreviation: "CST", city: "Chicago" },
  { name: "Eastern Standard Time", offset: -5, abbreviation: "EST", city: "New York" },
  { name: "Greenwich Mean Time", offset: 0, abbreviation: "GMT", city: "London" },
  { name: "Central European Time", offset: 1, abbreviation: "CET", city: "Paris" },
  { name: "Japan Standard Time", offset: 9, abbreviation: "JST", city: "Tokyo" },
  { name: "Australian Eastern Time", offset: 10, abbreviation: "AET", city: "Sydney" },
];

export const TimezoneAwareExample = component$(() => {
  const localTime = useSignal<TimeValue>({ hour: "14", minute: "30" });
  const selectedTimezone = useSignal<TimezoneInfo>(timezones[0]);
  const showAllTimezones = useSignal(false);
  const use24HourFormat = useSignal(true);

  // Convert local time to UTC minutes
  const localTimeToUTC = useComputed$(() => {
    const localOffset = new Date().getTimezoneOffset() / 60; // Browser timezone offset
    const hours = parseInt(localTime.value.hour) || 0;
    const minutes = parseInt(localTime.value.minute) || 0;
    const totalMinutes = hours * 60 + minutes;
    
    // Convert to UTC
    return totalMinutes + (localOffset * 60);
  });

  // Convert UTC to specific timezone
  const convertToTimezone = (utcMinutes: number, timezone: TimezoneInfo) => {
    const targetMinutes = utcMinutes - (timezone.offset * 60);
    const hours = Math.floor(targetMinutes / 60) % 24;
    const mins = targetMinutes % 60;
    
    return {
      hours: hours < 0 ? hours + 24 : hours,
      minutes: mins < 0 ? mins + 60 : mins,
    };
  };

  // Format time for display
  const formatTimeForTimezone = (timezone: TimezoneInfo) => {
    const converted = convertToTimezone(localTimeToUTC.value, timezone);
    
    if (use24HourFormat.value) {
      return `${converted.hours.toString().padStart(2, '0')}:${converted.minutes.toString().padStart(2, '0')}`;
    } else {
      const hour12 = converted.hours === 0 ? 12 : converted.hours > 12 ? converted.hours - 12 : converted.hours;
      const period = converted.hours >= 12 ? 'PM' : 'AM';
      return `${hour12}:${converted.minutes.toString().padStart(2, '0')} ${period}`;
    }
  };

  const handleTimeChange$ = $((field: keyof TimeValue, value: string) => {
    localTime.value = { ...localTime.value, [field]: value };
  });

  const handleTimezoneSelect$ = $((timezone: TimezoneInfo) => {
    selectedTimezone.value = timezone;
  });

  const getCurrentTimeInTimezone$ = $((timezone: TimezoneInfo) => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const targetTime = new Date(utc + (timezone.offset * 3600000));
    
    const hours = targetTime.getHours().toString().padStart(2, '0');
    const minutes = targetTime.getMinutes().toString().padStart(2, '0');
    
    localTime.value = { hour: hours, minute: minutes };
  });

  return (
    <div class="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Timezone-Aware Time Selection
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Select a time and see how it appears across different timezones. 
          Perfect for scheduling international meetings and events.
        </p>
      </div>

      {/* Format Controls */}
      <div class="flex flex-wrap gap-4 items-center">
        <label class="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={use24HourFormat.value}
            onChange$={(e, el) => use24HourFormat.value = el.checked}
            class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span class="text-sm text-gray-700 dark:text-gray-300">24-hour format</span>
        </label>

        <label class="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showAllTimezones.value}
            onChange$={(e, el) => showAllTimezones.value = el.checked}
            class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span class="text-sm text-gray-700 dark:text-gray-300">Show all timezones</span>
        </label>
      </div>

      {/* Main Time Input */}
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Local Time
          </h3>
          <button
            onClick$={() => getCurrentTimeInTimezone$(selectedTimezone.value)}
            class="px-3 py-1 text-sm bg-primary-500 text-white rounded-lg
                   hover:bg-primary-600 transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            Use Current Time
          </button>
        </div>

        <div class="max-w-md">
          <TimePicker
            time={localTime.value}
            onChange$={handleTimeChange$}
            format={use24HourFormat.value ? "24" : "12"}
            label="Select Time"
            size="lg"
            variant="outline"
            minuteStep={15}
          />
        </div>
      </div>

      {/* Primary Timezone Display */}
      <div class="space-y-4 p-4 border-2 border-primary-200 dark:border-primary-800 rounded-lg bg-primary-50 dark:bg-primary-900/20">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-primary-900 dark:text-primary-100">
            Target Timezone
          </h3>
          <select
            value={selectedTimezone.value.name}
            onChange$={(e, el) => {
              const tz = timezones.find(t => t.name === el.value);
              if (tz) handleTimezoneSelect$(tz);
            }}
            class="px-3 py-2 border border-primary-300 dark:border-primary-700 rounded-lg
                   bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary-500/20"
          >
            {timezones.map((tz) => (
              <option key={tz.name} value={tz.name}>
                {`${tz.city} (${tz.abbreviation})`}
              </option>
            ))}
          </select>
        </div>

        <div class="text-center">
          <div class="text-3xl font-bold text-primary-900 dark:text-primary-100 mb-2">
            {formatTimeForTimezone(selectedTimezone.value)}
          </div>
          <div class="text-sm text-primary-700 dark:text-primary-300">
            {selectedTimezone.value.city} • {selectedTimezone.value.abbreviation} • UTC{selectedTimezone.value.offset >= 0 ? '+' : ''}{selectedTimezone.value.offset}
          </div>
        </div>
      </div>

      {/* All Timezones Grid */}
      {showAllTimezones.value && (
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Time Across All Zones
          </h3>
          
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {timezones.map((timezone) => (
              <div
                key={timezone.name}
                class={`p-4 rounded-lg border transition-all duration-200 cursor-pointer
                  ${selectedTimezone.value.name === timezone.name
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                onClick$={() => handleTimezoneSelect$(timezone)}
              >
                <div class="text-center">
                  <div class={`text-xl font-bold mb-1
                    ${selectedTimezone.value.name === timezone.name
                      ? "text-primary-900 dark:text-primary-100"
                      : "text-gray-900 dark:text-white"
                    }`}>
                    {formatTimeForTimezone(timezone)}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    {timezone.city}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-500">
                    {timezone.abbreviation} • UTC{timezone.offset >= 0 ? '+' : ''}{timezone.offset}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meeting Scheduler Helper */}
      <div class="space-y-4 p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
        <h3 class="text-lg font-semibold text-green-900 dark:text-green-100">
          🌍 Meeting Scheduler Helper
        </h3>
        
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-2">
            <h4 class="font-medium text-green-800 dark:text-green-200">
              Business Hours Check:
            </h4>
            {timezones.slice(0, 4).map((tz) => {
              const converted = convertToTimezone(localTimeToUTC.value, tz);
              const isBusinessHours = converted.hours >= 9 && converted.hours < 17;
              
              return (
                <div key={tz.name} class={`flex items-center justify-between text-sm p-2 rounded
                  ${isBusinessHours 
                    ? "bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-200" 
                    : "bg-red-100 dark:bg-red-800/30 text-red-800 dark:text-red-200"
                  }`}>
                  <span>{tz.city}</span>
                  <span class="font-mono">{formatTimeForTimezone(tz)}</span>
                  <span class="text-xs">
                    {isBusinessHours ? "✓ Business" : "✗ Off hours"}
                  </span>
                </div>
              );
            })}
          </div>

          <div class="space-y-2">
            <h4 class="font-medium text-green-800 dark:text-green-200">
              Quick Actions:
            </h4>
            <div class="space-y-2">
              <button
                onClick$={() => {
                  localTime.value = { hour: "09", minute: "00" };
                }}
                class="w-full px-3 py-2 text-sm bg-green-600 text-white rounded-lg
                       hover:bg-green-700 transition-colors duration-200"
              >
                Set to 9 AM Local
              </button>
              <button
                onClick$={() => {
                  localTime.value = { hour: "14", minute: "00" };
                }}
                class="w-full px-3 py-2 text-sm bg-green-600 text-white rounded-lg
                       hover:bg-green-700 transition-colors duration-200"
              >
                Set to 2 PM Local
              </button>
              <button
                onClick$={() => {
                  // Find best meeting time (example logic)
                  localTime.value = { hour: "10", minute: "00" };
                }}
                class="w-full px-3 py-2 text-sm bg-green-600 text-white rounded-lg
                       hover:bg-green-700 transition-colors duration-200"
              >
                Find Best Meeting Time
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Info */}
      <div class="text-xs text-gray-500 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-900 rounded">
        <strong>Technical Note:</strong> This example demonstrates timezone conversion using UTC as an intermediate format.
        In production, consider using libraries like date-fns-tz or moment-timezone for more robust timezone handling,
        including daylight saving time transitions and historical timezone data.
      </div>
    </div>
  );
});

export default TimezoneAwareExample;