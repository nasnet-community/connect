import { component$, type QRL, useSignal } from "@builder.io/qwik";
import { FormField, Input, ErrorMessage, Select } from "~/components/Core";
import {
  LuLock,
  LuServer,
  LuShield,
  LuHome,
  LuGlobe,
} from "@qwikest/icons/lucide";
import type { DOHConfig } from "../../StarContext/WANType";
import type { DOHNetworkInfo, DNSPreset } from "./types";

interface DOHConfigurationProps {
  dohConfig: DOHConfig;
  networkInfo: DOHNetworkInfo;
  domainError?: string;
  bindingError?: string;
  dohPresets?: DNSPreset[];
  disabled?: boolean;
  onApplyDOHPreset$?: QRL<(preset: DNSPreset) => void>;
}

const getNetworkIcon = (target: "Domestic" | "VPN") => {
  return target === "Domestic" ? (
    <LuHome class="h-4 w-4" />
  ) : (
    <LuShield class="h-4 w-4" />
  );
};

const getNetworkColors = (target: "Domestic" | "VPN") => {
  return target === "Domestic"
    ? {
        gradient: "from-orange-500/15 via-orange-400/10 to-transparent",
        border: "border-orange-200/50 dark:border-orange-700/50",
        glow: "shadow-orange-500/20",
        text: "text-orange-600 dark:text-orange-400",
        bg: "bg-orange-50 dark:bg-orange-900/20",
      }
    : {
        gradient: "from-green-500/15 via-green-400/10 to-transparent",
        border: "border-green-200/50 dark:border-green-700/50",
        glow: "shadow-green-500/20",
        text: "text-green-600 dark:text-green-400",
        bg: "bg-green-50 dark:bg-green-900/20",
      };
};

