import { component$ } from '@builder.io/qwik';
import { Card, CardHeader, CardBody, CardFooter } from '~/components/Core/DataDisplay/Card';

export const BasicCard = component$(() => {
  return (
    <Card>
      <CardHeader>
        <h3 class="text-lg font-medium">Card Title</h3>
      </CardHeader>
      <CardBody>
        <p>This is a basic card example with header, body, and footer sections. Cards are used to group related content and actions.</p>
      </CardBody>
      <CardFooter>
        <div class="flex justify-end space-x-2">
          <button class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded dark:bg-gray-700 dark:hover:bg-gray-600">Cancel</button>
          <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Save</button>
        </div>
      </CardFooter>
    </Card>
  );
});
