import { component$ } from '@builder.io/qwik';
import { UsageTemplate, type UsageGuideline, type BestPractice, type AccessibilityTip } from '~/components/Docs/templates';

/**
 * Select component usage documentation using the standard template
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Use descriptive option labels",
      description: "Make sure option labels clearly describe what the user is selecting.",
      code: `<Select 
  options={[
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "mx", label: "Mexico" }
  ]}
  placeholder="Select a country"
  onChange$={(value) => setCountry(value)}
/>`,
      type: "do"
    },
    {
      title: "Group related options",
      description: "Use the group property to organize options into meaningful categories.",
      code: `<Select 
  options={[
    { value: "apple", label: "Apple", group: "Fruits" },
    { value: "banana", label: "Banana", group: "Fruits" },
    { value: "carrot", label: "Carrot", group: "Vegetables" },
    { value: "broccoli", label: "Broccoli", group: "Vegetables" }
  ]}
  placeholder="Select a food item"
  onChange$={(value) => setFood(value)}
/>`,
      type: "do"
    },
    {
      title: "Enable search for large option sets",
      description: "When you have many options, enable searching to help users find what they need.",
      code: `<Select 
  options={countries} // A large array of country options
  placeholder="Select a country"
  searchable={true}
  onChange$={(value) => setCountry(value)}
/>`,
      type: "do"
    },
    {
      title: "Provide clear validation states",
      description: "Use validation and error messages to communicate selection requirements.",
      code: `<Select 
  options={countries}
  placeholder="Select a country"
  required={true}
  error={!country ? "Please select a country" : undefined}
  onChange$={(value) => setCountry(value)}
/>`,
      type: "do"
    },
    {
      title: "Don't use when only a few options exist",
      description: "For 2-5 options, consider using radio buttons or checkboxes instead.",
      code: `// Avoid this approach for few options
<Select 
  options={[
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
  ]}
  placeholder="Select an option"
  onChange$={(value) => setAnswer(value)}
/>

// Better approach
<div>
  <RadioGroup
    options={[
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]}
    value={answer}
    onChange$={(value) => setAnswer(value)}
  />
</div>`,
      type: "dont"
    },
    {
      title: "Don't use overly long option labels",
      description: "Keep option labels concise and descriptive to avoid overwhelming the dropdown.",
      code: `// Avoid this approach
<Select 
  options={[
    { value: "option1", label: "This is a very long option label that contains excessive detail and will make the dropdown too wide or truncate awkwardly" },
    // More options...
  ]}
  placeholder="Select an option"
  onChange$={(value) => setOption(value)}
/>`,
      type: "dont"
    }
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Set a sensible default value when appropriate",
      description: "Pre-select the most common option to save users time, but only when reasonable defaults exist."
    },
    {
      title: "Order options logically",
      description: "Arrange options in a logical order (alphabetical, numerical, most to least common, etc.)."
    },
    {
      title: "Use appropriate widths",
      description: "Make the select width appropriate for the expected content. Consider using the fullWidth prop for responsive designs."
    },
    {
      title: "Limit the number of options shown at once",
      description: "For very long lists, use virtualization or pagination to maintain performance."
    },
    {
      title: "Consider the mobile experience",
      description: "Ensure touch targets are large enough and the dropdown is usable on small screens."
    }
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Ensure keyboard navigability",
      description: "The Select component should be navigable via keyboard (Tab to focus, arrow keys to navigate options, Enter to select)."
    },
    {
      title: "Use proper labels",
      description: "Always provide a visible label or appropriate aria-label for the select."
    },
    {
      title: "Associate helper text and errors",
      description: "Use aria-describedby to link help text and error messages to the select."
    },
    {
      title: "Indicate required fields",
      description: "Use the required prop and aria-required attribute to indicate when selection is mandatory."
    },
    {
      title: "Communicate validation errors",
      description: "Ensure error messages are programmatically linked to the select and clearly visible."
    }
  ];

  const performanceTips = [
    "For very large option lists (100+ items), enable search functionality",
    "Consider lazy loading or pagination for extremely large datasets",
    "Memoize option arrays if they're computed or transformed",
    "Avoid frequent changes to the options array that would cause re-renders",
    "Use the onChange$ handler efficiently, avoiding expensive operations that could cause lag"
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The Select component provides a dropdown interface for selecting one or more options from a list.
        Use it when you need to offer users a choice from a predefined set of options, especially when 
        space is limited or the number of options is large.
      </p>
      <p class="mt-2">
        Select is highly versatile and can be configured for various use cases including searchable dropdowns,
        multi-select interfaces, and categorized option groups. When implementing Select, focus on
        providing clear labels, logical ordering, and appropriate validation to ensure a smooth user experience.
      </p>
    </UsageTemplate>
  );
}); 