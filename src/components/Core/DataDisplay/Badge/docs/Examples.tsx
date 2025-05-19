import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate } from '~/components/Docs/templates/ExamplesTemplate';
import { CodeExample } from '~/components/Docs/CodeExample';
import { Card } from '~/components/Core/Card/Card';
import { Badge, BadgeGroup } from '~/components/Core/DataDisplay/Badge';
import { HiCheckCircleMiniSolid, HiXMarkMiniSolid } from '@qwikest/icons/heroicons';

export default component$(() => {
  return (
    <ExamplesTemplate>
      {/* Basic Example */}
      <Card class="mb-6">
        <div class="mb-3">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Basic Badge</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            The most basic usage of Badge component.
          </p>
        </div>
        <div class="flex flex-wrap gap-4 items-center p-4 border rounded-md dark:border-gray-700 mb-4">
          <Badge>Default</Badge>
          <Badge color="primary">Primary</Badge>
          <Badge color="secondary">Secondary</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="error">Error</Badge>
          <Badge color="info">Info</Badge>
        </div>
        <CodeExample
          code={`<Badge>Default</Badge>
<Badge color="primary">Primary</Badge>
<Badge color="secondary">Secondary</Badge>
<Badge color="success">Success</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="error">Error</Badge>
<Badge color="info">Info</Badge>`}
          language="tsx"
        />
      </Card>

      {/* Badge Variants */}
      <Card class="mb-6">
        <div class="mb-3">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Badge Variants</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            Badges come in three variants: solid (default), soft, and outline.
          </p>
        </div>
        <div class="flex flex-wrap gap-4 items-center p-4 border rounded-md dark:border-gray-700 mb-4">
          <div>
            <p class="text-sm mb-2">Solid</p>
            <div class="flex gap-2">
              <Badge variant="solid" color="primary">Solid</Badge>
              <Badge variant="solid" color="success">Solid</Badge>
              <Badge variant="solid" color="error">Solid</Badge>
            </div>
          </div>
          <div>
            <p class="text-sm mb-2">Soft</p>
            <div class="flex gap-2">
              <Badge variant="soft" color="primary">Soft</Badge>
              <Badge variant="soft" color="success">Soft</Badge>
              <Badge variant="soft" color="error">Soft</Badge>
            </div>
          </div>
          <div>
            <p class="text-sm mb-2">Outline</p>
            <div class="flex gap-2">
              <Badge variant="outline" color="primary">Outline</Badge>
              <Badge variant="outline" color="success">Outline</Badge>
              <Badge variant="outline" color="error">Outline</Badge>
            </div>
          </div>
        </div>
        <CodeExample
          code={`// Solid Variant
<Badge variant="solid" color="primary">Solid</Badge>
<Badge variant="solid" color="success">Solid</Badge>
<Badge variant="solid" color="error">Solid</Badge>

// Soft Variant
<Badge variant="soft" color="primary">Soft</Badge>
<Badge variant="soft" color="success">Soft</Badge>
<Badge variant="soft" color="error">Soft</Badge>

// Outline Variant
<Badge variant="outline" color="primary">Outline</Badge>
<Badge variant="outline" color="success">Outline</Badge>
<Badge variant="outline" color="error">Outline</Badge>`}
          language="tsx"
        />
      </Card>

      {/* Badge Sizes */}
      <Card class="mb-6">
        <div class="mb-3">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Badge Sizes</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            Badges are available in three sizes: sm, md (default), and lg.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-4 p-4 border rounded-md dark:border-gray-700 mb-4">
          <Badge size="sm" color="primary">Small</Badge>
          <Badge size="md" color="primary">Medium</Badge>
          <Badge size="lg" color="primary">Large</Badge>
        </div>
        <CodeExample
          code={`<Badge size="sm" color="primary">Small</Badge>
<Badge size="md" color="primary">Medium</Badge>
<Badge size="lg" color="primary">Large</Badge>`}
          language="tsx"
        />
      </Card>

      {/* Badge Shapes */}
      <Card class="mb-6">
        <div class="mb-3">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Badge Shapes</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            Badges can have different shapes: square, rounded (default), and pill.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-4 p-4 border rounded-md dark:border-gray-700 mb-4">
          <Badge shape="square" color="primary">Square</Badge>
          <Badge shape="rounded" color="primary">Rounded</Badge>
          <Badge shape="pill" color="primary">Pill</Badge>
        </div>
        <CodeExample
          code={`<Badge shape="square" color="primary">Square</Badge>
<Badge shape="rounded" color="primary">Rounded</Badge>
<Badge shape="pill" color="primary">Pill</Badge>`}
          language="tsx"
        />
      </Card>

      {/* Badges with Icons */}
      <Card class="mb-6">
        <div class="mb-3">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Badges with Icons</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            Badges can include icons at the start or end positions.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-4 p-4 border rounded-md dark:border-gray-700 mb-4">
          <Badge 
            color="success" 
            startIcon={<HiCheckCircleMiniSolid class="h-3.5 w-3.5" />}
          >
            Completed
          </Badge>
          <Badge 
            color="error" 
            endIcon={<HiXMarkMiniSolid class="h-3.5 w-3.5" />}
          >
            Rejected
          </Badge>
          <Badge
            color="primary"
            startIcon={<span class="h-2 w-2 rounded-full bg-blue-400"></span>}
          >
            Status
          </Badge>
        </div>
        <CodeExample
          code={`<Badge 
  color="success" 
  startIcon={<HiCheckCircleMiniSolid class="h-3.5 w-3.5" />}
>
  Completed
</Badge>

<Badge 
  color="error" 
  endIcon={<HiXMarkMiniSolid class="h-3.5 w-3.5" />}
>
  Rejected
</Badge>

<Badge
  color="primary"
  startIcon={<span class="h-2 w-2 rounded-full bg-blue-400"></span>}
>
  Status
</Badge>`}
          language="tsx"
        />
      </Card>

      {/* Dismissible Badges */}
      <Card class="mb-6">
        <div class="mb-3">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Dismissible Badges</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            Badges can be dismissible with a close button and custom handler.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-4 p-4 border rounded-md dark:border-gray-700 mb-4">
          <Badge 
            color="primary" 
            dismissible 
            onDismiss$={() => console.log('Badge dismissed')}
          >
            Click X to dismiss
          </Badge>
          <Badge 
            variant="soft"
            color="info" 
            dismissible 
            onDismiss$={() => console.log('Info badge dismissed')}
          >
            Dismissible
          </Badge>
        </div>
        <CodeExample
          code={`<Badge 
  color="primary" 
  dismissible 
  onDismiss$={() => console.log('Badge dismissed')}
>
  Click X to dismiss
</Badge>

<Badge 
  variant="soft"
  color="info" 
  dismissible 
  onDismiss$={() => console.log('Info badge dismissed')}
>
  Dismissible
</Badge>`}
          language="tsx"
        />
      </Card>

      {/* Badge Group */}
      <Card class="mb-6">
        <div class="mb-3">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Badge Group</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            Group multiple badges together with consistent spacing and alignment.
          </p>
        </div>
        <div class="p-4 border rounded-md dark:border-gray-700 mb-4">
          <BadgeGroup>
            <Badge color="primary">React</Badge>
            <Badge color="primary">Vue</Badge>
            <Badge color="primary">Angular</Badge>
            <Badge color="primary">Svelte</Badge>
            <Badge color="primary">Qwik</Badge>
          </BadgeGroup>
        </div>
        <CodeExample
          code={`<BadgeGroup>
  <Badge color="primary">React</Badge>
  <Badge color="primary">Vue</Badge>
  <Badge color="primary">Angular</Badge>
  <Badge color="primary">Svelte</Badge>
  <Badge color="primary">Qwik</Badge>
</BadgeGroup>`}
          language="tsx"
        />
      </Card>
    </ExamplesTemplate>
  );
});
