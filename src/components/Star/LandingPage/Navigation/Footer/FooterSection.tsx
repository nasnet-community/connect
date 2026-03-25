import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { getFooterSections, socialLinks } from "../../data/footerData";
import { CompanyInfo } from "./CompanyInfo";
import { FooterLinks } from "./FooterLinks";
import { NewsletterSignup } from "./NewsletterSignup";
import { BottomBar } from "./BottomBar";
import { BackToTopButton } from "./BackToTopButton";

export const FooterSection = component$(() => {
  const location = useLocation();
  const locale = location.params.locale || "en";
  const footerSections = getFooterSections(locale);

  return (
    <footer class="relative bg-gradient-to-br from-slate-900 to-purple-900 text-white dark:from-black dark:to-purple-950">
      {/* Main Footer Content */}
      <div class="mx-auto max-w-7xl px-4 py-16">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Company Info */}
          <CompanyInfo socialLinks={socialLinks} />

          {/* Footer Links */}
          <FooterLinks sections={footerSections} />
        </div>

        {/* Newsletter Signup */}
        <NewsletterSignup />
      </div>

      {/* Bottom Bar */}
      <BottomBar />

      {/* Back to Top Button */}
      <BackToTopButton />

      {/* Background Effects */}
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gradient-to-t from-purple-500/10 to-transparent blur-3xl" />
        <div class="absolute right-0 top-0 h-96 w-96 rounded-full bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl" />
      </div>
    </footer>
  );
});
