import type { Ethernet, Wireless, Sfp, LTE, RouterModel } from "./CommonType";

export type RouterModeType = "AP Mode" | "Trunk Mode";
export type FirmwareType = "MikroTik" | "OpenWRT";
export type WANLinkType = "domestic" | "foreign" | "both";
export type TrunkInterfaceType = "wired" | "wireless";
export type Mode = "easy" | "advance";
export type MasterSlaveInterfaceType = Ethernet | Wireless | Sfp;

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
  MasterSlaveInterface?: MasterSlaveInterfaceType;
}

export interface NewsletterState {
  isSubscribed: boolean;
  userUUID?: string;
  email?: string;
}


export interface ChooseState {
  Mode: Mode;
  Firmware: FirmwareType;
  WANLinkType: WANLinkType;
  RouterMode: RouterModeType;
  RouterModels: RouterModels[];
  Newsletter?: NewsletterState;
}
