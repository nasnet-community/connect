import { component$ } from "@builder.io/qwik";
import { LuShield, LuLock, LuEye, LuArrowRight } from "@qwikest/icons/lucide";
import { Button, Badge } from "~/components/Core";

export const VPNClientSection = component$(() => {
  return (
    <section class="relative min-h-[80vh] py-24 px-4 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-50 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual Side */}
          <div class="relative animate-fade-in-left order-2 lg:order-1">
            <div class="relative w-full h-[400px] flex items-center justify-center">
              <div class="absolute w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />
              <div class="relative">
                <div class="w-48 h-48 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl shadow-2xl flex items-center justify-center">
                  <LuShield class="w-24 h-24 text-white" />
                </div>
                <div class="absolute -top-4 -right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <LuLock class="w-6 h-6 text-white" />
                </div>
                <div class="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <LuEye class="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div class="space-y-6 animate-fade-in-right order-1 lg:order-2">
            <Badge color="primary" variant="outline" size="lg">
              {$localize`Privacy & Security`}
            </Badge>

            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {$localize`VPN Client`}
              </span>
              <br />
              <span class="text-gray-900 dark:text-white">
                {$localize`Protection`}
              </span>
            </h2>

            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {$localize`Military-grade encryption with 6 VPN protocols. Enhanced privacy, secure connections, and anonymous browsing capabilities for all your devices.`}
            </p>

            <div class="grid grid-cols-3 gap-3">
              {["WireGuard", "OpenVPN", "L2TP/IPSec", "PPTP", "SSTP", "IKEv2"].map((protocol) => (
                <div key={protocol} class="bg-white/50 dark:bg-black/50 rounded-lg p-3 text-center">
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">
                    {protocol}
                  </span>
                </div>
              ))}
            </div>

            <div class="flex flex-wrap gap-4 pt-4">
              <Button variant="primary" size="lg" class="group">
                {$localize`Setup VPN Client`}
                <LuArrowRight class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});