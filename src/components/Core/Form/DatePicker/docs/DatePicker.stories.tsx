import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { DatePicker } from './DatePicker';
import type { 
  DatePickerProps, 
  SingleDatePickerProps,
  DateRange 
} from './DatePicker.types';
import { component$, useSignal, $ } from '@builder.io/qwik';

const defaultSingleProps: SingleDatePickerProps = {
  id: 'default-date-picker',
  mode: 'single',
  label: 'Select Date',
  placeholder: 'YYYY-MM-DD',
  size: 'md',
  disabled: false,
  required: false,
  dateFormat: 'yyyy-MM-dd',
  locale: 'en',
  closeOnSelect: true,
  showClearButton: true,
  showCalendarButton: true,
  openOnFocus: false,
  placement: 'bottom-start',
  trigger: 'click',
  fullWidth: true,
  weekStart: 0
};

export default {
  title: 'Core/Form/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'DatePicker component for selecting dates with support for single date, date range, and datetime selection',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range', 'datetime'],
      description: 'Mode of date selection',
      defaultValue: 'single',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the datepicker',
      defaultValue: 'md',
    },
    label: {
      control: 'text',
      description: 'Label for the datepicker',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no date is selected',
      defaultValue: 'Select date',
    },
    locale: {
      control: 'select',
      options: ['en', 'fr', 'es', 'de', 'ar', 'fa', 'zh', 'ja'],
      description: 'Locale for date formatting',
      defaultValue: 'en',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the datepicker is disabled',
      defaultValue: false,
    },
    required: {
      control: 'boolean',
      description: 'Whether the datepicker is required',
      defaultValue: false,
    },
    inline: {
      control: 'boolean',
      description: 'Whether the datepicker should be inline (always open)',
      defaultValue: false,
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the datepicker should take full width',
      defaultValue: true,
    },
    showClearButton: {
      control: 'boolean',
      description: 'Whether to show a clear button',
      defaultValue: true,
    },
    showCalendarButton: {
      control: 'boolean',
      description: 'Whether to show a calendar button',
      defaultValue: true,
    },
    openOnFocus: {
      control: 'boolean',
      description: 'Whether to open the datepicker on input focus',
      defaultValue: false,
    },
    highlightToday: {
      control: 'boolean',
      description: 'Whether to highlight the current day',
      defaultValue: true,
    },
    clearable: {
      control: 'boolean',
      description: 'Whether the datepicker can be cleared',
      defaultValue: true,
    },
    showWeekNumbers: {
      control: 'boolean',
      description: 'Whether to show week numbers',
      defaultValue: false,
    },
    dateFormat: {
      control: 'select',
      options: ['yyyy-MM-dd', 'MM/dd/yyyy', 'dd/MM/yyyy', 'dd.MM.yyyy'],
      description: 'Format for displaying dates',
      defaultValue: 'yyyy-MM-dd',
    },
    placement: {
      control: 'select',
      options: [
        'top-start', 'top', 'top-end',
        'right-start', 'right', 'right-end',
        'bottom-start', 'bottom', 'bottom-end',
        'left-start', 'left', 'left-end'
      ],
      description: 'Placement of the calendar popup',
      defaultValue: 'bottom-start',
    },
    weekStart: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6],
      description: 'First day of the week (0 = Sunday)',
      defaultValue: 0,
    },
    initialView: {
      control: 'select',
      options: ['days', 'months', 'years', 'decades'],
      description: 'Initial view when calendar opens',
      defaultValue: 'days',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
  },
} satisfies Meta<DatePickerProps>;

type Story = StoryObj<DatePickerProps>;

// Basic single date picker
export const SingleDatePicker: Story = {
  args: {
    ...defaultSingleProps,
  },
};

// Basic date range picker
export const DateRangePicker: Story = {
  args: {
    ...defaultSingleProps,
    id: 'range-picker',
    mode: 'range',
    label: 'Select Date Range',
    placeholder: 'Start - End',
  },
};

