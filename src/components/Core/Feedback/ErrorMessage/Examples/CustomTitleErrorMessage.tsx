import { component$ } from "@builder.io/qwik";
import { ErrorMessage } from "~/components/Core/Feedback/ErrorMessage";

export const CustomTitleErrorMessage = component$(() => {
  return (
    <div class="space-y-4">
      <ErrorMessage
        title="Database Error"
        message="Unable to save your changes. The database is currently unavailable."
      />
    </div>
  );
});
