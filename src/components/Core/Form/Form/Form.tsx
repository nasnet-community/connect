import { Slot, component$, useSignal, $ } from '@builder.io/qwik';
import { Form as QwikForm } from '@builder.io/qwik-city';
import type { FormProps } from './Form.types';
import { FormProvider } from './FormContext';

/**
 * Enhanced form component that wraps Qwik City's Form component
 * and provides additional form state management features.
 */
export const Form = component$<FormProps>((props) => {
  const {
    id,
    name,
    action,
    method = 'post',
    encType,
    noValidate = true,
    autocomplete,
    class: className,
    onSubmit$,
    onValidate$,
    onError$,
    onReset$,
    qwikAction,
    spaReset,
    reloadDocument,
    ...options
  } = props;

  // Create a unique ID for the form if not provided
  const uniqueId = useSignal<string>(id || `connect-form-${Math.random().toString(36).substring(2, 11)}`);
  
  // Form element reference for native form operations
  const formRef = useSignal<HTMLFormElement>();
  
  // Default form options
  const defaultOptions = {
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnSubmit: true,
    revalidateOn: ['submit', 'blur', 'change'] as Array<'input' | 'blur' | 'change' | 'submit'>,
    preventDefaultOnSubmit: true,
  };
  
  // Merged options with defaults
  const mergedOptions = {
    ...defaultOptions,
    ...options
  };
  
  // Handle the native form reset
  const handleReset$ = $((event: Event) => {
    if (onReset$) {
      onReset$(event);
    }
  });

  // If we have a Qwik action, use the Qwik City Form component
  if (qwikAction) {
    return (
      <FormProvider
        id={uniqueId.value}
        options={mergedOptions}
        onSubmit$={onSubmit$}
        onValidate$={onValidate$}
        onError$={onError$}
        onReset$={onReset$}
      >
        <QwikForm
          id={uniqueId.value}
          action={qwikAction}
          spaReset={spaReset}
          reloadDocument={reloadDocument}
          class={`w-full flex flex-col gap-4 focus-within:outline-none group ${className || ''}`}
        >
          {/* Apply styles for form children with data attributes */}
          <style
            dangerouslySetInnerHTML={`
              .group [data-invalid="true"] > :not(style) {
                border-color: #DC2626;
              }
              .group [data-valid="true"] > :not(style) {
                border-color: #22C55E;
              }
              .group [data-warning="true"] > :not(style) {
                border-color: #EAB308;
              }
            `}
          />
          <Slot />
        </QwikForm>
      </FormProvider>
    );
  }
  
  // Standard form without Qwik action integration
  return (
    <FormProvider
      id={uniqueId.value}
      options={mergedOptions}
      onSubmit$={onSubmit$}
      onValidate$={onValidate$}
      onError$={onError$}
      onReset$={onReset$}
    >
      <form
        id={uniqueId.value}
        name={name}
        action={action}
        method={method}
        enctype={encType}
        noValidate={noValidate}
        autocomplete={autocomplete}
        class={`w-full flex flex-col gap-4 focus-within:outline-none group ${className || ''}`}
        ref={formRef}
        onReset$={handleReset$}
      >
        {/* Apply styles for form children with data attributes */}
        <style
          dangerouslySetInnerHTML={`
            .group [data-invalid="true"] > :not(style) {
              border-color: #DC2626;
            }
            .group [data-valid="true"] > :not(style) {
              border-color: #22C55E;
            }
            .group [data-warning="true"] > :not(style) {
              border-color: #EAB308;
            }
          `}
        />
        <Slot />
      </form>
    </FormProvider>
  );
});

export default Form;
