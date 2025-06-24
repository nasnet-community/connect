import type { StarState } from "~/components/Star/StarContext/StarContext";
import { ChooseCG } from "./Choose/ChooseCG";
import { WANCG } from "./WAN/WAN/WANCG";
import { LANCG } from "./LAN/LANCG";
import { ExtraCG } from "./Extra/ExtraCG";
import { 
  mergeMultipleConfigs,
  // mergeConfigurations,
  removeEmptyArrays,
  removeEmptyLines,
  formatConfig ,
} from "./utils/ConfigGeneratorUtil"

export interface RouterConfig {
  [key: string]: string[];
}



export const ConfigGenerator = (state: StarState): string => {
  const config: RouterConfig = {
    "/disk": [],
    "/interface bridge": [],
    "/interface pptp-client": [],
    "/interface sstp-client": [],
    "/interface ovpn-client": [],
    "/interface l2tp-client": [],
    "/interface ethernet": [],
    "/interface veth": [],
    "/interface wireguard": [],
    "/interface wireguard peers": [],
    "/interface list": [],
    "/ip ipsec policy group": [],
    "/ip ipsec profile": [],
    "/ip ipsec peer": [],
    "/ip ipsec proposal": [],
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
    "/ppp profile": [],
    "/interface l2tp-server server": [],
    "/interface sstp-server server": [],
    "/interface pptp-server server": [],
    "/interface ovpn-server server": [],
    "/interface pptp-server": [],
    "/interface sstp-server": [],
    "/interface ovpn-server": [],
    "/interface l2tp-server": [],
    "/ip dhcp-server": [],
    "/routing table": [],
    "/interface bridge port": [],
    "/ip settings": [],
    "/ipv6 settings": [],
    "/interface list member": [],
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
    "/ip ipsec mode-config": [],
    "/ip ipsec policy": [],
    "/ip ipsec identity": [],
    "/ip service": [],
    "/ip upnp": [],
    "/ip upnp interfaces": [],
    "/ipv6 firewall filter": [],
    "/ppp secret": [],
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
    "/certificate": [],
    "/tool graphing interface": [],
    "/tool graphing queue": [],
    "/tool graphing resource": [],
    "/tool romon": [],
    "/tool sniffer": [],
  };

  try {
    // Generate configurations from each module
    const chooseConfig = ChooseCG(state.Choose.DomesticLink);
    const wanConfig = WANCG(state.WAN, state.Choose.DomesticLink);
    const lanConfig = LANCG(state);
    const extraConfig = ExtraCG(state.ExtraConfig, state.Choose.DomesticLink);

    // Merge all configurations
    const finalConfig = mergeMultipleConfigs(
      config,
      chooseConfig,
      wanConfig,
      lanConfig,
      extraConfig
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
