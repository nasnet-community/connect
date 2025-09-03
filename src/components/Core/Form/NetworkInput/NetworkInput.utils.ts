import type { NetworkPresets, NetworkValue, NetworkFormat } from "./NetworkInput.types";

/**
 * Network class presets with default configurations
 */
export const NETWORK_PRESETS: NetworkPresets = {
  classA: {
    prefix: "10.",
    suffix: ".0/8",
    mask: 8,
    inputFields: 2, // 10.[x].[y].0/8
    placeholders: [0, 0],
    defaultValues: [10, 20],
    allowedRange: {
      min: [0, 0],
      max: [255, 255]
    },
    description: "Class A network (10.x.y.0/8) - Large enterprise networks"
  },
  classB: {
    prefix: "172.16.",
    suffix: ".0/16",
    mask: 16,
    inputFields: 1, // 172.16.[x].0/16
    placeholders: [0],
    defaultValues: [10],
    allowedRange: {
      min: [0],
      max: [255]
    },
    description: "Class B network (172.16.x.0/16) - Medium-sized networks"
  },
  classC: {
    prefix: "192.168.",
    suffix: ".0/24",
    mask: 24,
    inputFields: 1, // 192.168.[x].0/24
    placeholders: [10],
    defaultValues: [10],
    allowedRange: {
      min: [1],
      max: [254]
    },
    description: "Class C network (192.168.x.0/24) - Small networks and home use"
  },
  custom: {
    prefix: "",
    suffix: "",
    mask: 24,
    inputFields: 4, // [w].[x].[y].[z]/mask
    placeholders: [192, 168, 1, 0],
    defaultValues: [192, 168, 1, 0],
    allowedRange: {
      min: [1, 0, 0, 0],
      max: [255, 255, 255, 255]
    },
    description: "Custom network format - Full control over IP addressing"
  }
};

/**
 * Common reserved/excluded IP addresses for each octet position
 */
export const RESERVED_ADDRESSES = {
  classA: {
    second: [0, 127, 169, 224, 240], // Avoid these in second octet
    third: [255] // Avoid broadcast
  },
  classB: {
    third: [0, 255] // Avoid network and broadcast
  },
  classC: {
    third: [0, 1, 255] // Avoid network, gateway, and broadcast
  }
};

/**
 * Get network preset configuration by format
 */
export const getNetworkPreset = (format: NetworkFormat) => {
  return NETWORK_PRESETS[format];
};

/**
 * Generate suggested IP values based on format and existing values
 */
export const generateSuggestions = (
  format: NetworkFormat, 
  existingValues: string[] = []
): number[] => {
  const preset = getNetworkPreset(format);
  const usedValues = new Set<number>();
  
  // Extract used values from existing networks
  existingValues.forEach(value => {
    const parts = parseNetworkString(value);
    if (parts && parts.octets.length >= preset.inputFields) {
      const relevantOctets = parts.octets.slice(0, preset.inputFields);
      relevantOctets.forEach(octet => usedValues.add(octet));
    }
  });
  
  // Generate suggestions avoiding conflicts
  const suggestions: number[] = [];
  const baseValues = preset.defaultValues;
  
  for (let i = 0; i < preset.inputFields; i++) {
    let suggestion = baseValues[i];
    const increment = 10;
    
    // Find next available value
    while (usedValues.has(suggestion) && suggestion < preset.allowedRange.max[i]) {
      suggestion += increment;
      if (suggestion > preset.allowedRange.max[i]) {
        // Try smaller increments
        suggestion = baseValues[i] + Math.floor(Math.random() * 50) + 1;
      }
    }
    
    suggestions.push(Math.min(suggestion, preset.allowedRange.max[i]));
  }
  
  return suggestions;
};

/**
 * Parse network string into NetworkValue object
 */
export const parseNetworkString = (networkString: string): NetworkValue | null => {
  if (!networkString || typeof networkString !== 'string') {
    return null;
  }
  
  // Handle CIDR notation
  const parts = networkString.split('/');
  const ipPart = parts[0];
  const maskPart = parts[1] ? parseInt(parts[1], 10) : 24;
  
  // Parse IP address
  const octets = ipPart.split('.').map(octet => {
    const num = parseInt(octet, 10);
    return isNaN(num) ? 0 : num;
  });
  
  // Validate octets
  const isValid = octets.length === 4 && 
    octets.every(octet => octet >= 0 && octet <= 255) &&
    maskPart >= 8 && maskPart <= 32;
  
  return {
    octets,
    mask: maskPart,
    full: networkString,
    isValid
  };
};

