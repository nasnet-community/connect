import { component$ } from '@builder.io/qwik';
import { Card, CardBody } from '../../Card';

export default component$(() => {
  const elevations = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
  const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;

  return (
    <div class="p-4">
      <h3 class="text-lg font-medium mb-4">Card Elevations</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        {elevations.map((elevation) => (
          <Card key={elevation} elevation={elevation} class="p-4">
            <CardBody>
              <h4 class="font-medium mb-2">Elevation: {elevation}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                This card has {elevation === 'none' ? 'no' : `${elevation}`} elevation.
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
      
      <h3 class="text-lg font-medium my-6">Card Border Radius</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {radiuses.map((radius) => (
          <Card key={radius} radius={radius} elevation="sm" class="p-4">
            <CardBody>
              <h4 class="font-medium mb-2">Radius: {radius}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                This card has {radius === 'none' ? 'no' : `${radius}`} border radius.
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
});
