import type { WireguardInterfaceConfig, VSCredentials, WireguardServerConfig, SubnetConfig } from "~/components/Star/StarContext";
import { 
    CommandShortner, 
    mergeRouterConfigs, 
    calculateNetworkAddress, 
    OneTimeScript, 
    type RouterConfig, 
    VSInterfaceList, 
    VSAddressList,
} from "~/components/Star/ConfigGenerator";


export const ExportWireGuard = (): RouterConfig => {
    // Create simplified WireGuard export script following RouterOS best practices
    const scriptContent: RouterConfig = {
        "": [
            `:delay 130s;`,
            "# ===========================================",
            "# WireGuard Client Configuration Export",
            "# ===========================================",
            "# Simplified script using RouterOS native commands",
            "# Following MikroTik documentation best practices",
            "",
            ':put "[INFO] Starting WireGuard client configuration export"',
            "",
            "# Declare local variables (RouterOS best practice)",
            ":local configCount 0",
            ':local endpointAddress ""',
            "",
            "# Step 1: Determine server endpoint",
            ':put "[STEP] Detecting server endpoint..."',
            ':log info "WireGuard Export: Starting endpoint detection"',
            ":do {",
            "    :local ddnsName [/ip cloud get dns-name]",
            "    :if ([:len $ddnsName] > 0) do={",
            "        :set endpointAddress $ddnsName",
            '        :put "[OK] Using DDNS: $endpointAddress"',
            '        :log info "WireGuard Export: DDNS endpoint detected: $endpointAddress"',
            "    } else={",
            '        :log info "WireGuard Export: DDNS not available, checking WAN interfaces"',
            "        # Fallback to WAN interface IP detection",
            '        :local wanInterfaces [/interface list member find list="WAN"]',
            "        :if ([:len $wanInterfaces] > 0) do={",
            "            :local wanInt [/interface list member get [:pick $wanInterfaces 0] interface]",
            '            :log info "WireGuard Export: Checking WAN interface: $wanInt"',
            "            :local wanAddresses [/ip address find interface=$wanInt]",
            "            :if ([:len $wanAddresses] > 0) do={",
            "                :local wanAddr [/ip address get [:pick $wanAddresses 0] address]",
            '                :set endpointAddress [:pick $wanAddr 0 [:find $wanAddr "/"]]',
            '                :put "[OK] Using WAN IP: $endpointAddress"',
            '                :log info "WireGuard Export: WAN IP endpoint detected: $endpointAddress"',
            "            } else={",
            '                :set endpointAddress "YOUR_PUBLIC_IP_HERE"',
            '                :put "[WARNING] No IP found on WAN interface - using placeholder"',
            '                :log warning "WireGuard Export: No IP address found on WAN interface $wanInt"',
            "            }",
            "        } else={",
            '            :set endpointAddress "YOUR_PUBLIC_IP_HERE"',
            '            :put "[WARNING] No WAN interface found - using placeholder"',
            '            :log warning "WireGuard Export: No WAN interfaces found in interface list"',
            "        }",
            "    }",
            "} on-error={",
            '    :set endpointAddress "YOUR_PUBLIC_IP_HERE"',
            '    :put "[WARNING] Endpoint detection failed - using placeholder"',
            '    :log error "WireGuard Export: Endpoint detection failed with error"',
            "}",
            "",
            "# Step 2: Find WireGuard peers on server interfaces",
            ':put "[STEP] Discovering WireGuard peers on server interfaces..."',
            ":log info \"WireGuard Export: Searching for WireGuard peers on interfaces containing 'server' or 'Server'\"",
            ":local allPeers [/interface wireguard peers find]",
            ":local serverPeers",
            "",
            "# Filter peers whose interface contains 'server' or 'Server' in the name",
            "# Exclude interfaces containing 'client' or 'Client'",
            ":foreach peerId in=$allPeers do={",
            "    :local peerInterface [/interface wireguard peers get $peerId interface]",
            "    :local interfaceName [:tostr $peerInterface]",
            '    :put "[DEBUG] Checking interface: $interfaceName"',
            '    :log info "WireGuard Export: Checking interface: $interfaceName"',
            "    ",
            "    # Check if interface contains 'server' or 'Server' AND does not contain 'client' or 'Client'",
            '    :local hasServer (([:find $interfaceName "server"] >= 0) || ([:find $interfaceName "Server"] >= 0))',
            '    :local hasClient (([:find $interfaceName "client"] >= 0) || ([:find $interfaceName "Client"] >= 0))',
            "    ",
            "    :if ($hasServer && !$hasClient) do={",
            '        :if ([:typeof $serverPeers] = "nothing") do={',
            "            :set serverPeers {$peerId}",
            "        } else={",
            "            :set serverPeers ($serverPeers , $peerId)",
            "        }",
            "        :put \"[INCLUDE] Interface $interfaceName contains 'server' and does not contain 'client'\"",
            '        :log info "WireGuard Export: Found peer on server interface: $interfaceName"',
            "    } else={",
            '        :put "[EXCLUDE] Interface $interfaceName - hasServer: $hasServer, hasClient: $hasClient"',
            '        :log info "WireGuard Export: Skipping interface $interfaceName - not a server interface"',
            "    }",
            "}",
            "",
            ":if ([:len $serverPeers] = 0) do={",
            '    :put "[ERROR] No peers found on WireGuard server interfaces"',
            '    :put "[INFO] Requirements for server interfaces:"',
            "    :put \"[INFO] - Interface name must contain 'server' or 'Server'\"",
            "    :put \"[INFO] - Interface name must NOT contain 'client' or 'Client'\"",
            '    :put "[INFO] Example valid names: wireguard-server, wg-server1, MyServer"',
            '    :put "[INFO] Example invalid names: wireguard-client, client-server, wg-client"',
            '    :log error "WireGuard Export: No peers found on valid server interfaces"',
            '    :error "No peers configured on WireGuard server interfaces"',
            "}",
            "",
            ':put "[OK] Found $[:len $serverPeers] peer(s) on WireGuard server interface(s)"',
            ':log info "WireGuard Export: Found $[:len $serverPeers] peer(s) on WireGuard server interface(s)"',
            "",
            "# Step 3: Export client configurations for server peers",
            ":foreach peerId in=$serverPeers do={",
            "    :do {",
            "        :local peerInterface [/interface wireguard peers get $peerId interface]",
            "        :local interfaceName [:tostr $peerInterface]",
            "        :local listenPort [/interface wireguard get [find name=$interfaceName] listen-port]",
            "        :local peerConfig [/interface wireguard peers get $peerId]",
            '        :local peerName ""',
            "        ",
            "        # Try to get peer name (not comment) - use peer ID as fallback",
            "        :do {",
            "            :set peerName [/interface wireguard peers get $peerId name]",
            "        } on-error={",
            '            :set peerName ("peer-" . $peerId)',
            "        }",
            "        ",
            "        # If peer name is empty or default, use peer ID",
            '        :if ([:len $peerName] = 0 || $peerName = "") do={',
            '            :set peerName ("peer-" . $peerId)',
            "        }",
            "        ",
            '        :put "[PROCESS] Peer on interface: $interfaceName (port: $listenPort)"',
            '        :log info "WireGuard Export: Processing peer on interface $interfaceName port $listenPort"',
            "        ",
            '        :put "[EXPORT] Peer: $peerName (ID: $peerId)"',
            '        :log info "WireGuard Export: Exporting configuration for peer: $peerName"',
            "        ",
            "        # Update endpoint for client config (don't add port - WireGuard will use interface listen-port)",
            '        /interface wireguard peers set $peerId client-endpoint="$endpointAddress"',
            '        :log info "WireGuard Export: Set client endpoint to $endpointAddress for peer $peerName"',
            "        ",
            "        # Validate peer configuration before generating client config",
            "        :local peerPublicKey [/interface wireguard peers get $peerId public-key]",
            "        :local peerAllowedAddress [/interface wireguard peers get $peerId allowed-address]",
            "        :local interfacePrivateKey [/interface wireguard get [find name=$interfaceName] private-key]",
            "        ",
            '        :put "[VALIDATE] Peer $peerName validation:"',
            '        :put "[VALIDATE] - Public Key: $[:len $peerPublicKey] chars"',
            '        :put "[VALIDATE] - Allowed Address: $peerAllowedAddress"',
            '        :put "[VALIDATE] - Interface Private Key: $[:len $interfacePrivateKey] chars"',
            "        ",
            "        # Enhanced validation with detailed diagnostics",
            "        :local configComplete true",
            '        :local missingItems ""',
            "        ",
            "        :if ([:len $peerPublicKey] = 0) do={",
            '            :put "[ERROR] Peer $peerName missing public key"',
            '            :log error "WireGuard Export: Peer $peerName has no public key configured"',
            "            :set configComplete false",
            '            :set missingItems ($missingItems . "public-key ")',
            "        }",
            "        :if ([:len $peerAllowedAddress] = 0) do={",
            '            :put "[ERROR] Peer $peerName missing allowed-address"',
            '            :log error "WireGuard Export: Peer $peerName has no allowed-address configured"',
            "            :set configComplete false",
            '            :set missingItems ($missingItems . "allowed-address ")',
            "        }",
            "        :if ([:len $interfacePrivateKey] = 0) do={",
            '            :put "[ERROR] Interface $interfaceName missing private key"',
            '            :log error "WireGuard Export: Interface $interfaceName has no private key configured"',
            "            :set configComplete false",
            '            :set missingItems ($missingItems . "interface-private-key ")',
            "        }",
            "        ",
            "        # Additional validation for peer state",
            "        :local peerDisabled [/interface wireguard peers get $peerId disabled]",
            "        :if ($peerDisabled) do={",
            '            :put "[WARNING] Peer $peerName is disabled - configuration may not work"',
            '            :log warning "WireGuard Export: Peer $peerName is disabled"',
            "        }",
            "        ",
            "        # Show current peer configuration for debugging when incomplete",
            "        :if (!$configComplete) do={",
            '            :put "[DEBUG] Missing items for peer $peerName: $missingItems"',
            '            :put "[DEBUG] Current peer $peerName configuration:"',
            "            :do {",
            '                :put "[DEBUG] Peer details:"',
            "                /interface wireguard peers print detail where .id=$peerId",
            "            } on-error={",
            '                :put "[DEBUG] Could not display peer details"',
            "            }",
            '            :put "[DEBUG] Current interface $interfaceName configuration:"',
            "            :do {",
            '                :put "[DEBUG] Interface details:"',
            "                /interface wireguard print detail where name=$interfaceName",
            "            } on-error={",
            '                :put "[DEBUG] Could not display interface details"',
            "            }",
            "        }",
            "        ",
            '        :local clientConfig ""',
            "        ",
            "        :if ($configComplete) do={",
            "            # Generate client configuration using file export method",
            "            # This avoids issues with structured output parsing",
            "            :do {",
            '                :put "[GENERATE] Exporting config to file for peer $peerName..."',
            "                ",
            "                # Create temporary filename for export",
            '                :local tempFileName ("temp-" . $peerName . "-config.txt")',
            "                ",
            "                # Export to file first (this always works reliably)",
            "                /interface wireguard peers show-client-config $peerId file=$tempFileName",
            "                ",
            "                # Small delay to ensure file is written",
            "                :delay 500ms",
            "                ",
            "                # Read the file content",
            "                :do {",
            "                    :set clientConfig [/file get [/file find name=$tempFileName] contents]",
            '                    :put "[DEBUG] Successfully read temp file: $tempFileName"',
            '                    :put "[DEBUG] Raw file content length: $[:len $clientConfig]"',
            "                    ",
            "                    # Clean up temporary file",
            "                    /file remove [/file find name=$tempFileName]",
            "                    ",
            "                } on-error={",
            '                    :put "[ERROR] Failed to read temporary config file: $tempFileName"',
            '                    :set clientConfig ""',
            "                    # Try to clean up temp file anyway",
            "                    :do {",
            "                        /file remove [/file find name=$tempFileName]",
            "                    } on-error={",
            "                        # Ignore cleanup errors",
            "                    }",
            "                }",
            "                ",
            "                # Process the configuration content",
            "                :if ([:len $clientConfig] > 0) do={",
            "                    # Convert to string if needed",
            '                    :if ([:typeof $clientConfig] != "str") do={',
            "                        :set clientConfig [:tostr $clientConfig]",
            "                    }",
            "                    ",
            "                    # Remove QR code section if present",
            "                    # Look for common QR code markers",
            '                    :local qrMarkers {"qr:"; "####"; "#######"; "#########"}',
            "                    :foreach marker in=$qrMarkers do={",
            "                        :local qrStart [:find $clientConfig $marker]",
            "                        :if ($qrStart >= 0) do={",
            "                            :set clientConfig [:pick $clientConfig 0 $qrStart]",
            '                            :put "[DEBUG] Removed QR section starting with: $marker"',
            "                        }",
            "                    }",
            "                    ",
            "                    # Clean up whitespace",
            '                    :while ([:len $clientConfig] > 0 && ([:pick $clientConfig ([:len $clientConfig] - 1) [:len $clientConfig]] = "\\n" || [:pick $clientConfig ([:len $clientConfig] - 1) [:len $clientConfig]] = "\\r" || [:pick $clientConfig ([:len $clientConfig] - 1) [:len $clientConfig]] = " " || [:pick $clientConfig ([:len $clientConfig] - 1) [:len $clientConfig]] = "\\t")) do={',
            "                        :set clientConfig [:pick $clientConfig 0 ([:len $clientConfig] - 1)]",
            "                    }",
            '                    :while ([:len $clientConfig] > 0 && ([:pick $clientConfig 0 1] = "\\n" || [:pick $clientConfig 0 1] = "\\r" || [:pick $clientConfig 0 1] = " " || [:pick $clientConfig 0 1] = "\\t")) do={',
            "                        :set clientConfig [:pick $clientConfig 1 [:len $clientConfig]]",
            "                    }",
            "                    ",
            '                    :put "[DEBUG] Processed config length: $[:len $clientConfig]"',
            "                    :if ([:len $clientConfig] > 100) do={",
            '                        :put "[DEBUG] Config preview: $[:pick $clientConfig 0 100]..."',
            "                    } else={",
            '                        :put "[DEBUG] Full config: $clientConfig"',
            "                    }",
            "                } else={",
            '                    :put "[ERROR] Empty configuration content from file"',
            "                }",
            "                ",
            '                :log info "WireGuard Export: Generated client config for peer $peerName (length: $[:len $clientConfig])"',
            "            } on-error={",
            '                :put "[ERROR] Failed to export config for peer $peerName"',
            '                :log error "WireGuard Export: Config export failed for peer $peerName"',
            '                :set clientConfig ""',
            "            }",
            "        } else={",
            '            :put "[SKIP] Peer $peerName configuration incomplete - cannot generate client config"',
            '            :put "[SKIP] Missing configuration items: $missingItems"',
            '            :log warning "WireGuard Export: Skipping peer $peerName due to incomplete configuration - missing: $missingItems"',
            "        }",
            "        ",
            "        # Create clean filename using peer name (peerName.conf)",
            '        :local fileName ($peerName . ".conf")',
            "        ",
            "        # Advanced filename sanitization - remove/replace invalid characters",
            '        :while ([:find $fileName " "] >= 0) do={',
            '            :local pos [:find $fileName " "]',
            '            :set fileName ([:pick $fileName 0 $pos] . "_" . [:pick $fileName ($pos + 1) [:len $fileName]])',
            "        }",
            "        # Remove other problematic characters for file names",
            '        :local invalidChars {"<"; ">"; ":"; "\\\\"; "/"; "|"; "?"; "*"; "\\""}',
            "        :foreach char in=$invalidChars do={",
            "            :while ([:find $fileName $char] >= 0) do={",
            "                :local pos [:find $fileName $char]",
            '                :set fileName ([:pick $fileName 0 $pos] . "_" . [:pick $fileName ($pos + 1) [:len $fileName]])',
            "            }",
            "        }",
            "        ",
            "        # Verify we have content before creating file",
            "        :if ([:len $clientConfig] = 0) do={",
            '            :put "[ERROR] No configuration content generated for peer $peerName"',
            '            :log error "WireGuard Export: Empty configuration for peer $peerName"',
            "        } else={",
            '            :put "[DEBUG] Config content preview: $[:pick $clientConfig 0 100]..."',
            "            ",
            "            # Create and write file using RouterOS file system",
            "            :do {",
            "                # Use add command to create file with exact name (avoids .txt suffix)",
            "                /file add name=$fileName contents=$clientConfig",
            '                :put "[OK] Created file using /file add method: $fileName"',
            "            } on-error={",
            "                # Fallback method if add doesn't work",
            '                :put "[INFO] Trying fallback file creation method for $fileName"',
            '                /file print file=$fileName where name=""',
            "                :delay 1s",
            "                /file set [/file find name=$fileName] contents=$clientConfig",
            '                :put "[OK] Created file using fallback method: $fileName"',
            "            }",
            "        }",
            "        ",
            '        :put "[OK] Saved: $fileName"',
            '        :log info "WireGuard Export: Successfully saved configuration file: $fileName"',
            "        :set configCount ($configCount + 1)",
            "    } on-error={",
            '        :put "[ERROR] Failed to export peer $peerId"',
            '        :log error "WireGuard Export: Failed to export peer $peerId"',
            "    }",
            "}",
            "",
            "# Step 4: Summary and completion",
            ':put ""',
            ':put "========================================="',
            ':put "WireGuard Export Complete"',
            ':put "========================================="',
            ':put "Configurations exported: $configCount"',
            ':put "Server endpoint: $endpointAddress"',
            ':put "Completed at: $[/system clock get time]"',
            "",
            ":if ($configCount > 0) do={",
            '    :put ""',
            '    :put "[SUCCESS] Client configurations ready!"',
            '    :put "Next steps:"',
            '    :put "1. Download .conf files from Files menu"',
            '    :put "2. Import into WireGuard clients"',
            '    :put "3. Test connectivity"',
            '    :log info "WireGuard Export: Successfully exported $configCount client configurations"',
            "} else={",
            '    :put ""',
            '    :put "[INFO] Troubleshooting empty configuration files:"',
            '    :put ""',
            '    :put "STEP 1: Check peer configuration completeness:"',
            '    :put "   /interface wireguard peers print detail"',
            '    :put "   Each peer MUST have:"',
            '    :put "   - public-key: Generated WireGuard public key"',
            '    :put "   - allowed-address: Client IP (e.g., 192.168.170.2/32)"',
            '    :put ""',
            '    :put "STEP 2: Check interface private key:"',
            '    :put "   /interface wireguard print detail"',
            '    :put "   Interface MUST have:"',
            '    :put "   - private-key: Generated WireGuard private key"',
            '    :put ""',
            '    :put "STEP 3: Fix missing configurations:"',
            '    :put "   For missing interface private key:"',
            '    :put "   /interface wireguard set [find name=wireguard-server] private-key=[/interface wireguard generate-private-key]"',
            '    :put ""',
            '    :put "   For missing peer public key (generate on client first):"',
            '    :put "   /interface wireguard peers set [find name=user1] public-key=\\"CLIENT_PUBLIC_KEY_HERE\\""',
            '    :put ""',
            '    :put "   For missing peer allowed-address:"',
            '    :put "   /interface wireguard peers set [find name=user1] allowed-address=192.168.170.2/32"',
            '    :put ""',
            '    :put "STEP 4: Test manually after fixes:"',
            '    :put "   /interface wireguard peers show-client-config [find name=user1]"',
            '    :put ""',
            '    :put "STEP 5: Verify interface names:"',
            "    :put \"   - Server interfaces must contain 'server' or 'Server'\"",
            "    :put \"   - Must NOT contain 'client' or 'Client'\"",
            '    :put "   - Valid examples: wireguard-server, wg-server1, MyServer"',
            '    :put ""',
            '    :put "NOTE: The show-client-config command only works when ALL"',
            '    :put "      required fields are properly configured. Missing any"',
            '    :put "      field results in empty output (length: 0)."',
            '    :log warning "WireGuard Export: No configurations were exported - check peer configuration completeness"',
            "}",
            "",
            ':log info "WireGuard Export: Process completed - $configCount configurations generated using endpoint $endpointAddress"',
        ],
    };

    // Use OneTimeScript to create the script
    return OneTimeScript({
        ScriptContent: scriptContent,
        name: "Export-WireGuard-Simple",
        startTime: "startup",
    });
};

