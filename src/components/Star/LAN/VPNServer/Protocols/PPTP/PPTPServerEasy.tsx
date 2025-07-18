import { component$ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
// import { usePPTPServer } from "./usePPTPServer";
import { 
  ServerCard, 
  // ServerFormField 
} from "../../UI";

export const PPTPServerEasy = component$(() => {
  // const { 
  //   easyFormState, 
  //   isEnabled,
  //   defaultProfileError,
  //   updateEasyDefaultProfile$
  // } = usePPTPServer();

  return (
    <ServerCard
      title={$localize`PPTP Server`}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="py-4 text-center text-gray-700 dark:text-gray-300">
        <p>{$localize`PPTP VPN server is configured. Advanced configuration is available in expert mode.`}</p>
      </div>
    </ServerCard>
  );
}); 