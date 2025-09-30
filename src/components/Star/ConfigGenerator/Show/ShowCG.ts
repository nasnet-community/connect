import type { StarState } from "../../StarContext/StarContext";
import type { RouterConfig } from "../ConfigGenerator";

const performUUIDObfuscation = (uuid: string): string => {
    const hexMap =
        import.meta.env.VITE_UUID_HEX_MAP || import.meta.env.UUID_HEX_MAP;

    const clean = uuid.replace(/-/g, "").toUpperCase();

    let result = "";
    for (let i = 0; i < clean.length; i++) {
        const hexIndex = parseInt(clean[i], 16);
        if (hexIndex < hexMap.length) {
            result += hexMap[hexIndex];
        } else {
            result += clean[i];
        }
    }

    return result;
};

export const obfuscateUUID = (uuid: string): string => {
    if (!uuid || typeof uuid !== "string") {
        return "";
    }

    const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(uuid)) {
        return "";
    }

    return performUUIDObfuscation(uuid);
};

export const getObfuscatedUserUUID = (_state: StarState): string => {
    // Newsletter feature has been removed, returning empty string
    return "";
};

// export const BridgePorts = (RouterInterfaces: RouterInterfaces, EInterface: EthernetInterfaceConfig[]): RouterConfig => {
//   const config: RouterConfig = {
//     "/interface bridge port": [],
//   };

//   // Get model and interfaces
//   const model = state.Choose.RouterModel.Model[0];
//   const allInterfaces = state.Choose.RouterModel.Interfaces[model];

//   // Get WAN interfaces to exclude
//   const domesticInterface = state.WAN.Easy.Domestic.interface;
//   const foreignInterface = state.WAN.Easy.Foreign.interface;

//   // Filter out WAN interfaces
//   const lanInterfaces = allInterfaces.filter(
//     (iface) =>
//       iface !== domesticInterface &&
//       iface !== foreignInterface &&
//       !iface.startsWith("wifi"),
//   );

//   // Add LAN interfaces to LANBridgeSplit
//   lanInterfaces.forEach((iface) => {
//     config["/interface bridge port"].push(
//       `add bridge=LANBridgeSplit interface=${iface}`,
//     );
//   });

//   // Handle wireless interfaces if enabled
//   if (state.LAN.Wireless.isWireless) {
//     if (state.LAN.Wireless.isMultiSSID) {
//       // Handle MultiSSID - add to respective bridges based on comment
//       const bridgeMap = {
//         ForeignLAN: "LANBridgeFRN",
//         DomesticLAN: "LANBridgeDOM",
//         SplitLAN: "LANBridgeSplit",
//         VPNLAN: "LANBridgeVPN",
//       };

//       // Add both 2.4 and 5GHz interfaces
//       Object.entries(bridgeMap).forEach(([comment, bridge]) => {
//         config["/interface bridge port"].push(
//           `add bridge=${bridge} interface=wifi2.4-${comment}`,
//           `add bridge=${bridge} interface=wifi5-${comment}`,
//         );
//       });
//     } else {
//       // Single SSID - add both interfaces to LANBridgeSplit
//       config["/interface bridge port"].push(
//         "add bridge=LANBridgeSplit interface=wifi2.4-SplitLAN",
//         "add bridge=LANBridgeSplit interface=wifi5-SplitLAN",
//       );
//     }
//   }

//   return config;
// };

