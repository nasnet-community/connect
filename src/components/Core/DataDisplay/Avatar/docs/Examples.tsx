import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate } from "~/components/Docs/templates/ExamplesTemplate";
import { CodeExample } from "~/components/Docs/CodeExample";
import { Card } from "~/components/Core/Card/Card";
import { Avatar, AvatarGroup } from "~/components/Core/DataDisplay/Avatar";

export default component$(() => {
  return (
    <ExamplesTemplate>
      {/* Basic Example */}
      <Card class="mb-6">
        <div class="mb-3">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Basic Avatar
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            The most basic usage of Avatar component with different variants:
            image, initials, and icon.
          </p>
        </div>
        <div class="mb-4 flex flex-wrap items-center gap-4 rounded-md border p-4 dark:border-gray-700">
          <Avatar>
            <img src="https://i.pravatar.cc/300?img=1" alt="User profile" />
          </Avatar>

          <Avatar>JD</Avatar>

          <Avatar>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Avatar>
        </div>
        <CodeExample
          code={`<Avatar>
  <img src="https://i.pravatar.cc/300?img=1" alt="User profile" />
</Avatar>

<Avatar>JD</Avatar>

<Avatar>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
</Avatar>`}
          language="tsx"
        />
      </Card>

      {/* Avatar Sizes */}
      <Card class="mb-6">
        <div class="mb-3">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Avatar Sizes
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Avatars come in six sizes: xs, sm, md (default), lg, xl, and 2xl.
          </p>
        </div>
        <div class="mb-4 flex flex-wrap items-end gap-4 rounded-md border p-4 dark:border-gray-700">
          <Avatar size="xs">
            <img src="https://i.pravatar.cc/300?img=2" alt="XS Avatar" />
          </Avatar>
          <Avatar size="sm">
            <img src="https://i.pravatar.cc/300?img=3" alt="SM Avatar" />
          </Avatar>
          <Avatar size="md">
            <img src="https://i.pravatar.cc/300?img=4" alt="MD Avatar" />
          </Avatar>
          <Avatar size="lg">
            <img src="https://i.pravatar.cc/300?img=5" alt="LG Avatar" />
          </Avatar>
          <Avatar size="xl">
            <img src="https://i.pravatar.cc/300?img=6" alt="XL Avatar" />
          </Avatar>
          <Avatar size="2xl">
            <img src="https://i.pravatar.cc/300?img=7" alt="2XL Avatar" />
          </Avatar>
        </div>
        <CodeExample
          code={`<Avatar size="xs">
  <img src="https://i.pravatar.cc/300?img=2" alt="XS Avatar" />
</Avatar>
<Avatar size="sm">
  <img src="https://i.pravatar.cc/300?img=3" alt="SM Avatar" />
</Avatar>
<Avatar size="md">
  <img src="https://i.pravatar.cc/300?img=4" alt="MD Avatar" />
</Avatar>
<Avatar size="lg">
  <img src="https://i.pravatar.cc/300?img=5" alt="LG Avatar" />
</Avatar>
<Avatar size="xl">
  <img src="https://i.pravatar.cc/300?img=6" alt="XL Avatar" />
</Avatar>
<Avatar size="2xl">
  <img src="https://i.pravatar.cc/300?img=7" alt="2XL Avatar" />
</Avatar>`}
          language="tsx"
        />
      </Card>

      {/* Avatar Shapes */}
      <Card class="mb-6">
        <div class="mb-3">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Avatar Shapes
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Avatars can have different shapes: circle (default), square, or
            rounded.
          </p>
        </div>
        <div class="mb-4 flex flex-wrap items-center gap-4 rounded-md border p-4 dark:border-gray-700">
          <Avatar shape="circle">
            <img src="https://i.pravatar.cc/300?img=8" alt="Circle Avatar" />
          </Avatar>
          <Avatar shape="square">
            <img src="https://i.pravatar.cc/300?img=9" alt="Square Avatar" />
          </Avatar>
          <Avatar shape="rounded">
            <img src="https://i.pravatar.cc/300?img=10" alt="Rounded Avatar" />
          </Avatar>
        </div>
        <CodeExample
          code={`<Avatar shape="circle">
  <img src="https://i.pravatar.cc/300?img=8" alt="Circle Avatar" />
</Avatar>
<Avatar shape="square">
  <img src="https://i.pravatar.cc/300?img=9" alt="Square Avatar" />
</Avatar>
<Avatar shape="rounded">
  <img src="https://i.pravatar.cc/300?img=10" alt="Rounded Avatar" />
</Avatar>`}
          language="tsx"
        />
      </Card>

      {/* Avatar with Status */}
      <Card class="mb-6">
        <div class="mb-3">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Avatar with Status
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Avatars can display a status indicator to show user presence.
          </p>
        </div>
        <div class="mb-4 flex flex-wrap items-center gap-4 rounded-md border p-4 dark:border-gray-700">
          <Avatar status="online">
            <img src="https://i.pravatar.cc/300?img=11" alt="Online User" />
          </Avatar>
          <Avatar status="offline">
            <img src="https://i.pravatar.cc/300?img=12" alt="Offline User" />
          </Avatar>
          <Avatar status="away">
            <img src="https://i.pravatar.cc/300?img=13" alt="Away User" />
          </Avatar>
          <Avatar status="busy">
            <img src="https://i.pravatar.cc/300?img=14" alt="Busy User" />
          </Avatar>
        </div>
        <CodeExample
          code={`<Avatar status="online">
  <img src="https://i.pravatar.cc/300?img=11" alt="Online User" />
</Avatar>
<Avatar status="offline">
  <img src="https://i.pravatar.cc/300?img=12" alt="Offline User" />
</Avatar>
<Avatar status="away">
  <img src="https://i.pravatar.cc/300?img=13" alt="Away User" />
</Avatar>
<Avatar status="busy">
  <img src="https://i.pravatar.cc/300?img=14" alt="Busy User" />
</Avatar>`}
          language="tsx"
        />
      </Card>

      {/* Avatar Group */}
      <Card class="mb-6">
        <div class="mb-3">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Avatar Group
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            AvatarGroup allows you to display multiple avatars as a stack with a
            count indicator for overflow.
          </p>
        </div>
        <div class="mb-4 rounded-md border p-4 dark:border-gray-700">
          <AvatarGroup max={3} total={5}>
            <Avatar>
              <img src="https://i.pravatar.cc/300?img=15" alt="User 1" />
            </Avatar>
            <Avatar>
              <img src="https://i.pravatar.cc/300?img=16" alt="User 2" />
            </Avatar>
            <Avatar>
              <img src="https://i.pravatar.cc/300?img=17" alt="User 3" />
            </Avatar>
          </AvatarGroup>
        </div>
        <CodeExample
          code={`<AvatarGroup max={3} total={5}>
  <Avatar>
    <img src="https://i.pravatar.cc/300?img=15" alt="User 1" />
  </Avatar>
  <Avatar>
    <img src="https://i.pravatar.cc/300?img=16" alt="User 2" />
  </Avatar>
  <Avatar>
    <img src="https://i.pravatar.cc/300?img=17" alt="User 3" />
  </Avatar>
</AvatarGroup>`}
          language="tsx"
        />
      </Card>
    </ExamplesTemplate>
  );
});
