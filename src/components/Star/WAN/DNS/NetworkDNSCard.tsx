import { component$, type QRL, useSignal, $ } from "@builder.io/qwik";
import {
  FormField,
  Input,
  ErrorMessage,
  Select,
  Button,
} from "~/components/Core";
import type { SelectOption } from "~/components/Core/Select/UnifiedSelect";
import {
  LuGlobe,
  LuShield,
  LuSplit,
  LuHome,
  LuCopy,
  LuCheck,
  LuServer,
} from "@qwikest/icons/lucide";
import type { NetworkDNSConfig, NetworkType, DNSPreset } from "./types";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface NetworkDNSCardProps {
  config: NetworkDNSConfig;
  error?: string;
  availablePresets?: DNSPreset[];
  onDNSChange$: QRL<(networkType: NetworkType, value: string) => void>;
  onCopyDNS$?: QRL<(networkType: NetworkType) => Promise<boolean>>;
  onApplyPreset$?: QRL<(networkType: NetworkType, preset: DNSPreset) => void>;
}

const getNetworkIcon = (type: NetworkType, isAnimated = false) => {
  const baseClass = `h-5 w-5 transition-all duration-300 ${isAnimated ? "animate-pulse-subtle" : ""}`;

  switch (type) {
    case "Foreign":
      return (
        <LuGlobe class={`${baseClass} text-blue-500 dark:text-blue-400`} />
      );
    case "VPN":
      return (
        <LuShield class={`${baseClass} text-green-500 dark:text-green-400`} />
      );
    case "Split":
      return (
        <LuSplit class={`${baseClass} text-purple-500 dark:text-purple-400`} />
      );
    case "Domestic":
      return (
        <LuHome class={`${baseClass} text-orange-500 dark:text-orange-400`} />
      );
  }
};

const getNetworkColor = (type: NetworkType) => {
  switch (type) {
    case "Foreign":
      return {
        primary: "blue",
        gradient: "from-blue-500/10 via-blue-400/5 to-transparent",
        border: "border-blue-200/40 dark:border-blue-700/40",
        glow: "shadow-blue-500/20",
      };
    case "VPN":
      return {
        primary: "green",
        gradient: "from-green-500/10 via-green-400/5 to-transparent",
        border: "border-green-200/40 dark:border-green-700/40",
        glow: "shadow-green-500/20",
      };
    case "Split":
      return {
        primary: "purple",
        gradient: "from-purple-500/10 via-purple-400/5 to-transparent",
        border: "border-purple-200/40 dark:border-purple-700/40",
        glow: "shadow-purple-500/20",
      };
    case "Domestic":
      return {
        primary: "orange",
        gradient: "from-orange-500/10 via-orange-400/5 to-transparent",
        border: "border-orange-200/40 dark:border-orange-700/40",
        glow: "shadow-orange-500/20",
      };
  }
};

