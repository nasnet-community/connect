// import { describe, it, expect } from "vitest";
// import {
//     sortMangleRules,
//     extractComment,
//     extractChain,
//     extractConnectionMark,
//     getLoadBalancingType,
//     getNetworkFromComment,
//     getManglePriority,
//     getSubPriority,
//     ManglePriority,
// } from "./sorter";

// describe("Mangle Rules Sorting", () => {
//     it("should sort complete mangle rules in correct priority order", () => {
//         const rules = [
//             // Accept rules
//             'add action=accept chain=prerouting comment="Accept" dst-address-list="LOCAL-IP" src-address-list="LOCAL-IP"',
//             'add action=accept chain=postrouting comment="Accept" dst-address-list="LOCAL-IP" src-address-list="LOCAL-IP"',
//             'add action=accept chain=output comment="Accept" dst-address-list="LOCAL-IP" src-address-list="LOCAL-IP"',
//             'add action=accept chain=input comment="Accept" dst-address-list="LOCAL-IP" src-address-list="LOCAL-IP"',
//             'add action=accept chain=forward comment="Accept" dst-address-list="LOCAL-IP" src-address-list="LOCAL-IP"',
            
//             // VPN Endpoint
//             'add action=mark-connection chain=output comment="VPN Endpoint" dst-address-list="VPNE" new-connection-mark="conn-VPNE" passthrough=yes',
//             'add action=mark-routing chain=output comment="VPN Endpoint" connection-mark="conn-VPNE" dst-address-list="VPNE" new-routing-mark="to-Foreign" passthrough=no',
//             'add action=mark-routing chain=output comment="VPN Endpoint" dst-address-list="VPNE" new-routing-mark="to-Foreign" passthrough=no',
            
//             // Output Special
//             'add action=mark-routing chain=output comment="S4I Route" content="s4i.co" new-routing-mark="to-Foreign" passthrough=no',
//             'add action=mark-routing chain=output comment="S4I Route" src-address=192.168.39.12 new-routing-mark="to-Foreign" passthrough=no',
//             'add action=mark-routing chain=output dst-address-list="MikroTik-Cloud-Services" new-routing-mark="to-Domestic" passthrough=no comment="Force IP/Cloud DDNS traffic via Domestic WAN"',
//             'add action=mark-routing chain=output dst-address-list="MikroTik-Cloud-Services" protocol="udp" dst-port="15252" new-routing-mark="to-Domestic" passthrough=no comment="Force IP/Cloud DDNS traffic via Domestic WAN"',
            
//             // Games
//             'add action=mark-connection chain=prerouting dst-address-list="Domestic-IP-Games" new-connection-mark="Domestic-conn-Games" passthrough=yes src-address-list="Split-LAN" comment="Routing Games to Domestic"',
//             'add action=mark-routing chain=prerouting connection-mark="Domestic-conn-Games" new-routing-mark="to-Domestic" passthrough=no src-address-list="Split-LAN" comment="Routing Games to Domestic"',
            
//             // Split
//             'add action=mark-routing chain=prerouting comment="Split-VPN" dst-address-list="SplitVPNAddList" new-routing-mark="to-VPN" passthrough=no src-address-list="Split-LAN"',
//             'add action=mark-routing chain=prerouting comment="Split-FRN" dst-address-list="SplitFRNAddList" new-routing-mark="to-Foreign" passthrough=no src-address-list="Split-LAN"',
//             'add action=mark-routing chain=prerouting comment="Split-DOM" dst-address-list="SplitDOMAddList" new-routing-mark="to-Domestic" passthrough=no src-address-list="Split-LAN"',
//             'add action=mark-connection chain=forward comment="Split-DOM" dst-address-list="DOMAddList" new-connection-mark="conn-Split-DOM" passthrough=yes src-address-list="Split-LAN"',
//             'add action=mark-routing chain=prerouting comment="Split-DOM" connection-mark="conn-Split-DOM" dst-address-list="DOMAddList" new-routing-mark="to-Domestic" passthrough=no src-address-list="Split-LAN"',
//             'add action=mark-connection chain=forward comment="Split-!DOM" dst-address-list="!DOMAddList" new-connection-mark="conn-Split-!DOM" passthrough=yes src-address-list="Split-LAN"',
//             'add action=mark-routing chain=prerouting comment="Split-!DOM" connection-mark="conn-Split-!DOM" dst-address-list="!DOMAddList" new-routing-mark="to-VPN" passthrough=no src-address-list="Split-LAN"',
            
//             // Network Routing - Domestic
//             'add action=mark-connection chain=forward comment="Domestic Connection" new-connection-mark="conn-Domestic" passthrough=yes src-address-list="Domestic-LAN"',
//             'add action=mark-routing chain=prerouting comment="Domestic Routing" connection-mark="conn-Domestic" new-routing-mark="to-Domestic" passthrough=no src-address-list="Domestic-LAN"',
            
