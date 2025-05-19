import { component$, Slot } from '@builder.io/qwik';
import { Card } from '../../Core/Card/Card';

export interface OverviewTemplateProps {
  title?: string;
  keyFeatures?: string[];
  whenToUse?: string[];
  whenNotToUse?: string[];
}

export const OverviewTemplate = component$<OverviewTemplateProps>(({ 
  title = "Overview",
  keyFeatures = [],
  whenToUse = [],
  whenNotToUse = []
}) => {
  return (
    <div class="space-y-4 sm:space-y-5 lg:space-y-6">
      {/* Main description */}
      <Card variant="elevated" class="overflow-hidden p-3 sm:p-4 lg:p-6 border border-gray-200 dark:border-gray-700">
        <div class="prose dark:prose-invert max-w-none prose-sm sm:prose-base">
          <h2 class="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4 text-gray-900 dark:text-white">{title}</h2>
          {/* The main description content will be inserted here */}
          <div class="text-sm sm:text-base">
            <Slot />
          </div>
          
          {/* Key Features */}
          {keyFeatures.length > 0 && (
            <div class="mt-4 sm:mt-5 lg:mt-6">
              <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Key Features</h3>
              <ul class="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2">
                {keyFeatures.map((feature, index) => (
                  <li key={index} class="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
      
      {/* When to use / When not to use */}
      {(whenToUse.length > 0 || whenNotToUse.length > 0) && (
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          {whenToUse.length > 0 && (
            <Card variant="elevated" class="p-3 sm:p-4 lg:p-6">
              <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">When to Use</h3>
              <ul class="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2">
                {whenToUse.map((item, index) => (
                  <li key={index} class="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{item}</li>
                ))}
              </ul>
            </Card>
          )}
          
          {whenNotToUse.length > 0 && (
            <Card variant="elevated" class="p-3 sm:p-4 lg:p-6">
              <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">When Not to Use</h3>
              <ul class="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2">
                {whenNotToUse.map((item, index) => (
                  <li key={index} class="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{item}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}
    </div>
  );
});

export default OverviewTemplate; 