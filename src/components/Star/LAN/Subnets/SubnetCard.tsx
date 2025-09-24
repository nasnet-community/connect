import { component$ } from "@builder.io/qwik";
import { Card, CardHeader, CardBody, Alert } from "~/components/Core";
import { SubnetInput } from "./SubnetInput";
import type { SubnetCardProps } from "./types";
import { LuAlertTriangle } from "@qwikest/icons/lucide";

/**
 * Modern card component for grouping subnet configurations
 * Features glassmorphism effects, gradient borders, and animated interactions
 */
export const SubnetCard = component$<SubnetCardProps>(({
  title,
  description,
  icon,
  category,
  configs,
  values,
  onChange$,
  errors = {},
  disabled = false,
  gradient = true,
  class: className = "",
}) => {
  
  // Color schemes for different categories
  const categoryStyles = {
    base: {
      border: "border-primary-200 dark:border-primary-800",
      gradient: "from-primary-500/10 via-blue-500/5 to-primary-500/10",
      icon: "text-primary-500 bg-primary-100 dark:bg-primary-900/30",
      header: "text-primary-700 dark:text-primary-300",
    },
    vpn: {
      border: "border-green-200 dark:border-green-800",
      gradient: "from-green-500/10 via-emerald-500/5 to-green-500/10",
      icon: "text-green-500 bg-green-100 dark:bg-green-900/30",
      header: "text-green-700 dark:text-green-300",
    },
    tunnel: {
      border: "border-purple-200 dark:border-purple-800",
      gradient: "from-purple-500/10 via-violet-500/5 to-purple-500/10",
      icon: "text-purple-500 bg-purple-100 dark:bg-purple-900/30",
      header: "text-purple-700 dark:text-purple-300",
    },
    "wan-domestic": {
      border: "border-orange-200 dark:border-orange-800",
      gradient: "from-orange-500/10 via-amber-500/5 to-orange-500/10",
      icon: "text-orange-500 bg-orange-100 dark:bg-orange-900/30",
      header: "text-orange-700 dark:text-orange-300",
    },
    "wan-foreign": {
      border: "border-blue-200 dark:border-blue-800",
      gradient: "from-blue-500/10 via-indigo-500/5 to-blue-500/10",
      icon: "text-blue-500 bg-blue-100 dark:bg-blue-900/30",
      header: "text-blue-700 dark:text-blue-300",
    },
    "vpn-client": {
      border: "border-teal-200 dark:border-teal-800",
      gradient: "from-teal-500/10 via-cyan-500/5 to-teal-500/10",
      icon: "text-teal-500 bg-teal-100 dark:bg-teal-900/30",
      header: "text-teal-700 dark:text-teal-300",
    },
  };

  const styles = categoryStyles[category];

  // Detect conflicts and errors in this card
  const configKeys = configs.map(c => c.key);
  const cardErrors = Object.entries(errors).filter(([key]) => configKeys.includes(key));
  const conflictErrors = cardErrors.filter(([_, error]) =>
    error.includes("Conflicts with") || error.includes("conflicts with")
  );
  const hasErrors = cardErrors.length > 0;
  const hasConflicts = conflictErrors.length > 0;

  return (
    <Card
      variant="outlined"
      elevation="sm"
      hoverEffect="shadow"
      class={`
        relative overflow-hidden transition-all duration-300
        ${hasErrors ? "border-red-300 dark:border-red-700 ring-2 ring-red-200 dark:ring-red-800" : styles.border}
        ${disabled ? "opacity-60" : "hover:shadow-lg hover:scale-[1.01]"}
        ${className}
      `}
    >
      {/* Gradient Background Overlay */}
      {gradient && (
        <div 
          class={`
            absolute inset-0 bg-gradient-to-br opacity-60
            ${styles.gradient}
            pointer-events-none
          `} 
        />
      )}

      {/* Glassmorphism Effect */}
      <div class="absolute inset-0 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm pointer-events-none" />

      {/* Content Container */}
      <div class="relative z-10">
        <CardHeader class="pb-4">
          <div class="flex items-center gap-4">
            {/* Icon */}
            {icon && (
              <div 
                class={`
                  flex items-center justify-center w-12 h-12 rounded-xl
                  transition-transform duration-300 hover:scale-110
                  ${styles.icon}
                `}
              >
                {icon}
              </div>
            )}

            {/* Title and Description */}
            <div class="flex-1">
              <h3 class={`text-xl font-semibold ${styles.header}`}>
                {title}
              </h3>
              {description && (
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              )}
            </div>

            {/* Configuration Count Badge */}
            <div class="flex items-center gap-2">
              <div class="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                <span class="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {configs.filter(c => values[c.key] !== null).length}/{configs.length}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Conflict Alert Banner */}
        {hasConflicts && (
          <div class="relative z-10 px-6 pb-4">
            <Alert
              status="error"
              title={$localize`Subnet Conflicts Detected`}
              class="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20"
            >
              <div class="flex gap-3">
                <LuAlertTriangle class="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div class="space-y-1">
                  <p class="text-sm text-red-700 dark:text-red-300">
                    {conflictErrors.length === 1
                      ? $localize`One subnet in this section conflicts with another:`
                      : $localize`${conflictErrors.length} subnets in this section have conflicts:`}
                  </p>
                  <ul class="text-xs text-red-600 dark:text-red-400 space-y-1">
                    {conflictErrors.map(([key, error]) => {
                      const config = configs.find(c => c.key === key);
                      return (
                        <li key={key} class="flex items-center gap-2">
                          <span class="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                          <span class="font-medium">{config?.label || key}:</span>
                          <span>{error}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Alert>
          </div>
        )}

        <CardBody>
          {/* Grid Layout for Subnet Inputs with Staggered Animation */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {configs.map((config, index) => (
              <div 
                key={config.key}
                class="group animate-in slide-in-from-bottom-2 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <SubnetInput
                  config={config}
                  value={values[config.key] ?? null}
                  onChange$={(value) => onChange$(config.key, value)}
                  error={errors[config.key]}
                  disabled={disabled}
                />

                {/* Subnet Preview on Hover */}
                {values[config.key] !== null && (
                  <div class="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {$localize`Network`}: 192.168.{values[config.key]}.0
                      {config.mask === 24 && (
                        <span class="ml-2">
                          ({$localize`254 hosts`})
                        </span>
                      )}
                      {config.mask === 30 && (
                        <span class="ml-2">
                          ({$localize`2 hosts`})
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {configs.length === 0 && (
            <div class="text-center py-8">
              <div class="text-gray-400 dark:text-gray-600 mb-2">
                <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m10-8l-4 4-4-4" />
                </svg>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {$localize`No ${category} networks to configure`}
              </p>
            </div>
          )}

          {/* Configuration Summary */}
          {configs.length > 0 && (
            <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-400">
                  {$localize`Configured networks`}
                </span>
                <span class={`font-medium ${styles.header}`}>
                  {configs.filter(c => values[c.key] !== null).length} / {configs.length}
                </span>
              </div>

              {/* Progress Bar */}
              <div class="mt-2">
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    class={`h-2 rounded-full transition-all duration-500 ${
                      category === 'base' ? 'bg-primary-500' :
                      category === 'vpn' ? 'bg-green-500' :
                      category === 'tunnel' ? 'bg-purple-500' :
                      category === 'wan-domestic' ? 'bg-orange-500' :
                      category === 'wan-foreign' ? 'bg-blue-500' : 'bg-teal-500'
                    }`}
                    style={{ 
                      width: configs.length > 0 
                        ? `${(configs.filter(c => values[c.key] !== null).length / configs.length) * 100}%` 
                        : '0%' 
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </div>

      {/* Hover Glow Effect */}
      <div
        class={`
          absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300
          group-hover:opacity-100 pointer-events-none
          ${category === 'base' ? 'shadow-primary-500/25' :
            category === 'vpn' ? 'shadow-green-500/25' :
            category === 'tunnel' ? 'shadow-purple-500/25' :
            category === 'wan-domestic' ? 'shadow-orange-500/25' :
            category === 'wan-foreign' ? 'shadow-blue-500/25' : 'shadow-teal-500/25'}
          hover:shadow-2xl
        `}
      />
    </Card>
  );
});