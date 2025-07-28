import { component$ } from "@builder.io/qwik";
import { Button } from "../Button";
import {
  HiArrowDownTrayMini,
  HiArrowUpTrayMini,
  HiDocumentArrowDownMini,
  HiShareMini,
  HiPlusMini,
  HiTrashMini,
} from "@qwikest/icons/heroicons";

export const FullWidthButtonExample = component$(() => {
  return (
    <div class="max-w-md space-y-4">
      <Button fullWidth>Full Width Button</Button>
      <Button fullWidth variant="secondary">
        Full Width Secondary
      </Button>
      <Button fullWidth variant="outline" leftIcon>
        <span q:slot="leftIcon">
          <HiArrowDownTrayMini class="h-4 w-4" />
        </span>
        Download Report
      </Button>
      <Button fullWidth variant="success" size="lg">
        Complete Purchase
      </Button>
    </div>
  );
});

export const ResponsiveButtonExample = component$(() => {
  return (
    <div class="space-y-6">
      <div class="space-y-2">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          These buttons are full width on mobile devices (resize window to see):
        </p>
        <div class="flex flex-wrap gap-4">
          <Button responsive>Responsive Button</Button>
          <Button responsive variant="secondary">
            Secondary Responsive
          </Button>
          <Button responsive variant="outline">
            Outline Responsive
          </Button>
        </div>
      </div>

      <div class="space-y-2">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Responsive buttons with icons:
        </p>
        <div class="flex flex-wrap gap-4">
          <Button responsive leftIcon>
            <span q:slot="leftIcon">
              <HiArrowUpTrayMini class="h-4 w-4" />
            </span>
            Upload File
          </Button>
          <Button responsive variant="success" rightIcon>
            Continue
            <span q:slot="rightIcon">
              <HiShareMini class="h-4 w-4" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
});

export const ResponsiveActionGroupExample = component$(() => {
  return (
    <div class="space-y-6">
      <div class="space-y-2">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Button group that stacks vertically on mobile:
        </p>
        <div class="flex flex-col gap-2 sm:flex-row">
          <Button responsive variant="outline">
            Cancel
          </Button>
          <Button responsive variant="secondary">
            Save as Draft
          </Button>
          <Button responsive>Publish</Button>
        </div>
      </div>

      <div class="space-y-2">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Responsive action buttons:
        </p>
        <div class="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <div class="flex flex-col gap-2 sm:flex-row">
            <Button responsive variant="error" leftIcon>
              <span q:slot="leftIcon">
                <HiTrashMini class="h-4 w-4" />
              </span>
              Delete
            </Button>
            <Button responsive variant="outline">
              Archive
            </Button>
          </div>
          <Button responsive variant="success" leftIcon>
            <span q:slot="leftIcon">
              <HiPlusMini class="h-4 w-4" />
            </span>
            Create New
          </Button>
        </div>
      </div>
    </div>
  );
});

export const ResponsiveSizesExample = component$(() => {
  return (
    <div class="space-y-6">
      <div class="space-y-2">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Different sizes that maintain touch-friendly targets on mobile:
        </p>
        <div class="flex flex-wrap gap-4">
          <Button size="sm" responsive>
            Small (44px min on mobile)
          </Button>
          <Button size="md" responsive>
            Medium (44px min on mobile)
          </Button>
          <Button size="lg" responsive>
            Large (48px min on mobile)
          </Button>
        </div>
      </div>

      <div class="space-y-2">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Semantic variants with responsive sizing:
        </p>
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button variant="success" size="sm" fullWidth>
            Confirm Order
          </Button>
          <Button variant="error" size="sm" fullWidth>
            Cancel Order
          </Button>
          <Button variant="info" size="sm" fullWidth leftIcon>
            <span q:slot="leftIcon">
              <HiDocumentArrowDownMini class="h-4 w-4" />
            </span>
            Download Invoice
          </Button>
          <Button variant="warning" size="sm" fullWidth>
            Review Changes
          </Button>
        </div>
      </div>
    </div>
  );
});

export const MobileFirstDesignExample = component$(() => {
  return (
    <div class="space-y-6">
      <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-medium">Mobile-First Form Actions</h3>
        <form class="space-y-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              class="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              placeholder="Enter your email"
            />
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium">Password</label>
            <input
              type="password"
              class="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              placeholder="Enter your password"
            />
          </div>
          <div class="flex flex-col gap-2 pt-2 sm:flex-row">
            <Button type="button" responsive variant="outline">
              Cancel
            </Button>
            <Button type="submit" responsive>
              Sign In
            </Button>
          </div>
        </form>
      </div>

      <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-medium">Card Actions</h3>
        <div class="space-y-2">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Responsive card actions that adapt to screen size:
          </p>
          <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Button fullWidth variant="outline" size="sm">
              View Details
            </Button>
            <Button fullWidth variant="secondary" size="sm">
              Edit
            </Button>
            <Button fullWidth variant="error" size="sm">
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
