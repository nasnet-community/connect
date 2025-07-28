import { component$ } from "@builder.io/qwik";
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineDot,
  TimelineConnector,
} from "../index";

export default component$(() => {
  return (
    <div class="space-y-6">
      <h3 class="text-lg font-semibold">Basic Vertical Timeline</h3>

      <Timeline position="left">
        <TimelineItem>
          <TimelineDot />
          <TimelineConnector />
          <TimelineContent>
            <div class="mb-2">
              <h4 class="font-semibold">Event 1</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                January 2024
              </p>
            </div>
            <p class="text-sm">
              Started the project with initial planning and research phase.
            </p>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineDot />
          <TimelineConnector />
          <TimelineContent>
            <div class="mb-2">
              <h4 class="font-semibold">Event 2</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                February 2024
              </p>
            </div>
            <p class="text-sm">
              Development phase began with core features implementation.
            </p>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineDot />
          <TimelineConnector />
          <TimelineContent>
            <div class="mb-2">
              <h4 class="font-semibold">Event 3</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">March 2024</p>
            </div>
            <p class="text-sm">
              Beta testing started with selected user groups.
            </p>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem isLast>
          <TimelineDot />
          <TimelineContent>
            <div class="mb-2">
              <h4 class="font-semibold">Event 4</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">April 2024</p>
            </div>
            <p class="text-sm">Official launch and deployment to production.</p>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
});
