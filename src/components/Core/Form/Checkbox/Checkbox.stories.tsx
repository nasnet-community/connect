import { $, component$ } from "@builder.io/qwik";
import { useSignal } from "@builder.io/qwik";
import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { Checkbox } from "./Checkbox";
import { CheckboxGroup } from "./CheckboxGroup";
import type { CheckboxProps } from "./Checkbox.types";

const meta: Meta<typeof Checkbox> = {
  title: "Core/Form/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    indeterminate: { control: "boolean" },
    inline: { control: "boolean" },
    label: { control: "text" },
    error: { control: "text" },
    helperText: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<CheckboxProps>;

/**
 * A wrapper component for checkbox with internal state
 */
const CheckboxWithState = component$<{
  label?: string;
  initialChecked?: boolean;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  required?: boolean;
  indeterminate?: boolean;
  error?: string;
  helperText?: string;
  inline?: boolean;
}>(({ 
  label = "Checkbox label",
  initialChecked = false,
  size,
  disabled,
  required,
  indeterminate,
  error,
  helperText,
  inline,
}) => {
  const checked = useSignal(initialChecked);
  
  return (
    <Checkbox 
      checked={checked.value}
      onChange$={$((value) => {
        checked.value = value;
      })}
      label={label}
      size={size}
      disabled={disabled}
      required={required}
      indeterminate={indeterminate}
      error={error}
      helperText={helperText}
      inline={inline}
    />
  );
});

/**
 * Default Checkbox story
 */
export const Default: Story = {
  render: (args) => (
    <CheckboxWithState 
      label={args.label}
      initialChecked={args.checked}
      size={args.size}
      disabled={args.disabled}
      required={args.required}
      indeterminate={args.indeterminate}
      error={args.error}
      helperText={args.helperText}
      inline={args.inline}
    />
  ),
  args: {
    label: "Accept terms and conditions",
    checked: false,
    size: "md",
    disabled: false,
    required: false,
    indeterminate: false,
    error: "",
    helperText: "",
    inline: false,
  },
};

/**
 * Different states of checkbox
 */
export const States: Story = {
  render: () => (
    <div class="space-y-4">
      <CheckboxWithState 
        label="Unchecked"
        initialChecked={false}
      />
      <CheckboxWithState 
        label="Checked"
        initialChecked={true}
      />
      <CheckboxWithState 
        label="Indeterminate"
        indeterminate={true}
      />
      <CheckboxWithState 
        label="Disabled"
        disabled={true}
      />
      <CheckboxWithState 
        label="Disabled checked"
        initialChecked={true}
        disabled={true}
      />
      <CheckboxWithState 
        label="Required"
        required={true}
      />
      <CheckboxWithState 
        label="With error message"
        error="This field is required"
      />
      <CheckboxWithState 
        label="With helper text"
        helperText="We'll use this for your account preferences"
      />
    </div>
  ),
};

/**
 * Size variants
 */
export const Sizes: Story = {
  render: () => (
    <div class="space-y-6">
      <div>
        <h3 class="text-sm font-medium mb-2">Small</h3>
        <CheckboxWithState 
          label="Small checkbox"
          size="sm"
        />
      </div>
      <div>
        <h3 class="text-sm font-medium mb-2">Medium (Default)</h3>
        <CheckboxWithState 
          label="Medium checkbox"
          size="md"
        />
      </div>
      <div>
        <h3 class="text-sm font-medium mb-2">Large</h3>
        <CheckboxWithState 
          label="Large checkbox"
          size="lg"
        />
      </div>
    </div>
  ),
};

/**
 * Inline checkbox (without label container)
 */
export const Inline: Story = {
  render: () => (
    <div class="space-y-4">
      <div class="flex items-center gap-2">
        <Checkbox 
          checked={true}
          onChange$={$(() => {})}
          inline={true}
          aria-label="Inline checkbox"
        />
        <span class="text-sm">Custom label next to inline checkbox</span>
      </div>
      <div class="flex items-center gap-4">
        <Checkbox 
          checked={false}
          onChange$={$(() => {})}
          inline={true}
          size="sm"
          aria-label="Small inline checkbox"
        />
        <Checkbox 
          checked={false}
          onChange$={$(() => {})}
          inline={true}
          size="md"
          aria-label="Medium inline checkbox"
        />
        <Checkbox 
          checked={false}
          onChange$={$(() => {})}
          inline={true}
          size="lg"
          aria-label="Large inline checkbox"
        />
      </div>
    </div>
  ),
};

/**
 * Checkbox group story with reactive state
 */
const CheckboxGroupStory = component$(() => {
  const selectedFruits = useSignal<string[]>(["apple", "banana"]);
  const selectedColors = useSignal<string[]>(["blue"]);
  
  return (
    <div class="space-y-8">
      <div>
        <h3 class="text-sm font-medium mb-1">Vertical Checkbox Group (Default)</h3>
        <CheckboxGroup 
          options={[
            { value: "apple", label: "Apple" },
            { value: "banana", label: "Banana" },
            { value: "orange", label: "Orange" },
            { value: "grape", label: "Grape", disabled: true }
          ]}
          selected={selectedFruits.value}
          onToggle$={$((value) => {
            if (selectedFruits.value.includes(value)) {
              selectedFruits.value = selectedFruits.value.filter(v => v !== value);
            } else {
              selectedFruits.value = [...selectedFruits.value, value];
            }
          })}
          label="Choose your favorite fruits"
          name="fruits"
        />
        <div class="mt-2 p-2 bg-surface-secondary dark:bg-surface-dark-secondary rounded text-sm">
          Selected: {selectedFruits.value.join(", ") || "none"}
        </div>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-1">Horizontal Checkbox Group</h3>
        <CheckboxGroup 
          options={[
            { value: "red", label: "Red" },
            { value: "blue", label: "Blue" },
            { value: "green", label: "Green" },
            { value: "yellow", label: "Yellow" }
          ]}
          selected={selectedColors.value}
          onToggle$={$((value) => {
            if (selectedColors.value.includes(value)) {
              selectedColors.value = selectedColors.value.filter(v => v !== value);
            } else {
              selectedColors.value = [...selectedColors.value, value];
            }
          })}
          direction="horizontal"
          name="colors"
          label="Choose colors"
          helperText="Select all that apply"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-1">With Error State</h3>
        <CheckboxGroup 
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" }
          ]}
          selected={[]}
          onToggle$={$(() => {})}
          name="options"
          label="Required options"
          required={true}
          error="Please select at least one option"
        />
      </div>
    </div>
  );
});

