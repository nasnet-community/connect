import type { RouterConfig } from "../ConfigGenerator";
import { DomesticIP } from "./DomesticIP";
import type { WANConfig, WANLink, WANState } from "../../StarContext/WANType";
import { VPNClientWrapper } from "./VPNClientCG";
// import { mergeMultipleConfigs } from "./ConfigGenerator";


export const ForeignWAN = (WANConfig: WANConfig): RouterConfig => {
  const config: RouterConfig = {
    "/interface ethernet": [],
    "/interface wifi": [],
    "/ip dhcp-client": [],
    "/interface list member": [],
    "/ip route": [
      "add comment=Route-to-FRN disabled=no distance=1 dst-address=0.0.0.0/0 gateway=192.168.10.1 routing-table=to-FRN",
    ],
  };

  const { InterfaceName, WirelessCredentials } = WANConfig;


  if (WirelessCredentials) {
    const { SSID, Password } = WirelessCredentials;
    config["/interface wifi"].push(
      `set ${InterfaceName} comment=ForeignWAN configuration.mode=station \\
             .ssid="${SSID}" disabled=no security.passphrase="${Password}"`,
    );
  } else {
    config["/interface ethernet"].push(
      `set [ find default-name=${InterfaceName} ] comment=ForeignWAN`,
    );
  }

  config["/ip dhcp-client"].push(
    `add add-default-route=no interface=${InterfaceName} script=":if (\\$bound=1) do={\\r\\
    \\n:local gw \\$\\"gateway-address\\"\\r\\
    \\n/ip route set [ find comment=\\"Route-to-FRN\\" gateway!=\\$gw ] gateway=\\$gw\\r\\
    \\n}" use-peer-dns=no use-peer-ntp=no`,
  );

  config["/interface list member"].push(
    `add interface=${InterfaceName} list="WAN"`,
    `add interface=${InterfaceName} list="FRN-WAN"`,
  );

  return config;
};

export const DomesticWAN = (WANConfig: WANConfig): RouterConfig => {
  const config: RouterConfig = {
    "/interface ethernet": [],
    "/interface wifi": [],
    "/ip dhcp-client": [],
    "/interface list member": [],
    "/ip route": [
      "add comment=Route-to-DOM disabled=no distance=1 dst-address=0.0.0.0/0 gateway=100.64.0.1 routing-table=to-DOM",
    ],
  };

  const { InterfaceName, WirelessCredentials } = WANConfig;

  if (WirelessCredentials) {
    const { SSID, Password } = WirelessCredentials;
    config["/interface wifi"].push(
      `set ${InterfaceName} comment=DomesticWAN configuration.mode=station \\
             .ssid="${SSID}" disabled=no security.passphrase="${Password}"`,
    );

  } else {
    config["/interface ethernet"].push(
      `set [ find default-name=${InterfaceName} ] comment=DomesticWAN`,
    );
  }

  config["/ip dhcp-client"].push(
    `add add-default-route=yes interface=${InterfaceName} script=":if (\\$bound=1) do={\\r\\
        \\n:local gw \\$\\"gateway-address\\"\\r\\
        \\n/ip route set [ find comment=\\"Route-to-DOM\\" gateway!=\\$gw ] gateway=\\$gw\\r\\
        \\n}" use-peer-dns=no use-peer-ntp=no`,
  );

  config["/interface list member"].push(
    `add interface=${InterfaceName} list="WAN"`,
    `add interface=${InterfaceName} list="DOM-WAN"`,
  );

  return config;
};

export const DomesticAddresslist = (): RouterConfig => {
  const config: RouterConfig = {
         "/ip firewall address-list": [
                // Add DomesticIP addresses
                // ...DomesticIP.map(ip => `add address=${ip} list=DOMAddList`)
                ...DomesticIP,
              ],
  }

  return config
}

export const WANLinks = (WANLink: WANLink): RouterConfig => {

  const { Foreign, Domestic } = WANLink;

  if(Domestic){
    const config: RouterConfig = {
      ...ForeignWAN(Foreign),
      ...DomesticWAN(Domestic),
      ...DomesticAddresslist(),
    }
    return config
  } else{
    const config: RouterConfig = {
      ...ForeignWAN(Foreign),
    }
    return config
  }

}


export const WANCG = (WANState: WANState, DomesticLink: boolean): RouterConfig => {
  const { WANLink, VPNClient } = WANState;

  const config: RouterConfig = {
    ...WANLinks(WANLink),
    ...(VPNClient ? VPNClientWrapper(VPNClient, DomesticLink) : {}),
  }


  return config
}















