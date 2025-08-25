import { component$, type QRL, useSignal, $ } from "@builder.io/qwik";
import { FormField, Input, ErrorMessage, Select, Button } from "~/components/Core";
import type { SelectOption } from "~/components/Core/Select/UnifiedSelect";
import { 
  LuGlobe, 
  LuShield, 
  LuSplit, 
  LuHome, 
  LuCopy, 
  LuCheck,
  LuServer
} from "@qwikest/icons/lucide";
import type { NetworkDNSConfig, NetworkType, DNSPreset } from "./types";

interface NetworkDNSCardProps {
  config: NetworkDNSConfig;
  error?: string;
  dnsPresets?: DNSPreset[];
  onDNSChange$: QRL<(networkType: NetworkType, value: string) => void>;
  onCopyDNS$?: QRL<(networkType: NetworkType) => Promise<boolean>>;
  onApplyPreset$?: QRL<(networkType: NetworkType, preset: DNSPreset) => void>;
}

const getNetworkIcon = (type: NetworkType, isAnimated = false) => {
  const baseClass = `h-5 w-5 transition-all duration-300 ${isAnimated ? 'animate-pulse-subtle' : ''}`;
  
  switch (type) {
    case "Foreign":
      return <LuGlobe class={`${baseClass} text-blue-500 dark:text-blue-400`} />;
    case "VPN":
      return <LuShield class={`${baseClass} text-green-500 dark:text-green-400`} />;
    case "Split":
      return <LuSplit class={`${baseClass} text-purple-500 dark:text-purple-400`} />;
    case "Domestic":
      return <LuHome class={`${baseClass} text-orange-500 dark:text-orange-400`} />;
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
  ({ config, error, dnsPresets = [], onDNSChange$, onCopyDNS$, onApplyPreset$ }) => {
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
        const preset = dnsPresets.find(p => p.primary === presetValue);
        if (preset) {
          onApplyPreset$(config.type, preset);
        }
      }
    });

    // Convert DNS presets to SelectOption format
    const presetOptions: SelectOption[] = dnsPresets.map(preset => ({
      value: preset.primary,
      label: `${preset.name} (${preset.primary})`,
    }));

    return (
      <div class={`
        group relative overflow-visible rounded-xl backdrop-blur-md
        bg-white/70 dark:bg-gray-900/70 
        border ${colors.border}
        shadow-lg hover:shadow-xl ${colors.glow}
        transition-all duration-500 ease-out
        hover:scale-[1.02] hover:backdrop-blur-lg
        motion-safe:animate-fade-in-up
        ${isDropdownOpen.value ? 'z-[100]' : ''}
      `}>
        {/* Animated Background Gradient */}
        <div class={`
          absolute inset-0 bg-gradient-to-br ${colors.gradient}
          opacity-0 group-hover:opacity-100 transition-opacity duration-700
        `} />
        
        {/* Content */}
        <div class="relative overflow-visible p-6 space-y-4">
          {/* Header */}
          <div class="flex items-start gap-4">
            <div class="p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm 
                        group-hover:bg-white/70 dark:group-hover:bg-gray-800/70 
                        transition-all duration-300 shadow-lg">
              {getNetworkIcon(config.type, !!isValidDNS)}
            </div>
            
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white 
                         group-hover:text-gray-800 dark:group-hover:text-gray-100
                         transition-colors duration-300">
                {config.label}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 
                       group-hover:text-gray-700 dark:group-hover:text-gray-300
                       transition-colors duration-300 leading-relaxed">
                {config.description}
              </p>
              
              {/* Status Badge */}
              {isValidDNS && (
                <div class="mt-2 inline-flex items-center gap-1.5 px-2 py-1 
                           rounded-full text-xs font-medium
                           bg-green-100 dark:bg-green-900/30 
                           text-green-700 dark:text-green-300
                           animate-scale-in">
                  <LuCheck class="h-3 w-3" />
                  {$localize`Configured`}
                </div>
              )}
            </div>

            {/* Copy Button */}
            {isValidDNS && onCopyDNS$ && (
              <div class="relative group/tooltip">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick$={handleCopy}
                  class={`
                    p-2 opacity-0 group-hover:opacity-100 transition-all duration-300
                    hover:scale-110 ${copied.value ? 'text-green-500' : 'text-gray-500'}
                  `}
                >
                  {copied.value ? (
                    <LuCheck class="h-4 w-4" />
                  ) : (
                    <LuCopy class="h-4 w-4" />
                  )}
                </Button>
                <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 
                            px-2 py-1 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 
                            text-xs rounded opacity-0 group-hover/tooltip:opacity-100 
                            transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {copied.value ? $localize`Copied!` : $localize`Copy DNS`}
                </div>
              </div>
            )}
          </div>

          {/* DNS Input Section */}
          <div class="space-y-3">
            <FormField
              label={$localize`DNS Server IPv4 Address`}
              error={error}
              required={config.required}
              class="space-y-2"
            >
              <div class="relative group/input">
                <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <LuServer class="h-4 w-4 text-gray-400 group-focus-within/input:text-primary-500 
                                   transition-colors duration-200" />
                </div>
                
                <Input
                  type="text"
                  value={config.dns}
                  placeholder={config.placeholder}
                  onInput$={(_, element) => {
                    onDNSChange$(config.type, (element as unknown as HTMLInputElement).value);
                  }}
                  class={`
                    pl-11 pr-4 h-11 rounded-lg
                    bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm
                    border-gray-200/60 dark:border-gray-700/60
                    focus:bg-white/80 dark:focus:bg-gray-800/80
                    focus:border-primary-400 dark:focus:border-primary-500
                    focus:ring-2 focus:ring-primary-500/20
                    transition-all duration-300
                    hover:bg-white/70 dark:hover:bg-gray-800/70
                    ${error 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
                      : ""
                    }
                  `}
                />
              </div>
            </FormField>

            {/* DNS Presets */}
            {dnsPresets.length > 0 && onApplyPreset$ && (
              <Select
                placeholder={$localize`Quick DNS Presets`}
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
        <div class={`
          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20
          bg-gradient-to-r ${colors.gradient}
          blur-xl transition-opacity duration-700 -z-10
        `} />
      </div>
    );
  }
);