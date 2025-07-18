import { component$, $ } from '@builder.io/qwik';
import type { TimeSelectorProps } from './DatePicker.types';

export const TimeSelector = component$<TimeSelectorProps>((props) => {
  const {
    value,
    showSeconds = false,
    use12HourTime = false,
    disabled = false,
    onTimeSelect$
  } = props;
  
  // Initialize with current time from value
  const currentHours = value.getHours();
  const currentMinutes = value.getMinutes();
  const currentSeconds = value.getSeconds();

  // Determine period (AM/PM) for 12-hour format
  const period = currentHours >= 12 ? 'PM' : 'AM';
  
  // Display hours in 12-hour format if required
  const displayHours = use12HourTime 
    ? (currentHours === 0 ? 12 : currentHours > 12 ? currentHours - 12 : currentHours)
    : currentHours;
  
  // Generate hour options
  const hourOptions = [];
  const maxHours = use12HourTime ? 12 : 23;
  const minHours = use12HourTime ? 1 : 0;
    
  for (let i = minHours; i <= maxHours; i++) {
    hourOptions.push(
      <option key={i} value={use12HourTime && i === 12 ? 0 : i}>
        {i.toString().padStart(2, '0')}
      </option>
    );
  }
  
  // Generate minute/second options
  const minuteSecondOptions = [];
  for (let i = 0; i < 60; i++) {
    minuteSecondOptions.push(
      <option key={i} value={i}>
        {i.toString().padStart(2, '0')}
      </option>
    );
  }
  
  // Handle time change with converted 12-hour to 24-hour format
  const handleHourChange = $((event: Event) => {
    const hourValue = parseInt((event.target as HTMLSelectElement).value, 10);
    let hours = hourValue;
    
    if (use12HourTime && period === 'PM' && hours < 12) {
      hours += 12;
    } else if (use12HourTime && period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    onTimeSelect$(hours, currentMinutes, currentSeconds);
  });
  
  const handleMinuteChange = $((event: Event) => {
    const minutes = parseInt((event.target as HTMLSelectElement).value, 10);
    onTimeSelect$(currentHours, minutes, currentSeconds);
  });
  
  const handleSecondChange = $((event: Event) => {
    const seconds = parseInt((event.target as HTMLSelectElement).value, 10);
    onTimeSelect$(currentHours, currentMinutes, seconds);
  });
  
  const handlePeriodChange = $((event: Event) => {
    const newPeriod = (event.target as HTMLSelectElement).value;
    let hours = displayHours;
    
    if (use12HourTime && newPeriod === 'PM' && hours < 12) {
      hours += 12;
    } else if (use12HourTime && newPeriod === 'AM' && hours === 12) {
      hours = 0;
    }
    
    onTimeSelect$(hours, currentMinutes, currentSeconds);
  });

  return (
    <div class="time-selector border-t border-border dark:border-border-dark p-3">
      <div class="flex items-center justify-center space-x-1">
        {/* Hours */}
        <select
          class="time-select px-2 py-1 border border-border dark:border-border-dark rounded"
          value={displayHours}
          disabled={disabled}
          onChange$={handleHourChange}
        >
          {hourOptions}
        </select>
        
        <span class="time-separator">:</span>
        
        {/* Minutes */}
        <select
          class="time-select px-2 py-1 border border-border dark:border-border-dark rounded"
          value={currentMinutes}
          disabled={disabled}
          onChange$={handleMinuteChange}
        >
          {minuteSecondOptions}
        </select>
        
        {/* Seconds (optional) */}
        {showSeconds && (
          <>
            <span class="time-separator">:</span>
            <select
              class="time-select px-2 py-1 border border-border dark:border-border-dark rounded"
              value={currentSeconds}
              disabled={disabled}
              onChange$={handleSecondChange}
            >
              {minuteSecondOptions}
            </select>
          </>
        )}
        
        {/* AM/PM selector for 12-hour format */}
        {use12HourTime && (
          <select
            class="time-select-ampm px-2 py-1 border border-border dark:border-border-dark rounded"
            value={period}
            disabled={disabled}
            onChange$={handlePeriodChange}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        )}
      </div>
    </div>
  );
});
