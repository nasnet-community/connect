import { component$, useSignal } from '@builder.io/qwik';
import { CheckboxGroup } from '../CheckboxGroup';

export default component$(() => {
  const selectedFruits = useSignal<string[]>(['apple', 'banana']);
  
  const fruitOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape', disabled: true },
    { value: 'mango', label: 'Mango' },
  ];
  
  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-sm font-semibold mb-2">Vertical Checkbox Group (Default)</h3>
        <CheckboxGroup
          options={fruitOptions}
          selected={selectedFruits.value}
          onToggle$={(value) => {
            if (selectedFruits.value.includes(value)) {
              selectedFruits.value = selectedFruits.value.filter(item => item !== value);
            } else {
              selectedFruits.value = [...selectedFruits.value, value];
            }
          }}
          label="Select your favorite fruits"
          helperText="You can select multiple options"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Selected Values</h3>
        <div class="p-2 bg-gray-100 dark:bg-gray-800 rounded">
          {selectedFruits.value.length ? 
            selectedFruits.value.join(', ') : 
            'No fruits selected'}
        </div>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Horizontal Checkbox Group</h3>
        <CheckboxGroup
          options={fruitOptions.slice(0, 3)} 
          selected={selectedFruits.value}
          onToggle$={(value) => {
            if (selectedFruits.value.includes(value)) {
              selectedFruits.value = selectedFruits.value.filter(item => item !== value);
            } else {
              selectedFruits.value = [...selectedFruits.value, value];
            }
          }}
          direction="horizontal"
          label="Select options"
        />
      </div>
    </div>
  );
});
