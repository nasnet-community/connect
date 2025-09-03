import { type RouterData } from "./Constants";

export type RouterFamily = "hAP" | "Chateau" | "cAP" | "RB" | "Other";

export interface RouterCategory {
  id: RouterFamily;
  label: string;
  description: string;
  features: string[];
  routers: RouterData[];
}

/**
 * Categorizes a router into a specific family based on its model name
 */
export function getRouterFamily(model: string): RouterFamily {
  const normalizedModel = model.toLowerCase();
  
  if (normalizedModel.includes('hap')) {
    return 'hAP';
  }
  if (normalizedModel.includes('chateau')) {
    return 'Chateau';
  }
  if (normalizedModel.includes('cap')) {
    return 'cAP';
  }
  if (normalizedModel.startsWith('rb') || normalizedModel.includes('rb5009') || normalizedModel.includes('l009')) {
    return 'RB';
  }
  
  return 'Other';
}

/**
 * Groups routers by their family categories
 */
export function categorizeRouters(routers: RouterData[]): RouterCategory[] {
  const categories: Record<RouterFamily, RouterCategory> = {
    hAP: {
      id: 'hAP',
      label: 'hAP Series',
      description: 'Home Access Points - Perfect for home and small office use',
      features: ['WiFi 6 Support', 'Home/SOHO Optimized', 'Built-in Wireless', 'Compact Design', 'Easy Setup'],
      routers: [],
    },
    Chateau: {
      id: 'Chateau',
      label: 'Chateau Series', 
      description: 'LTE/5G Routers - Advanced connectivity with cellular support',
      features: ['LTE/5G Connectivity', 'Dual-band WiFi', 'Failover Capability', 'High-gain Antennas', 'SIM Redundancy'],
      routers: [],
    },
    cAP: {
      id: 'cAP',
      label: 'cAP Series',
      description: 'Ceiling Access Points - Professional wireless solutions',
      features: ['Ceiling Mount Design', 'PoE Powered', 'CAPsMAN Ready', 'Professional Grade', 'Seamless Roaming'],
      routers: [],
    },
    RB: {
      id: 'RB',
      label: 'RouterBoard',
      description: 'Enterprise Grade - High-performance routing solutions',
      features: ['10G/25G Support', 'Multiple SFP+ Ports', 'High Throughput', 'Rack Mountable', 'Enterprise Features'],
      routers: [],
    },
    Other: {
      id: 'Other',
      label: 'Other',
      description: 'Additional router models and specialized devices',
      features: ['Specialized Use Cases', 'Unique Form Factors', 'Custom Solutions', 'Legacy Support', 'Niche Applications'],
      routers: [],
    },
  };

  // Categorize each router
  routers.forEach((router) => {
    const family = getRouterFamily(router.model);
    categories[family].routers.push(router);
  });

  // Return only categories that have routers, sorted by priority
  const priorityOrder: RouterFamily[] = ['hAP', 'Chateau', 'cAP', 'RB', 'Other'];
  
  return priorityOrder
    .map(family => categories[family])
    .filter(category => category.routers.length > 0)
    .map(category => ({
      ...category,
      // Sort routers within each category by name
      routers: category.routers.sort((a, b) => a.title.localeCompare(b.title))
    }));
}

/**
 * Gets the total count of routers across all categories
 */
export function getTotalRouterCount(categories: RouterCategory[]): number {
  return categories.reduce((total, category) => total + category.routers.length, 0);
}