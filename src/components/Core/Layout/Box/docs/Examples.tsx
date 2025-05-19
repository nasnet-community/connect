import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate } from '~/components/Docs/templates';
import { BoxBasic } from './examples/BoxBasic';
import { BoxPolymorphic } from './examples/BoxPolymorphic';
import { BoxSpacing } from './examples/BoxSpacing';
import { BoxBorders } from './examples/BoxBorders';
import { BoxBackgrounds } from './examples/BoxBackgrounds';
import { BoxShadows } from './examples/BoxShadows';

export default component$(() => {
  const examples = [
    {
      id: 'basic',
      title: 'Basic Box',
      description: 'A simple Box component with default styling.',
      component: BoxBasic,
      code: `
import { component$ } from '@builder.io/qwik';
import { Box } from '~/components/Core/Layout/Box';

export default component$(() => {
  return (
    <Box padding="md" backgroundColor="surface" borderRadius="md">
      This is a basic box with padding and background color.
    </Box>
  );
});
      `,
    },
    {
      id: 'polymorphic',
      title: 'Polymorphic Box',
      description:
        'Use the "as" prop to render Box as different HTML elements.',
      component: BoxPolymorphic,
      code: `
import { component$ } from '@builder.io/qwik';
import { Box } from '~/components/Core/Layout/Box';

export default component$(() => {
  return (
    <div class="space-y-4">
      <Box as="section" padding="md" backgroundColor="surface-alt" borderRadius="md">
        This Box renders as a &lt;section&gt; element
      </Box>
      
      <Box as="article" padding="md" backgroundColor="primary" borderRadius="md" class="text-white">
        This Box renders as an &lt;article&gt; element
      </Box>
      
      <Box as="aside" padding="md" backgroundColor="muted" borderRadius="md">
        This Box renders as an &lt;aside&gt; element
      </Box>
    </div>
  );
});
      `,
    },
    {
      id: 'spacing',
      title: 'Box with Spacing',
      description:
        'Boxes can have different padding and margin configurations.',
      component: BoxSpacing,
      code: `
import { component$ } from '@builder.io/qwik';
import { Box } from '~/components/Core/Layout/Box';

export default component$(() => {
  return (
    <div class="space-y-4">
      <Box padding="sm" margin="md" backgroundColor="surface" borderRadius="md" borderWidth="thin">
        Small padding, medium margin
      </Box>
      
      <Box 
        padding={{
          top: 'lg',
          bottom: 'lg',
          x: 'md'
        }}
        backgroundColor="surface"
        borderRadius="md"
        borderWidth="thin"
      >
        Custom padding: large top/bottom, medium left/right
      </Box>
      
      <Box 
        padding="md"
        margin={{
          top: 'xl',
          x: 'md'
        }}
        backgroundColor="surface"
        borderRadius="md"
        borderWidth="thin"
      >
        Medium padding, extra large top margin, medium left/right margin
      </Box>
    </div>
  );
});
      `,
    },
    {
      id: 'borders',
      title: 'Box with Borders',
      description:
        'Boxes can have different border styles, widths, colors, and radius.',
      component: BoxBorders,
      code: `
import { component$ } from '@builder.io/qwik';
import { Box } from '~/components/Core/Layout/Box';

export default component$(() => {
  return (
    <div class="space-y-4">
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderWidth="normal" 
        borderColor="primary" 
        borderRadius="md"
      >
        Normal border with primary color
      </Box>
      
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderWidth="thick" 
        borderStyle="dashed" 
        borderColor="secondary" 
        borderRadius="lg"
      >
        Thick dashed border with secondary color
      </Box>
      
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderWidth="thin" 
        borderStyle="dotted" 
        borderColor="error" 
        borderRadius="full"
      >
        Thin dotted border with error color and fully rounded corners
      </Box>
    </div>
  );
});
      `,
    },
    {
      id: 'backgrounds',
      title: 'Box with Backgrounds',
      description: 'Boxes can have different background colors.',
      component: BoxBackgrounds,
      code: `
import { component$ } from '@builder.io/qwik';
import { Box } from '~/components/Core/Layout/Box';

export default component$(() => {
  return (
    <div class="space-y-4">
      <Box padding="md" backgroundColor="primary" borderRadius="md" class="text-white">
        Primary background
      </Box>
      
      <Box padding="md" backgroundColor="secondary" borderRadius="md" class="text-white">
        Secondary background
      </Box>
      
      <Box padding="md" backgroundColor="success" borderRadius="md" class="text-white">
        Success background
      </Box>
      
      <Box padding="md" backgroundColor="warning" borderRadius="md">
        Warning background
      </Box>
      
      <Box padding="md" backgroundColor="error" borderRadius="md" class="text-white">
        Error background
      </Box>
      
      <Box padding="md" backgroundColor="info" borderRadius="md" class="text-white">
        Info background
      </Box>
      
      <Box padding="md" backgroundColor="muted" borderRadius="md">
        Muted background
      </Box>
      
      <Box padding="md" backgroundColor="surface" borderRadius="md" borderWidth="thin">
        Surface background
      </Box>
      
      <Box padding="md" backgroundColor="surface-alt" borderRadius="md" borderWidth="thin">
        Alternative surface background
      </Box>
    </div>
  );
});
      `,
    },
    {
      id: 'shadows',
      title: 'Box with Shadows',
      description: 'Boxes can have different shadow styles.',
      component: BoxShadows,
      code: `
import { component$ } from '@builder.io/qwik';
import { Box } from '~/components/Core/Layout/Box';

export default component$(() => {
  return (
    <div class="space-y-4">
      <Box padding="md" backgroundColor="surface" borderRadius="md" shadow="sm">
        Small shadow
      </Box>
      
      <Box padding="md" backgroundColor="surface" borderRadius="md" shadow="md">
        Medium shadow
      </Box>
      
      <Box padding="md" backgroundColor="surface" borderRadius="md" shadow="lg">
        Large shadow
      </Box>
      
      <Box padding="md" backgroundColor="surface" borderRadius="md" shadow="xl">
        Extra large shadow
      </Box>
      
      <Box padding="md" backgroundColor="surface" borderRadius="md" shadow="2xl">
        2x large shadow
      </Box>
      
      <Box padding="md" backgroundColor="surface" borderRadius="md" shadow="inner">
        Inner shadow
      </Box>
    </div>
  );
});
      `,
    },
  ];

  return <ExamplesTemplate examples={examples} />;
});
