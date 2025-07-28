import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type MethodDetail,
} from "~/components/Docs/templates";

/**
 * DatePicker component API reference documentation using the standard template
 */
export default component$(() => {
  const commonProps: PropDetail[] = [
    {
      name: "mode",
      type: "'single' | 'range' | 'datetime'",
      defaultValue: "'single'",
      description: "The mode of operation for the date picker",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Size variant of the datepicker",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the datepicker is disabled",
    },
    {
      name: "inline",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to display the calendar inline (always visible)",
    },
    {
      name: "closeOnSelect",
      type: "boolean",
      defaultValue: "true",
      description:
        "Whether to close the calendar popup when a date is selected",
    },
    {
      name: "showCalendarButton",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to show the calendar toggle button",
    },
    {
      name: "openOnFocus",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to open the calendar when the input is focused",
    },
    {
      name: "dateFormat",
      type: "string",
      defaultValue: "'yyyy-MM-dd'",
      description: "Date format string for display and parsing",
    },
    {
      name: "locale",
      type: "string",
      defaultValue: "'en'",
      description: "Locale for formatting dates and calendar display",
    },
    {
      name: "label",
      type: "string",
      description: "Label text for the datepicker",
    },
    {
      name: "placeholder",
      type: "string",
      defaultValue: "'Select date'",
      description: "Placeholder text when no date is selected",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the datepicker is required",
    },
    {
      name: "helperText",
      type: "string",
      description: "Helper text to display below the datepicker",
    },
    {
      name: "errorMessage",
      type: "string",
      description: "Error message to display when validation fails",
    },
    {
      name: "fullWidth",
      type: "boolean",
      defaultValue: "false",
      description:
        "Whether the datepicker should take up the full width of its container",
    },
    {
      name: "weekStart",
      type: "0 | 1 | 2 | 3 | 4 | 5 | 6",
      defaultValue: "0",
      description: "First day of the week (0 = Sunday, 1 = Monday, etc.)",
    },
    {
      name: "showWeekNumbers",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to show week numbers in the calendar",
    },
    {
      name: "clearable",
      type: "boolean",
      defaultValue: "true",
      description: "Whether the datepicker value can be cleared",
    },
    {
      name: "showTodayButton",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to show a button to quickly select today's date",
    },
    {
      name: "minDate",
      type: "Date",
      description: "Minimum selectable date",
    },
    {
      name: "maxDate",
      type: "Date",
      description: "Maximum selectable date",
    },
    {
      name: "disabledDates",
      type: "Date[]",
      description: "Array of specific dates that cannot be selected",
    },
    {
      name: "containerClass",
      type: "string",
      description: "Additional CSS class for the datepicker container",
    },
    {
      name: "inputClass",
      type: "string",
      description: "Additional CSS class for the input element",
    },
    {
      name: "calendarClass",
      type: "string",
      description: "Additional CSS class for the calendar container",
    },
    {
      name: "formatDate$",
      type: "QRL<(date: Date) => string>",
      description: "Custom function to format dates as strings",
    },
    {
      name: "parseDate$",
      type: "QRL<(dateStr: string) => Date | null>",
      description: "Custom function to parse date strings into Date objects",
    },
    {
      name: "onOpen$",
      type: "QRL<() => void>",
      description: "Callback when the calendar opens",
    },
    {
      name: "onClose$",
      type: "QRL<() => void>",
      description: "Callback when the calendar closes",
    },
  ];

  const singleDatePickerProps: PropDetail[] = [
    {
      name: "value",
      type: "Date",
      description: "Current selected date",
    },
    {
      name: "defaultValue",
      type: "Date",
      description: "Default date to show when no value is provided",
    },
    {
      name: "onDateSelect$",
      type: "QRL<(date: Date | null) => void>",
      description: "Callback when a date is selected",
    },
  ];

  const rangeDatePickerProps: PropDetail[] = [
    {
      name: "value",
      type: "DateRange",
      description: "Current selected date range",
    },
    {
      name: "defaultValue",
      type: "DateRange",
      description: "Default date range when no value is provided",
    },
    {
      name: "rangeSeparator",
      type: "string",
      defaultValue: "' - '",
      description: "String to separate start and end dates in the input",
    },
    {
      name: "autoApply",
      type: "boolean",
      defaultValue: "true",
      description:
        "Whether to automatically apply the date range when selected",
    },
    {
      name: "showApplyButton",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to show an apply button for the date range",
    },
    {
      name: "showCancelButton",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to show a cancel button for the date range",
    },
    {
      name: "applyButtonText",
      type: "string",
      defaultValue: "'Apply'",
      description: "Text for the apply button",
    },
    {
      name: "cancelButtonText",
      type: "string",
      defaultValue: "'Cancel'",
      description: "Text for the cancel button",
    },
    {
      name: "onRangeSelect$",
      type: "QRL<(range: DateRange) => void>",
      description: "Callback when a date range is selected",
    },
  ];

  const dateTimePickerProps: PropDetail[] = [
    {
      name: "value",
      type: "Date",
      description: "Current selected date and time",
    },
    {
      name: "defaultValue",
      type: "Date",
      description: "Default date and time when no value is provided",
    },
    {
      name: "timeFormat",
      type: "string",
      defaultValue: "'HH:mm'",
      description: "Format for the time component",
    },
    {
      name: "timeIncrement",
      type: "number",
      defaultValue: "30",
      description: "Increment in minutes for the time selection",
    },
    {
      name: "showSeconds",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to show seconds in time selection",
    },
    {
      name: "use12HourTime",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to use 12-hour format (AM/PM) instead of 24-hour",
    },
    {
      name: "minTime",
      type: "string",
      description: "Minimum selectable time in 'HH:mm' format",
    },
    {
      name: "maxTime",
      type: "string",
      description: "Maximum selectable time in 'HH:mm' format",
    },
    {
      name: "onDateSelect$",
      type: "QRL<(date: Date | null) => void>",
      description: "Callback when a date and time is selected",
    },
  ];

  const methods: MethodDetail[] = [
    // The DatePicker component doesn't expose methods directly
  ];

  return (
    <APIReferenceTemplate props={commonProps} methods={methods}>
      <p>
        The DatePicker component provides a flexible interface for selecting
        dates and date ranges. It supports three main modes: single date
        selection, date range selection, and datetime selection.
      </p>
      <p class="mt-3">
        Each mode has its own set of specific props in addition to the common
        props shown above.
      </p>

      <h3 class="mb-4 mt-8 text-lg font-medium">Single Date Mode Props</h3>
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-border dark:border-border-dark">
            <th class="px-4 py-2 text-left">Name</th>
            <th class="px-4 py-2 text-left">Type</th>
            <th class="px-4 py-2 text-left">Default</th>
            <th class="px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {singleDatePickerProps.map((prop) => (
            <tr
              key={prop.name}
              class="border-b border-border dark:border-border-dark"
            >
              <td class="px-4 py-2 font-mono text-sm">
                {prop.name}
                {prop.required && <span class="ml-1 text-error">*</span>}
              </td>
              <td class="px-4 py-2 font-mono text-sm">{prop.type}</td>
              <td class="px-4 py-2 font-mono text-sm">
                {prop.defaultValue || "-"}
              </td>
              <td class="px-4 py-2">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 class="mb-4 mt-8 text-lg font-medium">Date Range Mode Props</h3>
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-border dark:border-border-dark">
            <th class="px-4 py-2 text-left">Name</th>
            <th class="px-4 py-2 text-left">Type</th>
            <th class="px-4 py-2 text-left">Default</th>
            <th class="px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {rangeDatePickerProps.map((prop) => (
            <tr
              key={prop.name}
              class="border-b border-border dark:border-border-dark"
            >
              <td class="px-4 py-2 font-mono text-sm">
                {prop.name}
                {prop.required && <span class="ml-1 text-error">*</span>}
              </td>
              <td class="px-4 py-2 font-mono text-sm">{prop.type}</td>
              <td class="px-4 py-2 font-mono text-sm">
                {prop.defaultValue || "-"}
              </td>
              <td class="px-4 py-2">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 class="mb-4 mt-8 text-lg font-medium">DateTime Mode Props</h3>
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-border dark:border-border-dark">
            <th class="px-4 py-2 text-left">Name</th>
            <th class="px-4 py-2 text-left">Type</th>
            <th class="px-4 py-2 text-left">Default</th>
            <th class="px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {dateTimePickerProps.map((prop) => (
            <tr
              key={prop.name}
              class="border-b border-border dark:border-border-dark"
            >
              <td class="px-4 py-2 font-mono text-sm">
                {prop.name}
                {prop.required && <span class="ml-1 text-error">*</span>}
              </td>
              <td class="px-4 py-2 font-mono text-sm">{prop.type}</td>
              <td class="px-4 py-2 font-mono text-sm">
                {prop.defaultValue || "-"}
              </td>
              <td class="px-4 py-2">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </APIReferenceTemplate>
  );
});
