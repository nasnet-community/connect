import { component$, useSignal } from "@builder.io/qwik";
import { Field } from "../index";

export default component$(() => {
  const textValue = useSignal("");
  const emailValue = useSignal("");
  const numberValue = useSignal<number | string>("");
  const passwordValue = useSignal("");
  const dateValue = useSignal("");
  const checkboxValue = useSignal(false);
  const radioValue = useSignal(false);

  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Text Field</h3>
        <Field
          type="text"
          label="Text input"
          value={textValue.value}
          onValueChange$={(value) => (textValue.value = value as string)}
          placeholder="Enter text"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Email Field</h3>
        <Field
          type="email"
          label="Email input"
          value={emailValue.value}
          onValueChange$={(value) => (emailValue.value = value as string)}
          placeholder="Enter email"
          helperText="We'll never share your email"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Number Field</h3>
        <Field
          type="number"
          label="Number input"
          value={numberValue.value}
          onValueChange$={(value) => (numberValue.value = value as number)}
          placeholder="Enter number"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Password Field</h3>
        <Field
          type="password"
          label="Password input"
          value={passwordValue.value}
          onValueChange$={(value) => (passwordValue.value = value as string)}
          placeholder="Enter password"
          helperText="Your password is encrypted"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Date Field</h3>
        <Field
          type="date"
          label="Date input"
          value={dateValue.value}
          onValueChange$={(value) => (dateValue.value = value as string)}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Checkbox Field</h3>
        <Field
          type="checkbox"
          label="Accept terms and conditions"
          value={checkboxValue.value}
          onValueChange$={(value) => (checkboxValue.value = value as boolean)}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Radio Field</h3>
        <Field
          type="radio"
          label="Agree to receive communications"
          value={radioValue.value}
          onValueChange$={(value) => (radioValue.value = value as boolean)}
        />
      </div>
    </div>
  );
});
