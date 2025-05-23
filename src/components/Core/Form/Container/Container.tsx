import { component$, Slot } from "@builder.io/qwik";

export interface ContainerProps {

  title?: string;

  description?: string;

  bordered?: boolean;

  class?: string;
}


export const Container = component$<ContainerProps>(({
  title,
  description,
  bordered = true,
  class: className,
}) => {
  return (
    <div 
      class={`
        space-y-4 
        ${bordered ? 'rounded-lg border border-border p-4 dark:border-border-dark' : ''}
        ${className || ""}
      `}
    >
      {title && (
        <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default">
          {title}
        </h3>
      )}
      
      {description && (
        <p class="text-sm text-text-muted dark:text-text-dark-muted">
          {description}
        </p>
      )}
      
      <div class="space-y-4">
        <Slot />
      </div>
      
      <Slot name="footer" />
    </div>
  );
}); 