import { component$, $ } from "@builder.io/qwik";
import { LuShield, LuLock } from "@qwikest/icons/lucide";
import { Badge, Graph, createNode } from "~/components/Core";
import type { GraphConnection, GraphNode } from "~/components/Core/Graph/types";

export const VPNClientSection = component$(() => {
  // Create nodes for the VPN graph
  const nodes: GraphNode[] = [
    createNode("User", "client", 50, 200, { label: $localize`Your Device` }),
    createNode("WirelessRouter", "router", 150, 200, {
      label: $localize`Router`,
    }),
    createNode("VPNClient", "vpnclient", 250, 200, {
      label: $localize`VPN Client`,
    }),
    createNode("VPNServer", "vpnserver", 350, 200, {
      label: $localize`VPN Server`,
    }),
    createNode("ForeignWAN", "internet", 450, 200, {
      label: $localize`Internet`,
    }),
  ];

  // Create connections showing VPN tunnel
  const connections: GraphConnection[] = [
    {
      from: "client",
      to: "router",
      color: "#6366f1",
      animated: true,
      label: $localize`Local Connection`,
    },
    {
      from: "router",
      to: "vpnclient",
      color: "#6366f1",
      animated: true,
      label: $localize`To VPN`,
    },
    {
      from: "vpnclient",
      to: "vpnserver",
      trafficType: "VPN",
      animated: true,
      label: $localize`Encrypted Tunnel`,
      width: 4,
      packetColors: ["#22c55e", "#3b82f6", "#8b5cf6"],
    },
    {
      from: "vpnserver",
      to: "internet",
      color: "#10b981",
      animated: true,
      label: $localize`Secure Connection`,
      arrowHead: true,
    },
  ];

  // Graph configuration
  const graphConfig = {
    width: "100%",
    height: "400px",
    viewBox: "0 0 500 400",
    showLegend: true,
    expandOnHover: true,
    legendItems: [
      { color: "#6366f1", label: $localize`Local Traffic` },
      { color: "#f97316", label: $localize`VPN Tunnel` },
      { color: "#10b981", label: $localize`Protected Traffic` },
    ],
  };

  const handleNodeClick$ = $((node: GraphNode) => {
    console.log("Clicked on VPN component:", node.label);
  });

  return (
    <section class="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-50 px-4 py-24 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900">
      {/* Cyber security grid pattern */}
      <div class="absolute inset-0 opacity-20">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div class="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,#6366f11a_49%,#6366f11a_51%,transparent_52%)] bg-[size:20px_20px]" />
      </div>

      {/* Encrypted data streams */}
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute left-1/4 top-0 h-full w-px animate-pulse bg-gradient-to-b from-transparent via-indigo-500 to-transparent opacity-30" />
        <div class="absolute right-1/4 top-0 h-full w-px animate-pulse bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-30 animation-delay-2000" />
        <div class="absolute left-1/2 top-0 h-full w-px animate-pulse bg-gradient-to-b from-transparent via-violet-500 to-transparent opacity-30 animation-delay-4000" />
      </div>

      {/* Binary code rain effect */}
      <div class="absolute inset-0 opacity-5">
        <div class="absolute left-10 top-0 animate-slide-down font-mono text-xs text-indigo-500">
          10110101
          <br />
          01011010
          <br />
          11001101
        </div>
        <div class="absolute left-1/3 top-0 animate-slide-down font-mono text-xs text-purple-500 animation-delay-2000">
          01101110
          <br />
          10011001
          <br />
          01110101
        </div>
        <div class="absolute right-1/3 top-0 animate-slide-down font-mono text-xs text-violet-500 animation-delay-3000">
          11010110
          <br />
          00101101
          <br />
          10110011
        </div>
        <div class="absolute right-10 top-0 animate-slide-down font-mono text-xs text-blue-500 animation-delay-4000">
          01011101
          <br />
          11001010
          <br />
          01101101
        </div>
      </div>

      {/* Lock icons floating */}
      <div class="absolute inset-0">
        <div class="absolute left-1/3 top-1/4 animate-float text-indigo-400 opacity-10">
          <svg class="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="absolute bottom-1/3 right-1/4 animate-float text-purple-400 opacity-10 animation-delay-2000">
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div class="relative z-10 mx-auto max-w-7xl">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          {/* Visual Side - Interactive VPN Graph */}
          <div class="animate-fade-in-left relative order-2 lg:order-1">
            <div class="rounded-2xl bg-white/80 p-4 shadow-2xl backdrop-blur-lg dark:bg-black/40">
              <Graph
                nodes={nodes}
                connections={connections}
                title={$localize`VPN Connection Flow`}
                config={graphConfig}
                onNodeClick$={handleNodeClick$}
              />
            </div>
            <div class="mt-4 flex justify-center gap-6">
              <div class="flex items-center gap-2">
                <LuShield class="h-5 w-5 text-indigo-500" />
                <span class="text-sm text-gray-700 dark:text-gray-300">{$localize`Military-grade Encryption`}</span>
              </div>
              <div class="flex items-center gap-2">
                <LuLock class="h-5 w-5 text-purple-500" />
                <span class="text-sm text-gray-700 dark:text-gray-300">{$localize`Secure Tunnel`}</span>
              </div>
              <div class="flex items-center gap-2">
                <LuLock class="h-5 w-5 text-blue-500" />
                <span class="text-sm text-gray-700 dark:text-gray-300">{$localize`Privacy Protected`}</span>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div class="animate-fade-in-right order-1 space-y-6 lg:order-2">
            <Badge color="primary" variant="outline" size="lg">
              {$localize`Privacy & Security`}
            </Badge>

            <h2 class="text-4xl font-bold md:text-5xl lg:text-6xl">
              <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {$localize`VPN Client`}
              </span>
              <br />
              <span class="text-gray-900 dark:text-white">
                {$localize`Protection`}
              </span>
            </h2>

            <p class="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              {$localize`Military-grade encryption with 6 VPN protocols. Enhanced privacy, secure connections, and anonymous browsing capabilities for all your devices.`}
            </p>

            <div class="grid grid-cols-3 gap-3">
              {[
                "WireGuard",
                "OpenVPN",
                "L2TP/IPSec",
                "PPTP",
                "SSTP",
                "IKEv2",
              ].map((protocol) => (
                <div
                  key={protocol}
                  class="rounded-lg bg-white/50 p-3 text-center dark:bg-black/50"
                >
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">
                    {protocol}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
