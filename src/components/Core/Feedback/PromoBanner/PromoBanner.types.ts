import { QRL } from '@builder.io/qwik';

export interface VPNCredentials {
  server: string;
  username: string;
  password: string;
  [key: string]: string;
}

export interface PromoBannerProps {
  /** Title of the promo banner */
  title: string;
  
  /** Description text for the promo */
  description: string;
  
  /** VPN provider name */
  provider: string;
  
  /** Optional image URL for the promo banner */
  imageUrl?: string;
  
  /** Optional background color class (TailwindCSS) */
  bgColorClass?: string;
  
  /** Callback function when credentials are received */
  onCredentialsReceived$?: QRL<(credentials: VPNCredentials) => void>;
  
  /** Additional CSS classes */
  class?: string;
} 