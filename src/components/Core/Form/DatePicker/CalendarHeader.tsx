import { component$, $ } from "@builder.io/qwik";
import type {
  DatePickerView,
  MonthNavigationDirection,
} from "./DatePicker.types";
import type { QRL } from "@builder.io/qwik";

export interface CalendarHeaderProps {
  viewDate: Date;
  currentView: DatePickerView;
  locale: string;
  onNavigate$: QRL<(direction: MonthNavigationDirection) => void>;
  onViewChange$: QRL<(view: DatePickerView) => void>;
  showClearButton?: boolean;
  showTodayButton?: boolean;
  onClear$?: QRL<() => void>;
  onToday$?: QRL<() => void>;
}

export const CalendarHeader = component$<CalendarHeaderProps>(
  ({
    viewDate,
    currentView,
    locale,
    onNavigate$,
    onViewChange$,
    showClearButton = false,
    showTodayButton = false,
    onClear$,
    onToday$,
  }) => {
    // Format the header title based on the current view
    const getHeaderTitle = () => {
      const options: Intl.DateTimeFormatOptions = {};

      if (currentView === "days") {
        options.year = "numeric";
        options.month = "long";
      } else if (currentView === "months") {
        options.year = "numeric";
      } else if (currentView === "years") {
        const year = viewDate.getFullYear();
        const decade = Math.floor(year / 10) * 10;
        return `${decade} - ${decade + 9}`;
      }

      return new Intl.DateTimeFormat(locale, options).format(viewDate);
    };

    // Create serializable handlers for events
    const handlePrevClick$ = $(() => {
      onNavigate$("prev");
    });

    const handleNextClick$ = $(() => {
      onNavigate$("next");
    });

    const handleHeaderClick$ = $(() => {
      if (currentView === "days") {
        onViewChange$("months");
      } else if (currentView === "months") {
        onViewChange$("years");
      }
    });

    return (
      <div class="calendar-header flex items-center justify-between border-b border-border p-2 dark:border-border-dark">
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="calendar-nav-btn rounded-full p-1 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-800"
            onClick$={handlePrevClick$}
            aria-label="Previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <button
            type="button"
            class="calendar-title rounded px-2 py-1 font-medium hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-800"
            onClick$={handleHeaderClick$}
          >
            {getHeaderTitle()}
          </button>

          <button
            type="button"
            class="calendar-nav-btn rounded-full p-1 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-800"
            onClick$={handleNextClick$}
            aria-label="Next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        {(showClearButton || showTodayButton) && (
          <div class="flex items-center gap-2">
            {showClearButton && onClear$ && (
              <button
                type="button"
                class="calendar-btn rounded px-2 py-1 text-xs hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-800"
                onClick$={onClear$}
              >
                Clear
              </button>
            )}
            {showTodayButton && onToday$ && (
              <button
                type="button"
                class="calendar-btn rounded px-2 py-1 text-xs hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-800"
                onClick$={onToday$}
              >
                Today
              </button>
            )}
          </div>
        )}
      </div>
    );
  },
);
