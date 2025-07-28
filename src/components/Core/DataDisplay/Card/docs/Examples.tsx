import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate } from "~/components/Docs/templates";

// Import examples
import { BasicCard } from "../Examples/BasicCard";
import { CardVariants } from "../Examples/CardVariants";
import { MediaCard } from "../Examples/MediaCard";
import InteractiveCard from "../Examples/InteractiveCard";
import LayoutOptions from "../Examples/LayoutOptions";
import ElevationAndRadius from "../Examples/ElevationAndRadius";
import LinkCard from "../Examples/LinkCard";
import AccessibleCard from "../Examples/AccessibleCard";

export default component$(() => {
  const examples = [
    {
      title: "Basic Card",
      description: "A simple card with header, body, and footer sections.",
      component: <BasicCard />,
    },
    {
      title: "Card Variants",
      description:
        "Different visual styles for cards: default, outlined, and filled.",
      component: <CardVariants />,
    },
    {
      title: "Media Card",
      description: "Card with image or media content and supporting text.",
      component: <MediaCard />,
    },
    {
      title: "Interactive Cards",
      description:
        "Cards with different hover effects that respond to user interaction.",
      component: <InteractiveCard />,
    },
    {
      title: "Layout Options",
      description:
        "Cards with different sizing options: full width, fixed width, and full height.",
      component: <LayoutOptions />,
    },
    {
      title: "Elevation & Border Radius",
      description:
        "Cards with various elevation levels and corner radius options.",
      component: <ElevationAndRadius />,
    },
    {
      title: "Link Cards",
      description:
        "Cards that function as navigation links to internal or external pages.",
      component: <LinkCard />,
    },
    {
      title: "Accessible Card",
      description:
        "Card with proper accessibility attributes and keyboard navigation support.",
      component: <AccessibleCard />,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The following examples demonstrate various configurations and use cases
        for the Card component. Each example showcases different features and
        customization options to help you implement cards that best suit your
        application's needs.
      </p>
    </ExamplesTemplate>
  );
});
