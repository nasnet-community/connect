import type { StarState } from "~/components/Star/StarContext";
import { BaseConfig } from "./ChooseCG";
import { ForeignWAN, DomesticWAN, WireguardClient } from "./WANCG";
import { OVPNServer, WireguardServer, Wireless } from "./LANCG";
import {
  Certificate,
  Game,
  RebootUpdate,
  RouterIdentityRomon,
  Services,
} from "./ExtraCG";
import { BridgePorts } from "./ShowCG";

export interface RouterConfig {
  [key: string]: string[];
}

const mergeMultipleConfigs = (...configs: RouterConfig[]): RouterConfig => {
  return configs.reduce((acc, curr) => mergeConfigurations(acc, curr));
};

const mergeConfigurations = (
  baseConfig: RouterConfig,
  newConfig: RouterConfig,
): RouterConfig => {
  const mergedConfig = { ...baseConfig };

  Object.entries(newConfig).forEach(([key, value]) => {
    if (mergedConfig[key]) {
      mergedConfig[key] = [...mergedConfig[key], ...value];
    } else {
      mergedConfig[key] = value;
    }
  });

  return mergedConfig;
};

const removeEmptyArrays = (config: RouterConfig): RouterConfig => {
  const filteredConfig: RouterConfig = {};

  Object.entries(config).forEach(([key, value]) => {
    if (value && value.length > 0) {
      filteredConfig[key] = value;
    }
  });

  return filteredConfig;
};

const removeEmptyLines = (str: string): string => {
  return str
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .join("\n");
};

const formatConfig = (config: RouterConfig): string => {
  return Object.entries(config)
    .map(([key, values]) => {
      const cleanValues = values.filter((v) => v.trim());
      return `${key}\n${cleanValues.join("\n")}`;
    })
    .filter(Boolean)
    .join("\n")
    .trim()
    .replace(/\n+$/, "")
    .replace(/#/g, "");
};

export const ConfigGenerator = (state: StarState): string => {
  const config: RouterConfig = {
    "/disk": [],
    "/interface bridge": [],
    "/interface ethernet": [],
    "/interface veth": [],
    "/interface wireguard": [],
    "/interface list": [],
    "/interface vlan": [],
    "/interface wifi security": [],
    "/interface wifi": [
      "set [ find default-name=wifi2 ] name=wifi2.4 disabled=no",
      "set [ find default-name=wifi1 ] name=wifi5 disabled=no",
    ],
    "/interface macvlan": [],
    "/interface pppoe-client": [],
    // '/interface list': [],
    "/ip pool": [],
    "/ip dhcp-server": [],
    "/routing table": [],
    "/interface bridge port": [],
    "/ip settings": [],
    "/ipv6 settings": [],
    "/interface list member": [],
    "/interface wireguard peers": [],
    "/ip address": [],
    "/ip cloud": [],
    "/ip dhcp-client": [],
    "/ip dhcp-server lease": [],
    "/ip dhcp-server network": [],
    "/ip dns": [],
    "/ip firewall address-list": [],
    "/ip firewall filter": [],
    "/ip firewall mangle": [],
    "/ip firewall nat": [],
    "/ip firewall raw": [],
    "/ip nat-pmp": [],
    "/ip nat-pmp interfaces": [],
    "/ip route": [],
    "/ip service": [],
    "/ip upnp": [],
    "/ip upnp interfaces": [],
    "/ipv6 firewall filter": [],
    "/system clock": [],
    "/system identity": [],
    "/system logging": [],
    "/system note": [],
    "/system ntp client": [],
    "/system ntp server": [],
    "/system ntp client servers": [],
    "/system package update": [],
    "/system routerboard settings": [],
    "/system scheduler": [],
    "/system script": [],
    "/tool graphing interface": [],
    "/tool graphing queue": [],
    "/tool graphing resource": [],
    "/tool romon": [],
    "/tool sniffer": [],
  };

  try {
    const baseConfig = BaseConfig(state);
    const wirelessConfig = Wireless(state);
    const foreignWANConfig = ForeignWAN(state);
    const domesticWANConfig = DomesticWAN(state);
    const wireguardClientConfig = WireguardClient(state);
    const servicesConfig = Services(state);
    const routerIdentityRomonConfig = RouterIdentityRomon(state);
    const rebootUpdateConfig = RebootUpdate(state);
    const wireguradServerConfig = WireguardServer(state);
    const OVPNServerConfig = OVPNServer(state);
    const bridgePortsConfig = BridgePorts(state);
    const gameConfig = Game(state);
    const certificateConfig = Certificate(state);

    const finalConfig = mergeMultipleConfigs(
      config,
      baseConfig,
      foreignWANConfig,
      domesticWANConfig,
      wireguardClientConfig,
      wirelessConfig,
      servicesConfig,
      routerIdentityRomonConfig,
      rebootUpdateConfig,
      wireguradServerConfig,
      OVPNServerConfig,
      bridgePortsConfig,
      gameConfig,
      certificateConfig,
    );

    const removedEmptyArrays = removeEmptyArrays(finalConfig);
    const ELConfig = formatConfig(removedEmptyArrays);
    const formattedConfigEL = removeEmptyLines(ELConfig);
    return `${formattedConfigEL} \n\n:delay 60 \n\n/system reboot`;
  } catch (error) {
    console.error("Error generating config:", error);
    return "";
  }
};
