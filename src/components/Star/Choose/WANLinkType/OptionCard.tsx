import {
  component$,
  type JSXOutput,
  type PropFunction,
} from "@builder.io/qwik";

export interface OptionCardProps {
  value: any;
  isSelected: boolean;
  icon: JSXOutput;
  title: string;
  description: string;
  features: string[];
  graph: JSXOutput;
  onSelect$: PropFunction<(value: any) => void>;
  isHorizontal?: boolean;
}

export const OptionCard = component$((props: OptionCardProps) => {
  const {
    value,
    isSelected,
    icon,
    title,
    description,
    features,
    graph,
    onSelect$,
    isHorizontal = false,
  } = props;

  return (
    <div
      onClick$={(e) => {
        const target = e.target as HTMLElement;
        if (
          target.closest(".network-graph") ||
          target.closest(".topology-container")
        )
          return;
        onSelect$(value);
      }}
      class={`option-card relative cursor-pointer overflow-visible rounded-2xl transition-all duration-500
        ${
          isSelected
            ? "bg-primary-500/10 ring-2 ring-primary-500 dark:bg-primary-500/15"
            : "hover:bg-surface-secondary/50 dark:hover:bg-surface-dark-secondary/60 bg-surface/50 dark:bg-surface-dark/50"
        }
      `}
    >
      {/* Selected indicator badge - only shows when option is selected */}
      {isSelected && (
        <div class="absolute right-4 top-4 z-10 rounded-full bg-success/15 px-3 py-1 dark:bg-success/25">
          <span class="text-xs font-medium text-success dark:text-success-light">
            {$localize`Selected`}
          </span>
        </div>
      )}

{isHorizontal ? (
        /* Horizontal layout for "both" option */
        <div class="flex flex-col md:flex-row md:items-start md:gap-8 p-6">
          {/* Left side - Content */}
          <div class="flex-1 space-y-6">
            {/* Option icon container with conditional styling */}
            <div
              class={`option-icon flex h-16 w-16 items-center justify-center
              rounded-xl transition-all duration-500
              ${
                isSelected
                  ? "bg-primary-500 text-white"
                  : "bg-primary-500/15 text-primary-500 dark:bg-primary-500/20 dark:text-primary-400"
              }`}
            >
              {icon}
            </div>

            <div class="space-y-4">
              {/* Option title and description */}
              <div>
                <h3 class="mb-2 text-xl font-semibold text-text dark:text-text-dark-default">
                  {title}
                </h3>
                <p class="text-text-secondary/90 dark:text-text-dark-secondary/95">
                  {description}
                </p>
              </div>

              {/* Option features list with checkmarks */}
              <div class="space-y-3">
                {features.map((feature) => (
                  <div
                    key={feature}
                    class="text-text-secondary/90 dark:text-text-dark-secondary/95 flex items-center"
                  >
                    <svg
                      class="mr-3 h-5 w-5 text-primary-500 dark:text-primary-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span class="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Graph */}
          <div class="flex-1 mt-6 md:mt-0">
            <div class="graph-container overflow-visible">
              {graph}
            </div>
          </div>
        </div>
      ) : (
        /* Vertical layout for regular options */
        <div class="space-y-6 p-6">
          {/* Option icon container with conditional styling */}
          <div
            class={`option-icon flex h-16 w-16 items-center justify-center
            rounded-xl transition-all duration-500
            ${
              isSelected
                ? "bg-primary-500 text-white"
                : "bg-primary-500/15 text-primary-500 dark:bg-primary-500/20 dark:text-primary-400"
            }`}
          >
            {icon}
          </div>

          <div class="space-y-4">
            {/* Option title and description */}
            <div>
              <h3 class="mb-2 text-xl font-semibold text-text dark:text-text-dark-default">
                {title}
              </h3>
              <p class="text-text-secondary/90 dark:text-text-dark-secondary/95">
                {description}
              </p>
            </div>

            {/* Option features list with checkmarks */}
            <div class="space-y-3">
              {features.map((feature) => (
                <div
                  key={feature}
                  class="text-text-secondary/90 dark:text-text-dark-secondary/95 flex items-center"
                >
                  <svg
                    class="mr-3 h-5 w-5 text-primary-500 dark:text-primary-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span class="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Network topology visualization - graph container with its own hover effect */}
            <div
              class={`pt-6 graph-container overflow-visible`}
            >
              {graph}
            </div>
          </div>
        </div>
      )}

      {/* Hover effect gradient overlay */}
      <div
        class="card-overlay absolute inset-0 bg-gradient-to-br 
        from-primary-500/10 to-secondary-500/10 opacity-0 transition-opacity
        duration-500 dark:from-primary-500/15 dark:to-secondary-500/15"
      />

      {/* Add CSS directly inside component */}
      <style
        dangerouslySetInnerHTML={`
        /* Only apply these effects when NOT hovering over the graph */
        .option-card:hover:not(:has(.topology-container:hover)) {
          transform: scale(1.01);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .option-card:hover:not(:has(.topology-container:hover)) .option-icon {
          transform: scale(1.1);
        }
        
        .option-card:hover:not(:has(.topology-container:hover)) .card-overlay {
          opacity: 1;
        }
        
        .graph-container {
          position: relative;
          z-index: auto;
        }
      `}
      />
    </div>
  );
});


