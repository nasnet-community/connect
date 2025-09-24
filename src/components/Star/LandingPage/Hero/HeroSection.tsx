import { component$, $ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { LuPlay, LuArrowRight, LuRouter, LuShield, LuZap } from "@qwikest/icons/lucide";
import { Button, Newsletter } from "~/components/Core";
import type { NewsletterSubscription } from "~/components/Core/Feedback/Newsletter";

export const HeroSection = component$(() => {
  // Newsletter subscription handler
  const handleNewsletterSubscribe$ = $(async (subscription: NewsletterSubscription) => {
    console.log("Newsletter subscription for:", subscription.email);
    // Here you can add your subscription logic (API call, etc.)
    // For now, we'll just simulate a successful subscription
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  return (
    <section class="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Hero Content */}
      <div class="relative max-w-7xl mx-auto text-center z-20">

        {/* Badge */}
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in-up">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {$localize`Professional MikroTik Configuration`}
          </span>
        </div>

        {/* Main Headline */}
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up animation-delay-200">
          <span class="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
            {$localize`Configure`}
          </span>
          <br />
          <span class="text-gray-900 dark:text-white">
            {$localize`Your Network`}
          </span>
          <br />
          <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
            {$localize`Like a Pro`}
          </span>
        </h1>

        {/* Subtitle */}
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up animation-delay-500">
          {$localize`Share, Secure & Optimize Your Starlink
Unlock the full potential of your Starlink connection with advanced networking powered by MikroTik routers. Seamlessly share your internet, secure it with VPN, and optimize for gaming and enterprise performance, all through NasNet Connect intelligent interface.`}
        </p>

        {/* Key Features Pills */}
        <div class="flex flex-wrap justify-center gap-3 mb-10 animate-fade-in-up animation-delay-700">
          {[
            { icon: LuRouter, text: $localize`17+ Router Models` },
            { icon: LuShield, text: $localize`6 VPN Protocols` },
            { icon: LuZap, text: $localize`Gaming Optimized` }
          ].map((feature, index) => (
            <div
              key={index}
              class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <feature.icon class="h-4 w-4 text-purple-500" />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-1000">
          <Link href="/star/">
            <Button
              variant="primary"
              size="lg"
              class="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {$localize`Get Started Free`}
              <LuArrowRight class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            class="group bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 hover:bg-white/20 px-8 py-4 text-lg font-semibold text-gray-800 dark:text-white"
          >
            <LuPlay class="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            {$localize`Watch Demo`}
          </Button>
        </div>

        {/* Newsletter Card */}
        <div class="mt-16 animate-fade-in-up animation-delay-1100">
          <Newsletter
            variant="hero"
            placeholder={$localize`Enter your email for updates`}
            buttonText={$localize`Subscribe`}
            onSubscribe$={handleNewsletterSubscribe$}
          />
        </div>

        {/* Trust Indicators */}
        <div class="mt-16 animate-fade-in-up animation-delay-1200">
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {$localize`Trusted by network professionals worldwide`}
          </p>
          <div class="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {[
              { name: "MikroTik", icon: "🏢" },
              { name: "Enterprise", icon: "🏛️" },
              { name: "Gaming", icon: "🎮" },
              { name: "Security", icon: "🔒" }
            ].map((brand, index) => (
              <div key={index} class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span class="text-2xl">{brand.icon}</span>
                <span class="font-medium">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Visual Elements */}
      <div class="absolute inset-0 pointer-events-none">
        {/* Glassmorphism Orbs */}
        <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-float" />
        <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-pink-400/20 rounded-full blur-3xl animate-float animation-delay-2000" />
        <div class="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-float animation-delay-4000" />

        {/* Network Topology Lines */}
        <svg class="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:0.5" />
              <stop offset="50%" style="stop-color:#3B82F6;stop-opacity:0.5" />
              <stop offset="100%" style="stop-color:#EC4899;stop-opacity:0.5" />
            </linearGradient>
          </defs>
          <g class="animate-pulse-slow">
            <path d="M100,200 Q500,100 900,300" stroke="url(#lineGradient)" stroke-width="2" fill="none" />
            <path d="M200,800 Q600,600 800,200" stroke="url(#lineGradient)" stroke-width="2" fill="none" />
            <path d="M50,500 Q400,300 750,700" stroke="url(#lineGradient)" stroke-width="2" fill="none" />
          </g>
        </svg>
      </div>

      {/* Scroll Indicator */}
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
});