//             // Network Routing - Domestic with NTH Load Balancing
//             'add action=mark-connection chain=prerouting in-interface="pppoe-client-Fiber1" new-connection-mark="pppoe-client-Fiber1-conn" passthrough=yes comment="Domestic - NTH LOAD BALANCING - Mark pppoe-client-Fiber1 connections"',
//             'add action=mark-connection chain=prerouting in-interface="pppoe-client-Fiber2" new-connection-mark="pppoe-client-Fiber2-conn" passthrough=yes comment="Domestic - NTH LOAD BALANCING - Mark pppoe-client-Fiber2 connections"',
//             'add action=mark-routing chain=output connection-mark="pppoe-client-Fiber1-conn" new-routing-mark="to-Domestic" passthrough=yes comment="Domestic - NTH LOAD BALANCING - Mark pppoe-client-Fiber1 routing"',
//             'add action=mark-routing chain=output connection-mark="pppoe-client-Fiber2-conn" new-routing-mark="to-Domestic" passthrough=yes comment="Domestic - NTH LOAD BALANCING - Mark pppoe-client-Fiber2 routing"',
//             'add action=mark-connection chain=prerouting new-connection-mark="pppoe-client-Fiber1-conn" passthrough=yes connection-state=new dst-address-list="!LOCAL-IP" src-address-list="Domestic-LAN" nth=8,1 comment="Domestic - NTH LOAD BALANCING - Mark pppoe-client-Fiber1 connections"',
//             'add action=mark-connection chain=prerouting new-connection-mark="pppoe-client-Fiber2-conn" passthrough=yes connection-state=new dst-address-list="!LOCAL-IP" src-address-list="Domestic-LAN" nth=8,2 comment="Domestic - NTH LOAD BALANCING - Mark pppoe-client-Fiber2 connections"',
//             'add action=mark-routing chain=prerouting connection-mark="pppoe-client-Fiber1-conn" new-routing-mark="to-Domestic" passthrough=yes dst-address-list="!LOCAL-IP" src-address-list="Domestic-LAN" comment="Domestic - NTH LOAD BALANCING - Mark pppoe-client-Fiber1 routing"',
//             'add action=mark-routing chain=prerouting connection-mark="pppoe-client-Fiber2-conn" new-routing-mark="to-Domestic" passthrough=yes dst-address-list="!LOCAL-IP" src-address-list="Domestic-LAN" comment="Domestic - NTH LOAD BALANCING - Mark pppoe-client-Fiber2 routing"',
            
//             // Network Routing - Foreign
//             'add action=mark-connection chain=forward comment="Foreign Connection" new-connection-mark="conn-Foreign" passthrough=yes src-address-list="Foreign-LAN"',
//             'add action=mark-routing chain=prerouting comment="Foreign Routing" connection-mark="conn-Foreign" new-routing-mark="to-Foreign" passthrough=no src-address-list="Foreign-LAN"',
            
//             // Network Routing - VPN
//             'add action=mark-connection chain=forward comment="VPN Connection" new-connection-mark="conn-VPN" passthrough=yes src-address-list="VPN-LAN"',
//             'add action=mark-routing chain=prerouting comment="VPN Routing" connection-mark="conn-VPN" new-routing-mark="to-VPN" passthrough=no src-address-list="VPN-LAN"',
            
//             // VPN Server Inbound + SSH
//             'add action=mark-connection chain=input comment="Mark incoming SSH connections from Split Network" connection-state=new dst-port="22" in-interface-list="Domestic-WAN" new-connection-mark="ssh-conn-foreign" passthrough=yes protocol="tcp"',
//             'add action=mark-connection chain=input comment="Mark Inbound PPTP Connections" connection-state=new in-interface-list="Domestic-WAN" protocol="tcp" dst-port="1723" new-connection-mark="conn-vpn-server" passthrough=yes',
//             'add action=mark-connection chain=input comment="Mark Inbound L2TP Connections" connection-state=new in-interface-list="Domestic-WAN" protocol="udp" dst-port="1701" new-connection-mark="conn-vpn-server" passthrough=yes',
//             'add action=mark-connection chain=input comment="Mark Inbound WireGuard Connections (wg-server-wg-server-1)" connection-state=new in-interface-list="Domestic-WAN" protocol="udp" dst-port="51820" new-connection-mark="conn-vpn-server" passthrough=yes',
//             'add action=mark-routing chain=output comment="Route VPN Server Replies via Domestic WAN" connection-mark="conn-vpn-server" new-routing-mark="to-Domestic" passthrough=no',
//             'add action=mark-routing chain=preroute comment="Route SSH traffic via Foreign WAN" connection-mark="ssh-conn-foreign" new-routing-mark="to-Foreign" passthrough=no',
//             'add action=mark-routing chain=output comment="Route SSH replies via Foreign WAN" connection-mark="ssh-conn-foreign" new-routing-mark="to-Foreign" passthrough=no',
//         ];

