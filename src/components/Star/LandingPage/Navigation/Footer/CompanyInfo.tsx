import { component$ } from "@builder.io/qwik";
import { LuRouter, LuMail, LuPhone, LuMapPin } from "@qwikest/icons/lucide";
import { getIcon, type IconName } from "../../utils/iconMapper";

interface SocialLink {
  icon: IconName;
  href: string;
  label: string;
}

interface CompanyInfoProps {
  socialLinks: SocialLink[];
}

export const CompanyInfo = component$<CompanyInfoProps>(({ socialLinks }) => {
  return (
    <div class="lg:col-span-2">
      {/* Logo */}
      <div class="mb-6 flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
          <LuRouter class="h-6 w-6 text-white" />
        </div>
        <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent">
          MikroConnect
        </span>
      </div>

      {/* Description */}
      <p class="mb-6 max-w-md text-gray-300">
        {$localize`Professional MikroTik router configuration made simple. Transform your network infrastructure with our intelligent configuration wizard.`}
      </p>

      {/* Contact Info */}
      <div class="mb-6 space-y-3">
        <div class="flex items-center gap-3 text-gray-300">
          <LuMail class="h-4 w-4" />
          <span>support@mikroconnect.com</span>
        </div>
        <div class="flex items-center gap-3 text-gray-300">
          <LuPhone class="h-4 w-4" />
          <span>+1 (555) 123-4567</span>
        </div>
        <div class="flex items-center gap-3 text-gray-300">
          <LuMapPin class="h-4 w-4" />
          <span>San Francisco, CA</span>
        </div>
      </div>

      {/* Social Links */}
      <div class="flex gap-3">
        {socialLinks.map((social) => {
          const SocialIcon = getIcon(social.icon);
          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
              aria-label={social.label}
            >
              <SocialIcon class="h-5 w-5" />
            </a>
          );
        })}
      </div>
    </div>
  );
});
