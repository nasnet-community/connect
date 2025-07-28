import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

/**
 * DatePicker component overview documentation using the standard template
 */
export default component$(() => {
  const keyFeatures = [
    "Multiple selection modes: single date, date range, and date-time",
    "Calendar view for intuitive date selection",
    "Flexible formatting and localization options",
    "Date range validation with min/max dates and disabled dates",
    "Time selection with optional seconds and 12/24 hour format",
    "Customizable size variants and styles",
  ];

  const whenToUse = [
    "When users need to input or select dates in forms",
    "When precise date selection is required (vs. free-form text input)",
    "When you need to enforce date validation rules (min/max dates, formats)",
    "When selecting ranges of dates (like for bookings or reservations)",
    "When date and time selection is needed together",
  ];

  const whenNotToUse = [
    "When a simpler input method would suffice (for known dates like birth year)",
    "When only time selection is needed (use a dedicated time picker)",
    "When the date format is highly specialized and not supported by the component",
    "When extreme date range flexibility is required (consider a custom solution)",
  ];

  return (
    <OverviewTemplate
      title="DatePicker Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The DatePicker component provides a user-friendly interface for
        selecting dates and date ranges. It offers a calendar-based visual
        selection method that's more intuitive than manual date entry, while
        still supporting keyboard input and accessibility features.
      </p>
      <p class="mt-2">
        This component supports three distinct modes of operation: single date
        selection, date range selection, and datetime selection. With built-in
        validation, localization options, and flexible styling, it can be
        adapted to various form requirements and design systems.
      </p>
      <p class="mt-2">
        The DatePicker is designed to be fully accessible with keyboard
        navigation, proper labeling, and screen reader support, making it usable
        for all users regardless of their abilities.
      </p>
    </OverviewTemplate>
  );
});
