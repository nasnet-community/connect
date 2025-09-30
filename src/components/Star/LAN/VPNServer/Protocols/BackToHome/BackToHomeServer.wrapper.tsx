import { component$ } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import { BackToHomeServerAdvanced } from "./BackToHomeServerAdvanced";
import { BackToHomeServerEasy } from "./BackToHomeServerEasy";
import type { Mode } from "../../../../StarContext/ChooseType";

export const BackToHomeServerWrapper = component$(() => {
  const starContext = useContext(StarContext);
  const mode = starContext.state.Choose.Mode as Mode;

  return <>{mode === "easy" ? <BackToHomeServerEasy /> : <BackToHomeServerAdvanced />}</>;
});