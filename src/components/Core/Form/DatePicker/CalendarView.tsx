import { component$ } from "@builder.io/qwik";
import type { CalendarViewProps } from "./DatePicker.types";
import { CalendarHeader } from "./CalendarHeader";
import { DaysView } from "./DaysView";
import { MonthsView } from "./MonthsView";
import { YearsView } from "./YearsView";
import { useCalendarView } from "./hooks/useCalendarView";

/**
 * Calendar view component used by DatePicker for date selection.
 */
export const CalendarView = component$<CalendarViewProps>((props) => {
  const {
    selectedDate,
    minDate,
    maxDate,
    disabledDates,
    weekStart = 0,
    locale = "en",
    currentView,
  } = props;

  // Use the hook to get all functionality and state with serializable functions
  const {
    internalViewDate,
    handleNavigate$,
    handleViewChange$,
    handleDateSelect$,
    handleMonthSelect$,
    handleYearSelect$,
    getDayNames,
    getMonthNames,
  } = useCalendarView(props);

  // Render the current view
  const renderCurrentView = () => {
    const dayNames = getDayNames();
    const monthNames = getMonthNames();

    switch (currentView) {
      case "days":
        return (
          <DaysView
            viewDate={internalViewDate.value}
            selectedDate={selectedDate}
            minDate={minDate}
            maxDate={maxDate}
            disabledDates={disabledDates}
            locale={locale}
            weekStart={weekStart}
            dayNames={dayNames}
            onDateSelect$={handleDateSelect$}
            onNavigate$={handleNavigate$}
            onViewChange$={handleViewChange$}
          />
        );
      case "months":
        return (
          <MonthsView
            viewDate={internalViewDate.value}
            // locale={locale}
            monthNames={monthNames}
            onNavigate$={handleNavigate$}
            onViewChange$={handleViewChange$}
            onMonthSelect$={handleMonthSelect$}
          />
        );
      case "years":
        return (
          <YearsView
            viewDate={internalViewDate.value}
            onNavigate$={handleNavigate$}
            onViewChange$={handleViewChange$}
            onYearSelect$={handleYearSelect$}
          />
        );
      default:
        return (
          <DaysView
            viewDate={internalViewDate.value}
            selectedDate={selectedDate}
            minDate={minDate}
            maxDate={maxDate}
            disabledDates={disabledDates}
            locale={locale}
            weekStart={weekStart}
            dayNames={dayNames}
            onDateSelect$={handleDateSelect$}
            onNavigate$={handleNavigate$}
            onViewChange$={handleViewChange$}
          />
        );
    }
  };

  return (
    <div class="calendar px-1 py-2">
      <CalendarHeader
        viewDate={internalViewDate.value}
        currentView={currentView}
        locale={locale}
        onNavigate$={handleNavigate$}
        onViewChange$={handleViewChange$}
      />

      <div class="calendar-body p-2">{renderCurrentView()}</div>
    </div>
  );
});
