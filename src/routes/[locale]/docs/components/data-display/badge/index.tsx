import { component$ } from "@builder.io/qwik";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground,
} from "~/components/Core/DataDisplay/Badge/docs";
import { Card } from "~/components/Core/Card/Card";
import CodeExample from "~/components/Docs/CodeExample";

export default component$(() => {
  return (
    <ComponentPage
      name="Badge"
      description="A small visual element that represents a status, category, or highlight."
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
      ComponentIntegration="Badge components integrate well with lists, tables, notifications, and content headers to provide contextual information or highlight important attributes."
      Customization="Badges can be customized through variant, size, color, shape, and content options. Additional customization is possible through CSS classes."
      defaultTab="overview"
    >
      <Card class="mb-8">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-semibold">Import</h2>
        </div>
        <CodeExample
          code={`import { 
  Badge, 
  BadgeGroup 
} from "~/components/Core/DataDisplay/Badge";`}
          language="tsx"
        />
      </Card>
    </ComponentPage>
  );
});
