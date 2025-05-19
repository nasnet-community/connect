import { component$, useSignal, $, useStore } from '@builder.io/qwik';
import { PlaygroundTemplate } from '~/components/Docs/templates';
import { Button } from '../Button';
import { HiArrowRightOutline, HiCheckOutline } from "@qwikest/icons/heroicons";

export default component$(() => {
  const variantOptions = ['primary', 'secondary', 'outline', 'ghost'];
  const sizeOptions = ['sm', 'md', 'lg'];
  const typeOptions = ['button', 'submit', 'reset'];

  const state = useStore({
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
    leftIcon: false,
    rightIcon: false,
    customClass: '',
    label: 'Button',
  });

  const code = useSignal('');

  const generateCode = $(() => {
    const props = [];
    
    if (state.variant !== 'primary') {
      props.push(`variant="${state.variant}"`);
    }
    
    if (state.size !== 'md') {
      props.push(`size="${state.size}"`);
    }
    
    if (state.type !== 'button') {
      props.push(`type="${state.type}"`);
    }
    
    if (state.disabled) {
      props.push('disabled');
    }
    
    if (state.loading) {
      props.push('loading');
    }
    
    if (state.leftIcon) {
      props.push('leftIcon');
    }
    
    if (state.rightIcon) {
      props.push('rightIcon');
    }
    
    if (state.customClass) {
      props.push(`class="${state.customClass}"`);
    }

    const propsString = props.length > 0 ? ' ' + props.join(' ') : '';
    
    let buttonCode = `<Button${propsString}>`;
    
    if (state.leftIcon) {
      buttonCode += `
  <span q:slot="leftIcon"><HiCheckOutline class="h-4 w-4" /></span>`;
    }
    
    buttonCode += `
  ${state.label}`;
    
    if (state.rightIcon) {
      buttonCode += `
  <span q:slot="rightIcon"><HiArrowRightOutline class="h-4 w-4" /></span>`;
    }
    
    buttonCode += `
</Button>`;
    
    const importCode = `import { Button } from '~/components/Core/button';`;
    
    const iconImportCode = state.leftIcon || state.rightIcon
      ? `\nimport { ${state.leftIcon ? 'HiCheckOutline' : ''}${state.leftIcon && state.rightIcon ? ', ' : ''}${state.rightIcon ? 'HiArrowRightOutline' : ''} } from "@qwikest/icons/heroicons";`
      : '';
    
    code.value = `${importCode}${iconImportCode}\n\n${buttonCode}`;
  });

  return (
    <PlaygroundTemplate
      controls={[
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
          label: 'Size',
          options: sizeOptions,
          value: state.size,
          onChange$: $((value: string) => {
            state.size = value;
            generateCode();
          })
        },
        {
          type: 'select',
          label: 'Type',
          options: typeOptions,
          value: state.type,
          onChange$: $((value: string) => {
            state.type = value;
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
          label: 'Loading',
          value: state.loading,
          onChange$: $((value: boolean) => {
            state.loading = value;
            generateCode();
          })
        },
        {
          type: 'boolean',
          label: 'Left Icon',
          value: state.leftIcon,
          onChange$: $((value: boolean) => {
            state.leftIcon = value;
            generateCode();
          })
        },
        {
          type: 'boolean',
          label: 'Right Icon',
          value: state.rightIcon,
          onChange$: $((value: boolean) => {
            state.rightIcon = value;
            generateCode();
          })
        },
        {
          type: 'text',
          label: 'Button Text',
          value: state.label,
          onChange$: $((value: string) => {
            state.label = value;
            generateCode();
          })
        },
        {
          type: 'text',
          label: 'Custom Class',
          value: state.customClass,
          onChange$: $((value: string) => {
            state.customClass = value;
            generateCode();
          })
        }
      ]}
      preview={
        <div class="p-4 flex justify-center">
          <Button
            variant={state.variant as any}
            size={state.size as any}
            type={state.type as any}
            disabled={state.disabled}
            loading={state.loading}
            leftIcon={state.leftIcon}
            rightIcon={state.rightIcon}
            class={state.customClass}
          >
            {state.leftIcon && (
              <span q:slot="leftIcon"><HiCheckOutline class="h-4 w-4" /></span>
            )}
            {state.label}
            {state.rightIcon && (
              <span q:slot="rightIcon"><HiArrowRightOutline class="h-4 w-4" /></span>
            )}
          </Button>
        </div>
      }
      code={code}
      onMount$={generateCode}
    >
      <p>
        Use the controls to customize the Button component. This playground lets you experiment with 
        different variants, sizes, states, and icon configurations to see how the Button component can 
        be configured for your specific use case.
      </p>
    </PlaygroundTemplate>
  );
});
