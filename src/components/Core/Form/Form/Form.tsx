import { Slot, component$, useSignal, $ } from "@builder.io/qwik";
import { Form as QwikForm } from "@builder.io/qwik-city";
import type { FormProps } from "./Form.types";
import { FormProvider } from "./FormContext";
import "./Form.css";

/**
 * Enhanced form component that wraps Qwik City's Form component
 * and provides additional form state management features.
 */
export const Form = component$<FormProps>((props) => {
  const {
    id,
    name,
    action,
    method = "post",
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
  const uniqueId = useSignal<string>(
    id || `connect-form-${Math.random().toString(36).substring(2, 11)}`,
  );

  // Form element reference for native form operations
  const formRef = useSignal<HTMLFormElement>();

  // Default form options
  const defaultOptions = {
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnSubmit: true,
    revalidateOn: ["submit", "blur", "change"] as Array<
      "input" | "blur" | "change" | "submit"
    >,
    preventDefaultOnSubmit: true,
  };

  // Merged options with defaults
  const formOptions = {
    ...defaultOptions,
    ...options,
    id: uniqueId.value,
    onSubmit$,
    onValidate$,
    onError$,
    onReset$,
  };

  // Handle the native form reset
  const handleReset$ = $((event: Event) => {
    if (onReset$) {
      onReset$(event);
    }
  });

  const formClasses = `connect-form ${className || ""}`;

  // If we have a Qwik action, use the Qwik City Form component
  if (qwikAction) {
    return (
      <FormProvider {...formOptions}>
        <QwikForm
          id={uniqueId.value}
          action={qwikAction}
          spaReset={spaReset}
          reloadDocument={reloadDocument}
          class={formClasses}
        >
          <Slot />
        </QwikForm>
      </FormProvider>
    );
  }

  // Standard form without Qwik action integration
  return (
    <FormProvider {...formOptions}>
      <form
        id={uniqueId.value}
        name={name}
        action={action}
        method={method}
        enctype={encType}
        noValidate={noValidate}
        autocomplete={autocomplete}
        class={formClasses}
        ref={formRef}
        onReset$={handleReset$}
      >
        <Slot />
      </form>
    </FormProvider>
  );
});

export default Form;
