import type { 
    StarState,
    LTE,
    Subnets,
} from "~/components/Star/StarContext";
import { 
    ChooseCG,
    WANCG,
    LANCG,
    ExtraCG,
    ShowCG,
    mergeMultipleConfigs,
    removeEmptyArrays,
    removeEmptyLines,
    formatConfig,
    sortRouterConfig,
    MasterCG,
} from "~/components/Star/ConfigGenerator/";


export interface RouterConfig {
    [key: string]: string[];
}


export const ConfigGenerator = (state: StarState): string => {
    const config: RouterConfig = {
        "/disk": [],
        "/system script": [],
        "/certificate settings": [],
        "/interface wifi security": [],
        "/interface wifi": [],
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
        "/routing rule": [],
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
        const chooseConfig = ChooseCG();
        
        // Extract available LTE interfaces from RouterModels
        const availableLTEInterfaces: LTE[] = [];
        state.Choose.RouterModels.forEach(routerModel => {
            if (routerModel.Interfaces.Interfaces.lte) {
                availableLTEInterfaces.push(...routerModel.Interfaces.Interfaces.lte);
            }
        });
        
        const wanConfig = WANCG(state.WAN, state.Choose.Networks, state.LAN.Subnets, availableLTEInterfaces, state.Choose.RouterModels, state.ExtraConfig.services);
        const lanConfig = LANCG(state);
        const extraConfig = ExtraCG(
            state.ExtraConfig,
            state.Choose.WANLinkType,
            state.LAN.Subnets,
            state.WAN.WANLink,
            state.WAN.VPNClient,
            state.Choose.Networks,
            state.Choose.RouterModels,
            state.LAN.VPNServer
        );
        const showConfig = ShowCG(state);

        // Generate Master/Trunk configuration if in Trunk Mode
        const masterConfig = MasterCG(state.Choose, state.LAN.Subnets || {} as Subnets, state.LAN.Wireless);

        // Merge all configurations
        const finalConfig = mergeMultipleConfigs(
            config,
            chooseConfig,
            wanConfig,
            lanConfig,
            extraConfig,
            showConfig,
            masterConfig,
        );

        // Sort mangle rules according to priority
        const sortedConfig = sortRouterConfig(finalConfig, ["/ip firewall mangle"]);

        // Remove empty arrays
        const removedEmptyArrays = removeEmptyArrays(sortedConfig);

        const ELConfig = formatConfig(removedEmptyArrays);
        const formattedConfigEL = removeEmptyLines(ELConfig);
        return `\n\n:delay 30 \n\n ${formattedConfigEL} \n\n:delay 20 \n\n/system reboot`;
    } catch (error) {
        console.error("Error generating config:", error);
        return "";
    }
};
