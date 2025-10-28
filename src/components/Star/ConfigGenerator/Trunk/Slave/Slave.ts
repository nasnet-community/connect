import type { 
    RouterModels, 
    WirelessConfig, 
    Subnets, 
    ExtraConfigState, 
    StarState,
} from "~/components/Star/StarContext";
import { 
    type RouterConfig,
    mergeMultipleConfigs,
    removeEmptyArrays,
    formatConfig,
    removeEmptyLines,
    createBridgesForNetworks,
    commentTrunkInterface,
    createVLANsOnTrunkInterface,
    addVLANsToBridges,
    createDHCPClientsOnBridges,
    SlaveExtraCG,
    addSlaveInterfacesToBridge,
    configureSlaveWireless,
    BaseDNSSettins,
    SlaveMDNS,
    // sortRouterConfig,
} from "~/components/Star/ConfigGenerator";



export const SlaveC = (
    slaveRouter: RouterModels,
    subnets?: Subnets,
    wirelessConfigs?: WirelessConfig[],
    extraConfig?: ExtraConfigState
): RouterConfig => {
    // Validate slave router
    if (slaveRouter.isMaster) {
        throw new Error("SlaveCG can only generate configuration for slave routers (isMaster must be false)");
    }

    // If slave has no trunk interface configured, return empty
    if (!slaveRouter.MasterSlaveInterface) {
        return {};
    }

    const trunkInterface = slaveRouter.MasterSlaveInterface;
    const configs: RouterConfig[] = [];

    // 1. Create bridges for all networks
    if (subnets) {
        configs.push(createBridgesForNetworks(subnets));
    }

    // 2. Comment the trunk interface
    configs.push(commentTrunkInterface(trunkInterface));

    // 3. Create VLANs on trunk interface
    if (subnets) {
        configs.push(createVLANsOnTrunkInterface(subnets, trunkInterface));
    }

    // 4. Add VLANs to their corresponding bridges
    if (subnets) {
        configs.push(addVLANsToBridges(subnets, trunkInterface));
    }

    // 5. Add available interfaces to bridge
    const slaveInterfaces = addSlaveInterfacesToBridge([slaveRouter], subnets);
    if (Object.keys(slaveInterfaces).length > 0) {
        configs.push(slaveInterfaces);
    }

    // 6. Configure wireless if WirelessConfig exists
    if (wirelessConfigs && wirelessConfigs.length > 0) {
        const wirelessConfig = configureSlaveWireless(
            wirelessConfigs,
            [slaveRouter],
            subnets
        );
        if (Object.keys(wirelessConfig).length > 0) {
            configs.push(wirelessConfig);
        }
    }

    // 7. Create DHCP clients on all bridges
    if (subnets) {
        configs.push(createDHCPClientsOnBridges(subnets));
    }

    // 8. Generate extra configuration (identity, services, scheduling, NTP, graphing, etc.)
    if (extraConfig) {
        configs.push(SlaveExtraCG(extraConfig));
    }

    // 9. Add base DNS settings
    configs.push(BaseDNSSettins());

    // 10. Add MDNS configuration for bridge interfaces
    if (subnets) {
        const mdnsConfig = SlaveMDNS(subnets);
        if (Object.keys(mdnsConfig).length > 0) {
            configs.push(mdnsConfig);
        }
    }

    // Filter out empty configs and merge
    const validConfigs = configs.filter(c => Object.keys(c).length > 0);
    return validConfigs.length === 0 ? {} : mergeMultipleConfigs(...validConfigs);
};



export const SlaveCG = (
    state: StarState,
    slaveRouter: RouterModels
): string => {
    // Extract parameters from state
    const subnets = state.LAN.Subnets;
    const wirelessConfigs = state.LAN.Wireless;
    const extraConfig = state.ExtraConfig;

    const config: RouterConfig = {
        "/disk": [],
        "/certificate settings": [],
        "/interface bridge": [],
        "/interface pptp-client": [],
        "/interface sstp-client": [],
        "/interface ovpn-client": [],
        "/interface l2tp-client": [],
        "/interface ethernet": [],
        
        "/interface veth": [],
        "/interface wireguard": [],
        "/interface wireguard peers": [],
        "/interface ipip": [],
        "/interface eoip": [],
        "/interface gre": [],
        "/interface vxlan": [],
        "/interface list": [],
        "/interface lte apn": [],
        "/interface lte": [],
        "/ip ipsec policy group": [],
        "/ip ipsec profile": [],
        "/ip ipsec peer": [],
        "/ip ipsec proposal": [],
        "/interface vlan": [],
        "/interface wifi security": [],
        "/interface wifi": [],
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
        "/user group": [],
        "/user": [],
        "/zerotier": [],
        "/zerotier interface": [],
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
        "/ip dns forwarders": [],
        "/ip dns static": [],
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
        "/ip smb shares": [],
        "/ip socks": [],
        "/ip socks users": [],
        "/ip ssh": [],
        "/ip upnp": [],
        "/ip upnp interfaces": [],
        "/ipv6 firewall filter": [],
        "/ppp secret": [],
        "/system clock": [],
        "/system identity": [],
        "/system logging action": [],
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
        "/tool sms": [],
    };

    try {
        // Generate configurations from each module
        const SlaveConfig = SlaveC(slaveRouter, subnets, wirelessConfigs, extraConfig);


        // Merge all configurations
        const finalConfig = mergeMultipleConfigs(
            config,
            SlaveConfig
        );

        // Sort mangle rules according to priority
        // const sortedConfig = sortRouterConfig(finalConfig, ["/ip firewall mangle"]);

        // Remove empty arrays
        const removedEmptyArrays = removeEmptyArrays(finalConfig);

        // Remove /ip dns static from slave configuration
        delete removedEmptyArrays["/ip dns static"];
        delete removedEmptyArrays["/interface list member"];


        const ELConfig = formatConfig(removedEmptyArrays);
        const formattedConfigEL = removeEmptyLines(ELConfig);
        return `\n\n:delay 30\n\n${formattedConfigEL}\n\n:delay 20\n\n/system reboot`;
    } catch (error) {
        console.error("Error generating config:", error);
        return "";
    }
};