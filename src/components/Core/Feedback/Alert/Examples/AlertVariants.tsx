import { component$ } from '@builder.io/qwik';
import { Alert } from '~/components/Core/Feedback/Alert';

export const AlertVariants = component$(() => {
  return (
    <div class="flex flex-col gap-4">
      <div>
        <h3 class="text-sm font-medium mb-2">Solid Variant (Default)</h3>
        <Alert 
          variant="solid"
          status="info" 
          title="Solid Variant" 
          message="This is a solid variant alert with a colored background."
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Outline Variant</h3>
        <Alert 
          variant="outline"
          status="info" 
          title="Outline Variant" 
          message="This is an outline variant alert with a border and transparent background."
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Subtle Variant</h3>
        <Alert 
          subtle={true}
          status="info" 
          title="Subtle Variant" 
          message="This is a subtle variant alert with a lighter background color."
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Without Icon</h3>
        <Alert 
          status="success" 
          title="No Icon Alert" 
          message="This alert doesn't display an icon."
          icon={false}
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Custom Icon</h3>
        <Alert 
          status="warning" 
          title="Custom Icon Alert" 
          message="This alert uses a custom icon."
          icon={<span class="text-2xl">🚀</span>}
        />
      </div>
    </div>
  );
});
