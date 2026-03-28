import { component$ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
// import { usePPTPServer } from "./usePPTPServer";
import { ServerCard } from "~/components/Core/Card/ServerCard";
// import { ServerFormField } from "~/components/Core/Form/ServerField";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const PPTPServerEasy = component$(() => {
  const locale = useMessageLocale();

  // const {
  //   easyFormState,
  //   isEnabled,
  //   defaultProfileError,
  //   updateEasyDefaultProfile$
  // } = usePPTPServer();

  return (
    <ServerCard
      title={semanticMessages.vpn_server_easy_pptp_title({}, { locale })}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="py-4 text-center text-gray-700 dark:text-gray-300">
        <p>
          {semanticMessages.vpn_server_easy_pptp_description({}, { locale })}
        </p>
      </div>
    </ServerCard>
  );
});
