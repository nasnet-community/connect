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
      <h3 class="text-lg font-semibold">Alternating Timeline</h3>

      <Timeline position="alternate">
        <TimelineItem>
          <TimelineDot color="#3b82f6" />
          <TimelineConnector color="#3b82f6" />
          <TimelineContent>
            <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <h4 class="mb-1 font-semibold">Project Kickoff</h4>
              <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
                Q1 2024
              </p>
              <p class="text-sm">
                Initial team formation and project scope definition. Established
                key milestones and deliverables.
              </p>
            </div>
          </TimelineContent>
          <div
            q:slot="opposite"
            class="text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            January 15, 2024
          </div>
        </TimelineItem>

        <TimelineItem>
          <TimelineDot color="#10b981" />
          <TimelineConnector color="#10b981" />
          <TimelineContent>
            <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
              <h4 class="mb-1 font-semibold">Design Phase Complete</h4>
              <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
                Q1 2024
              </p>
              <p class="text-sm">
                Finalized UI/UX designs and technical architecture. Received
                stakeholder approval.
              </p>
            </div>
          </TimelineContent>
          <div
            q:slot="opposite"
            class="text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            February 28, 2024
          </div>
        </TimelineItem>

        <TimelineItem>
          <TimelineDot color="#f59e0b" />
          <TimelineConnector color="#f59e0b" />
          <TimelineContent>
            <div class="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
              <h4 class="mb-1 font-semibold">Development Sprint 1</h4>
              <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
                Q2 2024
              </p>
              <p class="text-sm">
                Core features implemented including authentication, data models,
                and basic UI components.
              </p>
            </div>
          </TimelineContent>
          <div
            q:slot="opposite"
            class="text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            March 15, 2024
          </div>
        </TimelineItem>

        <TimelineItem>
          <TimelineDot color="#8b5cf6" />
          <TimelineConnector color="#8b5cf6" />
          <TimelineContent>
            <div class="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
              <h4 class="mb-1 font-semibold">Testing & QA</h4>
              <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
                Q2 2024
              </p>
              <p class="text-sm">
                Comprehensive testing phase with automated and manual testing.
                Bug fixes and performance optimization.
              </p>
            </div>
          </TimelineContent>
          <div
            q:slot="opposite"
            class="text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            April 10, 2024
          </div>
        </TimelineItem>

        <TimelineItem isLast>
          <TimelineDot color="#ef4444" variant="filled" />
          <TimelineContent>
            <div class="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
              <h4 class="mb-1 font-semibold">Production Launch</h4>
              <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
                Q2 2024
              </p>
              <p class="text-sm">
                Successfully deployed to production environment. Monitoring and
                support systems in place.
              </p>
            </div>
          </TimelineContent>
          <div
            q:slot="opposite"
            class="text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            May 1, 2024
          </div>
        </TimelineItem>
      </Timeline>
    </div>
  );
});
