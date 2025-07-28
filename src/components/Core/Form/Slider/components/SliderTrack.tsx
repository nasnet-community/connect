import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

export interface SliderTrackProps {
  trackRef: { value: HTMLDivElement | undefined };
  trackClasses: string;
  trackFillClasses: string;
  trackFillStyle: { [key: string]: string };
  onTrackClick: QRL<(e: MouseEvent) => void>;
  children?: any;
}

export const SliderTrack = component$((props: SliderTrackProps) => {
  const {
    trackRef,
    trackClasses,
    trackFillClasses,
    trackFillStyle,
    onTrackClick,
    children,
  } = props;

  return (
    <div
      ref={trackRef}
      class={trackClasses}
      onClick$={onTrackClick}
      role="presentation"
    >
      {/* Track background */}
      <div class="slider-track-bg" aria-hidden="true" />

      {/* Track fill */}
      <div class={trackFillClasses} style={trackFillStyle} aria-hidden="true" />

      {/* Render child components (marks, ticks, thumbs) */}
      {children}
    </div>
  );
});
