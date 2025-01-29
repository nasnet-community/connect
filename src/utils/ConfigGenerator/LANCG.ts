import type { StarState } from "~/components/Star/StarContext";
import type { RouterConfig } from "./ConfigGenerator";
interface NetworkConfig {
  name: string;
  ssid: string;
  password?: string;
}

interface WifiInterface {
  band: WifiBand;
  name: string;
  bandConfig: string;
}

const WIFI_INTERFACES: WifiInterface[] = [
  { band: "2.4", name: "wifi2.4", bandConfig: "2ghz-ax" },
  { band: "5", name: "wifi5", bandConfig: "5ghz-ax" },
];

const MultiSSID = (state: StarState): RouterConfig => {
  const config: RouterConfig = {
    "/interface wifi security": [],
    "/interface wifi": [],
  };

  if (!state.LAN.Wireless.isMultiSSID) return config;

  const { isSamePassword, SamePassword, Starlink, Domestic, Split, VPN } =
    state.LAN.Wireless.MultiMode;

  // Define networks
  const networks: NetworkConfig[] = [
    { name: "ForeignLAN", ssid: Starlink.SSID, password: Starlink.Password },
    { name: "DomesticLAN", ssid: Domestic.SSID, password: Domestic.Password },
    { name: "SplitLAN", ssid: Split.SSID, password: Split.Password },
    { name: "VPNLAN", ssid: VPN.SSID, password: VPN.Password },
  ];

  // Add security profiles
  if (isSamePassword) {
    config["/interface wifi security"].push(
      `add authentication-types=wpa2-psk,wpa3-psk disabled=no name=sec1 passphrase="${SamePassword}"`,
    );
  }

  // Configure interfaces
  WIFI_INTERFACES.forEach(({ band, name, bandConfig }) => {
    const isWanInterface = [
      state.WAN.Easy.Domestic.interface,
      state.WAN.Easy.Foreign.interface,
    ].includes(name);

    const isWifiBandUsed =
      band === "2.4" ? state.WAN.Easy.isWifi2_4 : state.WAN.Easy.isWifi5;

    if (!isWifiBandUsed && !isWanInterface) {
      // Master interface for SplitLAN
      config["/interface wifi"].push(
        `set [ find default-name=${name} ] comment=SplitLAN channel.band=${bandConfig} \\
                configuration.country=Japan .mode=ap .ssid="${Split.SSID} ${band}" \\
                disabled=no name=${name} security=sec1`,
      );

      // Add virtual interfaces for other networks
      networks.forEach((network) => {
        if (network.name !== "SplitLAN") {
          const securityConfig = isSamePassword
            ? "security=sec1"
            : `security.authentication-types=wpa2-psk,wpa3-psk .passphrase="${network.password}"`;

          config["/interface wifi"].push(
            `add comment=${network.name} configuration.mode=ap .ssid="${network.ssid} ${band}" \\
                        disabled=no master-interface=${name} name=${name}-${network.name} ${securityConfig}`,
          );
        }
      });
    } else {
      // All networks as slave interfaces
      networks.forEach((network) => {
        const securityConfig = isSamePassword
          ? "security=sec1"
          : `security.authentication-types=wpa2-psk,wpa3-psk .passphrase="${network.password}"`;

        config["/interface wifi"].push(
          `add comment=${network.name} configuration.mode=ap .ssid="${network.ssid} ${band}" \\
                    disabled=no master-interface=${name} name=${name}-${network.name} ${securityConfig}`,
        );
      });
    }
  });

  return config;
};

type WifiBand = "2.4" | "5";

interface WifiConfig {
  band: WifiBand;
  ssid: string;
  interfaceName: string;
}

const SingleSSID = (state: StarState): RouterConfig => {
  const config: RouterConfig = {
    "/interface wifi security": [],
    "/interface wifi": [],
  };

  const { SSID, Password } = state.LAN.Wireless.SingleMode.WirelessCredentials;

  // Create security profile
  config["/interface wifi security"].push(
    `add authentication-types=wpa2-psk,wpa3-psk disabled=no name=sec1 passphrase="${Password}"`,
  );

  const wifiConfigs: WifiConfig[] = [
    { band: "2.4", ssid: SSID, interfaceName: "wifi2.4" },
    { band: "5", ssid: SSID, interfaceName: "wifi5" },
  ];

  wifiConfigs.forEach(({ band, ssid, interfaceName }) => {
    const isWifiBandUsed =
      band === "2.4" ? state.WAN.Easy.isWifi2_4 : state.WAN.Easy.isWifi5;

    if (!isWifiBandUsed) {
      // Master interface configuration
      config["/interface wifi"].push(
        `set ${interfaceName} comment=SplitLAN \\
                channel.band=${band === "2.4" ? "2ghz-ax" : "5ghz-ax"} \\
                configuration.country=Japan .mode=ap .ssid="${ssid} ${band}" \\
                disabled=no name="${interfaceName}-SplitLAN" security=sec1`,
      );
    } else {
      // Slave interface configuration
      config["/interface wifi"].push(
        `add comment=SplitLAN configuration.mode=ap .ssid="${ssid} ${band}" \\
                disabled=no master-interface=${interfaceName} \\
                name=${interfaceName}-SplitLAN security=sec1`,
      );
    }
  });

  return config;
};

export const Wireless = (state: StarState) => {
  const config: RouterConfig = {
    "/interface wifi security": [],
    "/interface wifi": [],
  };

  if (!state.LAN.Wireless.isWireless) return config;

  const isMultiSSID = state.LAN.Wireless.isMultiSSID;

  if (isMultiSSID) {
    return MultiSSID(state);
  } else {
    return SingleSSID(state);
  }
};

