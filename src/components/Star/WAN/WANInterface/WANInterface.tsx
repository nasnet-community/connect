import { component$, useContext } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";
import { WANInterface as WANInterfaceEasy } from "./WANInterfaceEasy/WANInterface";
import { WANAdvanced } from "./WANInterfaceAdvanced/WANAdvanced";
import type { StepProps } from "~/types/step";

export interface WANInterfaceProps extends StepProps {
  mode?: "Foreign" | "Domestic";
}

export const WANInterface = component$<WANInterfaceProps>((props) => {
  const starContext = useContext(StarContext);
  const isAdvancedMode = starContext.state.Choose.Mode === "advance";

  // If advanced mode is selected, show the advanced interface with mode
  if (isAdvancedMode) {
    return <WANAdvanced 
      mode={props.mode || "Foreign"}
      onComplete$={props.onComplete$} 
    />;
  }

  // Otherwise, show the easy interface
  return (
    <WANInterfaceEasy
      mode={props.mode || "Foreign"}
      isComplete={props.isComplete}
      onComplete$={props.onComplete$}
    />
  );
});
