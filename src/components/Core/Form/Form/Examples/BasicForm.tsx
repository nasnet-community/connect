import { component$, useSignal } from "@builder.io/qwik";
import { Form } from "../index";
import { Field } from "../../Field";
import { Button } from "../../../button";

export default component$(() => {
  const formSubmitted = useSignal(false);
  const formValues = useSignal<Record<string, any>>({});

  return (
    <div class="space-y-6">
      <Form
        onSubmit$={(values) => {
          formSubmitted.value = true;
          formValues.value = values;
          console.log("Form submitted with values:", values);
        }}
        class="max-w-md"
      >
        <Field
          label="Full Name"
          required
          placeholder="Enter your full name"
          id="name"
        />

        <Field
          label="Email Address"
          type="email"
          required
          placeholder="your.email@example.com"
          id="email"
        />

        <Button type="submit" variant="primary">
          Submit Form
        </Button>
      </Form>

      {formSubmitted.value && (
        <div class="mt-4 rounded-md border border-green-200 bg-green-100 p-4 dark:border-green-800 dark:bg-green-900/20">
          <h3 class="mb-2 font-medium">Form Submitted Successfully</h3>
          <pre class="overflow-auto rounded bg-white p-2 text-sm dark:bg-gray-800">
            {JSON.stringify(formValues.value, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
});
