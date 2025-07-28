import { component$, type QRL } from "@builder.io/qwik";
import {
  HiDevicePhoneMobileOutline,
  HiDeviceTabletOutline,
  HiComputerDesktopOutline,
  HiChevronDownOutline,
} from "@qwikest/icons/heroicons";
import { Card } from "../../../Card/Card";
import { DEVICE_CONFIGS } from "../constants";
import type { DeviceSize } from "../types";

interface DeviceSimulatorProps {
  device: DeviceSize;
  onDeviceChange: QRL<(device: DeviceSize) => void>;
  compact?: boolean;
}

export const DeviceSimulator = component$<DeviceSimulatorProps>(
  ({ device, onDeviceChange, compact = false }) => {
    const devices = [
      { id: "mobile" as const, label: "Mobile", iconName: "mobile" },
      { id: "tablet" as const, label: "Tablet", iconName: "tablet" },
      { id: "desktop" as const, label: "Desktop", iconName: "desktop" },
    ];

    const getDeviceIcon = (iconName: string, className?: string) => {
      switch (iconName) {
        case "mobile":
          return <HiDevicePhoneMobileOutline class={className} />;
        case "tablet":
          return <HiDeviceTabletOutline class={className} />;
        case "desktop":
          return <HiComputerDesktopOutline class={className} />;
        default:
          return null;
      }
    };

    const currentDevice = devices.find(d => d.id === device);
    const config = DEVICE_CONFIGS[device];

    if (compact) {
      return (
        <div class="relative">
          <select
            value={device}
            onChange$={(e) => onDeviceChange((e.target as HTMLSelectElement).value as DeviceSize)}
            class="appearance-none rounded-lg bg-[var(--showcase-surface)] px-3 py-2 pr-8 text-sm text-[var(--showcase-text)] border border-[var(--showcase-border)]"
          >
            {devices.map(d => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
          <HiChevronDownOutline class="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--showcase-text)]/50 pointer-events-none" />
        </div>
      );
    }

    return (
      <Card class="p-4">
        <div class="mb-4">
          <h3 class="flex items-center text-lg font-semibold text-[var(--showcase-text)]">
            {currentDevice && getDeviceIcon(currentDevice.iconName, "mr-2 h-5 w-5")}
            Device Simulator
          </h3>
          <p class="text-sm text-[var(--showcase-text)]/70">
            Test components across different device sizes
          </p>
        </div>

        <div class="mb-4 flex space-x-2">
          {devices.map(d => (
            <button
              key={d.id}
              onClick$={() => onDeviceChange(d.id)}
              class={{
                "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-all": true,
                "bg-[var(--showcase-primary)] text-white": device === d.id,
                "bg-[var(--showcase-surface)] text-[var(--showcase-text)]/70 hover:bg-[var(--showcase-surface)] hover:text-[var(--showcase-text)]": device !== d.id,
              }}
            >
              {getDeviceIcon(d.iconName, "h-4 w-4")}
              <span>{d.label}</span>
            </button>
          ))}
        </div>

        <div class="space-y-2 text-sm text-[var(--showcase-text)]/70">
          <div class="flex justify-between">
            <span>Device:</span>
            <span class="font-medium text-[var(--showcase-text)]">{config.name}</span>
          </div>
          <div class="flex justify-between">
            <span>Resolution:</span>
            <span class="font-medium text-[var(--showcase-text)]">
              {config.width} × {config.height}
            </span>
          </div>
          <div class="flex justify-between">
            <span>Pixel Ratio:</span>
            <span class="font-medium text-[var(--showcase-text)]">{config.pixelRatio}x</span>
          </div>
          <div class="flex justify-between">
            <span>Touch:</span>
            <span class="font-medium text-[var(--showcase-text)]">
              {config.touchEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-[var(--showcase-border)]">
          <h4 class="mb-2 text-sm font-medium text-[var(--showcase-text)]">
            Viewport Preview
          </h4>
          <div class="relative h-32 rounded-lg bg-[var(--showcase-bg)] border border-[var(--showcase-border)] overflow-hidden">
            <div
              class="absolute bg-[var(--showcase-primary)]/20 border border-[var(--showcase-primary)]"
              style={{
                width: `${Math.min(100, (config.width / 1920) * 100)}%`,
                height: `${Math.min(100, (config.height / 1080) * 100)}%`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div class="flex h-full items-center justify-center text-xs text-[var(--showcase-primary)]">
                {config.width} × {config.height}
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
);