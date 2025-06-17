import type { RouterConfig } from "../../ConfigGenerator";
import type {
    WireguardClientConfig,
    OpenVpnClientConfig,
    PptpClientConfig,
    L2tpClientConfig,
    SstpClientConfig,
    Ike2ClientConfig,
    VPNClient,
} from "../../../StarContext/Utils/VPNClientType";
import { CommandShortner } from "../../utils/ConfigGeneratorUtil";
import { GenerateOpenVPNCertificateScript } from "./VPNClientScripts";

// VPN Client Utils

export const isFQDN = (address: string): boolean => {
    const regex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    return regex.test(address);
}

export const RouteToVPN = (InterfaceName: string, EndpointAddress: string): RouterConfig =>{
    const config: RouterConfig = {
        "/ip route": []
    };
    if(!isFQDN(EndpointAddress)){
        config["/ip route"].push(
            `add comment="Route-to-FRN" disabled=no distance=1 dst-address=${EndpointAddress} gateway=192.168.1.1 \\
            pref-src="" routing-table=main scope=30 suppress-hw-offload=no target-scope=10`,
        );
    } 
        

    config["/ip route"].push(
        `add comment="Route-to-VPN" disabled=no distance=1 dst-address=0.0.0.0/0 gateway=${InterfaceName} \\
        pref-src="" routing-table=to-VPN scope=30 suppress-hw-offload=no target-scope=10`,

      );

    return config
}

export const InterfaceList = (InterfaceName: string): RouterConfig =>{
    const config: RouterConfig = {
        "/interface list member": []
    };

    config["/interface list member"].push(
        `add interface="${InterfaceName}" list="WAN"`,
        `add interface="${InterfaceName}" list="FRN-WAN"`,
      );

    return config
}

export const AddressList = (Address: string): RouterConfig =>{
    const config: RouterConfig = {
        "/ip firewall address-list": [],
        "/ip firewall mangle": [],
    }

    config["/ip firewall address-list"].push(
        `add address="${Address}" list=VPNE`,
    );
    config["/ip firewall mangle"].push(
        `add action=mark-connection chain=output comment="VPN Endpoint" \\
        dst-address-list=VPNE new-connection-mark=conn-VPNE passthrough=yes`,
        `add action=mark-routing chain=output comment="VPN Endpoint" \\
        connection-mark=conn-VPNE dst-address-list=VPNE new-routing-mark=to-FRN passthrough=no`,
        `add action=mark-routing chain=output comment="VPN Endpoint" \\
        dst-address-list=VPNE new-routing-mark=to-FRN passthrough=no`,
    );

    return config
}

export const IPAddress = (InterfaceName: string, Address: string): RouterConfig =>{
    const config: RouterConfig = {
        "/ip address": []
    };

    config["/ip address"].push(
        `add address=${Address} interface=${InterfaceName}`,
    );

    return config
}

export const DNSVPN = (DNS: string, DomesticLink: boolean): RouterConfig =>{
    const config: RouterConfig = {
        "/ip firewall nat": []
    };

    if(DomesticLink){
        config["/ip firewall nat"].push(
            `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 \\
            protocol=udp src-address-list=VPN-LAN to-addresses=${DNS}`,
            `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 \\
            protocol=tcp src-address-list=VPN-LAN to-addresses=${DNS}`,
            `add action=dst-nat chain=dstnat comment="DNS Split" dst-port=53 \\
            protocol=udp src-address-list=Split-LAN to-addresses=${DNS}`,
            `add action=dst-nat chain=dstnat comment="DNS Split" dst-port=53 \\
            protocol=tcp src-address-list=Split-LAN to-addresses=${DNS}`,
        );
    } else {
        config["/ip firewall nat"].push(
            `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 \\
            protocol=udp src-address-list=VPN-LAN to-addresses=${DNS}`,
            `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 \\
            protocol=tcp src-address-list=VPN-LAN to-addresses=${DNS}`,
        );
    }

    return config
}

