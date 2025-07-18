import { component$ } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import { SSTPServerAdvanced } from "./SSTPServerAdvanced";
import { SSTPServerEasy } from "./SSTPServerEasy";
import type { Mode } from "../../../../StarContext/ChooseType";

export const SSTPServerWrapper = component$(() => {
  const starContext = useContext(StarContext);
  const mode = starContext.state.Choose.Mode as Mode;

  return (
    <>
      {mode === "easy" ? <SSTPServerEasy /> : <SSTPServerAdvanced />}
    </>
  );
}); 