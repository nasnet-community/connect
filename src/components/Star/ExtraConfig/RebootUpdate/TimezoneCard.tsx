import { component$, $, useComputed$ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";
import { Select, type SelectOption } from "~/components/Core/Select";

// Organize timezones by continent
export const TIMEZONES = {
  Asia: [
    "Asia/Tehran",
    "Asia/Dubai",
    "Asia/Kabul",
    "Asia/Karachi",
    "Asia/Kolkata",
    "Asia/Dhaka",
    "Asia/Bangkok",
    "Asia/Singapore",
    "Asia/Shanghai",
    "Asia/Tokyo",
    "Asia/Seoul",
    "Asia/Jerusalem",
    "Asia/Baghdad",
    "Asia/Riyadh",
    "Asia/Istanbul",
  ],
  Europe: [
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Europe/Rome",
    "Europe/Madrid",
    "Europe/Moscow",
    "Europe/Istanbul",
    "Europe/Athens",
    "Europe/Amsterdam",
    "Europe/Dublin",
  ],
  America: [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "America/Toronto",
    "America/Vancouver",
    "America/Mexico_City",
    "America/Sao_Paulo",
    "America/Buenos_Aires",
    "America/Bogota",
  ],
  Africa: [
    "Africa/Cairo",
    "Africa/Lagos",
    "Africa/Nairobi",
    "Africa/Johannesburg",
    "Africa/Casablanca",
    "Africa/Accra",
  ],
  Australia: [
    "Australia/Sydney",
    "Australia/Melbourne",
    "Australia/Perth",
    "Australia/Brisbane",
    "Australia/Adelaide",
  ],
  Pacific: ["Pacific/Auckland", "Pacific/Fiji", "Pacific/Honolulu"],
};

interface TimezoneCardProps {
  selectedTimezone: Signal<string | undefined>;
}

export const TimezoneCard = component$<TimezoneCardProps>(
  ({ selectedTimezone }) => {
    // Convert the timezone data to SelectOption format
    const timezoneOptions = useComputed$(() => {
      const options: SelectOption[] = [];

      Object.entries(TIMEZONES).forEach(([continent, zones]) => {
        zones.forEach((zone) => {
          options.push({
            value: zone,
            label: zone,
            group: continent,
          });
        });
      });

      return options;
    });

    // Handle the timezone change
    const handleTimezoneChange = $((value: string | string[]) => {
      // We only care about string values in this component
      const newValue = typeof value === "string" ? value : "";
      selectedTimezone.value = newValue;
    });

    return (
      <div class="bg-surface-secondary dark:bg-surface-dark-secondary rounded-xl p-5">
        <div class="relative z-20">
          <Select
            options={timezoneOptions.value}
            value={selectedTimezone.value}
            label={$localize`Timezone`}
            onChange$={handleTimezoneChange}
            placeholder={$localize`Search your city or timezone...`}
            searchable={true}
            clearable={true}
            maxHeight="300px"
          />
        </div>
      </div>
    );
  },
);
