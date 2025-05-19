import { component$, $ } from '@builder.io/qwik';
import { PlaygroundTemplate, type PropertyControl } from '~/components/Docs/templates';
import { Slider } from '../';

/**
 * Slider component playground using the standard template
 */
export default component$(() => {
  // Define the SliderDemo component that will be controlled by the playground
  const SliderDemo = component$<{
    type: 'single' | 'range';
    label: string;
    helperText: string;
    errorMessage: string;
    successMessage: string;
    warningMessage: string;
    orientation: 'horizontal' | 'vertical';
    size: 'sm' | 'md' | 'lg';
    variant: 'default' | 'filled';
    min: number;
    max: number;
    step: number;
    initialValue: number;
    initialRangeStart: number;
    initialRangeEnd: number;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
    showValue: boolean;
    showMarks: boolean;
    markCount: number;
    showTicks: boolean;
    tickCount: number;
    minRange: number;
  }>((props) => {
    // Common props for both slider types
    const commonProps = {
      label: props.label,
      helperText: props.helperText || undefined,
      errorMessage: props.errorMessage || undefined,
      successMessage: props.successMessage || undefined,
      warningMessage: props.warningMessage || undefined,
      orientation: props.orientation,
      size: props.size,
      variant: props.variant,
      min: props.min,
      max: props.max,
      step: props.step,
      disabled: props.disabled,
      readonly: props.readonly,
      required: props.required,
      showValue: props.showValue,
      showMarks: props.showMarks,
      markCount: props.markCount,
      showTicks: props.showTicks,
      tickCount: props.tickCount,
    };

    return (
      <div class={props.orientation === 'vertical' ? 'h-64' : 'w-full'}>
        {props.type === 'single' ? (
          <Slider
            {...commonProps}
            defaultValue={props.initialValue}
            onChange$={$((value) => {
              console.log('Value changed:', value);
            })}
          />
        ) : (
          <Slider
            {...commonProps}
            type="range"
            defaultValue={[props.initialRangeStart, props.initialRangeEnd]}
            minRange={props.minRange}
            onChange$={$((values) => {
              console.log('Range changed:', values);
            })}
          />
        )}
      </div>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: 'select',
      name: 'type',
      label: 'Type',
      options: [
        { label: 'Single', value: 'single' },
        { label: 'Range', value: 'range' }
      ],
      defaultValue: 'single'
    },
    {
      type: 'text',
      name: 'label',
      label: 'Label',
      defaultValue: 'Slider Label'
    },
    {
      type: 'text',
      name: 'helperText',
      label: 'Helper Text',
      defaultValue: 'This is a helper text'
    },
    {
      type: 'text',
      name: 'errorMessage',
      label: 'Error Message',
      defaultValue: ''
    },
    {
      type: 'text',
      name: 'successMessage',
      label: 'Success Message',
      defaultValue: ''
    },
    {
      type: 'text',
      name: 'warningMessage',
      label: 'Warning Message',
      defaultValue: ''
    },
    {
      type: 'select',
      name: 'orientation',
      label: 'Orientation',
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' }
      ],
      defaultValue: 'horizontal'
    },
    {
      type: 'select',
      name: 'size',
      label: 'Size',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' }
      ],
      defaultValue: 'md'
    },
    {
      type: 'select',
      name: 'variant',
      label: 'Variant',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Filled', value: 'filled' }
      ],
      defaultValue: 'default'
    },
    {
      type: 'number',
      name: 'min',
      label: 'Min Value',
      defaultValue: 0
    },
    {
      type: 'number',
      name: 'max',
      label: 'Max Value',
      defaultValue: 100
    },
    {
      type: 'number',
      name: 'step',
      label: 'Step',
      defaultValue: 1
    },
    {
      type: 'number',
      name: 'initialValue',
      label: 'Initial Value (Single)',
      defaultValue: 50
    },
    {
      type: 'number',
      name: 'initialRangeStart',
      label: 'Initial Start Value (Range)',
      defaultValue: 20
    },
    {
      type: 'number',
      name: 'initialRangeEnd',
      label: 'Initial End Value (Range)',
      defaultValue: 80
    },
    {
      type: 'number',
      name: 'minRange',
      label: 'Min Range (Range only)',
      defaultValue: 10
    },
    {
      type: 'boolean',
      name: 'disabled',
      label: 'Disabled',
      defaultValue: false
    },
    {
      type: 'boolean',
      name: 'readonly',
      label: 'Read Only',
      defaultValue: false
    },
    {
      type: 'boolean',
      name: 'required',
      label: 'Required',
      defaultValue: false
    },
    {
      type: 'boolean',
      name: 'showValue',
      label: 'Show Value',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'showMarks',
      label: 'Show Marks',
      defaultValue: false
    },
    {
      type: 'number',
      name: 'markCount',
      label: 'Mark Count',
      defaultValue: 5
    },
    {
      type: 'boolean',
      name: 'showTicks',
      label: 'Show Ticks',
      defaultValue: false
    },
    {
      type: 'number',
      name: 'tickCount',
      label: 'Tick Count',
      defaultValue: 5
    }
  ];

  return (
    <PlaygroundTemplate
      component={SliderDemo}
      properties={properties}
    />
  );
}); 