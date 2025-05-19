import { component$ } from "@builder.io/qwik";
import { CodeBlock } from "~/components/Core/Typography/CodeDisplay";
import { BasicSwitch, SizeSwitch, LabeledSwitch, DisabledSwitch } from "../Examples";

export default component$(() => {
  return (
    <div class="space-y-10">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Switch</h2>
        <p>
          The basic Switch component toggles between on and off states.
          It provides visual feedback for the current state and includes accessibility support.
        </p>
        <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <BasicSwitch />
        </div>
        <CodeBlock
          code={`
import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export const BasicSwitch = component$(() => {
  const isChecked = useSignal(false);
  
  return (
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <Switch 
          checked={isChecked.value} 
          onChange$={(checked) => isChecked.value = checked} 
          aria-label="Toggle feature"
        />
        <span>Feature is {isChecked.value ? 'enabled' : 'disabled'}</span>
      </div>
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Switch Sizes</h2>
        <p>
          The Switch component comes in different sizes to fit various UI contexts.
          Use the <code>size</code> prop to control the switch's dimensions.
        </p>
        <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <SizeSwitch />
        </div>
        <CodeBlock
          code={`
import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export const SizeSwitch = component$(() => {
  const smallChecked = useSignal(false);
  const mediumChecked = useSignal(true);
  const largeChecked = useSignal(false);
  
  return (
    <div class="space-y-6">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <Switch 
            checked={smallChecked.value} 
            onChange$={(checked) => smallChecked.value = checked} 
            size="sm"
            aria-label="Small switch"
          />
          <span>Small size</span>
        </div>
        
        <div class="flex items-center gap-4">
          <Switch 
            checked={mediumChecked.value} 
            onChange$={(checked) => mediumChecked.value = checked} 
            size="md"
            aria-label="Medium switch"
          />
          <span>Medium size (default)</span>
        </div>
        
        <div class="flex items-center gap-4">
          <Switch 
            checked={largeChecked.value} 
            onChange$={(checked) => largeChecked.value = checked} 
            size="lg"
            aria-label="Large switch"
          />
          <span>Large size</span>
        </div>
      </div>
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Labeled Switch</h2>
        <p>
          Add labels to your switches for better clarity. Labels can be associated with switches using ARIA attributes
          for improved accessibility.
        </p>
        <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <LabeledSwitch />
        </div>
        <CodeBlock
          code={`
import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export const LabeledSwitch = component$(() => {
  const darkModeEnabled = useSignal(false);
  const notificationsEnabled = useSignal(true);
  
  return (
    <div class="space-y-6">
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <label id="dark-mode-label" class="font-medium">Dark Mode</label>
          <Switch 
            checked={darkModeEnabled.value} 
            onChange$={(checked) => darkModeEnabled.value = checked} 
            aria-labelledby="dark-mode-label"
          />
        </div>
        
        <div class="flex items-center justify-between">
          <div>
            <label id="notifications-label" class="font-medium">Notifications</label>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Receive notifications about updates and activity
            </p>
          </div>
          <Switch 
            checked={notificationsEnabled.value} 
            onChange$={(checked) => notificationsEnabled.value = checked} 
            aria-labelledby="notifications-label"
          />
        </div>
      </div>
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Disabled Switch</h2>
        <p>
          Switches can be disabled when they're not available for interaction.
          Use the <code>disabled</code> prop to indicate that a switch is not currently operable.
        </p>
        <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
          <DisabledSwitch />
        </div>
        <CodeBlock
          code={`
import { component$ } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export const DisabledSwitch = component$(() => {
  return (
    <div class="space-y-6">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <Switch 
            checked={false} 
            disabled
            aria-label="Disabled off switch"
          />
          <span>Disabled (off state)</span>
        </div>
        
        <div class="flex items-center gap-4">
          <Switch 
            checked={true} 
            disabled
            aria-label="Disabled on switch"
          />
          <span>Disabled (on state)</span>
        </div>
      </div>
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