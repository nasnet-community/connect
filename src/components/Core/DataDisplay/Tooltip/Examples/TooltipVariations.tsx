import { component$ } from "@builder.io/qwik";
import { Tooltip } from "~/components/Core/DataDisplay/Tooltip";
import { Button } from "~/components/Core/button";

export const TooltipVariations = component$(() => {
  return (
    <div class="flex flex-col gap-8">
      {/* Tooltip Colors */}
      <div>
        <h3 class="mb-2 text-sm font-medium">Tooltip Colors</h3>
        <div class="flex flex-wrap gap-2">
          <Tooltip content="Default tooltip" color="default">
            <Button variant="outline" size="sm">
              Default
            </Button>
          </Tooltip>

          <Tooltip content="Primary tooltip" color="primary">
            <Button variant="outline" size="sm">
              Primary
            </Button>
          </Tooltip>

          <Tooltip content="Secondary tooltip" color="secondary">
            <Button variant="outline" size="sm">
              Secondary
            </Button>
          </Tooltip>

          <Tooltip content="Success tooltip" color="success">
            <Button variant="outline" size="sm">
              Success
            </Button>
          </Tooltip>

          <Tooltip content="Warning tooltip" color="warning">
            <Button variant="outline" size="sm">
              Warning
            </Button>
          </Tooltip>

          <Tooltip content="Error tooltip" color="error">
            <Button variant="outline" size="sm">
              Error
            </Button>
          </Tooltip>

          <Tooltip content="Info tooltip" color="info">
            <Button variant="outline" size="sm">
              Info
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Tooltip Sizes */}
      <div>
        <h3 class="mb-2 text-sm font-medium">Tooltip Sizes</h3>
        <div class="flex gap-2">
          <Tooltip content="Small tooltip" size="sm">
            <Button variant="outline" size="sm">
              Small
            </Button>
          </Tooltip>

          <Tooltip content="Medium tooltip (default)" size="md">
            <Button variant="outline" size="sm">
              Medium
            </Button>
          </Tooltip>

          <Tooltip content="Large tooltip" size="lg">
            <Button variant="outline" size="sm">
              Large
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Tooltip Trigger Types */}
      <div>
        <h3 class="mb-2 text-sm font-medium">Tooltip Trigger Types</h3>
        <div class="flex gap-2">
          <Tooltip content="Hover to show (default)" trigger="hover">
            <Button variant="outline" size="sm">
              Hover
            </Button>
          </Tooltip>

          <Tooltip content="Click to show/hide" trigger="click">
            <Button variant="outline" size="sm">
              Click
            </Button>
          </Tooltip>

          <Tooltip content="Focus to show" trigger="focus">
            <Button variant="outline" size="sm">
              Focus
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Interactive Tooltip */}
      <div>
        <h3 class="mb-2 text-sm font-medium">Interactive Tooltip</h3>
        <Tooltip
          content={
            <div class="flex flex-col gap-2">
              <p>
                This tooltip is interactive. You can hover over it without it
                disappearing.
              </p>
              <Button size="sm">Clickable Button</Button>
            </div>
          }
          interactive={true}
        >
          <Button variant="outline">Interactive Tooltip</Button>
        </Tooltip>
      </div>

      {/* With Custom Delay */}
      <div>
        <h3 class="mb-2 text-sm font-medium">Tooltip with Custom Delay</h3>
        <div class="flex gap-2">
          <Tooltip content="Fast show (100ms)" delay={100}>
            <Button variant="outline" size="sm">
              Fast Show
            </Button>
          </Tooltip>

          <Tooltip content="Slow show (1000ms)" delay={1000}>
            <Button variant="outline" size="sm">
              Slow Show
            </Button>
          </Tooltip>

          <Tooltip content="Slow hide (1000ms)" hideDelay={1000}>
            <Button variant="outline" size="sm">
              Slow Hide
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
});
