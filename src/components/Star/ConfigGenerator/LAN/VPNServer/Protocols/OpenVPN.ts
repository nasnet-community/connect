import type { OpenVpnServerConfig } from "../../../../StarContext/Utils/VPNServerType";
import type { RouterConfig } from "../../../ConfigGenerator";
import { formatBooleanValue, formatArrayValue } from "../VPNServerUtil";
import { CommandShortner, mergeRouterConfigs } from "../../../utils/ConfigGeneratorUtil";
import type { Credentials } from "../../../../StarContext/Utils/VPNServerType";
import { OneTimeScript } from "../../../utils/ScriptSchedule";


export const ExportOpenVPN = (): RouterConfig => {
    // Create the OpenVPN Client Configuration Export script content as RouterConfig
    const exportOpenVPNScriptContent: RouterConfig = {
        "": [
            ":delay 130s;",
            "# ===========================================",
            "# OpenVPN Client Configuration Export Script",
            "# ===========================================",
            "# Enhanced version with proper file naming: Name-Protocol-Port.ovpn",
            "# Following MikroTik RouterOS 7.x documentation standards",
            "",
            ':log info "=== OpenVPN Client Configuration Export Started ===";',
            "",
            "# Declare local variables",
            ":local exportCount 0",
            ':local serverAddress ""',
            ":local ovpnEnabled false",
            "",
            "# Step 1: Check if OpenVPN server is configured and enabled",
            ':put "[STEP] Checking OpenVPN server configuration..."',
            ":do {",
            "    :local serverCount [/interface ovpn-server server print count-only]",
            "    :if ($serverCount > 0) do={",
            "        :set ovpnEnabled true",
            '        :put "[OK] Found $serverCount OpenVPN server(s)"',
            '        :log info "OpenVPN Export: Found $serverCount OpenVPN server(s)"',
            "    } else={",
            '        :put "[ERROR] No OpenVPN server configured"',
            '        :log warning "OpenVPN Export: No OpenVPN server configured"',
            "    }",
            "} on-error={",
            '    :put "[ERROR] Failed to check OpenVPN server status"',
            '    :log error "OpenVPN Export: Failed to check OpenVPN server status"',
            "}",
            "",
            "# Step 2: Setup server endpoint address",
            ':put "[STEP] Detecting server endpoint address..."',
            ":do {",
            "    # Try MikroTik Cloud DDNS first",
            "    /ip cloud set ddns-enabled=yes",
            "    :delay 5s",
            "    :set serverAddress [/ip cloud get dns-name]",
            "    :if ([:len $serverAddress] > 0) do={",
            '        :put "[OK] Using Cloud DDNS: $serverAddress"',
            '        :log info "OpenVPN Export: Using Cloud DDNS endpoint: $serverAddress"',
            "    } else={",
            '        :put "[INFO] Cloud DDNS not available, checking WAN interfaces..."',
            '        :log info "OpenVPN Export: Cloud DDNS not available, checking WAN interfaces"',
            "        ",
            "        # Fallback to WAN interface IP detection",
            '        :local wanInterfaces [/interface list member find list="WAN"]',
            "        :if ([:len $wanInterfaces] > 0) do={",
            "            :local wanInt [/interface list member get [:pick $wanInterfaces 0] interface]",
            "            :local wanAddresses [/ip address find interface=$wanInt]",
            "            :if ([:len $wanAddresses] > 0) do={",
            "                :local wanAddr [/ip address get [:pick $wanAddresses 0] address]",
            '                :set serverAddress [:pick $wanAddr 0 [:find $wanAddr "/"]]',
            '                :put "[OK] Using WAN IP: $serverAddress"',
            '                :log info "OpenVPN Export: Using WAN IP endpoint: $serverAddress"',
            "            } else={",
            '                :set serverAddress ([/system identity get name] . ".example.com")',
            '                :put "[WARNING] No IP found, using placeholder: $serverAddress"',
            '                :log warning "OpenVPN Export: No WAN IP found, using placeholder"',
            "            }",
            "        } else={",
            '            :set serverAddress ([/system identity get name] . ".example.com")',
            '            :put "[WARNING] No WAN interface found, using placeholder: $serverAddress"',
            '            :log warning "OpenVPN Export: No WAN interfaces found"',
            "        }",
            "    }",
            "} on-error={",
            '    :set serverAddress ([/system identity get name] . ".example.com")',
            '    :put "[WARNING] Endpoint detection failed, using placeholder: $serverAddress"',
            '    :log warning "OpenVPN Export: Endpoint detection failed"',
            "}",
            "",
            "# Step 3: Check certificate prerequisites",
            ':put "[STEP] Checking certificate files..."',
            ":local certsReady false",
            ":local caExists false",
            ":local clientCrtExists false",
            ":local clientKeyExists false",
            "",
            ":foreach file in=[/file find] do={",
            "    :local fileName [/file get $file name]",
            '    :if ($fileName = "ca_certificate.crt") do={ :set caExists true }',
            '    :if ($fileName = "client_bundle.crt") do={ :set clientCrtExists true }',
            '    :if ($fileName = "client_bundle.key") do={ :set clientKeyExists true }',
            "}",
            "",
            ":if ($caExists && $clientCrtExists && $clientKeyExists) do={",
            "    :set certsReady true",
            '    :put "[OK] Certificate files found"',
            '    :log info "OpenVPN Export: All required certificate files found"',
            "} else={",
            '    :put "[ERROR] Certificate files missing:"',
            '    :if (!$caExists) do={ :put "  - ca_certificate.crt" }',
            '    :if (!$clientCrtExists) do={ :put "  - client_bundle.crt" }',
            '    :if (!$clientKeyExists) do={ :put "  - client_bundle.key" }',
            '    :put "[INFO] Run ExportCert function first to generate certificates"',
            '    :log warning "OpenVPN Export: Certificate files missing"',
            "}",
            "",
            "# Step 4: Export client configurations for each OpenVPN server",
            ":if ($ovpnEnabled && $certsReady && [:len $serverAddress] > 0) do={",
            '    :put "[STEP] Exporting OpenVPN client configurations..."',
            "    ",
            "    :foreach serverId in=[/interface ovpn-server server find] do={",
            "        :do {",
            "            # Get server configuration details",
            "            :local serverName [/interface ovpn-server server get $serverId name]",
            "            :local serverPort [/interface ovpn-server server get $serverId port]",
            "            :local serverProtocol [/interface ovpn-server server get $serverId protocol]",
            "            :local serverDisabled [/interface ovpn-server server get $serverId disabled]",
            "            ",
            '            :put "[INFO] Processing server: $serverName"',
            '            :put "[INFO] - Protocol: $serverProtocol"',
            '            :put "[INFO] - Port: $serverPort"',
            '            :put "[INFO] - Status: $[:pick "enabled" 0 [:len "enabled"]] $[:pick "disabled" 0 [:len "disabled"]]"',
            '            :log info "OpenVPN Export: Processing server $serverName ($serverProtocol:$serverPort)"',
            "            ",
            "            :if (!$serverDisabled) do={",
            "                # Ensure require-client-certificate is enabled for export to work",
            "                /interface ovpn-server server set $serverId require-client-certificate=yes",
            '                :log info "OpenVPN Export: Enabled require-client-certificate for server $serverName"',
            "                ",
            "                # Generate filename in format: ServerName-Protocol-Port.ovpn",
            '                :local fileName ($serverName . "-" . [:tostr $serverProtocol] . "-" . [:tostr $serverPort] . ".ovpn")',
            "                ",
            "                # Sanitize filename - remove invalid characters",
            '                :while ([:find $fileName " "] >= 0) do={',
            '                    :local pos [:find $fileName " "]',
            '                    :set fileName ([:pick $fileName 0 $pos] . "_" . [:pick $fileName ($pos + 1) [:len $fileName]])',
            "                }",
            "                ",
            "                # Remove other problematic characters",
            '                :local invalidChars {"<"; ">"; ":"; "\\\\"; "/"; "|"; "?"; "*"; "\\""; "\'"}',
            "                :foreach char in=$invalidChars do={",
            "                    :while ([:find $fileName $char] >= 0) do={",
            "                        :local pos [:find $fileName $char]",
            '                        :set fileName ([:pick $fileName 0 $pos] . "_" . [:pick $fileName ($pos + 1) [:len $fileName]])',
            "                    }",
            "                }",
            "                ",
            '                :put "[EXPORT] Generating configuration file: $fileName"',
            '                :log info "OpenVPN Export: Generating configuration file: $fileName"',
            "                ",
            "                # Export client configuration - improved method for proper naming",
            "                :do {",
            "                    # Get list of existing .ovpn files before export",
            "                    :local existingFiles",
            "                    :foreach file in=[/file find] do={",
            "                        :local fName [/file get $file name]",
            '                        :if ([:find $fName ".ovpn"] >= 0) do={',
            '                            :if ([:typeof $existingFiles] = "nothing") do={',
            "                                :set existingFiles {$fName}",
            "                            } else={",
            "                                :set existingFiles ($existingFiles , $fName)",
            "                            }",
            "                        }",
            "                    }",
            "                    ",
            '                    :put "[INFO] Files before export: $[:len $existingFiles] .ovpn files"',
            '                    :log info "OpenVPN Export: Found $[:len $existingFiles] existing .ovpn files before export"',
            "                    ",
            "                    # Export using standard RouterOS command (without file parameter)",
            "                    /interface ovpn-server server export-client-configuration \\",
            "                        server=$serverName \\",
            "                        server-address=$serverAddress \\",
            '                        ca-certificate="ca_certificate.crt" \\',
            '                        client-certificate="client_bundle.crt" \\',
            '                        client-cert-key="client_bundle.key"',
            "                    ",
            "                    # Wait for file to be generated",
            "                    :delay 3s",
            "                    ",
            "                    # Find the newly generated file",
            '                    :local newFileName ""',
            "                    :local foundNewFile false",
            "                    ",
            "                    :foreach file in=[/file find] do={",
            "                        :local fName [/file get $file name]",
            '                        :if ([:find $fName ".ovpn"] >= 0) do={',
            "                            # Check if this file is new (not in existingFiles list)",
            "                            :local isExisting false",
            "                            :foreach existingFile in=$existingFiles do={",
            "                                :if ($fName = $existingFile) do={",
            "                                    :set isExisting true",
            "                                }",
            "                            }",
            "                            ",
            "                            # If this is a new file, it's likely our export",
            "                            :if (!$isExisting) do={",
            "                                :set newFileName $fName",
            "                                :set foundNewFile true",
            '                                :put "[FOUND] New file generated: $newFileName"',
            '                                :log info "OpenVPN Export: Found new file: $newFileName"',
            "                            }",
            "                        }",
            "                    }",
            "                    ",
            "                    # If no new file found, look for typical RouterOS export patterns",
            "                    :if (!$foundNewFile) do={",
            '                        :put "[SEARCH] Looking for typical export patterns..."',
            "                        :foreach file in=[/file find] do={",
            "                            :local fName [/file get $file name]",
            "                            # Look for patterns like client*.ovpn, files with numbers",
            '                            :if ([:find $fName ".ovpn"] >= 0) do={',
            '                                :if (([:find $fName "client"] >= 0) || ([:len $fName] > 15 && [:find $fName "ovpn"] > 10)) do={',
            "                                    :set newFileName $fName",
            "                                    :set foundNewFile true",
            '                                    :put "[PATTERN] Found potential export file: $newFileName"',
            '                                    :log info "OpenVPN Export: Found file by pattern: $newFileName"',
            "                                }",
            "                            }",
            "                        }",
            "                    }",
            "                    ",
            "                    # Rename the file to our desired format if found",
            "                    :if ($foundNewFile && [:len $newFileName] > 0) do={",
            "                        :do {",
            "                            /file set [/file find name=$newFileName] name=$fileName",
            '                            :put "[SUCCESS] Renamed: $newFileName -> $fileName"',
            '                            :log info "OpenVPN Export: Successfully renamed $newFileName to $fileName"',
            "                            :set exportCount ($exportCount + 1)",
            "                        } on-error={",
            "                            # If direct rename fails, try copy method",
            '                            :put "[COPY] Direct rename failed, trying copy method..."',
            "                            :do {",
            "                                :local fileContent [/file get [/file find name=$newFileName] contents]",
            "                                /file add name=$fileName contents=$fileContent",
            "                                /file remove [/file find name=$newFileName]",
            '                                :put "[SUCCESS] Copied and renamed: $newFileName -> $fileName"',
            '                                :log info "OpenVPN Export: Copied and renamed $newFileName to $fileName"',
            "                                :set exportCount ($exportCount + 1)",
            "                            } on-error={",
            '                                :put "[WARNING] Could not rename file, keeping original: $newFileName"',
            '                                :log warning "OpenVPN Export: Could not rename file, keeping: $newFileName"',
            "                                :set exportCount ($exportCount + 1)",
            "                            }",
            "                        }",
            "                    } else={",
            '                        :put "[ERROR] No .ovpn file generated for server $serverName"',
            '                        :log error "OpenVPN Export: No .ovpn file found after export for server $serverName"',
            "                    }",
            "                    ",
            "                } on-error={",
            '                    :put "[ERROR] Failed to export configuration for server $serverName"',
            '                    :log error "OpenVPN Export: Export command failed for server $serverName"',
            "                }",
            "            } else={",
            '                :put "[SKIP] Server $serverName is disabled"',
            '                :log info "OpenVPN Export: Skipping disabled server $serverName"',
            "            }",
            "            ",
            "        } on-error={",
            '            :put "[ERROR] Failed to process OpenVPN server $serverId"',
            '            :log error "OpenVPN Export: Failed to process OpenVPN server $serverId"',
            "        }",
            "    }",
            "} else={",
            '    :put "[ERROR] Prerequisites not met for export"',
            '    :log warning "OpenVPN Export: Prerequisites not met"',
            "}",
            "",
            "# Step 5: Summary and completion",
            ':put ""',
            ':put "========================================="',
            ':put "OpenVPN Export Complete"',
            ':put "========================================="',
            ':put "Configurations exported: $exportCount"',
            ':put "Server endpoint: $serverAddress"',
            ':put "File naming format: ServerName-Protocol-Port.ovpn"',
            ':put "Completed at: $[/system clock get time]"',
            "",
            ":if ($exportCount > 0) do={",
            '    :put ""',
            '    :put "[SUCCESS] OpenVPN client configurations ready!"',
            '    :put "Next steps:"',
            '    :put "1. Download .ovpn files from Files menu"',
            '    :put "2. Import into OpenVPN clients"',
            '    :put "3. Test connectivity"',
            '    :log info "OpenVPN Export: Successfully exported $exportCount client configuration(s)"',
            "} else={",
            '    :put ""',
            '    :put "[INFO] Troubleshooting checklist:"',
            '    :put ""',
            '    :put "STEP 1: Verify OpenVPN server status:"',
            '    :put "   /interface ovpn-server server print detail"',
            '    :put "   - Ensure servers are not disabled"',
            '    :put "   - Check require-client-certificate=yes"',
            '    :put ""',
            '    :put "STEP 2: Verify certificates exist:"',
            '    :put "   /file print where name~\\".crt\\" or name~\\".key\\""',
            '    :put "   Required files:"',
            '    :put "   - ca_certificate.crt (CA certificate)"',
            '    :put "   - client_bundle.crt (client certificate)"',
            '    :put "   - client_bundle.key (client private key)"',
            '    :put ""',
            '    :put "STEP 3: Generate missing certificates:"',
            '    :put "   - Run ExportCert function to export certificate files"',
            '    :put "   - Or manually export: /certificate export-certificate"',
            '    :put ""',
            '    :put "STEP 4: Check server configuration:"',
            '    :put "   /interface ovpn-server server set [find] require-client-certificate=yes"',
            '    :put "   /interface ovpn-server server set [find] disabled=no"',
            '    :put ""',
            '    :put "STEP 5: Verify endpoint address:"',
            '    :put "   Current endpoint: $serverAddress"',
            '    :put "   - Enable Cloud DDNS: /ip cloud set ddns-enabled=yes"',
            '    :put "   - Or configure static public IP"',
            '    :log warning "OpenVPN Export: No configurations were exported - check troubleshooting steps"',
            "}",
            "",
            ':log info "OpenVPN Export: Process completed - $exportCount configurations generated using endpoint $serverAddress"',
        ],
    };

    // Use OneTimeScript to create the script
    return OneTimeScript({
        ScriptContent: exportOpenVPNScriptContent,
        name: `Export-OpenVPN-Config`,
        startTime: "startup",
    });
};

