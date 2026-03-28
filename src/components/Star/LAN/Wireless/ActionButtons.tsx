import { component$, type QRL } from "@builder.io/qwik";
import { Button } from "~/components/Core";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface ActionButtonsProps {
  onSubmit: QRL<() => void>;
  isValid: boolean;
}

export const ActionButtons = component$<ActionButtonsProps>(
  ({ onSubmit, isValid }) => {
    const locale = useMessageLocale();
    return (
      <div class="mt-8 flex justify-end">
        <Button
          onClick$={onSubmit}
          disabled={!isValid}
          variant="primary"
          size="md"
        >
          {semanticMessages.shared_save({}, { locale })}
        </Button>
      </div>
    );
  },
);
