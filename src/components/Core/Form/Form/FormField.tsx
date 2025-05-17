import { Slot, component$, $ } from '@builder.io/qwik';
import { FormLabel } from '../FormLabel';
import { FormHelperText } from '../FormHelperText';
import { FormErrorMessage } from '../FormErrorMessage';
import { FormFieldContextValue } from './Form.types';
import { createContextId, useContext, useContextProvider, useStore } from '@builder.io/qwik';

// Create context for form field
export const FormFieldContext = createContextId<FormFieldContextValue>('connect.form-field');

export interface FormFieldProps {
  name: string;
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  warning?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  class?: string;
  id?: string;
  validate?: import('./Form.types').FormValidationRule[];
}


export const FormField = component$<FormFieldProps>((props) => {
  const {
    name,
    label,
    helperText,
    error,
    success,
    warning,
    required,
    disabled,
    readOnly,
    class: className,
    id,
  } = props;
  
  // Generate a unique ID for the field if not provided
  const fieldId = id || `field-${name}-${Math.random().toString(36).substring(2, 9)}`;
  
  // Create the field context
  const fieldContext = useStore<FormFieldContextValue>({
    name,
    value: '',
    error,
    touched: false,
    required: required || false,
    disabled: disabled || false,
    onChange$: $(() => {}),
    onBlur$: $(() => {}),
    onFocus$: $(() => {}),
  });
  
  // Provide the context to all children
  useContextProvider(FormFieldContext, fieldContext);
  
  // Create classes for the field control
  const fieldControlClass = [
    'relative w-full',
    // State-based styling will be handled via the data attributes and global CSS
    // Disabled state
    disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : '',
    // Readonly state
    readOnly ? 'bg-gray-100 cursor-default' : '',
  ].filter(Boolean).join(' ');
  
  return (
    <div class={`flex flex-col w-full mb-2 ${className || ''}`}>
      {label && (
        <FormLabel for={fieldId} required={required}>
          {label}
        </FormLabel>
      )}
      
      <div 
        class={fieldControlClass}
        data-invalid={!!error}
        data-valid={success}
        data-warning={warning}
        data-disabled={disabled}
        data-readonly={readOnly}
      >
        <Slot />
      </div>
      
      {error ? (
        <FormErrorMessage>{error}</FormErrorMessage>
      ) : helperText ? (
        <FormHelperText>{helperText}</FormHelperText>
      ) : null}
    </div>
  );
});


export const useFormFieldContext = () => {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error('useFormFieldContext must be used within a FormField component');
  }
  return context;
};

export default FormField;
