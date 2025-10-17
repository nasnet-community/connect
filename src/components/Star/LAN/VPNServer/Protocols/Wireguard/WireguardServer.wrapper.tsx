import { component$ } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import { WireguardServerAdvanced } from "./WireguardServerAdvanced";
import { WireguardServerEasy } from "./WireguardServerEasy";
import type { Mode } from "../../../../StarContext/ChooseType";
import { useWireguardServer } from "./useWireguardServer";

interface WireguardServerWrapperProps {
  hook?: ReturnType<typeof useWireguardServer>;
}

export const WireguardServerWrapper = component$<WireguardServerWrapperProps>(({ hook }) => {
  const starContext = useContext(StarContext);
  const mode = starContext.state.Choose.Mode as Mode;

  // Use provided hook for Advanced mode, Easy mode creates its own
  const defaultHook = useWireguardServer();
  const wireguardHook = hook ?? defaultHook;

  return (
    <>
      {mode === "easy" ? <WireguardServerEasy /> : <WireguardServerAdvanced hook={wireguardHook} />}
    </>
  );
});
