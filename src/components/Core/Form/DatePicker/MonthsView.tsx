import { component$, $ } from '@builder.io/qwik';
import type { DatePickerView, MonthNavigationDirection } from './DatePicker.types';
import type { QRL } from '@builder.io/qwik';

export interface MonthsViewProps {
  viewDate: Date;
  monthNames: string[];
  onNavigate$: QRL<(direction: MonthNavigationDirection) => void>;
  onViewChange$: QRL<(view: DatePickerView) => void>;
  onMonthSelect$: QRL<(month: number) => void>;
}

export const MonthsView = component$<MonthsViewProps>(({
  viewDate,
  monthNames,
  onNavigate$,
  onViewChange$,
  onMonthSelect$
}) => {
  // Create handlers with proper serialization for Qwik
  const handlePrevClick = $(() => {
    onNavigate$('prev');
  });
  
  const handleNextClick = $(() => {
    onNavigate$('next');
  });
  
  const handleYearClick = $(() => {
    onViewChange$('years');
  });
  
  const handleMonthClick = $((month: number) => {
    onMonthSelect$(month);
    onViewChange$('days');
  });

  const rows = [];
  let months = [];
  
  for (let i = 0; i < 12; i++) {
    const month = i;
    const isDisabled = false; // Simplified - would need more complex logic for real implementation
    const isSelected = viewDate.getMonth() === i && viewDate.getFullYear() === viewDate.getFullYear();
    
    const monthClasses = [
      'calendar-month',
      'p-2',
      'text-center',
      'rounded',
      isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800',
      isSelected ? 'bg-primary-100 dark:bg-primary-800 font-medium' : ''
    ].filter(Boolean).join(' ');
    
    months.push(
      <div
        key={`month-${i}`}
        class={monthClasses}
      >
        <button
          type="button"
          onClick$={() => handleMonthClick(month)}
          disabled={isDisabled}
          class="w-full h-full py-2"
          aria-pressed={isSelected}
          aria-disabled={isDisabled}
        >
          {monthNames[i]}
        </button>
      </div>
    );
    
    if ((i + 1) % 3 === 0) {
      rows.push(<div key={`row-${i}`} class="grid grid-cols-3 gap-1">{months}</div>);
      months = [];
    }
  }
  
  return (
    <div class="calendar-months-view">
      <div class="calendar-header flex justify-between items-center p-2">
        <button
          type="button"
          class="calendar-nav-button"
          onClick$={handlePrevClick}
          aria-label="Previous year"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <div class="calendar-header-info">
          <button
            type="button"
            class="calendar-year"
            onClick$={handleYearClick}
            aria-label="View years"
          >
            {viewDate.getFullYear()}
          </button>
        </div>
        
        <button
          type="button"
          class="calendar-nav-button"
          onClick$={handleNextClick}
          aria-label="Next year"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div class="calendar-months p-2 space-y-1">
        {rows}
      </div>
    </div>
  );
}); 