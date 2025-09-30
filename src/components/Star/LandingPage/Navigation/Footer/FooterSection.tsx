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
    <footer class="relative bg-gradient-to-br from-slate-900 to-purple-900 dark:from-black dark:to-purple-950 text-white">
      {/* Main Footer Content */}
      <div class="max-w-7xl mx-auto px-4 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
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
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-purple-500/10 to-transparent rounded-full blur-3xl" />
        <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl" />
      </div>
    </footer>
  );
});