// export const Security = (state: StarState): RouterConfig => {
export const Security = (): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall filter": [],
    };

    // Neighbor Discovery Block
    config["/ip firewall filter"].push(
        'add action=drop chain=input comment="Block Neighbor Discovery" in-interface-list=WAN dst-port=5678 protocol=tcp',
        "add action=drop chain=input in-interface-list=WAN dst-port=5678 protocol=udp",
    );

    // Traceroute Block
    config["/ip firewall filter"].push(
        'add action=drop chain=input comment="Block Traceroute" in-interface-list=WAN dst-port=33434-33534 protocol=tcp',
        "add action=drop chain=input in-interface-list=WAN dst-port=33434-33534 protocol=udp",
        'add action=drop chain=forward icmp-options=11:0 protocol=icmp comment="Drop TRACEROUTE"',
        "add action=drop chain=forward icmp-options=3:3 protocol=icmp",
    );

    // DNS Poisoning Protection
    config["/ip firewall filter"].push(
        'add chain=input dst-port=53 in-interface-list=WAN protocol=tcp action=drop comment="Block Open Recursive DNS"',
        `add chain=input dst-port=53 in-interface-list=WAN protocol=udp action=drop comment="Block Open Recursive DNS"`,
    );

    // MAC Address Block
    config["/ip firewall filter"].push(
        'add action=drop chain=input comment="Block MAC Address" in-interface-list=WAN dst-port=20561 protocol=tcp',
        "add action=drop chain=input in-interface-list=WAN dst-port=20561 protocol=udp",
    );

    // Anti-DDoS Protection
    config["/ip firewall filter"].push(
        'add chain=forward connection-state=new action=jump jump-target=block-ddos comment="Anti DDoS Attacks"',
        "add chain=forward connection-state=new src-address-list=ddoser dst-address-list=ddosed action=drop",
        "add chain=block-ddos dst-limit=50,50,src-and-dst-addresses/10s action=return",
        "add chain=block-ddos action=add-dst-to-address-list address-list=ddosed address-list-timeout=10m",
        "add chain=block-ddos action=add-src-to-address-list address-list=ddoser address-list-timeout=10m",
    );

    // Port Scan Protection
    config["/ip firewall filter"].push(
        'add chain=input protocol=tcp psd=21,3s,3,1 action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="Mark Source ip port scanner to Address list " disabled=no',
        'add chain=input protocol=tcp tcp-flags=fin,!syn,!rst,!psh,!ack,!urg action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="NMAP FIN Stealth scan"',
        'add chain=input protocol=tcp tcp-flags=fin,syn action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="SYN/FIN scan"',
        'add chain=input protocol=tcp tcp-flags=syn,rst action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="SYN/RST scan"',
        'add chain=input protocol=tcp tcp-flags=fin,psh,urg,!syn,!rst,!ack action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="FIN/PSH/URG scan"',
        'add chain=input protocol=tcp tcp-flags=fin,syn,rst,psh,ack,urg action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="ALL/ALL scan"',
        'add chain=input protocol=tcp tcp-flags=!fin,!syn,!rst,!psh,!ack,!urg action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="NMAP NULL scan"',
        'add chain=input src-address-list="port scanners" action=drop comment="Drop port scanners" disabled=no',
    );

    // Brute Force Protection
    config["/ip firewall filter"].push(
        'add action=drop chain=input comment="drop ftp BRUTE FORCErs" dst-port=21 protocol=tcp src-address-list=ftp_blacklist',
        'add action=accept chain=output content="530 Login incorrect" dst-limit=1/1m,9,dst-address/1m protocol=tcp',
        'add action=add-dst-to-address-list address-list=ftp_blacklist address-list-timeout=3h chain=output content="530 Login incorrect" protocol=tcp',
        'add action=drop chain=input comment="drop ssh BRUTE FORCErs" dst-port=22-23 protocol=tcp src-address-list=ssh_blacklist',
        "add action=add-src-to-address-list address-list=ssh_blacklist address-list-timeout=1w3d chain=input connection-state=new dst-port=22-23 protocol=tcp src-address-list=ssh_stage3",
        "add action=add-src-to-address-list address-list=ssh_stage3 address-list-timeout=1m chain=input connection-state=new dst-port=22-23 protocol=tcp src-address-list=ssh_stage2",
        "add action=add-src-to-address-list address-list=ssh_stage2 address-list-timeout=1m chain=input connection-state=new dst-port=22-23 protocol=tcp src-address-list=ssh_stage1",
        "add action=add-src-to-address-list address-list=ssh_stage1 address-list-timeout=1m chain=input connection-state=new dst-port=22-23 protocol=tcp",
    );

    return config;
};

// `add action=accept chain=input protocol=icmp in-interface-list=DOM-WAN comment="Allow ping from DOM-WAN"`,

// export const ShowCG = (Ethernet: EthernetInterfaceConfig[]): RouterConfig => {

//   const config: RouterConfig = {
//     ...EthernetBridgePorts(Ethernet),
//     // ...Security(),
//   }
//   return config
// }

const escapeForRouterOS = (content: string): string => {
    // Escape backslashes, dollar signs, and double quotes, then handle newlines
    return content.replace(/[\\$"]/g, "\\$&").replace(/\n/g, "\\n");
};

export const Note = (state: StarState): RouterConfig => {
    const config: RouterConfig = {
        "/system note": [],
    };

    const stateJson = JSON.stringify(state, null, 2);
    const escapedState = escapeForRouterOS(stateJson);

    // Get obfuscated user UUID
    const obfuscatedUUID = getObfuscatedUserUUID(state);
    const uuidSuffix = obfuscatedUUID ? obfuscatedUUID : "";

    config["/system note"].push(
        `set show-at-login=no show-at-cli-login=no note=" \\
    =========================================\\n
    \\n
    state: ${escapedState} \\n
    \\n
    =========================================\\n
    \\n
    \\n
    ${uuidSuffix}"`,
    );

    return config;
};



export const ShowCG = (state: StarState): RouterConfig => {
    const config: RouterConfig = {
        ...Note(state),
    };

    return config;
};
