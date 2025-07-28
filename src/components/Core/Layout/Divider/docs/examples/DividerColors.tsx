import { component$ } from "@builder.io/qwik";
import { Divider } from "~/components/Core/Layout/Divider";

export const DividerColors = component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <p class="mb-2">Default color</p>
        <Divider color="default" />
      </div>

      <div>
        <p class="mb-2">Primary color</p>
        <Divider color="primary" />
      </div>

      <div>
        <p class="mb-2">Secondary color</p>
        <Divider color="secondary" />
      </div>

      <div>
        <p class="mb-2">Muted color</p>
        <Divider color="muted" />
      </div>
    </div>
  );
});
