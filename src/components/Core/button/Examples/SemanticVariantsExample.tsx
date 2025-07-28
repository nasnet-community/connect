import { component$ } from "@builder.io/qwik";
import { Button } from "../Button";
import {
  HiCheckCircleOutline,
  HiXCircleOutline,
  HiExclamationTriangleOutline,
  HiInformationCircleOutline,
  HiArrowRightOutline,
} from "@qwikest/icons/heroicons";

export const SemanticVariantsBasicExample = component$(() => {
  return (
    <div class="flex flex-wrap gap-4">
      <Button variant="success">Success</Button>
      <Button variant="error">Error</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="info">Info</Button>
    </div>
  );
});

export const SemanticVariantsWithSizesExample = component$(() => {
  return (
    <div class="space-y-4">
      <div class="flex flex-wrap items-center gap-4">
        <Button variant="success" size="sm">
          Small Success
        </Button>
        <Button variant="success" size="md">
          Medium Success
        </Button>
        <Button variant="success" size="lg">
          Large Success
        </Button>
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <Button variant="error" size="sm">
          Small Error
        </Button>
        <Button variant="error" size="md">
          Medium Error
        </Button>
        <Button variant="error" size="lg">
          Large Error
        </Button>
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <Button variant="warning" size="sm">
          Small Warning
        </Button>
        <Button variant="warning" size="md">
          Medium Warning
        </Button>
        <Button variant="warning" size="lg">
          Large Warning
        </Button>
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <Button variant="info" size="sm">
          Small Info
        </Button>
        <Button variant="info" size="md">
          Medium Info
        </Button>
        <Button variant="info" size="lg">
          Large Info
        </Button>
      </div>
    </div>
  );
});

export const SemanticVariantsWithIconsExample = component$(() => {
  return (
    <div class="space-y-4">
      <div class="flex flex-wrap gap-4">
        <Button variant="success" leftIcon>
          <span q:slot="leftIcon">
            <HiCheckCircleOutline class="h-4 w-4" />
          </span>
          Success Action
        </Button>
        <Button variant="error" leftIcon>
          <span q:slot="leftIcon">
            <HiXCircleOutline class="h-4 w-4" />
          </span>
          Delete Item
        </Button>
        <Button variant="warning" leftIcon>
          <span q:slot="leftIcon">
            <HiExclamationTriangleOutline class="h-4 w-4" />
          </span>
          Warning Action
        </Button>
        <Button variant="info" leftIcon>
          <span q:slot="leftIcon">
            <HiInformationCircleOutline class="h-4 w-4" />
          </span>
          Learn More
        </Button>
      </div>
      <div class="flex flex-wrap gap-4">
        <Button variant="success" rightIcon>
          Continue
          <span q:slot="rightIcon">
            <HiArrowRightOutline class="h-4 w-4" />
          </span>
        </Button>
        <Button variant="error" leftIcon rightIcon>
          <span q:slot="leftIcon">
            <HiXCircleOutline class="h-4 w-4" />
          </span>
          Cancel
          <span q:slot="rightIcon">
            <HiArrowRightOutline class="h-4 w-4" />
          </span>
        </Button>
      </div>
    </div>
  );
});

export const SemanticVariantsLoadingExample = component$(() => {
  return (
    <div class="flex flex-wrap gap-4">
      <Button variant="success" loading>
        Saving...
      </Button>
      <Button variant="error" loading>
        Deleting...
      </Button>
      <Button variant="warning" loading>
        Processing...
      </Button>
      <Button variant="info" loading>
        Loading...
      </Button>
    </div>
  );
});

export const SemanticVariantsDisabledExample = component$(() => {
  return (
    <div class="flex flex-wrap gap-4">
      <Button variant="success" disabled>
        Success Disabled
      </Button>
      <Button variant="error" disabled>
        Error Disabled
      </Button>
      <Button variant="warning" disabled>
        Warning Disabled
      </Button>
      <Button variant="info" disabled>
        Info Disabled
      </Button>
    </div>
  );
});

export const SemanticVariantsWithActionsExample = component$(() => {
  return (
    <div class="flex flex-wrap gap-4">
      <Button
        variant="success"
        leftIcon
        onClick$={() => {
          alert("Success! Item saved successfully.");
        }}
      >
        <span q:slot="leftIcon">
          <HiCheckCircleOutline class="h-4 w-4" />
        </span>
        Save Changes
      </Button>
      <Button
        variant="error"
        leftIcon
        onClick$={() => {
          const confirmed = confirm(
            "Are you sure you want to delete this item?",
          );
          if (confirmed) {
            alert("Item deleted!");
          }
        }}
      >
        <span q:slot="leftIcon">
          <HiXCircleOutline class="h-4 w-4" />
        </span>
        Delete Item
      </Button>
      <Button
        variant="warning"
        leftIcon
        onClick$={() => {
          alert("Warning: This action may have consequences!");
        }}
      >
        <span q:slot="leftIcon">
          <HiExclamationTriangleOutline class="h-4 w-4" />
        </span>
        Proceed with Caution
      </Button>
      <Button
        variant="info"
        rightIcon
        onClick$={() => {
          alert("Here's more information about this feature.");
        }}
      >
        Learn More
        <span q:slot="rightIcon">
          <HiArrowRightOutline class="h-4 w-4" />
        </span>
      </Button>
    </div>
  );
});
