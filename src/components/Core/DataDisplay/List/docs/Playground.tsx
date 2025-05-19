import { component$, useSignal, $, useStore } from '@builder.io/qwik';
import { PlaygroundTemplate } from '~/components/Docs/templates';
import { List, ListItem, ListTerm, ListDescription } from '../List';

export default component$(() => {
  const variantOptions = ['unordered', 'ordered', 'definition'];
  const markerOptions = ['disc', 'circle', 'square', 'decimal', 'roman', 'alpha', 'none'];
  const sizeOptions = ['sm', 'md', 'lg'];
  const spacingOptions = ['compact', 'normal', 'relaxed'];

  const state = useStore({
    variant: 'unordered',
    marker: 'disc',
    size: 'md',
    spacing: 'normal',
    nested: false,
    start: 1,
    reversed: false,
    ariaLabel: 'Example list',
  });

  const code = useSignal('');

  const generateCode = $(() => {
    const props = [];
    
    if (state.variant !== 'unordered') {
      props.push(`variant="${state.variant}"`);
    }
    
    // Only add marker if it's not the default for the selected variant
    if ((state.variant === 'unordered' && state.marker !== 'disc') || 
        (state.variant === 'ordered' && state.marker !== 'decimal') || 
        (state.variant !== 'ordered' && state.variant !== 'unordered')) {
      props.push(`marker="${state.marker}"`);
    }
    
    if (state.size !== 'md') {
      props.push(`size="${state.size}"`);
    }
    
    if (state.spacing !== 'normal') {
      props.push(`spacing="${state.spacing}"`);
    }
    
    if (state.nested) {
      props.push('nested');
    }
    
    if (state.variant === 'ordered' && state.start !== 1) {
      props.push(`start={${state.start}}`);
    }
    
    if (state.variant === 'ordered' && state.reversed) {
      props.push('reversed');
    }
    
    if (state.ariaLabel) {
      props.push(`ariaLabel="${state.ariaLabel}"`);
    }

    const propsString = props.length > 0 ? ' ' + props.join(' ') : '';
    
    let listItems = '';
    if (state.variant === 'definition') {
      listItems = `
  <ListTerm>Term 1</ListTerm>
  <ListDescription>Description for term 1</ListDescription>
  <ListTerm>Term 2</ListTerm>
  <ListDescription>Description for term 2</ListDescription>`;
    } else {
      listItems = `
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
  <ListItem>Third item</ListItem>`;
    }

    code.value = `<List${propsString}>${listItems}
</List>`;
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
            
            // Adjust default marker based on variant
            if (value === 'unordered') {
              state.marker = 'disc';
            } else if (value === 'ordered') {
              state.marker = 'decimal';
            }
            
            generateCode();
          })
        },
        {
          type: 'select',
          label: 'Marker',
          options: markerOptions,
          value: state.marker,
          onChange$: $((value: string) => {
            state.marker = value;
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
          label: 'Spacing',
          options: spacingOptions,
          value: state.spacing,
          onChange$: $((value: string) => {
            state.spacing = value;
            generateCode();
          })
        },
        {
          type: 'boolean',
          label: 'Nested',
          value: state.nested,
          onChange$: $((value: boolean) => {
            state.nested = value;
            generateCode();
          })
        },
        {
          type: 'number',
          label: 'Start (ordered list)',
          value: state.start,
          min: 1,
          max: 100,
          step: 1,
          disabled: state.variant !== 'ordered',
          onChange$: $((value: number) => {
            state.start = value;
            generateCode();
          })
        },
        {
          type: 'boolean',
          label: 'Reversed (ordered list)',
          value: state.reversed,
          disabled: state.variant !== 'ordered',
          onChange$: $((value: boolean) => {
            state.reversed = value;
            generateCode();
          })
        },
        {
          type: 'text',
          label: 'ARIA Label',
          value: state.ariaLabel,
          onChange$: $((value: string) => {
            state.ariaLabel = value;
            generateCode();
          })
        }
      ]}
      preview={
        <div class="p-4">
          {state.variant === 'definition' ? (
            <List 
              variant={state.variant as any} 
              marker={state.marker as any}
              size={state.size as any}
              spacing={state.spacing as any}
              nested={state.nested}
              ariaLabel={state.ariaLabel}
            >
              <ListTerm>Term 1</ListTerm>
              <ListDescription>Description for term 1</ListDescription>
              <ListTerm>Term 2</ListTerm>
              <ListDescription>Description for term 2</ListDescription>
            </List>
          ) : (
            <List 
              variant={state.variant as any} 
              marker={state.marker as any}
              size={state.size as any}
              spacing={state.spacing as any}
              nested={state.nested}
              start={state.start}
              reversed={state.reversed}
              ariaLabel={state.ariaLabel}
            >
              <ListItem>First item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </List>
          )}
        </div>
      }
      code={code}
      onMount$={generateCode}
    >
      <p>
        Use the controls to customize the List component. This playground lets you experiment with 
        different variants, marker styles, sizes, spacing options, and other properties to see 
        how they affect the appearance and behavior of the List.
      </p>
    </PlaygroundTemplate>
  );
});
