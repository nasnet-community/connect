/**
 * Shared hook for common VPN Server logic
 * This hook can be extended to contain shared functionality between Easy and Advanced modes
 */
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";

export const useVPNServer = () => {
  const starContext = useContext(StarContext);
  
  return {
    starContext,
    vpnServerState: starContext.state.LAN.VPNServer || { Users: [], SelectedNetworks: ["VPN"] },
  };
};