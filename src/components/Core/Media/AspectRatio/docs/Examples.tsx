import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate } from "~/components/Docs/templates";

// Import examples
import { BasicAspectRatioExamples } from "../Examples/BasicAspectRatio";
import { CustomAspectRatioExamples } from "../Examples/CustomAspectRatio";
import { VideoAspectRatioExamples } from "../Examples/VideoAspectRatio";

export default component$(() => {
  const examples = [
    {
      title: "Preset Aspect Ratios",
      description:
        "Demonstrates all seven preset aspect ratios with different content types, overflow modes, and styling options.",
      component: <BasicAspectRatioExamples />,
    },
    {
      title: "Custom Aspect Ratios",
      description:
        "Shows how to create custom aspect ratios using numeric values for specific design requirements.",
      component: <CustomAspectRatioExamples />,
    },
    {
      title: "Video and Media Content",
      description:
        "Examples of using AspectRatio with video content, iframes, and other media elements for responsive embedding.",
      component: <VideoAspectRatioExamples />,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The following examples demonstrate various configurations and use cases
        for the AspectRatio component. Each example showcases different preset
        ratios, custom configurations, overflow handling, and real-world
        applications like video embedding and image galleries.
      </p>

      <p class="mt-2">
        These examples cover common scenarios including media containers, card
        layouts, responsive embeds, and gallery implementations that need to
        maintain consistent proportions across different screen sizes.
      </p>
    </ExamplesTemplate>
  );
});