export const BaseVPNConfig = (InterfaceName: string, EndpointAddress: string, DNS: string, DomesticLink: boolean): RouterConfig =>{
    const config: RouterConfig = {
        "/ip address": [],
        "/ip firewall nat": [],
        "/interface list member": [],
        "/ip route": [],
        "/ip firewall address-list": [],
        "/ip firewall mangle": [],
    };
    
    // call the functions and add the output of the functions to the config
    // const addressConfig = AddressList(InterfaceName, EndpointAddress);
    // config["/ip address"].push(...addressConfig["/ip address"]);
    
    const dnsConfig = DNSVPN(DNS, DomesticLink);
    config["/ip firewall nat"].push(...dnsConfig["/ip firewall nat"]);
    
    const interfaceListConfig = InterfaceList(InterfaceName);
    config["/interface list member"].push(...interfaceListConfig["/interface list member"]);
    
    const routeConfig = RouteToVPN(InterfaceName, EndpointAddress);
    config["/ip route"].push(...routeConfig["/ip route"]);

    const addressListConfig = AddressList(EndpointAddress);
    config["/ip firewall address-list"].push(...addressListConfig["/ip firewall address-list"]);
    config["/ip firewall mangle"].push(...addressListConfig["/ip firewall mangle"]);

    return config;
}

// Wireguard Client

export const WireguardClient = (config: WireguardClientConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/interface wireguard": [],
        "/interface wireguard peers": [],
        "/ip address": [],
        "/ip route": [],
    };

    const {
        InterfacePrivateKey,
        InterfaceAddress,
        InterfaceListenPort,
        InterfaceMTU,
        PeerPublicKey,
        PeerEndpointAddress,
        PeerEndpointPort,
        PeerAllowedIPs,
        PeerPresharedKey,
        PeerPersistentKeepalive
    } = config;

    let interfaceCommand = `add name=wireguard-client private-key="${InterfacePrivateKey}"`;
    
    if (InterfaceListenPort) {
        interfaceCommand += ` listen-port=${InterfaceListenPort}`;
    }
    
    if (InterfaceMTU) {
        interfaceCommand += ` mtu=${InterfaceMTU}`;
    }
    
    routerConfig["/interface wireguard"].push(interfaceCommand);

    let peerCommand = `add interface=wireguard-client public-key="${PeerPublicKey}" \\
         endpoint-address=${PeerEndpointAddress} endpoint-port=${PeerEndpointPort} \\
         allowed-address=${PeerAllowedIPs}`;
    
    if (PeerPresharedKey) {
        peerCommand += ` preshared-key="${PeerPresharedKey}"`;
    }
    
    if (PeerPersistentKeepalive) {
        peerCommand += ` persistent-keepalive=${PeerPersistentKeepalive}s`;
    }
    
    routerConfig["/interface wireguard peers"].push(peerCommand);

    routerConfig["/ip address"].push(
        `add address=${InterfaceAddress} interface=wireguard-client`
    );

    // routerConfig["/ip route"].push(
    //     `add dst-address=${PeerEndpointAddress}/32 gateway=[/ip dhcp-client get [find] gateway] \\
    //      comment="WireGuard endpoint route"`
    // );

    routerConfig["/ip route"].push(
        `add dst-address=0.0.0.0/0 gateway=wireguard-client table=to-VPN \\
         comment="WireGuard endpoint route"`
    );

    return routerConfig;
};

// OpenVPN Client

export const OpenVPNClient = (config: OpenVpnClientConfig): RouterConfig =>{
    const routerConfig: RouterConfig = {
        "/interface ovpn-client": [],
    };

    const { 
        Server,
        Mode,
        Protocol,
        Credentials,
        AuthType,
        Auth,
        Cipher,
        TlsVersion,
        Certificates,
        VerifyServerCertificate,
        RouteNoPull,
    } = config;

    let command = `add name=ovpn-client connect-to="${Server.Address}"`;
    
    if (Server.Port) {
        command += ` port=${Server.Port}`;
    }
    
    if (Protocol) {
        command += ` protocol=${Protocol}`;
    }
    
    if (Mode) {
        command += ` mode=${Mode}`;
    }
    
    if (Credentials && AuthType !== "Certificate") {
        command += ` user="${Credentials.Username}" password="${Credentials.Password}"`;
    }
    
    command += ` auth=${Auth}`;
    
    if (Cipher) {
        command += ` cipher=${Cipher}`;
    }
    
    if (TlsVersion) {
        command += ` tls-version=${TlsVersion}`;
    }
    
    if (!Certificates?.ClientCertificateContent && Certificates?.ClientCertificateName) {
        command += ` certificate=${Certificates.ClientCertificateName}`;
    }
    
    if (VerifyServerCertificate !== undefined) {
        command += ` verify-server-certificate=${VerifyServerCertificate ? 'yes' : 'no'}`;
    }
    
    if (RouteNoPull !== undefined) {
        command += ` add-default-route=${RouteNoPull ? 'no' : 'yes'}`;
    }

    command += ` disabled=no`;

    routerConfig["/interface ovpn-client"].push(command);

    return CommandShortner(routerConfig);
}

