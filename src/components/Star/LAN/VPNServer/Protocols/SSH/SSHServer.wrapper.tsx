import { component$ } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import { SSHServerAdvanced } from "./SSHServerAdvanced";
import { SSHServerEasy } from "./SSHServerEasy";
import type { Mode } from "../../../../StarContext/ChooseType";

export const SSHServerWrapper = component$(() => {
  const starContext = useContext(StarContext);
  const mode = starContext.state.Choose.Mode as Mode;

  return <>{mode === "easy" ? <SSHServerEasy /> : <SSHServerAdvanced />}</>;
});