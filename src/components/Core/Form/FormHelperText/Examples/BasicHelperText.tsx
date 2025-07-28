import { component$ } from "@builder.io/qwik";
import { FormHelperText } from "../index";

export default component$(() => {
  return (
    <div class="space-y-4">
      <div>
        <FormHelperText>Please enter your email address</FormHelperText>
      </div>

      <div>
        <FormHelperText>
          Password must be at least 8 characters long
        </FormHelperText>
      </div>

      <div>
        <FormHelperText>
          We'll never share your information with anyone else
        </FormHelperText>
      </div>
    </div>
  );
});
