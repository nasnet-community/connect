import { component$ } from '@builder.io/qwik';
import ExamplesTemplate from '../../../../Docs/templates/ExamplesTemplate';
import { CodeExample } from '../../../../Docs/CodeExample';

import BasicExample from '../Examples/Basic';
import VariantsExample from '../Examples/Variants';
import ErrorStatesExample from '../Examples/ErrorStates';
import IntegrationExample from '../Examples/Integration';

export default component$(() => {
  return (
    <ExamplesTemplate>
      <div class="space-y-8">
        <CodeExample
          title="Basic Usage"
          description="ServerFormField provides the layout structure for form fields with labels and input elements. It supports text inputs, checkboxes, selects, and other input types."
          code={BasicExample}
        />
        
        <CodeExample
          title="Layout Variants"
          description="ServerFormField supports both standard vertical layout and inline layout for checkboxes and radio buttons. You can also apply custom classes for additional styling."
          code={VariantsExample}
        />

        <CodeExample
          title="Error States"
          description="ServerFormField can display error messages from server-side validation with appropriate styling. Error messages appear below the input element."
          code={ErrorStatesExample}
        />

        <CodeExample
          title="Integration with Other Components"
          description="ServerFormField works seamlessly with other server components like Select and ServerButton to create complete forms."
          code={IntegrationExample}
        />
      </div>
    </ExamplesTemplate>
  );
});
