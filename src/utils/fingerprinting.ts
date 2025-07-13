/**
 * Hardware Fingerprinting and UUID Generation
 * 
 * Generates consistent device fingerprints and UUIDs based on hardware characteristics
 */

// Salam agar bana be har dalili ehsas mikonid ke in ravesh sakht hash va uuid ravesh rahati hastesh in bekhatere in hastesh ke ma nemikhastim az user data jam konim
// 100 dollar faghat rooye starlink kar mikone va agar starlink nadari be dardet nemikhore ma omidvar hastim ke in mablagh besoorate adelane bein afrad taghsim beshe 
// banabar in fosh madar gozashtam baraye har kasi ke oun section ro bekhone va sai bar dor zadane giveaway dashte bashe 

import { detectSuspiciousEnvironment } from './securityDetection';

// Environment variables
const UUID_VERSION = import.meta.env.VITE_UUID_VERSION || "v4";
const FINGERPRINT_COMPLEXITY = import.meta.env.VITE_FINGERPRINT_COMPLEXITY || "high";
const STORAGE_PREFIX = import.meta.env.VITE_STORAGE_PREFIX || "connect";
const FALLBACK_RESOLUTION = import.meta.env.VITE_FALLBACK_RESOLUTION || "1920x1080";
const ENABLE_DEBUG_LOGGING = import.meta.env.VITE_ENABLE_DEBUG_LOGGING === "true";
const SECURITY_HASH_SALT = import.meta.env.VITE_SECURITY_HASH_SALT || "connect-minimal-2024";

// Ultra-minimal cross-browser hardware fingerprint - ONLY screen resolution
function getHardwareDeviceFingerprint(): string {
  try {
    // Use ONLY screen resolution - the most basic property that is 100% identical
    // across ALL browsers on the same physical device
    const width = screen.width || 1920;
    const height = screen.height || 1080;
    
    // Create the simplest possible fingerprint using only screen resolution
    // Format: "hardware:WIDTHxHEIGHT"
    const fingerprint = `hardware:${width}x${height}`;
    
    return fingerprint;
    
  } catch (error) {
    // Ultimate fallback with configured resolution
    if (ENABLE_DEBUG_LOGGING) {
      console.warn('Fingerprinting error, using fallback:', error);
    }
    return `hardware:${FALLBACK_RESOLUTION}`;
  }
}

// Complex multi-layer hashing algorithm optimized for minimal but stable fingerprints
function createComplexHardwareHash(fingerprint: string): {
  primaryHash: string;
  secondaryHash: string;
  tertiaryHash: string;
  compositeHash: string;
} {
  // Extract components from the ultra-minimal fingerprint format
  // Format: "hardware:1920x1080"
  const parts = fingerprint.split(':');
  const screenInfo = parts[1] || 'unknown';
  
  // Primary hash - focuses on screen resolution with complex bit operations
  const primarySalt = `${SECURITY_HASH_SALT}-primary-${UUID_VERSION}`;
  let primaryHash = 0x12345678;
  const primaryData = screenInfo + primarySalt;
  
  for (let i = 0; i < primaryData.length; i++) {
    const char = primaryData.charCodeAt(i);
    primaryHash = ((primaryHash << 7) + (primaryHash << 3) - primaryHash) + char;
    primaryHash = ((primaryHash << 2) ^ (primaryHash >> 5)) + char * 31;
    primaryHash = primaryHash & 0xFFFFFFFF;
  }
  
  // Secondary hash - uses different salt and algorithm for diversity
  const secondarySalt = 'connect-screen-secondary-2024-v4';
  let secondaryHash = 0x87654321;
  const secondaryData = fingerprint + secondarySalt;
  
  for (let i = 0; i < secondaryData.length; i++) {
    const char = secondaryData.charCodeAt(i);
    secondaryHash = ((secondaryHash << 11) - (secondaryHash << 5) + secondaryHash) + char;
    secondaryHash = ((secondaryHash << 4) ^ (secondaryHash >> 7)) + char * 17;
    secondaryHash = secondaryHash & 0xFFFFFFFF;
  }
  
  // Tertiary hash - mathematical operations on screen dimensions
  const tertiarySalt = 'connect-resolution-tertiary-2024-v4';
  let tertiaryHash = 0xABCDEF12;
  
  // Extract width and height for mathematical operations
  const numbers = screenInfo.match(/\d+/g) || [];
  const width = parseInt(numbers[0] || '1920', 10);
  const height = parseInt(numbers[1] || '1080', 10);
  
  // Complex mathematical transformation based on screen dimensions
  const mathResult = (width * 31 + height * 17) ^ (width << 2) ^ (height << 3);
  const aspectRatio = Math.floor((width / height) * 1000); // Preserve aspect ratio
  const tertiaryData = tertiarySalt + mathResult.toString() + aspectRatio.toString();
  
  for (let i = 0; i < tertiaryData.length; i++) {
    const char = tertiaryData.charCodeAt(i);
    tertiaryHash = ((tertiaryHash << 13) + (tertiaryHash >> 3) + tertiaryHash) + char;
    tertiaryHash = ((tertiaryHash << 6) ^ (tertiaryHash >> 9)) + char * 23;
    tertiaryHash = tertiaryHash & 0xFFFFFFFF;
  }
  
  // Composite hash - combines all three hashes with advanced mixing
  const compositeSalt = 'connect-composite-minimal-2024-v4';
  const combinedHashes = primaryHash.toString(16) + secondaryHash.toString(16) + tertiaryHash.toString(16) + compositeSalt;
  
  let compositeHash = 0x13579BDF;
  for (let i = 0; i < combinedHashes.length; i++) {
    const char = combinedHashes.charCodeAt(i);
    compositeHash = ((compositeHash << 5) + (compositeHash << 2) - compositeHash) + char;
    compositeHash = compositeHash & 0xFFFFFFFF;
    
    // Enhanced mixing every 4 characters with additional bit operations
    if (i % 4 === 3) {
      compositeHash = ((compositeHash << 3) ^ (compositeHash >> 5)) + i;
      compositeHash = ((compositeHash << 1) ^ (compositeHash >> 11)) + char;
      compositeHash = compositeHash & 0xFFFFFFFF;
    }
  }
  
  // Convert all hashes to positive hex values
  return {
    primaryHash: Math.abs(primaryHash).toString(16).padStart(8, '0'),
    secondaryHash: Math.abs(secondaryHash).toString(16).padStart(8, '0'),
    tertiaryHash: Math.abs(tertiaryHash).toString(16).padStart(8, '0'),
    compositeHash: Math.abs(compositeHash).toString(16).padStart(8, '0')
  };
}

