import { component$ } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import { WireguardServerAdvanced } from "./WireguardServerAdvanced";
import { WireguardServerEasy } from "./WireguardServerEasy";
import type { Mode } from "../../../../StarContext/ChooseType";

export const WireguardServerWrapper = component$(() => {
  const starContext = useContext(StarContext);
  const mode = starContext.state.Choose.Mode as Mode;

  return (
    <>
      {mode === "easy" ? <WireguardServerEasy /> : <WireguardServerAdvanced />}
    </>
  );
});
