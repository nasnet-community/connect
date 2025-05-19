import { component$ } from '@builder.io/qwik';
import { UsageTemplate, type UsageGuideline, type BestPractice, type AccessibilityTip } from '~/components/Docs/templates';

/**
 * TextArea component usage documentation using the standard template
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Use clear and descriptive labels",
      description: "Always provide a clear label that describes what the user should enter in the text area.",
      code: `<TextArea 
  label="Product Description"
  placeholder="Describe your product in detail..."
/>`,
      type: "do"
    },
    {
      title: "Use auto-resize for variable content",
      description: "Enable auto-resize when users might enter content of varying lengths to improve user experience.",
      code: `<TextArea 
  label="Additional Comments"
  autoResize
  minRows={3}
  maxRows={8}
/>`,
      type: "do"
    },
    {
      title: "Show character count for limited fields",
      description: "When there's a character limit, display a counter to help users track their input length.",
      code: `<TextArea 
  label="Review (max 200 characters)"
  maxLength={200}
  showCharCount
/>`,
      type: "do"
    },
    {
      title: "Provide appropriate validation feedback",
      description: "Use appropriate states to provide feedback on validation errors or success.",
      code: `<TextArea 
  label="Bio"
  errorMessage={formErrors.bio}
  state={formErrors.bio ? 'error' : undefined}
/>`,
      type: "do"
    },
    {
      title: "Don't use for single-line input",
      description: "Avoid using TextArea for single-line inputs. Use the Field component instead.",
      code: `// Avoid this approach
<TextArea 
  label="First Name"
  // Single-line input should use Field component
/>`,
      type: "dont"
    },
    {
      title: "Don't set very large maxRows without pagination",
      description: "Setting very large maxRows can lead to long pages. Consider pagination or separate sections for very long content.",
      code: `// Avoid this approach
<TextArea
  label="Long Document"
  autoResize
  maxRows={50}  // Too many rows
/>`,
      type: "dont"
    }
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Provide clear instructions in the label",
      description: "Use the label to communicate what information is needed and any specific requirements."
    },
    {
      title: "Use placeholder text for examples",
      description: "Placeholders can provide examples of expected content, but shouldn't replace labels or instructions."
    },
    {
      title: "Set appropriate initial sizing",
      description: "Choose minRows based on the expected minimum amount of content to reduce layout shifts."
    },
    {
      title: "Consider resize constraints",
      description: "Choose appropriate resize behavior based on your layout. Vertical resizing is usually most appropriate."
    },
    {
      title: "Use helper text for additional guidance",
      description: "Provide additional instructions or context using the helperText prop rather than long placeholders."
    }
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Always use labels",
      description: "Every TextArea should have a visible label that is properly associated with the input."
    },
    {
      title: "Provide descriptive error messages",
      description: "Error messages should clearly explain what went wrong and how to fix it."
    },
    {
      title: "Ensure sufficient color contrast",
      description: "Text, borders, and backgrounds should have sufficient color contrast for all users."
    },
    {
      title: "Support keyboard interaction",
      description: "Ensure the component is fully accessible via keyboard, including any clear buttons or actions."
    },
    {
      title: "Use aria-describedby for help text",
      description: "Helper text and error messages should be programmatically associated with the textarea using aria-describedby."
    }
  ];

  const performanceTips = [
    "Avoid excessive auto-resizing if performance is a concern, especially for fields with rapidly changing content.",
    "Consider debouncing validation for TextArea fields to prevent excessive validation during typing.",
    "Be mindful of initial sizes to prevent layout shifts that can impact Core Web Vitals.",
    "Use maxRows to prevent performance issues with extremely large inputs.",
    "Avoid unnecessarily complex validation logic that runs on every input change."
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The TextArea component is designed for collecting longer text inputs in forms.
        Follow these guidelines to create effective, accessible multi-line inputs that
        provide a great user experience.
      </p>
      <p class="mt-2">
        When implemented properly, textareas can make entering longer text content more
        comfortable and intuitive for users, while providing appropriate feedback and
        validation.
      </p>
    </UsageTemplate>
  );
}); 