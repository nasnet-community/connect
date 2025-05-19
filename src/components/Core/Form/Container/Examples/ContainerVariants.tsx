import { component$ } from '@builder.io/qwik';
import { Container } from '../';

/**
 * ContainerVariants demonstrates the different visual variants of the Container component.
 */
export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-sm font-medium mb-2">With Border (Default)</h3>
        <Container 
          title="Bordered Container" 
          description="This container has a border."
          bordered={true}
        >
          <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <p class="text-sm">Content with border styling for clear separation from surrounding elements.</p>
          </div>
        </Container>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Without Border</h3>
        <Container 
          title="Borderless Container" 
          description="This container has no border."
          bordered={false}
        >
          <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <p class="text-sm">Content without border styling, useful for nested containers or when borders would create visual clutter.</p>
          </div>
        </Container>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Custom Class</h3>
        <Container 
          title="Custom Styled Container" 
          description="This container has custom styling."
          class="bg-blue-50 dark:bg-blue-900/20"
        >
          <div class="p-3 bg-white dark:bg-gray-800 rounded">
            <p class="text-sm">Content in a container with custom background styling applied through the class prop.</p>
          </div>
        </Container>
      </div>
    </div>
  );
}); 