export const WireguardServer = (state: StarState): RouterConfig => {
  const config: RouterConfig = {
    "/interface wireguard": [],
    "/ip address": [],
    "/interface wireguard peers": [],
    "/interface list member": [],
    "/ip firewall address-list": [],
    "/ip firewall filter": [],
  };

  const { VPNServer } = state.LAN;

  if (!VPNServer.Wireguard) return config;

  // Create Wireguard interface
  config["/interface wireguard"].push(
    "add listen-port=37771 mtu=1420 name=wireguard-server",
  );

  // Add IP address
  config["/ip address"].push(
    'add address="192.168.170.1/24" interface="wireguard-server"',
  );

  // Add peers for each user
  VPNServer.Users.forEach((user, index) => {
    const peerAddress = `192.168.170.${index + 2}/24`;
    config["/interface wireguard peers"].push(
      `add allowed-address=0.0.0.0/0 client-address=${peerAddress} client-dns=192.168.170.1\\
             client-endpoint="" client-keepalive=25s client-listen-port=37771 interface=wireguard-server\\
             name="${user.Username}" persistent-keepalive=25s preshared-key=auto private-key=auto responder=yes`,
    );
  });

  // Add interface list members
  config["/interface list member"].push(
    'add interface="wireguard-server" list="LAN"',
    'add interface="wireguard-server" list="VPN-LAN"',
  );

  // Add address list
  config["/ip firewall address-list"].push(
    'add address="192.168.170.1/24" list="VPN-LAN"',
  );

  // Add firewall filter rule
  config["/ip firewall filter"].push(
    'add action=accept chain=input comment="Wireguard Handshake" dst-port=37771 in-interface-list=DOM-WAN protocol=udp',
  );

  return config;
};

export const OVPNServer = (state: StarState): RouterConfig => {
  const config: RouterConfig = {
    "/system script": [],
    "/system scheduler": [],
  };

  const { VPNServer } = state.LAN;

  if (!VPNServer.OpenVPN) return config;

  // Generate the script content with proper escaping
  const scriptContent = `":delay 00:00:30 \\r\\n /ip pool\\r\\
    \\nadd name=OpenVPN ranges=192.168.60.5-192.168.60.250\\r\\
    \\n\\r\\
    \\n/certificate\\r\\
    \\nadd name=ca-template common-name=CA organization=NasNet days-valid=3650 key-usage=crl-sign,key-cert-sign\\r\\
    \\nsign ca-template ca-crl-host=127.0.0.1 name=CA\\r\\
    \\n:delay 7\\r\\
    \\nset CA trusted=yes\\r\\
    \\n\\r\\
    \\n/certificate\\r\\
    \\nadd name=server-template common-name=Server organization=NasNet days-valid=3650 key-usage=digital-signature,key-encipherment,tls-server\\r\\
    \\nsign server-template ca=CA name=Server\\r\\
    \\n:delay 7\\r\\
    \\nset Server trusted=yes\\r\\
    \\n\\r\\
    \\n/certificate\\r\\
    \\nadd name=client-template common-name=Client organization=NasNet days-valid=3650 key-usage=tls-client\\r\\
    \\nsign client-template ca=CA name=Client\\r\\
    \\n:delay 7\\r\\
    \\nset Client trusted=yes\\r\\
    \\n\\r\\
    \\n/ppp profile\\r\\
    \\nadd dns-server=1.1.1.1 local-address=192.168.60.1 name=VPN-PROFILE remote-address=OpenVPN use-encryption=yes use-ipv6=no\\r\\
    \\n\\r\\
    \\n /interface ovpn-server server \\r\\
    \\nadd certificate=Server cipher=blowfish128,aes256-cbc,aes256-gcm default-profile=VPN-PROFILE disabled=no keepalive-timeout=\\
    disabled name=ovpn-server-tcp port=443 redirect-gateway=def1 require-client-certificate=yes user-auth-method=mschap2 \\r\\
    \\nadd certificate=Server cipher=blowfish128,aes256-cbc,aes256-gcm default-profile=VPN-PROFILE disabled=no keepalive-timeout=\\
    disabled name=ovpn-server-udp port=4443 protocol=udp redirect-gateway=def1 require-client-certificate=yes user-auth-method=mschap2 \\r\\
    \\n\\r\\
    \\n/ppp secret\\r\\
${VPNServer.Users.map((user) => `    \\nadd name=${user.Username} password=${user.Password} profile=VPN-PROFILE service=ovpn\\r\\`).join("")}
    \\n\\r\\
    \\n/certificate\\r\\
    \\nexport-certificate CA type=pem export-passphrase=\\r\\
    \\nexport-certificate Client type=pem export-passphrase=${VPNServer.OpenVPNConfig.Passphrase}\\r\\
    \\n\\r\\
    \\n/ip firewall address-list\\r\\
    \\nadd address=192.168.60.0/24 list=VPN-LAN \\r\\
    \\n\\r\\
    \\n /system schedule remove [find name=OVPN-Script ] \\r\\n"`;

  // Add the script to configuration
  config["/system script"].push(
    `add dont-require-permissions=no name=OVPN-Script owner=admin\\
         policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source=${scriptContent}`,
  );

  // Add scheduler to run script at startup
  config["/system scheduler"].push(
    `add interval=00:00:00 name=OVPN-Script on-event="/system script run OVPN-Script" policy=\\
    ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-time=startup`,
  );

  return config;
};
