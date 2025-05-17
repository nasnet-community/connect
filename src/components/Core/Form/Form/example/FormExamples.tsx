import { $, component$ } from '@builder.io/qwik';
import { Form } from '../Form';
import { FormField } from '../FormField';
import { useForm } from '../hooks/useForm';
import * as validators from '../formValidation';

/**
 * Example component demonstrating different form patterns and use cases
 * that can be implemented with the Connect Form system.
 */
export const FormExamples = component$(() => {
  return (
    <div class="space-y-12">
      <section>
        <h2 class="text-xl font-semibold mb-4">Login Form</h2>
        <LoginFormExample />
      </section>
      
      <section>
        <h2 class="text-xl font-semibold mb-4">Multi-Step Form</h2>
        <MultiStepFormExample />
      </section>
      
      <section>
        <h2 class="text-xl font-semibold mb-4">Dynamic Form Fields</h2>
        <DynamicFieldsExample />
      </section>
      
      <section>
        <h2 class="text-xl font-semibold mb-4">Custom Form with useForm Hook</h2>
        <CustomFormHookExample />
      </section>
    </div>
  );
});

/**
 * Simple login form example with validation
 */
export const LoginFormExample = component$(() => {
  const handleSubmit$ = $((values: Record<string, any>) => {
    console.log('Login submitted:', values);
    // In a real app, would make an API call here
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('Login successful');
        resolve();
      }, 1000);
    });
  });
  
  return (
    <Form
      onSubmit$={handleSubmit$}
      validateOnChange={true}
      validateOnBlur={true}
      class="max-w-md"
    >
      <FormField
        name="email"
        label="Email"
        required
        validate={[
          validators.required('Email is required'),
          validators.email('Please enter a valid email address')
        ]}
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
        required
        validate={[
          validators.required('Password is required')
        ]}
      >
        <input
          type="password"
          name="password"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </FormField>
      
      <FormField
        name="rememberMe"
        label="Remember Me"
      >
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            name="rememberMe"
            id="rememberMe"
            class="w-4 h-4"
          />
          <label for="rememberMe" class="text-sm">
            Keep me logged in
          </label>
        </div>
      </FormField>
      
      <div class="flex justify-between items-center mt-6">
        <a href="#" class="text-sm text-blue-600 hover:underline">
          Forgot password?
        </a>
        <button
          type="submit"
          class="px-4 py-2 text-white bg-blue-600 rounded-md"
        >
          Sign In
        </button>
      </div>
    </Form>
  );
});

/**
 * Multi-step form example with progress tracking
 */
