import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate, type Example } from "~/components/Docs/templates";
import BasicPasswordField from "../Examples/BasicPasswordField";
import PasswordFieldSizes from "../Examples/PasswordFieldSizes";
import PasswordFieldStates from "../Examples/PasswordFieldStates";
import PasswordFieldFeatures from "../Examples/PasswordFieldFeatures";

/**
 * PasswordField component examples documentation using the standard template
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic PasswordField",
      description:
        "A standard password field with a label and helper text. This example demonstrates the default implementation of the PasswordField component.",
      component: <BasicPasswordField />,
    },
    {
      title: "PasswordField Sizes",
      description:
        "Different size variants of the PasswordField component including small, medium, and large to accommodate different UI requirements.",
      component: <PasswordFieldSizes />,
    },
    {
      title: "PasswordField States",
      description:
        "Various states of the PasswordField component including default, required, error, and disabled states.",
      component: <PasswordFieldStates />,
    },
    {
      title: "PasswordField Features",
      description:
        "Advanced features of the PasswordField including password visibility toggle, strength indicator, and initially visible passwords.",
      component: <PasswordFieldFeatures />,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The PasswordField component provides a secure way to input password data
        with additional usability features. These examples demonstrate the
        component's flexibility from basic implementation to more advanced usage
        patterns with strength indicators and visibility toggles.
      </p>
    </ExamplesTemplate>
  );
});
