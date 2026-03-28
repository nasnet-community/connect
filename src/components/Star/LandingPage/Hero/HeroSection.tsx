import { component$, $ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import {
  LuPlay,
  LuArrowRight,
  LuRouter,
  LuShield,
  LuZap,
} from "@qwikest/icons/lucide";
import { Newsletter } from "~/components/Core";
import type { NewsletterSubscription } from "~/components/Core/Feedback/Newsletter";
import { subscribeToNewsletter } from "~/utils/newsletterAPI";
import { generateUserUUID } from "~/utils/fingerprinting";
import { resolveMessageLocale, semanticMessages } from "~/i18n/semantic";

export const HeroSection = component$(() => {
  const location = useLocation();
  const locale = location.params.locale || "en";
  const messageLocale = resolveMessageLocale(locale);
  const primaryActionClasses =
    "group inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-blue-700 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-300/50 active:scale-[0.97]";
  const secondaryActionClasses =
    "group inline-flex items-center justify-center rounded-lg border-2 border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-gray-800 backdrop-blur-md transition-all duration-300 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-200/50 active:scale-[0.97] dark:bg-black/10 dark:text-white dark:focus-visible:ring-gray-700/50";

  // Newsletter subscription handler with Supabase Edge Function integration
  const handleNewsletterSubscribe$ = $(
    async (subscription: NewsletterSubscription) => {
      try {
        // Validate subscription object
        if (!subscription.email) {
          console.error("Invalid subscription object:", subscription);
          throw new Error("Invalid subscription: email is required");
        }

        // Generate userUUID using hardware fingerprinting
        const userUUID = await generateUserUUID();

        // Call the Supabase Edge Function
        const result = await subscribeToNewsletter(
          subscription.email,
          userUUID,
        );

        if (!result.success) {
          console.error("Newsletter subscription failed:", result.error);
          throw new Error(
            result.error_detail ||
              result.error ||
              semanticMessages.landing_hero_subscription_failed(
                {},
                { locale: messageLocale },
              ),
          );
        }

        console.log("Newsletter subscription successful:", subscription.email);

        // Track with analytics if available
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "newsletter_subscribe", {
            method: "supabase",
            email_domain: subscription.email.split("@")[1] || "unknown",
            source: "homepage-hero",
          });
        }
      } catch (error) {
        console.error("Newsletter subscription error:", error);
        throw error;
      }
    },
  );

  return (
    <section class="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
      {/* Hero Content */}
      <div class="relative z-20 mx-auto max-w-7xl text-center">
        {/* Badge */}
        <div class="mb-8 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-4 py-2 backdrop-blur-md">
          <div class="h-2 w-2 animate-pulse rounded-full bg-green-400" />
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {semanticMessages.landing_hero_badge({}, { locale: messageLocale })}
          </span>
        </div>

        {/* Main Headline */}
        <h1 class="mb-6 animate-fade-in-up text-4xl font-bold animation-delay-200 md:text-6xl lg:text-7xl">
          <span class="animate-gradient bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            {semanticMessages.landing_hero_headline_line1(
              {},
              { locale: messageLocale },
            )}
          </span>
          <br />
          <span class="text-gray-900 dark:text-white">
            {semanticMessages.landing_hero_headline_line2(
              {},
              { locale: messageLocale },
            )}
          </span>
          <br />
          <span class="animate-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {semanticMessages.landing_hero_headline_line3(
              {},
              { locale: messageLocale },
            )}
          </span>
        </h1>

        {/* Subtitle */}
        <p class="mx-auto mb-10 max-w-3xl animate-fade-in-up text-lg leading-relaxed text-gray-600 animation-delay-500 dark:text-gray-300 md:text-xl">
          {semanticMessages.landing_hero_subtitle(
            {},
            { locale: messageLocale },
          )}
        </p>

        {/* Key Features Pills */}
        <div class="animation-delay-700 mb-10 flex animate-fade-in-up flex-wrap justify-center gap-3">
          {[
            {
              icon: LuRouter,
              text: semanticMessages.landing_hero_feature_routers(
                {},
                { locale: messageLocale },
              ),
            },
            {
              icon: LuShield,
              text: semanticMessages.landing_hero_feature_vpn(
                {},
                { locale: messageLocale },
              ),
            },
            {
              icon: LuZap,
              text: semanticMessages.landing_hero_feature_gaming(
                {},
                { locale: messageLocale },
              ),
            },
          ].map((feature, index) => (
            <div
              key={index}
              class="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md transition-all duration-300 hover:bg-white/20 dark:bg-black/10"
            >
              <feature.icon class="h-4 w-4 text-purple-500" />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div class="flex animate-fade-in-up flex-col items-center justify-center gap-4 animation-delay-1000 sm:flex-row">
          <Link href={`/${locale}/star/`} class={primaryActionClasses}>
            {semanticMessages.landing_hero_cta_primary(
              {},
              { locale: messageLocale },
            )}
            <LuArrowRight class="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <a
            href="https://youtu.be/h2XxMztE0vQ"
            target="_blank"
            rel="noopener noreferrer"
            class={secondaryActionClasses}
          >
            <LuPlay class="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            {semanticMessages.landing_hero_cta_secondary(
              {},
              { locale: messageLocale },
            )}
          </a>
        </div>

        {/* Newsletter Card */}
        <div class="animation-delay-1100 mt-16 animate-fade-in-up">
          <Newsletter
            variant="hero"
            placeholder={semanticMessages.newsletter_hero_placeholder(
              {},
              { locale: messageLocale },
            )}
            buttonText={semanticMessages.newsletter_button_subscribe(
              {},
              { locale: messageLocale },
            )}
            onSubscribe$={handleNewsletterSubscribe$}
          />
        </div>

        {/* Trust Indicators */}
        <div class="animation-delay-1200 mt-16 animate-fade-in-up">
          <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
            {semanticMessages.landing_hero_trust_line(
              {},
              { locale: messageLocale },
            )}
          </p>
          <div class="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {[
              { name: "MikroTik", icon: "🏢" },
              { name: "Enterprise", icon: "🏛️" },
              { name: "Gaming", icon: "🎮" },
              { name: "Security", icon: "🔒" },
            ].map((brand, index) => (
              <div
                key={index}
                class="flex items-center gap-2 text-gray-600 dark:text-gray-400"
              >
                <span class="text-2xl">{brand.icon}</span>
                <span class="font-medium">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Visual Elements */}
      <div class="pointer-events-none absolute inset-0">
        {/* Glassmorphism Orbs */}
        <div class="absolute left-1/4 top-1/4 h-72 w-72 animate-float rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 blur-3xl" />
        <div class="absolute right-1/4 top-1/3 h-96 w-96 animate-float rounded-full bg-gradient-to-br from-blue-400/20 to-pink-400/20 blur-3xl animation-delay-2000" />
        <div class="absolute bottom-1/4 left-1/3 h-80 w-80 animate-float rounded-full bg-gradient-to-br from-pink-400/20 to-purple-400/20 blur-3xl animation-delay-4000" />

        {/* Network Topology Lines */}
        <svg
          class="absolute inset-0 h-full w-full opacity-20"
          viewBox="0 0 1000 1000"
        >
          <defs>
            <linearGradient
              id="lineGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:0.5" />
              <stop offset="50%" style="stop-color:#3B82F6;stop-opacity:0.5" />
              <stop offset="100%" style="stop-color:#EC4899;stop-opacity:0.5" />
            </linearGradient>
          </defs>
          <g class="animate-pulse-slow">
            <path
              d="M100,200 Q500,100 900,300"
              stroke="url(#lineGradient)"
              stroke-width="2"
              fill="none"
            />
            <path
              d="M200,800 Q600,600 800,200"
              stroke="url(#lineGradient)"
              stroke-width="2"
              fill="none"
            />
            <path
              d="M50,500 Q400,300 750,700"
              stroke="url(#lineGradient)"
              stroke-width="2"
              fill="none"
            />
          </g>
        </svg>
      </div>

      {/* Scroll Indicator */}
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
        <div class="flex h-10 w-6 justify-center rounded-full border-2 border-gray-400 dark:border-gray-600">
          <div class="mt-2 h-3 w-1 animate-pulse rounded-full bg-gray-400 dark:bg-gray-600" />
        </div>
      </div>
    </section>
  );
});
