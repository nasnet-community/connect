import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";

export interface UseWANInterfaceReturn {
  isAdvancedMode: boolean;
  mode: "easy" | "advance";
}

export function useWANInterface(): UseWANInterfaceReturn {
  const starContext = useContext(StarContext);
  const mode = starContext.state.Choose.Mode;
  const isAdvancedMode = mode === "advance";

  return {
    isAdvancedMode,
    mode,
  };
}
