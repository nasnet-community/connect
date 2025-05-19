import { component$, useSignal, $, useStore } from '@builder.io/qwik';
import { PlaygroundTemplate } from '~/components/Docs/templates';
import Divider from '../Divider';

export default component$(() => {
  const orientationOptions = ['horizontal', 'vertical'];
  const thicknessOptions = ['thin', 'medium', 'thick'];
  const variantOptions = ['solid', 'dashed', 'dotted'];
  const colorOptions = ['default', 'primary', 'secondary', 'muted'];
  const labelPositionOptions = ['start', 'center', 'end'];
  const spacingOptions = ['none', 'xs', 'sm', 'md', 'lg', 'xl'];

  const state = useStore({
    orientation: 'horizontal',
    thickness: 'medium',
    variant: 'solid',
    color: 'default',
    hasLabel: false,
    label: 'Divider Label',
    labelPosition: 'center',
    spacing: 'md',
  });

  const code = useSignal('');

  const generateCode = $(() => {
    const props = [];
    
    if (state.orientation !== 'horizontal') {
      props.push(`orientation="${state.orientation}"`);
    }
    
    if (state.thickness !== 'medium') {
      props.push(`thickness="${state.thickness}"`);
    }
    
    if (state.variant !== 'solid') {
      props.push(`variant="${state.variant}"`);
    }
    
    if (state.color !== 'default') {
      props.push(`color="${state.color}"`);
    }
    
    if (state.hasLabel) {
      props.push(`label="${state.label}"`);
      
      if (state.labelPosition !== 'center') {
        props.push(`labelPosition="${state.labelPosition}"`);
      }
    }
    
    if (state.spacing !== 'md') {
      props.push(`spacing="${state.spacing}"`);
    }
    
    const propsString = props.length > 0 ? props.join('\n  ') : '';
    
    const componentCode = `
import { component$ } from '@builder.io/qwik';
import { Divider } from '~/components/Core/Layout/Divider';

export default component$(() => {
  return (
    <div${state.orientation === 'vertical' ? ' class="flex h-40"' : ''}>
      ${state.orientation === 'vertical' ? '<div class="w-1/2">\n      <p>Left content</p>\n    </div>\n    ' : ''}
      <Divider${props.length > 0 ? '\n  ' + propsString : ''} />
      ${state.orientation === 'vertical' ? '\n    <div class="w-1/2 pl-4">\n      <p>Right content</p>\n    </div>' : ''}
    </div>
  );
});`;

    code.value = componentCode;
  });

  return (
    <PlaygroundTemplate
      controls={[
        {
          type: 'select',
          label: 'Orientation',
          options: orientationOptions,
          value: state.orientation,
          onChange$: $((value: string) => {
            state.orientation = value;
            generateCode();
          })
        },
        {
          type: 'select',
          label: 'Thickness',
          options: thicknessOptions,
          value: state.thickness,
          onChange$: $((value: string) => {
            state.thickness = value;
            generateCode();
          })
        },
        {
          type: 'select',
          label: 'Variant',
          options: variantOptions,
          value: state.variant,
          onChange$: $((value: string) => {
            state.variant = value;
            generateCode();
          })
        },
        {
          type: 'select',
          label: 'Color',
          options: colorOptions,
          value: state.color,
          onChange$: $((value: string) => {
            state.color = value;
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
          label: 'Spacing',
          options: spacingOptions,
          value: state.spacing,
          onChange$: $((value: string) => {
            state.spacing = value;
            generateCode();
          })
        }
      ]}
      preview={
        <div class="p-6">
          {state.orientation === 'horizontal' ? (
            <Divider
              orientation={state.orientation as any}
              thickness={state.thickness as any}
              variant={state.variant as any}
              color={state.color as any}
              label={state.hasLabel ? state.label : undefined}
              labelPosition={state.labelPosition as any}
              spacing={state.spacing as any}
            />
          ) : (
            <div class="flex h-40">
              <div class="w-1/2">
                <p>Left content</p>
              </div>
              <Divider
                orientation={state.orientation as any}
                thickness={state.thickness as any}
                variant={state.variant as any}
                color={state.color as any}
                label={state.hasLabel ? state.label : undefined}
                labelPosition={state.labelPosition as any}
                spacing={state.spacing as any}
              />
              <div class="w-1/2 pl-4">
                <p>Right content</p>
              </div>
            </div>
          )}
        </div>
      }
      code={code}
      onMount$={generateCode}
    >
      <p>
        Use the controls to customize the Divider component. This playground lets you experiment with 
        different orientations, styles, colors, and labels to see how the Divider component can be 
        configured for your specific use case.
      </p>
    </PlaygroundTemplate>
  );
});
