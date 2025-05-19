import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate } from '~/components/Docs/templates';

// Import examples
import { BasicTooltip } from '../Examples/BasicTooltip';
import { TooltipPlacements } from '../Examples/TooltipPlacements';
import { TooltipVariations } from '../Examples/TooltipVariations';
import AccessibleTooltip from '../Examples/AccessibleTooltip';
import InteractiveTooltip from '../Examples/InteractiveTooltip';

export default component$(() => {
  const examples = [
    {
      title: 'Basic Tooltip',
      description: 'Simple tooltips with text and rich content.',
      component: <BasicTooltip />
    },
    {
      title: 'Tooltip Placements',
      description: 'Tooltips can be positioned in different placements around their trigger element.',
      component: <TooltipPlacements />
    },
    {
      title: 'Tooltip Variations',
      description: 'Different colors, sizes, and trigger methods for tooltips.',
      component: <TooltipVariations />
    },
    {
      title: 'Interactive Tooltips',
      description: 'Tooltips that users can interact with, and programmatically controlled tooltips.',
      component: <InteractiveTooltip />
    },
    {
      title: 'Accessible Tooltips',
      description: 'Tooltips with proper ARIA attributes and keyboard navigation support.',
      component: <AccessibleTooltip />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The Tooltip component is a versatile UI element that provides additional information or context
        when users interact with an element. Tooltips can be triggered by hover, focus, or click events,
        and can contain both simple text and complex content.
      </p>
      <p>
        These examples demonstrate the various ways to use and customize tooltips in your application,
        from basic usage to advanced interactive features.
      </p>
    </ExamplesTemplate>
  );
});