// Generate complex hardware-based UUID that's identical across all browsers on the same device
export async function generateUserUUID(): Promise<string> {
  if (typeof window === 'undefined') {
    // Server-side fallback
    return 'server-hardware-uuid-12345678-87654321-abcdef12';
  }

  try {
    // Get the complex hardware fingerprint with multiple components
    const hardwareFingerprint = getHardwareDeviceFingerprint();
    
    // Generate complex multi-layer hashes
    const hashes = createComplexHardwareHash(hardwareFingerprint);
    
    // Get environment check for prefix only (not included in hash to maintain consistency)
    const environmentCheck = detectSuspiciousEnvironment();
    
    // Determine UUID prefix based on environment
    let prefix = 'hardware';
    if (environmentCheck.isHeadless) {
      prefix = 'headless';
    } else if (environmentCheck.isVirtualMachine) {
      prefix = 'virtual';
    } else if (environmentCheck.isAutomation) {
      prefix = 'automation';
    } else if (environmentCheck.riskScore > 50) {
      prefix = 'suspicious';
    }
    
    // Create complex UUID format with multiple hash components
    // Format: prefix-primaryHash-secondaryHash-tertiaryHash
    const hardwareUUID = `${prefix}-${hashes.primaryHash}-${hashes.secondaryHash}-${hashes.tertiaryHash}`;
    
    // Cache in localStorage with additional metadata
    try {
      localStorage.setItem(`${STORAGE_PREFIX}_hardware_uuid`, hardwareUUID);
      localStorage.setItem(`${STORAGE_PREFIX}_uuid_timestamp`, Date.now().toString());
      localStorage.setItem(`${STORAGE_PREFIX}_fingerprint_hash`, hashes.compositeHash);
      localStorage.setItem(`${STORAGE_PREFIX}_fingerprint_complexity`, FINGERPRINT_COMPLEXITY);
      localStorage.setItem(`${STORAGE_PREFIX}_fingerprint_components`, '2'); // Always 2: "hardware" and "resolution"
    } catch (e) {
      // Ignore localStorage errors
    }
    
    return hardwareUUID;
    
  } catch (error) {
    // Enhanced fallback that maintains complexity
    try {
      const basicFingerprint = `hardware:${screen.width || 1920}x${screen.height || 1080}`;
      const fallbackHashes = createComplexHardwareHash(basicFingerprint);
      const fallbackUUID = `fallback-${fallbackHashes.primaryHash}-${fallbackHashes.secondaryHash}-${fallbackHashes.tertiaryHash}`;
      
      try {
        localStorage.setItem('connect_hardware_uuid', fallbackUUID);
        localStorage.setItem('connect_fallback_flag', 'true');
      } catch (e) {
        // Ignore localStorage errors
      }
      
      return fallbackUUID;
    } catch (fallbackError) {
      // Ultimate simple fallback
      const emergencyUUID = 'emergency-12345678-87654321-abcdef12';
      try {
        localStorage.setItem('connect_hardware_uuid', emergencyUUID);
      } catch (e) {
        // Ignore localStorage errors
      }
      return emergencyUUID;
    }
  }
}

