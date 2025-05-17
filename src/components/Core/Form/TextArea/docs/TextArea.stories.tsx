import { Meta, StoryObj } from 'storybook-framework-qwik';
import { TextArea } from './TextArea';
import { component$, useSignal, $ } from '@builder.io/qwik';
import type { TextAreaProps } from './TextArea.types';

const defaultProps: TextAreaProps = {
  id: 'textarea-example',
  name: 'textarea-example',
  size: 'md',
  placeholder: 'Enter your text here...',
  minRows: 3,
  resize: 'vertical',
  autoResize: false,
  showCharCount: false,
  fullWidth: true,
  disabled: false,
  required: false,
};

export default {
  title: 'Core/Form/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'TextArea component for multi-line text input with auto-resize and character counting'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the textarea',
      defaultValue: 'md'
    },
    label: {
      control: 'text',
      description: 'Label for the textarea'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
      defaultValue: false
    },
    required: {
      control: 'boolean',
      description: 'Whether the textarea is required',
      defaultValue: false
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
      defaultValue: 'Enter your text here...'
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the textarea'
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display (sets the textarea to error state)'
    },
    successMessage: {
      control: 'text',
      description: 'Success message to display (sets the textarea to success state)'
    },
    warningMessage: {
      control: 'text',
      description: 'Warning message to display (sets the textarea to warning state)'
    },
    state: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning'],
      description: 'Current state of the textarea',
      defaultValue: 'default'
    },
    autoResize: {
      control: 'boolean',
      description: 'Whether to auto-resize the textarea as content grows',
      defaultValue: false
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both', 'auto'],
      description: 'Resize behavior of the textarea',
      defaultValue: 'vertical'
    },
    minRows: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Minimum number of rows to display',
      defaultValue: 3
    },
    maxRows: {
      control: { type: 'range', min: 3, max: 20, step: 1 },
      description: 'Maximum number of rows when auto-resizing'
    },
    showCharCount: {
      control: 'boolean',
      description: 'Whether to show character count',
      defaultValue: false
    },
    maxLength: {
      control: { type: 'number', min: 10, max: 1000 },
      description: 'Maximum character count'
    },
    autofocus: {
      control: 'boolean',
      description: 'Whether to autofocus the textarea',
      defaultValue: false
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the textarea should span full width',
      defaultValue: true
    },
    showClear: {
      control: 'boolean',
      description: 'Whether to show clear button',
      defaultValue: false
    }
  }
} satisfies Meta<TextAreaProps>;

type Story = StoryObj<TextAreaProps>;

// Basic textarea
export const Default: Story = {
  args: {
    ...defaultProps,
    label: 'Comments',
    helperText: 'Please share your thoughts'
  }
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div class="flex flex-col gap-6 w-[600px]">
      <div>
        <h3 class="text-sm font-medium mb-2">Small</h3>
        <TextArea
          {...defaultProps}
          size="sm"
          placeholder="Small textarea"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Medium (Default)</h3>
        <TextArea
          {...defaultProps}
          size="md"
          placeholder="Medium textarea"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Large</h3>
        <TextArea
          {...defaultProps}
          size="lg"
          placeholder="Large textarea"
        />
      </div>
    </div>
  )
};

// Different states
export const States: Story = {
  render: () => (
    <div class="flex flex-col gap-6 w-[600px]">
      <div>
        <h3 class="text-sm font-medium mb-2">Default</h3>
        <TextArea
          {...defaultProps}
          label="Default state"
          helperText="This is a helper text"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Success</h3>
        <TextArea
          {...defaultProps}
          label="Success state"
          successMessage="This field is valid"
          value="Valid input text"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Warning</h3>
        <TextArea
          {...defaultProps}
          label="Warning state"
          warningMessage="This field requires attention"
          value="Text needing attention"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Error</h3>
        <TextArea
          {...defaultProps}
          label="Error state"
          errorMessage="This field is invalid"
          value="Invalid input text"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Disabled</h3>
        <TextArea
          {...defaultProps}
          label="Disabled state"
          disabled={true}
          value="Disabled text"
        />
      </div>
    </div>
  )
};

// Resize behaviors
export const ResizeBehaviors: Story = {
  render: () => (
    <div class="flex flex-col gap-6 w-[600px]">
      <div>
        <h3 class="text-sm font-medium mb-2">No Resize</h3>
        <TextArea
          {...defaultProps}
          label="Resize: none"
          resize="none"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Vertical Resize (Default)</h3>
        <TextArea
          {...defaultProps}
          label="Resize: vertical"
          resize="vertical"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Horizontal Resize</h3>
        <TextArea
          {...defaultProps}
          label="Resize: horizontal"
          resize="horizontal"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Both Directions Resize</h3>
        <TextArea
          {...defaultProps}
          label="Resize: both"
          resize="both"
        />
      </div>
    </div>
  )
};