export const DOHConfiguration = component$<DOHConfigurationProps>(
  ({
    dohConfig: _dohConfig,
    networkInfo,
    domainError,
    bindingError,
    dohPresets = [],
    disabled = false,
    onApplyDOHPreset$,
  }) => {
    const isDropdownOpen = useSignal(false);
    const colors = getNetworkColors(networkInfo.target);

    return (
      <div
        class={`
        group relative overflow-visible rounded-xl backdrop-blur-md
        ${
          disabled
            ? "bg-gray-100/50 opacity-60 dark:bg-gray-800/30"
            : "bg-white/70 dark:bg-gray-900/70"
        }
        border-2 ${disabled ? "border-gray-300/30 dark:border-gray-600/30" : colors.border}
        shadow-lg ${disabled ? "" : `hover:shadow-xl ${colors.glow}`}
        transition-all duration-500 ease-out
        ${disabled ? "" : "hover:scale-[1.01] hover:backdrop-blur-lg"}
        animation-delay-200 motion-safe:animate-fade-in-up
        ${isDropdownOpen.value ? "z-[100]" : ""}
      `}
      >
        {/* Animated Background */}
        <div
          class={`
          absolute inset-0 bg-gradient-to-br ${colors.gradient}
          opacity-0 transition-opacity duration-700 group-hover:opacity-100
        `}
        />

        {/* Header */}
        <div class="relative border-b border-gray-200/30 p-6 dark:border-gray-700/30">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              {/* DOH Icon */}
              <div
                class="rounded-xl bg-white/60 p-3 shadow-lg backdrop-blur-sm
                          transition-all duration-300
                          group-hover:bg-white/80 dark:bg-gray-800/60 dark:group-hover:bg-gray-800/80"
              >
                <LuLock class="h-6 w-6 text-cyan-500 dark:text-cyan-400" />
              </div>

              <div class="flex-1">
                <h4
                  class="mb-2 text-xl font-bold text-gray-900 transition-colors
                           duration-300 group-hover:text-gray-800
                           dark:text-white dark:group-hover:text-gray-100"
                >
                  {$localize`DNS over HTTPS (DOH)`}
                </h4>

                {/* Network Target Indicator */}
                <div
                  class={`
                  inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium
                  ${colors.bg} ${colors.text} border-current/20 animate-scale-in
                  border
                `}
                >
                  {getNetworkIcon(networkInfo.target)}
                  <span>{networkInfo.label}</span>
                </div>

                <p
                  class="mt-2 text-sm text-gray-600 transition-colors
                         duration-300 group-hover:text-gray-700
                         dark:text-gray-400 dark:group-hover:text-gray-300"
                >
                  {networkInfo.description}
                </p>
              </div>
            </div>

            {/* Status Section */}
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-3">
                <div
                  class={`
                  flex h-6 w-12 items-center justify-center rounded-full
                  ${
                    disabled
                      ? "bg-gray-300 dark:bg-gray-600"
                      : "bg-red-100 dark:bg-red-900/30"
                  }
                `}
                >
                  <div
                    class={`
                    h-4 w-4 rounded-full transition-all duration-200
                    ${
                      disabled
                        ? "translate-x-[-8px] bg-gray-500"
                        : "translate-x-[-8px] bg-red-500"
                    }
                  `}
                  />
                </div>
                <div class="text-right">
                  <div
                    class={`text-sm font-medium ${
                      disabled
                        ? "text-gray-500 dark:text-gray-400"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {$localize`Disabled`}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {disabled
                      ? $localize`Currently unavailable`
                      : $localize`Standard DNS`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Fields */}
        {!disabled && (
          <div class="pointer-events-none relative animate-slide-down space-y-6 p-6 opacity-40">
            {/* Disabled Notice */}
            <div class="mb-4 rounded-lg border border-gray-200 bg-gray-100 p-3 dark:border-gray-700 dark:bg-gray-800">
              <p class="text-center text-sm text-gray-600 dark:text-gray-400">
                {$localize`DNS over HTTPS (DOH) is currently disabled. This feature is temporarily unavailable.`}
              </p>
            </div>
            {/* Domain Configuration */}
            <div class="space-y-4">
              <FormField
                label={$localize`DOH Domain`}
                error={domainError}
                required={true}
                helperText={$localize`Enter the domain for DNS over HTTPS service (e.g., cloudflare-dns.com)`}
                class="space-y-2"
              >
                <div class="group/input relative">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <LuGlobe
                      class="h-4 w-4 text-gray-400 transition-colors 
                                     duration-200 group-focus-within/input:text-primary-500"
                    />
                  </div>

                  <Input
                    type="text"
                    value=""
                    placeholder="cloudflare-dns.com"
                    disabled={true}
                    class={`
                      h-12 cursor-not-allowed rounded-lg border-gray-300/60
                      bg-gray-100/60 pl-11 pr-4
                      backdrop-blur-sm transition-all
                      duration-300
                      dark:border-gray-600/60 dark:bg-gray-700/60
                    `}
                  />
                </div>

                {domainError && (
                  <div class="animate-slide-up">
                    <ErrorMessage message={domainError} />
                  </div>
                )}
              </FormField>

              {/* Binding IP Configuration */}
              <FormField
                label={$localize`Binding IP Address`}
                error={bindingError}
                helperText={$localize`Optional: Bind DOH to specific IP address for this network`}
                class="space-y-2"
              >
                <div class="group/input relative">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <LuServer
                      class="h-4 w-4 text-gray-400 transition-colors 
                                     duration-200 group-focus-within/input:text-primary-500"
                    />
                  </div>

                  <Input
                    type="text"
                    value=""
                    placeholder="192.168.1.1"
                    disabled={true}
                    class={`
                      h-12 cursor-not-allowed rounded-lg border-gray-300/60
                      bg-gray-100/60 pl-11 pr-4
                      backdrop-blur-sm transition-all
                      duration-300
                      dark:border-gray-600/60 dark:bg-gray-700/60
                    `}
                  />
                </div>

                {bindingError && (
                  <div class="animate-slide-up">
                    <ErrorMessage message={bindingError} />
                  </div>
                )}
              </FormField>
            </div>

            {/* DOH Presets */}
            {dohPresets.length > 0 && onApplyDOHPreset$ && (
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {$localize`Quick DNS Presets`}
                </label>
                <Select
                  placeholder={$localize`Select a DOH provider`}
                  options={[]}
                  disabled={true}
                  class="w-full cursor-not-allowed opacity-50"
                  size="md"
                />
              </div>
            )}
          </div>
        )}

        {/* Floating Glow Effect */}
        <div
          class={`
          absolute inset-0 rounded-xl bg-gradient-to-r opacity-0
          group-hover:opacity-15 ${colors.gradient}
          -z-10 blur-xl transition-opacity duration-700
        `}
        />
      </div>
    );
  },
);
