import { component$ } from "@builder.io/qwik";
import { Spinner } from "../Spinner";
import { Button } from "../../../../button";

export const SpinnerInlineExample = component$(() => {
  return (
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Inline Spinner in Buttons</h3>

      <div class="flex flex-wrap gap-4">
        {/* Primary button with inline spinner */}
        <Button variant="primary" disabled>
          <Spinner size="inline" color="white" variant="border" class="mr-2" />
          Loading...
        </Button>

        {/* Secondary button with inline spinner */}
        <Button variant="secondary" disabled>
          <Spinner
            size="inline"
            color="primary"
            variant="border"
            class="mr-2"
          />
          Processing
        </Button>

        {/* Outline button with inline spinner */}
        <Button variant="outline" disabled>
          <Spinner
            size="inline"
            color="primary"
            variant="circle"
            class="mr-2"
          />
          Saving
        </Button>

        {/* Ghost button with inline spinner */}
        <Button variant="ghost" disabled>
          <Spinner size="inline" color="primary" variant="dots" class="mr-2" />
          Deleting
        </Button>
      </div>

      <h3 class="mt-6 text-lg font-semibold">Inline Spinner in Text</h3>

      <div class="space-y-2">
        <p class="flex items-center">
          <Spinner
            size="inline"
            color="primary"
            variant="border"
            class="mr-2"
          />
          Loading user data...
        </p>

        <p class="flex items-center">
          <Spinner size="inline" color="success" variant="grow" class="mr-2" />
          Syncing files...
        </p>

        <p class="flex items-center">
          <Spinner size="inline" color="warning" variant="bars" class="mr-2" />
          Updating records...
        </p>
      </div>

      <h3 class="mt-6 text-lg font-semibold">Size Comparison</h3>

      <div class="flex items-center gap-4">
        <div class="text-center">
          <Spinner size="inline" color="primary" />
          <p class="mt-2 text-sm">inline</p>
        </div>
        <div class="text-center">
          <Spinner size="xs" color="primary" />
          <p class="mt-2 text-sm">xs</p>
        </div>
        <div class="text-center">
          <Spinner size="sm" color="primary" />
          <p class="mt-2 text-sm">sm</p>
        </div>
        <div class="text-center">
          <Spinner size="md" color="primary" />
          <p class="mt-2 text-sm">md</p>
        </div>
      </div>
    </div>
  );
});
