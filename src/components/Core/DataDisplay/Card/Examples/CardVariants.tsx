import { component$ } from "@builder.io/qwik";
import { Card, CardBody } from "~/components/Core/DataDisplay/Card";

export const CardVariants = component$(() => {
  return (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="mb-2 text-sm font-medium">Default Variant</h3>
        <Card variant="default">
          <CardBody>
            <p>Default card with subtle styling</p>
          </CardBody>
        </Card>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Card with Elevation</h3>
        <Card variant="default" elevation="lg">
          <CardBody>
            <p>Card with shadow elevation for depth</p>
          </CardBody>
        </Card>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Outlined Variant</h3>
        <Card variant="outlined">
          <CardBody>
            <p>Outlined card with border</p>
          </CardBody>
        </Card>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Filled Variant</h3>
        <Card variant="filled">
          <CardBody>
            <p>Filled card with background color</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
});
