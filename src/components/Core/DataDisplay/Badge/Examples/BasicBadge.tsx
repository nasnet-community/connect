import { component$ } from "@builder.io/qwik";
import { Badge } from "~/components/Core/DataDisplay/Badge";

export const BasicBadge = component$(() => {
  return (
    <div class="flex flex-wrap gap-4">
      <Badge>Default</Badge>
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="error">Error</Badge>
      <Badge color="info">Info</Badge>
    </div>
  );
});
