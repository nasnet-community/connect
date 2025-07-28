import { component$ } from "@builder.io/qwik";
import { Badge } from "~/components/Core/DataDisplay/Badge";

export const BadgeVariants = component$(() => {
  return (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="mb-2 text-sm font-medium">Solid Variant (Default)</h3>
        <div class="flex flex-wrap gap-3">
          <Badge variant="solid" color="primary">
            Primary
          </Badge>
          <Badge variant="solid" color="secondary">
            Secondary
          </Badge>
          <Badge variant="solid" color="success">
            Success
          </Badge>
          <Badge variant="solid" color="warning">
            Warning
          </Badge>
          <Badge variant="solid" color="error">
            Error
          </Badge>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Soft Variant</h3>
        <div class="flex flex-wrap gap-3">
          <Badge variant="soft" color="primary">
            Primary
          </Badge>
          <Badge variant="soft" color="secondary">
            Secondary
          </Badge>
          <Badge variant="soft" color="success">
            Success
          </Badge>
          <Badge variant="soft" color="warning">
            Warning
          </Badge>
          <Badge variant="soft" color="error">
            Error
          </Badge>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Outline Variant</h3>
        <div class="flex flex-wrap gap-3">
          <Badge variant="outline" color="primary">
            Primary
          </Badge>
          <Badge variant="outline" color="secondary">
            Secondary
          </Badge>
          <Badge variant="outline" color="success">
            Success
          </Badge>
          <Badge variant="outline" color="warning">
            Warning
          </Badge>
          <Badge variant="outline" color="error">
            Error
          </Badge>
        </div>
      </div>
    </div>
  );
});
