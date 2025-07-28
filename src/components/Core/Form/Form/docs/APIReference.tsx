import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type MethodDetail,
} from "~/components/Docs/templates";

/**
 * Form component API reference documentation using the standard template
 */
export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "id",
      type: "string",
      description: "ID attribute for the form element",
    },
    {
      name: "name",
      type: "string",
      description: "Name attribute for the form element",
    },
    {
      name: "action",
      type: "string",
      description: "Action URL for form submission",
    },
    {
      name: "method",
      type: "'get' | 'post' | 'put' | 'delete'",
      description: "HTTP method for form submission",
    },
    {
      name: "encType",
      type: "'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'",
      description: "Encoding type for form submission",
    },
    {
      name: "noValidate",
      type: "boolean",
      defaultValue: "false",
      description: "Disable browser's native form validation",
    },
    {
      name: "autocomplete",
      type: "'on' | 'off'",
      description: "Enable/disable browser autocomplete",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "initialValues",
      type: "Record<string, any>",
      defaultValue: "{}",
      description: "Initial values for form fields",
    },
    {
      name: "validateOnMount",
      type: "boolean",
      defaultValue: "false",
      description: "Run validation when form mounts",
    },
    {
      name: "validateOnChange",
      type: "boolean",
      defaultValue: "true",
      description: "Run validation when field values change",
    },
    {
      name: "validateOnBlur",
      type: "boolean",
      defaultValue: "true",
      description: "Run validation when fields are blurred",
    },
    {
      name: "validateOnSubmit",
      type: "boolean",
      defaultValue: "true",
      description: "Run validation on form submission",
    },
    {
      name: "resetAfterSubmit",
      type: "boolean",
      defaultValue: "false",
      description: "Reset form after successful submission",
    },
    {
      name: "onSubmit$",
      type: "QRL<(values: Record<string, any>) => void | Promise<void>>",
      description: "Callback to run on form submission",
    },
    {
      name: "onReset$",
      type: "QRL<(values: Record<string, any>) => void | Promise<void>>",
      description: "Callback to run when form is reset",
    },
    {
      name: "qwikAction",
      type: "ActionStore<any, Record<string, any> | undefined>",
      description: "Qwik City action store for server actions",
    },
    {
      name: "spaReset",
      type: "boolean",
      defaultValue: "false",
      description: "Reset form in SPA mode",
    },
    {
      name: "reloadDocument",
      type: "boolean",
      defaultValue: "false",
      description: "Reload document on form submission",
    },
  ];

  const methods: MethodDetail[] = [
    {
      name: "registerField$",
      description: "Register a field in the form",
      args: "(name: string, options?: FormFieldOptions) => void",
      returnType: "void",
    },
    {
      name: "unregisterField$",
      description: "Remove a field from the form",
      args: "(name: string) => void",
      returnType: "void",
    },
    {
      name: "setFieldValue$",
      description: "Set a field's value",
      args: "(name: string, value: any) => void",
      returnType: "void",
    },
    {
      name: "setValues$",
      description: "Set multiple field values at once",
      args: "(values: Record<string, any>) => void",
      returnType: "void",
    },
    {
      name: "setFieldTouched$",
      description: "Mark a field as touched or untouched",
      args: "(name: string, touched: boolean) => void",
      returnType: "void",
    },
    {
      name: "setFieldError$",
      description: "Set an error message for a field",
      args: "(name: string, error?: string) => void",
      returnType: "void",
    },
    {
      name: "validateField$",
      description: "Validate a specific field",
      args: "(name: string) => Promise<void>",
      returnType: "Promise<void>",
    },
    {
      name: "validateForm$",
      description: "Validate the entire form",
      args: "() => Promise<boolean>",
      returnType: "Promise<boolean>",
    },
    {
      name: "resetForm$",
      description: "Reset the form to its initial state",
      args: "() => void",
      returnType: "void",
    },
    {
      name: "handleSubmit$",
      description: "Submit the form",
      args: "(e?: Event) => Promise<void>",
      returnType: "Promise<void>",
    },
  ];

  return (
    <APIReferenceTemplate props={props} methods={methods}>
      <p>
        The Form component provides a comprehensive API for building and
        managing forms. It includes props for form configuration, methods for
        form state management, and integration with Qwik City for server
        actions.
      </p>
      <p class="mt-3">
        Additionally, the Form component provides a context that exposes various
        methods for interacting with the form state from child components. This
        allows for powerful form composition and custom field implementations.
      </p>
    </APIReferenceTemplate>
  );
});
