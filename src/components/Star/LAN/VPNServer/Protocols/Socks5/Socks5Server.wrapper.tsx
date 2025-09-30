import { component$ } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import { Socks5ServerAdvanced } from "./Socks5ServerAdvanced";
import { Socks5ServerEasy } from "./Socks5ServerEasy";
import type { Mode } from "../../../../StarContext/ChooseType";

export const Socks5ServerWrapper = component$(() => {
  const starContext = useContext(StarContext);
  const mode = starContext.state.Choose.Mode as Mode;

  return <>{mode === "easy" ? <Socks5ServerEasy /> : <Socks5ServerAdvanced />}</>;
});