export const OVPNServer = (config: OpenVpnServerConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/ip pool": [],
        "/ppp profile": [],
        "/interface ovpn-server server": [],
        "/ip firewall filter": [],
        "/ip firewall address-list": [],
    };

    const {
        name,
        enabled = true,
        Port = 1194,
        Protocol = "tcp",
        Mode = "ip",
        Certificate,
        Encryption,
        // IPV6,
        Address,
        DefaultProfile = "ovpn-profile",
        KeepaliveTimeout = 60,
        RedirectGetway = "disabled",
        PushRoutes,
    } = config;

    // // Determine the pool name to use consistently
    // const poolName = Address?.AddressPool || 'ovpn-pool';

    // // Create IP pool for OpenVPN clients - always create the pool
    // routerConfig["/ip pool"].push(
    //     `add name=${poolName} ranges=192.168.60.5-192.168.60.250`
    // );

    // // Create PPP profile
    // const profileParams: string[] = [
    //     // `name=${DefaultProfile}`,
    //     `name=ovpn-profile`,
    //     'dns-server=1.1.1.1',
    //     'local-address=192.168.60.1',
    //     `remote-address=${poolName}`,
    //     'use-encryption=yes'
    // ];

    // routerConfig["/ppp profile"].push(
    //     `add ${profileParams.join(' ')}`
    // );

    // Create OpenVPN server instance
    const serverParams: string[] = [
        `name=${name}`,
        // `certificate=${Certificate.Certificate}`,
        `default-profile=${DefaultProfile}`,
        `disabled=${formatBooleanValue(!enabled)}`,
        `port=${Port}`,
        `protocol=${Protocol}`,
        `mode=${Mode}`,
    ];

    if (Certificate.RequireClientCertificate !== undefined) {
        serverParams.push(
            `require-client-certificate=${formatBooleanValue(Certificate.RequireClientCertificate)}`,
        );
    }

    if (Encryption.Auth) {
        serverParams.push(`auth=${formatArrayValue(Encryption.Auth)}`);
    }

    if (Encryption.Cipher) {
        serverParams.push(`cipher=${formatArrayValue(Encryption.Cipher)}`);
    }

    if (Encryption.UserAuthMethod) {
        serverParams.push(`user-auth-method=${Encryption.UserAuthMethod}`);
    }

    if (RedirectGetway !== "disabled") {
        serverParams.push(`redirect-gateway=${RedirectGetway}`);
    }

    if (PushRoutes) {
        serverParams.push(`push-routes="${PushRoutes}"`);
    }

    if (KeepaliveTimeout) {
        serverParams.push(`keepalive-timeout=${KeepaliveTimeout}`);
    }

    if (Address.MaxMtu) {
        serverParams.push(`max-mtu=${Address.MaxMtu}`);
    }

    routerConfig["/interface ovpn-server server"].push(
        `add ${serverParams.join(" ")}`,
    );

    // Add firewall rules
    routerConfig["/ip firewall filter"].push(
        `add action=accept chain=input comment="OpenVPN Server ${Protocol}" dst-port=${Port} in-interface-list=DOM-WAN protocol=${Protocol}`,
    );

    return CommandShortner(routerConfig);
};

