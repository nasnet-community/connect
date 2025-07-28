import { component$ } from "@builder.io/qwik";
import { TopNavigation } from "../../TopNavigation";
import type { TopNavigationItem } from "../../TopNavigation";
import { renderIcon } from "~/components/Core/Iconography/iconHelpers";
import {
  HiHomeOutline,
  HiUserOutline,
  HiCogOutline,
  HiInformationCircleOutline,
  HiEnvelopeOutline,
} from "@qwikest/icons/heroicons";

export default component$(() => {
  const items: TopNavigationItem[] = [
    {
      href: "#",
      label: "Home",
      icon: renderIcon(HiHomeOutline, { class: "w-5 h-5" }),
      isActive: true,
    },
    {
      href: "#",
      label: "Profile",
      icon: renderIcon(HiUserOutline, { class: "w-5 h-5" }),
    },
    {
      href: "#",
      label: "Settings",
      icon: renderIcon(HiCogOutline, { class: "w-5 h-5" }),
    },
    {
      href: "#",
      label: "About",
      icon: renderIcon(HiInformationCircleOutline, { class: "w-5 h-5" }),
    },
    {
      href: "#",
      label: "Contact",
      icon: renderIcon(HiEnvelopeOutline, { class: "w-5 h-5" }),
    },
  ];

  return (
    <div class="p-4">
      <TopNavigation items={items} />
    </div>
  );
});