// PPTP Client

export const PPTPClient = (config: PptpClientConfig): RouterConfig =>{
    const routerConfig: RouterConfig = {
        "/interface pptp-client": [],
    };

    const { 
        ConnectTo,
        Credentials,
        AuthMethod,
        KeepaliveTimeout,
        DialOnDemand,
    } = config;

    let command = `add name=pptp-client connect-to="${ConnectTo}"`;
    command += ` user="${Credentials.Username}" password="${Credentials.Password}"`;
    
    if (AuthMethod && AuthMethod.length > 0) {
        command += ` allow=${AuthMethod.join(',')}`;
    }
    
    if (KeepaliveTimeout) {
        command += ` keepalive-timeout=${KeepaliveTimeout}`;
    }
    
    if (DialOnDemand !== undefined) {
        command += ` dial-on-demand=${DialOnDemand ? 'yes' : 'no'}`;
    }
    

    
    command += ` disabled=no`;

    routerConfig["/interface pptp-client"].push(command);

    return CommandShortner(routerConfig);
}

// L2TP Client

export const L2TPClient = (config: L2tpClientConfig): RouterConfig =>{
    const routerConfig: RouterConfig = {
        "/interface l2tp-client": [],
    };

    const { 
        Server,
        Credentials,
        UseIPsec,
        IPsecSecret,
        AuthMethod,
        ProtoVersion,
        FastPath,
        keepAlive,
        DialOnDemand,
        CookieLength,
        DigestHash,
        CircuitId,
    } = config;

    // if port exist add it to the server address
    // let ServerAddress = Server.Address;
    // if (Server.Port) {
    //     ServerAddress += `:${Server.Port}`;
    // }

    // let command = `add name=l2tp-client connect-to=${ServerAddress}`;
    let command = `add name=l2tp-client connect-to=${Server.Address}`;


    command += ` user="${Credentials.Username}" password="${Credentials.Password}"`;
    
    if (UseIPsec !== undefined) {
        command += ` use-ipsec=${UseIPsec ? 'yes' : 'no'}`;
    }
    
    if (IPsecSecret) {
        command += ` ipsec-secret="${IPsecSecret}"`;
    }
    
    if (AuthMethod && AuthMethod.length > 0) {
        command += ` allow=${AuthMethod.join(',')}`;
    }
    
    if (ProtoVersion) {
        command += ` l2tp-proto-version=${ProtoVersion}`;
    }
    
    if (FastPath !== undefined) {
        command += ` allow-fast-path=${FastPath ? 'yes' : 'no'}`;
    }

    // make the keepalive timeout a number
    const keepAliveTimeout = parseInt(keepAlive || '0');
    
    if (keepAliveTimeout) {
        command += ` keepalive-timeout=${keepAliveTimeout}`;
    }
    
    if (DialOnDemand !== undefined) {
        command += ` dial-on-demand=${DialOnDemand ? 'yes' : 'no'}`;
    }
    
    if (CookieLength !== undefined) {
        command += ` l2tpv3-cookie-length=${CookieLength}`;
    }
    
    if (DigestHash) {
        command += ` l2tpv3-digest-hash=${DigestHash}`;
    }
    
    if (CircuitId) {
        command += ` l2tpv3-circuit-id="${CircuitId}"`;
    }
    
    command += ` disabled=no`;

    routerConfig["/interface l2tp-client"].push(command);

    return CommandShortner(routerConfig);
}

// SSTP Client

