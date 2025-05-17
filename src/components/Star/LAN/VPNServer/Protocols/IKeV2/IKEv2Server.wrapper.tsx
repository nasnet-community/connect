import { component$ } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import { IKEv2ServerAdvanced } from "./IKEv2ServerAdvanced";
import { IKEv2ServerEasy } from "./IKEv2ServerEasy";
import type { Mode } from "../../../../StarContext/ChooseType";

export const IKEv2ServerWrapper = component$(() => {
  const starContext = useContext(StarContext);
  const mode = starContext.state.Choose.Mode as Mode;

  return (
    <>
      {mode === "easy" ? <IKEv2ServerEasy /> : <IKEv2ServerAdvanced />}
    </>
  );
}); 