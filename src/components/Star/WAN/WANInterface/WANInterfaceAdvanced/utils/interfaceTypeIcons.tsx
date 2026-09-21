import type { JSXOutput } from "@builder.io/qwik";

export const renderInterfaceTypeIcon = (
  interfaceType: string,
  className = "h-4 w-4",
): JSXOutput => {
  switch (interfaceType) {
    case "Wireless":
      return (
        <svg
          class={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
          />
        </svg>
      );
    case "SFP":
      return (
        <svg
          class={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 8h16v8H4zm4 0v8m8-8v8M9 12h6"
          />
        </svg>
      );
    case "LTE":
      return (
        <svg
          class={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.25 3.75h5.379c.597 0 1.169.237 1.591.659l3.371 3.371c.422.422.659.994.659 1.591v9.879A2.25 2.25 0 0117 21.5H8.25A2.25 2.25 0 016 19.25V6A2.25 2.25 0 018.25 3.75Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.25 11.25h5.5v5.5h-5.5zm1.833 0v5.5m1.834-5.5v5.5m-3.667 0h5.5"
          />
        </svg>
      );
    case "Ethernet":
    default:
      return (
        <svg
          class={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7.5 6.25h9A2.25 2.25 0 0118.75 8.5v4A2.25 2.25 0 0116.5 14.75h-1.25v1.5A2.25 2.25 0 0113 18.5h-2A2.25 2.25 0 018.75 16.25v-1.5H7.5A2.25 2.25 0 015.25 12.5v-4A2.25 2.25 0 017.5 6.25Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.75 8.25v2m2-2v2m2-2v2m2-2v2"
          />
        </svg>
      );
  }
};
