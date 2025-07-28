import { component$ } from "@builder.io/qwik";
import { FormHelperText } from "../index";

export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Default State</h3>
        <FormHelperText>This is a normal helper text message</FormHelperText>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Disabled State</h3>
        <FormHelperText disabled>
          This field is currently disabled
        </FormHelperText>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Error State</h3>
        <FormHelperText error>Your password is too short</FormHelperText>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Success State</h3>
        <FormHelperText success>Username is available</FormHelperText>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Warning State</h3>
        <FormHelperText warning>
          Your password is not very strong
        </FormHelperText>
      </div>
    </div>
  );
});
