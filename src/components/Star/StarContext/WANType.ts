import type { VPNClient } from "./Utils/VPNClientType";
import type {
  WANLinks
} from "./Utils/WANLinkType";

// Re-export for convenience
export type { WANLink, WANLinkConfig, InterfaceConfig, WANLinks } from "./Utils/WANLinkType";

export interface DOHConfig {
  domain?: string;
  bindingIP?: string;
}

export interface DNSConfig {
  ForeignDNS?: string;
  VPNDNS?: string;
  DomesticDNS?: string;
  SplitDNS?: string;
  DOH?: DOHConfig;
}

export interface WANState {
  WANLink: WANLinks;
  VPNClient?: VPNClient;
  DNSConfig?: DNSConfig;
}
