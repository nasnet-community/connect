import { component$ } from '@builder.io/qwik';
import { PlaygroundTemplate, type PropertyControl } from '~/components/Docs/templates/PlaygroundTemplate';
import { Stack } from '~/components/Core/Layout/Stack';
import { Box } from '~/components/Core/Layout/Box';

export const StackPlayground = component$(() => {
  // Define the Stack component that will be rendered in the playground
  const StackPreview = component$((props: any) => {
    const { 
      direction, 
      spacing, 
      justify, 
      align, 
      wrap,
      dividers,
      dividerColor,
      reverse
    } = props;
    
    return (
      <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div>
          <Stack
            direction={direction}
            spacing={spacing}
            justify={justify}
            align={align}
            wrap={wrap}
            dividers={dividers}
            dividerColor={dividerColor}
            reverse={reverse}
          >
            <Box padding="md" backgroundColor="primary" borderRadius="md" class="text-white">Item 1</Box>
            <Box padding="md" backgroundColor="primary" borderRadius="md" class="text-white">Item 2</Box>
            <Box padding="md" backgroundColor="primary" borderRadius="md" class="text-white">Item 3</Box>
          </Stack>
        </div>
      </div>
    );
  });
  
  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: 'select',
      name: 'direction',
      label: 'Direction',
      defaultValue: 'column',
      options: [
        { label: "Column", value: "column" },
        { label: "Row", value: "row" }
      ]
    },
    {
      type: 'select',
      name: 'spacing',
      label: 'Spacing',
      defaultValue: 'md',
      options: [
        { label: "None", value: "none" },
        { label: "Extra Small (xs)", value: "xs" },
        { label: "Small (sm)", value: "sm" },
        { label: "Medium (md)", value: "md" },
        { label: "Large (lg)", value: "lg" },
        { label: "Extra Large (xl)", value: "xl" },
        { label: "2XL", value: "2xl" },
        { label: "3XL", value: "3xl" }
      ]
    },
    {
      type: 'select',
      name: 'justify',
      label: 'Justify',
      defaultValue: 'start',
      options: [
        { label: "Start", value: "start" },
        { label: "Center", value: "center" },
        { label: "End", value: "end" },
        { label: "Space Between", value: "between" },
        { label: "Space Around", value: "around" },
        { label: "Space Evenly", value: "evenly" }
      ]
    },
    {
      type: 'select',
      name: 'align',
      label: 'Align',
      defaultValue: 'start',
      options: [
        { label: "Start", value: "start" },
        { label: "Center", value: "center" },
        { label: "End", value: "end" },
        { label: "Stretch", value: "stretch" },
        { label: "Baseline", value: "baseline" }
      ]
    },
    {
      type: 'select',
      name: 'wrap',
      label: 'Wrap',
      defaultValue: 'nowrap',
      options: [
        { label: "No Wrap", value: "nowrap" },
        { label: "Wrap", value: "wrap" },
        { label: "Wrap Reverse", value: "wrap-reverse" }
      ]
    },
    {
      type: 'boolean',
      name: 'dividers',
      label: 'Dividers',
      defaultValue: false
    },
    {
      type: 'select',
      name: 'dividerColor',
      label: 'Divider Color',
      defaultValue: 'muted',
      options: [
        { label: "Default", value: "default" },
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Muted", value: "muted" }
      ]
    },
    {
      type: 'boolean',
      name: 'reverse',
      label: 'Reverse Order',
      defaultValue: false
    }
  ];
  
  return (
    <PlaygroundTemplate
      component={StackPreview}
      properties={properties}
    />
  );
});

export default StackPlayground;