export const MultiStepFormExample = component$(() => {
  const form = useForm({
    initialValues: {
      // Personal information
      firstName: '',
      lastName: '',
      email: '',
      
      // Address information
      street: '',
      city: '',
      state: '',
      zipCode: '',
      
      // Account information
      username: '',
      password: '',
      confirmPassword: '',
    }
  });
  
  // Step state (1, 2, or 3)
  const currentStep = useForm({
    initialValues: {
      step: 1
    }
  });
  
  // Navigation functions
  const nextStep$ = $(() => {
    const step = currentStep.values.step;
    if (step < 3) {
      currentStep.setFieldValue('step', step + 1);
    }
  });
  
  const prevStep$ = $(() => {
    const step = currentStep.values.step;
    if (step > 1) {
      currentStep.setFieldValue('step', step - 1);
    }
  });
  
  // Form submission
  const handleSubmit$ = $((values: Record<string, any>) => {
    console.log('Multi-step form submitted:', values);
    // In a real app, would make an API call here
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('Submission successful');
        resolve();
      }, 1000);
    });
  });
  
  return (
    <div class="max-w-lg">
      {/* Progress indicator */}
      <div class="mb-8">
        <div class="flex justify-between">
          <div class={`text-center ${currentStep.values.step >= 1 ? 'text-blue-600 font-medium' : ''}`}>
            <div class={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${currentStep.values.step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <div>Personal</div>
          </div>
          <div class={`text-center ${currentStep.values.step >= 2 ? 'text-blue-600 font-medium' : ''}`}>
            <div class={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${currentStep.values.step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <div>Address</div>
          </div>
          <div class={`text-center ${currentStep.values.step >= 3 ? 'text-blue-600 font-medium' : ''}`}>
            <div class={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${currentStep.values.step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              3
            </div>
            <div>Account</div>
          </div>
        </div>
        <div class="relative mt-2">
          <div class="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
          <div class="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2" style={{ width: `${((currentStep.values.step - 1) / 2) * 100}%` }}></div>
        </div>
      </div>
      
      {/* Form */}
      <Form
        onSubmit$={handleSubmit$}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {/* Step 1: Personal Information */}
        {currentStep.values.step === 1 && (
          <div>
            <h3 class="text-lg font-medium mb-4">Personal Information</h3>
            
            <div class="grid grid-cols-2 gap-4">
              <FormField
                name="firstName"
                label="First Name"
                required
                validate={[validators.required('First name is required')]}
              >
                <input
                  type="text"
                  name="firstName"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={form.values.firstName}
                  onInput$={(e) => form.setFieldValue('firstName', (e.target as HTMLInputElement).value)}
                  required
                />
              </FormField>
              
              <FormField
                name="lastName"
                label="Last Name"
                required
                validate={[validators.required('Last name is required')]}
              >
                <input
                  type="text"
                  name="lastName"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={form.values.lastName}
                  onInput$={(e) => form.setFieldValue('lastName', (e.target as HTMLInputElement).value)}
                  required
                />
              </FormField>
            </div>
            
            <FormField
              name="email"
              label="Email"
              required
              validate={[
                validators.required('Email is required'),
                validators.email('Please enter a valid email address')
              ]}
            >
              <input
                type="email"
                name="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={form.values.email}
                onInput$={(e) => form.setFieldValue('email', (e.target as HTMLInputElement).value)}
                required
              />
            </FormField>
            
            <div class="flex justify-end mt-6">
              <button
                type="button"
                class="px-4 py-2 text-white bg-blue-600 rounded-md"
                onClick$={nextStep$}
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2: Address Information */}
        {currentStep.values.step === 2 && (
          <div>
            <h3 class="text-lg font-medium mb-4">Address Information</h3>
            
            <FormField
              name="street"
              label="Street Address"
              required
              validate={[validators.required('Street address is required')]}
            >
              <input
                type="text"
                name="street"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={form.values.street}
                onInput$={(e) => form.setFieldValue('street', (e.target as HTMLInputElement).value)}
                required
              />
            </FormField>
            
            <div class="grid grid-cols-2 gap-4">
              <FormField
                name="city"
                label="City"
                required
                validate={[validators.required('City is required')]}
              >
                <input
                  type="text"
                  name="city"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={form.values.city}
                  onInput$={(e) => form.setFieldValue('city', (e.target as HTMLInputElement).value)}
                  required
                />
              </FormField>
              
              <FormField
                name="state"
                label="State"
                required
                validate={[validators.required('State is required')]}
              >
                <input
                  type="text"
                  name="state"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={form.values.state}
                  onInput$={(e) => form.setFieldValue('state', (e.target as HTMLInputElement).value)}
                  required
                />
              </FormField>
            </div>
            
            <FormField
              name="zipCode"
              label="ZIP Code"
              required
              validate={[
                validators.required('ZIP code is required'),
                validators.pattern(/^\d{5}(-\d{4})?$/, 'Enter a valid ZIP code')
              ]}
            >
              <input
                type="text"
                name="zipCode"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={form.values.zipCode}
                onInput$={(e) => form.setFieldValue('zipCode', (e.target as HTMLInputElement).value)}
                required
              />
            </FormField>
            
            <div class="flex justify-between mt-6">
              <button
                type="button"
                class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md"
                onClick$={prevStep$}
              >
                Previous
              </button>
              <button
                type="button"
                class="px-4 py-2 text-white bg-blue-600 rounded-md"
                onClick$={nextStep$}
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: Account Information */}
        {currentStep.values.step === 3 && (
          <div>
            <h3 class="text-lg font-medium mb-4">Account Information</h3>
            
            <FormField
              name="username"
              label="Username"
              required
              validate={[
                validators.required('Username is required'),
                validators.minLength(3, 'Username must be at least 3 characters'),
                validators.pattern(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
              ]}
            >
              <input
                type="text"
                name="username"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={form.values.username}
                onInput$={(e) => form.setFieldValue('username', (e.target as HTMLInputElement).value)}
                required
              />
            </FormField>
            
            <FormField
              name="password"
              label="Password"
              required
              validate={[
                validators.required('Password is required'),
                validators.minLength(8, 'Password must be at least 8 characters')
              ]}
            >
              <input
                type="password"
                name="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={form.values.password}
                onInput$={(e) => form.setFieldValue('password', (e.target as HTMLInputElement).value)}
                required
              />
            </FormField>
            
            <FormField
              name="confirmPassword"
              label="Confirm Password"
              required
              validate={[
                validators.required('Please confirm your password'),
                validators.matches('password', 'Passwords do not match')
              ]}
            >
              <input
                type="password"
                name="confirmPassword"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={form.values.confirmPassword}
                onInput$={(e) => form.setFieldValue('confirmPassword', (e.target as HTMLInputElement).value)}
                required
              />
            </FormField>
            
            <div class="flex justify-between mt-6">
              <button
                type="button"
                class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md"
                onClick$={prevStep$}
              >
                Previous
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-white bg-green-600 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
});

/**
 * Example of a form with dynamic fields that can be added/removed
 */
export const DynamicFieldsExample = component$(() => {
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      items: [{ name: '', quantity: 1 }]
    }
  });
  
  // Add a new item field
  const addItem$ = $(() => {
    const currentItems = [...(form.values.items || [])];
    currentItems.push({ name: '', quantity: 1 });
    form.setFieldValue('items', currentItems);
  });
  
  // Remove an item field
  const removeItem$ = $((index: number) => {
    const currentItems = [...(form.values.items || [])];
    if (currentItems.length > 1) {
      currentItems.splice(index, 1);
      form.setFieldValue('items', currentItems);
    }
  });
  
  // Update an item field
  const updateItem$ = $((index: number, field: string, value: any) => {
    const currentItems = [...(form.values.items || [])];
    currentItems[index] = { ...currentItems[index], [field]: value };
    form.setFieldValue('items', currentItems);
  });
  
  // Form submission
  const handleSubmit$ = $((values: Record<string, any>) => {
    console.log('Dynamic form submitted:', values);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('Submission successful');
        resolve();
      }, 1000);
    });
  });
  
  return (
    <Form
      onSubmit$={handleSubmit$}
      class="max-w-md"
    >
      <FormField
        name="title"
        label="Project Title"
        required
        validate={[validators.required('Title is required')]}
      >
        <input
          type="text"
          name="title"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={form.values.title}
          onInput$={(e) => form.setFieldValue('title', (e.target as HTMLInputElement).value)}
          required
        />
      </FormField>
      
      <FormField
        name="description"
        label="Description"
      >
        <textarea
          name="description"
          rows={3}
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={form.values.description}
          onInput$={(e) => form.setFieldValue('description', (e.target as HTMLTextAreaElement).value)}
        />
      </FormField>
      
      <div class="mt-6">
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-medium">Items</h3>
          <button
            type="button"
            class="px-2 py-1 text-sm text-blue-600 border border-blue-600 rounded-md"
            onClick$={addItem$}
          >
            Add Item
          </button>
        </div>
        
        {form.values.items?.map((item: { name: string; quantity: number }, index: number) => (
          <div key={index} class="mb-4 p-3 border border-gray-200 rounded-md">
            <div class="flex justify-between items-center mb-2">
              <h4 class="text-sm font-medium">Item {index + 1}</h4>
              <button
                type="button"
                class="text-red-500 text-sm"
                onClick$={() => removeItem$(index)}
                disabled={form.values.items?.length <= 1}
              >
                Remove
              </button>
            </div>
            
            <div class="grid grid-cols-2 gap-3">
              <FormField
                name={`items[${index}].name`}
                label="Name"
                required
              >
                <input
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={item.name}
                  onInput$={(e) => updateItem$(index, 'name', (e.target as HTMLInputElement).value)}
                  required
                />
              </FormField>
              
              <FormField
                name={`items[${index}].quantity`}
                label="Quantity"
                required
              >
                <input
                  type="number"
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={item.quantity}
                  onInput$={(e) => updateItem$(index, 'quantity', parseInt((e.target as HTMLInputElement).value) || 0)}
                  required
                />
              </FormField>
            </div>
          </div>
        ))}
      </div>
      
      <div class="flex justify-end mt-6">
        <button
          type="submit"
          class="px-4 py-2 text-white bg-blue-600 rounded-md"
        >
          Submit
        </button>
      </div>
    </Form>
  );
});

/**
 * Example of using the useForm hook directly without the Form component
 */
export const CustomFormHookExample = component$(() => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validateOnChange: true,
    validateOnBlur: true
  });
  
  // Handle form submission
  const handleSubmit$ = $(async (e: Event) => {
    e.preventDefault();
    
    // Validate all fields
    await form.validateForm();
    
    if (form.isValid) {
      console.log('Form is valid, submitting:', form.values);
      // Send data to server in real app
      alert('Form submitted successfully!');
      form.resetForm();
    } else {
      console.log('Form has errors:', form.errors);
    }
  });
  
  return (
    <div class="max-w-md">
      <form onSubmit$={handleSubmit$} class="space-y-4">
        <div class="space-y-1">
          <label for="name" class="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            class={`w-full px-3 py-2 border rounded-md ${form.errors.name ? 'border-red-500' : 'border-gray-300'}`}
            value={form.values.name}
            onInput$={(e) => form.setFieldValue('name', (e.target as HTMLInputElement).value)}
            onBlur$={() => form.validateField('name')}
          />
          {form.errors.name && (
            <p class="mt-1 text-sm text-red-500">{form.errors.name}</p>
          )}
        </div>
        
        <div class="space-y-1">
          <label for="email" class="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            class={`w-full px-3 py-2 border rounded-md ${form.errors.email ? 'border-red-500' : 'border-gray-300'}`}
            value={form.values.email}
            onInput$={(e) => form.setFieldValue('email', (e.target as HTMLInputElement).value)}
            onBlur$={() => form.validateField('email')}
          />
          {form.errors.email && (
            <p class="mt-1 text-sm text-red-500">{form.errors.email}</p>
          )}
        </div>
        
        <div class="space-y-1">
          <label for="message" class="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={form.values.message}
            onInput$={(e) => form.setFieldValue('message', (e.target as HTMLTextAreaElement).value)}
          />
        </div>
        
        <div class="mt-6">
          <div class="flex items-center justify-between">
            <button
              type="button"
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md"
              onClick$={() => form.resetForm()}
            >
              Reset
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-white bg-blue-600 rounded-md"
              disabled={form.isSubmitting}
            >
              {form.isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
          
          {/* Form state debugging */}
          <details class="mt-6 text-xs text-gray-500 border border-gray-200 rounded p-2">
            <summary>Form State Debug</summary>
            <pre class="mt-2 overflow-auto p-2 bg-gray-50 rounded">
              {JSON.stringify({
                values: form.values,
                errors: form.errors,
                touched: form.touched,
                isValid: form.isValid,
                isDirty: form.isDirty,
                isSubmitting: form.isSubmitting
              }, null, 2)}
            </pre>
          </details>
        </div>
      </form>
    </div>
  );
});

export default FormExamples;
