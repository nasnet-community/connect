import type { VPNClientType, VPNClient, WANInterfaceType } from "~/components/Star/StarContext";
import {
    type RouterConfig,
    DNSForeward, 
    mergeMultipleConfigs,
    ScriptAndScheduler 
} from "~/components/Star/ConfigGenerator";

// Check if a string is a Fully Qualified Domain Name (FQDN) vs an IP address
export const isFQDN = (address: string): boolean => {
    // Regular expression to match IPv4 address
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    // Regular expression to match IPv6 address (simplified)
    const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;

    // If it matches an IP pattern, it's not an FQDN
    if (ipv4Regex.test(address) || ipv6Regex.test(address)) {
        return false;
    }

    // If it contains a dot and doesn't match IP pattern, likely an FQDN
    return address.includes('.');
};

export const GenerateVCInterfaceName = (Name: string, protocol: VPNClientType): string => {
    switch (protocol) {
        case "Wireguard":
            return `wireguard-client-${Name}`;
        case "OpenVPN":
            return `ovpn-client-${Name}`;
        case "PPTP":
            return `pptp-client-${Name}`;
        case "L2TP":
            return `l2tp-client-${Name}`;
        case "SSTP":
            return `sstp-client-${Name}`;
        case "IKeV2":
            return `ike2-client-${Name}`;
        default:
            return `vpn-client-${Name}`;
    }
}

export const RouteToVPN = ( InterfaceName: string, name: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ip route": [],
    };

    const tableName = `to-VPN-${name}`;
    const comment = `Route-to-VPN-${name}`;

    config["/ip route"].push(
        `add dst-address="0.0.0.0/0" gateway="${InterfaceName}" routing-table="${tableName}" scope=30 target-scope=10  comment="${comment}"`,
    );

    return config;
};

export const InterfaceList = (InterfaceName: string): RouterConfig => {
    const config: RouterConfig = {
        "/interface list member": [],
    };

    config["/interface list member"].push(
        `add interface="${InterfaceName}" list="WAN" comment="VPN-${InterfaceName}"`,
        `add interface="${InterfaceName}" list="VPN-WAN" comment="VPN-${InterfaceName}"`,
    );

    return config;
};

export const AddressListEntry = (Address: string, InterfaceName: string, name: string, WanInterface?: WANInterfaceType): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall address-list": [],
    };

    const wanInterfaceInfo = `${WanInterface?.WANType}-${WanInterface?.WANName}`

    config["/ip firewall address-list"].push(
        `add address="${Address}" list=VPNE comment="VPN-${name} Interface:${InterfaceName} WanInterface:${wanInterfaceInfo} Endpoint:${Address} - Endpoint for routing"`,
    );

    // If the address is a domain name (FQDN), create DNS forward entry through Foreign forwarder
    // This ensures VPN endpoint domains are resolved through domestic DNS servers
    if (isFQDN(Address)) {
        const dnsForward = DNSForeward(
            Address, 
            "Foreign", 
            true,
            `VPN Endpoint ${Address} - Route through Foreign DNS`
        );
        return mergeMultipleConfigs(config, dnsForward);
    }

    return config;
};

export const VPNEndpointMangle = (): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall mangle": [],
    };

    config["/ip firewall mangle"].push(
        `add action=mark-connection chain=output comment="VPN Endpoint" \\
        dst-address-list="VPNE" new-connection-mark="conn-VPNE" passthrough=yes`,
        `add action=mark-routing chain=output comment="VPN Endpoint" \\
        connection-mark="conn-VPNE" dst-address-list="VPNE" new-routing-mark="to-Foreign" passthrough=no`,
        `add action=mark-routing chain=output comment="VPN Endpoint" \\
        dst-address-list="VPNE" new-routing-mark="to-Foreign" passthrough=no`,
    );

    return config;
};

export const AddressList = (Address: string, InterfaceName: string, name: string, WanInterface?: WANInterfaceType): RouterConfig => {
    const addressConfig = AddressListEntry(Address, InterfaceName, name, WanInterface);
    const mangleConfig = VPNEndpointMangle();

    return {
        "/ip firewall address-list": addressConfig["/ip firewall address-list"],
        "/ip firewall mangle": mangleConfig["/ip firewall mangle"],
    };
};

export const IPAddress = ( InterfaceName: string, Address: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ip address": [],
    };

    config["/ip address"].push(
        `add address="${Address}" interface="${InterfaceName}" comment="VPN-${InterfaceName}"`,
    );

    return config;
};

// export const DNSVPN = (DNS: string, WANLinkType: WANLinkType): RouterConfig => {
//     const config: RouterConfig = {
//         "/ip firewall nat": [],
//     };

