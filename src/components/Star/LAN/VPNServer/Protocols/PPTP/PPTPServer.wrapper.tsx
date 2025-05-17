import { component$ } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import { PPTPServerAdvanced } from "./PPTPServerAdvanced";
import { PPTPServerEasy } from "./PPTPServerEasy";
import type { Mode } from "../../../../StarContext/ChooseType";

export const PPTPServerWrapper = component$(() => {
  const starContext = useContext(StarContext);
  const mode = starContext.state.Choose.Mode as Mode;

  return (
    <>
      {mode === "easy" ? <PPTPServerEasy /> : <PPTPServerAdvanced />}
    </>
  );
}); 