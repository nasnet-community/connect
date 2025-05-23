import type { StarState } from "~/components/Star/StarContext/StarContext";
import type { RouterConfig } from "./ConfigGenerator";
import { DomesticIP } from "./DomesticIP";
// import { mergeMultipleConfigs } from "./ConfigGenerator";


export const ForeignWAN = (state: StarState): RouterConfig => {
  const config: RouterConfig = {
    "/interface ethernet": [],
    "/interface wifi": [],
    "/ip dhcp-client": [],
    "/interface list member": [],
    "/ip route": [
      "add comment=Route-to-FRN disabled=no distance=1 dst-address=0.0.0.0/0 gateway=192.168.10.1 routing-table=to-FRN",
    ],
  };

  const ForeignState = state.WAN.WANLink.Foreign;

  const interface_name = ForeignState.InterfaceName;

  if (ForeignState.WirelessCredentials) {
    const { SSID, Password } = ForeignState.WirelessCredentials;
    config["/interface wifi"].push(
      `set ${interface_name} comment=ForeignWAN configuration.mode=station \\
             .ssid="${SSID}" disabled=no security.passphrase="${Password}"`,
    );
  } else {
    config["/interface ethernet"].push(
      `set [ find default-name=${interface_name} ] comment=ForeignWAN`,
    );
  }

  config["/ip dhcp-client"].push(
    `add add-default-route=no interface=${interface_name} script=":if (\\$bound=1) do={\\r\\
    \\n:local gw \\$\\"gateway-address\\"\\r\\
    \\n/ip route set [ find comment=\\"Route-to-FRN\\" gateway!=\\$gw ] gateway=\\$gw\\r\\
    \\n}" use-peer-dns=no use-peer-ntp=no`,
  );

  config["/interface list member"].push(
    `add interface=${interface_name} list="WAN"`,
    `add interface=${interface_name} list="FRN-WAN"`,
  );

  return config;
};

export const DomesticWAN = (state: StarState): RouterConfig => {
  const config: RouterConfig = {
    "/interface ethernet": [],
    "/interface wifi": [],
    "/ip dhcp-client": [],
    "/interface list member": [],
    "/ip route": [
      "add comment=Route-to-DOM disabled=no distance=1 dst-address=0.0.0.0/0 gateway=100.64.0.1 routing-table=to-DOM",
    ],
  };

  const DomesticState = state.WAN.WANLink.Domestic;

  
  if (!DomesticState) {
    return config;
  }

  const interface_name = DomesticState.InterfaceName;


  if (DomesticState.WirelessCredentials) {
    const { SSID, Password } = DomesticState.WirelessCredentials;
    config["/interface wifi"].push(
      `set ${interface_name} comment=DomesticWAN configuration.mode=station \\
             .ssid="${SSID}" disabled=no security.passphrase="${Password}"`,
    );

  } else {
    config["/interface ethernet"].push(
      `set [ find default-name=${interface_name} ] comment=DomesticWAN`,
    );
  }

  config["/ip dhcp-client"].push(
    `add add-default-route=yes interface=${interface_name} script=":if (\\$bound=1) do={\\r\\
        \\n:local gw \\$\\"gateway-address\\"\\r\\
        \\n/ip route set [ find comment=\\"Route-to-DOM\\" gateway!=\\$gw ] gateway=\\$gw\\r\\
        \\n}" use-peer-dns=no use-peer-ntp=no`,
  );

  config["/interface list member"].push(
    `add interface=${interface_name} list="WAN"`,
    `add interface=${interface_name} list="DOM-WAN"`,
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

export const WANCG = (state: StarState): RouterConfig => {
       const config: RouterConfig = {
              ...ForeignWAN(state),
              ...DomesticWAN(state),
              ...DomesticAddresslist(),
       }
       return config
}