export const SSTPClient = (config: SstpClientConfig): RouterConfig =>{
    const routerConfig: RouterConfig = {
        "/interface sstp-client": [],
    };

    const { 
        Server,
        Credentials,
        AuthMethod,
        Ciphers,
        TlsVersion,
        Proxy,
        SNI,
        PFS,
        DialOnDemand,
        KeepAlive,
        VerifyServerCertificate,
        VerifyServerAddressFromCertificate,
        ClientCertificateName,
    } = config;

    let command = `add name=sstp-client connect-to=${Server.Address}`;
    
    // if (Server.Port) {
    //     command += ` port=${Server.Port}`;
    // }
    
    // command += ` user="${Credentials.Username}" password="${Credentials.Password}"`;
    command += ` user="${Credentials.Username}" `;

    
    if (AuthMethod && AuthMethod.length > 0) {
        command += ` authentication=${AuthMethod.join(',')}`;
    }
    
    if (Ciphers && Ciphers.length > 0) {
        command += ` ciphers=${Ciphers.join(',')}`;
    }
    
    if (TlsVersion) {
        command += ` tls-version=${TlsVersion}`;
    }
    
    if (Proxy) {
        command += ` http-proxy=${Proxy.Address} proxy-port=${Proxy.Port || 8080}`;

    }
    
    if (SNI !== undefined) {
        command += ` add-sni=${SNI ? 'yes' : 'no'}`;
    }
    
    if (PFS) {
        command += ` pfs=${PFS}`;
    }
    
    if (DialOnDemand !== undefined) {
        command += ` dial-on-demand=${DialOnDemand ? 'yes' : 'no'}`;
    }
    
    if (KeepAlive) {
        command += ` keepalive=${KeepAlive}`;
    }
    
    if (VerifyServerCertificate !== undefined) {
        command += ` verify-server-certificate=${VerifyServerCertificate ? 'yes' : 'no'}`;
    }
    
    if (VerifyServerAddressFromCertificate !== undefined) {
        command += ` verify-server-address-from-certificate=${VerifyServerAddressFromCertificate ? 'yes' : 'no'}`;
    }
    
    if (ClientCertificateName) {
        command += ` certificate=${ClientCertificateName}`;
    }
    
    command += ` disabled=no`;

    routerConfig["/interface sstp-client"].push(command);

    return CommandShortner(routerConfig);
}

// IKeV2 Utility Functions

export const IKeV2Profile = (config: Ike2ClientConfig, profileName: string): string => {
    const profileParams = [
        `name=${profileName}`,
        `enc-algorithm=${config.EncAlgorithm?.join(',') || 'aes-256,aes-192,aes-128'}`,
        `hash-algorithm=${config.HashAlgorithm?.join(',') || 'sha256,sha1'}`,
        `dh-group=${config.DhGroup?.join(',') || 'modp2048,modp1536'}`,
        `lifetime=${config.Lifetime || '8h'}`,
        `nat-traversal=${config.NatTraversal !== false ? 'yes' : 'no'}`
    ];
    
    if (config.DpdInterval) {
        profileParams.push(`dpd-interval=${config.DpdInterval}`);
    }
    
    return `add ${profileParams.join(' ')}`;
};

export const IKeV2Proposal = (config: Ike2ClientConfig, proposalName: string): string => {
    const phase2EncAlgorithms = config.EncAlgorithm?.map(alg => {
        switch (alg) {
            case 'aes-128': return 'aes-128-cbc';
            case 'aes-192': return 'aes-192-cbc';
            case 'aes-256': return 'aes-256-cbc';
            default: return alg;
        }
    }) || ['aes-256-cbc', 'aes-192-cbc', 'aes-128-cbc'];

    const proposalParams = [
        `name=${proposalName}`,
        `pfs-group=${config.PfsGroup || 'modp2048'}`,
        `enc-algorithms=${phase2EncAlgorithms.join(',')}`,
        `auth-algorithms=${config.HashAlgorithm?.join(',') || 'sha256,sha1'}`,
        `lifetime=${config.ProposalLifetime || '30m'}`
    ];
    
    return `add ${proposalParams.join(' ')}`;
};

export const IKeV2Peer = (config: Ike2ClientConfig, peerName: string, profileName: string): string => {
    const peerParams = [
        `name=${peerName}`,
        `address=${config.ServerAddress}`,
        `profile=${profileName}`,
        'exchange-mode=ike2'
    ];
    
    if (config.Port && config.Port !== 500) {
        peerParams.push(`port=${config.Port}`);
    }
    
    if (config.LocalAddress) {
        peerParams.push(`local-address=${config.LocalAddress}`);
    }
    
    peerParams.push(`send-initial-contact=${config.SendInitialContact !== false ? 'yes' : 'no'}`);
    
    return `add ${peerParams.join(' ')}`;
};

