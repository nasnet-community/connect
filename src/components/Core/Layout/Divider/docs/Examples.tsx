import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate } from '~/components/Docs/templates';
import { DividerBasic } from './examples/DividerBasic';
import { DividerOrientation } from './examples/DividerOrientation';
import { DividerThickness } from './examples/DividerThickness';
import { DividerVariants } from './examples/DividerVariants';
import { DividerColors } from './examples/DividerColors';
import { DividerWithLabel } from './examples/DividerWithLabel';
import { DividerSpacing } from './examples/DividerSpacing';

export default component$(() => {
  const examples = [
    {
      id: 'basic',
      title: 'Basic Divider',
      description: 'A simple divider with default styling.',
      component: DividerBasic,
      code: `
import { component$ } from '@builder.io/qwik';
import { Divider } from '~/components/Core/Layout/Divider';

export default component$(() => {
  return (
    <div class="space-y-4">
      <p>Content above the divider</p>
      <Divider />
      <p>Content below the divider</p>
    </div>
  );
});
      `,
    },
    {
      id: 'orientation',
      title: 'Divider Orientation',
      description: 'Dividers can be horizontal (default) or vertical.',
      component: DividerOrientation,
      code: `
import { component$ } from '@builder.io/qwik';
import { Divider } from '~/components/Core/Layout/Divider';

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <p class="mb-2">Horizontal divider (default)</p>
        <Divider />
      </div>
      
      <div class="flex h-20">
        <div class="w-1/2">
          <p>Left content</p>
        </div>
        <Divider orientation="vertical" />
        <div class="w-1/2 pl-4">
          <p>Right content</p>
        </div>
      </div>
    </div>
  );
});
      `,
    },
    {
      id: 'thickness',
      title: 'Divider Thickness',
      description: 'Dividers come in three thickness variants: thin, medium, and thick.',
      component: DividerThickness,
      code: `
import { component$ } from '@builder.io/qwik';
import { Divider } from '~/components/Core/Layout/Divider';

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <p class="mb-2">Thin divider</p>
        <Divider thickness="thin" />
      </div>
      
      <div>
        <p class="mb-2">Medium divider (default)</p>
        <Divider thickness="medium" />
      </div>
      
      <div>
        <p class="mb-2">Thick divider</p>
        <Divider thickness="thick" />
      </div>
    </div>
  );
});
      `,
    },
    {
      id: 'variants',
      title: 'Divider Variants',
      description: 'Dividers can be styled as solid (default), dashed, or dotted lines.',
      component: DividerVariants,
      code: `
import { component$ } from '@builder.io/qwik';
import { Divider } from '~/components/Core/Layout/Divider';

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <p class="mb-2">Solid divider (default)</p>
        <Divider variant="solid" />
      </div>
      
      <div>
        <p class="mb-2">Dashed divider</p>
        <Divider variant="dashed" />
      </div>
      
      <div>
        <p class="mb-2">Dotted divider</p>
        <Divider variant="dotted" />
      </div>
    </div>
  );
});
      `,
    },
    {
      id: 'colors',
      title: 'Divider Colors',
      description: 'Dividers can be styled with different semantic colors.',
      component: DividerColors,
      code: `
import { component$ } from '@builder.io/qwik';
import { Divider } from '~/components/Core/Layout/Divider';

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <p class="mb-2">Default color</p>
        <Divider color="default" />
      </div>
      
      <div>
        <p class="mb-2">Primary color</p>
        <Divider color="primary" />
      </div>
      
      <div>
        <p class="mb-2">Secondary color</p>
        <Divider color="secondary" />
      </div>
      
      <div>
        <p class="mb-2">Muted color</p>
        <Divider color="muted" />
      </div>
    </div>
  );
});
      `,
    },
    {
      id: 'with-label',
      title: 'Divider with Label',
      description: 'Dividers can include text labels with different positions.',
      component: DividerWithLabel,
      code: `
import { component$ } from '@builder.io/qwik';
import { Divider } from '~/components/Core/Layout/Divider';

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <p class="mb-2">Center label (default)</p>
        <Divider label="Section" labelPosition="center" />
      </div>
      
      <div>
        <p class="mb-2">Start label</p>
        <Divider label="Section" labelPosition="start" />
      </div>
      
      <div>
        <p class="mb-2">End label</p>
        <Divider label="Section" labelPosition="end" />
      </div>
    </div>
  );
});
      `,
    },
    {
      id: 'spacing',
      title: 'Divider Spacing',
      description: 'Control the spacing around dividers to create visual rhythm.',
      component: DividerSpacing,
      code: `
import { component$ } from '@builder.io/qwik';
import { Divider } from '~/components/Core/Layout/Divider';

export default component$(() => {
  return (
    <div class="space-y-8 border-t border-b py-4">
      <div>
        <p>No extra spacing</p>
        <Divider spacing="none" />
        <p>Tight content</p>
      </div>
      
      <div>
        <p>Small spacing</p>
        <Divider spacing="sm" />
        <p>Content with small gap</p>
      </div>
      
      <div>
        <p>Medium spacing (default)</p>
        <Divider spacing="md" />
        <p>Content with medium gap</p>
      </div>
      
      <div>
        <p>Large spacing</p>
        <Divider spacing="lg" />
        <p>Content with large gap</p>
      </div>
    </div>
  );
});
      `,
    },
  ];

  return <ExamplesTemplate examples={examples} />;
});
