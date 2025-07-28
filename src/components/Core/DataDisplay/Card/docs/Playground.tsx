import { component$ } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates";
import { Card, CardHeader, CardBody, CardFooter } from "../../Card";

export default component$(() => {
  const propControls = {
    Card: [
      {
        name: "variant",
        type: "select",
        options: ["default", "outlined", "filled"],
        defaultValue: "default",
      },
      {
        name: "elevation",
        type: "select",
        options: ["none", "xs", "sm", "md", "lg", "xl"],
        defaultValue: "sm",
      },
      {
        name: "radius",
        type: "select",
        options: ["none", "xs", "sm", "md", "lg", "xl", "full"],
        defaultValue: "md",
      },
      {
        name: "hoverEffect",
        type: "select",
        options: ["none", "raise", "border", "shadow"],
        defaultValue: "none",
      },
      {
        name: "interactive",
        type: "boolean",
        defaultValue: false,
      },
      {
        name: "fullWidth",
        type: "boolean",
        defaultValue: true,
      },
      {
        name: "fullHeight",
        type: "boolean",
        defaultValue: false,
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
      },
    ],
    Content: [
      {
        name: "includeHeader",
        type: "boolean",
        defaultValue: true,
        description: "Include a header section",
      },
      {
        name: "headerBordered",
        type: "boolean",
        defaultValue: false,
        description: "Add a border to the header",
      },
      {
        name: "includeFooter",
        type: "boolean",
        defaultValue: true,
        description: "Include a footer section",
      },
      {
        name: "footerBordered",
        type: "boolean",
        defaultValue: false,
        description: "Add a border to the footer",
      },
      {
        name: "compact",
        type: "boolean",
        defaultValue: false,
        description: "Use compact padding in sections",
      },
    ],
  };

  // This is a simplified representation - in a real implementation,
  // the playground would render a dynamic component based on the selected props
  const renderComponent = (props: any) => {
    return (
      <div class="rounded-md border p-4">
        <Card
          variant={props.Card.variant}
          elevation={props.Card.elevation}
          radius={props.Card.radius}
          hoverEffect={props.Card.hoverEffect}
          interactive={props.Card.interactive}
          fullWidth={props.Card.fullWidth}
          fullHeight={props.Card.fullHeight}
          disabled={props.Card.disabled}
          class={`max-w-md ${props.Card.fullWidth ? "w-full" : ""}`}
        >
          {props.Content.includeHeader && (
            <CardHeader
              bordered={props.Content.headerBordered}
              compact={props.Content.compact}
            >
              <h3 class="text-lg font-medium">Card Title</h3>
            </CardHeader>
          )}

          <CardBody compact={props.Content.compact}>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              This is the content of the card. You can customize the appearance
              using the controls in the playground.
            </p>
          </CardBody>

          {props.Content.includeFooter && (
            <CardFooter
              bordered={props.Content.footerBordered}
              compact={props.Content.compact}
            >
              <div class="flex justify-end">
                <button class="rounded-md bg-blue-600 px-4 py-2 text-sm text-white">
                  Action
                </button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    );
  };

  return (
    <PlaygroundTemplate
      propControls={propControls}
      renderComponent={renderComponent}
      initialProps={{
        Card: {
          variant: "default",
          elevation: "sm",
          radius: "md",
          hoverEffect: "none",
          interactive: false,
          fullWidth: true,
          fullHeight: false,
          disabled: false,
        },
        Content: {
          includeHeader: true,
          headerBordered: false,
          includeFooter: true,
          footerBordered: false,
          compact: false,
        },
      }}
    >
      <p>
        Use this playground to experiment with the Card component. Adjust the
        properties to see how different configurations affect the appearance and
        behavior of the card.
      </p>
    </PlaygroundTemplate>
  );
});
