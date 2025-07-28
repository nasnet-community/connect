import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";
import { Tooltip } from "../index";
import { Button } from "~/components/Core/button";

export default component$(() => {
  return (
    <OverviewTemplate
      title="Tooltip"
      keyFeatures={[
        "Multiple placement options (top, bottom, left, right, and variations)",
        "Different color variants for various contexts",
        "Multiple trigger types (hover, click, focus)",
        "Customizable appearance (size, width, arrow)",
        "Delay options for showing and hiding",
        "Interactive tooltips that remain visible when hovered",
        "Accessible with keyboard navigation support",
        "Support for both simple text and rich content",
      ]}
      whenToUse={[
        "When you need to provide additional context without cluttering the UI",
        "For form field labels or help text",
        "To explain icons or buttons with minimal text",
        "For providing definitions or explanations",
      ]}
      whenNotToUse={[
        "For critical information that users must see",
        "On mobile devices where hover interactions don't work well",
        "For very long content that would be better as a modal or separate page",
      ]}
    >
      <p>
        A small informative message that appears when a user hovers over,
        focuses on, or clicks an element.
      </p>
      <p>
        <strong>Import:</strong>{" "}
        <code>
          import {"{ Tooltip }"} from '~/components/Core/DataDisplay/Tooltip';
        </code>
      </p>
      <div class="flex flex-wrap justify-center gap-4 rounded-md border border-neutral-200 p-8 dark:border-neutral-700">
        <Tooltip
          content="This is a tooltip that provides additional information"
          placement="top"
        >
          <Button>Hover me</Button>
        </Tooltip>

        <Tooltip
          content={
            <div class="flex flex-col gap-1">
              <p class="font-semibold">Rich Content Tooltip</p>
              <p>You can include complex content within tooltips</p>
              <p class="text-blue-500">With different styling</p>
            </div>
          }
          color="primary"
          placement="bottom"
        >
          <Button variant="outline">Rich Content</Button>
        </Tooltip>

        <Tooltip
          content="Click-triggered tooltip"
          trigger="click"
          color="secondary"
          placement="right"
        >
          <Button variant="ghost">Click me</Button>
        </Tooltip>
      </div>
    </OverviewTemplate>
  );
});