export const WireguardPeerAddress = ( interfaceName: string, scriptName: string = "WireGuard-Peer-Update", startTime: string = "startup" ): RouterConfig => {
    const scriptContent: RouterConfig = {
        "": [
            `:delay 100s;`,
            "# Define the WireGuard interface name as a parameter for the script",
            "# To run: /system script run <script_name> wg-interface=<your_wg_interface_name>",
            `:local wgInterfaceName "${interfaceName}";`,
            "",
            ":if ([:len $wgInterfaceName] = 0) do={",
            '    :log error "WireGuard interface name not provided. Use: /system script run <script_name> wg-interface=<your_wg_interface_name>"',
            "} else={",
            '    :log info ("Starting script for WireGuard interface: " . $wgInterfaceName)',
            "",
            "    # Step 1: Check and Enable IP Cloud DDNS",
            "    :local ddnsStatus [/ip cloud get ddns-enabled]",
            '    :if ($ddnsStatus != "yes") do={',
            "        /ip cloud set ddns-enabled=yes",
            '        :log info "IP Cloud DDNS has been enabled."',
            "    } else={",
            '        :log info "IP Cloud DDNS is already enabled."',
            "    }",
            "",
            "    # Step 2: Force IP Cloud Update (and allow time for it)",
            '    :log info "Forcing IP Cloud DDNS update..."',
            "    /ip cloud force-update",
            '    :log info "Waiting 10 seconds for IP Cloud to synchronize..."',
            "    :delay 10s",
            "",
            "    # Step 3: Retrieve and Store the Cloud DNS Name (Global Variable)",
            "    :global globalCloudDnsName",
            "    :set globalCloudDnsName [/ip cloud get dns-name]",
            "",
            "    :if ([:len $globalCloudDnsName] = 0) do={",
            '        :log error ("Failed to retrieve IP Cloud DNS Name. Status: " . [/ip cloud get status] . ". Public IP: " . [/ip cloud get public-address] . ". Ensure IP Cloud is functioning correctly.")',
            "    } else={",
            '        :log info ("Successfully retrieved IP Cloud DNS Name: " . $globalCloudDnsName)',
            "",
            "        # Step 4: Identify Target WireGuard Peers",
            '        :log info ("Searching for WireGuard peers on interface: " . $wgInterfaceName)',
            "        :local peerIds [/interface wireguard peers find interface=$wgInterfaceName]",
            "",
            "        :if ([:len $peerIds] = 0) do={",
            '            :log warning ("No WireGuard peers found for interface: " . $wgInterfaceName . ". No peers to update.")',
            "        } else={",
            '            :log info ("Found " . [:len $peerIds] . " peer(s) on interface: " . $wgInterfaceName . ". Proceeding with update.")',
            "",
            "            # Step 5: Update WireGuard Peer endpoint-address",
            "            :foreach peerId in=$peerIds do={",
            "                # Retrieve current peer details for logging",
            "                :local currentPeerComment [/interface wireguard peers get $peerId comment]",
            "                :local currentPeerPublicKey [/interface wireguard peers get $peerId public-key]",
            "                :local currentEndpointAddress [/interface wireguard peers get $peerId endpoint-address]",
            "",
            '                :log info ("Updating peer ID: " . $peerId . " (Comment: " . $currentPeerComment . ", PK: " . [:pick $currentPeerPublicKey 0 10] . "..., Current Endpoint: " . $currentEndpointAddress . ")")',
            "                ",
            "                /interface wireguard peers set $peerId endpoint-address=$globalCloudDnsName",
            "                ",
            '                :log info ("Peer ID: " . $peerId . " - endpoint-address updated to: " . $globalCloudDnsName)',
            "            }",
            '            :log info ("Finished updating WireGuard peers for interface: " . $wgInterfaceName)',
            "        }",
            "    }",
            '    :log info "Script finished."',
            "}",
        ],
    };

    return OneTimeScript({
        ScriptContent: scriptContent,
        name: scriptName,
        interval: "00:00:00",
        startTime: startTime,
    });
};

