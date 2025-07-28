import { component$ } from "@builder.io/qwik";
import type { FileTypeIconProps } from "../types";

/**
 * FileTypeIcon Component
 * 
 * Displays an appropriate icon based on file type or VPN protocol.
 * Helps users quickly identify configuration file types.
 */
export const FileTypeIcon = component$<FileTypeIconProps>(({
  fileType,
  size = "md",
  class: className = "",
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const sizeClass = sizeClasses[size];
  
  // Normalize file type
  const normalizedType = fileType.toLowerCase().replace(/^\./, "");
  
  // VPN Protocol Icons
  const vpnIcons: Record<string, any> = {
    wireguard: (
      <svg class={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
    openvpn: (
      <svg class={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 3.9a3 3 0 110 6 3 3 0 010-6zm7 9.1c0 3.48-2.21 6.59-5.5 7.75v-6.85c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v6.85C7.21 21.59 5 18.48 5 15v-4.08c0-.72.58-1.3 1.3-1.3.32 0 .63.12.87.34l1.91 1.73c.51.46 1.16.71 1.84.71h2.16c.68 0 1.33-.25 1.84-.71l1.91-1.73c.24-.22.55-.34.87-.34.72 0 1.3.58 1.3 1.3V15z"/>
      </svg>
    ),
    l2tp: (
      <svg class={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/>
        <path d="M8 13h2v4H8zm3 0h2v4h-2zm3 0h2v4h-2z"/>
      </svg>
    ),
    pptp: (
      <svg class={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        <path d="M9 11h6c.55 0 1-.45 1-1s-.45-1-1-1H9c-.55 0-1 .45-1 1s.45 1 1 1zm0 2h6c.55 0 1 .45 1 1s-.45 1-1 1H9c-.55 0-1-.45-1-1s.45-1 1-1z"/>
      </svg>
    ),
    sstp: (
      <svg class={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
        <path d="M11 15h2v3h-2z"/>
      </svg>
    ),
    ikev2: (
      <svg class={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm7 10c0 4.52-2.98 8.69-7 9.93-4.02-1.24-7-5.41-7-9.93V6.3l7-3.11 7 3.11V11z"/>
        <path d="M12 6c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0 2c-2.33 0-7 1.17-7 3.5V18h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
  };

  // File extension icons
  const fileIcons: Record<string, any> = {
    conf: (
      <svg class={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
        <path d="M8 15h8v2H8zm0-4h8v2H8zm0-4h5v2H8z"/>
      </svg>
    ),
    ovpn: (
      <svg class={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM18 20H6V4h6v6h6v10z"/>
        <path d="M12 12l-4 4h3v4h2v-4h3z"/>
      </svg>
    ),
    txt: (
      <svg class={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
        <path d="M8 15h8v2H8zm0-4h8v2H8zm0-4h5v2H8z"/>
      </svg>
    ),
    json: (
      <svg class={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
        <path d="M8 12h1.5v1.5H8zm1.5 1.5H11V15H9.5zm1.5 0h1.5V15H11zm1.5-1.5H14v1.5h-1.5zm1.5 0h1.5V13.5H15z"/>
      </svg>
    ),
    default: (
      <svg class={`${sizeClass} ${className}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 2c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM18 20H6V4h6v6h6v10z"/>
      </svg>
    ),
  };

  // Check if it's a VPN protocol
  if (vpnIcons[normalizedType]) {
    return <>{vpnIcons[normalizedType]}</>;
  }

  // Check if it's a known file extension
  if (fileIcons[normalizedType]) {
    return <>{fileIcons[normalizedType]}</>;
  }

  // Default file icon
  return <>{fileIcons.default}</>;
});