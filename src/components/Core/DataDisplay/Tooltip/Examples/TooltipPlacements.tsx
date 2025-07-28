import { component$ } from "@builder.io/qwik";
import { Tooltip } from "~/components/Core/DataDisplay/Tooltip";
import { Button } from "~/components/Core/button";

export const TooltipPlacements = component$(() => {
  return (
    <div class="p-4">
      <h3 class="mb-4 text-sm font-medium">Tooltip Placements</h3>

      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div class="flex justify-center">
          <Tooltip content="Top placement" placement="top">
            <Button size="sm">Top</Button>
          </Tooltip>
        </div>

        <div class="flex justify-center">
          <Tooltip content="Top-start placement" placement="top-start">
            <Button size="sm">Top Start</Button>
          </Tooltip>
        </div>

        <div class="flex justify-center">
          <Tooltip content="Top-end placement" placement="top-end">
            <Button size="sm">Top End</Button>
          </Tooltip>
        </div>

        <div class="flex justify-center">
          <Tooltip content="Right placement" placement="right">
            <Button size="sm">Right</Button>
          </Tooltip>
        </div>

        <div class="flex justify-center">
          <Tooltip content="Right-start placement" placement="right-start">
            <Button size="sm">Right Start</Button>
          </Tooltip>
        </div>

        <div class="flex justify-center">
          <Tooltip content="Right-end placement" placement="right-end">
            <Button size="sm">Right End</Button>
          </Tooltip>
        </div>

        <div class="flex justify-center">
          <Tooltip content="Bottom placement" placement="bottom">
            <Button size="sm">Bottom</Button>
          </Tooltip>
        </div>

        <div class="flex justify-center">
          <Tooltip content="Bottom-start placement" placement="bottom-start">
            <Button size="sm">Bottom Start</Button>
          </Tooltip>
        </div>

        <div class="flex justify-center">
          <Tooltip content="Bottom-end placement" placement="bottom-end">
            <Button size="sm">Bottom End</Button>
          </Tooltip>
        </div>

        <div class="flex justify-center">
          <Tooltip content="Left placement" placement="left">
            <Button size="sm">Left</Button>
          </Tooltip>
        </div>

        <div class="flex justify-center">
          <Tooltip content="Left-start placement" placement="left-start">
            <Button size="sm">Left Start</Button>
          </Tooltip>
        </div>

        <div class="flex justify-center">
          <Tooltip content="Left-end placement" placement="left-end">
            <Button size="sm">Left End</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
});
