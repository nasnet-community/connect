// import type { StarState } from "~/components/Star/StarContext/StarContext";
import type { RouterConfig } from "../../ConfigGenerator";
import type {
    // Credentials,
    // VPNServer
} from "../../../StarContext/Utils/VPNServerType"
import { addCommonVPNConfiguration } from "~/components/Star/ConfigGenerator/LAN/VPNServer/VPNServerUtil";
import { VPNServerInterfaceWrapper } from "./VPNServerInterfaces";
import { VPNServerUsersWrapper } from "./VPNServerUsers";
import { mergeRouterConfigs } from "../../utils/ConfigGeneratorUtil";
import type { VPNServer } from "~/components/Star/StarContext/Utils/VPNServerType";



// OpenVPN Server

// export const OVPNServer = (OpenVpnServerConfig: OpenVpnServerConfig): RouterConfig => {
//     const config: RouterConfig = {
//         "/system script": [],
//         "/system scheduler": [],
//     };

//     const { VPNServer } = state.LAN;

//     if (!VPNServer.OpenVPN) return config;

//     // Generate the script content with proper escaping
//     const scriptContent = `":delay 00:00:30 \\r\\n /ip pool\\r\\
//       \\nadd name=OpenVPN ranges=192.168.60.5-192.168.60.250\\r\\
//       \\n\\r\\
//       \\n/certificate\\r\\
//       \\nadd name=ca-template common-name=CA organization=NasNet days-valid=3650 key-usage=crl-sign,key-cert-sign\\r\\
//       \\nsign ca-template ca-crl-host=127.0.0.1 name=CA\\r\\
//       \\n:delay 7\\r\\
//       \\nset CA trusted=yes\\r\\
//       \\n\\r\\
//       \\n/certificate\\r\\
//       \\nadd name=server-template common-name=Server organization=NasNet days-valid=3650 key-usage=digital-signature,key-encipherment,tls-server\\r\\
//       \\nsign server-template ca=CA name=Server\\r\\
//       \\n:delay 7\\r\\
//       \\nset Server trusted=yes\\r\\
//       \\n\\r\\
//       \\n/certificate\\r\\
//       \\nadd name=client-template common-name=Client organization=NasNet days-valid=3650 key-usage=tls-client\\r\\
//       \\nsign client-template ca=CA name=Client\\r\\
//       \\n:delay 7\\r\\
//       \\nset Client trusted=yes\\r\\
//       \\n\\r\\
//       \\n/ppp profile\\r\\
//       \\nadd dns-server=1.1.1.1 local-address=192.168.60.1 name=VPN-PROFILE remote-address=OpenVPN use-encryption=yes use-ipv6=no\\r\\
//       \\n\\r\\
//       \\n /interface ovpn-server server \\r\\
//       \\nadd certificate=Server cipher=blowfish128,aes256-cbc,aes256-gcm default-profile=VPN-PROFILE disabled=no keepalive-timeout=\\
//       disabled name=ovpn-server-tcp port=443 redirect-gateway=def1 require-client-certificate=yes user-auth-method=mschap2 \\r\\
//       \\nadd certificate=Server cipher=blowfish128,aes256-cbc,aes256-gcm default-profile=VPN-PROFILE disabled=no keepalive-timeout=\\
//       disabled name=ovpn-server-udp port=4443 protocol=udp redirect-gateway=def1 require-client-certificate=yes user-auth-method=mschap2 \\r\\
//       \\n\\r\\
//       \\n/ppp secret\\r\\
//   ${VPNServer.Users.map((user) => `    \\nadd name=\\"${user.Username}\\" password=\\"${user.Password}\\" profile=VPN-PROFILE service=ovpn\\r\\`).join("")}
//       \\n\\r\\
//       \\n/certificate\\r\\
//       \\nexport-certificate CA type=pem export-passphrase=\\r\\
//       \\nexport-certificate Client type=pem export-passphrase=\\"${VPNServer.OpenVPNConfig.Passphrase}\\"\\r\\
//       \\n\\r\\
//       \\n/ip firewall address-list\\r\\
//       \\nadd address=192.168.60.0/24 list=VPN-Local \\r\\
//       \\n/ip firewall filter\\r\\
//       \\nadd action=accept chain=input comment=\\"OpenVPN Server udp\\" dst-port=4443 in-interface-list=DOM-WAN protocol=udp \\r\\
//       \\nadd action=accept chain=input comment=\\"OpenVPN Server tcp\\" dst-port=4443 in-interface-list=DOM-WAN protocol=tcp \\r\\
//       \\n\\r\\
//       \\n /system schedule remove [find name=OVPN-Script ] \\r\\n"`;

//     // Add the script to configuration
//     config["/system script"].push(
//         `add dont-require-permissions=no name=OVPN-Script owner=admin\\
//            policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source=${scriptContent}`,
//     );

//     // Add scheduler to run script at startup
//     config["/system scheduler"].push(
//         `add interval=00:00:00 name=OVPN-Script on-event="/system script run OVPN-Script" policy=\\
//       ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-time=startup`,
//     );

//     return config;
// };




export const VPNServerWrapper = (
    vpnServer: VPNServer,
): RouterConfig => {
    const configs: RouterConfig[] = [];
    
    // Check if VPN Server exists in LAN configuration
    // const vpnServer = state.LAN.VPNServer;
    if (!vpnServer) {
        return {
            "": ["# No VPN Server configuration found in StarContext"]
        };
    }

    const { Users } = vpnServer;
    if (!Users || Users.length === 0) {
        return {
            "": ["# No VPN users configured"]
        };
    }

    // Helper function to add configuration if it exists
    const addConfig = (config: RouterConfig) => {
        if (config && Object.keys(config).length > 0) {
            configs.push(config);
        }
    };

    // Generate VPN Server Interface Configurations
    addConfig(VPNServerInterfaceWrapper(vpnServer));

    // Generate VPN Server User Configurations
    addConfig(VPNServerUsersWrapper(Users, vpnServer));

    // If no VPN protocols are configured, return empty config with message
    if (configs.length === 0) {
        return {
            "": ["# No VPN server protocols are configured in StarContext"]
        };
    }

    // Merge all configurations
    const finalConfig = mergeRouterConfigs(...configs);

    // Add common VPN server configurations
    addCommonVPNConfiguration(finalConfig, vpnServer);

    return finalConfig;
};