export const IKeV2Identity = (config: Ike2ClientConfig, peerName: string, modeConfigName: string, policyGroupName: string): string => {
    const identityParams = [`peer=${peerName}`, `auth-method=${config.AuthMethod}`];
    
    switch (config.AuthMethod) {
        case 'pre-shared-key':
            if (!config.PresharedKey) {
                throw new Error('PresharedKey is required when AuthMethod is pre-shared-key');
            }
            identityParams.push(`secret="${config.PresharedKey}"`);
            break;
            
        case 'eap':
            if (!config.Credentials) {
                throw new Error('Credentials are required when AuthMethod is eap');
            }
            
            identityParams.push(`eap-methods=${config.EapMethods?.join(',') || 'eap-mschapv2'}`);
            identityParams.push(`username="${config.Credentials.Username}"`);
            identityParams.push(`password="${config.Credentials.Password}"`);
            
            if (config.ClientCertificateName) {
                identityParams.push(`certificate=${config.ClientCertificateName}`);
            }
            break;
            
        case 'digital-signature':
            if (!config.ClientCertificateName) {
                throw new Error('ClientCertificateName is required when AuthMethod is digital-signature');
            }
            identityParams.push(`certificate=${config.ClientCertificateName}`);
            break;
    }
    
    // Add identity configuration parameters
    if (config.MyIdType && config.MyId) {
        identityParams.push(`my-id=${config.MyIdType}:${config.MyId}`);
    } else {
        identityParams.push('my-id=auto');
    }
    
    if (config.RemoteIdType && config.RemoteId) {
        identityParams.push(`remote-id=${config.RemoteIdType}:${config.RemoteId}`);
    } else {
        identityParams.push(`remote-id=fqdn:${config.ServerAddress}`);
    }
    
    if (config.EnableModeConfig !== false) {
        identityParams.push(`mode-config=${modeConfigName}`);
    }
    
    identityParams.push(`generate-policy=${config.GeneratePolicy || 'port-strict'}`);
    identityParams.push(`policy-template-group=${policyGroupName}`);
    
    return `add ${identityParams.join(' ')}`;
};

export const IKeV2Policy = (config: Ike2ClientConfig, policyGroupName: string, proposalName: string): string => {
    const policyParams = [
        `group=${policyGroupName}`,
        'template=yes',
        `src-address=${config.PolicySrcAddress || '0.0.0.0/0'}`,
        `dst-address=${config.PolicyDstAddress || '0.0.0.0/0'}`,
        `proposal=${proposalName}`,
        `action=${config.PolicyAction || 'encrypt'}`,
        `level=${config.PolicyLevel || 'require'}`
    ];
    
    return `add ${policyParams.join(' ')}`;
};

export const IKeV2ModeConfig = (config: Ike2ClientConfig, modeConfigName: string): string | null => {
    if (config.EnableModeConfig === false) {
        return null;
    }
    
    const modeConfigParams = [`name=${modeConfigName}`, 'responder=no'];
    
    if (config.SrcAddressList) {
        modeConfigParams.push(`src-address-list=${config.SrcAddressList}`);
    }
    
    if (config.ConnectionMark) {
        modeConfigParams.push(`connection-mark=${config.ConnectionMark}`);
    }
    
    return `add ${modeConfigParams.join(' ')}`;
};

// IKeV2 Client

