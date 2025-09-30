// import type { BondingConfig, WANLink } from "../../../StarContext/WANType";

// import type { RouterConfig } from "../../ConfigGenerator";

// export const getLinkCount = (wanLink: WANLink): number => {
//     return wanLink.WANConfigs.length || 0;
// };

// export const getWANInterfaces = (wanLink: WANLink): string[] => {
//     if (wanLink.WANConfigs.length === 0) {
//         return [];
//     }

//     return wanLink.WANConfigs.map((config) => {
//         const { name, InterfaceConfig, ConnectionConfig } = config;
//         const { InterfaceName, VLANID, MacAddress } = InterfaceConfig;

//         // Helper function to generate interface name based on configuration
//         const generateInterfaceName = (): string => {
//             // Check for PPPoE connection
//             if (ConnectionConfig?.pppoe) {
//                 // PPPoE creates its own interface
//                 return `pppoe-client-${name}`;
//             }

//             // Check for LTE interface
//             if (
//                 ConnectionConfig?.lteSettings ||
//                 InterfaceName.startsWith("lte")
//             ) {
//                 // LTE interface uses the LTE interface directly
//                 return InterfaceName;
//             }

//             // For DHCP and Static IP, determine the underlying interface
//             if (VLANID && MacAddress) {
//                 // MACVLAN + VLAN combination
//                 return `VLAN${VLANID}-MacVLAN-${InterfaceName}-${name}-${name}`;
//             }

//             if (VLANID) {
//                 // VLAN interface
//                 return `VLAN${VLANID}-${InterfaceName}-${name}`;
//             }

//             if (MacAddress) {
//                 // MACVLAN interface
//                 return `MacVLAN-${InterfaceName}-${name}`;
//             }

//             // Default to the base interface name
//             return InterfaceName;
//         };

//         return generateInterfaceName();
//     });
// };

// // PCC - Per Connection Classifier Load Balancing
// export const PCC = (
//     linkCount: number,
//     wanInterfaces: string[],
//     localNetwork: string = "LOCAL-IP",
// ): RouterConfig => {
//     const config: RouterConfig = {
//         "/ip firewall mangle": [],
//     };

//     const mangleRules = config["/ip firewall mangle"];

//     // 2. Mark connections coming from each WAN interface
//     wanInterfaces.forEach((iface, index) => {
//         const ispNumber = index + 1;
//         mangleRules.push(
//             `add action=mark-connection chain=input in-interface="${iface}" new-connection-mark="ISP-${ispNumber}-conn" passthrough=yes comment="// PCC LOAD BALANCING - Mark ISP-${ispNumber} connections"`,
//         );
//     });

//     // 3. Mark routing for output based on connection marks
//     wanInterfaces.forEach((_, index) => {
//         const ispNumber = index + 1;
//         mangleRules.push(
//             `add action=mark-routing chain=output connection-mark="ISP-${ispNumber}-conn" new-routing-mark="to-ISP-${ispNumber}" passthrough=yes`,
//         );
//     });

//     // 4. PCC classifier rules - distribute new connections across WANs
//     wanInterfaces.forEach((_, index) => {
//         const ispNumber = index + 1;
//         mangleRules.push(
//             `add action=mark-connection chain=prerouting new-connection-mark="ISP-${ispNumber}-conn" passthrough=yes per-connection-classifier=both-addresses-and-ports:${linkCount}/${index} dst-address-type=!local dst-address-list="!${localNetwork}" src-address-list="${localNetwork}"`,
//         );
//     });

//     // 5. Mark routing in prerouting based on connection marks
//     wanInterfaces.forEach((_, index) => {
//         const ispNumber = index + 1;
//         mangleRules.push(
//             `add action=mark-routing chain=prerouting connection-mark="ISP-${ispNumber}-conn" new-routing-mark="to-ISP-${ispNumber}" passthrough=yes dst-address-list="!${localNetwork}" src-address-list="${localNetwork}"`,
//         );
//     });

//     return config;
// };

// // NTH - Nth packet Load Balancing
// export const NTH = (
//     linkCount: number,
//     wanInterfaces: string[],
//     localNetwork: string = "LOCAL-IP",
// ): RouterConfig => {
//     const config: RouterConfig = {
//         "/ip firewall mangle": [],
//     };

//     const mangleRules = config["/ip firewall mangle"];

//     // 2. Mark connections coming from each WAN interface
//     wanInterfaces.forEach((iface, index) => {
//         const ispNumber = index + 1;
//         mangleRules.push(
//             `add action=mark-connection chain=prerouting in-interface="${iface}" new-connection-mark="ISP-${ispNumber}-conn" passthrough=yes comment="// NTH LOAD BALANCING - Mark ISP-${ispNumber} connections"`,
//         );
//     });

