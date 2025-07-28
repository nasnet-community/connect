import { $, useSignal } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type {
  DatePickerProps,
  MonthNavigationDirection,
  DatePickerView,
} from "../DatePicker.types";

export interface UseCalendarStateResult {
  currentView: { value: DatePickerView };
  viewDate: { value: Date };
  handleNavigate$: QRL<(direction: MonthNavigationDirection) => void>;
  handleViewChange$: QRL<(view: DatePickerView) => void>;
  handleToday$: QRL<() => void>;
}

export function useCalendarState(
  props: DatePickerProps,
): UseCalendarStateResult {
  const { initialView = "days" } = props;

  // Calendar state signals
  const currentView = useSignal<DatePickerView>(initialView);
  const viewDate = useSignal(new Date());

  // Handle month navigation
  const handleNavigate$ = $((direction: MonthNavigationDirection) => {
    const current = new Date(viewDate.value);

    if (direction === "prev") {
      current.setMonth(current.getMonth() - 1);
    } else {
      current.setMonth(current.getMonth() + 1);
    }

    viewDate.value = current;
  });

  // Handle view change (days/months/years)
  const handleViewChange$ = $((view: DatePickerView) => {
    currentView.value = view;
  });

  // Set today as the current view date
  const handleToday$ = $(() => {
    viewDate.value = new Date();
  });

  return {
    currentView,
    viewDate,
    handleNavigate$,
    handleViewChange$,
    handleToday$,
  };
}
