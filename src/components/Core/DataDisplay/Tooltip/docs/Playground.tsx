import { component$ } from '@builder.io/qwik';
import { PlaygroundTemplate } from '~/components/Docs/templates';
import { Tooltip, type TooltipPlacement, type TooltipColor, type TooltipSize } from '../index';
import { Button } from '~/components/Core/Input/Button';

export default component$(() => {
  return (
    <PlaygroundTemplate
      componentName="Tooltip"
      usage={`
import { Tooltip } from '~/components/Core/DataDisplay/Tooltip';

<Tooltip
  content="This is a tooltip"
  placement="top"
  color="default"
  size="md"
  offset={8}
  delay={0}
>
  <Button>Hover Me</Button>
</Tooltip>
      `}
      controls={[
        {
          type: 'text',
          label: 'Content',
          defaultValue: 'This is a customizable tooltip',
          propertyName: 'content'
        },
        {
          type: 'select',
          label: 'Placement',
          options: [
            'top', 
            'top-start', 
            'top-end', 
            'right', 
            'right-start', 
            'right-end',
            'bottom',
            'bottom-start',
            'bottom-end',
            'left',
            'left-start',
            'left-end'
          ],
          defaultValue: 'top',
          propertyName: 'placement'
        },
        {
          type: 'select',
          label: 'Color',
          options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
          defaultValue: 'default',
          propertyName: 'color'
        },
        {
          type: 'select',
          label: 'Size',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
          propertyName: 'size'
        },
        {
          type: 'number',
          label: 'Offset',
          defaultValue: 8,
          propertyName: 'offset'
        },
        {
          type: 'number',
          label: 'Delay (ms)',
          defaultValue: 0,
          propertyName: 'delay'
        },
        {
          type: 'select',
          label: 'Trigger',
          options: ['hover', 'click', 'focus', 'hover_focus'],
          defaultValue: 'hover',
          propertyName: 'trigger'
        },
        {
          type: 'boolean',
          label: 'Interactive',
          defaultValue: false,
          propertyName: 'interactive'
        },
        {
          type: 'text',
          label: 'Max Width',
          defaultValue: '200px',
          propertyName: 'maxWidth'
        }
      ]}
    >
      {(props) => {
        const triggerMap = {
          hover: 'hover',
          click: 'click',
          focus: 'focus',
          hover_focus: ['hover', 'focus']
        };
        
        return (
          <div class="flex items-center justify-center p-12">
            <Tooltip
              content={props.content as string}
              placement={props.placement as TooltipPlacement}
              color={props.color as TooltipColor}
              size={props.size as TooltipSize}
              offset={props.offset as number}
              delay={props.delay as number}
              trigger={triggerMap[props.trigger as keyof typeof triggerMap]}
              interactive={props.interactive as boolean}
              maxWidth={props.maxWidth as string}
            >
              <Button variant="outline">
                {props.trigger === 'hover' 
                  ? 'Hover Me'
                  : props.trigger === 'click'
                    ? 'Click Me'
                    : props.trigger === 'focus'
                      ? 'Focus Me (Tab)'
                      : 'Hover or Focus Me'}
              </Button>
            </Tooltip>
          </div>
        );
      }}
    </PlaygroundTemplate>
  );
});
