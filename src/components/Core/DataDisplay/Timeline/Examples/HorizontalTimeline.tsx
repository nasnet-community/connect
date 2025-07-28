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
      <h3 class="text-lg font-semibold">Horizontal Timeline</h3>

      <div class="overflow-x-auto pb-4">
        <Timeline orientation="horizontal" class="min-w-[800px]">
          <TimelineItem>
            <TimelineContent>
              <div class="mb-4 text-center">
                <h4 class="font-semibold">Research</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Week 1-2</p>
              </div>
            </TimelineContent>
            <TimelineDot color="#3b82f6" />
            <TimelineConnector color="#3b82f6" />
            <div
              q:slot="opposite"
              class="mt-4 max-w-[150px] text-center text-sm"
            >
              Market analysis and user research completed
            </div>
          </TimelineItem>

          <TimelineItem>
            <TimelineContent>
              <div class="mb-4 text-center">
                <h4 class="font-semibold">Planning</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Week 3-4</p>
              </div>
            </TimelineContent>
            <TimelineDot color="#10b981" />
            <TimelineConnector color="#10b981" />
            <div
              q:slot="opposite"
              class="mt-4 max-w-[150px] text-center text-sm"
            >
              Project roadmap and milestones defined
            </div>
          </TimelineItem>

          <TimelineItem>
            <TimelineContent>
              <div class="mb-4 text-center">
                <h4 class="font-semibold">Design</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Week 5-8</p>
              </div>
            </TimelineContent>
            <TimelineDot color="#f59e0b" />
            <TimelineConnector color="#f59e0b" />
            <div
              q:slot="opposite"
              class="mt-4 max-w-[150px] text-center text-sm"
            >
              UI/UX designs and prototypes created
            </div>
          </TimelineItem>

          <TimelineItem>
            <TimelineContent>
              <div class="mb-4 text-center">
                <h4 class="font-semibold">Development</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Week 9-16
                </p>
              </div>
            </TimelineContent>
            <TimelineDot color="#8b5cf6" />
            <TimelineConnector color="#8b5cf6" />
            <div
              q:slot="opposite"
              class="mt-4 max-w-[150px] text-center text-sm"
            >
              Core features implemented and tested
            </div>
          </TimelineItem>

          <TimelineItem isLast>
            <TimelineContent>
              <div class="mb-4 text-center">
                <h4 class="font-semibold">Launch</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Week 17</p>
              </div>
            </TimelineContent>
            <TimelineDot color="#ef4444" size="lg">
              <svg
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </TimelineDot>
            <div
              q:slot="opposite"
              class="mt-4 max-w-[150px] text-center text-sm"
            >
              Product launched successfully! 🎉
            </div>
          </TimelineItem>
        </Timeline>
      </div>

      <div class="mt-8">
        <h4 class="mb-4 font-semibold">Compact Horizontal Timeline</h4>
        <div class="overflow-x-auto">
          <Timeline orientation="horizontal" class="min-w-[600px]">
            <TimelineItem>
              <TimelineDot color="#3b82f6" variant="outlined" size="sm" />
              <TimelineConnector color="#3b82f6" />
              <TimelineContent>
                <p class="mt-2 text-sm font-medium">Start</p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineDot color="#10b981" variant="outlined" size="sm" />
              <TimelineConnector color="#10b981" />
              <TimelineContent>
                <p class="mt-2 text-sm font-medium">Phase 1</p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineDot color="#f59e0b" variant="outlined" size="sm" />
              <TimelineConnector color="#f59e0b" />
              <TimelineContent>
                <p class="mt-2 text-sm font-medium">Phase 2</p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineDot color="#8b5cf6" variant="outlined" size="sm" />
              <TimelineConnector color="#8b5cf6" />
              <TimelineContent>
                <p class="mt-2 text-sm font-medium">Phase 3</p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem isLast>
              <TimelineDot color="#ef4444" variant="filled" size="sm" />
              <TimelineContent>
                <p class="mt-2 text-sm font-medium">Complete</p>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      </div>
    </div>
  );
});
