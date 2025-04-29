export type RouterModeType = "AP Mode" | "Trunk Mode";
export type FrimwareType = "MikroTik" | "OpenWRT";
export type RouterModel = "RB5009" | "hAP AX2" | "hAP AX3";
export type Mode = "easy" | "advance" ;

export interface RouterInterfaces {
  ethernet?: string[];
  wireless?: string[];
  sfp?: string[];
  lte?: string[];
}

export interface RouterModels {
  isMaster: boolean;
  Model: RouterModel;
  Interfaces: RouterInterfaces;
}

export interface ChooseState {
  Mode: Mode;
  Firmware: FrimwareType;
  RouterMode: RouterModeType;
  RouterModels: RouterModels[];
}