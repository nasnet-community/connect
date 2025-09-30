import { component$ } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import { ZeroTierServerAdvanced } from "./ZeroTierServerAdvanced";
import { ZeroTierServerEasy } from "./ZeroTierServerEasy";
import type { Mode } from "../../../../StarContext/ChooseType";

export const ZeroTierServerWrapper = component$(() => {
  const starContext = useContext(StarContext);
  const mode = starContext.state.Choose.Mode as Mode;

  return <>{mode === "easy" ? <ZeroTierServerEasy /> : <ZeroTierServerAdvanced />}</>;
});