export const OVPNServerUsers = (users: Credentials[]): RouterConfig => {
    const config: RouterConfig = {
        "/ppp secret": [],
    };

    // Filter users who have OpenVPN in their VPNType array
    const ovpnUsers = users.filter((user) => user.VPNType.includes("OpenVPN"));

    ovpnUsers.forEach((user) => {
        const secretParams: string[] = [
            `name="${user.Username}"`,
            `password="${user.Password}"`,
            "profile=ovpn-profile",
            "service=ovpn",
        ];

        config["/ppp secret"].push(`add ${secretParams.join(" ")}`);
    });

    if (ovpnUsers.length === 0) {
        config["/ppp secret"].push("# No users configured for OpenVPN");
    }

    return CommandShortner(config);
};

export const OVPNServerWrapper = ( serverConfigs: OpenVpnServerConfig[], users: Credentials[] = [] ): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Create basic OpenVPN configuration (pool and profile)
    const poolName = "ovpn-pool";
    const basicConfig: RouterConfig = {
        "/ip pool": [`add name=${poolName} ranges=192.168.60.5-192.168.60.250`],
        "/ppp profile": [
            `add name=ovpn-profile dns-server=1.1.1.1 local-address=192.168.60.1 remote-address=${poolName} use-encryption=yes`,
        ],
        "/ip firewall address-list": [
            "add address=192.168.60.0/24 list=VPN-LAN",
        ],
    };
    configs.push(basicConfig);

    // Process each OpenVPN server configuration
    serverConfigs.forEach((serverConfig) => {
        // Generate OpenVPN interface configuration
        configs.push(OVPNServer(serverConfig));
    });

    // Generate OpenVPN users configuration if users are provided
    if (users.length > 0) {
        configs.push(OVPNServerUsers(users));
    }

    // Add OpenVPN client configuration export functionality (only once)
    if (configs.length > 0) {
        configs.push(ExportOpenVPN());
    }

    // If no configurations were generated, return empty config
    if (configs.length === 0) {
        return {
            "": ["# No OpenVPN server configurations provided"],
        };
    }

    // Merge configurations
    const finalConfig = mergeRouterConfigs(...configs);

    // Add summary comments
    if (!finalConfig[""]) {
        finalConfig[""] = [];
    }

    const ovpnUsers = users.filter((user) => user.VPNType.includes("OpenVPN"));
    const serverNames = serverConfigs.map((config) => config.name).join(", ");

    finalConfig[""].unshift(
        "# OpenVPN Server Configuration Summary:",
        `# Servers: ${serverNames}`,
        `# Total Servers: ${serverConfigs.length}`,
        `# Users: ${ovpnUsers.length}`,
        `# Client Config Export: Automated via Export-OpenVPN-Config script`,
        "",
    );

    return CommandShortner(finalConfig);
};



