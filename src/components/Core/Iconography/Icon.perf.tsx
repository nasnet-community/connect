import { component$ } from "@builder.io/qwik";
import { Icon } from "./index";
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  SuccessIcon,
  ErrorIcon,
  InfoIcon,
  EmailIcon,
  DocumentIcon,
  LockIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "./icons";

/**
 * Performance test component for the Icon system
 *
 * This component renders multiple icons with different sizes and colors
 * to test rendering performance in different scenarios.
 */
export const IconPerformanceTest = component$(() => {
  // Create an array of 100 icons for performance testing
  const icons = [
    HomeIcon,
    SettingsIcon,
    UserIcon,
    SuccessIcon,
    ErrorIcon,
    InfoIcon,
    EmailIcon,
    DocumentIcon,
    LockIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    ArrowUpIcon,
    ArrowDownIcon,
  ];

  // Create a larger array of icons for performance testing
  const manyIcons = [];
  for (let i = 0; i < 10; i++) {
    manyIcons.push(...icons);
  }

  return (
    <div class="p-4">
      <h2 class="mb-4 text-xl font-bold">Icon Performance Test</h2>

      <div class="mb-8">
        <h3 class="mb-2 text-lg font-semibold">Basic Icons (13)</h3>
        <div class="flex flex-wrap gap-2">
          {icons.map((IconComponent, index) => (
            <Icon key={`basic-${index}`} icon={IconComponent} />
          ))}
        </div>
      </div>

      <div class="mb-8">
        <h3 class="mb-2 text-lg font-semibold">Many Icons (130)</h3>
        <div class="flex flex-wrap gap-2">
          {manyIcons.map((IconComponent, index) => (
            <Icon key={`many-${index}`} icon={IconComponent} size="sm" />
          ))}
        </div>
      </div>

      <div class="mb-8">
        <h3 class="mb-2 text-lg font-semibold">Different Sizes</h3>
        <div class="flex flex-wrap items-end gap-4">
          <Icon icon={HomeIcon} size="xs" />
          <Icon icon={HomeIcon} size="sm" />
          <Icon icon={HomeIcon} size="md" />
          <Icon icon={HomeIcon} size="lg" />
          <Icon icon={HomeIcon} size="xl" />
          <Icon icon={HomeIcon} size="2xl" />
        </div>
      </div>

      <div class="mb-8">
        <h3 class="mb-2 text-lg font-semibold">Different Colors</h3>
        <div class="flex flex-wrap gap-2">
          <Icon icon={InfoIcon} color="primary" />
          <Icon icon={InfoIcon} color="secondary" />
          <Icon icon={SuccessIcon} color="success" />
          <Icon icon={ErrorIcon} color="error" />
          <Icon icon={InfoIcon} color="info" />
          <Icon icon={InfoIcon} color="muted" />
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Performance Notes</h3>
        <ul class="list-inside list-disc space-y-2">
          <li>
            The Icon component renders efficiently by using CSS classes for
            styling
          </li>
          <li>
            Icon size is controlled via Tailwind CSS classes rather than inline
            styles
          </li>
          <li>
            Using <code>useStyles$()</code> ensures styles are only injected
            once
          </li>
          <li>
            Icons are lazy-loaded via Qwik's <code>$()</code> function, ensuring
            they're only loaded when needed
          </li>
          <li>
            The component avoids unnecessary re-renders by using a constant
            mapping for size and color classes
          </li>
        </ul>
      </div>
    </div>
  );
});

export default IconPerformanceTest;
