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