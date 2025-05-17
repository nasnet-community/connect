import { component$, $ } from '@builder.io/qwik';
import { Form } from '../index';
import { Field } from '../../Field';
import { Button } from '../../../button';
import type { FormValidationRule } from '../Form.types';

export default component$(() => {
  // Password validation rule
  const passwordValidator$ = $((value: string) => {
    if (!value || value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/[A-Z]/.test(value)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(value)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(value)) {
      return 'Password must contain at least one number';
    }
    return undefined;
  });
  
  // Email validation rule
  const emailValidator$ = $((value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  });
  
  // Password confirmation validation
  const confirmPasswordValidator$ = $((value: string, formValues: Record<string, any>) => {
    if (value !== formValues.password) {
      return 'Passwords do not match';
    }
    return undefined;
  });
  
  const passwordRules: FormValidationRule[] = [
    { validator: passwordValidator$ }
  ];
  
  const emailRules: FormValidationRule[] = [
    { validator: emailValidator$ }
  ];
  
  const confirmPasswordRules: FormValidationRule[] = [
    { validator: confirmPasswordValidator$ }
  ];
  
  return (
    <div class="max-w-md">
      <Form
        validateOnBlur={true}
        validateOnChange={true}
        validateOnSubmit={true}
        onSubmit$={(values) => {
          console.log('Form submitted with values:', values);
          alert('Registration successful!');
        }}
      >
        <Field
          id="username"
          label="Username"
          required
          placeholder="Enter username"
          helperText="Choose a unique username"
        />
        
        <Field
          id="email"
          label="Email"
          type="email"
          required
          placeholder="your.email@example.com"
          validate={emailRules}
          helperText="We'll never share your email"
        />
        
        <Field
          id="password"
          label="Password"
          type="password"
          required
          placeholder="Enter password"
          validate={passwordRules}
          helperText="Must be at least 8 characters with uppercase, lowercase, and number"
        />
        
        <Field
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          required
          placeholder="Confirm password"
          validate={confirmPasswordRules}
          validateOnChange={true}
        />
        
        <div class="flex items-center gap-3 mt-2">
          <Button type="reset" variant="outline">Reset</Button>
          <Button type="submit" variant="primary">Register</Button>
        </div>
      </Form>
    </div>
  );
});
