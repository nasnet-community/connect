import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate } from "~/components/Docs/templates";
import { FlexBasic } from "./examples/FlexBasic";
import { FlexDirection } from "./examples/FlexDirection";
import { FlexAlignment } from "./examples/FlexAlignment";
import { FlexGap } from "./examples/FlexGap";
import { FlexResponsive } from "./examples/FlexResponsive";
import { FlexNested } from "./examples/FlexNested";
import { FlexItems } from "./examples/FlexItems";

export default component$(() => {
  const examples = [
    {
      id: "basic",
      title: "Basic Flex",
      description: "A simple row flex container with evenly spaced items.",
      component: FlexBasic,
      code: `
import { component$ } from '@builder.io/qwik';
import { Flex } from '~/components/Core/Layout/Flex';

export default component$(() => {
  return (
    <Flex justify="between" align="center" gap="md" class="bg-surface p-4 rounded-md">
      <div class="bg-primary text-white p-4 rounded-md">Item 1</div>
      <div class="bg-primary text-white p-4 rounded-md">Item 2</div>
      <div class="bg-primary text-white p-4 rounded-md">Item 3</div>
    </Flex>
  );
});
      `,
    },
    {
      id: "direction",
      title: "Flex Direction",
      description:
        "Control the direction of flex items with the direction prop.",
      component: FlexDirection,
      code: `
import { component$ } from '@builder.io/qwik';
import { Flex } from '~/components/Core/Layout/Flex';

export default component$(() => {
  return (
    <div class="space-y-8">
      <Flex direction="row" gap="md" class="bg-surface p-4 rounded-md">
        <div class="bg-primary text-white p-4 rounded-md">Row Item 1</div>
        <div class="bg-primary text-white p-4 rounded-md">Row Item 2</div>
        <div class="bg-primary text-white p-4 rounded-md">Row Item 3</div>
      </Flex>
      
      <Flex direction="column" gap="md" class="bg-surface p-4 rounded-md">
        <div class="bg-primary text-white p-4 rounded-md">Column Item 1</div>
        <div class="bg-primary text-white p-4 rounded-md">Column Item 2</div>
        <div class="bg-primary text-white p-4 rounded-md">Column Item 3</div>
      </Flex>
      
      <Flex direction="row-reverse" gap="md" class="bg-surface p-4 rounded-md">
        <div class="bg-primary text-white p-4 rounded-md">Row Reverse Item 1</div>
        <div class="bg-primary text-white p-4 rounded-md">Row Reverse Item 2</div>
        <div class="bg-primary text-white p-4 rounded-md">Row Reverse Item 3</div>
      </Flex>
    </div>
  );
});
      `,
    },
    {
      id: "alignment",
      title: "Flex Alignment",
      description:
        "Control how flex items are aligned with justify and align props.",
      component: FlexAlignment,
      code: `
import { component$ } from '@builder.io/qwik';
import { Flex } from '~/components/Core/Layout/Flex';

export default component$(() => {
  return (
    <div class="space-y-8">
      <p>Justify Content:</p>
      
      <Flex justify="start" gap="md" class="bg-surface p-4 rounded-md">
        <div class="bg-primary text-white p-4 rounded-md">Start</div>
        <div class="bg-primary text-white p-4 rounded-md">Start</div>
        <div class="bg-primary text-white p-4 rounded-md">Start</div>
      </Flex>
      
      <Flex justify="center" gap="md" class="bg-surface p-4 rounded-md">
        <div class="bg-primary text-white p-4 rounded-md">Center</div>
        <div class="bg-primary text-white p-4 rounded-md">Center</div>
        <div class="bg-primary text-white p-4 rounded-md">Center</div>
      </Flex>
      
      <Flex justify="end" gap="md" class="bg-surface p-4 rounded-md">
        <div class="bg-primary text-white p-4 rounded-md">End</div>
        <div class="bg-primary text-white p-4 rounded-md">End</div>
        <div class="bg-primary text-white p-4 rounded-md">End</div>
      </Flex>
      
      <Flex justify="between" gap="md" class="bg-surface p-4 rounded-md">
        <div class="bg-primary text-white p-4 rounded-md">Between</div>
        <div class="bg-primary text-white p-4 rounded-md">Between</div>
        <div class="bg-primary text-white p-4 rounded-md">Between</div>
      </Flex>
    </div>
  );
});
      `,
    },
    {
      id: "gap",
      title: "Flex Gap",
      description: "Add space between flex items with the gap prop.",
      component: FlexGap,
      code: `
import { component$ } from '@builder.io/qwik';
import { Flex } from '~/components/Core/Layout/Flex';

export default component$(() => {
  return (
    <div class="space-y-8">
      <Flex gap="xs" class="bg-surface p-4 rounded-md">
        <div class="bg-primary text-white p-4 rounded-md">XS Gap</div>
        <div class="bg-primary text-white p-4 rounded-md">XS Gap</div>
        <div class="bg-primary text-white p-4 rounded-md">XS Gap</div>
      </Flex>
      
      <Flex gap="md" class="bg-surface p-4 rounded-md">
        <div class="bg-primary text-white p-4 rounded-md">MD Gap</div>
        <div class="bg-primary text-white p-4 rounded-md">MD Gap</div>
        <div class="bg-primary text-white p-4 rounded-md">MD Gap</div>
      </Flex>
      
      <Flex gap="xl" class="bg-surface p-4 rounded-md">
        <div class="bg-primary text-white p-4 rounded-md">XL Gap</div>
        <div class="bg-primary text-white p-4 rounded-md">XL Gap</div>
        <div class="bg-primary text-white p-4 rounded-md">XL Gap</div>
      </Flex>
    </div>
  );
});
      `,
    },
    {
      id: "responsive",
      title: "Responsive Flex",
      description: "Create layouts that adapt to different screen sizes.",
      component: FlexResponsive,
      code: `
import { component$ } from '@builder.io/qwik';
import { Flex } from '~/components/Core/Layout/Flex';

export default component$(() => {
  return (
    <Flex 
      direction={{ base: 'column', md: 'row' }} 
      gap="md"
      class="bg-surface p-4 rounded-md"
    >
      <div class="bg-primary text-white p-4 rounded-md w-full">
        Column on mobile, Row on desktop
      </div>
      <div class="bg-primary text-white p-4 rounded-md w-full">
        Column on mobile, Row on desktop
      </div>
      <div class="bg-primary text-white p-4 rounded-md w-full">
        Column on mobile, Row on desktop
      </div>
    </Flex>
  );
});
      `,
    },
    {
      id: "nested",
      title: "Nested Flex Containers",
      description: "Create complex layouts with nested flex containers.",
      component: FlexNested,
      code: `
import { component$ } from '@builder.io/qwik';
import { Flex } from '~/components/Core/Layout/Flex';

export default component$(() => {
  return (
    <Flex direction="column" gap="md" class="bg-surface p-4 rounded-md">
      <div class="bg-muted p-4 rounded-md">Header</div>
      
      <Flex gap="md" class="flex-grow">
        <div class="bg-muted p-4 rounded-md w-1/3">Sidebar</div>
        
        <Flex direction="column" gap="md" class="flex-grow">
          <div class="bg-primary text-white p-4 rounded-md">Content 1</div>
          <div class="bg-primary text-white p-4 rounded-md">Content 2</div>
          <div class="bg-primary text-white p-4 rounded-md">Content 3</div>
        </Flex>
      </Flex>
      
      <div class="bg-muted p-4 rounded-md">Footer</div>
    </Flex>
  );
});
      `,
    },
    {
      id: "items",
      title: "Flex Items",
      description: "Control individual flex item properties.",
      component: FlexItems,
      code: `
import { component$ } from '@builder.io/qwik';
import { Flex, FlexItem } from '~/components/Core/Layout/Flex';

export default component$(() => {
  return (
    <Flex gap="md" class="bg-surface p-4 rounded-md">
      <FlexItem grow={1} class="bg-primary text-white p-4 rounded-md">
        Flex grow 1
      </FlexItem>
      
      <FlexItem grow={2} class="bg-secondary text-white p-4 rounded-md">
        Flex grow 2
      </FlexItem>
      
      <FlexItem grow={1} class="bg-primary text-white p-4 rounded-md">
        Flex grow 1
      </FlexItem>
    </Flex>
  );
});
      `,
    },
  ];

  return <ExamplesTemplate examples={examples} />;
});
