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
      <h3 class="text-lg font-semibold">Customized Timeline with Icons</h3>

      <Timeline position="left">
        <TimelineItem>
          <TimelineDot color="#3b82f6" size="lg">
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </TimelineDot>
          <TimelineConnector color="#3b82f6" />
          <TimelineContent>
            <div class="group rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 transition-all hover:shadow-md dark:border-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20">
              <h4 class="mb-1 font-semibold text-blue-900 dark:text-blue-100">
                New Feature Added
              </h4>
              <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
                2 hours ago
              </p>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Implemented real-time collaboration features with WebSocket
                support.
              </p>
              <div class="mt-3 flex gap-2">
                <span class="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-800 dark:text-blue-200">
                  Feature
                </span>
                <span class="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-800 dark:text-indigo-200">
                  Enhancement
                </span>
              </div>
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineDot color="#10b981" variant="outlined" size="lg">
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </TimelineDot>
          <TimelineConnector color="#10b981" />
          <TimelineContent>
            <div class="group rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4 transition-all hover:shadow-md dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20">
              <h4 class="mb-1 font-semibold text-green-900 dark:text-green-100">
                Tests Passing
              </h4>
              <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
                Yesterday
              </p>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                All unit and integration tests are now passing with 98% code
                coverage.
              </p>
              <div class="mt-3">
                <div class="flex items-center gap-2 text-sm">
                  <div class="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div class="h-full w-[98%] bg-green-500"></div>
                  </div>
                  <span class="font-medium text-green-700 dark:text-green-300">
                    98%
                  </span>
                </div>
              </div>
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineDot color="#f59e0b" size="lg">
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </TimelineDot>
          <TimelineConnector color="#f59e0b" />
          <TimelineContent>
            <div class="group rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-4 transition-all hover:shadow-md dark:border-amber-800 dark:from-amber-900/20 dark:to-yellow-900/20">
              <h4 class="mb-1 font-semibold text-amber-900 dark:text-amber-100">
                Security Update Required
              </h4>
              <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
                3 days ago
              </p>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Dependencies need updating to patch recent vulnerabilities.
              </p>
              <button class="mt-3 rounded-md bg-amber-500 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-amber-600">
                Update Now
              </button>
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem isLast>
          <TimelineDot color="#8b5cf6" variant="filled" size="lg">
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </TimelineDot>
          <TimelineContent>
            <div class="group rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-4 transition-all hover:shadow-md dark:border-purple-800 dark:from-purple-900/20 dark:to-pink-900/20">
              <h4 class="mb-1 font-semibold text-purple-900 dark:text-purple-100">
                Deployment Complete
              </h4>
              <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
                1 week ago
              </p>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Successfully deployed to production with zero downtime.
              </p>
              <div class="mt-3 flex items-center gap-4 text-sm">
                <div class="flex items-center gap-1">
                  <div class="h-2 w-2 rounded-full bg-green-500"></div>
                  <span class="text-gray-600 dark:text-gray-400">
                    All systems operational
                  </span>
                </div>
              </div>
            </div>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
});
