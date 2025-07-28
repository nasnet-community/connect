import { component$ } from "@builder.io/qwik";
import { Divider } from "~/components/Core/Layout/Divider";

export const DividerThickness = component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <p class="mb-2">Thin divider (default)</p>
        <Divider thickness="thin" />
      </div>

      <div>
        <p class="mb-2">Medium divider</p>
        <Divider thickness="medium" />
      </div>

      <div>
        <p class="mb-2">Thick divider</p>
        <Divider thickness="thick" />
      </div>
    </div>
  );
});
