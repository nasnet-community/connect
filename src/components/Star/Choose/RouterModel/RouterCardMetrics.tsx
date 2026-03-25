import { component$ } from "@builder.io/qwik";
import {
  LuCpu,
  LuMemoryStick,
  LuNetwork,
  LuHardDrive,
  LuZap,
  LuActivity,
} from "@qwikest/icons/lucide";
import { type RouterData } from "./Constants";

interface RouterCardMetricsProps {
  router: RouterData;
  isAnimated?: boolean;
  isCompact?: boolean;
}

export const RouterCardMetrics = component$<RouterCardMetricsProps>((props) => {
  const { router, isAnimated = false, isCompact = false } = props;

  // Parse CPU speed to get a percentage (assuming max 3GHz for visualization)
  const getCpuPercentage = (cpuSpec: string) => {
    const match = cpuSpec.match(/(\d+\.?\d*)\s*GHz/i);
    if (match) {
      const ghz = parseFloat(match[1]);
      return Math.min((ghz / 3) * 100, 100); // Max 3GHz scale
    }
    return 50; // Default if parsing fails
  };

  // Parse RAM to get a percentage (assuming max 2GB for visualization)
  const getRamPercentage = (ramSpec: string) => {
    const match = ramSpec.match(/(\d+\.?\d*)\s*(GB|MB)/i);
    if (match) {
      const value = parseFloat(match[1]);
      const unit = match[2].toUpperCase();
      const gb = unit === "GB" ? value : value / 1024;
      return Math.min((gb / 2) * 100, 100); // Max 2GB scale
    }
    return 50; // Default if parsing fails
  };

  // Parse storage to get value
  const getStorageValue = (storageSpec: string) => {
    const match = storageSpec.match(/(\d+\.?\d*)\s*(GB|MB)/i);
    if (match) {
      const value = parseFloat(match[1]);
      const unit = match[2].toUpperCase();
      return unit === "GB" ? `${value}GB` : `${value}MB`;
    }
    return storageSpec;
  };

  // Parse ports into an array
  const parsePorts = (portSpec: string) => {
    const ports = [];
    const matches = portSpec.matchAll(/(\d+)x\s*([^,+]+)/gi);
    for (const match of matches) {
      const count = parseInt(match[1]);
      const type = match[2].trim();
      if (count === 1) {
        ports.push(type);
      } else {
        ports.push(`${count}x ${type}`);
      }
    }
    return ports.length > 0 ? ports : [portSpec];
  };

  const cpuPercentage = getCpuPercentage(router.specs.CPU);
  const ramPercentage = getRamPercentage(router.specs.RAM);
  const storageValue = getStorageValue(router.specs.Storage);
  const ports = parsePorts(router.specs.Ports);

  if (isCompact) {
    // Compact grid layout for card view
    return (
      <div class="grid grid-cols-2 gap-3">
        {/* CPU Card */}
        <div class="group/metric">
          <div class="mb-2 flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <div class="rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-1 transition-transform group-hover/metric:scale-110">
                <LuCpu class="h-3 w-3 text-blue-500" />
              </div>
              <span class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                CPU
              </span>
            </div>
            <span class="text-xs font-bold text-gray-800 dark:text-gray-200">
              {router.specs.CPU}
            </span>
          </div>
          <div class="relative h-2 overflow-hidden rounded-full bg-gray-200/50 dark:bg-gray-700/50">
            <div
              class={`
                absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600
                ${isAnimated ? "animate-pulse" : ""}
                transition-all duration-700 ease-out
              `}
              style={`width: ${cpuPercentage}%`}
            >
              <div class="absolute inset-0 bg-gradient-to-t from-white/0 to-white/30" />
            </div>
          </div>
        </div>

        {/* Memory Card */}
        <div class="group/metric">
          <div class="mb-2 flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <div class="rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-1 transition-transform group-hover/metric:scale-110">
                <LuMemoryStick class="h-3 w-3 text-purple-500" />
              </div>
              <span class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                RAM
              </span>
            </div>
            <span class="text-xs font-bold text-gray-800 dark:text-gray-200">
              {router.specs.RAM}
            </span>
          </div>
          <div class="relative h-2 overflow-hidden rounded-full bg-gray-200/50 dark:bg-gray-700/50">
            <div
              class={`
                absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-purple-400 to-purple-600
                ${isAnimated ? "animate-pulse" : ""}
                transition-all duration-700 ease-out
              `}
              style={`width: ${ramPercentage}%`}
            >
              <div class="absolute inset-0 bg-gradient-to-t from-white/0 to-white/30" />
            </div>
          </div>
        </div>

        {/* Storage Card */}
        <div class="group/metric">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <div class="rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/20 p-1 transition-transform group-hover/metric:scale-110">
                <LuHardDrive class="h-3 w-3 text-green-500" />
              </div>
              <span class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Storage
              </span>
            </div>
            <span class="text-xs font-bold text-gray-800 dark:text-gray-200">
              {storageValue}
            </span>
          </div>
        </div>

        {/* Ports Card */}
        <div class="group/metric">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <div class="rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/20 p-1 transition-transform group-hover/metric:scale-110">
                <LuNetwork class="h-3 w-3 text-amber-500" />
              </div>
              <span class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Ports
              </span>
            </div>
            <span class="text-right text-xs font-bold text-gray-800 dark:text-gray-200">
              {ports[0]}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Full layout
  return (
    <div class="space-y-4">
      {/* CPU Performance with visual meter */}
      <div class="group/metric">
        <div class="mb-2 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-1.5 transition-transform group-hover/metric:scale-110">
              <LuCpu class="h-4 w-4 text-blue-500" />
            </div>
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Processor
            </span>
          </div>
          <span class="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-sm font-bold text-transparent">
            {router.specs.CPU}
          </span>
        </div>
        <div class="relative h-3 overflow-hidden rounded-full bg-gray-200/50 dark:bg-gray-700/50">
          <div
            class={`
              absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600
              ${isAnimated ? "animate-pulse" : ""}
              transition-all duration-1000 ease-out
            `}
            style={`width: ${cpuPercentage}%`}
          >
            <div class="absolute inset-0 bg-gradient-to-t from-white/0 to-white/40" />
            {/* Animated shine effect */}
            <div class="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
          {/* Performance indicator dots */}
          <div class="absolute inset-0 flex items-center justify-end pr-2">
            <LuZap class="h-2.5 w-2.5 text-white drop-shadow-lg" />
          </div>
        </div>
      </div>

      {/* RAM with visual meter */}
      <div class="group/metric">
        <div class="mb-2 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-1.5 transition-transform group-hover/metric:scale-110">
              <LuMemoryStick class="h-4 w-4 text-purple-500" />
            </div>
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Memory
            </span>
          </div>
          <span class="bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-sm font-bold text-transparent">
            {router.specs.RAM}
          </span>
        </div>
        <div class="relative h-3 overflow-hidden rounded-full bg-gray-200/50 dark:bg-gray-700/50">
          <div
            class={`
              absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600
              ${isAnimated ? "animate-pulse" : ""}
              transition-all duration-1000 ease-out
            `}
            style={`width: ${ramPercentage}%`}
          >
            <div class="absolute inset-0 bg-gradient-to-t from-white/0 to-white/40" />
            <div class="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
          <div class="absolute inset-0 flex items-center justify-end pr-2">
            <LuActivity class="h-2.5 w-2.5 text-white drop-shadow-lg" />
          </div>
        </div>
      </div>

      {/* Storage Info Card */}
      <div class="group/metric rounded-xl border border-green-200/30 bg-gradient-to-br from-green-50 to-emerald-50 p-3 dark:border-green-700/30 dark:from-green-950/20 dark:to-emerald-950/20">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 p-1.5 transition-transform group-hover/metric:scale-110">
              <LuHardDrive class="h-4 w-4 text-green-500" />
            </div>
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Storage
            </span>
          </div>
          <span class="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-sm font-bold text-transparent">
            {storageValue}
          </span>
        </div>
      </div>

      {/* Network Ports Pills */}
      <div class="group/metric">
        <div class="mb-2 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 p-1.5 transition-transform group-hover/metric:scale-110">
              <LuNetwork class="h-4 w-4 text-amber-500" />
            </div>
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Network Ports
            </span>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          {ports.map((port, index) => (
            <span
              key={port}
              class="inline-flex animate-fade-in items-center rounded-lg bg-gradient-to-r from-amber-100 to-orange-100 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:from-amber-900/30 dark:to-orange-900/30 dark:text-amber-300"
              style={`animation-delay: ${index * 100}ms`}
            >
              <div class="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
              {port}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});