//         const sorted = sortMangleRules(rules);

//         // Verify priority groups are in correct order
//         const priorities = sorted.map(rule => {
//             const comment = extractComment(rule);
//             return getManglePriority(rule, comment);
//         });

//         // Check that priorities are in ascending order
//         for (let i = 0; i < priorities.length - 1; i++) {
//             expect(priorities[i]).toBeLessThanOrEqual(priorities[i + 1]);
//         }

//         // Verify specific rules
//         const comments = sorted.map(rule => extractComment(rule));
        
//         // Accept rules should be first (5 rules)
//         expect(comments[0]).toBe("Accept");
//         expect(comments[4]).toBe("Accept");
        
//         // VPN Endpoint should come after Accept
//         expect(comments[5]).toBe("VPN Endpoint");
//         expect(comments[7]).toBe("VPN Endpoint");
        
//         // Output Special (S4I, Cloud DDNS) after VPN Endpoint
//         expect(comments[8]).toContain("S4I");
        
//         // Games after Output Special
//         expect(comments.findIndex(c => c.includes("Routing Games"))).toBeGreaterThan(11);
        
//         // Network Routing after Games and Split
//         const domesticConnIndex = comments.findIndex(c => c === "Domestic Connection");
//         const gamesIndex = comments.findIndex(c => c.includes("Routing Games"));
//         expect(domesticConnIndex).toBeGreaterThan(gamesIndex);
        
//         // NTH Load Balancing should come after regular Domestic Connection/Routing
//         const domesticRoutingIndex = comments.findIndex(c => c === "Domestic Routing");
//         const nthIndex = comments.findIndex(c => c.includes("NTH LOAD BALANCING"));
//         expect(nthIndex).toBeGreaterThan(domesticRoutingIndex);
        
//         // VPN Server + SSH should be last
//         const sshIndex = comments.findIndex(c => c.includes("SSH"));
//         const vpnServerIndex = comments.findIndex(c => c.includes("VPN Server"));
//         expect(sshIndex).toBeGreaterThan(nthIndex);
//         expect(vpnServerIndex).toBeGreaterThan(sshIndex);
//     });

//     it("should extract comment correctly", () => {
//         expect(extractComment('add comment="Test Comment" action=accept')).toBe("Test Comment");
//         expect(extractComment('add comment=TestComment action=accept')).toBe("TestComment");
//         expect(extractComment('add action=accept')).toBe("");
//     });

//     it("should extract chain correctly", () => {
//         expect(extractChain('add chain=prerouting action=accept')).toBe("prerouting");
//         expect(extractChain('add chain=output action=mark-routing')).toBe("output");
//         expect(extractChain('add action=accept')).toBe("");
//     });

//     it("should extract connection marks correctly", () => {
//         const result1 = extractConnectionMark('add new-connection-mark="conn-test" passthrough=yes');
//         expect(result1.newMark).toBe("conn-test");
//         expect(result1.connectionMark).toBe("");

//         const result2 = extractConnectionMark('add connection-mark="conn-test" new-routing-mark="to-test"');
//         expect(result2.newMark).toBe("");
//         expect(result2.connectionMark).toBe("conn-test");

//         const result3 = extractConnectionMark('add new-connection-mark=conn-test connection-mark=old-conn');
//         expect(result3.newMark).toBe("conn-test");
//         expect(result3.connectionMark).toBe("old-conn");
//     });

//     it("should detect load balancing type", () => {
//         expect(getLoadBalancingType("", "Domestic - NTH LOAD BALANCING - Test")).toBe("NTH");
//         expect(getLoadBalancingType("", "Foreign - PCC LOAD BALANCING - Test")).toBe("PCC");
//         expect(getLoadBalancingType("", "Regular connection")).toBe("");
//     });

//     it("should extract network from comment", () => {
//         expect(getNetworkFromComment("Domestic Connection")).toBe("Domestic");
//         expect(getNetworkFromComment("Foreign Routing")).toBe("Foreign");
//         expect(getNetworkFromComment("VPN Connection")).toBe("VPN");
//         expect(getNetworkFromComment("Something else")).toBe("");
//     });

//     it("should classify mangle priorities correctly", () => {
//         expect(getManglePriority(
//             'add action=accept chain=prerouting comment="Accept" dst-address-list="LOCAL-IP"',
//             "Accept"
//         )).toBe(ManglePriority.Accept);

