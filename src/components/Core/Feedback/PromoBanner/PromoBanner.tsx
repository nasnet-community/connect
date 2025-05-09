import { component$, type QRL, $ } from "@builder.io/qwik";

export interface VPNCredentials {
  server: string;
  username: string;
  password: string;
  [key: string]: string;
}

export interface PromoBannerProps {

  title: string;
  

  description: string;

  provider: string;
  

  imageUrl?: string;

  bgColorClass?: string;

  onCredentialsReceived$?: QRL<(credentials: VPNCredentials) => void>;
  

  class?: string;
}


export const PromoBanner = component$<PromoBannerProps>(({
  title,
  description,
  provider,
  imageUrl,
  bgColorClass = "bg-secondary-500/10",
  onCredentialsReceived$,
  class: className,
}) => {
  const getCredentials$ = $(async () => {
    const mockCredentials = {
      server: "vpn.example.com",
      username: "demo_user",
      password: "demo_password"
    };
    
    if (onCredentialsReceived$) {
      await onCredentialsReceived$(mockCredentials);
    }
  });

  return (
    <div class={`rounded-lg overflow-hidden ${bgColorClass} ${className || ""}`}>
      <div class="flex flex-col md:flex-row items-center">
        {imageUrl && (
          <div class="w-full md:w-1/3 p-4">
            <img 
              src={imageUrl} 
              alt={`${provider} VPN`}
              class="w-full h-auto rounded"
            />
          </div>
        )}
        
        <div class={`p-6 flex-1 ${!imageUrl ? 'w-full' : ''}`}>
          <h3 class="text-lg font-bold text-text-default dark:text-text-dark-default">
            {title}
          </h3>
          
          <p class="mt-2 text-text-secondary dark:text-text-dark-secondary">
            {description}
          </p>
          
          {onCredentialsReceived$ && (
            <button
              onClick$={getCredentials$}
              class="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg 
                hover:bg-primary-600 transition-colors"
            >
              {$localize`Get Free Access`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}); 