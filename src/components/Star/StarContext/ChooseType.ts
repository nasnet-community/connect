import type { Ethernet, Wireless, Sfp, LTE } from "./CommonType";

export type RouterModeType = "AP Mode" | "Trunk Mode";
export type FrimwareType = "MikroTik" | "OpenWRT";
export type RouterModel = 
  // Master Routers
  | "Chateau 5G R17 ax"
  | "Chateau LTE18 ax"
  | "Chateau LTE6 ax"
  | "Chateau PRO ax"
  | "hAP ax3"
  | "hAP ax2"
  | "hAP ax lite LTE6"
  | "RB5009UPr+S+IN"
  // Slave Routers (some can also be master)
  | "Audience"
  | "cAP ax"
  | "cAP XL ac"
  | "cAP ac"
  | "L009UiGS-2HaxD-IN"
  | "hAP ac3"
  | "hAP ac2"
  | "hAP ax lite"
  | "wAP ax"
  // Legacy models (backward compatibility)
  | "RB5009"
  | "hAP AX2"
  | "hAP AX3";
export type Mode = "easy" | "advance";

export interface RouterInterfaces {
  ethernet?: Ethernet[];
  wireless?: Wireless[];
  sfp?: Sfp[];
  lte?: LTE[];
}

export interface RouterModels {
  isMaster: boolean;
  Model: RouterModel;
  Interfaces: RouterInterfaces;
  trunkConnection?: {              // Trunk connection details for this router
    masterInterface?: string;       // For slaves: which master interface it connects to
    slaveInterface?: string;        // For slaves: which of its own interfaces to use
    connectionType?: TrunkInterfaceType; // Connection type for this specific link
  };
}

export interface NewsletterState {
  isSubscribed: boolean;
  userUUID?: string;
  email?: string;
}

export type TrunkInterfaceType = "wired" | "wireless";

// New structure for individual slave interface mappings
export interface SlaveInterfaceMapping {
  slaveRouterIndex: number;        // Index in RouterModels array
  slaveRouterModel: string;        // Model name for display
  slaveInterface: string;          // e.g., "ether1" on slave
  masterInterface: string;         // e.g., "ether2" on master
  connectionType: TrunkInterfaceType; // "wired" or "wireless"
}

export interface TrunkInterface {
  type?: TrunkInterfaceType;
  masterInterface?: string;  // Legacy: single interface (backward compatibility)
  slaveInterface?: string;   // Legacy: single interface (backward compatibility)
  
  // New fields for multiple slave support
  masterInterfaces?: string[];     // All master interfaces being used
  slaveMappings?: SlaveInterfaceMapping[]; // Array of slave connections
}

export interface ChooseState {
  Mode: Mode;
  Firmware: FrimwareType;
  DomesticLink: boolean;
  RouterMode: RouterModeType;
  RouterModels: RouterModels[];
  Newsletter?: NewsletterState;
  TrunkInterface?: TrunkInterface;
}
