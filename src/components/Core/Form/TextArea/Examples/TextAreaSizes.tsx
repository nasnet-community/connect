import { component$ } from '@builder.io/qwik';
import { TextArea } from '../TextArea';

export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-sm font-semibold mb-2">Small Size</h3>
        <TextArea 
          label="Small TextArea"
          placeholder="This is a small textarea"
          size="sm"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Medium Size (Default)</h3>
        <TextArea 
          label="Medium TextArea"
          placeholder="This is a medium textarea"
          size="md"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Large Size</h3>
        <TextArea 
          label="Large TextArea"
          placeholder="This is a large textarea"
          size="lg"
        />
      </div>
    </div>
  );
}); 