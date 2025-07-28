import { component$ } from "@builder.io/qwik";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground,
} from "~/components/Core/DataDisplay/Avatar/docs";
import { Card } from "~/components/Core/Card/Card";
import CodeExample from "~/components/Docs/CodeExample";

export default component$(() => {
  return (
    <ComponentPage
      name="Avatar"
      description="A graphical representation of a user or entity with support for images, initials, and icons."
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
      ComponentIntegration="Avatar components integrate well with navigation elements, user profiles, comment systems, and any interface requiring user representation."
      Customization="Avatars can be customized through size, shape, color variants, and status indicators. Additional customization is possible through CSS classes."
      defaultTab="overview"
    >
      <Card class="mb-8">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-semibold">Import</h2>
        </div>
        <CodeExample
          code={`import { 
  Avatar, 
  AvatarGroup 
} from "~/components/Core/DataDisplay/Avatar";`}
          language="tsx"
        />
      </Card>
    </ComponentPage>
  );
});
