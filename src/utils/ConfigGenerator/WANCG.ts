import type { StarState } from "~/components/Star/StarContext";
import type { RouterConfig } from "./ConfigGenerator";

export const ForeignWAN = (state: StarState): RouterConfig => {
  const config: RouterConfig = {
    "/interface ethernet": [],
    "/interface wifi": [],
    "/ip dhcp-client": [],
    "/interface list member": [],
  };

  const interface_name = state.WAN.Easy.Foreign.interface;
  // Check if interface is wifi
  const isWifi = interface_name === "wifi2.4" || interface_name === "wifi5";

  if (isWifi) {
    const { SSID, Password } = state.WAN.Easy.Foreign.WirelessCredentials;
    config["/interface wifi"].push(
      `set ${interface_name} comment=ForeignWAN configuration.mode=station \\
             .ssid="${SSID}" disabled=no security.passphrase=${Password}`,
    );
  } else {
    // Add ethernet interface comment
    config["/interface ethernet"].push(
      `set [ find default-name=${interface_name} ] comment=ForeignWAN`,
    );
  }

  // Add DHCP client configuration
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
  };

  const interface_name = state.WAN.Easy.Domestic.interface;

  // Check if interface is wifi
  const isWifi = interface_name === "wifi2.4" || interface_name === "wifi5";

  if (isWifi) {
    const { SSID, Password } = state.WAN.Easy.Domestic.WirelessCredentials;
    config["/interface wifi"].push(
      `set ${interface_name} comment=DomesticWAN configuration.mode=station \\
             .ssid="${SSID}" disabled=no security.passphrase=${Password}`,
    );
  } else {
    // Add ethernet interface comment
    config["/interface ethernet"].push(
      `set [ find default-name=${interface_name} ] comment=DomesticWAN`,
    );
  }

  // Add DHCP client configuration
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

export const WireguardClient = (state: StarState): RouterConfig => {
  const config: RouterConfig = {
    "/interface wireguard": [],
    "/interface wireguard peers": [],
    "/ip address": [],
    "/ip firewall nat": [],
    "/interface list member": [],
    "/ip route": [],
  };

  // Get wireguard config from state
  const wgConfig = state.WAN.Easy.VPNClient.Wireguard[0];

  if (!wgConfig) return config;

  // Add wireguard interface
  config["/interface wireguard"].push(
    `add listen-port=${wgConfig.ListeningPort} mtu=${wgConfig.MTU} name=wireguard-client \\
         private-key="${wgConfig.PrivateKey}"`,
  );

  // Add peer configuration
  config["/interface wireguard peers"].push(
    `add allowed-address=${wgConfig.AllowedIPs} endpoint-address=${wgConfig.ServerAddress} \\
         endpoint-port=${wgConfig.ServerPort} interface=wireguard-client name=VPNClient \\
         preshared-key="${wgConfig.PreSharedKey}" persistent-keepalive="${wgConfig.PersistentKeepalive}"\\
         public-key="${wgConfig.PublicKey}"`,
  );

  // Add IP address
  config["/ip address"].push(
    `add address=${wgConfig.Address} interface=wireguard-client`,
  );

  // Add DNS NAT rules
  config["/ip firewall nat"].push(
    `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 protocol=udp\\
         src-address-list=VPN-Local to-addresses=${wgConfig.DNS}`,
    `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 protocol=tcp\\
         src-address-list=VPN-Local to-addresses=${wgConfig.DNS}`,
    `add action=dst-nat chain=dstnat comment="DNS Split" dst-port=53 protocol=udp\\
         src-address-list=Split-Local to-addresses=${wgConfig.DNS}`,
    `add action=dst-nat chain=dstnat comment="DNS Split" dst-port=53 protocol=tcp\\
         src-address-list=Split-Local to-addresses=${wgConfig.DNS}`,
  );

  // Add interface to WAN list
  config["/interface list member"].push(
    'add interface="wireguard-client" list="WAN"',
    'add interface="wireguard-client" list="FRN-WAN"',
  );

  // Add routing
  config["/ip route"].push(
    `add comment="Route-to-VPN" disabled=no distance=1 dst-address=0.0.0.0/0 gateway=wireguard-client pref-src=""\\
         routing-table=to-VPN scope=30 suppress-hw-offload=no target-scope=10`,
    `add comment="Route-to-FRN" disabled=no distance=1 dst-address=${wgConfig.ServerAddress} gateway=192.168.1.1 pref-src=""\\
         routing-table=main scope=30 suppress-hw-offload=no target-scope=10`,
  );

  return config;
};
