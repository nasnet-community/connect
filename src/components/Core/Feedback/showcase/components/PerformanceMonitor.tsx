import { component$, useVisibleTask$, type QRL } from "@builder.io/qwik";
import {
  HiCpuChipOutline,
  HiXMarkOutline,
  HiBoltOutline,
  HiClockOutline,
  HiCubeOutline,
  HiChartBarOutline,
} from "@qwikest/icons/heroicons";
import { Card } from "../../../Card/Card";
import { usePerformanceMonitor } from "../hooks/usePerformanceMonitor";

interface PerformanceMonitorProps {
  onClose: QRL<() => void>;
}

export const PerformanceMonitor = component$<PerformanceMonitorProps>(
  ({ onClose }) => {
    const { metrics, isMonitoring, startMonitoring, stopMonitoring, getStatus } = usePerformanceMonitor();

    useVisibleTask$(() => {
      isMonitoring.value = true;
      return () => {
        isMonitoring.value = false;
      };
    });

    const MetricCard = component$<{
      title: string;
      value: number;
      unit: string;
      icon: any;
      status: "good" | "warning" | "critical";
    }>(({ title, value, unit, icon: Icon, status }) => {
      const statusColors = {
        good: "text-green-600 bg-green-50 border-green-200",
        warning: "text-yellow-600 bg-yellow-50 border-yellow-200",
        critical: "text-red-600 bg-red-50 border-red-200",
      };

      return (
        <div class={`rounded-lg border p-3 ${statusColors[status]}`}>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <Icon class="h-4 w-4" />
              <span class="text-sm font-medium">{title}</span>
            </div>
            <div class="text-lg font-bold">
              {value}
              <span class="text-sm font-normal">{unit}</span>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div class="fixed bottom-6 left-6 z-50 w-80">
        <Card class="p-4">
          <div class="mb-4 flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <HiCpuChipOutline class="h-5 w-5 text-[var(--showcase-primary)]" />
              <h3 class="text-lg font-semibold text-[var(--showcase-text)]">
                Performance Monitor
              </h3>
            </div>
            <button
              onClick$={onClose}
              class="rounded p-1 text-[var(--showcase-text)]/70 hover:bg-[var(--showcase-surface)] hover:text-[var(--showcase-text)]"
            >
              <HiXMarkOutline class="h-4 w-4" />
            </button>
          </div>

          <div class="space-y-3">
            <MetricCard
              title="FPS"
              value={metrics.value.fps}
              unit=""
              icon={HiBoltOutline}
              status={getStatus("fps")}
            />
            
            <MetricCard
              title="Memory Usage"
              value={metrics.value.memoryUsage}
              unit="MB"
              icon={HiChartBarOutline}
              status={getStatus("memoryUsage")}
            />
            
            <MetricCard
              title="Render Time"
              value={metrics.value.renderTime}
              unit="ms"
              icon={HiClockOutline}
              status={getStatus("renderTime")}
            />
            
            <MetricCard
              title="Components"
              value={metrics.value.componentCount}
              unit=""
              icon={HiCubeOutline}
              status="good"
            />
          </div>

          <div class="mt-4 pt-4 border-t border-[var(--showcase-border)]">
            <div class="flex items-center justify-between text-sm">
              <span class="text-[var(--showcase-text)]/70">
                Monitoring: {isMonitoring.value ? "Active" : "Inactive"}
              </span>
              <button
                onClick$={isMonitoring.value ? stopMonitoring : startMonitoring}
                class={{
                  "rounded px-2 py-1 text-xs font-medium": true,
                  "bg-green-100 text-green-700": isMonitoring.value,
                  "bg-gray-100 text-gray-700": !isMonitoring.value,
                }}
              >
                {isMonitoring.value ? "Stop" : "Start"}
              </button>
            </div>
          </div>

          <div class="mt-3 text-xs text-[var(--showcase-text)]/50">
            <div class="flex justify-between">
              <span>Good:</span>
              <span class="text-green-600">●</span>
            </div>
            <div class="flex justify-between">
              <span>Warning:</span>
              <span class="text-yellow-600">●</span>
            </div>
            <div class="flex justify-between">
              <span>Critical:</span>
              <span class="text-red-600">●</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }
);