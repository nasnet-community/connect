import { useSignal, useVisibleTask$ } from "@builder.io/qwik";

export function useBreadcrumbsResponsive() {
  const screenWidth = useSignal(0);
  const isRtl = useSignal(false);

  useVisibleTask$(() => {
    screenWidth.value = window.innerWidth;
    const dir = document.documentElement.dir || document.dir;
    isRtl.value = dir === "rtl";

    const handleResize = () => {
      screenWidth.value = window.innerWidth;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return { screenWidth, isRtl };
}