export const WireguardServer = ( WireguardInterfaceConfig: WireguardInterfaceConfig, SubnetConfig: SubnetConfig ): RouterConfig => {
    const config: RouterConfig = {
        "/interface wireguard": [],
        "/ip address": [],
        "/interface list member": [],
        "/ip firewall address-list": [],
        "/ip firewall filter": [],
    };

    const { subnet } = SubnetConfig;

    const {
        Name,
        PrivateKey,
        ListenPort ,
        Mtu = 1420,
        VSNetwork,
    } = WireguardInterfaceConfig;

    const interfaceName = "wg-server-" + Name;

    // Create Wireguard interface
    const interfaceParams: string[] = [
        `name=${interfaceName}`,
        `listen-port=${ListenPort}`,
        `mtu=${Mtu}`,
        `comment="VPN Server: ${Name} on ${VSNetwork} Network"`,
    ];

    if (PrivateKey) {
        interfaceParams.push(`private-key="${PrivateKey}"`);
    }

    config["/interface wireguard"].push(`add ${interfaceParams.join(" ")}`);

    // Add IP address to interface
    const [ip, prefix] = subnet.split("/");
    const network = prefix ? calculateNetworkAddress(ip, prefix) : null;
    let addressCommand = `add address="${subnet}" interface="${interfaceName}" comment="${interfaceName} Wireguard Server"`;
    if (network) {
        addressCommand += ` network="${network}"`;
    }
    config["/ip address"].push(addressCommand);


    // Add interface list members and address list via shared helpers
    const listsCfg = VSInterfaceList(interfaceName, String(VSNetwork), `${interfaceName} interface`);
    const addrCfg = VSAddressList(subnet, String(VSNetwork), `${interfaceName} subnet`);
    const mergedLists = mergeRouterConfigs(listsCfg, addrCfg);
    Object.entries(mergedLists).forEach(([section, cmds]) => {
        config[section] = (config[section] ?? []).concat(cmds);
    });




    return CommandShortner(config);
};

