import { $, component$ } from '@builder.io/qwik';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Form } from '../Form';
import { FormField } from '../FormField';
import { TextArea } from '../../TextArea';
import { Slider } from '../../Slider';
import { FileUpload } from '../../FileUpload';
import { DatePicker } from '../../DatePicker';
import { Checkbox } from '../../Checkbox';
import { RadioGroup } from '../../RadioGroup';
import { FormValidationExample } from '../example/FormValidationExample';
import { FormExamples, LoginFormExample, MultiStepFormExample, DynamicFieldsExample, CustomFormHookExample } from '../example/FormExamples';

const meta: Meta<typeof Form> = {
  title: 'Core/Form/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

// Basic story with all form components
export const Basic: Story = {
  render: component$(() => {
    const handleSubmit$ = $((values: Record<string, any>) => {
      alert(JSON.stringify(values, null, 2));
    });
    
    return (
      <Form 
        onSubmit$={handleSubmit$}
        initialValues={{
          name: 'John Doe',
          email: 'john@example.com',
          message: 'This is a sample message',
          age: 30,
          newsletter: true,
          birthdate: new Date().toISOString(),
        }}
      >
        <div class="grid grid-cols-2 gap-4">
          <FormField 
            name="name" 
            label="Full Name"
            helperText="Enter your full name"
            required
          >
            <input 
              type="text" 
              name="name" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md" 
              required
            />
          </FormField>
          
          <FormField 
            name="email" 
            label="Email Address"
            required
          >
            <input 
              type="email" 
              name="email" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md" 
              required
            />
          </FormField>
        </div>
        
        <FormField 
          name="message" 
          label="Message"
          helperText="Please enter your message (max 500 characters)"
        >
          <TextArea 
            name="message" 
            rows={4}
            maxLength={500}
            resize="vertical"
          />
        </FormField>
        
        <FormField
          name="age"
          label="Age"
          helperText="Slide to select your age"
        >
          <Slider
            name="age"
            min={18}
            max={100}
            step={1}
            showValue
          />
        </FormField>
        
        <FormField
          name="birthdate"
          label="Birth Date"
        >
          <DatePicker
            name="birthdate"
            mode="single"
            value={new Date()}
          />
        </FormField>
        
        <FormField
          name="attachments"
          label="Attachments"
          helperText="Upload any relevant documents"
        >
          <FileUpload
            name="attachments"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            maxFileSize={5 * 1024 * 1024} // 5MB
            maxFiles={3}
          />
        </FormField>
        
        <FormField
          name="newsletter"
          label="Subscribe to Newsletter"
        >
          <Checkbox
            name="newsletter"
            label="Yes, I want to receive updates and news"
            checked={false}
            onChange$={() => {}}
          />
        </FormField>
        
        <FormField
          name="preferredContact"
          label="Preferred Contact Method"
        >
          <RadioGroup
            name="preferredContact"
            options={[
              { value: 'email', label: 'Email' },
              { value: 'phone', label: 'Phone' },
              { value: 'mail', label: 'Mail' },
            ]}
            value="email"
            onChange$={() => {}}
          />
        </FormField>
        
        <div class="flex justify-end gap-3 mt-4">
          <button 
            type="reset" 
            class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md"
          >
            Reset
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 text-white bg-primary-600 rounded-md"
          >
            Submit
          </button>
        </div>
      </Form>
    );
  }),
};

// Story demonstrating form validation
export const WithValidation: Story = {
  render: component$(() => {
    const handleSubmit$ = $((values: Record<string, any>) => {
      alert(JSON.stringify(values, null, 2));
    });
    
    const handleValidate$ = $((values: Record<string, any>): Record<string, string> => {
      const errors: Record<string, string> = {};
      
      // Validate email format
      if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Please enter a valid email address';
      }
      
      // Validate password
      if (values.password && values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
      }
      
      // Validate password confirmation
      if (values.passwordConfirm && values.password !== values.passwordConfirm) {
        errors.passwordConfirm = 'Passwords do not match';
      }
      
      return errors;
    });
    
    return (
      <Form 
        onSubmit$={handleSubmit$}
        onValidate$={handleValidate$}
        validateOnChange={true}
        validateOnBlur={true}
      >
        <FormField 
          name="email" 
          label="Email Address"
          required
        >
          <input 
            type="email" 
            name="email" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md" 
            required
          />
        </FormField>
        
        <FormField 
          name="password" 
          label="Password"
          helperText="Must be at least 8 characters long"
          required
        >
          <input 
            type="password" 
            name="password" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md" 
            required
          />
        </FormField>
        
        <FormField 
          name="passwordConfirm" 
          label="Confirm Password"
          required
        >
          <input 
            type="password" 
            name="passwordConfirm" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md" 
            required
          />
        </FormField>
        
        <div class="flex justify-end gap-3 mt-4">
          <button 
            type="submit" 
            class="px-4 py-2 text-white bg-primary-600 rounded-md"
          >
            Register
          </button>
        </div>
      </Form>
    );
  }),
};

