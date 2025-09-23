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
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
          <LuRouter class="h-6 w-6 text-white" />
        </div>
        <span class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          MikroConnect
        </span>
      </div>

      {/* Description */}
      <p class="text-gray-300 mb-6 max-w-md">
        {$localize`Professional MikroTik router configuration made simple. Transform your network infrastructure with our intelligent configuration wizard.`}
      </p>

      {/* Contact Info */}
      <div class="space-y-3 mb-6">
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
              class="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
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