export const WireguardServerUsers = ( serverConfig: WireguardInterfaceConfig, users: VSCredentials[], SubnetConfig: SubnetConfig ): RouterConfig => {
    const config: RouterConfig = {
        "/interface wireguard peers": [],
    };

    const { subnet } = SubnetConfig;




    // Interface Name
    const interfaceName = "wg-server-" + serverConfig.Name;

    // Extract network info from server address
    const [serverIP, prefixStr] = subnet.split("/");
    const prefix = parseInt(prefixStr || "24");
    console.log(prefix);
    const baseNetwork = serverIP.split(".").slice(0, 3).join(".");

    // Filter users who have Wireguard in their VPNType array
    const wireguardUsers = users.filter((user) =>
        user.VPNType.includes("Wireguard"),
    );

    wireguardUsers.forEach((user, index) => {
        const clientIP = `${baseNetwork}.${index + 2}`;
        const clientAddress = `${clientIP}/32`;

        const peerParams: string[] = [
            `interface=${interfaceName}`,
            `name="${user.Username}-${serverConfig.Name}"`,
            `allowed-address=0.0.0.0/0`,
            `client-address=${clientAddress}`,
            `client-dns=${serverIP}`,
            `client-endpoint=""`,
            `client-keepalive=25s`,
            `client-listen-port=${serverConfig.ListenPort}`,
            `persistent-keepalive=25s`,
            `preshared-key=auto`,
            `private-key=auto`,
            `responder=yes`,
            `comment="Wireguard Client: ${user.Username} on ${serverConfig.Name} Server"`,
        ];

        config["/interface wireguard peers"].push(
            `add ${peerParams.join(" ")}`,
        );
    });

    if (wireguardUsers.length === 0) {
        config["/interface wireguard peers"].push(
            "# No users configured for WireGuard VPN",
        );
        return CommandShortner(config);
    }

    // Generate WireGuard peer address update script
    const peerAddressScript = WireguardPeerAddress(
        serverConfig.Name,
        `WG-Peer-Update-${serverConfig.Name}`,
        "startup",
    );

    // Merge the peer configuration with the address update script
    const finalConfig = mergeRouterConfigs(config, peerAddressScript);

    return CommandShortner(finalConfig);
};

