import { component$, Slot } from '@builder.io/qwik';
import { Card } from '../../Core/Card/Card';

export interface Example {
  title: string;
  description?: string;
  component: any; // The actual component to render
}

export interface ExamplesTemplateProps {
  examples?: Example[];
}

export const ExamplesTemplate = component$<ExamplesTemplateProps>(({ 
  examples = []
}) => {
  return (
    <div class="space-y-5 sm:space-y-6 lg:space-y-8">
      {/* Introduction to examples */}
      <div class="mb-4 sm:mb-5 lg:mb-6 text-sm sm:text-base">
        <Slot />
      </div>
      
      {/* Examples */}
      {examples.map((example, index) => (
        <Card key={index} variant="elevated" class="overflow-hidden">
          <div class="p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">{example.title}</h3>
            {example.description && (
              <p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{example.description}</p>
            )}
          </div>
          
          {/* Component Example */}
          <div class="p-3 sm:p-4 lg:p-6 bg-white dark:bg-gray-800">
            <div class="p-3 sm:p-4 lg:p-6 bg-gray-50 dark:bg-gray-900 rounded-md flex items-center justify-center">
              {example.component}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
});

export default ExamplesTemplate; 