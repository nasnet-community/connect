import { component$ } from "@builder.io/qwik";
import type {
  DatePickerView,
  MonthNavigationDirection,
} from "./DatePicker.types";
import type { QRL } from "@builder.io/qwik";

export interface YearsViewProps {
  viewDate: Date;
  onNavigate$: QRL<(direction: MonthNavigationDirection) => void>;
  onViewChange$: QRL<(view: DatePickerView) => void>;
  onYearSelect$: QRL<(year: number) => void>;
}

export const YearsView = component$<YearsViewProps>(
  ({ viewDate, onNavigate$, onViewChange$, onYearSelect$ }) => {
    const currentYear = viewDate.getFullYear();
    const decade = Math.floor(currentYear / 10) * 10;
    const rows = [];
    let years = [];

    for (let i = decade - 1; i <= decade + 10; i++) {
      const year = i;
      const isDisabled = false; // Simplified - would need more complex logic for real implementation
      const isSelected = currentYear === i;
      const isInDecade = i >= decade && i < decade + 10;

      const yearClasses = [
        "calendar-year",
        "p-2",
        "text-center",
        "rounded",
        isDisabled
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800",
        isSelected ? "bg-primary-100 dark:bg-primary-800 font-medium" : "",
        !isInDecade ? "text-text-muted dark:text-text-dark-muted" : "",
      ]
        .filter(Boolean)
        .join(" ");

      years.push(
        <div key={`year-${i}`} class={yearClasses}>
          <button
            type="button"
            onClick$={() => {
              onYearSelect$(year);
              onViewChange$("months");
            }}
            disabled={isDisabled}
            class="h-full w-full py-2"
            aria-pressed={isSelected}
            aria-disabled={isDisabled}
          >
            {year}
          </button>
        </div>,
      );

      if (years.length === 3) {
        rows.push(
          <div key={`row-${i}`} class="grid grid-cols-3 gap-1">
            {years}
          </div>,
        );
        years = [];
      }
    }

    return (
      <div class="calendar-years-view">
        <div class="calendar-header flex items-center justify-between p-2">
          <button
            type="button"
            class="calendar-nav-button"
            onClick$={() => onNavigate$("prev")}
            aria-label="Previous decade"
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

          <div class="calendar-header-info">
            <button
              type="button"
              class="calendar-decade"
              onClick$={() => onViewChange$("years")}
              aria-label="View decades"
            >
              {`${decade} - ${decade + 9}`}
            </button>
          </div>

          <button
            type="button"
            class="calendar-nav-button"
            onClick$={() => onNavigate$("next")}
            aria-label="Next decade"
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

        <div class="calendar-years space-y-1 p-2">{rows}</div>
      </div>
    );
  },
);
