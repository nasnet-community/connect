import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate, type Example } from "~/components/Docs/templates";
import BasicTextArea from "../Examples/BasicTextArea";
import TextAreaSizes from "../Examples/TextAreaSizes";
import TextAreaStates from "../Examples/TextAreaStates";
import TextAreaAutoResize from "../Examples/TextAreaAutoResize";
import TextAreaCharCount from "../Examples/TextAreaCharCount";
import TextAreaCustomResize from "../Examples/TextAreaCustomResize";

/**
 * TextArea component examples documentation using the standard template
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic TextArea",
      description:
        "Basic implementation of a textarea with a label. This example demonstrates the standard usage of the TextArea component.",
      component: <BasicTextArea />,
    },
    {
      title: "TextArea Sizes",
      description:
        "Size variants of the TextArea component. This example demonstrates the different size options available for consistent sizing with other form components.",
      component: <TextAreaSizes />,
    },
    {
      title: "TextArea States",
      description:
        "Different states of the TextArea component including error, success, warning, and disabled states. This shows how the component visually communicates different states to users.",
      component: <TextAreaStates />,
    },
    {
      title: "Auto-resizing TextArea",
      description:
        "TextArea that automatically adjusts its height based on content. This example demonstrates how to create textareas that grow with user input for a better user experience.",
      component: <TextAreaAutoResize />,
    },
    {
      title: "Character Count",
      description:
        "TextArea with character count and maximum length. This example shows how to implement character limits with visual feedback to guide users.",
      component: <TextAreaCharCount />,
    },
    {
      title: "Custom Resize Behavior",
      description:
        "Controlling how users can resize the textarea. This example demonstrates different resize options including vertical, horizontal, both, or none.",
      component: <TextAreaCustomResize />,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The TextArea component offers various customization options to handle
        different use cases. These examples demonstrate key features like
        auto-resizing, character counting, and different states to help you
        implement textareas that meet your specific requirements.
      </p>
    </ExamplesTemplate>
  );
});
