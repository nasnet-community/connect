export type EthernetSpeed = "1g" | "2.5g" | "10g";
export type WifiBand = "2.4" | "5" | "6";
export type SfpType = "sfp" | "sfp+" | "sfp28" | "qsfp+";

export interface CustomEthernetConfig {
  count: number;
  speed: EthernetSpeed;
}

export interface CustomWirelessConfig {
  count: number;
  band: WifiBand;
}

export interface CustomSfpConfig {
  count: number;
  type: SfpType;
}

export interface CustomRouterForm {
  name: string;
  isCHR: boolean;
  cpuArch: string;
  ethernet: CustomEthernetConfig[];
  wireless: CustomWirelessConfig[];
  sfp: CustomSfpConfig[];
  lte: number;
}

