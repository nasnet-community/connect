import type { InterfaceSelectorProps } from "./types";
import { component$, useResource$, Resource } from "@builder.io/qwik";

export const InterfaceSelector = component$<InterfaceSelectorProps>(
  ({
    selectedInterface,
    availableInterfaces,
    onSelect,
    isInterfaceSelectedInOtherMode,
  }) => {
    const disabledStates = useResource$<boolean[]>(async ({ track }) => {
      track(() => availableInterfaces);

      if (!availableInterfaces) return [];

      return Promise.all(
        availableInterfaces.map((iface) =>
          isInterfaceSelectedInOtherMode(iface),
        ),
      );
    });

    return (
      <div class="space-y-2">
        <label class="text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
          {$localize`Select Interface`}
        </label>
        <select
          value={selectedInterface}
          onChange$={(_, el) => onSelect(el.value)}
          class="text-text-default focus:ring-primary-500 dark:focus:ring-primary-400 w-full rounded-lg 
                    border border-border
                    bg-white px-4
                    py-2 focus:border-transparent
                    focus:ring-2 dark:border-border-dark dark:bg-surface-dark
                    dark:text-text-dark-default"
        >
          <option
            value=""
            class="dark:bg-surface-dark dark:text-text-dark-default"
          >
            {$localize`Select interface`}
          </option>
          <Resource
            value={disabledStates}
            onPending={() =>
              availableInterfaces?.map((iface) => (
                <option
                  key={iface}
                  value={iface}
                  disabled
                  class="dark:bg-surface-dark dark:text-text-dark-default"
                >
                  {iface}
                </option>
              ))
            }
            onResolved={(states) =>
              availableInterfaces?.map((iface, index) => (
                <option
                  key={iface}
                  value={iface}
                  disabled={states[index]}
                  class="dark:bg-surface-dark dark:text-text-dark-default"
                >
                  {iface}
                </option>
              ))
            }
          />
        </select>
      </div>
    );
  },
);