//     // 3. Mark routing for output based on connection marks
//     wanInterfaces.forEach((_, index) => {
//         const ispNumber = index + 1;
//         mangleRules.push(
//             `add action=mark-routing chain=output connection-mark="ISP-${ispNumber}-conn" new-routing-mark="to-ISP-${ispNumber}" passthrough=yes`,
//         );
//     });

//     // 4. NTH classifier rules - distribute new connections across WANs
//     wanInterfaces.forEach((_, index) => {
//         const ispNumber = index + 1;
//         mangleRules.push(
//             `add action=mark-connection chain=prerouting new-connection-mark="ISP-${ispNumber}-conn" passthrough=yes connection-state=new dst-address-list="!${localNetwork}" src-address-list="${localNetwork}" nth=${linkCount},${ispNumber}`,
//         );
//     });

//     // 5. Mark routing in prerouting based on connection marks
//     wanInterfaces.forEach((_, index) => {
//         const ispNumber = index + 1;
//         mangleRules.push(
//             `add action=mark-routing chain=prerouting connection-mark="ISP-${ispNumber}-conn" new-routing-mark="to-ISP-${ispNumber}" passthrough=yes dst-address-list="!${localNetwork}" src-address-list="${localNetwork}"`,
//         );
//     });

//     return config;
// };

// // Failover Gateway - Simple gateway check with automatic failover
// export const FailoverGateway = (
//     wanInterfaces: Array<{
//         name: string;
//         gateway: string;
//         distance: number;
//     }>,
// ): RouterConfig => {
//     const config: RouterConfig = {
//         "/ip route": [],
//     };

//     const routes = config["/ip route"];

//     // Create main default routes with check-gateway=ping
//     // Routes automatically disable when gateway is unreachable
//     wanInterfaces.forEach((wan) => {
//         routes.push(
//             `add dst-address="0.0.0.0/0" check-gateway=ping distance=${wan.distance} gateway=${wan.gateway} target-scope="30" scope="30" comment="to ${wan.name}"`,
//         );
//     });

//     return config;
// };

// // Failover Recursive - Check connectivity to public IPs via specific gateways
// export const FailoverRecursive = (
//     wanInterfaces: Array<{
//         name: string;
//         gateway: string;
//         checkIP: string;
//         distance: number;
//     }>,
// ): RouterConfig => {
//     const config: RouterConfig = {
//         "/ip route": [],
//     };

//     const routes = config["/ip route"];

//     // 1. Create recursive host routes
//     // These monitor connectivity to public IPs via ISP gateways
//     wanInterfaces.forEach((wan) => {
//         routes.push(
//             `add check-gateway=ping dst-address="${wan.checkIP}" distance=1 gateway=${wan.gateway} target-scope="10" scope="10" comment="Check ${wan.name}"`,
//         );
//     });

//     // 2. Create main default routes pointing to the check IPs
//     // These use the recursive routes to determine availability
//     wanInterfaces.forEach((wan) => {
//         routes.push(
//             `add dst-address="0.0.0.0/0" check-gateway=ping distance=${wan.distance} gateway=${wan.checkIP} target-scope="10" scope="30" comment="to ${wan.name}"`,
//         );
//     });

//     return config;
// };

// // Failover Netwatch - Monitor IPs and control routes via scripts
// export const FailoverNetwatch = (
//     wanInterfaces: Array<{
//         name: string;
//         gateway: string;
//         checkIP: string;
//         distance: number;
//         interval?: string; // Default: "5s"
//         timeout?: string; // Default: "5s"
//     }>,
// ): RouterConfig => {
//     const config: RouterConfig = {
//         "/ip route": [],
//         "/tool netwatch": [],
//     };

//     const routes = config["/ip route"];
//     const netwatchRules = config["/tool netwatch"];

//     // 1. Create main default routes (controlled by Netwatch)
//     wanInterfaces.forEach((wan) => {
//         routes.push(
//             `add dst-address="0.0.0.0/0" distance=${wan.distance} gateway=${wan.gateway} comment="${wan.name}_DEFAULT_ROUTE" target-scope="10" scope="30"`,
//         );
//     });

//     // 2. Create specific host routes for Netwatch checks
//     // Ensures checks go through correct ISP even if main route is disabled
//     wanInterfaces.forEach((wan) => {
//         routes.push(
//             `add dst-address="${wan.checkIP}" distance=1 gateway=${wan.gateway} comment="${wan.name}_CHECK_ROUTE" target-scope="10" scope="30"`,
//         );
//     });

