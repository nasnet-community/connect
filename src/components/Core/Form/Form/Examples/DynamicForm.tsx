import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { Form } from "../index";
import { Field } from "../../Field";
import { TextArea } from "../../TextArea";
import { Button } from "../../../button";

export default component$(() => {
  // Store to keep track of dynamic form fields
  const formData = useStore({
    items: [{ id: 1, name: "", quantity: 1 }],
  });

  const submittedData = useSignal<any>(null);

  // Add a new item to the form
  const addItem$ = $(() => {
    const newId =
      formData.items.length > 0
        ? Math.max(...formData.items.map((item) => item.id)) + 1
        : 1;

    formData.items.push({ id: newId, name: "", quantity: 1 });
  });

  // Remove an item from the form
  const removeItem$ = $((id: number) => {
    if (formData.items.length > 1) {
      formData.items = formData.items.filter((item) => item.id !== id);
    }
  });

  return (
    <div class="max-w-md">
      <h3 class="mb-4 font-medium">Dynamic Order Form</h3>

      <Form
        onSubmit$={(values) => {
          console.log("Form submitted with values:", values);
          submittedData.value = values;
        }}
      >
        <Field
          id="customer"
          label="Customer Name"
          required
          placeholder="Enter customer name"
        />

        <div class="mb-4 rounded-md border p-4 dark:border-gray-700">
          <h4 class="mb-3 text-sm font-medium">Order Items</h4>

          {formData.items.map((item) => (
            <div key={item.id} class="mb-3 flex gap-2">
              <Field
                id={`item_${item.id}_name`}
                placeholder="Item name"
                class="flex-1"
              />

              <Field
                id={`item_${item.id}_quantity`}
                type="number"
                placeholder="Qty"
                class="w-20"
              />

              <Button
                variant="ghost"
                class="text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                type="button"
                onClick$={() => removeItem$(item.id)}
                disabled={formData.items.length === 1}
              >
                <span class="i-lucide-trash" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick$={addItem$}
            class="mt-2"
          >
            <span class="i-lucide-plus mr-1" /> Add Item
          </Button>
        </div>

        <TextArea
          id="notes"
          label="Order Notes"
          placeholder="Any special instructions"
          rows={3}
        />

        <Button type="submit" variant="primary">
          Submit Order
        </Button>
      </Form>

      {submittedData.value && (
        <div class="mt-6 rounded-md border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <h3 class="mb-2 font-medium">Submitted Order</h3>
          <pre class="overflow-auto rounded bg-white p-2 text-sm dark:bg-gray-800">
            {JSON.stringify(submittedData.value, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
});
