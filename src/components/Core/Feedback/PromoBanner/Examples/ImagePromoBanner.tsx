import { component$ } from "@builder.io/qwik";
import { PromoBanner } from "~/components/Core/Feedback/PromoBanner";

export const ImagePromoBanner = component$(() => {
  return (
    <PromoBanner
      title="Try Premium Nord VPN"
      description="Get access to secure, high-speed VPN services with servers in over 60 countries. Protect your online privacy today!"
      provider="NordVPN"
      imageUrl="/images/vpn/nord-logo.png"
    />
  );
});