//     if (DomesticLink) {
//         config["/ip firewall nat"].push(
//             `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 \\
//             protocol=udp src-address-list=VPN-LAN to-addresses=${DNS}`,
//             `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 \\
//             protocol=tcp src-address-list=VPN-LAN to-addresses=${DNS}`,
//             `add action=dst-nat chain=dstnat comment="DNS Split" dst-port=53 \\
//             protocol=udp src-address-list=Split-LAN to-addresses=${DNS}`,
//             `add action=dst-nat chain=dstnat comment="DNS Split" dst-port=53 \\
//             protocol=tcp src-address-list=Split-LAN to-addresses=${DNS}`,
//         );
//     } else {
//         config["/ip firewall nat"].push(
//             `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 \\
//             protocol=udp src-address-list=VPN-LAN to-addresses=${DNS}`,
//             `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 \\
//             protocol=tcp src-address-list=VPN-LAN to-addresses=${DNS}`,
//         );
//     }

//     return config;
// };

export const BaseVPNConfig = ( InterfaceName: string, EndpointAddress: string, name: string, WanInterface?: WANInterfaceType): RouterConfig => {
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

    // const dnsConfig = DNSVPN(DNS, DomesticLink);
    // config["/ip firewall nat"].push(...dnsConfig["/ip firewall nat"]);

    const interfaceListConfig = InterfaceList(InterfaceName);
    config["/interface list member"].push(
        ...interfaceListConfig["/interface list member"],
    );

    const routeConfig = RouteToVPN(InterfaceName, name);
    config["/ip route"].push(...routeConfig["/ip route"]);

    const addressListConfig = AddressListEntry(EndpointAddress, InterfaceName, name, WanInterface);
    config["/ip firewall address-list"].push(
        ...addressListConfig["/ip firewall address-list"],
    );

    return config;
};

export const GetAllVPNInterfaceNames = (vpnClient: VPNClient): string[] => {
    const interfaceNames: string[] = [];
    
    // Process Wireguard configs
    if (vpnClient.Wireguard) {
        vpnClient.Wireguard.forEach(config => {
            interfaceNames.push(GenerateVCInterfaceName(config.Name, "Wireguard"));
        });
    }
    
    // Process OpenVPN configs
    if (vpnClient.OpenVPN) {
        vpnClient.OpenVPN.forEach(config => {
            interfaceNames.push(GenerateVCInterfaceName(config.Name, "OpenVPN"));
        });
    }
    
    // Process PPTP configs
    if (vpnClient.PPTP) {
        vpnClient.PPTP.forEach(config => {
            interfaceNames.push(GenerateVCInterfaceName(config.Name, "PPTP"));
        });
    }
    
    // Process L2TP configs
    if (vpnClient.L2TP) {
        vpnClient.L2TP.forEach(config => {
            interfaceNames.push(GenerateVCInterfaceName(config.Name, "L2TP"));
        });
    }
    
    // Process SSTP configs
    if (vpnClient.SSTP) {
        vpnClient.SSTP.forEach(config => {
            interfaceNames.push(GenerateVCInterfaceName(config.Name, "SSTP"));
        });
    }
    
    // Process IKeV2 configs
    if (vpnClient.IKeV2) {
        vpnClient.IKeV2.forEach(config => {
            interfaceNames.push(GenerateVCInterfaceName(config.Name, "IKeV2"));
        });
    }
    
    return interfaceNames;
};

export const GetVPNInterfaceName = (name: string, protocol: VPNClientType): string => {
    return GenerateVCInterfaceName(name, protocol);
};