// Basic datetime picker
export const DateTimePicker: Story = {
  args: {
    ...defaultSingleProps,
    id: 'datetime-picker',
    mode: 'datetime',
    label: 'Select Date & Time',
    placeholder: 'YYYY-MM-DD HH:MM',
    showSeconds: false,
    timeIncrement: 15,
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div class="flex flex-col space-y-6 w-[600px]">
      <div>
        <h3 class="text-sm font-medium mb-2">Small</h3>
        <DatePicker
          mode="single"
          size="sm"
          label="Small DatePicker"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Medium (Default)</h3>
        <DatePicker
          mode="single"
          size="md"
          label="Medium DatePicker"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Large</h3>
        <DatePicker
          mode="single"
          size="lg"
          label="Large DatePicker"
        />
      </div>
    </div>
  )
};

// Different states
export const States: Story = {
  render: () => (
    <div class="flex flex-col space-y-6 w-[600px]">
      <div>
        <h3 class="text-sm font-medium mb-2">Default</h3>
        <DatePicker
          mode="single"
          label="Default state"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">With Helper Text</h3>
        <DatePicker
          mode="single"
          label="With helper text"
          helperText="Please select a date"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">With Error</h3>
        <DatePicker
          mode="single"
          label="With error message"
          errorMessage="Please select a valid date"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Disabled</h3>
        <DatePicker
          mode="single"
          label="Disabled state"
          disabled={true}
          value={new Date()}
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Required</h3>
        <DatePicker
          mode="single"
          label="Required field"
          required={true}
        />
      </div>
    </div>
  )
};

// Format options
export const FormatOptions: Story = {
  render: () => (
    <div class="flex flex-col space-y-6 w-[600px]">
      <div>
        <h3 class="text-sm font-medium mb-2">ISO Format (yyyy-MM-dd)</h3>
        <DatePicker
          mode="single"
          label="ISO Format"
          dateFormat="yyyy-MM-dd"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">US Format (MM/dd/yyyy)</h3>
        <DatePicker
          mode="single"
          label="US Format"
          dateFormat="MM/dd/yyyy"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">European Format (dd/MM/yyyy)</h3>
        <DatePicker
          mode="single"
          label="European Format"
          dateFormat="dd/MM/yyyy"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">German Format (dd.MM.yyyy)</h3>
        <DatePicker
          mode="single"
          label="German Format"
          dateFormat="dd.MM.yyyy"
        />
      </div>
    </div>
  )
};

// Week start options
export const WeekStartOptions: Story = {
  render: () => (
    <div class="flex flex-col space-y-6 w-[600px]">
      <div>
        <h3 class="text-sm font-medium mb-2">Week starts on Sunday (0)</h3>
        <DatePicker
          mode="single"
          label="Sunday start"
          weekStart={0}
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Week starts on Monday (1)</h3>
        <DatePicker
          mode="single"
          label="Monday start"
          weekStart={1}
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Week starts on Saturday (6)</h3>
        <DatePicker
          mode="single"
          label="Saturday start"
          weekStart={6}
        />
      </div>
    </div>
  )
};

// Min/Max dates
export const MinMaxDates: Story = {
  render: () => {
    const today = new Date();
    const minDate = new Date();
    minDate.setDate(today.getDate() - 7);
    
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 7);
    
    return (
      <div class="flex flex-col space-y-6 w-[600px]">
        <div>
          <h3 class="text-sm font-medium mb-2">With Min Date (7 days ago)</h3>
          <DatePicker
            mode="single"
            label="With min date"
            minDate={minDate}
          />
        </div>
        
        <div>
          <h3 class="text-sm font-medium mb-2">With Max Date (7 days from now)</h3>
          <DatePicker
            mode="single"
            label="With max date"
            maxDate={maxDate}
          />
        </div>
        
        <div>
          <h3 class="text-sm font-medium mb-2">With Min and Max Dates (±7 days)</h3>
          <DatePicker
            mode="single"
            label="With min and max dates"
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      </div>
    );
  }
};