// Story demonstrating form with different field states
export const FieldStates: Story = {
  render: component$(() => {
    return (
      <Form>
        <FormField 
          name="default" 
          label="Default Field"
          helperText="This is a default field with helper text"
        >
          <input 
            type="text" 
            name="default" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md" 
          />
        </FormField>
        
        <FormField 
          name="required" 
          label="Required Field"
          required
        >
          <input 
            type="text" 
            name="required" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md" 
            required
          />
        </FormField>
        
        <FormField 
          name="disabled" 
          label="Disabled Field"
          disabled
        >
          <input 
            type="text" 
            name="disabled" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md" 
            disabled
            value="This field is disabled"
          />
        </FormField>
        
        <FormField 
          name="readonly" 
          label="Read-only Field"
          readOnly
        >
          <input 
            type="text" 
            name="readonly" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md" 
            readOnly
            value="This field is read-only"
          />
        </FormField>
        
        <FormField 
          name="error" 
          label="Field with Error"
          error="This field has an error message"
        >
          <input 
            type="text" 
            name="error" 
            class="w-full px-3 py-2 border border-red-300 rounded-md" 
            value="Invalid value"
          />
        </FormField>
        
        <FormField 
          name="success" 
          label="Field with Success"
          success
        >
          <input 
            type="text" 
            name="success" 
            class="w-full px-3 py-2 border border-green-300 rounded-md" 
            value="Valid input"
          />
        </FormField>
        
        <FormField 
          name="warning" 
          label="Field with Warning"
          warning
          helperText="There might be an issue with this input"
        >
          <input 
            type="text" 
            name="warning" 
            class="w-full px-3 py-2 border border-yellow-300 rounded-md" 
            value="Potentially problematic value"
          />
        </FormField>
      </Form>
    );
  }),
};

// Story demonstrating form layouts
export const FormLayouts: Story = {
  render: component$(() => {
    return (
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-medium mb-4">Standard Layout</h3>
          <Form>
            <FormField 
              name="firstName" 
              label="First Name"
            >
              <input 
                type="text" 
                name="firstName" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md" 
              />
            </FormField>
            
            <FormField 
              name="lastName" 
              label="Last Name"
            >
              <input 
                type="text" 
                name="lastName" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md" 
              />
            </FormField>
          </Form>
        </div>
        
        <div>
          <h3 class="text-lg font-medium mb-4">Two Column Layout</h3>
          <Form>
            <div class="grid grid-cols-2 gap-4">
              <FormField 
                name="firstName" 
                label="First Name"
              >
                <input 
                  type="text" 
                  name="firstName" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md" 
                />
              </FormField>
              
              <FormField 
                name="lastName" 
                label="Last Name"
              >
                <input 
                  type="text" 
                  name="lastName" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md" 
                />
              </FormField>
            </div>
            
            <FormField 
              name="address" 
              label="Address"
            >
              <input 
                type="text" 
                name="address" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md" 
              />
            </FormField>
            
            <div class="grid grid-cols-3 gap-4">
              <FormField 
                name="city" 
                label="City"
              >
                <input 
                  type="text" 
                  name="city" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md" 
                />
              </FormField>
              
              <FormField 
                name="state" 
                label="State"
              >
                <input 
                  type="text" 
                  name="state" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md" 
                />
              </FormField>
              
              <FormField 
                name="zip" 
                label="ZIP Code"
              >
                <input 
                  type="text" 
                  name="zip" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md" 
                />
              </FormField>
            </div>
          </Form>
        </div>
      </div>
    );
  }),
};

// Advanced validation example
export const AdvancedValidation: Story = {
  render: component$(() => {
    return <FormValidationExample />;
  }),
};

// Form usage patterns
export const UsagePatterns: Story = {
  render: component$(() => {
    return <FormExamples />;
  }),
};

// Login form example
export const LoginForm: Story = {
  render: component$(() => {
    return <LoginFormExample />;
  }),
};

// Multi-step form example
export const MultiStepForm: Story = {
  render: component$(() => {
    return <MultiStepFormExample />;
  }),
};

// Dynamic fields form example
export const DynamicFields: Story = {
  render: component$(() => {
    return <DynamicFieldsExample />;
  }),
};

// Custom form hook example
export const CustomFormHook: Story = {
  render: component$(() => {
    return <CustomFormHookExample />;
  }),
};
