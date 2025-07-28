import { component$ } from "@builder.io/qwik";
import { FormHelperText } from "../index";

export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Helper Text with Info Icon</h3>
        <FormHelperText icon={<span class="i-lucide-info h-4 w-4" />}>
          Your password must be at least 8 characters
        </FormHelperText>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Error Helper Text with Icon</h3>
        <FormHelperText
          error
          icon={<span class="i-lucide-alert-circle h-4 w-4" />}
        >
          Please enter a valid email address
        </FormHelperText>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">
          Success Helper Text with Icon
        </h3>
        <FormHelperText
          success
          icon={<span class="i-lucide-check-circle h-4 w-4" />}
        >
          Your email has been verified
        </FormHelperText>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">
          Warning Helper Text with Icon
        </h3>
        <FormHelperText
          warning
          icon={<span class="i-lucide-alert-triangle h-4 w-4" />}
        >
          Your session will expire in 5 minutes
        </FormHelperText>
      </div>
    </div>
  );
});
