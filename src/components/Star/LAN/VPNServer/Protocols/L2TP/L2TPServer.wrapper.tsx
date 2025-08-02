import { component$ } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import { L2TPServerAdvanced } from "./L2TPServerAdvanced";
import { L2TPServerEasy } from "./L2TPServerEasy";
import type { Mode } from "../../../../StarContext/ChooseType";

export const L2TPServerWrapper = component$(() => {
  const starContext = useContext(StarContext);
  const mode = starContext.state.Choose.Mode as Mode;

  return <>{mode === "easy" ? <L2TPServerEasy /> : <L2TPServerAdvanced />}</>;
});
