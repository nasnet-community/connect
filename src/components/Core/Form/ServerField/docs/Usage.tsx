import { component$ } from '@builder.io/qwik';
import UsageTemplate from '../../../../Docs/templates/UsageTemplate';

export default component$(() => {
  const doList = [
    'Use ServerFormField when creating server-rendered forms without client-side JavaScript',
    'Provide clear, concise labels to improve form usability',
    'Use the required prop to indicate mandatory fields',
    'Display validation error messages with the errorMessage prop',
    'Use the inline layout for checkboxes and radio buttons',
    'Group related fields together for better organization',
    'Ensure error messages are descriptive and helpful',
    'Use ServerButton for form submissions to maintain consistency'
  ];

  const dontList = [
    'Don\'t use ServerFormField when you need client-side validation',
    'Don\'t omit labels or use placeholder text as the only label',
    'Don\'t use overly long or complex labels',
    'Don\'t use inline layout for longer input fields like text areas',
    'Don\'t rely solely on color to indicate error states',
    'Don\'t mix server components with client-interactive components in the same form'
  ];

  const accessibilityGuidelines = [
    'Ensure all form fields have proper labels for screen readers',
    'Use required attribute to indicate mandatory fields both visually and semantically',
    'Provide clear error messages that explain how to resolve the issue',
    'Maintain sufficient color contrast between text and background',
    'Group related form controls with appropriate fieldset and legend elements when needed',
    'Ensure focus states are visible for keyboard navigation'
  ];

  const bestPractices = [
    {
      title: 'Labeling',
      description: 'Use clear, concise labels that describe the expected input. Position labels consistently above inputs (or inline for checkboxes/radio buttons).'
    },
    {
      title: 'Error Handling',
      description: 'Display specific, actionable error messages below the input field. Use the errorMessage prop to show validation feedback from server-side validation.'
    },
    {
      title: 'Field Organization',
      description: 'Group related fields together and organize fields in a logical order. Consider the tab order for keyboard users.'
    },
    {
      title: 'Required Fields',
      description: 'Clearly indicate required fields with the required prop, which adds an asterisk (*) to the label.'
    },
    {
      title: 'Integration',
      description: 'Use ServerFormField in conjunction with other server components like Select, ServerButton, and form elements to create cohesive server-rendered forms.'
    },
    {
      title: 'Progressive Enhancement',
      description: 'Design forms to work without JavaScript first, then enhance with client-side features where available and appropriate.'
    }
  ];

  return (
    <UsageTemplate
      doList={doList}
      dontList={dontList}
      accessibilityGuidelines={accessibilityGuidelines}
      bestPractices={bestPractices}
    >
      <div class="mb-6">
        <h2 class="text-lg font-bold mb-2 text-gray-900 dark:text-white">Using ServerField Components</h2>
        <p class="text-gray-700 dark:text-gray-300">
          ServerField components are designed for building forms in server-rendered applications where minimal
          client-side JavaScript is preferred or required. These components work well in environments
          where progressive enhancement is the primary strategy.
        </p>
      </div>

      <div class="mb-6">
        <h3 class="text-md font-semibold mb-2 text-gray-900 dark:text-white">When to use ServerField</h3>
        <p class="text-gray-700 dark:text-gray-300">
          Consider using ServerField components when:
        </p>
        <ul class="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
          <li>Building server-rendered forms with traditional form submission</li>
          <li>Creating forms that need to work without JavaScript</li>
          <li>Implementing forms with server-side validation</li>
          <li>Developing for environments with limited JavaScript support</li>
          <li>Focusing on performance and minimal client-side code</li>
        </ul>
      </div>

      <div class="mb-6">
        <h3 class="text-md font-semibold mb-2 text-gray-900 dark:text-white">Comparison with Standard Field Component</h3>
        <div class="overflow-x-auto mt-2">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Feature</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ServerFormField</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Field (Client)</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              <tr>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Client-side validation</td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">❌ No</td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">✅ Yes</td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Interactive feedback</td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">❌ No</td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">✅ Yes</td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Works without JavaScript</td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">✅ Yes</td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">❌ Limited</td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Server-side validation</td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">✅ Yes</td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">✅ Yes</td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Client-side bundle size</td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">✅ Minimal</td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">❌ Larger</td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Rich interactive features</td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">❌ No</td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">✅ Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </UsageTemplate>
  );
});