export const IKeV2Client = (config: Ike2ClientConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/ip ipsec profile": [],
        "/ip ipsec proposal": [],
        "/ip ipsec peer": [],
        "/ip ipsec identity": [],
        "/ip ipsec policy": [],
        "/ip ipsec policy group": [],
        "/ip ipsec mode-config": [],
    };

    // Use provided names or defaults
    const profileName = config.ProfileName || 'ike2-profile';
    const peerName = config.PeerName || 'ike2-peer';
    const proposalName = config.ProposalName || 'ike2-proposal';
    const policyGroupName = config.PolicyGroupName || 'ike2-policies';
    const modeConfigName = config.ModeConfigName || 'ike2-modeconf';

    // Create IPsec Profile (Phase 1 parameters)
    routerConfig["/ip ipsec profile"].push(IKeV2Profile(config, profileName));

    // Create IPsec Proposal (Phase 2 parameters)
    routerConfig["/ip ipsec proposal"].push(IKeV2Proposal(config, proposalName));

    // Create Policy Group
    routerConfig["/ip ipsec policy group"].push(`add name=${policyGroupName}`);

    // Create Mode Config (for road warrior setups)
    const modeConfigCommand = IKeV2ModeConfig(config, modeConfigName);
    if (modeConfigCommand) {
        routerConfig["/ip ipsec mode-config"].push(modeConfigCommand);
    }

    // Create IPsec Peer
    routerConfig["/ip ipsec peer"].push(IKeV2Peer(config, peerName, profileName));

    // Create IPsec Identity
    routerConfig["/ip ipsec identity"].push(IKeV2Identity(config, peerName, modeConfigName, policyGroupName));

    // Create IPsec Policy Template
    routerConfig["/ip ipsec policy"].push(IKeV2Policy(config, policyGroupName, proposalName));

    return CommandShortner(routerConfig);
};

// VPN Client Wrapper

export const VPNClientWrapper = (vpnClient: VPNClient, DomesticLink: boolean): RouterConfig =>{
    const { Wireguard, OpenVPN, PPTP, L2TP, SSTP, IKeV2 } = vpnClient;

    let vpnConfig: RouterConfig = {};
    let interfaceName = "";
    let endpointAddress = "";
    let dns = "";

    if(Wireguard){
        vpnConfig = WireguardClient(Wireguard);
        interfaceName = "wireguard-client";
        endpointAddress = Wireguard.PeerEndpointAddress;
        dns = Wireguard.InterfaceDNS || "1.1.1.1";
    } else if(OpenVPN){
        vpnConfig = OpenVPNClient(OpenVPN);
        if (OpenVPN.Certificates) {
            const certScript = GenerateOpenVPNCertificateScript(OpenVPN);
            Object.keys(certScript).forEach(key => {
                if (vpnConfig[key]) {
                    vpnConfig[key] = [...vpnConfig[key], ...certScript[key]];
                } else {
                    vpnConfig[key] = certScript[key];
                }
            });
        }
        interfaceName = "ovpn-client";
        endpointAddress = OpenVPN.Server.Address;
        dns = "1.1.1.1";
    } else if(PPTP){
        vpnConfig = PPTPClient(PPTP);
        interfaceName = "pptp-client";
        endpointAddress = PPTP.ConnectTo;
        dns = "1.1.1.1";
    } else if(L2TP){
        vpnConfig = L2TPClient(L2TP);
        interfaceName = "l2tp-client";
        endpointAddress = L2TP.Server.Address;
        dns = "1.1.1.1";
    } else if(SSTP){
        vpnConfig = SSTPClient(SSTP);
        interfaceName = "sstp-client";
        endpointAddress = SSTP.Server.Address;
        dns = "1.1.1.1";
    } else if(IKeV2){
        vpnConfig = IKeV2Client(IKeV2);
        interfaceName = "ike2-client";
        endpointAddress = IKeV2.ServerAddress;
        dns = "1.1.1.1";
    }

    if (interfaceName && endpointAddress) {
        const baseConfig = BaseVPNConfig(interfaceName, endpointAddress, dns, DomesticLink);
        
        Object.keys(baseConfig).forEach(key => {
            if (vpnConfig[key]) {
                vpnConfig[key] = [...vpnConfig[key], ...baseConfig[key]];
            } else {
                vpnConfig[key] = baseConfig[key];
            }
        });

        // If DomesticLink is false, copy "/ip route" entries and change table to "main"
        // if (!DomesticLink && baseConfig["/ip route"]) {
        //     const mainTableRoutes = baseConfig["/ip route"].map(route => {
        //         // Change routing-table=to-VPN to routing-table=main
        //         return route.replace(/routing-table=to-VPN/g, 'routing-table=main');
        //     });
            
        //     // Add the modified routes to the existing routes
        //     if (vpnConfig["/ip route"]) {
        //         vpnConfig["/ip route"] = [...vpnConfig["/ip route"], ...mainTableRoutes];
        //     } else {
        //         vpnConfig["/ip route"] = mainTableRoutes;
        //     }
        // }
    }

    return vpnConfig;
}
