import type { Ethernet, Wireless, Sfp, LTE } from "./CommonType";

export type RouterModeType = "AP Mode" | "Trunk Mode";
export type FrimwareType = "MikroTik" | "OpenWRT";
export type RouterModel = "RB5009" | "hAP AX2" | "hAP AX3";
export type Mode = "easy" | "advance" ;


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
}

export interface ChooseState {
  Mode: Mode;
  Firmware: FrimwareType;
  DomesticLink: boolean;
  RouterMode: RouterModeType;
  RouterModels: RouterModels[];
}