import { component$ } from "@builder.io/qwik";
import { Divider } from "~/components/Core/Layout/Divider";

export const DividerSpacing = component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <p>No custom spacing (default)</p>
        <Divider />
        <p>Content after divider</p>
      </div>

      <div>
        <p>Small spacing</p>
        <Divider spacing="sm" />
        <p>Content after divider with small spacing</p>
      </div>

      <div>
        <p>Medium spacing</p>
        <Divider spacing="md" />
        <p>Content after divider with medium spacing</p>
      </div>

      <div>
        <p>Large spacing</p>
        <Divider spacing="lg" />
        <p>Content after divider with large spacing</p>
      </div>

      <div>
        <p>Extra large spacing</p>
        <Divider spacing="xl" />
        <p>Content after divider with extra large spacing</p>
      </div>
    </div>
  );
});