//         expect(getManglePriority(
//             'add action=mark-connection chain=output comment="VPN Endpoint"',
//             "VPN Endpoint"
//         )).toBe(ManglePriority.VPNEndpoint);

//         expect(getManglePriority(
//             'add action=mark-routing chain=output comment="S4I Route"',
//             "S4I Route"
//         )).toBe(ManglePriority.OutputSpecial);

//         expect(getManglePriority(
//             'add action=mark-connection chain=prerouting comment="Routing Games to Domestic"',
//             "Routing Games to Domestic"
//         )).toBe(ManglePriority.Games);

//         expect(getManglePriority(
//             'add action=mark-routing chain=prerouting comment="Split-VPN"',
//             "Split-VPN"
//         )).toBe(ManglePriority.Split);

//         expect(getManglePriority(
//             'add action=mark-connection chain=forward comment="Domestic Connection"',
//             "Domestic Connection"
//         )).toBe(ManglePriority.NetworkRouting);

//         expect(getManglePriority(
//             'add action=mark-connection chain=prerouting comment="Domestic - NTH LOAD BALANCING - Test"',
//             "Domestic - NTH LOAD BALANCING - Test"
//         )).toBe(ManglePriority.NetworkRouting);

//         expect(getManglePriority(
//             'add action=mark-connection chain=input comment="Mark incoming SSH connections"',
//             "Mark incoming SSH connections"
//         )).toBe(ManglePriority.VPNServerInbound);

//         expect(getManglePriority(
//             'add action=mark-connection chain=input comment="Mark Inbound PPTP Connections"',
//             "Mark Inbound PPTP Connections"
//         )).toBe(ManglePriority.VPNServerInbound);
//     });

//     it("should order NTH load balancing rules correctly within network routing", () => {
//         const nthRules = [
//             'add action=mark-routing chain=prerouting connection-mark="pppoe-client-Fiber1-conn" comment="Domestic - NTH LOAD BALANCING - Mark pppoe-client-Fiber1 routing"',
//             'add action=mark-connection chain=prerouting nth=8,1 comment="Domestic - NTH LOAD BALANCING - Mark pppoe-client-Fiber1 connections"',
//             'add action=mark-routing chain=output connection-mark="pppoe-client-Fiber1-conn" comment="Domestic - NTH LOAD BALANCING - Mark pppoe-client-Fiber1 routing"',
//             'add action=mark-connection chain=prerouting in-interface="pppoe-client-Fiber1" comment="Domestic - NTH LOAD BALANCING - Mark pppoe-client-Fiber1 connections"',
//         ];

//         const sorted = sortMangleRules(nthRules);
        
//         // Expected order:
//         // 1. mark-connection chain=prerouting in-interface
//         // 2. mark-routing chain=output
//         // 3. mark-connection chain=prerouting nth=
//         // 4. mark-routing chain=prerouting
        
//         expect(sorted[0]).toContain('in-interface="pppoe-client-Fiber1"');
//         expect(sorted[1]).toContain('chain=output');
//         expect(sorted[2]).toContain('nth=8,1');
//         expect(sorted[3]).toContain('chain=prerouting connection-mark');
//     });

//     it("should order VPN Server and SSH rules correctly", () => {
//         const vpnRules = [
//             'add action=mark-routing chain=output comment="Route VPN Server Replies via Domestic WAN" connection-mark="conn-vpn-server"',
//             'add action=mark-routing chain=output comment="Route SSH replies via Foreign WAN" connection-mark="ssh-conn-foreign"',
//             'add action=mark-connection chain=input comment="Mark Inbound PPTP Connections" new-connection-mark="conn-vpn-server"',
//             'add action=mark-routing chain=preroute comment="Route SSH traffic via Foreign WAN" connection-mark="ssh-conn-foreign"',
//             'add action=mark-connection chain=input comment="Mark incoming SSH connections from Split Network" new-connection-mark="ssh-conn-foreign"',
//         ];

//         const sorted = sortMangleRules(vpnRules);
        
//         // Expected order:
//         // 1. SSH input marking
//         // 2. SSH preroute routing
//         // 3. SSH output routing
//         // 4. VPN inbound marking
//         // 5. VPN output routing
        
//         expect(sorted[0]).toContain("Mark incoming SSH connections");
//         expect(sorted[1]).toContain("Route SSH traffic via Foreign WAN");
//         expect(sorted[1]).toContain("chain=preroute");
//         expect(sorted[2]).toContain("Route SSH replies");
//         expect(sorted[2]).toContain("chain=output");
//         expect(sorted[3]).toContain("Mark Inbound PPTP");
//         expect(sorted[4]).toContain("Route VPN Server Replies");
//     });
// });

