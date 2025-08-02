import {
  useContext,
  $,
  useSignal,
  useStore,
  useComputed$,
} from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";
import type {
  EoipTunnelConfig,
  GreTunnelConfig,
  IpipTunnelConfig,
  VxlanInterfaceConfig,
} from "../../StarContext/Utils/TunnelType";
import type { PropFunction } from "@builder.io/qwik";
import type { TunnelStepperData } from "./types";
import { useCStepper } from "~/components/Core/Stepper/CStepper";

export const useTunnel = () => {
  const starContext = useContext(StarContext);
  const tunnelState = starContext.state.LAN.Tunnel || {};

  // Check if tunnels are already configured and set default enabled state accordingly
  const hasTunnelsConfigured = !!(
    tunnelState.IPIP?.length ||
    tunnelState.Eoip?.length ||
    tunnelState.Gre?.length ||
    tunnelState.Vxlan?.length
  );

  // Tunnel enabled state - default false unless tunnels are already configured
  const tunnelsEnabled = useSignal(hasTunnelsConfigured);

  // IPIP tunnels
  const ipipTunnels = useStore<IpipTunnelConfig[]>(
    tunnelState.IPIP?.length ? [...tunnelState.IPIP] : [],
  );

  // EOIP tunnels
  const eoipTunnels = useStore<EoipTunnelConfig[]>(
    tunnelState.Eoip?.length ? [...tunnelState.Eoip] : [],
  );

  // GRE tunnels
  const greTunnels = useStore<GreTunnelConfig[]>(
    tunnelState.Gre?.length ? [...tunnelState.Gre] : [],
  );

  // VXLAN tunnels
  const vxlanTunnels = useStore<VxlanInterfaceConfig[]>(
    tunnelState.Vxlan?.length ? [...tunnelState.Vxlan] : [],
  );

  // Save tunnel settings
  const saveTunnels = $((onComplete$?: PropFunction<() => void>) => {
    if (tunnelsEnabled.value) {
      starContext.updateLAN$({
        Tunnel: {
          IPIP: ipipTunnels.length > 0 ? [...ipipTunnels] : undefined,
          Eoip: eoipTunnels.length > 0 ? [...eoipTunnels] : undefined,
          Gre: greTunnels.length > 0 ? [...greTunnels] : undefined,
          Vxlan: vxlanTunnels.length > 0 ? [...vxlanTunnels] : undefined,
        },
      });
    } else {
      starContext.updateLAN$({
        Tunnel: {
          IPIP: undefined,
          Eoip: undefined,
          Gre: undefined,
          Vxlan: undefined,
        },
      });
    }

    if (onComplete$) {
      onComplete$();
    }
  });

  // IPIP tunnel functions
  const addIpipTunnel = $(() => {
    ipipTunnels.push({
      name: `ipip-tunnel-${ipipTunnels.length + 1}`,
      type: "ipip",
      localAddress: "",
      remoteAddress: "",
      mtu: 1500,
      dscp: 0,
      keepalive: "",
    });
  });

  const removeIpipTunnel = $((index: number) => {
    if (index >= 0 && index < ipipTunnels.length) {
      ipipTunnels.splice(index, 1);
    }
  });

  const updateIpipTunnel = $(
    <K extends keyof IpipTunnelConfig>(
      index: number,
      property: K,
      value: IpipTunnelConfig[K],
    ) => {
      if (index >= 0 && index < ipipTunnels.length) {
        ipipTunnels[index][property] = value;
      }
    },
  );

  // EOIP tunnel functions
  const addEoipTunnel = $(() => {
    eoipTunnels.push({
      name: `eoip-tunnel-${eoipTunnels.length + 1}`,
      type: "eoip",
      localAddress: "",
      remoteAddress: "",
      tunnelId: Math.floor(Math.random() * 1000),
      mtu: 1500,
      arp: "enabled",
      clampTcpMss: false,
    });
  });

  const removeEoipTunnel = $((index: number) => {
    if (index >= 0 && index < eoipTunnels.length) {
      eoipTunnels.splice(index, 1);
    }
  });

  const updateEoipTunnel = $(
    <K extends keyof EoipTunnelConfig>(
      index: number,
      property: K,
      value: EoipTunnelConfig[K],
    ) => {
      if (index >= 0 && index < eoipTunnels.length) {
        eoipTunnels[index][property] = value;
      }
    },
  );

  // GRE tunnel functions
  const addGreTunnel = $(() => {
    greTunnels.push({
      name: `gre-tunnel-${greTunnels.length + 1}`,
      type: "gre",
      localAddress: "",
      remoteAddress: "",
      mtu: 1476,
      dscp: 0,
      keepalive: "",
    });
  });

  const removeGreTunnel = $((index: number) => {
    if (index >= 0 && index < greTunnels.length) {
      greTunnels.splice(index, 1);
    }
  });

  const updateGreTunnel = $(
    <K extends keyof GreTunnelConfig>(
      index: number,
      property: K,
      value: GreTunnelConfig[K],
    ) => {
      if (index >= 0 && index < greTunnels.length) {
        greTunnels[index][property] = value;
      }
    },
  );

  // VXLAN tunnel functions
  const addVxlanTunnel = $(() => {
    vxlanTunnels.push({
      name: `vxlan-tunnel-${vxlanTunnels.length + 1}`,
      type: "vxlan",
      localAddress: "",
      remoteAddress: "",
      vni: Math.floor(Math.random() * 16777215),
      port: 4789,
      mtu: 1450,
      bumMode: "unicast",
    });
  });

  const removeVxlanTunnel = $((index: number) => {
    if (index >= 0 && index < vxlanTunnels.length) {
      vxlanTunnels.splice(index, 1);
    }
  });

  const updateVxlanTunnel = $(
    <K extends keyof VxlanInterfaceConfig>(
      index: number,
      property: K,
      value: VxlanInterfaceConfig[K],
    ) => {
      if (index >= 0 && index < vxlanTunnels.length) {
        vxlanTunnels[index][property] = value;
      }
    },
  );

  // Validation
  const isIPIPTunnelsValid = useComputed$(() => {
    if (!tunnelsEnabled.value || ipipTunnels.length === 0) return true;

    return ipipTunnels.every(
      (tunnel) => tunnel.name && tunnel.localAddress && tunnel.remoteAddress,
    );
  });

  const isEOIPTunnelsValid = useComputed$(() => {
    if (!tunnelsEnabled.value || eoipTunnels.length === 0) return true;

    return eoipTunnels.every(
      (tunnel) =>
        tunnel.name &&
        tunnel.localAddress &&
        tunnel.remoteAddress &&
        tunnel.tunnelId !== undefined,
    );
  });

  const isGRETunnelsValid = useComputed$(() => {
    if (!tunnelsEnabled.value || greTunnels.length === 0) return true;

    return greTunnels.every(
      (tunnel) => tunnel.name && tunnel.localAddress && tunnel.remoteAddress,
    );
  });

  const isVXLANTunnelsValid = useComputed$(() => {
    if (!tunnelsEnabled.value || vxlanTunnels.length === 0) return true;

    return vxlanTunnels.every(
      (tunnel) =>
        tunnel.name &&
        tunnel.localAddress &&
        tunnel.remoteAddress &&
        tunnel.vni !== undefined,
    );
  });

  // Check if the form is valid
  const isValid = useComputed$(() => {
    if (!tunnelsEnabled.value) return true;

    // At least one tunnel type should be configured
    const hasTunnels =
      ipipTunnels.length > 0 ||
      eoipTunnels.length > 0 ||
      greTunnels.length > 0 ||
      vxlanTunnels.length > 0;

    // Check IPIP tunnels validity
    const validIpip = ipipTunnels.every(
      (tunnel) => tunnel.name && tunnel.localAddress && tunnel.remoteAddress,
    );

    // Check EOIP tunnels validity
    const validEoip = eoipTunnels.every(
      (tunnel) =>
        tunnel.name &&
        tunnel.localAddress &&
        tunnel.remoteAddress &&
        tunnel.tunnelId !== undefined,
    );

    // Check GRE tunnels validity
    const validGre = greTunnels.every(
      (tunnel) => tunnel.name && tunnel.localAddress && tunnel.remoteAddress,
    );

    // Check VXLAN tunnels validity
    const validVxlan = vxlanTunnels.every(
      (tunnel) =>
        tunnel.name &&
        tunnel.localAddress &&
        tunnel.remoteAddress &&
        tunnel.vni !== undefined,
    );

    return hasTunnels && validIpip && validEoip && validGre && validVxlan;
  });

  // Create initial tunnel data
  const tunnelData: TunnelStepperData = {
    tunnelEnabled: useSignal(false),
    ipip: [],
    eoip: [],
    gre: [],
    vxlan: [],
  };

  // Create stepper
  const stepper = useCStepper({
    activeStep: 0,
    steps: [
      {
        id: 0,
        title: "Enable Tunnels",
        description: "Enable tunnel configuration",
        component: null,
        isComplete: false,
      },
      {
        id: 1,
        title: "IPIP Tunnels",
        description: "Configure IP over IP tunnels",
        component: null,
        isComplete: false,
      },
      {
        id: 2,
        title: "EOIP Tunnels",
        description: "Configure Ethernet over IP tunnels",
        component: null,
        isComplete: false,
      },
      {
        id: 3,
        title: "GRE Tunnels",
        description: "Configure Generic Routing Encapsulation tunnels",
        component: null,
        isComplete: false,
      },
      {
        id: 4,
        title: "VXLAN Tunnels",
        description: "Configure Virtual Extensible LAN tunnels",
        component: null,
        isComplete: false,
      },
      {
        id: 5,
        title: "Summary",
        description: "Review your tunnel configuration",
        component: null,
        isComplete: false,
      },
    ],
  });

  return {
    tunnelsEnabled,
    ipipTunnels,
    eoipTunnels,
    greTunnels,
    vxlanTunnels,
    isValid,
    isIPIPTunnelsValid,
    isEOIPTunnelsValid,
    isGRETunnelsValid,
    isVXLANTunnelsValid,

    saveTunnels,

    addIpipTunnel,
    removeIpipTunnel,
    updateIpipTunnel,

    addEoipTunnel,
    removeEoipTunnel,
    updateEoipTunnel,

    addGreTunnel,
    removeGreTunnel,
    updateGreTunnel,

    addVxlanTunnel,
    removeVxlanTunnel,
    updateVxlanTunnel,

    stepper,
    tunnelData,
  };
};
