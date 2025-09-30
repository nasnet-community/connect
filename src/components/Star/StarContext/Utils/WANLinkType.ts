import type {
    InterfaceType,
    WirelessCredentials,
  } from "../CommonType";
import type { MultiLinkConfig } from "../WANType";



export interface LTESettings {
    apn: string;
    username?: string;
    password?: string;
}


export interface PPPoEConfig {
  username: string;
  password: string;
}

export interface StaticIPConfig {
  ipAddress: string;
  subnet: string;
  gateway: string;
  DNS?: string;
}

export interface ConnectionConfig {
    isDHCP?: boolean;
    pppoe?: PPPoEConfig;
    static?: StaticIPConfig;
    lteSettings?: LTESettings;
}

export interface InterfaceConfig {
    InterfaceName: InterfaceType;
    WirelessCredentials?: WirelessCredentials;
    VLANID?: string;
    MacAddress?: string;
}

export interface WANLinkConfig {
  name: string;
  InterfaceConfig: InterfaceConfig;
  ConnectionConfig?: ConnectionConfig;
  priority?: number;
  weight?: number;
}

export interface WANLink {
    WANConfigs: WANLinkConfig[];
    MultiLinkConfig?: MultiLinkConfig;
}

export interface WANLinks{
    Foreign: WANLink;
    Domestic?: WANLink;
}