/**
 * Build network string from octets and mask
 */
export const buildNetworkString = (
  octets: (number | null)[],
  mask: number = 24,
  format: NetworkFormat = 'classC'
): string => {
  const preset = getNetworkPreset(format);
  
  if (format === 'custom') {
    // Full IP format
    const validOctets = octets.map(o => o ?? 0);
    return `${validOctets.join('.')}/${mask}`;
  }
  
  // Use preset format
  const inputOctets = octets.slice(0, preset.inputFields);
  const hasValidValues = inputOctets.some(o => o !== null && o !== undefined);
  
  if (!hasValidValues) {
    return '';
  }
  
  const octetString = inputOctets.map(o => o ?? '___').join('.');
  return `${preset.prefix}${octetString}${preset.suffix}`;
};

/**
 * Validate network input value
 */
export const validateNetworkInput = (
  value: string | number | number[] | null,
  format: NetworkFormat,
  customValidation?: (value: any) => string | null
): string | null => {
  
  if (value === null || value === undefined || value === '') {
    return null; // Let required validation handle this
  }
  
  const preset = getNetworkPreset(format);
  
  // Handle array input (multiple octets)
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const octet = value[i];
      if (octet < preset.allowedRange.min[i] || octet > preset.allowedRange.max[i]) {
        return `Octet ${i + 1} must be between ${preset.allowedRange.min[i]} and ${preset.allowedRange.max[i]}`;
      }
    }
  }
  
  // Handle single number input
  if (typeof value === 'number') {
    if (value < preset.allowedRange.min[0] || value > preset.allowedRange.max[0]) {
      return `Value must be between ${preset.allowedRange.min[0]} and ${preset.allowedRange.max[0]}`;
    }
  }
  
  // Handle string input (full IP)
  if (typeof value === 'string') {
    const parsed = parseNetworkString(value);
    if (!parsed || !parsed.isValid) {
      return 'Invalid network format';
    }
  }
  
  // Run custom validation if provided
  if (customValidation) {
    return customValidation(value);
  }
  
  return null;
};

/**
 * Check if two network values conflict
 */
export const hasNetworkConflict = (
  value1: string,
  value2: string
): boolean => {
  const network1 = parseNetworkString(value1);
  const network2 = parseNetworkString(value2);
  
  if (!network1 || !network2) return false;
  
  // Check if networks overlap
  const getNetworkAddress = (octets: number[], mask: number) => {
    const ipInt = (octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3];
    const maskInt = (0xffffffff << (32 - mask)) >>> 0;
    return (ipInt & maskInt) >>> 0;
  };
  
  const net1Addr = getNetworkAddress(network1.octets, network1.mask);
  const net2Addr = getNetworkAddress(network2.octets, network2.mask);
  
  return net1Addr === net2Addr;
};

/**
 * Get subnet mask in dotted decimal format
 */
export const getSubnetMask = (cidr: number): string => {
  const mask = (0xffffffff << (32 - cidr)) >>> 0;
  return [
    (mask >>> 24) & 0xff,
    (mask >>> 16) & 0xff,
    (mask >>> 8) & 0xff,
    mask & 0xff,
  ].join(".");
};

/**
 * Get network information
 */
export const getNetworkInfo = (networkString: string) => {
  const parsed = parseNetworkString(networkString);
  if (!parsed) return null;
  
  const { octets, mask } = parsed;
  const subnetMask = getSubnetMask(mask);
  const hostBits = 32 - mask;
  const totalHosts = Math.pow(2, hostBits);
  const usableHosts = totalHosts - 2; // Subtract network and broadcast
  
  return {
    networkAddress: `${octets.join('.')}/${mask}`,
    subnetMask,
    totalHosts,
    usableHosts,
    firstHost: `${octets[0]}.${octets[1]}.${octets[2]}.${octets[3] + 1}`,
    lastHost: `${octets[0]}.${octets[1]}.${octets[2]}.${octets[3] + usableHosts}`,
    broadcast: `${octets[0]}.${octets[1]}.${octets[2]}.${octets[3] + totalHosts - 1}`,
  };
};