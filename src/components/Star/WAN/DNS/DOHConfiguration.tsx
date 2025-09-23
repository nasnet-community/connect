import { component$, type QRL, useSignal } from "@builder.io/qwik";
import { FormField, Input, ErrorMessage, Select } from "~/components/Core";
import { 
  LuLock, 
  LuServer, 
  LuShield, 
  LuHome, 
  LuGlobe
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
  return target === "Domestic" 
    ? <LuHome class="h-4 w-4" />
    : <LuShield class="h-4 w-4" />;
};

const getNetworkColors = (target: "Domestic" | "VPN") => {
  return target === "Domestic"
    ? {
        gradient: "from-orange-500/15 via-orange-400/10 to-transparent",
        border: "border-orange-200/50 dark:border-orange-700/50",
        glow: "shadow-orange-500/20",
        text: "text-orange-600 dark:text-orange-400",
        bg: "bg-orange-50 dark:bg-orange-900/20"
      }
    : {
        gradient: "from-green-500/15 via-green-400/10 to-transparent",
        border: "border-green-200/50 dark:border-green-700/50", 
        glow: "shadow-green-500/20",
        text: "text-green-600 dark:text-green-400",
        bg: "bg-green-50 dark:bg-green-900/20"
      };
};

export const DOHConfiguration = component$<DOHConfigurationProps>(
  ({ dohConfig: _dohConfig, networkInfo, domainError, bindingError, dohPresets = [], disabled = false, onApplyDOHPreset$ }) => {
    const isDropdownOpen = useSignal(false);
    const colors = getNetworkColors(networkInfo.target);

    return (
      <div class={`
        group relative overflow-visible rounded-xl backdrop-blur-md
        ${disabled
          ? 'bg-gray-100/50 dark:bg-gray-800/30 opacity-60'
          : 'bg-white/70 dark:bg-gray-900/70'
        }
        border-2 ${disabled ? 'border-gray-300/30 dark:border-gray-600/30' : colors.border}
        shadow-lg ${disabled ? '' : `hover:shadow-xl ${colors.glow}`}
        transition-all duration-500 ease-out
        ${disabled ? '' : 'hover:scale-[1.01] hover:backdrop-blur-lg'}
        motion-safe:animate-fade-in-up animation-delay-200
        ${isDropdownOpen.value ? 'z-[100]' : ''}
      `}>
        {/* Animated Background */}
        <div class={`
          absolute inset-0 bg-gradient-to-br ${colors.gradient}
          opacity-0 group-hover:opacity-100 transition-opacity duration-700
        `} />

        {/* Header */}
        <div class="relative p-6 border-b border-gray-200/30 dark:border-gray-700/30">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              {/* DOH Icon */}
              <div class="p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm
                          group-hover:bg-white/80 dark:group-hover:bg-gray-800/80
                          transition-all duration-300 shadow-lg">
                <LuLock class="h-6 w-6 text-cyan-500 dark:text-cyan-400" />
              </div>
              
              <div class="flex-1">
                <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2
                           group-hover:text-gray-800 dark:group-hover:text-gray-100
                           transition-colors duration-300">
                  {$localize`DNS over HTTPS (DOH)`}
                </h4>
                
                {/* Network Target Indicator */}
                <div class={`
                  inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
                  ${colors.bg} ${colors.text} border border-current/20
                  animate-scale-in
                `}>
                  {getNetworkIcon(networkInfo.target)}
                  <span>{networkInfo.label}</span>
                </div>
                
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-2
                         group-hover:text-gray-700 dark:group-hover:text-gray-300
                         transition-colors duration-300">
                  {networkInfo.description}
                </p>
              </div>
            </div>

            {/* Status Section */}
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-3">
                <div class={`
                  flex items-center justify-center w-12 h-6 rounded-full
                  ${disabled
                    ? 'bg-gray-300 dark:bg-gray-600'
                    : 'bg-red-100 dark:bg-red-900/30'
                  }
                `}>
                  <div class={`
                    w-4 h-4 rounded-full transition-all duration-200
                    ${disabled
                      ? 'bg-gray-500 translate-x-[-8px]'
                      : 'bg-red-500 translate-x-[-8px]'
                    }
                  `} />
                </div>
                <div class="text-right">
                  <div class={`text-sm font-medium ${
                    disabled
                      ? 'text-gray-500 dark:text-gray-400'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {$localize`Disabled`}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {disabled
                      ? $localize`Currently unavailable`
                      : $localize`Standard DNS`
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Fields */}
        {!disabled && (
          <div class="relative p-6 space-y-6 animate-slide-down opacity-40 pointer-events-none">
            {/* Disabled Notice */}
            <div class="mb-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
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
                <div class="relative group/input">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <LuGlobe class="h-4 w-4 text-gray-400 group-focus-within/input:text-primary-500 
                                     transition-colors duration-200" />
                  </div>
                  
                  <Input
                    type="text"
                    value=""
                    placeholder="cloudflare-dns.com"
                    disabled={true}
                    class={`
                      pl-11 pr-4 h-12 rounded-lg
                      bg-gray-100/60 dark:bg-gray-700/60 backdrop-blur-sm
                      border-gray-300/60 dark:border-gray-600/60
                      cursor-not-allowed
                      transition-all duration-300
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
                <div class="relative group/input">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <LuServer class="h-4 w-4 text-gray-400 group-focus-within/input:text-primary-500 
                                     transition-colors duration-200" />
                  </div>
                  
                  <Input
                    type="text"
                    value=""
                    placeholder="192.168.1.1"
                    disabled={true}
                    class={`
                      pl-11 pr-4 h-12 rounded-lg
                      bg-gray-100/60 dark:bg-gray-700/60 backdrop-blur-sm
                      border-gray-300/60 dark:border-gray-600/60
                      cursor-not-allowed
                      transition-all duration-300
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
                  class="w-full opacity-50 cursor-not-allowed"
                  size="md"
                />
              </div>
            )}
          </div>
        )}

        {/* Floating Glow Effect */}
        <div class={`
          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-15
          bg-gradient-to-r ${colors.gradient}
          blur-xl transition-opacity duration-700 -z-10
        `} />
      </div>
    );
  }
);