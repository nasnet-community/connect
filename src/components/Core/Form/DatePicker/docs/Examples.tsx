import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate, type Example } from '~/components/Docs/templates';
import BasicDatePicker from '../Examples/BasicDatePicker';
import DatePickerSizes from '../Examples/DatePickerSizes';
import DatePickerStates from '../Examples/DatePickerStates';
import DatePickerFeatures from '../Examples/DatePickerFeatures';
import RangeDatePicker from '../Examples/RangeDatePicker';
import DateTimePicker from '../Examples/DateTimePicker';

/**
 * DatePicker component examples documentation using the standard template
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic DatePicker",
      description: "Simple date picker for selecting a single date. This example demonstrates the standard implementation of a date picker component.",
      component: <BasicDatePicker />
    },
    {
      title: "DatePicker Sizes",
      description: "Different size variants of the DatePicker component including small, medium, and large.",
      component: <DatePickerSizes />
    },
    {
      title: "DatePicker States",
      description: "Various states of the DatePicker component including normal, disabled, error, and with helper text.",
      component: <DatePickerStates />
    },
    {
      title: "DatePicker Features",
      description: "Advanced features of the DatePicker including custom formatting, localization, and validation options.",
      component: <DatePickerFeatures />
    },
    {
      title: "Range DatePicker",
      description: "DatePicker in range selection mode for selecting start and end dates.",
      component: <RangeDatePicker />
    },
    {
      title: "DateTime Picker",
      description: "Combined date and time selection for scenarios requiring both date and time input.",
      component: <DateTimePicker />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The DatePicker component offers robust features for date selection interfaces.
        These examples showcase the component's flexibility from basic usage to more complex
        scenarios like range selection and datetime picking.
      </p>
    </ExamplesTemplate>
  );
}); 