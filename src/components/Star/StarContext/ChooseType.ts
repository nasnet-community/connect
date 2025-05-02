export type RouterModeType = "AP Mode" | "Trunk Mode";
export type FrimwareType = "MikroTik" | "OpenWRT";
export type RouterModel = "RB5009" | "hAP AX2" | "hAP AX3";
export type Mode = "easy" | "advance" ;
export type Ethernet = 'ether1' | 'ether2' | 'ether3' | 'ether4' | 'ether5' |
                      'ether6' | 'ether7' | 'ether8' | 'ether9' | 'ether10' |
                      'ether11' | 'ether12' | 'ether13' | 'ether14' | 'ether15' |
                      'ether16' | 'ether17' | 'ether18' | 'ether19' | 'ether20' |
                      'ether21' | 'ether22' | 'ether23' | 'ether24' | 'ether25' |
                      'ether26' | 'ether27' | 'ether28' | 'ether29' | 'ether30' |
                      'ether31' | 'ether32' ;

export type Wireless = 'wlan1' | 'wlan2' | 'wlan3' | 'wlan4' | 'wlan5' ;

export type Sfp = 'sfp1' | 'sfp2' | 'sfp3' | 'sfp4' | 'sfp5' | 'sfp6' | 'sfp7' | 
                  'sfp8' | 'sfp9' | 'sfp10' | 'sfp11' | 'sfp12' | 'sfp13' | 'sfp14' | 
                  'sfp15' | 'sfp16' | 'sfp17' | 'sfp18' | 'sfp19' | 'sfp20' | 'sfp21' | 
                  'sfp22' | 'sfp23' | 'sfp24' | 'sfp25' | 'sfp26' | 'sfp27' | 'sfp28' | 
                  'sfp29' | 'sfp30' | 'sfp31' | 'sfp32' ;

export type LTE = 'lte1' | 'lte2' | 'lte3' | 'lte4' | 'lte5';

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
  RouterMode: RouterModeType;
  RouterModels: RouterModels[];
}