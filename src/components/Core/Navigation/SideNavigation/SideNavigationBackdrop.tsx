import type { QRL } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

export interface SideNavigationBackdropProps {
  isMobileModal: boolean;
  backdropClass: string;
  onClose$: QRL<() => void>;
}

export const SideNavigationBackdrop = component$<SideNavigationBackdropProps>(
  (props) => {
    const { isMobileModal, backdropClass, onClose$ } = props;

    if (!isMobileModal) return null;

    return <div class={backdropClass} onClick$={onClose$} aria-hidden="true" />;
  },
);
