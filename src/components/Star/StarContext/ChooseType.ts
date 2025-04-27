






export type RouterModeType = "AP Mode" | "Trunk Mode" | "";
export type FrimwareType = "MikroTik" | "OpenWRT" | "";
export type RouterModel = "RB5009" | "hAP AX2" | "hAP AX3";
export type Mode = "easy" | "advance";



















export interface ChooseState {
    Mode: Mode;
    Firmware: {
      Name: FrimwareType;
    };
    RouterMode: {
      Mode: RouterModeType;
    };
    RouterModel: {
      Model: RouterModel[];
      Interfaces: { [key: string]: string[] };
    };
  }