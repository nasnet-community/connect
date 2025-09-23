import { component$ } from "@builder.io/qwik";

interface FooterSection {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
}

interface FooterLinksProps {
  sections: FooterSection[];
}

export const FooterLinks = component$<FooterLinksProps>(({ sections }) => {
  return (
    <>
      {sections.map((section) => (
        <div key={section.title} class="lg:col-span-1">
          <h3 class="text-lg font-semibold mb-4 text-white">
            {section.title}
          </h3>
          <ul class="space-y-2">
            {section.links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  class="text-gray-300 hover:text-white transition-colors duration-200 block py-1"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
});