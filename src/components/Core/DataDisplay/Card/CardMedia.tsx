import { component$ } from "@builder.io/qwik";
import type { CardMediaProps } from "./Card.types";

export const CardMedia = component$<CardMediaProps>((props) => {
  const {
    src,
    alt = "",
    height = "200px",
    width = "100%",
    objectFit = "cover",
    isTop = true,
    overlay,
    overlayOpacity = 0.3,
    overlayColor = "rgba(0, 0, 0, 0.5)",
    class: className = "",
  } = props;

  // Compute overlay styles
  const overlayStyle: Record<string, string> = {};

  if (overlay) {
    overlayStyle.backgroundColor = overlayColor;
    overlayStyle.opacity = overlayOpacity.toString();
  }

  return (
    <div
      class={`relative overflow-hidden ${isTop ? "mb-0" : "mt-0"} ${className}`}
      style={{ height, width }}
    >
      <img
        src={src}
        alt={alt}
        class="h-full w-full transition-transform duration-300"
        style={{ objectFit }}
      />

      {overlay && (
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="absolute inset-0 z-0" style={overlayStyle}></div>
          <div class="relative z-10 text-white">{overlay}</div>
        </div>
      )}
    </div>
  );
});
