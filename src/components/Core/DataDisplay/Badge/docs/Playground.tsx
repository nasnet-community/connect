import { component$, useSignal } from '@builder.io/qwik';
import { PlaygroundTemplate } from '~/components/Docs/templates/PlaygroundTemplate';
import { Badge } from '~/components/Core/DataDisplay/Badge';
import { Card } from '~/components/Core/Card/Card';
import { HiCheckCircleSolid } from '@qwikest/icons/heroicons';

export default component$(() => {
  // State for playground controls
  const variant = useSignal<'solid' | 'soft' | 'outline'>('solid');
  const size = useSignal<'sm' | 'md' | 'lg'>('md');
  const color = useSignal<'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'>('primary');
  const shape = useSignal<'square' | 'rounded' | 'pill'>('rounded');
  const badgeText = useSignal('Badge');
  const dismissible = useSignal(false);
  const dot = useSignal(false);
  const dotPosition = useSignal<'start' | 'end'>('start');
  const bordered = useSignal(false);
  const showStartIcon = useSignal(false);
  const maxWidth = useSignal('');
  const truncate = useSignal(false);

  return (
    <PlaygroundTemplate
      component={Badge}
      properties={[
        {
          type: 'select',
          name: 'variant',
          label: 'Variant',
          defaultValue: 'solid',
          options: [
            { label: 'Solid', value: 'solid' },
            { label: 'Soft', value: 'soft' },
            { label: 'Outline', value: 'outline' }
          ]
        },
        {
          type: 'select',
          name: 'size',
          label: 'Size',
          defaultValue: 'md',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' }
          ]
        },
        {
          type: 'select',
          name: 'color',
          label: 'Color',
          defaultValue: 'primary',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Success', value: 'success' },
            { label: 'Warning', value: 'warning' },
            { label: 'Error', value: 'error' },
            { label: 'Info', value: 'info' }
          ]
        },
        {
          type: 'select',
          name: 'shape',
          label: 'Shape',
          defaultValue: 'rounded',
          options: [
            { label: 'Square', value: 'square' },
            { label: 'Rounded', value: 'rounded' },
            { label: 'Pill', value: 'pill' }
          ]
        },
        {
          type: 'text',
          name: 'badgeText',
          label: 'Text',
          defaultValue: 'Badge'
        },
        {
          type: 'boolean',
          name: 'dismissible',
          label: 'Dismissible',
          defaultValue: false
        },
        {
          type: 'boolean',
          name: 'dot',
          label: 'Dot',
          defaultValue: false
        },
        {
          type: 'select',
          name: 'dotPosition',
          label: 'Dot Position',
          defaultValue: 'start',
          options: [
            { label: 'Start', value: 'start' },
            { label: 'End', value: 'end' }
          ]
        },
        {
          type: 'boolean',
          name: 'bordered',
          label: 'Bordered',
          defaultValue: false
        },
        {
          type: 'boolean',
          name: 'showStartIcon',
          label: 'Start Icon',
          defaultValue: false
        },
        {
          type: 'text',
          name: 'maxWidth',
          label: 'Max Width',
          defaultValue: ''
        },
        {
          type: 'boolean',
          name: 'truncate',
          label: 'Truncate',
          defaultValue: false
        }
      ]}
    >
      <Card class="flex flex-col items-center justify-center p-10 w-full">
        <Badge
          variant={variant.value}
          size={size.value}
          color={color.value}
          shape={shape.value}
          dismissible={dismissible.value}
          onDismiss$={() => console.log('Badge dismissed')}
          dot={dot.value}
          dotPosition={dotPosition.value}
          bordered={bordered.value}
          maxWidth={maxWidth.value}
          truncate={truncate.value}
          startIcon={showStartIcon.value ? <HiCheckCircleSolid class="h-3.5 w-3.5" /> : undefined}
        >
          {badgeText.value}
        </Badge>
      </Card>
    </PlaygroundTemplate>
  );
});
