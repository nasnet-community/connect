import { component$ } from "@builder.io/qwik";
import {
  UsageTemplate,
  type UsageGuideline,
  type BestPractice,
  type AccessibilityTip,
} from "~/components/Docs/templates";

/**
 * DatePicker component usage documentation using the standard template
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Use a clear, recognizable date format",
      description:
        "Choose a date format that's familiar to your user base (e.g., MM/DD/YYYY for US audiences).",
      code: `<DatePicker 
  label="Appointment Date"
  dateFormat="MM/dd/yyyy"
  placeholder="Select a date"
  value={appointmentDate}
  onDateSelect$={(date) => setAppointmentDate(date)}
/>`,
      type: "do",
    },
    {
      title: "Provide clear context with labels",
      description:
        "Always include descriptive labels to clarify what date is being requested.",
      code: `<DatePicker 
  label="Flight Departure Date"
  helperText="Select the date you wish to depart"
  minDate={new Date()} // Can't select dates in the past
  value={departureDate}
  onDateSelect$={(date) => setDepartureDate(date)}
/>`,
      type: "do",
    },
    {
      title: "Use range picker for date intervals",
      description:
        "When users need to select a start and end date, use the range mode rather than two separate pickers.",
      code: `<DatePicker 
  mode="range"
  label="Reservation Period"
  value={reservationPeriod}
  onRangeSelect$={(range) => setReservationPeriod(range)}
/>`,
      type: "do",
    },
    {
      title: "Set reasonable date constraints",
      description:
        "Use minDate and maxDate to prevent users from selecting invalid dates.",
      code: `<DatePicker 
  label="Booking Date" 
  minDate={new Date()} // Can't book in the past
  maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)} // Can't book more than 90 days ahead
  value={bookingDate}
  onDateSelect$={(date) => setBookingDate(date)}
/>`,
      type: "do",
    },
    {
      title: "Don't hide important validation constraints",
      description:
        "Make date restrictions clear to the user before they interact with the calendar.",
      code: `// Avoid this approach
<DatePicker 
  label="Arrival Date"
  minDate={new Date()}
  maxDate={maxDate}
  value={arrivalDate}
  onDateSelect$={(date) => setArrivalDate(date)}
/>

// Better approach
<DatePicker 
  label="Arrival Date"
  helperText="Please select a date between today and 12/31/2023"
  minDate={new Date()}
  maxDate={maxDate}
  value={arrivalDate}
  onDateSelect$={(date) => setArrivalDate(date)}
/>`,
      type: "dont",
    },
    {
      title: "Don't use overly complex date formatting",
      description:
        "Avoid uncommon or confusing date formats that might be misinterpreted.",
      code: `// Avoid this approach
<DatePicker 
  dateFormat="YY-D-MM" // Confusing format
  label="Event Date"
  value={eventDate}
  onDateSelect$={(date) => setEventDate(date)}
/>`,
      type: "dont",
    },
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Set sensible default values",
      description:
        "When applicable, provide reasonable default dates to speed up form completion.",
    },
    {
      title: "Use appropriate validation",
      description:
        "Implement validation that makes sense for the context (e.g., birth dates shouldn't be in the future).",
    },
    {
      title: "Consider mobile experience",
      description:
        "Ensure the calendar is usable on touch devices with appropriately sized touch targets.",
    },
    {
      title: "Match to locale expectations",
      description:
        "Configure the calendar to match cultural expectations (first day of week, date format) based on the user's locale.",
    },
    {
      title: "Provide alternate input methods",
      description:
        "Allow keyboard input in addition to calendar selection for power users.",
    },
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Use proper ARIA attributes",
      description:
        "The DatePicker uses ARIA attributes like aria-haspopup to communicate its behavior to assistive technologies.",
    },
    {
      title: "Provide descriptive labels",
      description:
        "Always include a label or aria-label to clearly identify the DatePicker's purpose.",
    },
    {
      title: "Ensure keyboard navigability",
      description:
        "The calendar should be fully usable with keyboard navigation (arrows, Tab, Enter, Escape).",
    },
    {
      title: "Associate error messages",
      description:
        "Error messages should be programmatically linked to the DatePicker using aria-describedby.",
    },
    {
      title: "Provide clear format guidance",
      description:
        "Use helper text to communicate the expected date format for keyboard input.",
    },
  ];

  const performanceTips = [
    "For optimal performance, use the default inline mode when possible",
    "For dates far in the past or future, use the year and month view navigation rather than scrolling through many months",
    "Consider lazy loading the calendar component for forms where the DatePicker may not be immediately needed",
    "Be mindful of the impact of many DatePicker instances on a single page",
    "When working with complex date calculations, perform these outside of render cycles",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The DatePicker component provides a user-friendly way to select dates in
        forms and other interfaces. It offers both calendar-based selection and
        keyboard input, with features like date ranges, validation, and time
        selection to handle various date input scenarios.
      </p>
      <p class="mt-2">
        When implementing DatePicker, focus on choosing appropriate defaults,
        using clear labeling, and setting reasonable constraints to guide users
        toward valid selections. For the best user experience, match the date
        format and calendar configuration to your users' cultural expectations.
      </p>
    </UsageTemplate>
  );
});
