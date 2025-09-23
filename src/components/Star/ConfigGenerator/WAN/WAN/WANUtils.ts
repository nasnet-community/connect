import type { RouterConfig } from "../../ConfigGenerator"
import { StationMode } from "../../LAN/Wireless/WirelessUtil"



// MACVLAN
export const MACVLAN = (
    name: string,
    interfaceName: string,
    macAddress?: string,
):RouterConfig =>{
    const config: RouterConfig = {
        "/interface macvlan": [],
    }

    const parts = [
        "add",
        `name="MacVLAN-${interfaceName}-${name}"`,
        `comment="MacVLAN-${interfaceName}-${name}"`,
        `interface=${interfaceName}`,
        "mode=private"
    ]

    if (macAddress) {
        parts.push(`mac-address=${macAddress}`)
    }

    config["/interface macvlan"].push(parts.join(" "))

    return config
}

// VLAN
export const VLAN = (
    name: string,
    interfaceName: string,
    vlanId: number,
):RouterConfig =>{
    const config: RouterConfig = {
        "/interface vlan": [],
    }
    config["/interface vlan"].push(
        `add name="VLAN${vlanId}-${interfaceName}-${name}" comment="VLAN${vlanId}-${interfaceName}-${name}" interface=${interfaceName} vlan-id=${vlanId}`,
    )


    return config
}

// VLANOnMACVLAN
export const VLANOnMACVLAN = (
    name: string,
    interfaceName: string,
    macAddress: string,
    vlanId: number,
):RouterConfig =>{
    // First create MACVLAN interface
    const macvlanConfig = MACVLAN(name, interfaceName, macAddress)
    
    // Get the MACVLAN interface name that was created
    const macvlanInterfaceName = `MacVLAN-${interfaceName}-${name}`
    
    // Create VLAN on top of the MACVLAN interface
    const vlanConfig = VLAN(name, macvlanInterfaceName, vlanId)
    
    // Merge the configurations
    const config: RouterConfig = {
        "/interface macvlan": [...macvlanConfig["/interface macvlan"]],
        "/interface vlan": [...vlanConfig["/interface vlan"]],
    }

    return config
}

// WirelessWAN
export const WirelessWAN = (
    SSID: string,
    password: string,
    band: string,
    name?: string,
):RouterConfig =>{
    // Use StationMode function to configure wireless interface for WAN connection
    const stationConfig = StationMode(SSID, password, band, name)
    
    return stationConfig
}

// LTE
export const LTE = ():RouterConfig =>{
    const config: RouterConfig = {

    }

    return config
}


// DHCPClient
export const DHCPClient = (
    name: string,
    Network: string,
    Interface: string,
):RouterConfig =>{
    const config: RouterConfig = {
        "/ip dhcp-client": [],
    }

    config["/ip dhcp-client"].push(
        `add add-default-route=no comment="${name} to ${Network}" interface=${Interface} script=":if (\\$bound=1) do={\\r\\
            \\n:local gw \\$\\"gateway-address\\"\\r\\
            \\n/ip route set [ find comment=\\"Route-to-${Network}\\" gateway!=\\$gw ] gateway=\\$gw\\r\\
            \\n}" use-peer-dns=no use-peer-ntp=no`,
      );

    return config
}


// PPPOEClient
export const PPPOEClient = (
    name: string,
    interfaceName: string,
    username: string,
    password: string,
):RouterConfig =>{
    const config: RouterConfig = {
        "/interface pppoe-client": [],
    }

    config["/interface pppoe-client"].push(
        `add name="pppoe-client-${name}" comment="PPPoE client for ${name}" interface=${interfaceName} user=${username} \\
        password=${password} dial-on-demand=yes add-default-route=no allow=chap,pap,mschap1,mschap2 disabled=no`
    )

    return config
}

export function calculateCIDR(subnet: string): number {
    const subnetParts = subnet.split(".").map(Number)
    let cidr = 0
    
    for (let i = 0; i < 4; i++) {
        const octet = subnetParts[i]
        if (octet === 255) {
            cidr += 8
        } else if (octet === 0) {
            break
        } else {
            // Convert octet to binary and count consecutive 1s from left
            let temp = octet
            while (temp & 0x80) { // Check if leftmost bit is 1
                cidr++
                temp <<= 1
            }
            break
        }
    }
    
    return cidr
}

// StaticIP
export const StaticIP = (
    name: string,
    interfaceName: string,
    ipAddress: string,
    subnet: string,
    // gateway?: string,
):RouterConfig =>{
    const config: RouterConfig = {
        "/ip address": [],
    }

    const cidr = calculateCIDR(subnet)

    config["/ip address"].push(
        `add address=${ipAddress}/${cidr} interface=${interfaceName} comment="${name}"`
    )

    return config
}


export function DHCPClientGetway():RouterConfig  {
    const config:RouterConfig = {

    }

    return config
}


export function PPPOEClientGetway():RouterConfig  {
    const config:RouterConfig = {

    }

    return config
}


export function StaticIPGetway():RouterConfig  {
    const config:RouterConfig = {

    }

    return config
}



































