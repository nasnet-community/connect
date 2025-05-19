import { component$, useSignal, $, useStore } from '@builder.io/qwik';
import { PlaygroundTemplate } from '~/components/Docs/templates';
import { Toggle } from '../Toggle';

export default component$(() => {
  const sizeOptions = ['sm', 'md', 'lg'];
  const labelPositionOptions = ['left', 'right'];

  const state = useStore({
    checked: false,
    label: 'Toggle feature',
    labelPosition: 'right',
    size: 'md',
    disabled: false,
    required: false,
    hasLabel: true,
  });

  const code = useSignal('');

  const generateCode = $(() => {
    const props = [];
    
    // Always include checked and onChange$ since they're required
    props.push(`checked={isEnabled.value}`);
    props.push(`onChange$={$((checked) => { isEnabled.value = checked; })}`);
    
    // Add optional props when they differ from defaults
    if (state.hasLabel && state.label) {
      props.push(`label="${state.label}"`);
    }
    
    if (state.labelPosition !== 'right' && state.hasLabel) {
      props.push(`labelPosition="${state.labelPosition}"`);
    }
    
    if (state.size !== 'md') {
      props.push(`size="${state.size}"`);
    }
    
    if (state.disabled) {
      props.push('disabled');
    }
    
    if (state.required) {
      props.push('required');
    }

    // If no label is used, add aria-label
    if (!state.hasLabel) {
      props.push('aria-label="Toggle feature"');
    }
    
    const propsString = props.length > 0 ? props.join('\n  ') : '';
    
    const componentCode = `
import { component$, useSignal, $ } from '@builder.io/qwik';
import { Toggle } from '~/components/Core/Toggle';

export default component$(() => {
  const isEnabled = useSignal(${state.checked});
  
  return (
    <Toggle
      ${propsString}
    />
  );
});`;

    code.value = componentCode;
  });

  return (
    <PlaygroundTemplate
      controls={[
        {
          type: 'boolean',
          label: 'Checked',
          value: state.checked,
          onChange$: $((value: boolean) => {
            state.checked = value;
            generateCode();
          })
        },
        {
          type: 'boolean',
          label: 'Has Label',
          value: state.hasLabel,
          onChange$: $((value: boolean) => {
            state.hasLabel = value;
            generateCode();
          })
        },
        {
          type: 'text',
          label: 'Label Text',
          value: state.label,
          disabled: !state.hasLabel,
          onChange$: $((value: string) => {
            state.label = value;
            generateCode();
          })
        },
        {
          type: 'select',
          label: 'Label Position',
          options: labelPositionOptions,
          value: state.labelPosition,
          disabled: !state.hasLabel,
          onChange$: $((value: string) => {
            state.labelPosition = value;
            generateCode();
          })
        },
        {
          type: 'select',
          label: 'Size',
          options: sizeOptions,
          value: state.size,
          onChange$: $((value: string) => {
            state.size = value;
            generateCode();
          })
        },
        {
          type: 'boolean',
          label: 'Disabled',
          value: state.disabled,
          onChange$: $((value: boolean) => {
            state.disabled = value;
            generateCode();
          })
        },
        {
          type: 'boolean',
          label: 'Required',
          value: state.required,
          onChange$: $((value: boolean) => {
            state.required = value;
            generateCode();
          })
        }
      ]}
      preview={
        <div class="p-6 flex justify-center">
          <Toggle
            checked={state.checked}
            onChange$={$((checked) => {
              state.checked = checked;
              generateCode();
            })}
            label={state.hasLabel ? state.label : undefined}
            labelPosition={state.labelPosition as any}
            size={state.size as any}
            disabled={state.disabled}
            required={state.required}
            aria-label={!state.hasLabel ? "Toggle feature" : undefined}
          />
        </div>
      }
      code={code}
      onMount$={generateCode}
    >
      <p>
        Use the controls to customize the Toggle component. This playground lets you experiment with 
        different sizes, label positions, states, and other properties to see how the Toggle component 
        can be configured for your specific use case.
      </p>
    </PlaygroundTemplate>
  );
});