export const WireguardServerFirewall = ( WireguardInterfaceConfig: WireguardInterfaceConfig ): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall filter": [],
        "/ip firewall mangle": [],
    };

    const { ListenPort, Name } = WireguardInterfaceConfig;
    const interfaceName = "wg-server-" + Name;

    // Add firewall filter rule for WireGuard handshake
    config["/ip firewall filter"].push(
        `add action=accept chain=input comment="WireGuard Handshake of ${interfaceName} Server" dst-port="${ListenPort}" in-interface-list="Domestic-WAN" protocol="udp"`,
    );

    config["/ip firewall mangle"].push(
        `add action=mark-connection chain=input comment="Mark Inbound WireGuard Connections (${interfaceName})" \\
            connection-state=new in-interface-list="Domestic-WAN" protocol="udp" dst-port="${ListenPort}" \\
            new-connection-mark="conn-vpn-server" passthrough=yes`,
    );

    return config;
}

export const SingleWSWrapper = ( wireguardConfig: WireguardServerConfig, users: VSCredentials[], SubnetConfig: SubnetConfig ): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Base server interface and address config
    configs.push(WireguardServer(wireguardConfig.Interface, SubnetConfig));
    // Firewall rules for handshake and connection marking
    configs.push(WireguardServerFirewall(wireguardConfig.Interface));

    // Users/peers config
    if (users.length > 0) {
        configs.push(
            WireguardServerUsers(
                wireguardConfig.Interface,
                users,
                SubnetConfig,
            ),
        );
    }

    // Add export script (useful for single server setup)
    // configs.push(ExportWireGuard());

    if (configs.length === 0) {
        return {};
    }

    const finalConfig = mergeRouterConfigs(...configs);
    return CommandShortner(finalConfig);
}

