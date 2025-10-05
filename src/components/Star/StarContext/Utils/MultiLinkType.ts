

export interface FailoverConfig {
    failoverCheckInterval?: number;
    failoverTimeout?: number;
  }
  
  // Bonding Mode Types
  export type BondingMode =
      | "balance-rr"     // Round-robin (default)
      | "active-backup"  // Only one slave is active
      | "balance-xor"    // XOR policy
      | "broadcast"      // Transmits on all slaves
      | "802.3ad"        // IEEE 802.3ad Dynamic link aggregation
      | "balance-tlb"    // Adaptive transmit load balancing
      | "balance-alb"    // Adaptive load balancing
  
  export type LoadBalanceMethod = "PCC" | "NTH" | "ECMP" | "Bonding";
  export type MultiLinkStrategy = "LoadBalance" | "Failover" | "RoundRobin" | "Both";
  
  export interface BondingConfig {
    name?: string           // Bond interface name (default: "bonding")
    mode?: BondingMode      // Bonding mode (default: "balance-rr")
    slaves: string[]        // Physical interfaces to bond (e.g., ["ether1", "ether2"])
    ipAddress?: string      // IP address for bond interface (e.g., "192.168.50.1/24")
    arpMonitoring?: {       // Optional ARP monitoring for link failover
        enabled: boolean
        targets: string[]   // IP addresses to monitor
        interval?: string   // Check interval (default: "100ms")
        validateTime?: string // Validation time (default: "10s")
    }
    miiMonitoring?: {       // Optional MII (Media Independent Interface) monitoring
        enabled: boolean
        interval?: string   // Check interval (default: "100ms")
    }
    mtu?: number            // Maximum Transmission Unit
    lacp?: {                // LACP settings for 802.3ad mode
        rate?: "slow" | "fast"  // LACP rate (default: "slow")
    }
  }
  export interface MultiLinkConfig {
    strategy: MultiLinkStrategy;
    loadBalanceMethod?: LoadBalanceMethod;
    FailoverConfig?: FailoverConfig;
    roundRobinInterval?: number;
  }
  