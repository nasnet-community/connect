import { component$ } from '@builder.io/qwik';
import { Card, CardBody } from '~/components/Core/DataDisplay/Card';

export const CardVariants = component$(() => {
  return (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="text-sm font-medium mb-2">Default Variant</h3>
        <Card variant="default">
          <CardBody>
            <p>Default card with subtle styling</p>
          </CardBody>
        </Card>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Elevated Variant</h3>
        <Card variant="elevated">
          <CardBody>
            <p>Elevated card with shadow for depth</p>
          </CardBody>
        </Card>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Outlined Variant</h3>
        <Card variant="outlined">
          <CardBody>
            <p>Outlined card with border</p>
          </CardBody>
        </Card>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Filled Variant</h3>
        <Card variant="filled">
          <CardBody>
            <p>Filled card with background color</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
});
