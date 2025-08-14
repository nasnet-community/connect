import { component$, useSignal, $, useComputed$ } from "@builder.io/qwik";
import { 
  CodeBlock,
  AspectRatio,
  Button,
  TimePicker,
  Alert
} from "~/components/Core";
import type { TimeValue } from "~/components/Core/TimePicker/Timepicker";
import { 
  LuGlobe, 
  LuShield, 
  LuRefreshCw,
  LuTerminal,
  LuPlayCircle,
  LuCheckCircle,
  LuClock,
  LuZap,
  LuLock,
  LuActivity,
  LuSettings,
  LuWifiOff
} from "@qwikest/icons/lucide";
import { generateDomesticIPScript } from "~/components/Star/ConfigGenerator/Choose/DomesticIPS";
import { formatRouterConfig } from "~/components/Star/ConfigGenerator/utils/ScriptSchedule";

export default component$(() => {
  // State management
  const scheduledTime = useSignal({ hour: "03", minute: "00" });
  const showDisconnectionAlert = useSignal(true);
  const showScript = useSignal(false);
  
  const handleTimeChange$ = $((type: keyof TimeValue, value: string) => {
    if (type === "hour" || type === "minute") {
      scheduledTime.value = { ...scheduledTime.value, [type]: value };
    }
  });

  // Generate MikroTik script based on scheduled time
  const mikrotikScript = useComputed$(() => {
    const time = `${scheduledTime.value.hour}:${scheduledTime.value.minute}`;
    const scriptConfig = generateDomesticIPScript(time);
    
    // Format the generated script for display
    return formatRouterConfig(scriptConfig, {
      escapeForScript: false,
      commandLineContinuation: true
    });
  });

  const features = [
    {
      iconName: "refresh",
      title: "Auto-Update",
      description: "Automatically sync IP lists from remote sources"
    },
    {
      iconName: "shield",
      title: "Enhanced Security",
      description: "Maintain current threat intelligence data"
    },
    {
      iconName: "globe",
      title: "Geo-Based Control",
      description: "Route traffic based on geographic regions"
    },
    {
      iconName: "zap",
      title: "High Performance",
      description: "Optimized for fast routing decisions"
    }
  ];

  const benefits = [
    {
      iconName: "activity",
      text: "Real-time IP address list updates"
    },
    {
      iconName: "lock",
      text: "Centralized security management"
    },
    {
      iconName: "settings",
      text: "Reduced manual configuration"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Access Router",
      description: "Connect via WinBox, WebFig, or SSH terminal"
    },
    {
      number: "02", 
      title: "Copy Script",
      description: "Click the copy button to get the script"
    },
    {
      number: "03",
      title: "Open Terminal",
      description: "Navigate to terminal in your router interface"
    },
    {
      number: "04",
      title: "Execute",
      description: "Paste and run the script"
    },
    {
      number: "05",
      title: "Schedule (Optional)",
      description: "Set up automatic daily updates"
    }
  ];

  return (
    <div class="min-h-screen bg-gradient-to-br from-surface via-surface to-surface-secondary dark:from-surface-dark dark:via-surface-dark dark:to-surface-dark-secondary">
      {/* Hero Section */}
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5" />
        <div class="container mx-auto px-4 py-16 relative">
          <div class="text-center max-w-4xl mx-auto">
            <div class="inline-flex items-center justify-center mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 backdrop-blur-xl">
              <LuGlobe class="w-10 h-10 text-primary-500" />
            </div>
            
            <h1 class="mb-6 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-4xl md:text-5xl lg:text-6xl font-bold text-transparent">
              Remote Address List
            </h1>
            
            <p class="text-lg md:text-xl text-text-secondary dark:text-text-dark-secondary max-w-2xl mx-auto">
              Automatically sync and manage IP address lists from remote sources 
              for enhanced network control and security
            </p>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 pb-16">
        {/* Features Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature) => (
            <div 
              key={feature.title}
              class="group relative rounded-2xl border border-border/50 bg-white/40 backdrop-blur-xl p-6 transition-all duration-300 hover:border-primary-500/50 dark:border-border-dark/50 dark:bg-surface-dark/40 dark:hover:border-primary-500/50"
            >
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div class="relative">
                <div class="mb-4 w-fit rounded-xl bg-primary-500/10 p-3 transition-transform duration-300 group-hover:scale-110 dark:bg-primary-500/5">
                  {feature.iconName === "refresh" && <LuRefreshCw class="w-6 h-6 text-primary-500 dark:text-primary-400" />}
                  {feature.iconName === "shield" && <LuShield class="w-6 h-6 text-primary-500 dark:text-primary-400" />}
                  {feature.iconName === "globe" && <LuGlobe class="w-6 h-6 text-primary-500 dark:text-primary-400" />}
                  {feature.iconName === "zap" && <LuZap class="w-6 h-6 text-primary-500 dark:text-primary-400" />}
                </div>
                
                <h3 class="mb-2 text-lg font-semibold text-text transition-colors duration-300 group-hover:text-primary-500 dark:text-text-dark-default dark:group-hover:text-primary-400">
                  {feature.title}
                </h3>
                
                <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div class="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Script Section - Takes 2 columns */}
          <div class="lg:col-span-2">
            <div class="rounded-2xl border border-border/50 bg-white/60 backdrop-blur-xl overflow-hidden dark:border-border-dark/50 dark:bg-surface-dark/60">
              <div class="px-6 py-4 border-b border-border/50 dark:border-border-dark/50 bg-gradient-to-r from-primary-500/5 to-secondary-500/5">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/10 to-secondary-500/10 flex items-center justify-center">
                      <LuTerminal class="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <h2 class="text-xl font-semibold text-text dark:text-text-dark-default">
                        RouterOS Script
                      </h2>
                      <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                        Configure daily execution time and generate script
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="p-6">
                {!showScript.value ? (
                  <div class="space-y-6">
                    <div class="p-6 rounded-xl bg-surface-secondary/30 dark:bg-surface-dark-secondary/30 border border-border/30 dark:border-border-dark/30">
                      <label class="block text-sm font-medium text-text dark:text-text-dark-default mb-3">
                        Daily Execution Time (24-hour format)
                      </label>
                      <TimePicker
                        time={scheduledTime.value}
                        onChange$={handleTimeChange$}
                        format="24"
                        showSeconds={false}
                        size="lg"
                        variant="filled"
                        placeholder={{
                          hour: "HH",
                          minute: "MM"
                        }}
                      />
                      <p class="mt-3 text-sm text-text-secondary dark:text-text-dark-secondary">
                        The script will run automatically every day at <span class="font-medium text-primary-500">{scheduledTime.value.hour}:{scheduledTime.value.minute}</span>
                      </p>
                    </div>
                    
                    <div class="flex justify-center">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick$={() => { showScript.value = true }}
                        class="min-w-[200px]"
                      >
                        <LuPlayCircle class="w-5 h-5 mr-2" />
                        Generate Script
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div class="space-y-4">
                    <div class="flex items-center justify-between p-3 rounded-lg bg-success-500/10 border border-success-500/20">
                      <div class="flex items-center gap-2">
                        <LuCheckCircle class="w-5 h-5 text-success-500" />
                        <span class="text-sm font-medium text-success-600 dark:text-success-400">
                          Script generated for daily execution at {scheduledTime.value.hour}:{scheduledTime.value.minute}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick$={() => { showScript.value = false }}
                        class="hover:bg-primary-500/10"
                      >
                        <LuRefreshCw class="w-4 h-4 mr-2" />
                        Change Time
                      </Button>
                    </div>
                    
                    <CodeBlock
                      code={mikrotikScript.value}
                      language="bash"
                      showLineNumbers={true}
                      copyButton={true}
                      theme="auto"
                      wrap={true}
                      maxHeight="400px"
                      borderRadius="lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Benefits Section - Takes 1 column */}
          <div class="lg:col-span-1">
            <div class="rounded-2xl border border-border/50 bg-white/60 backdrop-blur-xl p-6 dark:border-border-dark/50 dark:bg-surface-dark/60 h-full">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-success-500/10 to-success-600/10 flex items-center justify-center">
                  <LuCheckCircle class="w-5 h-5 text-success-500" />
                </div>
                <h3 class="text-xl font-semibold text-text dark:text-text-dark-default">
                  Key Benefits
                </h3>
              </div>
              
              <div class="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit.text} class="flex items-start gap-3 group">
                    <div class="mt-1 w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                      {benefit.iconName === "activity" && <LuActivity class="w-4 h-4 text-primary-500" />}
                      {benefit.iconName === "lock" && <LuLock class="w-4 h-4 text-primary-500" />}
                      {benefit.iconName === "settings" && <LuSettings class="w-4 h-4 text-primary-500" />}
                    </div>
                    <p class="text-text-secondary dark:text-text-dark-secondary">
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>

              <div class="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 border border-primary-500/20">
                <div class="flex items-center gap-2 mb-2">
                  <LuClock class="w-4 h-4 text-primary-500" />
                  <span class="text-sm font-medium text-primary-500">Pro Tip</span>
                </div>
                <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                  Schedule this script to run daily for automatic IP list updates
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disconnection Warning Alert */}
        {showDisconnectionAlert.value && (
          <Alert 
            status="warning" 
            variant="solid"
            dismissible={true}
            onDismiss$={() => { showDisconnectionAlert.value = false }}
            class="mb-8"
          >
            <div class="space-y-2">
              <div class="font-semibold flex items-center gap-2">
                <LuWifiOff class="w-4 h-4" />
                Internet Connection Will Be Temporarily Interrupted
              </div>
              <p class="text-sm">
                When this script runs, your internet connection will be disconnected for approximately 
                <span class="font-semibold"> 30-60 seconds</span> while the router updates its address lists 
                and reconfigures routing rules.
              </p>
              <p class="text-xs opacity-90">
                Plan accordingly and avoid scheduling during critical operations or video calls.
              </p>
            </div>
          </Alert>
        )}

        {/* Installation Steps */}
        <div class="rounded-2xl border border-border/50 bg-white/60 backdrop-blur-xl p-8 mb-16 dark:border-border-dark/50 dark:bg-surface-dark/60">
          <div class="text-center mb-10">
            <h2 class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-3">
              Quick Installation Guide
            </h2>
            <p class="text-text-secondary dark:text-text-dark-secondary">
              Follow these simple steps to deploy the script on your MikroTik router
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div key={step.number} class="relative group">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div class="hidden lg:block absolute top-8 left-full w-full h-[2px] bg-gradient-to-r from-primary-500/20 to-transparent -translate-x-1/2" />
                )}
                
                <div class="text-center">
                  <div class="mb-4 mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <span class="text-lg font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                      {step.number}
                    </span>
                  </div>
                  
                  <h4 class="font-semibold text-text dark:text-text-dark-default mb-2">
                    {step.title}
                  </h4>
                  
                  <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases Section */}
        <div class="grid md:grid-cols-2 gap-8 mb-16">
          <div class="rounded-2xl border border-border/50 bg-white/60 backdrop-blur-xl p-8 dark:border-border-dark/50 dark:bg-surface-dark/60">
            <h3 class="text-xl font-semibold text-text dark:text-text-dark-default mb-6">
              Common Use Cases
            </h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="mt-1 w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
                <span class="text-text-secondary dark:text-text-dark-secondary">
                  Block or allow traffic from specific countries
                </span>
              </li>
              <li class="flex items-start gap-3">
                <div class="mt-1 w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
                <span class="text-text-secondary dark:text-text-dark-secondary">
                  Route traffic through different WAN connections
                </span>
              </li>
              <li class="flex items-start gap-3">
                <div class="mt-1 w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
                <span class="text-text-secondary dark:text-text-dark-secondary">
                  Implement dynamic firewall rules
                </span>
              </li>
              <li class="flex items-start gap-3">
                <div class="mt-1 w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
                <span class="text-text-secondary dark:text-text-dark-secondary">
                  Manage VPN access control lists
                </span>
              </li>
            </ul>
          </div>

          <div class="rounded-2xl border border-border/50 bg-white/60 backdrop-blur-xl p-8 dark:border-border-dark/50 dark:bg-surface-dark/60">
            <h3 class="text-xl font-semibold text-text dark:text-text-dark-default mb-6">
              Requirements
            </h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="mt-1 w-2 h-2 rounded-full bg-secondary-500 flex-shrink-0" />
                <span class="text-text-secondary dark:text-text-dark-secondary">
                  MikroTik RouterOS v6.45 or higher
                </span>
              </li>
              <li class="flex items-start gap-3">
                <div class="mt-1 w-2 h-2 rounded-full bg-secondary-500 flex-shrink-0" />
                <span class="text-text-secondary dark:text-text-dark-secondary">
                  Active internet connection for updates
                </span>
              </li>
              <li class="flex items-start gap-3">
                <div class="mt-1 w-2 h-2 rounded-full bg-secondary-500 flex-shrink-0" />
                <span class="text-text-secondary dark:text-text-dark-secondary">
                  Administrator access to router
                </span>
              </li>
              <li class="flex items-start gap-3">
                <div class="mt-1 w-2 h-2 rounded-full bg-secondary-500 flex-shrink-0" />
                <span class="text-text-secondary dark:text-text-dark-secondary">
                  Basic knowledge of RouterOS terminal
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Video Tutorial Section */}
        <div class="rounded-2xl border border-border/50 bg-white/60 backdrop-blur-xl overflow-hidden dark:border-border-dark/50 dark:bg-surface-dark/60">
          <div class="px-8 py-6 border-b border-border/50 dark:border-border-dark/50 bg-gradient-to-r from-primary-500/5 to-secondary-500/5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/10 to-secondary-500/10 flex items-center justify-center">
                <LuPlayCircle class="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <h2 class="text-xl font-semibold text-text dark:text-text-dark-default">
                  Video Tutorial
                </h2>
                <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                  Watch our comprehensive setup guide
                </p>
              </div>
            </div>
          </div>
          
          <div class="p-8">
            <AspectRatio ratio="video" maxWidth="100%">
              <div class="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                <div class="text-center">
                  <div class="mb-4 mx-auto w-20 h-20 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center shadow-lg">
                    <LuPlayCircle class="w-10 h-10 text-primary-500" />
                  </div>
                  <p class="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Video Tutorial Coming Soon
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-500">
                    Complete walkthrough will be available here
                  </p>
                </div>
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>
    </div>
  );
});