export const Group: Story = {
  render: () => <CheckboxGroupStory />
};

/**
 * Form context example with reactive state
 */
const FormContextExample = component$(() => {
  const formSubmitted = useSignal(false);
  const termsAccepted = useSignal(false);
  const preferences = useSignal<string[]>([]);
  
  return (
    <form
      preventdefault:submit
      onSubmit$={() => {
        formSubmitted.value = true;
      }}
      class="p-4 border border-border rounded-md max-w-md space-y-4 dark:border-border-dark"
    >
      <div>
        <h3 class="text-lg font-medium mb-2">Account Preferences</h3>
        
        <div class="space-y-4">
          <Checkbox
            checked={termsAccepted.value}
            onChange$={$((value) => {
              termsAccepted.value = value;
            })}
            label="I accept the terms and conditions"
            required={true}
            error={formSubmitted.value && !termsAccepted.value ? "You must accept the terms to continue" : ""}
          />
          
          <CheckboxGroup
            options={[
              { value: "newsletter", label: "Subscribe to newsletter" },
              { value: "promotions", label: "Receive promotional emails" },
              { value: "updates", label: "Product updates" }
            ]}
            selected={preferences.value}
            onToggle$={$((value) => {
              if (preferences.value.includes(value)) {
                preferences.value = preferences.value.filter(v => v !== value);
              } else {
                preferences.value = [...preferences.value, value];
              }
            })}
            label="Communication preferences"
            name="preferences"
          />
        </div>
        
        <button
          type="submit"
          class="mt-4 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
        >
          Save Preferences
        </button>
        
        {formSubmitted.value && (
          <div class="mt-4 p-2 bg-success-50 text-success-700 rounded">
            <p>Form submitted with values:</p>
            <ul class="list-disc pl-5">
              <li>Terms accepted: {termsAccepted.value ? "Yes" : "No"}</li>
              <li>Preferences: {preferences.value.length ? preferences.value.join(", ") : "None selected"}</li>
            </ul>
          </div>
        )}
      </div>
    </form>
  );
});

export const FormContext: Story = {
  render: () => <FormContextExample />
};

/**
 * Dark mode example with proper component
 */
const DarkModeExample = component$(() => {
  return (
    <div class="p-6 bg-surface-dark-primary text-text-dark-primary rounded-md">
      <div class="space-y-4">
        <CheckboxWithState 
          label="Unchecked (Dark Mode)"
        />
        <CheckboxWithState 
          label="Checked (Dark Mode)"
          initialChecked={true}
        />
        <CheckboxWithState 
          label="With helper text (Dark Mode)"
          helperText="This is some helpful information"
        />
        
        <div class="mt-6">
          <CheckboxGroup
            options={[
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
              { value: "option3", label: "Option 3" }
            ]}
            selected={["option2"]}
            onToggle$={$(() => {})}
            label="Checkbox Group (Dark Mode)"
            name="dark-options"
          />
        </div>
      </div>
    </div>
  );
});

export const DarkMode: Story = {
  render: () => <DarkModeExample />
};
