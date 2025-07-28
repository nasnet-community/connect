import { component$, useSignal } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates";
import { Flex } from "~/components/Core/Layout/Flex";

export default component$(() => {
  const direction = useSignal<
    "row" | "column" | "row-reverse" | "column-reverse"
  >("row");
  const wrap = useSignal<"nowrap" | "wrap" | "wrap-reverse">("nowrap");
  const justify = useSignal<
    "start" | "center" | "end" | "between" | "around" | "evenly"
  >("start");
  const align = useSignal<"start" | "center" | "end" | "stretch" | "baseline">(
    "stretch",
  );
  const gap = useSignal<
    "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  >("md");

  return (
    <PlaygroundTemplate
      controls={[
        {
          type: "select",
          label: "Direction",
          value: direction,
          options: [
            { label: "Row", value: "row" },
            { label: "Column", value: "column" },
            { label: "Row Reverse", value: "row-reverse" },
            { label: "Column Reverse", value: "column-reverse" },
          ],
        },
        {
          type: "select",
          label: "Wrap",
          value: wrap,
          options: [
            { label: "No Wrap", value: "nowrap" },
            { label: "Wrap", value: "wrap" },
            { label: "Wrap Reverse", value: "wrap-reverse" },
          ],
        },
        {
          type: "select",
          label: "Justify Content",
          value: justify,
          options: [
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" },
            { label: "Space Between", value: "between" },
            { label: "Space Around", value: "around" },
            { label: "Space Evenly", value: "evenly" },
          ],
        },
        {
          type: "select",
          label: "Align Items",
          value: align,
          options: [
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" },
            { label: "Stretch", value: "stretch" },
            { label: "Baseline", value: "baseline" },
          ],
        },
        {
          type: "select",
          label: "Gap",
          value: gap,
          options: [
            { label: "None", value: "none" },
            { label: "Extra Small", value: "xs" },
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
            { label: "Extra Large", value: "xl" },
            { label: "2X Large", value: "2xl" },
            { label: "3X Large", value: "3xl" },
          ],
        },
      ]}
      preview={
        <div class="bg-surface-alt min-h-[300px] w-full rounded-md p-4">
          <Flex
            direction={direction.value}
            wrap={wrap.value}
            justify={justify.value}
            align={align.value}
            gap={gap.value}
            class="h-full"
          >
            <div class="bg-primary rounded-md p-4 text-white">Item 1</div>
            <div class="bg-secondary rounded-md p-4 text-white">Item 2</div>
            <div class="bg-primary rounded-md p-4 text-white">Item 3</div>
            <div class="bg-secondary rounded-md p-4 text-white">Item 4</div>
          </Flex>
        </div>
      }
      code={`
<Flex
  direction="${direction.value}"
  wrap="${wrap.value}"
  justify="${justify.value}"
  align="${align.value}"
  gap="${gap.value}"
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Flex>
      `}
    />
  );
});
