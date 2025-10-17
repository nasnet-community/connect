import { component$ } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import { OpenVPNServerAdvanced } from "./OpenVPNServerAdvanced";
import { OpenVPNServerEasy } from "./OpenVPNServerEasy";
import type { Mode } from "../../../../StarContext/ChooseType";
import { useOpenVPNServer } from "./useOpenVPNServer";

interface OpenVPNServerWrapperProps {
  hook?: ReturnType<typeof useOpenVPNServer>;
}

export const OpenVPNServerWrapper = component$<OpenVPNServerWrapperProps>(({ hook }) => {
  const starContext = useContext(StarContext);
  const mode = starContext.state.Choose.Mode as Mode;

  // Use provided hook for Advanced mode, Easy mode creates its own
  const openVpnHook = hook || useOpenVPNServer();

  return (
    <>{mode === "easy" ? <OpenVPNServerEasy /> : <OpenVPNServerAdvanced hook={openVpnHook} />}</>
  );
});