export const NetworkDNSCard = component$<NetworkDNSCardProps>(
  ({
    config,
    error,
    availablePresets = [],
    onDNSChange$,
    onCopyDNS$,
    onApplyPreset$,
  }) => {
    const locale = useMessageLocale();
    const copied = useSignal(false);
    const isDropdownOpen = useSignal(false);
    const colors = getNetworkColor(config.type);
    const isValidDNS = config.dns && config.dns.trim().length > 0;

    const handleCopy = $(async () => {
      if (onCopyDNS$ && config.dns) {
        const success = await onCopyDNS$(config.type);
        if (success) {
          copied.value = true;
          setTimeout(() => {
            copied.value = false;
          }, 2000);
        }
      }
    });

    const handlePresetSelect = $((value: string | string[]) => {
      if (onApplyPreset$) {
        const presetValue = Array.isArray(value) ? value[0] : value;
        const preset = availablePresets.find((p) => p.primary === presetValue);
        if (preset) {
          onApplyPreset$(config.type, preset);
        }
      }
    });

    // Convert available DNS presets to SelectOption format
    const presetOptions: SelectOption[] = availablePresets.map((preset) => ({
      value: preset.primary,
      label: `${preset.name} (${preset.primary})`,
    }));

    return (
      <div
        class={`
        group relative overflow-visible rounded-xl border
        bg-white/70 backdrop-blur-md 
        dark:bg-gray-900/70 ${colors.border}
        shadow-lg hover:shadow-xl ${colors.glow}
        transition-all duration-500 ease-out
        hover:scale-[1.02] hover:backdrop-blur-lg
        motion-safe:animate-fade-in-up
        ${isDropdownOpen.value ? "z-[100]" : ""}
      `}
      >
        {/* Animated Background Gradient */}
        <div
          class={`
          absolute inset-0 bg-gradient-to-br ${colors.gradient}
          opacity-0 transition-opacity duration-700 group-hover:opacity-100
        `}
        />

        {/* Content */}
        <div class="relative space-y-4 overflow-visible p-6">
          {/* Header */}
          <div class="flex items-start gap-4">
            <div
              class="rounded-xl bg-white/50 p-3 shadow-lg backdrop-blur-sm 
                        transition-all duration-300 
                        group-hover:bg-white/70 dark:bg-gray-800/50 dark:group-hover:bg-gray-800/70"
            >
              {getNetworkIcon(config.type, !!isValidDNS)}
            </div>

            <div class="min-w-0 flex-1">
              <h3
                class="text-lg font-semibold text-gray-900 transition-colors 
                         duration-300 group-hover:text-gray-800
                         dark:text-white dark:group-hover:text-gray-100"
              >
                {config.label}
              </h3>
              <p
                class="text-sm leading-relaxed text-gray-600 
                       transition-colors duration-300
                       group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300"
              >
                {config.description}
              </p>

              {/* Status Badge */}
              {isValidDNS && (
                <div
                  class="mt-2 inline-flex animate-scale-in items-center gap-1.5 rounded-full 
                           bg-green-100 px-2 py-1
                           text-xs font-medium 
                           text-green-700 dark:bg-green-900/30
                           dark:text-green-300"
                >
                  <LuCheck class="h-3 w-3" />
                  {semanticMessages.dns_configured({}, { locale })}
                </div>
              )}
            </div>

            {/* Copy Button */}
            {isValidDNS && onCopyDNS$ && (
              <div class="group/tooltip relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick$={handleCopy}
                  class={`
                    p-2 opacity-0 transition-all duration-300 group-hover:opacity-100
                    hover:scale-110 ${copied.value ? "text-green-500" : "text-gray-500"}
                  `}
                >
                  {copied.value ? (
                    <LuCheck class="h-4 w-4" />
                  ) : (
                    <LuCopy class="h-4 w-4" />
                  )}
                </Button>
                <div
                  class="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 
                            transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 
                            text-xs text-white opacity-0 transition-opacity 
                            duration-200 group-hover/tooltip:opacity-100 dark:bg-gray-200 dark:text-gray-800"
                >
                  {copied.value
                    ? semanticMessages.dns_copied({}, { locale })
                    : semanticMessages.dns_copy_action({}, { locale })}
                </div>
              </div>
            )}
          </div>

          {/* DNS Input Section */}
          <div class="space-y-3">
            <FormField
              label={semanticMessages.dns_server_ipv4_label({}, { locale })}
              error={error}
              required={config.required}
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
                  value={config.dns}
                  placeholder={config.placeholder}
                  onInput$={(_, element) => {
                    onDNSChange$(
                      config.type,
                      (element as unknown as HTMLInputElement).value,
                    );
                  }}
                  class={`
                    h-11 rounded-lg border-gray-200/60 bg-white/60
                    pl-11 pr-4 backdrop-blur-sm
                    transition-all duration-300
                    hover:bg-white/70 focus:border-primary-400
                    focus:bg-white/80 focus:ring-2
                    focus:ring-primary-500/20 dark:border-gray-700/60
                    dark:bg-gray-800/60 dark:hover:bg-gray-800/70
                    dark:focus:border-primary-500 dark:focus:bg-gray-800/80
                    ${
                      error
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : ""
                    }
                  `}
                />
              </div>
            </FormField>

            {/* DNS Presets */}
            {availablePresets.length > 0 && onApplyPreset$ && (
              <Select
                placeholder={semanticMessages.dns_quick_presets({}, { locale })}
                options={presetOptions}
                onChange$={handlePresetSelect}
                onOpenChange$={$((isOpen: boolean) => {
                  isDropdownOpen.value = isOpen;
                })}
                class="w-full"
                size="sm"
              />
            )}

            {/* Error Message */}
            {error && (
              <div class="animate-slide-up">
                <ErrorMessage message={error} />
              </div>
            )}
          </div>
        </div>

        {/* Floating Glow Effect */}
        <div
          class={`
          absolute inset-0 rounded-xl bg-gradient-to-r opacity-0
          group-hover:opacity-20 ${colors.gradient}
          -z-10 blur-xl transition-opacity duration-700
        `}
        />
      </div>
    );
  },
);
