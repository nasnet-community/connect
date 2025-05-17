import { component$, useSignal } from '@builder.io/qwik';
import { Checkbox } from '../index';

export default component$(() => {
  const normalChecked = useSignal(true);
  const disabledChecked = useSignal(true);
  const disabledUnchecked = useSignal(false);
  const errorChecked = useSignal(false);
  const indeterminateChecked = useSignal(true);
  
  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-sm font-semibold mb-2">Normal State</h3>
        <Checkbox 
          checked={normalChecked.value}
          onChange$={(checked) => normalChecked.value = checked}
          label="Normal checkbox"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Disabled States</h3>
        <div class="space-y-2">
          <Checkbox 
            checked={disabledChecked.value}
            onChange$={(checked) => disabledChecked.value = checked}
            disabled
            label="Disabled checked checkbox"
          />
          
          <Checkbox 
            checked={disabledUnchecked.value}
            onChange$={(checked) => disabledUnchecked.value = checked}
            disabled
            label="Disabled unchecked checkbox"
          />
        </div>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Error State</h3>
        <Checkbox 
          checked={errorChecked.value}
          onChange$={(checked) => errorChecked.value = checked}
          label="Checkbox with error"
          error="This field is required"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Indeterminate State</h3>
        <Checkbox 
          checked={indeterminateChecked.value}
          onChange$={(checked) => indeterminateChecked.value = checked}
          label="Indeterminate checkbox"
          indeterminate
        />
        <p class="text-xs text-gray-500 mt-1">
          The indeterminate state is visually distinct and indicates a "partially checked" state.
        </p>
      </div>
    </div>
  );
});
