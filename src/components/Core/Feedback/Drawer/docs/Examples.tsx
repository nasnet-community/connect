import { component$ } from "@builder.io/qwik";
import { CodeBlock } from "~/components/Core/Typography/CodeDisplay";
import {
  BasicDrawer,
  PlacementDrawer,
  SizeDrawer,
  DrawerWithFooter,
} from "../Examples";

export default component$(() => {
  return (
    <div class="space-y-10">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Drawer</h2>
        <p>
          The most basic usage of the Drawer component includes a header,
          content area, and a close button. The drawer appears from the right
          side of the screen by default.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <BasicDrawer />
        </div>
        <CodeBlock
          code={`
import { component$, useSignal, $ } from '@builder.io/qwik';
import { Drawer } from '~/components/Core/Feedback/Drawer';
import { Button } from '~/components/Core/button';

export const BasicDrawer = component$(() => {
  const isDrawerOpen = useSignal(false);
  
  const openDrawer = $(() => {
    isDrawerOpen.value = true;
  });
  
  const closeDrawer = $(() => {
    isDrawerOpen.value = false;
  });
  
  return (
    <div class="space-y-4">
      <Button onClick$={openDrawer}>Open Basic Drawer</Button>
      
      <Drawer 
        isOpen={isDrawerOpen.value} 
        onClose$={closeDrawer}
      >
        <div q:slot="header">Drawer Title</div>
        <div class="p-2">
          <p>This is a basic drawer with a header, content area, and close button.</p>
          <p class="mt-3">
            Drawers are used to display supplementary content without navigating 
            away from the current context.
          </p>
        </div>
      </Drawer>
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Drawer Placement</h2>
        <p>
          Drawers can be positioned to appear from any of the four sides of the
          screen: left, right, top, or bottom. Use the <code>placement</code>{" "}
          prop to control the drawer's position.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <PlacementDrawer />
        </div>
        <CodeBlock
          code={`
import { component$, useSignal, $ } from '@builder.io/qwik';
import { Drawer } from '~/components/Core/Feedback/Drawer';
import { Button } from '~/components/Core/button';

export const PlacementDrawer = component$(() => {
  const isDrawerOpen = useSignal(false);
  const placement = useSignal<'left' | 'right' | 'top' | 'bottom'>('right');
  
  const openDrawer = $((position: 'left' | 'right' | 'top' | 'bottom') => {
    placement.value = position;
    isDrawerOpen.value = true;
  });
  
  const closeDrawer = $(() => {
    isDrawerOpen.value = false;
  });
  
  return (
    <div class="space-y-4">
      <div class="flex flex-wrap gap-2">
        <Button onClick$={() => openDrawer('left')}>Left Drawer</Button>
        <Button onClick$={() => openDrawer('right')}>Right Drawer</Button>
        <Button onClick$={() => openDrawer('top')}>Top Drawer</Button>
        <Button onClick$={() => openDrawer('bottom')}>Bottom Drawer</Button>
      </div>
      
      <Drawer 
        isOpen={isDrawerOpen.value} 
        onClose$={closeDrawer}
        placement={placement.value}
      >
        <div q:slot="header">
          {placement.value.charAt(0).toUpperCase() + placement.value.slice(1)} Drawer
        </div>
        <div class="p-2">
          <p>
            This drawer is positioned to appear from the {placement.value} of the screen.
          </p>
          <p class="mt-3">
            Drawers can be positioned on any of the four sides of the screen
            depending on your application's needs.
          </p>
        </div>
      </Drawer>
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Drawer Sizes</h2>
        <p>
          Drawers come in various sizes to accommodate different amounts of
          content. Use the <code>size</code> prop to control the drawer's
          dimensions.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <SizeDrawer />
        </div>
        <CodeBlock
          code={`
import { component$, useSignal, $ } from '@builder.io/qwik';
import { Drawer } from '~/components/Core/Feedback/Drawer';
import { Button } from '~/components/Core/button';

export const SizeDrawer = component$(() => {
  const isDrawerOpen = useSignal(false);
  const size = useSignal<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
  
  const openDrawer = $((drawerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full') => {
    size.value = drawerSize;
    isDrawerOpen.value = true;
  });
  
  const closeDrawer = $(() => {
    isDrawerOpen.value = false;
  });
  
  return (
    <div class="space-y-4">
      <div class="flex flex-wrap gap-2">
        <Button onClick$={() => openDrawer('xs')}>Extra Small</Button>
        <Button onClick$={() => openDrawer('sm')}>Small</Button>
        <Button onClick$={() => openDrawer('md')}>Medium</Button>
        <Button onClick$={() => openDrawer('lg')}>Large</Button>
        <Button onClick$={() => openDrawer('xl')}>Extra Large</Button>
        <Button onClick$={() => openDrawer('full')}>Full Width</Button>
      </div>
      
      <Drawer 
        isOpen={isDrawerOpen.value} 
        onClose$={closeDrawer}
        size={size.value}
      >
        <div q:slot="header">
          {size.value.toUpperCase()} Size Drawer
        </div>
        <div class="p-2">
          <p>
            This drawer is set to the {size.value} size.
          </p>
          <p class="mt-3">
            Drawers come in various sizes to accommodate different amounts of content
            and different screen sizes.
          </p>
        </div>
      </Drawer>
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Drawer with Footer</h2>
        <p>
          You can add a footer section to the drawer for actions like buttons.
          This is useful for forms or when the drawer requires user decisions.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <DrawerWithFooter />
        </div>
        <CodeBlock
          code={`
import { component$, useSignal, $ } from '@builder.io/qwik';
import { Drawer } from '~/components/Core/Feedback/Drawer';
import { Button } from '~/components/Core/button';

export const DrawerWithFooter = component$(() => {
  const isDrawerOpen = useSignal(false);
  
  const openDrawer = $(() => {
    isDrawerOpen.value = true;
  });
  
  const closeDrawer = $(() => {
    isDrawerOpen.value = false;
  });
  
  return (
    <div class="space-y-4">
      <Button onClick$={openDrawer}>Open Drawer with Footer</Button>
      
      <Drawer 
        isOpen={isDrawerOpen.value} 
        onClose$={closeDrawer}
      >
        <div q:slot="header">Drawer with Footer</div>
        <div class="p-2">
          <p>
            This drawer includes a footer section with action buttons.
          </p>
          <p class="mt-3">
            Adding a footer is useful for drawers that require user actions
            or decisions, such as forms or confirmation dialogs.
          </p>
        </div>
        <div q:slot="footer" class="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
          <Button onClick$={closeDrawer} variant="outline">Cancel</Button>
          <Button onClick$={closeDrawer}>Save</Button>
        </div>
      </Drawer>
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>
    </div>
  );
});
