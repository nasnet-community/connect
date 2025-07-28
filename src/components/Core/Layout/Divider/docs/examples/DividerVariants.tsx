import { component$ } from "@builder.io/qwik";
import { Divider } from "~/components/Core/Layout/Divider";

export const DividerVariants = component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <p class="mb-2">Solid divider (default)</p>
        <Divider variant="solid" />
      </div>

      <div>
        <p class="mb-2">Dashed divider</p>
        <Divider variant="dashed" />
      </div>

      <div>
        <p class="mb-2">Dotted divider</p>
        <Divider variant="dotted" />
      </div>
    </div>
  );
});
