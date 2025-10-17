import type { Ethernet, Wireless, Sfp, LTE, RouterModel } from "./CommonType";
import type { Networks } from "./Utils/Networks";


export type RouterModeType = "AP Mode" | "Trunk Mode";
export type FirmwareType = "MikroTik" | "OpenWRT";
export type WANLinkType = "domestic" | "foreign" | "both";
export type TrunkInterfaceType = "wired" | "wireless";
export type Mode = "easy" | "advance";
export type MasterSlaveInterfaceType = Ethernet | Wireless | Sfp;
export type CPUArch = "x64/x86" | "ARM" | "ARM64";


export interface Interfaces {
  ethernet?: Ethernet[];
  wireless?: Wireless[];
  sfp?: Sfp[];
  lte?: LTE[];
}

export interface OccupiedInterface {
  interface: Ethernet | Wireless | Sfp;
  UsedFor: string;
}

export interface RouterInterfaces {
  Interfaces: Interfaces;
  OccupiedInterfaces: OccupiedInterface[];
}

export interface RouterModels {
  isMaster: boolean;
  Model: RouterModel;
  Interfaces: RouterInterfaces;
  MasterSlaveInterface?: MasterSlaveInterfaceType;
  isCHR?: boolean;
  cpuArch?: CPUArch;
}

export interface ChooseState {
  Mode: Mode;
  Firmware: FirmwareType;
  WANLinkType: WANLinkType;
  RouterMode: RouterModeType;
  RouterModels: RouterModels[];
  TrunkInterfaceType?: TrunkInterfaceType;
  Networks: Networks;
}
