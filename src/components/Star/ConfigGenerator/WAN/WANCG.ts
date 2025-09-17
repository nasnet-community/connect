import type { RouterConfig } from "../ConfigGenerator";
import type {
  WANLinks,
  InterfaceConfig,
  WANState,
} from "../../StarContext/WANType";
import { VPNClientWrapper } from "./VPNClient/VPNClientCG";
import { DNSCG } from "./DNSCG";
import { mergeMultipleConfigs } from "../utils/ConfigGeneratorUtil";

export const ForeignWAN = (WANConfig: InterfaceConfig): RouterConfig => {
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

  // some comment to remind me to use wireless module
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

export const DomesticWAN = (WANConfig: InterfaceConfig): RouterConfig => {
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

export const WANLinksConfig = (WANLinks: WANLinks): RouterConfig => {
  const { Foreign, Domestic } = WANLinks;

  // Extract the first config from each WANLink
  const foreignConfig = Foreign?.WANConfigs?.[0];
  const domesticConfig = Domestic?.WANConfigs?.[0];
  
  if (!foreignConfig) {
    return {}; // Return empty config if no foreign config
  }
  
  if (domesticConfig) {
    return mergeMultipleConfigs(
      ForeignWAN(foreignConfig.InterfaceConfig), 
      DomesticWAN(domesticConfig.InterfaceConfig)
    );
  } else {
    return ForeignWAN(foreignConfig.InterfaceConfig);
  }
};

export const WANCG = (
  WANState: WANState,
  DomesticLink: boolean,
): RouterConfig => {
  const { WANLink, VPNClient, DNSConfig } = WANState;

  const configs: RouterConfig[] = [WANLinksConfig(WANLink)];

  // Add VPN Client configuration if present
  if (VPNClient) {
    configs.push(VPNClientWrapper(VPNClient, DomesticLink));
  }

  // Add DNS configuration if present
  if (DNSConfig) {
    configs.push(DNSCG(DNSConfig, DomesticLink));
  }

  return mergeMultipleConfigs(...configs);
};