// Controlled DatePicker
const ControlledDatePicker = component$(() => {
  const selectedDate = useSignal<Date | null>(new Date());
  
  const handleDateSelect = $((date: Date | null) => {
    selectedDate.value = date;
    console.log('Selected date:', date);
  });
  
  return (
    <div class="flex flex-col space-y-6 w-[600px]">
      <div>
        <h3 class="text-sm font-medium mb-2">Controlled DatePicker</h3>
        <DatePicker
          mode="single"
          label="Controlled date"
          value={selectedDate.value}
          onDateSelect$={handleDateSelect}
        />
      </div>
      
      <div class="p-4 bg-gray-100 rounded">
        <p>Selected date: {selectedDate.value ? selectedDate.value.toLocaleDateString() : 'None'}</p>
      </div>
    </div>
  );
});

export const Controlled: Story = {
  render: () => <ControlledDatePicker />
};

// Controlled Range DatePicker
const ControlledRangePicker = component$(() => {
  const selectedRange = useSignal<DateRange>({ startDate: null, endDate: null });
  
  const handleRangeSelect = $((range: DateRange) => {
    selectedRange.value = range;
    console.log('Selected range:', range);
  });
  
  return (
    <div class="flex flex-col space-y-6 w-[600px]">
      <div>
        <h3 class="text-sm font-medium mb-2">Controlled Range DatePicker</h3>
        <DatePicker
          mode="range"
          label="Date range"
          value={selectedRange.value}
          onRangeSelect$={handleRangeSelect}
        />
      </div>
      
      <div class="p-4 bg-gray-100 rounded">
        <p>
          Start date: {selectedRange.value.startDate ? selectedRange.value.startDate.toLocaleDateString() : 'None'}<br />
          End date: {selectedRange.value.endDate ? selectedRange.value.endDate.toLocaleDateString() : 'None'}
        </p>
      </div>
    </div>
  );
});

export const ControlledRange: Story = {
  render: () => <ControlledRangePicker />
};

// Controlled DateTime Picker
const ControlledDateTimePicker = component$(() => {
  const selectedDateTime = useSignal<Date | null>(new Date());
  
  const handleDateTimeSelect = $((date: Date | null) => {
    selectedDateTime.value = date;
    console.log('Selected datetime:', date);
  });
  
  return (
    <div class="flex flex-col space-y-6 w-[600px]">
      <div>
        <h3 class="text-sm font-medium mb-2">Controlled DateTime Picker</h3>
        <DatePicker
          mode="datetime"
          label="Date and time"
          value={selectedDateTime.value}
          onDateSelect$={handleDateTimeSelect}
          timeFormat="HH:mm"
          timeIncrement={15}
          showSeconds={false}
        />
      </div>
      
      <div class="p-4 bg-gray-100 rounded">
        <p>
          Selected date and time: {
            selectedDateTime.value 
              ? `${selectedDateTime.value.toLocaleDateString()} ${selectedDateTime.value.toLocaleTimeString()}`
              : 'None'
          }
        </p>
      </div>
    </div>
  );
});

export const ControlledDateTime: Story = {
  render: () => <ControlledDateTimePicker />
};

// Inline calendar
export const InlineCalendar: Story = {
  render: () => (
    <div class="flex flex-col space-y-6 w-[600px]">
      <div>
        <h3 class="text-sm font-medium mb-2">Inline Calendar</h3>
        <DatePicker
          mode="single"
          inline={true}
          showWeekNumbers={true}
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Inline Range Calendar</h3>
        <DatePicker
          mode="range"
          inline={true}
        />
      </div>
    </div>
  )
};

// DateTime options
export const DateTimeOptions: Story = {
  render: () => (
    <div class="flex flex-col space-y-6 w-[600px]">
      <div>
        <h3 class="text-sm font-medium mb-2">24-Hour Format</h3>
        <DatePicker
          mode="datetime"
          label="24-hour time"
          use12HourTime={false}
          timeIncrement={15}
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">12-Hour Format with AM/PM</h3>
        <DatePicker
          mode="datetime"
          label="12-hour time"
          use12HourTime={true}
          timeIncrement={15}
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">With Seconds</h3>
        <DatePicker
          mode="datetime"
          label="With seconds"
          showSeconds={true}
          timeIncrement={15}
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Custom Time Increment (30 min)</h3>
        <DatePicker
          mode="datetime"
          label="30 minute increments"
          timeIncrement={30}
        />
      </div>
    </div>
  )
};

