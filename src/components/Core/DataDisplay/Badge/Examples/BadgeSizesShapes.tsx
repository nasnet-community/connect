import { component$ } from "@builder.io/qwik";
import { Badge, BadgeGroup } from "~/components/Core/DataDisplay/Badge";

export const BadgeSizesShapes = component$(() => {
  return (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="mb-2 text-sm font-medium">Badge Sizes</h3>
        <div class="flex items-center gap-3">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Badge Shapes</h3>
        <div class="flex items-center gap-3">
          <Badge shape="square" color="primary">
            Square
          </Badge>
          <Badge shape="rounded" color="primary">
            Rounded
          </Badge>
          <Badge shape="pill" color="primary">
            Pill Shape
          </Badge>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Badge with Icons</h3>
        <div class="flex items-center gap-3">
          <Badge color="success">
            <span class="mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Success
          </Badge>

          <Badge color="error" dismissible>
            Error
            <span class="ml-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </Badge>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Badge Group</h3>
        <BadgeGroup>
          <Badge color="primary">React</Badge>
          <Badge color="secondary">Vue</Badge>
          <Badge color="info">Angular</Badge>
          <Badge color="success">Qwik</Badge>
        </BadgeGroup>
      </div>
    </div>
  );
});
