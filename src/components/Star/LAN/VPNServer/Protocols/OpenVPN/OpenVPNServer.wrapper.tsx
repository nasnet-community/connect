import { component$ } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import { OpenVPNServerAdvanced } from "./OpenVPNServerAdvanced";
import { OpenVPNServerEasy } from "./OpenVPNServerEasy";
import type { Mode } from "../../../../StarContext/ChooseType";

export const OpenVPNServerWrapper = component$(() => {
  const starContext = useContext(StarContext);
  const mode = starContext.state.Choose.Mode as Mode;

  return (
    <>{mode === "easy" ? <OpenVPNServerEasy /> : <OpenVPNServerAdvanced />}</>
  );
});