// Auto-resize example
const AutoResizeExample = component$(() => {
  const value = useSignal('');
  
  return (
    <div class="flex flex-col gap-6 w-[600px]">
      <div>
        <h3 class="text-sm font-medium mb-2">Auto-resize Textarea</h3>
        <p class="text-sm text-gray-500 mb-4">
          Type or paste a long text to see how the textarea automatically resizes
        </p>
        <TextArea
          {...defaultProps}
          label="Auto-resizing textarea"
          autoResize={true}
          minRows={2}
          maxRows={10}
          value={value.value}
          onInput$={(e: any) => (value.value = e.target.value)}
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Auto-resize with max rows</h3>
        <p class="text-sm text-gray-500 mb-4">
          This textarea will only grow up to 5 rows, then scroll
        </p>
        <TextArea
          {...defaultProps}
          label="Limited auto-resize"
          autoResize={true}
          minRows={2}
          maxRows={5}
        />
      </div>
    </div>
  );
});

export const AutoResize: Story = {
  render: () => <AutoResizeExample />
};

// Character count example
const CharCountExample = component$(() => {
  const value = useSignal('');
  
  return (
    <div class="flex flex-col gap-6 w-[600px]">
      <div>
        <h3 class="text-sm font-medium mb-2">Character Count</h3>
        <TextArea
          {...defaultProps}
          label="With character count"
          showCharCount={true}
          value={value.value}
          onInput$={(e: any) => (value.value = e.target.value)}
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Character Count with Limit</h3>
        <TextArea
          {...defaultProps}
          label="Limited to 100 characters"
          showCharCount={true}
          maxLength={100}
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Custom Character Count Format</h3>
        <TextArea
          {...defaultProps}
          label="Custom format"
          showCharCount={true}
          maxLength={200}
          charCountFormatter$={$((current: number, max?: number) => 
            `${current} characters used${max ? ` (${max - current} remaining)` : ''}`
          )}
        />
      </div>
    </div>
  );
});

export const CharacterCount: Story = {
  render: () => <CharCountExample />
};

// With clear button
const ClearButtonExample = component$(() => {
  const value = useSignal('This is some text that can be cleared using the button.');
  
  return (
    <div class="flex flex-col gap-6 w-[600px]">
      <div>
        <h3 class="text-sm font-medium mb-2">With Clear Button</h3>
        <TextArea
          {...defaultProps}
          label="Clearable textarea"
          showClear={true}
          value={value.value}
          onInput$={(e: any) => (value.value = e.target.value)}
        />
      </div>
    </div>
  );
});

export const ClearButton: Story = {
  render: () => <ClearButtonExample />
};

// Form integration example
const FormExample = component$(() => {
  const formData = useSignal({
    name: '',
    bio: '',
    feedback: ''
  });
  
  const formErrors = useSignal({
    name: '',
    bio: '',
    feedback: ''
  });
  
  const submitted = useSignal(false);
  
  const validateForm$ = $(() => {
    const errors = {
      name: formData.value.name ? '' : 'Name is required',
      bio: formData.value.bio.length < 10 ? 'Bio must be at least 10 characters' : '',
      feedback: ''
    };
    
    formErrors.value = errors;
    
    // Check if any error message is non-empty
    const hasErrors = Object.values(errors).some(error => error !== '');
    return !hasErrors;
  });
  
  const handleSubmit$ = $((e: Event) => {
    e.preventDefault();
    
    const isValid = validateForm$();
    if (isValid) {
      submitted.value = true;
      setTimeout(() => {
        submitted.value = false;
      }, 3000);
    }
  });
  
  return (
    <div class="w-[600px] p-6 border border-gray-200 rounded-md">
      <h2 class="text-xl font-medium mb-4">Contact Form Example</h2>
      
      {submitted.value ? (
        <div class="bg-green-50 p-4 rounded-md mb-4">
          <p class="text-green-700">Form submitted successfully!</p>
        </div>
      ) : null}
      
      <form onSubmit$={handleSubmit$} class="flex flex-col gap-4">
        <TextArea
          id="name"
          name="name"
          label="Name"
          required
          placeholder="Enter your name"
          value={formData.value.name}
          errorMessage={formErrors.value.name}
          onInput$={(e: any) => (formData.value.name = e.target.value)}
          minRows={1}
        />
        
        <TextArea
          id="bio"
          name="bio"
          label="Bio"
          required
          placeholder="Tell us about yourself (at least 10 characters)"
          value={formData.value.bio}
          errorMessage={formErrors.value.bio}
          onInput$={(e: any) => (formData.value.bio = e.target.value)}
          showCharCount
          minRows={2}
          autoResize
          maxRows={5}
        />
        
        <TextArea
          id="feedback"
          name="feedback"
          label="Additional Comments"
          placeholder="Any other comments or feedback (optional)"
          value={formData.value.feedback}
          errorMessage={formErrors.value.feedback}
          onInput$={(e: any) => (formData.value.feedback = e.target.value)}
          helperText="Optional feedback about our services"
          showCharCount
          maxLength={500}
        />
        
        <div class="mt-2">
          <button
            type="submit"
            class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
});

export const FormIntegration: Story = {
  render: () => <FormExample />
};
