import { component$ } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import { HTTPProxyServerAdvanced } from "./HTTPProxyServerAdvanced";
import { HTTPProxyServerEasy } from "./HTTPProxyServerEasy";
import type { Mode } from "../../../../StarContext/ChooseType";

export const HTTPProxyServerWrapper = component$(() => {
  const starContext = useContext(StarContext);
  const mode = starContext.state.Choose.Mode as Mode;

  return <>{mode === "easy" ? <HTTPProxyServerEasy /> : <HTTPProxyServerAdvanced />}</>;
});