// Localized DatePickers
export const LocalizedDatePickers: Story = {
  render: () => (
    <div class="flex flex-col space-y-6 w-[600px]">
      <div>
        <h3 class="text-sm font-medium mb-2">English (en)</h3>
        <DatePicker
          mode="single"
          label="English"
          locale="en"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">French (fr)</h3>
        <DatePicker
          mode="single"
          label="Français"
          locale="fr"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Spanish (es)</h3>
        <DatePicker
          mode="single"
          label="Español"
          locale="es"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Arabic (ar)</h3>
        <DatePicker
          mode="single"
          label="العربية"
          locale="ar"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Persian/Farsi (fa)</h3>
        <DatePicker
          mode="single"
          label="فارسی"
          locale="fa"
        />
      </div>
    </div>
  )
};

// Form integration example
const FormIntegrationExample = component$(() => {
  const formData = useSignal({
    eventName: '',
    eventDate: null as Date | null,
    dateRange: { startDate: null, endDate: null } as DateRange,
    meetingTime: null as Date | null
  });
  
  const formErrors = useSignal({
    eventName: '',
    eventDate: '',
    dateRange: '',
    meetingTime: ''
  });
  
  const submitted = useSignal(false);
  
  const validateForm$ = $(() => {
    const errors = {
      eventName: formData.value.eventName ? '' : 'Event name is required',
      eventDate: formData.value.eventDate ? '' : 'Event date is required',
      dateRange: formData.value.dateRange.startDate && formData.value.dateRange.endDate ? '' : 'Date range is required',
      meetingTime: formData.value.meetingTime ? '' : 'Meeting time is required'
    };
    
    formErrors.value = errors;
    
    // Check if any error message is non-empty
    const hasErrors = Object.values(errors).some(error => error !== '');
    return !hasErrors;
  });
  
  const handleSubmit$ = $((e: Event) => {
    e.preventDefault();
    
    // Using a variable to store the Promise result
    const validationResult = validateForm$();
    
    // Check the result safely without assuming it's always truthy
    validationResult.then((isValid) => {
      if (isValid) {
        submitted.value = true;
        setTimeout(() => {
          submitted.value = false;
        }, 3000);
      }
    });
  });
  
  return (
    <div class="w-[600px] p-6 border border-gray-200 rounded-md">
      <h2 class="text-xl font-medium mb-4">Event Planning Form</h2>
      
      {submitted.value ? (
        <div class="bg-green-50 p-4 rounded-md mb-4">
          <p class="text-green-700">Form submitted successfully!</p>
        </div>
      ) : null}
      
      <form onSubmit$={handleSubmit$} class="flex flex-col gap-4">
        <div>
          <label for="eventName" class="block text-sm font-medium mb-1">Event Name</label>
          <input
            id="eventName"
            type="text"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
            value={formData.value.eventName}
            onInput$={(e: any) => (formData.value.eventName = e.target.value)}
          />
          {formErrors.value.eventName && (
            <p class="text-red-500 text-sm mt-1">{formErrors.value.eventName}</p>
          )}
        </div>
        
        <DatePicker
          mode="single"
          label="Event Date"
          required
          value={formData.value.eventDate}
          errorMessage={formErrors.value.eventDate}
          onDateSelect$={(date) => (formData.value.eventDate = date)}
        />
        
        <DatePicker
          mode="range"
          label="Reservation Period"
          required
          value={formData.value.dateRange}
          errorMessage={formErrors.value.dateRange}
          onRangeSelect$={(range) => (formData.value.dateRange = range)}
        />
        
        <DatePicker
          mode="datetime"
          label="Meeting Time"
          required
          value={formData.value.meetingTime}
          errorMessage={formErrors.value.meetingTime}
          onDateSelect$={(date) => (formData.value.meetingTime = date)}
          timeIncrement={15}
        />
        
        <div class="mt-2">
          <button
            type="submit"
            class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
});

export const FormIntegration: Story = {
  render: () => <FormIntegrationExample />
};