export const WireguardServerWrapper = ( wireguardConfigs: WireguardServerConfig[], users: VSCredentials[], subnetConfigs: SubnetConfig[] ): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Process each WireGuard server configuration
    wireguardConfigs.forEach((wireguardConfig) => {
        const ifaceName = wireguardConfig.Interface.Name;

        // Try to find matching subnet by name
        const list = Array.isArray(subnetConfigs) ? subnetConfigs : [];
        let matchedSubnet = list.find((s) => s.name === ifaceName);
        if (!matchedSubnet) matchedSubnet = list.find((s) => s.name.toLowerCase() === ifaceName.toLowerCase());
        if (!matchedSubnet) matchedSubnet = list.find((s) => s.name === `wg-server-${ifaceName}`);
        if (!matchedSubnet) matchedSubnet = list.find((s) => s.name.toLowerCase() === `wg-server-${ifaceName}`.toLowerCase());
        // Backward-compatibility without hyphen
        if (!matchedSubnet) matchedSubnet = list.find((s) => s.name === `wg-server${ifaceName}`);
        if (!matchedSubnet) matchedSubnet = list.find((s) => s.name.toLowerCase() === `wg-server${ifaceName}`.toLowerCase());

        // Fallback to interface's own address if mapping not provided
        const effectiveSubnet: SubnetConfig = matchedSubnet || {
            name: ifaceName,
            subnet: wireguardConfig.Interface.InterfaceAddress,
        };

        // Use single wrapper for full server setup
        configs.push(SingleWSWrapper(wireguardConfig, users, effectiveSubnet));
    });

    // If no configurations were generated, return empty config
    if (configs.length === 0) {
        return {};
    }

    configs.push(ExportWireGuard());
    
    // Merge configurations
    const finalConfig = mergeRouterConfigs(...configs);



    return CommandShortner(finalConfig);
};










