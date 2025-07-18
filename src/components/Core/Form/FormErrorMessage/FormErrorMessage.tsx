import { component$, Slot, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export type FormErrorMessageSize = 'sm' | 'md' | 'lg';

export interface FormErrorMessageProps {

  children?: string;

  message?: string;

  size?: FormErrorMessageSize;
  

  icon?: any;

  id?: string;
  

  hasTopMargin?: boolean;
  

  animate?: boolean;
  

  role?: string;

  'aria-describedby'?: string;


  class?: string;
}


export const FormErrorMessage = component$<FormErrorMessageProps>(({ 
  children,
  message,
  size = 'md',
  icon,
  id,
  hasTopMargin = true,
  animate = true,
  role = 'alert',
  "aria-describedby": ariaDescribedby,
  class: className,
}) => {
  // If no message or children, don't render anything
  if (!message && !children) return null;
  
  // Track whether the component is mounted for animation
  const isMounted = useSignal(false);
  
  // Size classes
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  }[size];
  
  // Margin classes
  const marginClasses = hasTopMargin ? "mt-1" : "";
  
  // Animation classes
  const animationClasses = animate ? 
    `transition-all duration-200 ease-in-out ${isMounted.value ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-1'}` : 
    "";
  
  // Run only on the client to handle animation
  useVisibleTask$(()=> {
    // Set mounted to true after component mounts
    setTimeout(() => {
      isMounted.value = true;
    }, 10);
    
    // Set mounted to false before component unmounts
    return () => {
      isMounted.value = false;
    };
  });

  return (
    <p 
      id={id}
      class={`text-error-600 dark:text-error-300 ${sizeClasses} ${marginClasses} ${animationClasses} ${icon ? 'flex items-center gap-1.5' : ''} ${className || ""}`}
      role={role}
      aria-describedby={ariaDescribedby}
    >
      {icon && (
        <span class="flex-shrink-0 text-current">
          {icon}
        </span>
      )}
      <span>
        {message}
        {children}
        <Slot />
      </span>
    </p>
  );
});