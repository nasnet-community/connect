import { component$ } from "@builder.io/qwik";
import { Card, CardBody } from "../../Card";

export default component$(() => {
  const elevations = ["none", "xs", "sm", "md", "lg", "xl"] as const;
  const radiuses = ["none", "xs", "sm", "md", "lg", "xl", "full"] as const;

  return (
    <div class="p-4">
      <h3 class="mb-4 text-lg font-medium">Card Elevations</h3>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
        {elevations.map((elevation) => (
          <Card key={elevation} elevation={elevation} class="p-4">
            <CardBody>
              <h4 class="mb-2 font-medium">Elevation: {elevation}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                This card has {elevation === "none" ? "no" : `${elevation}`}{" "}
                elevation.
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      <h3 class="my-6 text-lg font-medium">Card Border Radius</h3>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {radiuses.map((radius) => (
          <Card key={radius} radius={radius} elevation="sm" class="p-4">
            <CardBody>
              <h4 class="mb-2 font-medium">Radius: {radius}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                This card has {radius === "none" ? "no" : `${radius}`} border
                radius.
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
});
