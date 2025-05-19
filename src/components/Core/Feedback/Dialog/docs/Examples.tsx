import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate, type Example } from '~/components/Docs/templates';
import { BasicDialog } from '../Examples/BasicDialog';
import { DialogSizes } from '../Examples/DialogSizes';
import { DialogAdvancedFeatures } from '../Examples/DialogAdvancedFeatures';

/**
 * Dialog component examples documentation using the standard template
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic Dialog",
      description: "A simple dialog with a title, body content, and action buttons in the footer.",
      component: <BasicDialog />
    },
    {
      title: "Dialog Sizes",
      description: "Dialogs come in different sizes to accommodate various types of content, from small confirmations to large forms.",
      component: <DialogSizes />
    },
    {
      title: "Advanced Features",
      description: "Dialogs support scrollable content for longer forms and advanced interaction patterns.",
      component: <DialogAdvancedFeatures />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        Dialogs are powerful components for capturing user attention and gathering focused input.
        They create a layer above the current page, temporarily interrupting the workflow to
        present important information or request user action.
      </p>
      <p class="mt-2">
        The examples below demonstrate the versatility of the Dialog component, from simple
        message boxes to complex interactive forms. You'll see how dialogs can be configured
        with different sizes, scrollable content, and customized behaviors to suit various
        user experience requirements.
      </p>
    </ExamplesTemplate>
  );
}); 