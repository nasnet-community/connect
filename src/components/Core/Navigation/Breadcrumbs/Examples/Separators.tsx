import { component$ } from "@builder.io/qwik";
import { Breadcrumbs } from "../../Breadcrumbs";

export default component$(() => {
  const items = [
    { label: "Home", href: "#" },
    { label: "Products", href: "#" },
    { label: "Current Page", isCurrent: true },
  ];

  return (
    <div class="space-y-8 p-4">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Default Separator ('/')</h3>
        <Breadcrumbs items={items} separator="/" />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Arrow Separator ('&gt;')</h3>
        <Breadcrumbs items={items} separator="&gt;" />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Dash Separator ('-')</h3>
        <Breadcrumbs items={items} separator="-" />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Bullet Separator ('•')</h3>
        <Breadcrumbs items={items} separator="•" />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Pipe Separator ('|')</h3>
        <Breadcrumbs items={items} separator="|" />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Custom Separator</h3>
        <Breadcrumbs
          items={items}
          separator={<span class="font-bold text-blue-500">&raquo;</span>}
        />
      </div>
    </div>
  );
});