// Enhanced utility functions for debugging and administration
export function clearStoredUUID(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}_hardware_uuid`);
      localStorage.removeItem(`${STORAGE_PREFIX}_uuid_timestamp`);
      localStorage.removeItem(`${STORAGE_PREFIX}_fingerprint_hash`);
      localStorage.removeItem(`${STORAGE_PREFIX}_fingerprint_complexity`);
      localStorage.removeItem(`${STORAGE_PREFIX}_fingerprint_components`);
      localStorage.removeItem(`${STORAGE_PREFIX}_suspicious_flag`);
      localStorage.removeItem(`${STORAGE_PREFIX}_fallback_flag`);
    } catch (e) {
      // Ignore localStorage errors in production
    }
  }
}

export function getStoredUUID(): string | null {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem(`${STORAGE_PREFIX}_hardware_uuid`);
    } catch (e) {
      return null;
    }
  }
  return null;
}

// Get comprehensive security information for debugging with complex fingerprint analysis
export async function getSecurityInfo(): Promise<{
  uuid: string | null;
  timestamp: string | null;
  fingerprintHash: string | null;
  fingerprintComponents: number;
  isSuspicious: boolean;
  isFallback: boolean;
  currentFingerprint: string;
  fingerprintAnalysis: {
    totalComponents: number;
    componentTypes: string[];
    complexity: 'low' | 'medium' | 'high';
  };
  hashComponents: {
    primary: string | null;
    secondary: string | null;
    tertiary: string | null;
    composite: string | null;
  };
  origin: string;
  isAuthorizedOrigin: boolean;
  environmentDetails: {
    isHeadless: boolean;
    isVirtualMachine: boolean;
    isAutomation: boolean;
    riskScore: number;
    suspiciousFlags: string[];
  };
}> {
  if (typeof window === 'undefined') {
    return {
      uuid: null,
      timestamp: null,
      fingerprintHash: null,
      fingerprintComponents: 0,
      isSuspicious: false,
      isFallback: false,
      currentFingerprint: 'server-side',
      fingerprintAnalysis: {
        totalComponents: 0,
        componentTypes: [],
        complexity: 'low'
      },
      hashComponents: {
        primary: null,
        secondary: null,
        tertiary: null,
        composite: null
      },
      origin: 'server-side',
      isAuthorizedOrigin: false,
      environmentDetails: {
        isHeadless: false,
        isVirtualMachine: false,
        isAutomation: false,
        riskScore: 0,
        suspiciousFlags: []
      }
    };
  }

  const uuid = localStorage.getItem(`${STORAGE_PREFIX}_hardware_uuid`);
  const timestamp = localStorage.getItem(`${STORAGE_PREFIX}_uuid_timestamp`);
  const fingerprintHash = localStorage.getItem(`${STORAGE_PREFIX}_fingerprint_hash`);
  const fingerprintComponents = parseInt(localStorage.getItem(`${STORAGE_PREFIX}_fingerprint_components`) || '0', 10);
  const isSuspicious = localStorage.getItem(`${STORAGE_PREFIX}_suspicious_flag`) === 'true';
  const isFallback = localStorage.getItem(`${STORAGE_PREFIX}_fallback_flag`) === 'true';
  const currentFingerprint = getHardwareDeviceFingerprint();
  const origin = window.location.origin;
  const isAuthorizedOrigin = true; // Simplified - no origin checking on client side
  
  // Analyze current fingerprint (ultra-minimal format)
  const fingerprintParts = currentFingerprint.split(':');
  const fingerprintAnalysis = {
    totalComponents: fingerprintParts.length,
    componentTypes: fingerprintParts.map((part, index) => index === 0 ? 'type' : 'screen'),
    complexity: 'high' as const // The complexity is in the hashing, not the component count
  };
  
  // Parse hash components from UUID
  const hashComponents = {
    primary: null as string | null,
    secondary: null as string | null,
    tertiary: null as string | null,
    composite: fingerprintHash
  };
  
  if (uuid) {
    const parts = uuid.split('-');
    hashComponents.primary = parts[1] || null;
    hashComponents.secondary = parts[2] || null;
    hashComponents.tertiary = parts[3] || null;
  }
  
  // Get current environment analysis
  const environmentCheck = detectSuspiciousEnvironment();

  return {
    uuid,
    timestamp,
    fingerprintHash,
    fingerprintComponents,
    isSuspicious: isSuspicious || environmentCheck.riskScore > 50,
    isFallback,
    currentFingerprint,
    fingerprintAnalysis,
    hashComponents,
    origin,
    isAuthorizedOrigin,
    environmentDetails: {
      isHeadless: environmentCheck.isHeadless,
      isVirtualMachine: environmentCheck.isVirtualMachine,
      isAutomation: environmentCheck.isAutomation,
      riskScore: environmentCheck.riskScore,
      suspiciousFlags: environmentCheck.suspiciousFlags
    }
  };
}

// Force regenerate UUID (for testing/debugging)
export async function forceRegenerateUUID(): Promise<string> {
  clearStoredUUID();
  return await generateUserUUID();
} 