//     // 3. Configure Netwatch entries with up/down scripts
//     wanInterfaces.forEach((wan) => {
//         const interval = wan.interval || "5s";
//         const timeout = wan.timeout || "5s";
//         const upScript = `/ip route enable [find comment="${wan.name}_DEFAULT_ROUTE"]; /log info "${wan.name} is UP, switching back"`;
//         const downScript = `/ip route disable [find comment="${wan.name}_DEFAULT_ROUTE"]; /log info "${wan.name} is DOWN, switching to backup ISP"`;

//         netwatchRules.push(
//             `add host="${wan.checkIP}" interval=${interval} timeout=${timeout} up-script="${upScript}" down-script="${downScript}" comment="Netwatch for ${wan.name}"`,
//         );
//     });

//     return config;
// };

// // Failover Scheduled - Advanced monitoring with multiple check IPs and thresholds
// export const FailoverScheduled = (
//     wanInterfaces: Array<{
//         name: string;
//         gateway: string;
//         checkIPs: string[]; // Multiple IPs to check
//         distance: number;
//         threshold?: number; // How many IPs must fail to consider link down (default: 1)
//         interval?: string; // Default: "10s"
//     }>,
// ): RouterConfig => {
//     const config: RouterConfig = {
//         "/ip route": [],
//         "/system script": [],
//         "/system scheduler": [],
//     };

//     const routes = config["/ip route"];
//     const scripts = config["/system script"];
//     const schedulers = config["/system scheduler"];

//     // 1. Create main default routes (controlled by scheduled scripts)
//     wanInterfaces.forEach((wan) => {
//         routes.push(
//             `add dst-address="0.0.0.0/0" distance=${wan.distance} gateway=${wan.gateway} comment="${wan.name}_route"`,
//         );
//     });

//     // 2. Create specific host routes for script checks
//     wanInterfaces.forEach((wan) => {
//         wan.checkIPs.forEach((ip, index) => {
//             routes.push(
//                 `add dst-address="${ip}" distance=1 gateway=${wan.gateway} comment="${wan.name}_CHECK_ROUTE_${index + 1}" target-scope="10" scope="30"`,
//             );
//         });
//     });

//     // 3. Create health check scripts
//     wanInterfaces.forEach((wan) => {
//         const threshold = wan.threshold || 1;
//         const checkIpList = wan.checkIPs.map((ip) => `"${ip}"`).join(",");

//         const scriptSource = `
// :local wanName "${wan.name}";
// :local routeComment "${wan.name}_route";
// :local gatewayAddress "${wan.gateway}";
// :local checkIps (${checkIpList});
// :local unreachableCount 0;
// :local threshold ${threshold};
// :local totalIps [:len \$checkIps];

// :foreach ip in=\$checkIps do={
//   :if ([/ping \$ip count=3] = 0) do={
//     :set unreachableCount (\$unreachableCount + 1);
//   }
// }

// :if (\$unreachableCount >= \$threshold) do={
//   :if (![/ip route get [find comment=\$routeComment] disabled]) do={
//     /ip route disable [find comment=\$routeComment];
//     :log error "WAN \$wanName (\$gatewayAddress) is DOWN - Ping to \$unreachableCount of \$totalIps IPs failed! Disabling route \$routeComment.";
//   }
// } else={
//   :if ([/ip route get [find comment=\$routeComment] disabled]) do={
//     /ip route enable [find comment=\$routeComment];
//     :log info "WAN \$wanName (\$gatewayAddress) is UP - Ping to \$unreachableCount of \$totalIps IPs successful! Enabling route \$routeComment.";
//   }
// }
// `;

//         scripts.push(
//             `add name="check-${wan.name.toLowerCase()}-script" source="${scriptSource}" comment="${wan.name} Health Check Script"`,
//         );
//     });

//     // 4. Create scheduler entries to run scripts periodically
//     wanInterfaces.forEach((wan) => {
//         const interval = wan.interval || "10s";
//         schedulers.push(
//             `add name="run-check-${wan.name.toLowerCase()}" interval=${interval} on-event="/system script run \"check-${wan.name.toLowerCase()}-script\"" comment="Scheduler for ${wan.name} health check"`,
//         );
//     });

//     return config;
// };

// // ECMP - Equal Cost Multi-Path routing (Load Balancing)
// export const ECMP = (
//     wanInterfaces: Array<{
//         name: string;
//         gateway: string;
//         checkIP?: string;
//     }>,
// ): RouterConfig => {
//     const config: RouterConfig = {
//         "/ip route": [],
//     };

//     const routes = config["/ip route"];

//     // Create recursive routes if check IPs are provided
//     wanInterfaces.forEach((wan) => {
//         if (wan.checkIP) {
//             routes.push(
//                 `add dst-address="${wan.checkIP}" gateway=${wan.gateway} scope=10 comment="Check ${wan.name}"`,
//             );
//         }
//     });