export const VPNEScript = (): RouterConfig => {
    // Build the script content as an array of commands
    const scriptCommands: string[] = [
        "# ============================================================================",
        "# Script: VPNE Address List to Routing Rules Manager v6",
        "# Description: Links domain entries with their dynamic IP entries and creates",
        "#              routing rules using WanInterface from the parent domain entry",
        "# Version: 6.0 - Uses dynamic entries instead of DNS resolution",
        "# ============================================================================",
        "",
        "# Configuration variables",
        ':local addressListName "VPNE"',
        ':local scriptName "VPNE-Route-Manager"',
        ':local debugMode false',
        ':local quietMode false',
        ':local tablePrefix "to-"',
        "",
        "# Statistics counters",
        ":local totalProcessed 0",
        ":local rulesCreated 0",
        ":local rulesUpdated 0",
        ":local skipped 0",
        ":local dynamicProcessed 0",
        "",
        ":if (!$quietMode) do={",
        '    :log info "[$scriptName] ===== Starting VPNE routing rules update v6 ====="',
        "}",
        "",
        "# ============================================================================",
        "# Step 1: First pass - collect domain entries with WanInterface",
        "# ============================================================================",
        "",
        ':local domainMap [:toarray ""]',
        "",
        ":foreach entry in=[/ip firewall address-list find list=$addressListName dynamic=no] do={",
        "    # Get entry properties",
        "    :local addr [/ip firewall address-list get $entry address]",
        "    :local comment [/ip firewall address-list get $entry comment]",
        "    ",
        "    :if ($debugMode && !$quietMode) do={",
        '        :log debug "[$scriptName] Checking domain entry: $addr"',
        "    }",
        "    ",
        "    # Extract WanInterface from comment",
        '    :local wanInterface ""',
        '    :local wanStartPos [:find $comment "WanInterface:"]',
        "    ",
        '    :if ([:typeof $wanStartPos] != "nil") do={',
        "        :local wanValueStart ($wanStartPos + 13)",
        '        :local endpointMarkerPos [:find $comment " Endpoint:" $wanValueStart]',
        "        ",
        '        :if ([:typeof $endpointMarkerPos] != "nil") do={',
        "            :set wanInterface [:pick $comment $wanValueStart $endpointMarkerPos]",
        "        } else={",
        '            :local dashPos [:find $comment " -" $wanValueStart]',
        '            :if ([:typeof $dashPos] != "nil") do={',
        "                :set wanInterface [:pick $comment $wanValueStart $dashPos]",
        "            } else={",
        "                :set wanInterface [:pick $comment $wanValueStart]",
        "            }",
        "        }",
        "        ",
        "        :if ([:len $wanInterface] > 0) do={",
        "            # Extract endpoint from comment",
        "            :local endpoint $addr",
        '            :local endpointStartPos [:find $comment "Endpoint:"]',
        "            ",
        '            :if ([:typeof $endpointStartPos] != "nil") do={',
        "                :local endpointValueStart ($endpointStartPos + 9)",
        '                :local dashMarkerPos [:find $comment " -" $endpointValueStart]',
        "                ",
        '                :if ([:typeof $dashMarkerPos] != "nil") do={',
        "                    :set endpoint [:pick $comment $endpointValueStart $dashMarkerPos]",
        "                } else={",
        "                    :set endpoint [:pick $comment $endpointValueStart]",
        "                }",
        "            }",
        "            ",
        "            # Store domain with its WanInterface",
        "            :set ($domainMap->$addr) $wanInterface",
        "            ",
        "            :if (!$quietMode) do={",
        '                :log info "[$scriptName] Found domain $addr with WanInterface: $wanInterface"',
        "            }",
        "        }",
        "    }",
        "}",
        "",
        "# ============================================================================",
        "# Step 2: Process all entries (both static and dynamic)",
        "# ============================================================================",
        "",
        ":foreach entry in=[/ip firewall address-list find list=$addressListName] do={",
        "    :set totalProcessed ($totalProcessed + 1)",
        "    ",
        "    # Get entry properties",
        "    :local addr [/ip firewall address-list get $entry address]",
        "    :local comment [/ip firewall address-list get $entry comment]",
        "    :local dynamic [/ip firewall address-list get $entry dynamic]",
        "    ",
        "    :if ($debugMode && !$quietMode) do={",
        '        :log debug "[$scriptName] Processing entry: $addr (dynamic=$dynamic, comment=$comment)"',
        "    }",
        "    ",
        "    # Determine WanInterface and endpoint",
        '    :local wanInterface ""',
        '    :local endpoint ""',
        "    ",
        "    :if ($dynamic = true) do={",
        "        # For dynamic entries, the comment is usually the domain name",
        "        # Check if this domain exists in our domainMap",
        '        :if ([:typeof ($domainMap->$comment)] != "nil") do={',
        "            :set wanInterface ($domainMap->$comment)",
        "            :set endpoint $comment",
        "            :set dynamicProcessed ($dynamicProcessed + 1)",
        "            ",
        "            :if (!$quietMode) do={",
        '                :log info "[$scriptName] Dynamic entry $addr linked to domain $comment with WanInterface: $wanInterface"',
        "            }",
        "        } else={",
        "            :if ($debugMode && !$quietMode) do={",
        '                :log debug "[$scriptName] Dynamic entry $addr has no matching domain entry, skipping"',
        "            }",
        "            :set skipped ($skipped + 1)",
        "        }",
        "    } else={",
        "        # For static entries, extract WanInterface from comment",
        '        :local wanStartPos [:find $comment "WanInterface:"]',
        "        ",
        '        :if ([:typeof $wanStartPos] != "nil") do={',
        "            :local wanValueStart ($wanStartPos + 13)",
        '            :local endpointMarkerPos [:find $comment " Endpoint:" $wanValueStart]',
        "            ",
        '            :if ([:typeof $endpointMarkerPos] != "nil") do={',
        "                :set wanInterface [:pick $comment $wanValueStart $endpointMarkerPos]",
        "            } else={",
        '                :local dashPos [:find $comment " -" $wanValueStart]',
        '                :if ([:typeof $dashPos] != "nil") do={',
        "                    :set wanInterface [:pick $comment $wanValueStart $dashPos]",
        "                } else={",
        "                    :set wanInterface [:pick $comment $wanValueStart]",
        "                }",
        "            }",
        "            ",
        "            # Extract endpoint",
        '            :local endpointStartPos [:find $comment "Endpoint:"]',
        '            :if ([:typeof $endpointStartPos] != "nil") do={',
        "                :local endpointValueStart ($endpointStartPos + 9)",
        '                :local dashMarkerPos [:find $comment " -" $endpointValueStart]',
        "                ",
        '                :if ([:typeof $dashMarkerPos] != "nil") do={',
        "                    :set endpoint [:pick $comment $endpointValueStart $dashMarkerPos]",
        "                } else={",
        "                    :set endpoint [:pick $comment $endpointValueStart]",
        "                }",
        "            } else={",
        "                :set endpoint $addr",
        "            }",
        "        }",
        "        ",
        "        # Check if this is an IP address (not a domain)",
        "        :local isIP false",
        "        :do {",
        "            :local testIP [:toip $addr]",
        "            :set isIP true",
        "        } on-error={",
        "            :set isIP false",
        "        }",
        "        ",
        "        # Only process static entries if they are IP addresses",
        "        :if (!$isIP) do={",
        "            :if ($debugMode && !$quietMode) do={",
        '                :log debug "[$scriptName] Skipping non-IP static entry: $addr (waiting for dynamic entries)"',
        "            }",
        '            :set wanInterface ""',
        "        }",
        "    }",
        "    ",
        "    # ========================================================================",
        "    ",
        "    :if ([:len $wanInterface] > 0) do={",
        "        # Verify this is a valid IP address",
        "        :local isValidIP false",
        "        :do {",
        "            :local testIP [:toip $addr]",
        "            :set isValidIP true",
        "        } on-error={",
        "            :set isValidIP false",
        "        }",
        "        ",
        "        :if ($isValidIP) do={",
        "            # Build routing table name",
        "            :local routingTable ($tablePrefix . $wanInterface)",
        "            ",
        "            :if ($debugMode && !$quietMode) do={",
        '                :log debug "[$scriptName] Using routing table: $routingTable for IP: $addr"',
        "            }",
        "            ",
        "            # Check if routing table exists",
        "            :local tableExists false",
        "            :do {",
        "                :local testTable [/routing table find name=$routingTable]",
        "                :if ([:len $testTable] > 0) do={",
        "                    :set tableExists true",
        "                }",
        "            } on-error={",
        "                :set tableExists false",
        "            }",
        "            ",
        "            :if (!$tableExists) do={",
        "                :if (!$quietMode) do={",
        '                    :log error "[$scriptName] Routing table \'$routingTable\' does not exist, skipping $addr"',
        "                }",
        "                :set skipped ($skipped + 1)",
        "            } else={",
        "                # Build destination address WITHOUT /32 mask",
        "                :local dstAddress $addr",
        '                :local ruleComment "VPNE-Resolved: $endpoint"',
        "                ",
        "                :if ($debugMode && !$quietMode) do={",
        '                    :log debug "[$scriptName] Preparing rule: dst=$dstAddress table=$routingTable"',
        "                }",
        "                ",
        "                # Check if routing rule already exists",
        "                :local existingRule [/routing rule find dst-address=$dstAddress table=$routingTable]",
        "                ",
        "                :if ([:len $existingRule] > 0) do={",
        "                    # ========================================================",
        "                    # Rule exists - verify configuration",
        "                    # ========================================================",
        "                    ",
        "                    :local ruleID [:pick $existingRule 0]",
        "                    :local currentAction [/routing rule get $ruleID action]",
        "                    :local currentDisabled [/routing rule get $ruleID disabled]",
        "                    :local currentComment [/routing rule get $ruleID comment]",
        "                    ",
        "                    :local needsUpdate false",
        "                    ",
        '                    :if ($currentAction != "lookup-only-in-table") do={',
        "                        :set needsUpdate true",
        "                    }",
        "                    :if ($currentDisabled = true) do={",
        "                        :set needsUpdate true",
        "                    }",
        "                    :if ($currentComment != $ruleComment) do={",
        "                        :set needsUpdate true",
        "                    }",
        "                    ",
        "                    :if ($needsUpdate) do={",
        "                        :do {",
        "                            /routing rule set $ruleID \\",
        "                                action=lookup-only-in-table \\",
        "                                disabled=no \\",
        "                                comment=$ruleComment",
        "                            ",
        "                            :if (!$quietMode) do={",
        '                                :log info "[$scriptName] Updated routing rule for $dstAddress in table $routingTable"',
        "                            }",
        "                            :set rulesUpdated ($rulesUpdated + 1)",
        "                        } on-error={",
        "                            :if (!$quietMode) do={",
        '                                :log error "[$scriptName] Failed to update routing rule for $dstAddress"',
        "                            }",
        "                        }",
        "                    } else={",
        "                        :if ($debugMode && !$quietMode) do={",
        '                            :log debug "[$scriptName] Routing rule for $dstAddress in table $routingTable already correct"',
        "                        }",
        "                    }",
        "                    ",
        "                } else={",
        "                    # ========================================================",
        "                    # Rule doesn't exist - create new one",
        "                    # ========================================================",
        "                    ",
        "                    :do {",
        "                        /routing rule add \\",
        "                            dst-address=$dstAddress \\",
        "                            action=lookup-only-in-table \\",
        "                            table=$routingTable \\",
        "                            disabled=no \\",
        "                            comment=$ruleComment",
        "                        ",
        "                        :if (!$quietMode) do={",
        '                            :log info "[$scriptName] Created routing rule: dst=$dstAddress table=$routingTable"',
        "                        }",
        "                        :set rulesCreated ($rulesCreated + 1)",
        "                    } on-error={",
        "                        :if (!$quietMode) do={",
        '                            :log error "[$scriptName] Failed to create routing rule for $dstAddress in table $routingTable"',
        "                        }",
        "                    }",
        "                }",
        "            }",
        "        } else={",
        "            :if ($debugMode && !$quietMode) do={",
        '                :log debug "[$scriptName] Skipping non-IP address: $addr"',
        "            }",
        "        }",
        "    }",
        "}",
        "",
        "# ============================================================================",
        "# Step 4: Clean up orphaned routing rules",
        "# ============================================================================",
        "",
        ":local orphansRemoved 0",
        "",
        ':foreach rule in=[/routing rule find comment~"VPNE-Resolved:"] do={',
        "    :local ruleDst [/routing rule get $rule dst-address]",
        "    :local ruleComment [/routing rule get $rule comment]",
        "    ",
        "    # The IP is now stored without /32",
        "    :local ruleIP $ruleDst",
        "    ",
        "    # Check if this IP exists in current address list",
        "    :local found false",
        "    :foreach entry in=[/ip firewall address-list find list=$addressListName] do={",
        "        :local entryAddr [/ip firewall address-list get $entry address]",
        "        :if ($entryAddr = $ruleIP) do={",
        "            :set found true",
        "        }",
        "    }",
        "    ",
        "    :if (!$found) do={",
        "        :do {",
        "            /routing rule remove $rule",
        "            :set orphansRemoved ($orphansRemoved + 1)",
        "            :if (!$quietMode) do={",
        '                :log info "[$scriptName] Removed orphaned routing rule for $ruleDst"',
        "            }",
        "        } on-error={",
        "            :if (!$quietMode) do={",
        '                :log warning "[$scriptName] Failed to remove orphaned rule for $ruleDst"',
        "            }",
        "        }",
        "    }",
        "}",
        "",
        "# ============================================================================",
        "# Final Statistics and Logging",
        "# ============================================================================",
        "",
        ":if (!$quietMode) do={",
        '    :log info "[$scriptName] ===== VPNE routing rules update completed ====="',
        '    :log info "[$scriptName] Statistics: Total=$totalProcessed Created=$rulesCreated Updated=$rulesUpdated"',
        '    :log info "[$scriptName] Dynamic entries processed: $dynamicProcessed"',
        '    :log info "[$scriptName] Orphans removed: $orphansRemoved Skipped=$skipped"',
        "}",
        "",
        "# End of script",
    ];

    // Create the RouterConfig with the script content
    const scriptContent: RouterConfig = {
        "": scriptCommands,
    };

    // Use ScriptAndScheduler to create a scheduled script
    return ScriptAndScheduler({
        ScriptContent: scriptContent,
        Name: "VPNE-Routing-Manager",
        interval: "1m",
        startTime: "startup",
    });
};