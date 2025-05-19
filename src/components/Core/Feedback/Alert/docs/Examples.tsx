import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate, type Example } from '~/components/Docs/templates';
import { BasicAlert } from '../Examples/BasicAlert';
import { AlertVariants } from '../Examples/AlertVariants';
import { AlertSizesAndDismissible } from '../Examples/AlertSizesAndDismissible';

/**
 * Alert component examples documentation using the standard template
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic Alert",
      description: "Basic alert examples with different status types: info, success, warning, and error.",
      component: <BasicAlert />
    },
    {
      title: "Alert Variants",
      description: "Different visual variants including solid, outline, and subtle styles, plus icon customization options.",
      component: <AlertVariants />
    },
    {
      title: "Sizes and Interactive Features",
      description: "Alert size options, dismissible alerts, auto-dismissing alerts, loading state, and custom content.",
      component: <AlertSizesAndDismissible />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The Alert component offers multiple configurations to communicate different types of messages
        and feedback to users. Each status type (info, success, warning, error) has its own semantic color
        scheme and default icon that helps users quickly understand the nature of the message.
      </p>
      <p class="mt-2">
        Alerts can be styled in various ways - from prominent solid backgrounds for high-visibility
        messages to subtle or outlined variants for less intrusive notifications. You can also
        create auto-dismissing alerts for temporary feedback or include loading states for in-progress operations.
      </p>
    </ExamplesTemplate>
  );
}); 