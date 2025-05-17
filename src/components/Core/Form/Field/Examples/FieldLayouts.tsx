import { component$, useSignal } from '@builder.io/qwik';
import { Field } from '../index';

export default component$(() => {
  const standardValue = useSignal('');
  const inlineValue = useSignal('');
  
  return (
    <div class="space-y-8">
      <div>
        <h3 class="text-sm font-semibold mb-2">Standard Layout (Default)</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Label appears above the input field
        </p>
        <Field
          label="Standard layout"
          type="text"
          value={standardValue.value}
          onValueChange$={(value) => standardValue.value = value as string}
          placeholder="Enter text"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Inline Layout</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Label appears beside the input field
        </p>
        <Field
          label="Inline layout"
          type="text"
          value={inlineValue.value}
          onValueChange$={(value) => inlineValue.value = value as string}
          placeholder="Enter text"
          inline
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Form Example with Both Layouts</h3>
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          <form class="space-y-4" preventdefault:submit onSubmit$={() => alert('Form submitted!')}>
            <Field
              label="Name"
              type="text"
              placeholder="Enter your name"
              required
            />
            
            <Field
              label="Email"
              type="email"
              placeholder="Enter your email"
              required
            />
            
            <div class="flex items-center justify-between">
              <Field
                label="Remember me"
                type="checkbox"
                value={false}
              />
              
              <button 
                type="submit" 
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});
