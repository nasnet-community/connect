import { component$, Slot } from '@builder.io/qwik';
import { Card } from '../../Core/Card/Card';
import CodeExample from '../CodeExample';

export interface UsageGuideline {
  title: string;
  description: string;
  code?: string;
  component?: any; // The actual component to render
  type: 'do' | 'dont';
}

export interface BestPractice {
  title: string;
  description: string;
}

export interface AccessibilityTip {
  title: string;
  description: string;
}

export interface UsageTemplateProps {
  guidelines?: UsageGuideline[];
  bestPractices?: BestPractice[];
  accessibilityTips?: AccessibilityTip[];
  performanceTips?: string[];
}

export const UsageTemplate = component$<UsageTemplateProps>(({ 
  guidelines = [],
  bestPractices = [],
  accessibilityTips = [],
  performanceTips = []
}) => {
  const dos = guidelines.filter(g => g.type === 'do');
  const donts = guidelines.filter(g => g.type === 'dont');
  
  return (
    <div class="space-y-5 sm:space-y-6 lg:space-y-8">
      {/* Introduction to usage */}
      <div class="mb-4 sm:mb-5 lg:mb-6">
        <div class="text-sm sm:text-base">
          <Slot />
        </div>
      </div>
      
      {/* Do's and Don'ts */}
      {(dos.length > 0 || donts.length > 0) && (
        <Card variant="elevated" class="overflow-hidden">
          <div class="p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">Guidelines</h3>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-gray-700">
            {/* Do's */}
            <div class="p-3 sm:p-4 lg:p-6">
              <h4 class="text-sm sm:text-base lg:text-lg font-medium text-green-600 dark:text-green-400 mb-3 sm:mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Do
              </h4>
              
              <div class="space-y-4 sm:space-y-5 lg:space-y-6">
                {dos.map((guideline, index) => (
                  <div key={index} class="border border-green-200 dark:border-green-900 rounded-md overflow-hidden">
                    <div class="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-900">
                      <h5 class="font-medium text-sm sm:text-base text-gray-900 dark:text-white">{guideline.title}</h5>
                      <p class="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">{guideline.description}</p>
                    </div>
                    
                    {guideline.component && (
                      <div class="p-3 sm:p-4 bg-white dark:bg-gray-800">
                        {guideline.component}
                      </div>
                    )}
                    
                    {guideline.code && (
                      <CodeExample code={guideline.code} language="tsx" showLineNumbers={false} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Don'ts */}
            <div class="p-3 sm:p-4 lg:p-6">
              <h4 class="text-sm sm:text-base lg:text-lg font-medium text-red-600 dark:text-red-400 mb-3 sm:mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Don't
              </h4>
              
              <div class="space-y-4 sm:space-y-5 lg:space-y-6">
                {donts.map((guideline, index) => (
                  <div key={index} class="border border-red-200 dark:border-red-900 rounded-md overflow-hidden">
                    <div class="p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-900">
                      <h5 class="font-medium text-sm sm:text-base text-gray-900 dark:text-white">{guideline.title}</h5>
                      <p class="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">{guideline.description}</p>
                    </div>
                    
                    {guideline.component && (
                      <div class="p-3 sm:p-4 bg-white dark:bg-gray-800">
                        {guideline.component}
                      </div>
                    )}
                    
                    {guideline.code && (
                      <CodeExample code={guideline.code} language="tsx" showLineNumbers={false} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
      
      {/* Best Practices */}
      {bestPractices.length > 0 && (
        <Card variant="elevated" class="overflow-hidden">
          <div class="p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">Best Practices</h3>
          </div>
          
          <div class="p-3 sm:p-4 lg:p-6">
            <ul class="space-y-3 sm:space-y-4">
              {bestPractices.map((practice, index) => (
                <li key={index} class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 rounded-md">
                  <h4 class="font-medium text-sm sm:text-base text-gray-900 dark:text-white mb-1">{practice.title}</h4>
                  <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{practice.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}
      
      {/* Accessibility */}
      {accessibilityTips.length > 0 && (
        <Card variant="elevated" class="overflow-hidden">
          <div class="p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">Accessibility Considerations</h3>
          </div>
          
          <div class="p-3 sm:p-4 lg:p-6">
            <ul class="space-y-3 sm:space-y-4">
              {accessibilityTips.map((tip, index) => (
                <li key={index} class="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-md border border-blue-100 dark:border-blue-900">
                  <h4 class="font-medium text-sm sm:text-base text-gray-900 dark:text-white mb-1">{tip.title}</h4>
                  <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{tip.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}
      
      {/* Performance Considerations */}
      {performanceTips.length > 0 && (
        <Card variant="elevated" class="overflow-hidden">
          <div class="p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">Performance Considerations</h3>
          </div>
          
          <div class="p-3 sm:p-4 lg:p-6">
            <ul class="list-disc space-y-1 sm:space-y-2 pl-4 sm:pl-5 text-sm sm:text-base">
              {performanceTips.map((tip, index) => (
                <li key={index} class="text-gray-700 dark:text-gray-300">{tip}</li>
              ))}
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
});

export default UsageTemplate; 