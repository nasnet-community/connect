import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate, type Example } from "~/components/Docs/templates";
import BasicErrorMessage from "../Examples/BasicErrorMessage";
import ErrorMessageSizes from "../Examples/ErrorMessageSizes";
import ErrorMessageWithIcons from "../Examples/ErrorMessageWithIcons";
import ErrorMessageAnimation from "../Examples/ErrorMessageAnimation";
import ErrorMessageAccessibility from "../Examples/ErrorMessageAccessibility";

/**
 * FormErrorMessage component examples documentation using the standard template
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic Error Message",
      description:
        "Basic usage of error message to display form validation errors.",
      component: <BasicErrorMessage />,
    },
    {
      title: "Error Message Sizes",
      description:
        "The FormErrorMessage component is available in three different sizes: small, medium (default), and large.",
      component: <ErrorMessageSizes />,
    },
    {
      title: "Error Messages with Icons",
      description:
        "Icons can be added to error messages to enhance visual communication and make errors more noticeable.",
      component: <ErrorMessageWithIcons />,
    },
    {
      title: "Animated Error Messages",
      description:
        "Error messages can be animated to draw attention to validation issues that need to be addressed.",
      component: <ErrorMessageAnimation />,
    },
    {
      title: "Accessible Error Messages",
      description:
        "Examples of proper accessibility implementations including ID association with form fields and appropriate ARIA attributes.",
      component: <ErrorMessageAccessibility />,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The FormErrorMessage component provides critical feedback for form
        validation issues. These examples demonstrate the various ways the
        component can be used to communicate validation errors effectively.
      </p>
      <p class="mt-2">
        Error messages should be clear, concise, and actionable, helping users
        understand what went wrong and how to fix it. Use different sizes and
        icons based on the context and importance of the error.
      </p>
    </ExamplesTemplate>
  );
});