//     // Create ECMP route with multiple gateways
//     const gateways = wanInterfaces
//         .map((wan) => wan.checkIP || wan.gateway)
//         .join(",");
//     routes.push(
//         `add dst-address="0.0.0.0/0" gateway=${gateways} check-gateway=ping comment="ECMP Load Balancing"`,
//     );

//     return config;
// };

// // Bonding - Link Aggregation for combining multiple interfaces
// export const Bonding = (bondingConfig: BondingConfig): RouterConfig => {
//     const bondConfig: RouterConfig = {
//         "/interface bonding": [],
//     };

//     const {
//         name,
//         mode,
//         slaves,
//         ipAddress,
//         arpMonitoring,
//         miiMonitoring,
//         mtu,
//         lacp,
//     } = bondingConfig;

//     // Add IP address section if specified
//     if (ipAddress) {
//         bondConfig["/ip address"] = [];
//     }

//     const bondingRules = bondConfig["/interface bonding"];
//     const bondName = name || "bonding";
//     // const mode = mode || "balance-rr"
//     // const slaves = slaves.join(",")

//     // Build the bonding interface command
//     let bondCommand = `add name="${bondName}" mode=${mode} slaves="${slaves}"`;

//     // Add ARP monitoring if enabled
//     if (arpMonitoring?.enabled && arpMonitoring.targets.length > 0) {
//         bondCommand += ` link-monitoring=arp`;
//         bondCommand += ` arp-ip-targets="${arpMonitoring.targets.join(",")}"`;

//         if (arpMonitoring.interval) {
//             bondCommand += ` arp-interval=${arpMonitoring.interval}`;
//         }

//         if (arpMonitoring.validateTime) {
//             bondCommand += ` arp-validate-time=${arpMonitoring.validateTime}`;
//         }
//     }
//     // Add MII monitoring if enabled (alternative to ARP)
//     else if (miiMonitoring?.enabled) {
//         bondCommand += ` link-monitoring=mii`;

//         if (miiMonitoring.interval) {
//             bondCommand += ` mii-interval=${miiMonitoring.interval}`;
//         }
//     }

//     // Add MTU if specified
//     if (mtu) {
//         bondCommand += ` mtu=${mtu}`;
//     }

//     // Add LACP settings for 802.3ad mode
//     if (mode === "802.3ad" && lacp) {
//         if (lacp.rate) {
//             bondCommand += ` lacp-rate=${lacp.rate}`;
//         }
//     }

//     bondCommand += ` comment="Bonding Interface - ${mode} mode"`;
//     bondingRules.push(bondCommand);

//     // Add IP address if specified
//     if (ipAddress && bondConfig["/ip address"]) {
//         bondConfig["/ip address"].push(
//             `add address="${ipAddress}" interface="${bondName}" comment="IP for Bonding Interface"`,
//         );
//     }

//     return bondConfig;
// };

// // Bonding with Load Balancing - Combines bonding with routing for multi-WAN
// export const BondingWithRouting = (
//     bondingConfigs: Array<{
//         name: string;
//         mode?: BondingMode;
//         slaves: string[];
//         gateway?: string; // Gateway for this bonded interface
//         checkIP?: string; // IP to check for recursive routing
//         distance?: number; // Route distance
//     }>,
//     localNetwork: string = "LOCAL-IP",
// ): RouterConfig => {
//     const config: RouterConfig = {
//         "/interface bonding": [],
//         "/ip route": [],
//     };

//     const bondingRules = config["/interface bonding"];
//     const routes = config["/ip route"];

//     // Create bonding interfaces
//     bondingConfigs.forEach((bond) => {
//         const mode = bond.mode || "balance-rr";
//         const slaves = bond.slaves.join(",");

//         bondingRules.push(
//             `add name="${bond.name}" mode=${mode} slaves="${slaves}" comment="Bonding ${bond.name} - ${mode}"`,
//         );

//         // Add routes if gateway is specified
//         if (bond.gateway) {
//             if (bond.checkIP) {
//                 // Recursive routing for more reliable monitoring
//                 routes.push(
//                     `add dst-address="${bond.checkIP}" gateway=${bond.gateway} scope=10 comment="Check ${bond.name}"`,
//                 );
//                 routes.push(
//                     `add dst-address="0.0.0.0/0" gateway=${bond.checkIP} distance=${bond.distance || 1} check-gateway=ping comment="Route via ${bond.name}"`,
//                 );
//             } else {
//                 // Simple gateway route
//                 routes.push(
//                     `add dst-address="0.0.0.0/0" gateway=${bond.gateway} distance=${bond.distance || 1} check-gateway=ping comment="Route via ${bond.name}"`,
//                 );
//             }
//         }
//     });

//     return config;
// };
